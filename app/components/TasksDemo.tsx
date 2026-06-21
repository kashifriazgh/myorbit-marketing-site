'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  Pause,
  Clock,
  Flag,
  Check,
  Star
} from 'lucide-react';

export default function TasksDemo() {
  const [workStarted, setWorkStarted] = useState(false);
  const [whatsappEnabled, setWhatsappEnabled] = useState(false);

  // Checklist steps state
  const [steps, setSteps] = useState([
    {
      id: 1,
      text: 'Review daily targets',
      completed: true,
    },
    {
      id: 2,
      text: 'Draft layout & outline',
      completed: false,
    },
    {
      id: 3,
      text: 'Incorporate user feedback',
      completed: false,
    },
    {
      id: 4,
      text: 'Finalize and launch',
      completed: false,
    },
  ]);

  // Checklist Progress Calculations
  const completedSteps = steps.filter((s) => s.completed).length;
  const progressPercent = Math.round((completedSteps / steps.length) * 100);

  const toggleStep = (id: number) => {
    setSteps((prev) =>
      prev.map((s) => (s.id === id ? { ...s, completed: !s.completed } : s))
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
      
      {/* Task Card & Checklist */}
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-xl overflow-hidden transition-all duration-300">
        <div className="h-1 bg-cyan-500" />
        <div className="p-6 sm:p-8">
          
          {/* Header row */}
          <div className="flex justify-between items-start mb-4">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h4 className="text-xl font-bold text-slate-850 dark:text-white">
                  Build Guide Component
                </h4>
                {workStarted && (
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                )}
              </div>
              <span className="text-xs text-slate-405 dark:text-slate-500 font-semibold block mt-0.5">
                Created: Today at 8:00 PM
              </span>
            </div>

            {/* Play/Pause Button */}
            <button
              onClick={() => setWorkStarted(!workStarted)}
              aria-label={workStarted ? 'Pause Tracker' : 'Start Tracker'}
              className={`p-2 rounded-xl transition cursor-pointer ${
                workStarted
                  ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20'
                  : 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 hover:bg-cyan-500/20'
              }`}
            >
              {workStarted ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            </button>
          </div>

          {/* Priority / Due Date / Assignee Chips */}
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border border-amber-350 bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400">
              <Flag className="w-3.5 h-3.5" />
              Urgent
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border border-cyan-200 bg-cyan-50 dark:bg-cyan-500/10 text-cyan-700 dark:text-cyan-400">
              <Clock className="w-3.5 h-3.5" />
              Due: Jun 20
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
              <div className="w-4 h-4 rounded-full bg-slate-300 dark:bg-slate-700 text-[10px] flex items-center justify-center text-slate-800 dark:text-slate-200 font-bold">
                K
              </div>
              Kashif R.
            </span>
          </div>

          {/* Progress bar and label */}
          <hr className="border-slate-200 dark:border-slate-800/80 mb-5" />
          <div className="flex justify-between items-center text-xs font-bold mb-2">
            <span className="text-slate-500 dark:text-slate-400">
              Sub-steps checklist
            </span>
            <span className="text-cyan-600 dark:text-cyan-400">
              {progressPercent}% Complete
            </span>
          </div>
          <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden mb-6">
            <div
              className="h-full rounded-full transition-all duration-500 ease-out"
              style={{
                width: `${progressPercent}%`,
                backgroundColor: progressPercent === 100 ? '#10b981' : '#06b6d4',
              }}
            />
          </div>

          {/* Sub-steps */}
          <div className="space-y-1.5">
            {steps.map((step) => (
              <button
                key={step.id}
                onClick={() => toggleStep(step.id)}
                className="w-full flex items-center gap-3.5 p-2 rounded-xl text-left transition hover:bg-slate-100/50 dark:hover:bg-white/5 cursor-pointer"
              >
                <div className={`w-5 h-5 rounded border flex items-center justify-center shrink-0 transition ${
                  step.completed
                    ? 'bg-cyan-500 border-cyan-500 text-white'
                    : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900'
                }`}>
                  {step.completed && <Check className="w-3.5 h-3.5 stroke-[3px]" />}
                </div>
                <span className={`text-sm transition ${
                  step.completed
                    ? 'line-through text-slate-400 dark:text-slate-500'
                    : 'text-slate-750 dark:text-slate-200'
                }`}>
                  {step.text}
                </span>
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* WhatsApp Simulator for Tasks */}
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-xl overflow-hidden transition-all duration-300">
        <div className="p-6 sm:p-8">
          
          {/* Header Switch row */}
          <div className="flex items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-purple-500/10 text-purple-505 flex items-center justify-center shrink-0">
                <Star className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-805 dark:text-white leading-tight">
                  WhatsApp Integration
                </h4>
                <span className="text-[10px] text-purple-600 dark:text-purple-400 font-semibold block mt-0.5">
                  Premium Member Feature
                </span>
              </div>
            </div>

            {/* Switch */}
            <button
              onClick={() => setWhatsappEnabled(!whatsappEnabled)}
              aria-label="Toggle WhatsApp preview"
              className={`w-11 h-6 rounded-full relative transition-colors duration-200 focus:outline-none cursor-pointer ${
                whatsappEnabled ? 'bg-purple-500' : 'bg-slate-200 dark:bg-slate-700'
              }`}
            >
              <span
                className={`w-4 h-4 bg-white rounded-full absolute top-1 left-1 transition-transform duration-200 ${
                  whatsappEnabled ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <p className="text-xs text-slate-550 dark:text-slate-400 mb-4 leading-relaxed">
            Toggle the switch above to preview what a premium WhatsApp push reminder looks like on your phone!
          </p>

          {/* Animated Speech Bubble */}
          <AnimatePresence initial={false}>
            {whatsappEnabled ? (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <div
                  className="p-4 border rounded-2xl"
                  style={{
                    backgroundColor: '#efeae2',
                    borderColor: '#e1e1e1',
                  }}
                >
                  {/* WhatsApp Header */}
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 rounded-full bg-[#128c7e] text-white text-[9px] font-bold flex items-center justify-center shrink-0">
                      OB
                    </div>
                    <div className="leading-tight">
                      <span className="text-xs font-bold text-slate-900 block leading-none">
                        MyOrbit Bot
                      </span>
                      <span className="text-[9px] text-slate-500 block leading-none mt-0.5">
                        Active
                      </span>
                    </div>
                  </div>

                  {/* Speech Bubble */}
                  <div className="p-2.5 rounded-lg rounded-tl-none max-w-[95%] shadow-sm relative bg-[#d9fdd3] text-[#111b21] ml-0 mr-auto text-left">
                    <p className="text-[12px] leading-relaxed">
                      🔔 <strong>MyTask Reminder!</strong><br />
                      Hi Kashif! Just a heads up that your task <strong>&quot;Build Guide Component&quot;</strong> is due tomorrow. Get it done to keep your momentum going! 🚀
                    </p>
                    <span className="text-[8px] text-slate-400 text-right block mt-1 leading-none">
                      9:00 AM ✓✓
                    </span>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="h-12 border border-dashed border-slate-200 dark:border-slate-800/80 rounded-2xl flex items-center justify-center text-slate-400 dark:text-slate-600 text-xs">
                WhatsApp preview is disabled
              </div>
            )}
          </AnimatePresence>

        </div>
      </div>

    </div>
  );
}
