'use client';

import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-200 py-16 border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col items-center text-center space-y-8">
        <div className="space-y-3">
          <h3 className="text-3xl font-bold text-white tracking-tight">
            MyOrbit
          </h3>
          <p className="text-sm text-slate-400 max-w-xl">
            Personal productivity App with AI-assisted inputs, finance awareness,
            streak tracking, and a quick editor that keeps your day honest.
          </p>
        </div>

        <nav className="flex flex-wrap justify-center gap-6 text-sm font-medium text-slate-400">
          <Link href="/about" className="hover:text-white transition">
            About
          </Link>
          <Link href="/privacy" className="hover:text-white transition">
            Privacy
          </Link>
         
        </nav>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        <p className="text-xs text-slate-500">
          © {new Date().getFullYear()} MyOrbit. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
