'use client';

import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, getDocs, doc, updateDoc, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Mail, Phone, CheckCircle2, Circle, Eye, EyeOff, MessageSquare, Clock, User, X } from 'lucide-react';
import Link from 'next/link';

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

export default function ViewMessages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [callRequests, setCallRequests] = useState<CallRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'active' | 'completed'>('active');
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch messages
      const messagesQuery = query(collection(db, 'messages'), orderBy('submittedAt', 'desc'));
      const messagesSnapshot = await getDocs(messagesQuery);
      const messagesData = messagesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as Message[];

      // Fetch call requests
      const callRequestsQuery = query(collection(db, 'call requests'), orderBy('submittedAt', 'desc'));
      const callRequestsSnapshot = await getDocs(callRequestsQuery);
      const callRequestsData = callRequestsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as CallRequest[];

      setMessages(messagesData);
      setCallRequests(callRequestsData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (type: 'message' | 'call', id: string) => {
    try {
      const collectionName = type === 'message' ? 'messages' : 'call requests';
      const docRef = doc(db, collectionName, id);
      await updateDoc(docRef, { read: true });
      fetchData();
    } catch (error) {
      console.error('Error marking as read:', error);
    }
  };

  const markAsDone = async (type: 'message' | 'call', id: string) => {
    try {
      const collectionName = type === 'message' ? 'messages' : 'call requests';
      const docRef = doc(db, collectionName, id);
      await updateDoc(docRef, { done: true });
      fetchData();
    } catch (error) {
      console.error('Error marking as done:', error);
    }
  };

  const formatDate = (timestamp: Timestamp) => {
    if (!timestamp) return 'N/A';
    const date = timestamp.toDate();
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const filteredMessages = messages.filter(msg => {
    if (activeTab === 'completed') return msg.done;
    if (activeTab === 'active') {
      if (msg.done) return false;
      if (filter === 'unread') return !msg.read;
      if (filter === 'read') return msg.read;
      return true;
    }
    return true;
  });

  const filteredCallRequests = callRequests.filter(req => {
    if (activeTab === 'completed') return req.done;
    if (activeTab === 'active') {
      if (req.done) return false;
      if (filter === 'unread') return !req.read;
      if (filter === 'read') return req.read;
      return true;
    }
    return true;
  });

  const unreadCount = {
    messages: messages.filter(m => !m.read && !m.done).length,
    calls: callRequests.filter(c => !c.read && !c.done).length,
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mx-auto mb-4"></div>
          <p className="text-slate-600 dark:text-slate-400">Loading messages...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
            Contact Messages & Requests
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Manage all incoming messages and call requests
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab('active')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all ${
              activeTab === 'active'
                ? 'bg-gradient-to-r from-cyan-500 to-emerald-500 text-white shadow-lg'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
            }`}
          >
            Active
            {(unreadCount.messages > 0 || unreadCount.calls > 0) && (
              <span className="ml-2 px-2 py-0.5 bg-red-500 text-white text-xs rounded-full">
                {unreadCount.messages + unreadCount.calls}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all ${
              activeTab === 'completed'
                ? 'bg-gradient-to-r from-cyan-500 to-emerald-500 text-white shadow-lg'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
            }`}
          >
            Completed
          </button>
        </div>

        {/* Filters */}
        {activeTab === 'active' && (
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                filter === 'all'
                  ? 'bg-cyan-500 text-white'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('unread')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                filter === 'unread'
                  ? 'bg-cyan-500 text-white'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300'
              }`}
            >
              Unread
            </button>
            <button
              onClick={() => setFilter('read')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                filter === 'read'
                  ? 'bg-cyan-500 text-white'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300'
              }`}
            >
              Read
            </button>
          </div>
        )}

        {/* Messages Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Mail className="w-6 h-6 text-cyan-500" />
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Messages
            </h2>
            <span className="px-3 py-1 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 rounded-full text-sm font-medium">
              {filteredMessages.length}
            </span>
          </div>

          {filteredMessages.length === 0 ? (
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 text-center border border-slate-200 dark:border-slate-700">
              <MessageSquare className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <p className="text-slate-600 dark:text-slate-400">
                No {activeTab === 'active' ? 'active' : 'completed'} messages
              </p>
            </div>
          ) : (
            <div className="grid gap-4">
              {filteredMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`bg-white dark:bg-slate-800 rounded-2xl p-6 border-2 transition-all hover:shadow-lg ${
                    !msg.read && !msg.done
                      ? 'border-cyan-500 bg-cyan-50/50 dark:bg-cyan-900/10'
                      : 'border-slate-200 dark:border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div className={`p-3 rounded-xl ${
                        !msg.read && !msg.done
                          ? 'bg-cyan-100 dark:bg-cyan-900/30'
                          : 'bg-slate-100 dark:bg-slate-700'
                      }`}>
                        <Mail className={`w-5 h-5 ${
                          !msg.read && !msg.done
                            ? 'text-cyan-600 dark:text-cyan-400'
                            : 'text-slate-600 dark:text-slate-400'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <User className="w-4 h-4 text-slate-500" />
                          <h3 className="font-semibold text-slate-900 dark:text-white">
                            {msg.name}
                          </h3>
                          {!msg.read && !msg.done && (
                            <span className="px-2 py-0.5 bg-cyan-500 text-white text-xs rounded-full">
                              New
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400 mb-2">
                          <span className="flex items-center gap-1">
                            <Mail className="w-3 h-3" />
                            {msg.contact}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {formatDate(msg.submittedAt)}
                          </span>
                        </div>
                        <p className="text-slate-700 dark:text-slate-300 line-clamp-2">
                          {msg.message}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {!msg.read && !msg.done && (
                        <button
                          onClick={() => markAsRead('message', msg.id)}
                          className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition"
                          title="Mark as read"
                        >
                          <EyeOff className="w-5 h-5 text-slate-500" />
                        </button>
                      )}
                      {msg.read && !msg.done && (
                        <button
                          onClick={() => markAsRead('message', msg.id)}
                          className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition"
                          title="Mark as unread"
                        >
                          <Eye className="w-5 h-5 text-slate-500" />
                        </button>
                      )}
                      {!msg.done && (
                        <button
                          onClick={() => markAsDone('message', msg.id)}
                          className="p-2 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 rounded-lg transition"
                          title="Mark as done"
                        >
                          <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                        </button>
                      )}
                    </div>
                  </div>
                  <Link
                    href={`/dashboard/view/message/${msg.id}`}
                    className="inline-flex items-center gap-2 text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 font-medium text-sm transition"
                  >
                    View Details →
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Call Requests Section */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <Phone className="w-6 h-6 text-emerald-500" />
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Call Requests
            </h2>
            <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-full text-sm font-medium">
              {filteredCallRequests.length}
            </span>
          </div>

          {filteredCallRequests.length === 0 ? (
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 text-center border border-slate-200 dark:border-slate-700">
              <Phone className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <p className="text-slate-600 dark:text-slate-400">
                No {activeTab === 'active' ? 'active' : 'completed'} call requests
              </p>
            </div>
          ) : (
            <div className="grid gap-4">
              {filteredCallRequests.map((req) => (
                <div
                  key={req.id}
                  className={`bg-white dark:bg-slate-800 rounded-2xl p-6 border-2 transition-all hover:shadow-lg ${
                    !req.read && !req.done
                      ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-900/10'
                      : 'border-slate-200 dark:border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div className={`p-3 rounded-xl ${
                        !req.read && !req.done
                          ? 'bg-emerald-100 dark:bg-emerald-900/30'
                          : 'bg-slate-100 dark:bg-slate-700'
                      }`}>
                        <Phone className={`w-5 h-5 ${
                          !req.read && !req.done
                            ? 'text-emerald-600 dark:text-emerald-400'
                            : 'text-slate-600 dark:text-slate-400'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {!req.read && !req.done && (
                            <span className="px-2 py-0.5 bg-emerald-500 text-white text-xs rounded-full">
                              New
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400 mb-2">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {formatDate(req.submittedAt)}
                          </span>
                        </div>
                        <p className="text-slate-700 dark:text-slate-300 line-clamp-3 whitespace-pre-wrap">
                          {req.request}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {!req.read && !req.done && (
                        <button
                          onClick={() => markAsRead('call', req.id)}
                          className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition"
                          title="Mark as read"
                        >
                          <EyeOff className="w-5 h-5 text-slate-500" />
                        </button>
                      )}
                      {req.read && !req.done && (
                        <button
                          onClick={() => markAsRead('call', req.id)}
                          className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition"
                          title="Mark as unread"
                        >
                          <Eye className="w-5 h-5 text-slate-500" />
                        </button>
                      )}
                      {!req.done && (
                        <button
                          onClick={() => markAsDone('call', req.id)}
                          className="p-2 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 rounded-lg transition"
                          title="Mark as done"
                        >
                          <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                        </button>
                      )}
                    </div>
                  </div>
                  <Link
                    href={`/dashboard/view/call/${req.id}`}
                    className="inline-flex items-center gap-2 text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 font-medium text-sm transition"
                  >
                    View Details →
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

