'use client';

import { useRouter } from 'next/navigation';
import { CreateClientPage } from '@/app/dashboard/clients/client-form';

export default function NewClientPage() {
  const router = useRouter();

  return (
    <CreateClientPage
      onBack={() => router.push('/dashboard/clients')}
      onSaved={() => undefined}
    />
  );
}
