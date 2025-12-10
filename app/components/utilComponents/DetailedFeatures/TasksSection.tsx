'use client';

import Image from 'next/image';
import React from 'react';
import { motion } from 'framer-motion';

const taskBenefits = [
  'Tasks auto-group into Today, Next 3 days, and Later so you see immediate priorities.',
  'Sub-steps sit under each task with AI-generated checklists to avoid missing details.',
  'Progress rings and overdue counters surface the work that needs escalation.',
  'Priority, energy level, and estimated minutes make it easy to slot tasks into the schedule.',
];

export default function TasksSection() {
  return (
    <section className="relative isolate overflow-hidden py-28">
      <div className="absolute inset-0 bg-gradient-to-br from-white via-sky-50 to-emerald-50 dark:from-gray-950 dark:via-slate-900 dark:to-emerald-950/20" />
      <div className="relative max-w-6xl mx-auto px-6 md:px-10 grid gap-12 lg:grid-cols-2 items-center">
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div>
            <span className="inline-flex px-4 py-1 rounded-full text-xs uppercase tracking-[0.35em] bg-sky-100 text-sky-600 dark:bg-sky-900/40 dark:text-sky-300">
              Tasks OS
            </span>
            <h2 className="mt-4 text-4xl font-bold text-gray-900 dark:text-white leading-tight">
              Capture tasks with natural text and let the system build the rest
            </h2>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
            Type “@task Finish proposal tomorrow // steps send draft, review
            with Ali” and the board formats everything, assigns dates, and links
            it to the right goal. No manual copy-paste.
          </p>
          <div className="space-y-4">
            {taskBenefits.map((benefit, idx) => (
              <motion.div
                key={benefit}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08 }}
                viewport={{ once: true }}
                className="flex gap-3 rounded-2xl border border-sky-100 dark:border-slate-800 bg-white dark:bg-gray-900/60 px-4 py-3 shadow-sm"
              >
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-sky-500 to-emerald-500 text-white text-xs flex items-center justify-center mt-1">
                  {idx + 1}
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {benefit}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="relative"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="absolute -top-12 -right-4 w-40 h-40 bg-sky-300/40 blur-3xl" />
          <div className="absolute -bottom-10 -left-6 w-44 h-44 bg-emerald-300/40 blur-3xl" />
          <div className="relative rounded-[32px] border border-white shadow-[0_30px_120px_-50px_rgba(56,189,248,0.8)] bg-white/90 dark:bg-gray-900/80 backdrop-blur-xl p-6 space-y-4">
            <Image
              src="/static-images/key-benefits/animated/detailed-to-do.gif"
              alt="Tasks feature preview"
              width={520}
              height={360}
              className="rounded-2xl object-contain"
            />
            <div className="rounded-2xl border border-sky-100 dark:border-slate-800 bg-sky-50/60 dark:bg-gray-900/60 p-4">
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold text-gray-900 dark:text-gray-100">
                  “Ship proposal draft”
                </span>
                <span className="text-xs uppercase tracking-wide text-sky-500">
                  due tomorrow
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                AI created 3 steps + added context from the related goal. Tap
                once to mark an entire sub-step complete.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
