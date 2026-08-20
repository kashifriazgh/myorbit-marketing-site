'use client';

import { useState, useEffect } from 'react';
import { CheckCircle2, Circle, ArrowRight, Play, Pause, RotateCcw } from 'lucide-react';

const TASKS = [
  { label: 'Fajr on time 🕌', pct: 22 },
  { label: "Qur'an — 1 Juz 📖", pct: 41 },
  { label: 'Complete today important tasks 💻', pct: 63 },
  { label: 'Learn something new for 1 hour 🏋️‍♂️', pct: 82 },
  { label: 'Plan for tomorrow before going to bed 📴', pct: 99 },
];

export default function Motivation() {
  const [checked, setChecked] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;

    if (checked < TASKS.length) {
      const t = setTimeout(
        () => setChecked((c) => c + 1),
        checked === 0 ? 1200 : 900
      );
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setChecked(0), 2500);
    return () => clearTimeout(t);
  }, [checked, isPlaying]);

  const currentPct = checked === 0 ? 0 : TASKS[checked - 1].pct;

  const handleTaskClick = (index: number) => {
    setIsPlaying(false); // Pause auto-play when user interacts
    if (checked === index + 1) {
      // Toggle off the clicked task
      setChecked(index);
    } else {
      // Set tasks completed up to this task
      setChecked(index + 1);
    }
  };

  const handleReset = () => {
    setChecked(0);
    setIsPlaying(false);
  };

  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-white to-slate-55 dark:from-[#040d1a] dark:to-slate-950 pt-28 pb-20 md:pt-36 md:pb-28 transition-colors duration-300">
      {/* Ambient glow effects */}
      <div className="pointer-events-none absolute -top-40 -left-40 w-96 h-96 bg-emerald-500/10 dark:bg-emerald-500/20 opacity-40 dark:opacity-20 blur-3xl rounded-full transition-colors duration-300"></div>
      <div className="pointer-events-none absolute top-1/3 -right-32 w-80 h-80 bg-cyan-550/10 dark:bg-cyan-500/10 opacity-30 dark:opacity-10 blur-3xl rounded-full transition-colors duration-300"></div>

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(#94a3b8 1px,transparent 1px),linear-gradient(90deg,#94a3b8 1px,transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        {/* Left column: Heading & Quote */}
        <div className="flex flex-col items-start text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono font-bold tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-50/80 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20 shadow-sm mb-6 select-none animate-pulse">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            💡 A Productivity Secret
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white leading-[1.2] tracking-tight mb-6">
            <span className="block text-slate-450 dark:text-slate-550 text-xs sm:text-sm font-bold tracking-widest uppercase font-mono mb-3">
              The Compound Effect
            </span>
            If you complete{" "}
            <span className="relative inline-block px-3.5 py-1 mx-1 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 text-slate-800 dark:text-slate-100 font-extrabold shadow-sm select-none">
              {"Today's Tasks,"}
              <span className="absolute -top-1.5 -right-1 text-xs select-none">✨</span>
            </span>
            <br className="hidden sm:block" />
            {"you're already on your way to "}
            <span className="relative inline-block mt-1.5">
              <span className="relative z-10 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 bg-clip-text text-transparent font-extrabold">
                consistent success! 🚀🎯
              </span>
              <span className="absolute bottom-1 left-0 w-full h-[6px] bg-gradient-to-r from-emerald-400/30 to-cyan-400/30 rounded-full blur-[1px] -z-10"></span>
            </span>
          </h1>

          <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed mb-8 max-w-md">
            Most people write a list and never open it again. MyOrbit turns your tasks, habits, and goals into one visual system that actually gets finished. AI does the heavy lifting so you accomplish more with less friction.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <a 
              href="#pricing"
              className="group inline-flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-bold px-8 py-4 rounded-2xl hover:opacity-95 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-lg shadow-emerald-500/20 dark:shadow-emerald-500/40"
            >
              Claim founding member access
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a 
              href="#features"
              className="inline-flex items-center justify-center gap-2 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-350 font-semibold px-8 py-4 rounded-2xl hover:border-emerald-500 dark:hover:border-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-all duration-300"
            >
              See how it works
            </a>
          </div>
        </div>

        {/* Right column: Interactive checklist card */}
        <div className="relative w-full max-w-md mx-auto md:max-w-none">
          <div className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl transition-all duration-300 hover:border-emerald-500/30 dark:hover:border-emerald-400/30 group">
            
            {/* Simulation Header */}
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100 dark:border-slate-800/80">
              <div>
                <span className="text-slate-450 dark:text-slate-500 text-xs font-mono uppercase tracking-widest block mb-1">
                  {"Today's Habit Loop"}
                </span>
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-650 dark:text-slate-400">
                  <span className={`w-1.5 h-1.5 rounded-full ${isPlaying ? 'bg-emerald-500 animate-pulse' : 'bg-amber-450'}`} />
                  {isPlaying ? 'Auto-playing' : 'Interactive mode'}
                </span>
              </div>
              
              <div className="text-right">
                <span className="text-4xl font-black text-slate-900 dark:text-white tabular-nums tracking-tight">
                  {currentPct}
                  <span className="text-emerald-500 dark:text-emerald-400">%</span>
                </span>
              </div>
            </div>

            {/* Tasks list */}
            <div className="space-y-3">
              {TASKS.map((task, i) => {
                const done = i < checked;
                return (
                  <button
                    key={task.label}
                    onClick={() => handleTaskClick(i)}
                    className={`w-full flex items-center justify-between p-3 rounded-2xl border text-left transition-all duration-300 cursor-pointer ${
                      done
                        ? 'bg-emerald-50/50 dark:bg-emerald-950/10 border-emerald-200 dark:border-emerald-900/40 text-slate-850 dark:text-slate-100'
                        : 'bg-transparent border-slate-100 dark:border-slate-800/50 text-slate-400 hover:border-slate-200 dark:hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="shrink-0 transition-transform duration-300 active:scale-95">
                        {done ? (
                          <CheckCircle2 className="w-5.5 h-5.5 text-emerald-500 dark:text-emerald-400 fill-emerald-500/10" />
                        ) : (
                          <Circle className="w-5.5 h-5.5 text-slate-350 dark:text-slate-700" />
                        )}
                      </div>
                      <span
                        className={`text-sm font-semibold tracking-wide transition-all duration-300 ${
                          done
                            ? 'line-through decoration-slate-400 dark:decoration-slate-650 opacity-90'
                            : 'opacity-70'
                        }`}
                      >
                        {task.label}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono font-bold text-slate-400 dark:text-slate-500 shrink-0">
                      +{task.pct - (i === 0 ? 0 : TASKS[i - 1].pct)}%
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Custom Interactive Controls */}
            <div className="flex items-center justify-between mt-8 pt-4 border-t border-slate-100 dark:border-slate-850">
              <span className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">
                👉 Click any task to toggle manually
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={togglePlay}
                  title={isPlaying ? 'Pause auto-play' : 'Resume auto-play'}
                  className="p-2 rounded-lg bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/60 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>
                <button
                  onClick={handleReset}
                  title="Reset tasks"
                  className="p-2 rounded-lg bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/60 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Bottom Progress Bar */}
            <div className="mt-6 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 transition-all duration-700 ease-out rounded-full"
                style={{ width: `${currentPct}%` }}
              ></div>
            </div>
          </div>

          {/* Floating Percentile Badge */}
          <div className="absolute -bottom-6 -right-2 md:-right-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 rounded-2xl px-5 py-3 shadow-xl select-none transition-all duration-300 hover:scale-[1.05]">
            <p className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 tracking-wider">
              Percentile beaten
            </p>
            <p className="text-xl font-black text-emerald-500 dark:text-emerald-450 mt-0.5">
              Top {100 - currentPct}% 🏆
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
