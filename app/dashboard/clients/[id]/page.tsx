'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { doc, getDoc } from 'firebase/firestore';
import { Loader2 } from 'lucide-react';
import { db } from '@/lib/firebase';
import { CreateClientPage, ClientData } from '@/app/dashboard/clients/client-form';

export default function ClientDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const clientId = params?.id as string;
  const [client, setClient] = useState<ClientData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchClient = async () => {
    try {
      setLoading(true);
      const snapshot = await getDoc(doc(db, 'clients', clientId));
      if (!snapshot.exists()) {
        return;
      }
      setClient({ id: snapshot.id, ...snapshot.data() } as ClientData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (clientId) {
      fetchClient();
    }
  }, [clientId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-cyan-400" />
      </div>
    );
  }

  if (!client) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        Client not found
      </div>
    );
  }

  return (
    <CreateClientPage
      initial={client}
      docId={clientId}
      onBack={() => router.push('/dashboard/clients')}
      onSaved={() => undefined}
    />
  );
}
