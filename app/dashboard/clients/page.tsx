'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  addDoc,
  doc,
  serverTimestamp,
  runTransaction,
} from 'firebase/firestore';
import {
  Search,
  Plus,
  ShieldCheck,
  Globe,
  Loader2,
  Zap,
  X,
  Sun,
  Moon,
  ArrowLeft,
} from 'lucide-react';
import { db } from '@/lib/firebase';
import {
  ClientData,
  calcOverallProgress,
  SummaryModal,
  DEFAULT_CHECKLIST,
  EMPTY_CLIENT,
} from './client-form';

export default function ClientsPage() {
  const router = useRouter();
  const [clients, setClients] = useState<ClientData[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [summaryClient, setSummaryClient] = useState<ClientData | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const [newClient, setNewClient] = useState({
    fullName: '',
    email: '',
    mobile: '',
    whatsapp: '',
  });

  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsDark(document.documentElement.classList.contains('dark'));
    }
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    if (nextDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('new') === 'true') {
        setShowCreateModal(true);
        // Clean up the query param without refreshing the page
        const newUrl = window.location.pathname;
        window.history.replaceState({}, '', newUrl);
      }
    }
  }, []);

  const handleCreateClient = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClient.fullName.trim()) {
      alert('Full Name is required.');
      return;
    }

    setCreateLoading(true);
    try {
      // Allocate a sequential client number from settings/global.userCount
      const nextNumber = await runTransaction(db, async (tx) => {
        const settingsRef = doc(db, 'settings', 'global');
        const snap = await tx.get(settingsRef);
        const sdata =
          (snap.exists()
            ? (snap.data() as { userCount?: number })
            : undefined) || undefined;
        const current =
          sdata && typeof sdata.userCount === 'number'
            ? sdata.userCount
            : 10000;
        const next = current + 1;
        tx.set(settingsRef, { userCount: next }, { merge: true });
        return next;
      });

      const clientCode = `clt-${nextNumber}`;

      const clientDataPayload = {
        ...EMPTY_CLIENT,
        fullName: newClient.fullName.trim(),
        email: newClient.email.trim(),
        mobile: newClient.mobile.trim(),
        whatsapp: newClient.whatsapp.trim(),
        clientCode,
        clientId: clientCode,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      const ref = await addDoc(collection(db, 'clients'), clientDataPayload);

      setShowCreateModal(false);
      // Reset form
      setNewClient({
        fullName: '',
        email: '',
        mobile: '',
        whatsapp: '',
      });

      // Redirect to details page
      router.push(`/dashboard/clients/${ref.id}`);
    } catch (error) {
      console.error('Error creating client:', error);
      alert('Failed to create client. Please try again.');
    } finally {
      setCreateLoading(false);
    }
  };

  const fetchClients = async () => {
    try {
      setLoading(true);
      const q = query(
        collection(db, 'clients'),
        orderBy('createdAt', 'desc'),
        limit(50),
      );
      const snap = await getDocs(q);
      const data = snap.docs.map((d) => {
        const raw = d.data() as Partial<ClientData>;
        return {
          id: d.id,
          ...raw,
          checklist: Array.isArray(raw.checklist)
            ? raw.checklist
            : DEFAULT_CHECKLIST,
          completedSections: Array.isArray(raw.completedSections)
            ? raw.completedSections
            : [],
        } as ClientData;
      });
      setClients(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const filtered = useMemo(() => {
    if (!search.trim()) return clients;
    const q = search.toLowerCase();
    return clients.filter((c) =>
      [c.fullName, c.email, c.firebaseProjectId, c.netlifySiteUrl]
        .join(' ')
        .toLowerCase()
        .includes(q),
    );
  }, [clients, search]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-lg p-6 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="mb-4">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 text-base font-semibold text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
        </div>
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-10">
          <div>
            <h1 className="text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
              Clients Dashboard
            </h1>
            <p className="text-slate-650 dark:text-slate-400 mt-2 text-lg">
              Manage onboarding, Firebase projects & deployment status
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-3 rounded-2xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition bg-white dark:bg-slate-900/60 hover:bg-slate-100 dark:hover:bg-slate-800/80"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setShowCreateModal(true)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-white font-semibold hover:opacity-90 transition text-lg shadow-lg shadow-cyan-500/20"
            >
              <Plus className="w-4 h-4" />
              New Client
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-8">
          <Search className="absolute left-4 top-4 w-4 h-4 text-slate-400 dark:text-slate-500" />
          <input
            placeholder="Search by name, email, project ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 pl-11 pr-4 py-3 text-lg text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-cyan-500/20 dark:focus:ring-cyan-500/40 transition"
          />
        </div>

        {/* Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-32">
            <Loader2 className="w-8 h-8 animate-spin text-cyan-400" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-200 dark:border-white/10 p-24 text-center text-slate-400 dark:text-slate-500 bg-white dark:bg-transparent">
            <Zap className="w-10 h-10 mx-auto mb-3 opacity-30" />
            <p className="font-medium">No clients found</p>
            <p className="text-base mt-1">
              Create your first client to get started
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {filtered.map((client) => {
              const prog = calcOverallProgress(client);
              return (
                <div
                  key={client.id}
                  className="rounded-2xl border border-slate-200 dark:border-white/8 bg-white dark:bg-slate-900/60 p-5 hover:border-cyan-500/30 hover:bg-slate-50/50 dark:hover:bg-slate-900/80 transition shadow-sm hover:shadow"
                >
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div>
                      <h2 className="font-semibold text-slate-900 dark:text-white text-xl">
                        {client.fullName || 'Unnamed Client'}
                      </h2>
                      <p className="text-base text-slate-500 dark:text-slate-450 mt-0.5">
                        {client.email || 'No email'}
                      </p>
                    </div>
                    <span
                      className={`shrink-0 px-2.5 py-1 rounded-full text-sm font-medium ${
                        client.subscription === 'premium'
                          ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-300'
                          : 'bg-slate-200 dark:bg-slate-700/60 text-slate-650 dark:text-slate-400'
                      }`}
                    >
                      {client.subscription ?? 'free'}
                    </span>
                  </div>

                  <div className="space-y-2 text-base text-slate-600 dark:text-slate-400 mb-4">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-cyan-500 dark:text-cyan-400 shrink-0" />
                      <span className="truncate">
                        {client.firebaseProjectId || 'No Firebase project'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-emerald-500 dark:text-emerald-400 shrink-0" />
                      <span className="truncate">
                        {client.netlifySiteUrl || 'Not deployed yet'}
                      </span>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-600 mb-1">
                      <span>Setup Progress</span>
                      <span>{prog}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-700 ${
                          prog === 100
                            ? 'bg-emerald-500'
                            : 'bg-gradient-to-r from-cyan-500 to-emerald-500'
                        }`}
                        style={{ width: `${prog}%` }}
                      />
                    </div>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {client.id && (
                      <Link
                        href={`/dashboard/clients/${client.id}`}
                        className="inline-flex items-center gap-2 rounded-full border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-slate-800/80 px-4 py-2 text-base text-slate-750 dark:text-slate-100 hover:border-cyan-500/20 hover:bg-slate-200 dark:hover:bg-slate-900 transition"
                      >
                        View details
                      </Link>
                    )}
                    <button
                      type="button"
                      onClick={() => setSummaryClient(client)}
                      className="inline-flex items-center gap-2 rounded-full border border-slate-200 dark:border-white/10 bg-cyan-500/5 dark:bg-cyan-500/10 px-4 py-2 text-base text-cyan-600 dark:text-cyan-200 hover:bg-cyan-500/10 dark:hover:bg-cyan-500/15 transition"
                    >
                      Summary
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {summaryClient && (
        <SummaryModal
          client={summaryClient}
          onClose={() => setSummaryClient(null)}
        />
      )}

      {showCreateModal && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => {
            if (!createLoading) setShowCreateModal(false);
          }}
        >
          <div
            className="w-full max-w-lg rounded-3xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-white/10 p-6 shadow-2xl shadow-slate-200/50 dark:shadow-black/40"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 mb-6">
              <div>
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                  Create New Client
                </h2>
                <p className="text-base text-slate-550 dark:text-slate-400 mt-1">
                  Enter basic contact details. Additional settings can be
                  configured on the details page.
                </p>
              </div>
              <button
                onClick={() => {
                  if (!createLoading) setShowCreateModal(false);
                }}
                disabled={createLoading}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-full p-2 transition disabled:opacity-50"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateClient} className="space-y-4">
              <div>
                <label className="block text-base font-semibold text-slate-700 dark:text-slate-200 mb-2">
                  Full Name *
                </label>
                <input
                  required
                  disabled={createLoading}
                  className="w-full rounded-2xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 px-4 py-3 text-base placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none focus:border-cyan-500 dark:focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 dark:focus:ring-cyan-500/30 transition shadow-sm shadow-slate-100 dark:shadow-slate-950/20 disabled:opacity-50"
                  placeholder="John Doe"
                  value={newClient.fullName}
                  onChange={(e) =>
                    setNewClient((prev) => ({
                      ...prev,
                      fullName: e.target.value,
                    }))
                  }
                />
              </div>

              <div>
                <label className="block text-base font-semibold text-slate-700 dark:text-slate-200 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  disabled={createLoading}
                  className="w-full rounded-2xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 px-4 py-3 text-base placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none focus:border-cyan-500 dark:focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 dark:focus:ring-cyan-500/30 transition shadow-sm shadow-slate-100 dark:shadow-slate-950/20 disabled:opacity-50"
                  placeholder="john@example.com"
                  value={newClient.email}
                  onChange={(e) =>
                    setNewClient((prev) => ({ ...prev, email: e.target.value }))
                  }
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-base font-semibold text-slate-700 dark:text-slate-200 mb-2">
                    Mobile Number
                  </label>
                  <input
                    disabled={createLoading}
                    className="w-full rounded-2xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 px-4 py-3 text-base placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none focus:border-cyan-500 dark:focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 dark:focus:ring-cyan-500/30 transition shadow-sm shadow-slate-100 dark:shadow-slate-950/20 disabled:opacity-50"
                    placeholder="+92 300 0000000"
                    value={newClient.mobile}
                    onChange={(e) =>
                      setNewClient((prev) => ({
                        ...prev,
                        mobile: e.target.value,
                      }))
                    }
                  />
                </div>

                <div>
                  <label className="block text-base font-semibold text-slate-700 dark:text-slate-200 mb-2">
                    WhatsApp Number
                  </label>
                  <input
                    disabled={createLoading}
                    className="w-full rounded-2xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 px-4 py-3 text-base placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none focus:border-cyan-500 dark:focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 dark:focus:ring-cyan-500/30 transition shadow-sm shadow-slate-100 dark:shadow-slate-950/20 disabled:opacity-50"
                    placeholder="+92 300 0000000"
                    value={newClient.whatsapp}
                    onChange={(e) =>
                      setNewClient((prev) => ({
                        ...prev,
                        whatsapp: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3 pt-4 border-t border-slate-200 dark:border-white/10">
                <button
                  type="button"
                  disabled={createLoading}
                  onClick={() => setShowCreateModal(false)}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 text-base font-semibold hover:bg-slate-100 dark:hover:bg-white/5 transition disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={createLoading}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-white text-base font-semibold hover:opacity-90 disabled:opacity-50 transition shadow-md"
                >
                  {createLoading && (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  )}
                  {createLoading ? 'Creating...' : 'Create Client'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
