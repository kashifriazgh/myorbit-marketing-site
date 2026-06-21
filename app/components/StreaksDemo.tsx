'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Flame,
  Check,
  AlertCircle,
  X
} from 'lucide-react';

export default function StreaksDemo() {
  // State for Mockup: Interactive Streak log
  const [streakCount, setStreakCount] = useState(24);
  const [doneToday, setDoneToday] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [progressText, setProgressText] = useState('');
  const [logs, setLogs] = useState([
    { date: 'Jun 14', progress: 'Surah Baqarah, ayat 15' },
    { date: 'Jun 15', progress: 'Surah Al-Imran, ayat 100' },
  ]);

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleSaveProgress = () => {
    const text = progressText.trim() || 'Completed';
    setLogs((prev) => [...prev, { date: 'Today', progress: text }]);
    setStreakCount((prev) => prev + 1);
    setDoneToday(true);
    setDialogOpen(false);
    setProgressText('');
  };

  // Mockup: Timeline items
  const timelineDays = [
    { label: 'June 10', isDone: true, isMissed: false, short: '10 Jun' },
    { label: 'June 11', isDone: true, isMissed: false, short: '11 Jun' },
    { label: 'June 12', isDone: false, isMissed: true, short: '12 Jun' },
    { label: 'June 13', isDone: true, isMissed: false, short: '13 Jun' },
    { label: 'June 14', isDone: true, isMissed: false, short: '14 Jun' },
    { label: 'June 15', isDone: false, isMissed: false, short: '15 Jun' },
    { label: 'Today', isDone: doneToday, isMissed: false, short: 'Today' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
      
      {/* Information Card */}
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-6 sm:p-8 shadow-xl transition-all duration-300">
        <h4 className="text-xl font-bold text-slate-850 dark:text-white mb-4">
          Streaks & Momentum
        </h4>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
          Streaks are a visual way to track routines and habits. It is not just about ticking off a box; Streaks allow you to save your progression notes for any routine, ensuring consistency.
        </p>
        <div className="space-y-4 text-xs">
          <div className="flex gap-3">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold shrink-0">1</span>
            <div>
              <h5 className="font-bold text-slate-800 dark:text-slate-200 mb-0.5">Flexible Frequencies</h5>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed">Whether your habit is daily, weekly, or monthly, MyOrbit Streaks handles it seamlessly.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold shrink-0">2</span>
            <div>
              <h5 className="font-bold text-slate-800 dark:text-slate-200 mb-0.5">Progress Checkpoints</h5>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed">Save text-based progress notes (e.g. &quot;Surah Tauba, verse 30&quot;) to resume exactly where you left off.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold shrink-0">3</span>
            <div>
              <h5 className="font-bold text-slate-800 dark:text-slate-200 mb-0.5">Absence History</h5>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed">A visual grid tracks your consistency. Green blocks represent checked-off days, while red indicates absences.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Mockup 1: Interactive Streak Card */}
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-xl overflow-hidden transition-all duration-300">
        <div className="p-6 sm:p-8">
          {/* Header Row */}
          <div className="flex justify-between items-start gap-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                <Flame className="w-5 h-5 fill-current" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-slate-850 dark:text-white leading-tight">
                  Quran Recitation
                </h4>
                <span className="text-xs text-slate-405 dark:text-slate-500 uppercase tracking-wider font-semibold block mt-0.5">
                  Daily Habit
                </span>
              </div>
            </div>
            
            <div className="flex items-center gap-1 bg-amber-500/10 text-amber-600 dark:text-amber-400 px-3 py-1 rounded-2xl font-black text-lg">
              <span>{streakCount}</span>
              <Flame className="w-5 h-5 fill-current animate-pulse text-amber-500" />
            </div>
          </div>

          <hr className="border-slate-200 dark:border-slate-800/80 mb-4" />

          {/* Attendance Grid Preview */}
          <div className="mb-4">
            <span className="text-[10px] uppercase font-extrabold text-slate-400 dark:text-slate-500 block tracking-wider mb-2">
              Attendance History (Past Week)
            </span>
            <div className="flex gap-2 overflow-x-auto no-scrollbar py-1 justify-between">
              {timelineDays.map((d, i) => (
                <div
                  key={i}
                  title={d.label}
                  className={`flex-1 min-w-[42px] h-12 rounded-xl flex flex-col items-center justify-center transition ${
                    d.isDone
                      ? 'bg-emerald-50 dark:bg-emerald-950/35 border border-emerald-250 dark:border-emerald-900/40 text-emerald-600 dark:text-emerald-400'
                      : d.isMissed
                      ? 'bg-rose-50 dark:bg-rose-950/35 border border-rose-200 dark:border-rose-900/40 text-rose-600 dark:text-rose-400'
                      : d.short === 'Today'
                      ? 'bg-cyan-50 dark:bg-cyan-950/20 border-2 border-cyan-500 text-cyan-600 dark:text-cyan-400'
                      : 'bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-slate-400 dark:text-slate-600'
                  }`}
                >
                  <span className="text-[10px] font-extrabold leading-none mb-1">
                    {d.isDone ? (
                      <Check className="w-3.5 h-3.5 stroke-[3px]" />
                    ) : d.isMissed ? (
                      <AlertCircle className="w-3.5 h-3.5" />
                    ) : (
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700" />
                    )}
                  </span>
                  <span className="text-[8px] font-bold block uppercase tracking-tight">
                    {d.short === 'Today' ? 'Today' : d.short.split(' ')[0]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Progress History Logs */}
          <div className="mb-6">
            <span className="text-[10px] uppercase font-extrabold text-slate-400 dark:text-slate-500 block tracking-wider mb-2">
              Recent Progress Logs
            </span>
            <div className="flex flex-wrap gap-1.5">
              {logs.map((log, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700/80"
                >
                  <strong>{log.date}:</strong>&nbsp;{log.progress}
                </span>
              ))}
            </div>
          </div>

          {/* Done Button */}
          <button
            onClick={doneToday ? undefined : handleOpenDialog}
            disabled={doneToday}
            className={`w-full py-3.5 px-4 rounded-2xl font-bold text-sm tracking-wide transition-all duration-350 shadow-md ${
              doneToday
                ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-default border border-slate-200 dark:border-slate-700/60 shadow-none'
                : 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-500/20 hover:scale-[1.01] active:scale-[0.99] cursor-pointer'
            }`}
          >
            {doneToday ? 'Done Today ✅' : 'Mark as Done'}
          </button>
        </div>
      </div>

      {/* Simulated Progress Input Dialog (Modal) */}
      <AnimatePresence>
        {dialogOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDialogOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-sm rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-6 overflow-hidden z-10"
            >
              <div className="flex justify-between items-start mb-4">
                <h4 className="text-xl font-extrabold text-slate-900 dark:text-white">
                  Log Today&apos;s Progress
                </h4>
                <button
                  onClick={() => setDialogOpen(false)}
                  className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 dark:text-slate-500 transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5">
                    Today&apos;s Progress (Optional)
                  </label>
                  <textarea
                    rows={2}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition resize-none placeholder-slate-400"
                    placeholder="e.g. Surah Tauba, verse 30"
                    value={progressText}
                    onChange={(e) => setProgressText(e.target.value)}
                  />
                </div>

                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Write what you completed today (optional). This helps you continue from the exact point tomorrow.
                </p>

                <div className="flex gap-3 justify-end pt-2">
                  <button
                    onClick={() => setDialogOpen(false)}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveProgress}
                    className="px-5 py-2 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-600 text-white shadow-md shadow-emerald-500/20 transition"
                  >
                    Save & Log
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
