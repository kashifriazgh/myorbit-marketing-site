'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { collection, query, orderBy, limit, getDocs, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import {
  Users,
  MessageSquare,
  Phone,
  Bell,
  ArrowRight,
  LogOut,
  Globe,
  Loader2,
  Sun,
  Moon,
  Mail,
  Clock,
  PlusCircle,
  Activity,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { calcOverallProgress, ClientData } from '@/app/dashboard/clients/client-form';

interface Message {
  id: string;
  name: string;
  contact: string;
  message: string;
  submittedAt: Timestamp;
  read: boolean;
  done: boolean;
}

interface CallRequest {
  id: string;
  request: string;
  submittedAt: Timestamp;
  read: boolean;
  done: boolean;
}

export default function MainDashboardHub() {
  const router = useRouter();
  
  // States
  const [clients, setClients] = useState<ClientData[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [callRequests, setCallRequests] = useState<CallRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);
  const [isDark, setIsDark] = useState(false);

  // Theme initialization
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

  // Fetch initial dashboard metrics and recent items
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        // 1. Fetch recent clients
        const clientsQuery = query(
          collection(db, 'clients'),
          orderBy('createdAt', 'desc'),
          limit(3)
        );
        const clientsSnapshot = await getDocs(clientsQuery);
        const clientsData = clientsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as ClientData[];

        // 2. Fetch recent messages
        const messagesQuery = query(
          collection(db, 'messages'),
          orderBy('submittedAt', 'desc'),
          limit(3)
        );
        const messagesSnapshot = await getDocs(messagesQuery);
        const messagesData = messagesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Message[];

        // 3. Fetch recent call requests
        const callRequestsQuery = query(
          collection(db, 'call requests'),
          orderBy('submittedAt', 'desc'),
          limit(3)
        );
        const callRequestsSnapshot = await getDocs(callRequestsQuery);
        const callRequestsData = callRequestsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as CallRequest[];

        // 4. Fetch total counts (or a wider set to count active ones)
        // For a simple overview dashboard we will fetch the active set limits for count
        const allClientsQuery = query(collection(db, 'clients'), limit(100));
        const allClientsSnapshot = await getDocs(allClientsQuery);
        const allClientsCount = allClientsSnapshot.size;

        const allMessagesQuery = query(collection(db, 'messages'), limit(100));
        const allMessagesSnapshot = await getDocs(allMessagesQuery);
        const allMessages = allMessagesSnapshot.docs.map(d => d.data() as Message);
        const unreadMessagesCount = allMessages.filter(m => !m.read && !m.done).length;

        const allCallsQuery = query(collection(db, 'call requests'), limit(100));
        const allCallsSnapshot = await getDocs(allCallsQuery);
        const allCalls = allCallsSnapshot.docs.map(d => d.data() as CallRequest);
        const unreadCallsCount = allCalls.filter(c => !c.read && !c.done).length;

        setClients(clientsData);
        setMessages(messagesData);
        setCallRequests(callRequestsData);
        
        // We will store counts temporarily in states or compute them dynamically
        // Since we want dynamic counts, let's attach them to custom state or state variables
        setStats({
          totalClients: allClientsCount,
          unreadMessages: unreadMessagesCount,
          unreadCalls: unreadCallsCount,
        });

      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const [stats, setStats] = useState({
    totalClients: 0,
    unreadMessages: 0,
    unreadCalls: 0,
  });

  const handleLogout = async () => {
    try {
      setLoggingOut(true);
      const res = await fetch('/api/auth/logout', { method: 'POST' });
      if (res.ok) {
        router.push('/dashboard/login');
      } else {
        alert('Failed to logout. Please try again.');
        setLoggingOut(false);
      }
    } catch (err) {
      console.error('Logout error:', err);
      setLoggingOut(false);
    }
  };

  const formatDate = (timestamp: Timestamp) => {
    if (!timestamp) return 'N/A';
    const date = timestamp.toDate();
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  // Combine and sort messages/callbacks for combined recent feed
  const combinedRecentFeed = React.useMemo(() => {
    const feed: Array<{
      id: string;
      type: 'message' | 'call';
      title: string;
      subtitle: string;
      snippet: string;
      date: Timestamp;
      isNew: boolean;
    }> = [];

    messages.forEach(msg => {
      feed.push({
        id: msg.id,
        type: 'message',
        title: msg.name,
        subtitle: msg.contact,
        snippet: msg.message,
        date: msg.submittedAt,
        isNew: !msg.read && !msg.done,
      });
    });

    callRequests.forEach(req => {
      feed.push({
        id: req.id,
        type: 'call',
        title: 'Callback Request',
        subtitle: 'Requested ASAP',
        snippet: req.request,
        date: req.submittedAt,
        isNew: !req.read && !req.done,
      });
    });

    // Sort by date desc, limit to 4 items
    return feed
      .sort((a, b) => (b.date?.seconds || 0) - (a.date?.seconds || 0))
      .slice(0, 4);
  }, [messages, callRequests]);

  if (loading || loggingOut) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center transition-colors duration-300">
        <Loader2 className="w-12 h-12 animate-spin text-cyan-500 dark:text-cyan-400 mb-4" />
        <p className="text-slate-650 dark:text-slate-400 font-medium">
          {loggingOut ? 'Logging out...' : 'Loading control center...'}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300 p-6 md:p-8">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Navigation & Header */}
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 pb-6 border-b border-slate-200 dark:border-white/10">
          <div>
            <div className="flex items-center gap-2 mb-1.5 text-cyan-600 dark:text-cyan-400 font-semibold tracking-wider uppercase text-sm">
              <Activity className="w-4 h-4 animate-pulse" />
              Command Center
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-slate-900 via-cyan-950 to-slate-900 dark:from-white dark:via-cyan-100 dark:to-white bg-clip-text text-transparent">
              Orbit Dashboard
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mt-1 text-base">
              System monitoring, client onboarding status, and message desk.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* View Site */}
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:bg-slate-100 dark:hover:bg-slate-800/80 text-slate-700 dark:text-slate-350 text-sm font-semibold transition"
            >
              <Globe className="w-4 h-4 text-emerald-500" />
              View Website
            </Link>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-3 rounded-2xl border border-slate-200 dark:border-slate-800 text-slate-650 dark:text-slate-350 hover:text-slate-900 dark:hover:text-white transition bg-white dark:bg-slate-900/60 hover:bg-slate-100 dark:hover:bg-slate-800/80"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-rose-50/80 hover:bg-rose-100 dark:bg-rose-950/20 dark:hover:bg-rose-950/40 text-rose-650 dark:text-rose-350 hover:text-rose-700 dark:hover:text-rose-300 border border-rose-200/40 dark:border-rose-950/30 text-sm font-semibold transition"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </header>

        {/* Stats Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Total Clients Stat */}
          <div className="relative overflow-hidden bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-white/5 rounded-3xl p-6 shadow-sm hover:shadow-md transition">
            <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/10 rounded-bl-full filter blur-xl pointer-events-none" />
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-bold tracking-wider text-slate-500 dark:text-slate-450 uppercase">
                Active Clients
              </span>
              <div className="p-3 rounded-2xl bg-cyan-50 dark:bg-cyan-950/40 text-cyan-600 dark:text-cyan-400">
                <Users className="w-6 h-6" />
              </div>
            </div>
            <div className="text-3xl font-extrabold text-slate-900 dark:text-white">
              {stats.totalClients}
            </div>
            <p className="text-xs text-slate-650 dark:text-slate-400 mt-2 flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-500" />
              Onboarded & Setup Progress
            </p>
          </div>

          {/* Contact Messages Stat */}
          <div className="relative overflow-hidden bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-white/5 rounded-3xl p-6 shadow-sm hover:shadow-md transition">
            <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 rounded-bl-full filter blur-xl pointer-events-none" />
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-bold tracking-wider text-slate-500 dark:text-slate-450 uppercase">
                Unread Messages
              </span>
              <div className="p-3 rounded-2xl bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400">
                <Mail className="w-6 h-6" />
              </div>
            </div>
            <div className="text-3xl font-extrabold text-slate-900 dark:text-white">
              {stats.unreadMessages}
            </div>
            <p className="text-xs text-slate-650 dark:text-slate-400 mt-2 flex items-center gap-1.5">
              <span className={`h-1.5 w-1.5 rounded-full ${stats.unreadMessages > 0 ? 'bg-red-500 animate-pulse' : 'bg-slate-400'}`} />
              Awaiting admin reply
            </p>
          </div>

          {/* Callback Requests Stat */}
          <div className="relative overflow-hidden bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-white/5 rounded-3xl p-6 shadow-sm hover:shadow-md transition">
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-bl-full filter blur-xl pointer-events-none" />
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-bold tracking-wider text-slate-500 dark:text-slate-450 uppercase">
                Callback Requests
              </span>
              <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400">
                <Phone className="w-6 h-6" />
              </div>
            </div>
            <div className="text-3xl font-extrabold text-slate-900 dark:text-white">
              {stats.unreadCalls}
            </div>
            <p className="text-xs text-slate-650 dark:text-slate-400 mt-2 flex items-center gap-1.5">
              <span className={`h-1.5 w-1.5 rounded-full ${stats.unreadCalls > 0 ? 'bg-red-500 animate-pulse' : 'bg-slate-400'}`} />
              Requires immediate action
            </p>
          </div>
        </section>

        {/* Primary Shortcuts */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold tracking-tight text-slate-800 dark:text-slate-300 flex items-center gap-2">
            Shortcut Zones
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Shortcut: Client Manager */}
            <div className="group relative bg-white dark:bg-slate-900/30 border border-slate-200 dark:border-white/8 rounded-3xl p-6 hover:border-cyan-500/30 dark:hover:bg-slate-900/60 transition shadow-sm hover:shadow-lg flex flex-col justify-between">
              <div className="space-y-4">
                <div className="p-3 w-fit rounded-2xl bg-cyan-100/60 dark:bg-cyan-950/30 text-cyan-600 dark:text-cyan-400">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Clients Management
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Track client progress, configure Firebase projects, netlify hooks, and update onboarding checklist status.
                </p>
              </div>

              <div className="mt-8 flex items-center justify-between gap-3 pt-4 border-t border-slate-100 dark:border-white/5">
                <Link
                  href="/dashboard/clients?new=true"
                  className="inline-flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 font-semibold transition"
                >
                  <PlusCircle className="w-4 h-4" />
                  New Client
                </Link>
                
                <Link
                  href="/dashboard/clients"
                  className="inline-flex items-center gap-1.5 px-4.5 py-2 rounded-xl bg-cyan-50 dark:bg-cyan-950/40 text-cyan-600 dark:text-cyan-450 hover:bg-cyan-550 hover:text-white dark:hover:bg-cyan-500/80 text-sm font-bold transition group-hover:translate-x-1 duration-300"
                >
                  Go to Panel
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Shortcut: Messages Inbox */}
            <div className="group relative bg-white dark:bg-slate-900/30 border border-slate-200 dark:border-white/8 rounded-3xl p-6 hover:border-purple-500/30 dark:hover:bg-slate-900/60 transition shadow-sm hover:shadow-lg flex flex-col justify-between">
              <div className="space-y-4">
                <div className="p-3 w-fit rounded-2xl bg-purple-100/60 dark:bg-purple-950/30 text-purple-600 dark:text-purple-400">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Inquiries & Messaging
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Manage incoming client messages and phone callback requests. Sort, assign priority, and check off completed communications.
                </p>
              </div>

              <div className="mt-8 flex items-center justify-end pt-4 border-t border-slate-100 dark:border-white/5">
                <Link
                  href="/dashboard/view"
                  className="inline-flex items-center gap-1.5 px-4.5 py-2 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-450 hover:bg-purple-550 hover:text-white dark:hover:bg-purple-500/80 text-sm font-bold transition group-hover:translate-x-1 duration-300"
                >
                  Open Inbox
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Shortcut: Notifications Setup */}
            <div className="group relative bg-white dark:bg-slate-900/30 border border-slate-200 dark:border-white/8 rounded-3xl p-6 hover:border-emerald-500/30 dark:hover:bg-slate-900/60 transition shadow-sm hover:shadow-lg flex flex-col justify-between">
              <div className="space-y-4">
                <div className="p-3 w-fit rounded-2xl bg-emerald-100/60 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400">
                  <Bell className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Push Alerts Desk
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Enable OneSignal web push notifications on this browser to receive immediate alerts when customers request a callback or message.
                </p>
              </div>

              <div className="mt-8 flex items-center justify-end pt-4 border-t border-slate-100 dark:border-white/5">
                <Link
                  href="/dashboard/subscribe"
                  className="inline-flex items-center gap-1.5 px-4.5 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-450 hover:bg-emerald-555 hover:text-white dark:hover:bg-emerald-500/80 text-sm font-bold transition group-hover:translate-x-1 duration-300"
                >
                  Configure
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

          </div>
        </section>

        {/* Live Feeds Section */}
        <section className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          
          {/* Recent Clients (3/5 layout) */}
          <div className="lg:col-span-3 space-y-4">
            <h2 className="text-xl font-bold tracking-tight text-slate-800 dark:text-slate-300 flex items-center justify-between">
              <span>Recent Onboarding Clients</span>
              <Link
                href="/dashboard/clients"
                className="text-xs text-cyan-600 dark:text-cyan-450 hover:underline flex items-center gap-1 font-semibold"
              >
                View All Clients
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </h2>

            {clients.length === 0 ? (
              <div className="bg-white dark:bg-slate-900/30 border border-slate-200 dark:border-white/8 rounded-3xl p-8 text-center text-slate-600 dark:text-slate-400">
                No clients configured yet. Create a new client to get started.
              </div>
            ) : (
              <div className="space-y-4">
                {clients.map((client) => {
                  const progress = calcOverallProgress(client);
                  return (
                    <div
                      key={client.id}
                      className="bg-white dark:bg-slate-900/30 border border-slate-200 dark:border-white/8 rounded-3xl p-5 hover:bg-slate-50 dark:hover:bg-slate-900/50 hover:shadow-md transition"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-900 dark:text-white text-lg">
                              {client.fullName}
                            </span>
                            <span
                              className={`px-2 py-0.5 rounded-full text-xxs font-semibold uppercase tracking-wider ${
                                client.subscription === 'premium'
                                  ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
                                  : 'bg-slate-200 dark:bg-slate-800 text-slate-650 dark:text-slate-400'
                              }`}
                            >
                              {client.subscription || 'free'}
                            </span>
                          </div>
                          <span className="text-xs text-slate-500 dark:text-slate-450 block mt-0.5">
                            {client.email || 'No email set'}
                          </span>
                        </div>

                        {client.id && (
                          <Link
                            href={`/dashboard/clients/${client.id}`}
                            className="inline-flex items-center gap-1 text-xs text-cyan-600 dark:text-cyan-455 hover:text-cyan-700 font-semibold self-start sm:self-auto"
                          >
                            Update Checklist
                            <ChevronRight className="w-4 h-4" />
                          </Link>
                        )}
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-xs text-slate-650 dark:text-slate-400">
                          <span className="flex items-center gap-1.5">
                            <ShieldCheck className="w-3.5 h-3.5 text-cyan-500" />
                            {client.firebaseProjectId || 'No Firebase configured'}
                          </span>
                          <span className="font-semibold">{progress}%</span>
                        </div>
                        <div className="h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-700 ${
                              progress === 100
                                ? 'bg-emerald-500'
                                : 'bg-gradient-to-r from-cyan-500 to-emerald-500'
                            }`}
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Recent Inbound Activity (2/5 layout) */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-bold tracking-tight text-slate-800 dark:text-slate-300 flex items-center justify-between">
              <span>Recent Communications</span>
              <Link
                href="/dashboard/view"
                className="text-xs text-purple-600 dark:text-purple-450 hover:underline flex items-center gap-1 font-semibold"
              >
                Open Inbox
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </h2>

            {combinedRecentFeed.length === 0 ? (
              <div className="bg-white dark:bg-slate-900/30 border border-slate-200 dark:border-white/8 rounded-3xl p-8 text-center text-slate-600 dark:text-slate-400">
                No recent messages or callback requests.
              </div>
            ) : (
              <div className="space-y-4">
                {combinedRecentFeed.map((item) => (
                  <div
                    key={`${item.type}-${item.id}`}
                    className={`bg-white dark:bg-slate-900/30 border rounded-3xl p-4 hover:shadow-md transition flex flex-col justify-between gap-3 ${
                      item.isNew
                        ? 'border-cyan-500 bg-cyan-50/20 dark:bg-cyan-900/5'
                        : 'border-slate-200 dark:border-white/8'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="font-bold text-slate-900 dark:text-white text-sm truncate max-w-[140px]">
                          {item.title}
                        </span>
                        
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`px-2 py-0.5 rounded-full text-xxs font-semibold uppercase tracking-wider ${
                              item.type === 'message'
                                ? 'bg-purple-100 text-purple-700 dark:bg-purple-950/45 dark:text-purple-400'
                                : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/45 dark:text-emerald-400'
                            }`}
                          >
                            {item.type}
                          </span>
                          
                          {item.isNew && (
                            <span className="px-1.5 py-0.5 bg-cyan-500 text-white text-xxs font-bold rounded-full animate-pulse">
                              New
                            </span>
                          )}
                        </div>
                      </div>

                      <p className="text-xs text-slate-650 dark:text-slate-400 line-clamp-2 italic mb-2">
                        &ldquo;{item.snippet}&rdquo;
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2.5 border-t border-slate-100 dark:border-white/5 text-xxs text-slate-500 dark:text-slate-450">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        {formatDate(item.date)}
                      </span>
                      
                      <Link
                        href={`/dashboard/view/${item.type}/${item.id}`}
                        className="text-cyan-600 dark:text-cyan-450 hover:underline font-semibold"
                      >
                        Details →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
        </section>

      </div>
    </div>
  );
}
