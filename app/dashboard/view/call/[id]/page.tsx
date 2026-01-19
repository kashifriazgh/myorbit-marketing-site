'use client';

import React, { useState, useEffect } from 'react';
import { doc, getDoc, updateDoc, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useParams, useRouter } from 'next/navigation';
import { Phone, Clock, ArrowLeft, CheckCircle2, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';

interface CallRequest {
  id: string;
  request: string;
  submittedAt: Timestamp;
  read: boolean;
  done: boolean;
}

export default function CallRequestDetail() {
  const params = useParams();
  const router = useRouter();
  const [callRequest, setCallRequest] = useState<CallRequest | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      fetchCallRequest();
    }
  }, [params.id]);

  const fetchCallRequest = async () => {
    try {
      const docRef = doc(db, 'call requests', params.id as string);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const data = { id: docSnap.id, ...docSnap.data() } as CallRequest;
        setCallRequest(data);
        
        // Mark as read if not already read
        if (!data.read) {
          await updateDoc(docRef, { read: true });
        }
      }
    } catch (error) {
      console.error('Error fetching call request:', error);
    } finally {
      setLoading(false);
    }
  };

  const markAsDone = async () => {
    if (!callRequest) return;
    try {
      const docRef = doc(db, 'call requests', callRequest.id);
      await updateDoc(docRef, { done: true });
      router.push('/dashboard/view');
    } catch (error) {
      console.error('Error marking as done:', error);
    }
  };

  const toggleReadStatus = async () => {
    if (!callRequest) return;
    try {
      const docRef = doc(db, 'call requests', callRequest.id);
      await updateDoc(docRef, { read: !callRequest.read });
      setCallRequest({ ...callRequest, read: !callRequest.read });
    } catch (error) {
      console.error('Error updating read status:', error);
    }
  };

  const formatDate = (timestamp: Timestamp) => {
    if (!timestamp) return 'N/A';
    const date = timestamp.toDate();
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto mb-4"></div>
          <p className="text-slate-600 dark:text-slate-400">Loading call request...</p>
        </div>
      </div>
    );
  }

  if (!callRequest) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-600 dark:text-slate-400 mb-4">Call request not found</p>
          <Link
            href="/dashboard/view"
            className="inline-flex items-center gap-2 text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Requests
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Link
            href="/dashboard/view"
            className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white mb-4 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Requests
          </Link>
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
            Call Request Details
          </h1>
        </div>

        {/* Call Request Card */}
        <div className={`bg-white dark:bg-slate-800 rounded-2xl p-8 border-2 shadow-lg ${
          !callRequest.read && !callRequest.done
            ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-900/10'
            : 'border-slate-200 dark:border-slate-700'
        }`}>
          {/* Status Badge */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className={`p-3 rounded-xl ${
                !callRequest.read && !callRequest.done
                  ? 'bg-emerald-100 dark:bg-emerald-900/30'
                  : 'bg-slate-100 dark:bg-slate-700'
              }`}>
                <Phone className={`w-6 h-6 ${
                  !callRequest.read && !callRequest.done
                    ? 'text-emerald-600 dark:text-emerald-400'
                    : 'text-slate-600 dark:text-slate-400'
                }`} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Call Request
                </h2>
                {!callRequest.read && !callRequest.done && (
                  <span className="px-3 py-1 bg-emerald-500 text-white text-sm rounded-full mt-1 inline-block">
                    New Request
                  </span>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={toggleReadStatus}
                className={`p-3 rounded-xl transition ${
                  callRequest.read
                    ? 'bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600'
                    : 'bg-emerald-100 dark:bg-emerald-900/30 hover:bg-emerald-200 dark:hover:bg-emerald-900/50'
                }`}
                title={callRequest.read ? 'Mark as unread' : 'Mark as read'}
              >
                {callRequest.read ? (
                  <Eye className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                ) : (
                  <EyeOff className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                )}
              </button>
              {!callRequest.done && (
                <button
                  onClick={markAsDone}
                  className="p-3 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 hover:bg-emerald-200 dark:hover:bg-emerald-900/50 transition"
                  title="Mark as done"
                >
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                </button>
              )}
            </div>
          </div>

          {/* Date Info */}
          <div className="mb-6 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
              <Clock className="w-4 h-4" />
              <span className="font-medium">Submitted:</span>
              <span>{formatDate(callRequest.submittedAt)}</span>
            </div>
          </div>

          {/* Request Content */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">
              Request Details
            </h3>
            <div className="p-6 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
              <p className="text-slate-700 dark:text-slate-300 whitespace-pre-wrap leading-relaxed">
                {callRequest.request}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4 pt-6 border-t border-slate-200 dark:border-slate-700">
            {!callRequest.done && (
              <button
                onClick={markAsDone}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-xl font-semibold hover:opacity-90 transition shadow-lg"
              >
                <CheckCircle2 className="w-5 h-5" />
                Mark as Done
              </button>
            )}
            {callRequest.done && (
              <div className="flex items-center gap-2 px-6 py-3 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-xl font-semibold">
                <CheckCircle2 className="w-5 h-5" />
                Completed
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

