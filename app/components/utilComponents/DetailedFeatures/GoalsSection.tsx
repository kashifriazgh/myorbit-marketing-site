'use client';

import Image from 'next/image';
import React from 'react';
import { motion } from 'framer-motion';

const goalSteps = [
  {
    title: 'Define a clear target value',
    desc: 'Save Rs. 10,000 , Read 100 pages , 50 social media posts — the metric is yours.',
    badge: 'Step 01',
  },
  {
    title: 'Break it down automatically',
    desc: 'Split it into milestones manually or get automatically suggested by App.',
    badge: 'Step 02',
  },
  {
    title: 'Review momentum weekly',
    desc: 'Motivate yourself by setting a deadline. See the progress daily and never slip from the target.',
    badge: 'Step 03',
  },
];

export default function GoalsSection() {
  return (
    <section className="relative isolate overflow-hidden py-28">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-50 via-white to-emerald-50 dark:from-gray-950 dark:via-cyan-950/20 dark:to-emerald-950/30" />
      <div className="relative max-w-6xl mx-auto px-6 md:px-10 grid gap-12 lg:grid-cols-2 items-center">
        <motion.div
          className="space-y-8 text-center lg:text-left"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div>
            <span className="inline-flex px-4 py-1 rounded-full text-xs uppercase tracking-[0.35em] bg-cyan-100 text-cyan-600 dark:bg-cyan-900/40 dark:text-cyan-200">
              Goals
            </span>
            <h2 className="mt-4 text-4xl font-bold text-gray-900 dark:text-white leading-tight">
  Set clear goals, break them into steps, and track progress
</h2>

          </div>
          <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
  Set a goal, define a target, and break it into milestones. Your progress
  updates automatically as you complete steps, so you always know where you
  stand.
</p>


          <div className="space-y-4">
            {goalSteps.map((step, idx) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="flex gap-4 rounded-3xl border border-cyan-100 dark:border-cyan-900/50 bg-white dark:bg-gray-900/70 px-5 py-4"
              >
                <div className="text-xs uppercase tracking-[0.3em] text-cyan-500 mt-1">
                  {step.badge}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="relative w-full max-w-xl mx-auto lg:max-w-full"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="absolute -top-10 -right-6 w-36 h-36 bg-cyan-300/40 blur-3xl" />
          <div className="absolute -bottom-12 -left-4 w-44 h-44 bg-emerald-300/40 blur-3xl" />
          <div className="relative rounded-[32px] border border-white shadow-[0_30px_120px_-60px_rgba(6,182,212,0.9)] bg-white/95 dark:bg-gray-900/80 backdrop-blur-xl p-6 space-y-4">
            <Image
              src="/static-images/key-benefits/goals detailed.png"
              alt="Goals feature preview"
              width={520}
              height={360}
              className="rounded-2xl object-contain w-full h-auto"
            />
            <div className="grid gap-4 text-sm text-gray-700 dark:text-gray-200">
              <div className="flex items-center justify-between">
                <span className="font-semibold">
                  Goal: Complete 120 journal entries
                </span>
                <span className="text-cyan-500 font-semibold">68%</span>
              </div>
              <div className="h-2 rounded-full bg-gray-200 dark:bg-gray-800">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-emerald-500"
                  style={{ width: '68%' }}
                />
              </div>
              <p className="text-xs uppercase tracking-[0.3em] text-cyan-400">
                Next milestone: 80 entries · suggested by AI
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
