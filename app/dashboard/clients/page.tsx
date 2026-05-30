'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
} from 'firebase/firestore';
import {
  Search,
  Plus,
  ShieldCheck,
  Globe,
  Loader2,
  Zap,
} from 'lucide-react';
import { db } from '@/lib/firebase';
import { ClientData, calcOverallProgress, SummaryModal, DEFAULT_CHECKLIST } from './client-form';


export default function ClientsPage() {
  const [clients, setClients] = useState<ClientData[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [summaryClient, setSummaryClient] = useState<ClientData | null>(null);

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
    <div className="min-h-screen bg-slate-950 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-10">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">
              Clients Dashboard
            </h1>
            <p className="text-slate-400 mt-2 text-sm">
              Manage onboarding, Firebase projects & deployment status
            </p>
          </div>
          <Link
            href="/dashboard/clients/new"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-white font-semibold hover:opacity-90 transition text-sm shadow-lg shadow-cyan-500/20"
          >
            <Plus className="w-4 h-4" />
            New Client
          </Link>
        </div>

        {/* Search */}
        <div className="relative mb-8">
          <Search className="absolute left-4 top-3 w-4 h-4 text-slate-500" />
          <input
            placeholder="Search by name, email, project ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-white/5 pl-11 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-cyan-500/60 transition"
          />
        </div>

        {/* Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-32">
            <Loader2 className="w-8 h-8 animate-spin text-cyan-400" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-white/10 p-24 text-center text-slate-500">
            <Zap className="w-10 h-10 mx-auto mb-3 opacity-30" />
            <p className="font-medium">No clients found</p>
            <p className="text-sm mt-1">
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
                  className="rounded-2xl border border-white/8 bg-slate-900/60 p-5 hover:border-cyan-500/30 hover:bg-slate-900/80 transition"
                >
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div>
                      <h2 className="font-semibold text-white">
                        {client.fullName || 'Unnamed Client'}
                      </h2>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {client.email || 'No email'}
                      </p>
                    </div>
                    <span
                      className={`shrink-0 px-2.5 py-1 rounded-full text-xs font-medium ${
                        client.subscription === 'premium'
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : 'bg-slate-700/60 text-slate-400'
                      }`}
                    >
                      {client.subscription ?? 'free'}
                    </span>
                  </div>

                  <div className="space-y-2 text-xs text-slate-400 mb-4">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span className="truncate">
                        {client.firebaseProjectId || 'No Firebase project'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span className="truncate">
                        {client.netlifySiteUrl || 'Not deployed yet'}
                      </span>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-600 mb-1">
                      <span>Setup Progress</span>
                      <span>{prog}%</span>
                    </div>
                    <div className="h-1 rounded-full bg-slate-800 overflow-hidden">
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
                        className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-800/80 px-4 py-2 text-sm text-slate-100 hover:border-cyan-500/20 hover:bg-slate-900 transition"
                      >
                        View details
                      </Link>
                    )}
                    <button
                      type="button"
                      onClick={() => setSummaryClient(client)}
                      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-200 hover:bg-cyan-500/15 transition"
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
    </div>
  );
}
