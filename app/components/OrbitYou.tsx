"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  CheckSquare,
  Wallet,
  Target,
  Sparkles,
  Clock,
  CheckCircle2,
} from "lucide-react";

export default function OrbitYou() {
  return (
    <section className="relative isolate overflow-hidden bg-slate-50 dark:bg-[#040d1a] py-20 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      {/* Background Ambient Glows */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[42rem] w-[42rem] rounded-full bg-gradient-to-tr from-cyan-500/15 via-indigo-500/15 to-emerald-500/15 blur-3xl dark:from-cyan-500/10 dark:via-indigo-500/10 dark:to-emerald-500/10" />
      </div>

      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16 space-y-3">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-cyan-500/10 via-indigo-500/10 to-emerald-500/10 border border-cyan-500/20 text-cyan-700 dark:text-cyan-300 text-xs font-bold tracking-widest uppercase shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-cyan-500 animate-pulse" />
            Orbit Architecture
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
            You are at the{" "}
            <span className="bg-gradient-to-r from-cyan-500 via-indigo-500 to-emerald-400 bg-clip-text text-transparent">
              Center
            </span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
            Schedules, Todos, Finance, and Goals orbit directly around <strong>YOU</strong> in one synchronized ecosystem.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* CIRCULAR ORBIT CANVAS                                                     */}
        {/* ========================================================================= */}
        <div className="relative mx-auto max-w-3xl min-h-[480px] sm:min-h-[560px] flex items-center justify-center p-2 sm:p-6">
          
          {/* Outer Orbit Dial Circle */}
          <div className="absolute inset-2 sm:inset-6 rounded-full border-2 border-dashed border-sky-400/25 dark:border-sky-400/20 bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl shadow-2xl transition-all duration-300" />

          {/* SVG Connector Rays from Center to 4 Quadrants */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible" viewBox="0 0 600 500" preserveAspectRatio="none">
            <defs>
              <linearGradient id="ray-top-left" x1="0%" y1="0%" x2="50%" y2="50%">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#6366f1" stopOpacity="0.2" />
              </linearGradient>
              <linearGradient id="ray-top-right" x1="100%" y1="0%" x2="50%" y2="50%">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#6366f1" stopOpacity="0.2" />
              </linearGradient>
              <linearGradient id="ray-bottom-left" x1="0%" y1="100%" x2="50%" y2="50%">
                <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#6366f1" stopOpacity="0.2" />
              </linearGradient>
              <linearGradient id="ray-bottom-right" x1="100%" y1="100%" x2="50%" y2="50%">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#6366f1" stopOpacity="0.2" />
              </linearGradient>
            </defs>

            {/* Rays */}
            <line x1="150" y1="110" x2="300" y2="250" stroke="url(#ray-top-left)" strokeWidth="2" strokeDasharray="5 4" />
            <line x1="450" y1="110" x2="300" y2="250" stroke="url(#ray-top-right)" strokeWidth="2" strokeDasharray="5 4" />
            <line x1="150" y1="390" x2="300" y2="250" stroke="url(#ray-bottom-left)" strokeWidth="2" strokeDasharray="5 4" />
            <line x1="450" y1="390" x2="300" y2="250" stroke="url(#ray-bottom-right)" strokeWidth="2" strokeDasharray="5 4" />

            {/* Pulsing Dots */}
            <circle r="3.5" fill="#06b6d4">
              <animateMotion path="M 150 110 L 300 250" dur="3s" repeatCount="indefinite" />
            </circle>
            <circle r="3.5" fill="#10b981">
              <animateMotion path="M 450 110 L 300 250" dur="3.5s" repeatCount="indefinite" />
            </circle>
            <circle r="3.5" fill="#14b8a6">
              <animateMotion path="M 150 390 L 300 250" dur="3.2s" repeatCount="indefinite" />
            </circle>
            <circle r="3.5" fill="#38bdf8">
              <animateMotion path="M 450 390 L 300 250" dur="3.8s" repeatCount="indefinite" />
            </circle>
          </svg>

          {/* ----------------------------------------------------------------------- */}
          {/* CENTER HUB: "YOU"                                                       */}
          {/* ----------------------------------------------------------------------- */}
          <div className="relative z-20 flex flex-col items-center justify-center my-auto">
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-36 h-36 sm:w-48 sm:h-48 flex items-center justify-center"
            >
              <svg viewBox="0 0 512 512" className="w-full h-full drop-shadow-2xl">
                <defs>
                  <radialGradient id="bg-glow-clock" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#1e293b" />
                    <stop offset="100%" stopColor="#090d16" />
                  </radialGradient>
                  <radialGradient id="ambient-glow-clock" cx="50%" cy="50%" r="60%">
                    <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.35" />
                    <stop offset="60%" stopColor="#4f46e5" stopOpacity="0.15" />
                    <stop offset="100%" stopColor="#000000" stopOpacity="0" />
                  </radialGradient>
                  <linearGradient id="orbit-grad-1-clock" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#38bdf8" />
                    <stop offset="50%" stopColor="#6366f1" />
                    <stop offset="100%" stopColor="#10b981" />
                  </linearGradient>
                  <linearGradient id="orbit-grad-2-clock" x1="100%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#06b6d4" />
                    <stop offset="60%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#a855f7" />
                  </linearGradient>
                  <radialGradient id="core-glow-clock" cx="45%" cy="40%" r="60%">
                    <stop offset="0%" stopColor="#67e8f9" />
                    <stop offset="50%" stopColor="#06b6d4" />
                    <stop offset="100%" stopColor="#0284c7" />
                  </radialGradient>
                  <filter id="bloom-clock" x="-30%" y="-30%" width="160%" height="160%">
                    <feGaussianBlur stdDeviation="8" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                <rect width="512" height="512" rx="110" fill="url(#ambient-glow-clock)" />
                <rect x="56" y="56" width="400" height="400" rx="90" fill="url(#bg-glow-clock)" stroke="#334155" strokeOpacity="0.5" strokeWidth="1.5" />

                <circle cx="256" cy="256" r="82" fill="none" stroke="url(#orbit-grad-1-clock)" strokeWidth="3" strokeDasharray="8 6" opacity="0.5" />
                <circle cx="256" cy="256" r="68" fill="none" stroke="#38bdf8" strokeWidth="2" opacity="0.6" />

                <g className="animate-spin-slow origin-center">
                  <ellipse cx="256" cy="256" rx="142" ry="58" fill="none" stroke="url(#orbit-grad-2-clock)" strokeWidth="8" strokeLinecap="round" filter="url(#bloom-clock)" opacity="0.8" />
                </g>

                <g className="animate-pulse origin-center">
                  <ellipse cx="256" cy="256" rx="150" ry="62" fill="none" stroke="url(#orbit-grad-1-clock)" strokeWidth="9" strokeLinecap="round" filter="url(#bloom-clock)" />
                </g>

                <g className="origin-center">
                  <polygon points="256,204 298,228 298,284 256,308 214,284 214,228" fill="url(#core-glow-clock)" stroke="#e0f2fe" strokeWidth="2.5" strokeLinejoin="round" />
                  <text x="256" y="264" textAnchor="middle" fontFamily="system-ui, -apple-system, sans-serif" fontSize="25" fontWeight="800" fill="#ffffff" letterSpacing="0.8px">
                    YOU
                  </text>
                </g>
              </svg>
            </motion.div>
          </div>

          {/* ----------------------------------------------------------------------- */}
          {/* TOP-LEFT NODE: SCHEDULES                                                */}
          {/* ----------------------------------------------------------------------- */}
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-4 left-3 sm:top-6 sm:left-6 z-10 max-w-[140px] sm:max-w-[190px]"
          >
            <div className="p-2.5 sm:p-3.5 rounded-2xl border border-cyan-500/30 bg-white/95 dark:bg-[#0a1a2e]/95 shadow-lg backdrop-blur-xl transition-all hover:scale-105 hover:border-cyan-400">
              <div className="flex items-center gap-2 mb-1.5">
                <div className="p-1.5 rounded-lg bg-cyan-500/15 text-cyan-500 border border-cyan-500/30">
                  <Calendar className="w-4 h-4" />
                </div>
                <h3 className="text-xs sm:text-sm font-black text-slate-900 dark:text-white">Schedules</h3>
              </div>
              <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200/60 dark:border-white/5 flex items-center gap-1.5 text-[10px] font-medium text-slate-700 dark:text-slate-300">
                <Clock className="w-3 h-3 text-cyan-500 shrink-0" />
                <span className="truncate">4:00 PM Client Call</span>
              </div>
            </div>
          </motion.div>

          {/* ----------------------------------------------------------------------- */}
          {/* TOP-RIGHT NODE: TODOS                                                   */}
          {/* ----------------------------------------------------------------------- */}
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute top-4 right-3 sm:top-6 sm:right-6 z-10 max-w-[140px] sm:max-w-[190px]"
          >
            <div className="p-2.5 sm:p-3.5 rounded-2xl border border-emerald-500/30 bg-white/95 dark:bg-[#0a1a2e]/95 shadow-lg backdrop-blur-xl transition-all hover:scale-105 hover:border-emerald-400">
              <div className="flex items-center gap-2 mb-1.5">
                <div className="p-1.5 rounded-lg bg-emerald-500/15 text-emerald-500 border border-emerald-500/30">
                  <CheckSquare className="w-4 h-4" />
                </div>
                <h3 className="text-xs sm:text-sm font-black text-slate-900 dark:text-white">Todos</h3>
              </div>
              <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200/60 dark:border-white/5 flex items-center gap-1.5 text-[10px] font-medium text-slate-700 dark:text-slate-300">
                <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
                <span className="truncate">Send invoice</span>
              </div>
            </div>
          </motion.div>

          {/* ----------------------------------------------------------------------- */}
          {/* BOTTOM-RIGHT NODE: GOALS                                                */}
          {/* ----------------------------------------------------------------------- */}
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut", delay: 0.7 }}
            className="absolute bottom-4 right-3 sm:bottom-6 sm:right-6 z-10 max-w-[140px] sm:max-w-[190px]"
          >
            <div className="p-2.5 sm:p-3.5 rounded-2xl border border-sky-500/30 bg-white/95 dark:bg-[#0a1a2e]/95 shadow-lg backdrop-blur-xl transition-all hover:scale-105 hover:border-sky-400">
              <div className="flex items-center gap-2 mb-1.5">
                <div className="p-1.5 rounded-lg bg-sky-500/15 text-sky-500 border border-sky-500/30">
                  <Target className="w-4 h-4" />
                </div>
                <h3 className="text-xs sm:text-sm font-black text-slate-900 dark:text-white">Goals</h3>
              </div>
              <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200/60 dark:border-white/5 flex items-center justify-between text-[10px] font-bold">
                <span className="truncate text-slate-700 dark:text-slate-300">Buy Laptop</span>
                <span className="text-sky-500">87%</span>
              </div>
            </div>
          </motion.div>

          {/* ----------------------------------------------------------------------- */}
          {/* BOTTOM-LEFT NODE: FINANCE                                               */}
          {/* ----------------------------------------------------------------------- */}
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
            className="absolute bottom-4 left-3 sm:bottom-6 sm:left-6 z-10 max-w-[140px] sm:max-w-[190px]"
          >
            <div className="p-2.5 sm:p-3.5 rounded-2xl border border-teal-500/30 bg-white/95 dark:bg-[#0a1a2e]/95 shadow-lg backdrop-blur-xl transition-all hover:scale-105 hover:border-teal-400">
              <div className="flex items-center gap-2 mb-1.5">
                <div className="p-1.5 rounded-lg bg-teal-500/15 text-teal-500 border border-teal-500/30">
                  <Wallet className="w-4 h-4" />
                </div>
                <h3 className="text-xs sm:text-sm font-black text-slate-900 dark:text-white">Finance</h3>
              </div>
              <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200/60 dark:border-white/5 flex items-center justify-between text-[10px] font-bold">
                <span className="truncate text-slate-700 dark:text-slate-300">Rs 185,400</span>
                <span className="text-emerald-500">+Rs 20k</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
