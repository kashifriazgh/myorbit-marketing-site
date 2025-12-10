'use client';

import Image from 'next/image';
import React from 'react';
import {
  CalendarDays,
  Repeat,
  Sparkles,
  ArrowUpDown,
  Clock,
} from 'lucide-react';

const highlights = [
  { label: '24H timeline', detail: 'Past hours fade, next hours stay bold.' },
  { label: 'Auto stacking', detail: 'Clashes reflow instantly, no overlaps.' },
  { label: 'AI nudges', detail: 'Slots get suggestions based on habits.' },
];

export default function SchedulesSection() {
  return (
    <section className="relative isolate overflow-hidden py-28">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-sky-50 to-white dark:from-gray-950 dark:via-emerald-950/20 dark:to-gray-950" />
      <div className="absolute inset-y-16 left-1/2 w-3/4 -translate-x-1/2 bg-emerald-200/40 blur-[160px]" />
      <div className="relative max-w-6xl mx-auto px-6 md:px-10 grid gap-12 lg:grid-cols-2 items-center">
        {/* Text */}
        <div className="space-y-6 text-gray-900 dark:text-gray-100">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full text-sm font-semibold uppercase tracking-[0.35em] bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
            <CalendarDays className="w-4 h-4" />
            Schedules
          </div>
          <h2 className="text-4xl font-bold leading-tight">
            Design your entire day, see conflicts, and free up mental load
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
            The vertical planner mirrors the way you think—hour-by-hour. Past
            segments fade out, upcoming segments glow, and recurring routines
            slot themselves so you’re never dragging boxes around.
          </p>

          <div className="grid gap-3">
            {highlights.map((item) => (
              <div
                key={item.label}
                className="flex items-start gap-3 rounded-2xl border border-emerald-100 dark:border-emerald-900/60 bg-white dark:bg-gray-900/50 px-4 py-3 shadow-sm"
              >
                <Clock className="text-emerald-500 w-5 h-5 mt-1" />
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wide text-emerald-600 dark:text-emerald-300">
                    {item.label}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {item.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li className="flex gap-3">
              <Repeat className="w-5 h-5 text-emerald-500 mt-1" />
              <span>
                Recurring templates for office, study, or prayer times keep base
                routines intact.
              </span>
            </li>
            <li className="flex gap-3">
              <ArrowUpDown className="w-5 h-5 text-emerald-500 mt-1" />
              <span>
                Drag hours to reshuffle the entire day; the timeline
                auto-adjusts durations.
              </span>
            </li>
            <li className="flex gap-3">
              <Sparkles className="w-5 h-5 text-emerald-500 mt-1" />
              <span>
                AI suggests recovery breaks or prep slots when it detects
                back-to-back commitments.
              </span>
            </li>
          </ul>
        </div>

        {/* Visual */}
        <div className="relative">
          <div className="absolute -top-10 -right-6 w-32 h-32 bg-emerald-300/40 blur-3xl" />
          <div className="absolute -bottom-8 -left-4 w-36 h-36 bg-sky-300/40 blur-3xl" />
          <div className="relative rounded-[32px] border border-white shadow-[0_30px_120px_-50px_rgba(16,185,129,0.8)] bg-white/90 dark:bg-gray-900/70 backdrop-blur-xl p-6">
            <Image
              src="/static-images/key-benefits/animated/detailed-schedules.gif"
              alt="Schedules feature preview"
              width={540}
              height={420}
              className="rounded-2xl object-contain"
            />
            <div className="mt-6 grid gap-3 text-sm text-gray-700 dark:text-gray-200">
              <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800">
                <span className="font-medium">Morning focus block</span>
                <span className="text-emerald-500 font-semibold">
                  08:00 - 10:30
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Prep buffer inserted</span>
                <span className="text-xs uppercase tracking-wide text-emerald-500">
                  AI suggestion
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
