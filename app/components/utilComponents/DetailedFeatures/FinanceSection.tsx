'use client';

import Image from 'next/image';
import React from 'react';
import { motion } from 'framer-motion';
import { Wallet, PiggyBank, Lock, CreditCard } from 'lucide-react';

export default function FinanceSection() {
  const features = [
    {
      icon: <Wallet className="w-6 h-6 text-white" />,
      title: 'Fund Snapshot',
      desc: 'Manage your money across cash, Easypaisa, JazzCash, and bank accounts — all in one place.',
      bg: 'bg-[#4ADE80]', // Green 400
    },
    {
      icon: <Lock className="w-6 h-6 text-white" />,
      title: 'Lock Frozen Funds',
      desc: 'Secure your savings or unused amounts by marking them as frozen funds.',
      bg: 'bg-[#60A5FA]', // Blue 400
    },
    {
      icon: <CreditCard className="w-6 h-6 text-white" />,
      title: 'Write Your Expenses & Incomes',
      desc: 'Easily organize your expected expenses and recurring incomes ahead of time.',
      bg: 'bg-[#FACC15]', // Yellow 400
    },
    {
      icon: <PiggyBank className="w-6 h-6 text-white" />,
      title: 'Manage Loan Records',
      desc: 'Track amounts you lend or borrow — with automatic due-date reminders.',
      bg: 'bg-[#F97316]', // Orange 500
    },
  ];

  return (
    <section className="relative isolate overflow-hidden py-28">
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-950 via-slate-950 to-cyan-950" />
      <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_20%_20%,rgba(16,185,129,0.4),transparent_55%),radial-gradient(circle_at_80%_80%,rgba(6,182,212,0.3),transparent_60%)]" />

      <div className="relative max-w-6xl mx-auto px-6 md:px-10 grid gap-12 lg:grid-cols-[1.05fr_0.95fr] items-center text-white">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div>
            <span className="inline-flex px-4 py-1 rounded-full text-xs uppercase tracking-[0.35em] bg-white/10 border border-white/10 text-emerald-200">
              Finance layer
            </span>
            <h2 className="mt-4 text-4xl font-bold leading-tight">
              Stay cash-aware across cash, wallets, banks, and future impact
            </h2>
          </div>
          <p className="text-slate-200 text-lg leading-relaxed">
            Log incomes, recurring bills, shopping budgets, and loan give/take
            in one place. The 15/30/45 day outlook projects your balance so you
            plan ahead — not react later.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className={`${f.bg} rounded-2xl p-4 flex gap-3 items-start shadow-lg shadow-black/30`}
              >
                <div className="flex-shrink-0 mt-1">{f.icon}</div>
                <div>
                  <h4 className="font-semibold">{f.title}</h4>
                  <p className="text-sm text-white/90 mt-1">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="absolute -top-10 -right-4 w-40 h-40 bg-emerald-400/40 blur-3xl" />
          <div className="absolute -bottom-12 -left-6 w-48 h-48 bg-cyan-400/40 blur-3xl" />
          <div className="relative rounded-[32px] border border-white/20 bg-white/5 backdrop-blur-xl shadow-[0_40px_120px_-50px_rgba(6,182,212,0.8)] p-6 space-y-4">
            <Image
              src="/static-images/key-benefits/animated/detailed-finance.gif"
              alt="Finance feature preview"
              width={520}
              height={360}
              className="rounded-2xl object-contain"
            />
            <div className="grid gap-3 text-sm">
              <div className="flex items-center justify-between text-slate-100">
                <span>Total funds</span>
                <span className="text-emerald-300 font-semibold">
                  ₨ 182,400
                </span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span>Forecast (30 days)</span>
                <span className="text-cyan-300 font-semibold">₨ 212,900</span>
              </div>
              <p className="text-xs text-slate-400">
                Includes frozen funds, recurring invoices, and committed
                shopping lists.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
