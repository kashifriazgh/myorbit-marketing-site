'use client';

import React, { Suspense } from 'react';
import { Loader2 } from 'lucide-react';
import LoginPageContent from './login-page-content';

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin text-cyan-500 mx-auto mb-4" />
            <p className="text-slate-600 dark:text-slate-400">
              Loading...
            </p>
          </div>
        </div>
      }
    >
      <LoginPageContent />
    </Suspense>
  );
}
