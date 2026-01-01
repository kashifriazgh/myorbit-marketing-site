'use client';

import Image from 'next/image';
import React from 'react';

const streakHighlights = [
  'Set habits for every day, week, or month and get optional reminders.',
  'Log your progress anytime, even if the habit isn’t fully done (e.g., “Read 10 pages”).',
  'See your streak history at a glance — wins, missed days, and longest streak.',
  'Check today’s habits right from the homepage so you never forget.'
];


export default function StreaksSection() {
  return (
    <section className="relative isolate overflow-hidden py-28">
      <div className="absolute inset-0 bg-gradient-to-br from-white via-emerald-50 to-slate-50 dark:from-gray-950 dark:via-emerald-950/30 dark:to-slate-950" />
      <div className="relative max-w-6xl mx-auto px-6 md:px-10 grid gap-12 lg:grid-cols-2 items-center">
        <div className="space-y-6 text-center lg:text-left">
          <span className="inline-flex px-4 py-1 rounded-full text-xs uppercase tracking-[0.35em] bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-300">
            Streaks
          </span>
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white leading-tight">
          Track habits and see your progress every day
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
          Create habits like Quran recitation, workouts, or study sessions. Update them when you make progress and see your streak grow over time
          </p>
          <div className="grid gap-3">
            {streakHighlights.map((item) => (
              <div
                key={item}
                className="flex gap-3 rounded-2xl border border-emerald-100 dark:border-emerald-900/40 bg-white dark:bg-gray-900/60 px-4 py-3"
              >
                <span className="text-emerald-500 text-lg">✔</span>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative w-full max-w-xl mx-auto lg:max-w-full">
          <div className="absolute -top-10 -right-6 w-36 h-36 bg-emerald-300/40 blur-3xl" />
          <div className="absolute -bottom-12 -left-4 w-40 h-40 bg-slate-300/40 blur-3xl" />
          <div className="relative rounded-[32px] border border-white shadow-[0_30px_120px_-50px_rgba(16,185,129,0.7)] bg-white/90 dark:bg-gray-900/80 backdrop-blur-xl p-6 space-y-4">
            <Image
              src="/static-images/key-benefits/streaks.png"
              alt="Streaks feature preview"
              width={520}
              height={360}
              className="rounded-2xl object-contain w-full h-auto"
            />
            <div className="grid gap-2 text-sm text-gray-700 dark:text-gray-200">
              <div className="flex items-center justify-between">
                <span>Current streak</span>
                <span className="text-emerald-600 dark:text-emerald-300 font-semibold">
                  21 days
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Longest streak</span>
                <span className="font-semibold">34 days</span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Missed yesterday? The app shows recovery tips and auto-adjusts
                reminders.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
