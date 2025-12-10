'use client';

import Image from 'next/image';
import React from 'react';
import { motion } from 'framer-motion';
import { ClipboardList, ShoppingBag, Wallet, BarChart3 } from 'lucide-react';

export default function MonthlyShoppingPlanSection() {
  const steps = [
    {
      icon: <ClipboardList className="w-6 h-6 text-indigo-600" />,
      title: '1. Add Items You Wish To Buy',
      desc: 'Start by adding all the things you plan to purchase this month — from groceries to gadgets.',
      bg: 'bg-gradient-to-br from-indigo-50 to-blue-100',
    },
    {
      icon: <ShoppingBag className="w-6 h-6 text-blue-600" />,
      title: '2. Mark Items When You Buy',
      desc: 'Once you purchase something, simply mark it as bought — your list updates automatically.',
      bg: 'bg-gradient-to-br from-blue-50 to-cyan-100',
    },
    {
      icon: <Wallet className="w-6 h-6 text-teal-600" />,
      title: '3. Track Monthly Spending',
      desc: 'See how much you’ve spent this month — auto-calculated from your bought items.',
      bg: 'bg-gradient-to-br from-teal-50 to-emerald-100',
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-green-600" />,
      title: '4. Review & Plan Smarter',
      desc: 'Compare your past months, find spending patterns, and plan a better budget next time.',
      bg: 'bg-gradient-to-br from-lime-50 to-green-100',
    },
  ];

  return (
    <section className="relative isolate overflow-hidden py-28">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-slate-950 to-emerald-950 text-white" />
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_30%_20%,rgba(99,102,241,0.6),transparent_55%),radial-gradient(circle_at_70%_80%,rgba(16,185,129,0.5),transparent_55%)]" />

      <div className="relative max-w-6xl mx-auto px-6 md:px-10 grid gap-12 lg:grid-cols-2 items-center text-white">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div>
            <span className="inline-flex px-4 py-1 rounded-full text-xs uppercase tracking-[0.35em] border border-white/20 text-indigo-200">
              Shopping HQ
            </span>
            <h2 className="mt-4 text-4xl font-bold leading-tight">
              Forecast spending, enforce limits, and know when you’re
              overshooting
            </h2>
          </div>
          <p className="text-slate-200 text-lg leading-relaxed">
            Build an itemized list, set a ceiling, and let the system warn you
            the second purchased items exceed it. Each list shows “planned vs
            spent” with reminders to stay disciplined.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {steps.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="rounded-2xl border border-white/15 bg-white/5 backdrop-blur flex gap-3 p-4"
              >
                <div className="flex-shrink-0 mt-1 text-indigo-200">
                  {s.icon}
                </div>
                <div>
                  <h4 className="font-semibold">{s.title}</h4>
                  <p className="text-sm text-white/80 mt-1">{s.desc}</p>
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
          <div className="absolute -top-10 -right-4 w-36 h-36 bg-indigo-400/50 blur-3xl" />
          <div className="absolute -bottom-10 -left-6 w-40 h-40 bg-emerald-400/50 blur-3xl" />
          <div className="relative rounded-[32px] border border-white/20 bg-white/10 backdrop-blur-xl shadow-[0_40px_120px_-50px_rgba(59,130,246,0.7)] p-6 space-y-4">
            <Image
              src="/static-images/key-benefits/animated/detailed-shopping.png"
              alt="Monthly Shopping feature preview"
              width={520}
              height={360}
              className="rounded-2xl object-contain"
            />
            <div className="grid gap-3 text-sm text-white/90">
              <div className="flex items-center justify-between">
                <span>Budget limit</span>
                <span className="font-semibold text-emerald-200">₨ 18,000</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Spent so far</span>
                <span className="font-semibold text-rose-300">₨ 19,750</span>
              </div>
              <p className="text-xs text-rose-200">
                ⚠ Limit exceeded · alerts triggered on WhatsApp + homepage.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
