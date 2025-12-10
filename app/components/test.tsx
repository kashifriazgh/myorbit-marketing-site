'use client';

import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useState } from 'react';

export default function CreateDocumentButton() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');

  async function handleCreate() {
    try {
      setLoading(true);
      setStatus('');

      await addDoc(collection(db, 'test'), {
        message: 'Test document created!',
        createdAt: serverTimestamp(),
      });

      setStatus('Document created successfully!');
    } catch (error) {
      console.error('Error adding document:', error);
      setStatus('Error creating document.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-4 border rounded-2xl bg-gray-50 dark:bg-gray-900/60 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100">
      <button
        onClick={handleCreate}
        disabled={loading}
        className="px-4 py-2 rounded-xl bg-gray-900 text-white dark:bg-white dark:text-gray-900 font-medium shadow-sm disabled:opacity-60 transition"
      >
        {loading ? 'Creating...' : 'Create Test Document'}
      </button>

      {status && (
        <p className="mt-3 text-sm text-gray-700 dark:text-gray-300">
          {status}
        </p>
      )}
    </div>
  );
}
