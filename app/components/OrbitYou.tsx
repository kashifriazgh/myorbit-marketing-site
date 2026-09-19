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
  TrendingUp,
  CheckCircle2,
} from "lucide-react";

export default function OrbitYou() {
  return (
    <section className="relative isolate overflow-hidden bg-slate-50 dark:bg-[#040d1a] py-24 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      {/* Background Ambient Glows */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[45rem] w-[45rem] rounded-full bg-gradient-to-tr from-cyan-500/15 via-indigo-500/15 to-emerald-500/15 blur-3xl dark:from-cyan-500/10 dark:via-indigo-500/10 dark:to-emerald-500/10" />
      </div>

      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-cyan-500/10 via-indigo-500/10 to-emerald-500/10 border border-cyan-500/20 text-cyan-700 dark:text-cyan-300 text-xs font-bold tracking-widest uppercase shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-cyan-500 animate-pulse" />
            Orbit Architecture
          </span>
          <h2 className="mt-4 text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
            You are at the{" "}
            <span className="bg-gradient-to-r from-cyan-500 via-indigo-500 to-emerald-400 bg-clip-text text-transparent">
              Center
            </span>
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-300">
            Schedules, Todos, Finance, and Goals orbit directly around <strong>YOU</strong> in one synchronized ecosystem.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* MAIN ORBIT CANVAS WITH CONNECTOR LINES & FLOATING NODES                   */}
        {/* ========================================================================= */}
        <div className="relative mx-auto max-w-4xl min-h-[620px] sm:min-h-[680px] flex items-center justify-center p-4 sm:p-8">
          
          {/* ----------------------------------------------------------------------- */}
          {/* OUTER ENCOMPASSING ORBITAL HALO                                         */}
          {/* ----------------------------------------------------------------------- */}
          <div className="absolute inset-0 rounded-[3rem] border-2 border-dashed border-sky-400/30 dark:border-sky-400/20 bg-white/40 dark:bg-slate-900/30 backdrop-blur-xl shadow-2xl transition-all duration-300">
            {/* Top Badge */}
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-20">
              <div className="flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-cyan-500 via-indigo-600 to-emerald-500 text-white font-bold text-xs uppercase tracking-widest shadow-lg shadow-indigo-500/20 border border-white/20">
                <Sparkles className="w-4 h-4 animate-spin-slow" />
                <span>Integrated Productivity Orbit</span>
              </div>
            </div>
          </div>

          {/* ----------------------------------------------------------------------- */}
          {/* SVG CONNECTOR LINES RADIATING FROM CENTER ("YOU") TO 4 CORNER NODES     */}
          {/* ----------------------------------------------------------------------- */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible" viewBox="0 0 800 600" preserveAspectRatio="none">
            <defs>
              <linearGradient id="beam-top-left" x1="0%" y1="0%" x2="50%" y2="50%">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#6366f1" stopOpacity="0.2" />
              </linearGradient>
              <linearGradient id="beam-top-right" x1="100%" y1="0%" x2="50%" y2="50%">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#6366f1" stopOpacity="0.2" />
              </linearGradient>
              <linearGradient id="beam-bottom-left" x1="0%" y1="100%" x2="50%" y2="50%">
                <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#6366f1" stopOpacity="0.2" />
              </linearGradient>
              <linearGradient id="beam-bottom-right" x1="100%" y1="100%" x2="50%" y2="50%">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#6366f1" stopOpacity="0.2" />
              </linearGradient>
            </defs>

            {/* Diagonal Connector Lines */}
            <line x1="180" y1="130" x2="400" y2="300" stroke="url(#beam-top-left)" strokeWidth="2.5" strokeDasharray="6 4" />
            <line x1="620" y1="130" x2="400" y2="300" stroke="url(#beam-top-right)" strokeWidth="2.5" strokeDasharray="6 4" />
            <line x1="180" y1="470" x2="400" y2="300" stroke="url(#beam-bottom-left)" strokeWidth="2.5" strokeDasharray="6 4" />
            <line x1="620" y1="470" x2="400" y2="300" stroke="url(#beam-bottom-right)" strokeWidth="2.5" strokeDasharray="6 4" />

            {/* Animated Pulses traveling along connector paths */}
            <circle r="4" fill="#06b6d4">
              <animateMotion path="M 180 130 L 400 300" dur="3s" repeatCount="indefinite" />
            </circle>
            <circle r="4" fill="#10b981">
              <animateMotion path="M 620 130 L 400 300" dur="3.5s" repeatCount="indefinite" />
            </circle>
            <circle r="4" fill="#14b8a6">
              <animateMotion path="M 180 470 L 400 300" dur="3.2s" repeatCount="indefinite" />
            </circle>
            <circle r="4" fill="#38bdf8">
              <animateMotion path="M 620 470 L 400 300" dur="3.8s" repeatCount="indefinite" />
            </circle>
          </svg>

          {/* ----------------------------------------------------------------------- */}
          {/* CENTER: YOU ORBIT CORE                                                  */}
          {/* ----------------------------------------------------------------------- */}
          <div className="relative z-10 flex flex-col items-center justify-center my-auto">
            <motion.div
              animate={{ scale: [1, 1.04, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-44 h-44 sm:w-52 sm:h-52 flex items-center justify-center"
            >
              <svg viewBox="0 0 512 512" className="w-full h-full drop-shadow-2xl">
                <defs>
                  <radialGradient id="bg-glow-custom" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#1e293b" />
                    <stop offset="100%" stopColor="#090d16" />
                  </radialGradient>
                  <radialGradient id="ambient-glow-custom" cx="50%" cy="50%" r="60%">
                    <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.3" />
                    <stop offset="60%" stopColor="#4f46e5" stopOpacity="0.12" />
                    <stop offset="100%" stopColor="#000000" stopOpacity="0" />
                  </radialGradient>
                  <linearGradient id="orbit-grad-1-custom" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#38bdf8" />
                    <stop offset="50%" stopColor="#6366f1" />
                    <stop offset="100%" stopColor="#10b981" />
                  </linearGradient>
                  <linearGradient id="orbit-grad-2-custom" x1="100%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#06b6d4" />
                    <stop offset="60%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#a855f7" />
                  </linearGradient>
                  <radialGradient id="core-glow-custom" cx="45%" cy="40%" r="60%">
                    <stop offset="0%" stopColor="#67e8f9" />
                    <stop offset="50%" stopColor="#06b6d4" />
                    <stop offset="100%" stopColor="#0284c7" />
                  </radialGradient>
                  <filter id="bloom-custom" x="-30%" y="-30%" width="160%" height="160%">
                    <feGaussianBlur stdDeviation="8" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                <rect width="512" height="512" rx="110" fill="url(#ambient-glow-custom)" />
                <rect x="56" y="56" width="400" height="400" rx="90" fill="url(#bg-glow-custom)" stroke="#334155" strokeOpacity="0.5" strokeWidth="1.5" />

                <circle cx="256" cy="256" r="82" fill="none" stroke="url(#orbit-grad-1-custom)" strokeWidth="3" strokeDasharray="8 6" opacity="0.5" />
                <circle cx="256" cy="256" r="68" fill="none" stroke="#38bdf8" strokeWidth="2" opacity="0.6" />

                <g className="animate-spin-slow origin-center">
                  <ellipse cx="256" cy="256" rx="142" ry="58" fill="none" stroke="url(#orbit-grad-2-custom)" strokeWidth="8" strokeLinecap="round" filter="url(#bloom-custom)" opacity="0.8" />
                </g>

                <g className="animate-pulse origin-center">
                  <ellipse cx="256" cy="256" rx="150" ry="62" fill="none" stroke="url(#orbit-grad-1-custom)" strokeWidth="9" strokeLinecap="round" filter="url(#bloom-custom)" />
                </g>

                <g className="origin-center">
                  <polygon points="256,204 298,228 298,284 256,308 214,284 214,228" fill="url(#core-glow-custom)" stroke="#e0f2fe" strokeWidth="2.5" strokeLinejoin="round" />
                  <text x="256" y="264" textAnchor="middle" fontFamily="system-ui, -apple-system, sans-serif" fontSize="25" fontWeight="800" fill="#ffffff" letterSpacing="0.8px">
                    YOU
                  </text>
                </g>
              </svg>
            </motion.div>
          </div>

          {/* ----------------------------------------------------------------------- */}
          {/* TOP-LEFT NODE: SCHEDULES WITH PREVIEW                                   */}
          {/* ----------------------------------------------------------------------- */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-6 left-3 sm:top-8 sm:left-8 z-10 w-52 sm:w-60"
          >
            <div className="p-4 rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white/90 dark:bg-[#0a1a2e]/90 shadow-xl shadow-slate-200/50 dark:shadow-none backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:border-cyan-400">
              <div className="flex items-center gap-3 mb-2.5">
                <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">Schedules</h3>
                  <span className="text-[11px] font-medium text-cyan-600 dark:text-cyan-300">Time & Date</span>
                </div>
              </div>

              {/* Schedule Item Preview */}
              <div className="mt-2.5 p-2 rounded-xl bg-slate-100/90 dark:bg-slate-900/70 border border-slate-200/60 dark:border-white/5 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 min-w-0">
                  <Clock className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
                  <span className="truncate font-medium text-slate-800 dark:text-slate-200 text-[11px]">4:00 PM Client Call</span>
                </div>
                <span className="text-[10px] text-cyan-600 dark:text-cyan-300 font-semibold shrink-0">Edit</span>
              </div>
            </div>
          </motion.div>

          {/* ----------------------------------------------------------------------- */}
          {/* TOP-RIGHT NODE: TODOS WITH PREVIEW                                      */}
          {/* ----------------------------------------------------------------------- */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute top-6 right-3 sm:top-8 sm:right-8 z-10 w-52 sm:w-60"
          >
            <div className="p-4 rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white/90 dark:bg-[#0a1a2e]/90 shadow-xl shadow-slate-200/50 dark:shadow-none backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:border-emerald-400">
              <div className="flex items-center gap-3 mb-2.5">
                <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  <CheckSquare className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">Todos</h3>
                  <span className="text-[11px] font-medium text-emerald-600 dark:text-emerald-300">Tasks & Priorities</span>
                </div>
              </div>

              {/* Todo Item Preview */}
              <div className="mt-2.5 p-2 rounded-xl bg-slate-100/90 dark:bg-slate-900/70 border border-slate-200/60 dark:border-white/5 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 min-w-0">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span className="truncate font-medium text-slate-800 dark:text-slate-200 text-[11px]">Send client invoice</span>
                </div>
                <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 shrink-0">High</span>
              </div>
            </div>
          </motion.div>

          {/* ----------------------------------------------------------------------- */}
          {/* BOTTOM-LEFT NODE: FINANCE WITH PREVIEW                                  */}
          {/* ----------------------------------------------------------------------- */}
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
            className="absolute bottom-6 left-3 sm:bottom-8 sm:left-8 z-10 w-52 sm:w-60"
          >
            <div className="p-4 rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white/90 dark:bg-[#0a1a2e]/90 shadow-xl shadow-slate-200/50 dark:shadow-none backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:border-teal-400">
              <div className="flex items-center gap-3 mb-2.5">
                <div className="p-2 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20">
                  <Wallet className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">Finance</h3>
                  <span className="text-[11px] font-medium text-teal-600 dark:text-teal-300">Money & Sources</span>
                </div>
              </div>

              {/* Finance Preview */}
              <div className="mt-2.5 p-2 rounded-xl bg-slate-100/90 dark:bg-slate-900/70 border border-slate-200/60 dark:border-white/5 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 min-w-0">
                  <TrendingUp className="w-3.5 h-3.5 text-teal-500 shrink-0" />
                  <span className="truncate font-semibold text-slate-900 dark:text-white text-[11px]">Rs 168,500</span>
                </div>
                <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-300 shrink-0">+Rs 20k</span>
              </div>
            </div>
          </motion.div>

          {/* ----------------------------------------------------------------------- */}
          {/* BOTTOM-RIGHT NODE: GOALS WITH PREVIEW                                   */}
          {/* ----------------------------------------------------------------------- */}
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut", delay: 0.7 }}
            className="absolute bottom-6 right-3 sm:bottom-8 sm:right-8 z-10 w-52 sm:w-60"
          >
            <div className="p-4 rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white/90 dark:bg-[#0a1a2e]/90 shadow-xl shadow-slate-200/50 dark:shadow-none backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:border-sky-400">
              <div className="flex items-center gap-3 mb-2.5">
                <div className="p-2 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20">
                  <Target className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">Goals</h3>
                  <span className="text-[11px] font-medium text-sky-600 dark:text-sky-300">Habit & Fitness</span>
                </div>
              </div>

              {/* Goal Progress Preview */}
              <div className="mt-2.5 p-2 rounded-xl bg-slate-100/90 dark:bg-slate-900/70 border border-slate-200/60 dark:border-white/5 flex flex-col gap-1 text-xs">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-medium text-slate-800 dark:text-slate-200 truncate">New Laptop</span>
                  <span className="font-bold text-sky-600 dark:text-sky-300">87%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-sky-400 to-emerald-400 rounded-full w-[87%]" />
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
