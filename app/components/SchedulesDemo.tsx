'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Clock,
  Send,
  MessageSquare,
  Check,
  RefreshCw
} from 'lucide-react';

export default function SchedulesDemo() {
  // 0: initial, 1: user typed done, 2: bot replied and marked completed
  const [whatsappStep, setWhatsappStep] = useState<number>(0);

  const handleSimulateReply = () => {
    if (whatsappStep === 0) {
      setWhatsappStep(1);
      setTimeout(() => {
        setWhatsappStep(2);
      }, 1500);
    } else {
      setWhatsappStep(0);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
      
      {/* Simulation Part 1: Stepper Timeline */}
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-xl overflow-hidden transition-all duration-300">
        <div className="h-1 bg-blue-500" />
        <div className="p-6 sm:p-8">
          <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-6 uppercase tracking-wider">
            App Timeline Format:
          </p>

          <div className="relative pl-8 border-l-2 border-dashed border-slate-200 dark:border-slate-800 space-y-8 ml-3">
            
            {/* Step 1: Specific Timed Schedule */}
            <div className="relative">
              {/* Stepper Circle Icon */}
              <div
                className={`absolute -left-[45px] top-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                  whatsappStep === 2
                    ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25'
                    : 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                }`}
              >
                {whatsappStep === 2 ? <Check className="w-4 h-4 stroke-[3px]" /> : '1'}
              </div>

              <div className="space-y-1">
                <span className="text-xs font-bold text-slate-405 dark:text-slate-500 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  9:00 AM - 10:00 AM
                </span>
                <h4 className={`text-base font-bold transition-all duration-300 ${
                  whatsappStep === 2
                    ? 'line-through text-slate-400 dark:text-slate-500'
                    : 'text-slate-800 dark:text-white'
                }`}>
                  Morning Coding & Design
                </h4>
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500 text-white">
                    Objective: Beta Launch
                  </span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                    60 min
                  </span>
                </div>
              </div>
            </div>

            {/* Step 2: Flexible Schedule */}
            <div className="relative">
              {/* Stepper Circle Icon */}
              <div className="absolute -left-[45px] top-0 w-8 h-8 rounded-full border-2 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-400 dark:text-slate-500 flex items-center justify-center font-bold text-sm">
                2
              </div>

              <div className="space-y-1">
                <span className="text-xs font-bold text-purple-600 dark:text-purple-400">
                  Flexible Timing (Daily)
                </span>
                <h4 className="text-base font-bold text-slate-800 dark:text-white">
                  Review Team Commit Logs
                </h4>
                <div className="flex pt-1">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-extrabold border-2 border-purple-500/30 text-purple-600 dark:text-purple-400 uppercase tracking-wide">
                    Flexible
                  </span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Simulation Part 2: WhatsApp Done Reply Simulator */}
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-xl overflow-hidden transition-all duration-300">
        <div className="p-6 sm:p-8">
          
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-full bg-emerald-500/10 text-[#128c7e] dark:text-emerald-400 flex items-center justify-center shrink-0">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-805 dark:text-white leading-tight">
                WhatsApp Done Reply Simulator
              </h4>
              <span className="text-[10px] text-slate-400 font-semibold block mt-0.5">
                MyOrbit WhatsApp Integration
              </span>
            </div>
          </div>

          <p className="text-xs text-slate-550 dark:text-slate-400 mb-4 leading-relaxed">
            Click the button below to simulate replying &quot;done&quot; to mark the schedule completed automatically:
          </p>

          {/* Chat Window Mockup */}
          <div
            className="p-3 border rounded-2xl space-y-3 mb-4"
            style={{
              backgroundColor: '#efeae2',
              borderColor: '#e1e1e1',
            }}
          >
            {/* Message 1: Bot Reminder */}
            <div className="flex items-start gap-2">
              <div className="w-6 h-6 rounded-full bg-[#128c7e] text-white text-[9px] font-bold flex items-center justify-center shrink-0">
                OB
              </div>
              <div className="p-2.5 rounded-lg rounded-tl-none max-w-[80%] shadow-sm bg-white text-[#111b21]">
                <p className="text-[12px] leading-relaxed">
                  🔔 <strong>Schedule Alert!</strong><br />
                  Hi Kashif! Your schedule <strong>&quot;Morning Coding & Design&quot;</strong> has started. Stay focused! 🚀
                </p>
              </div>
            </div>

            {/* Message 2: User Reply "done" */}
            {whatsappStep >= 1 && (
              <motion.div
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex justify-end"
              >
                <div className="p-2.5 rounded-lg rounded-tr-none max-w-[80%] shadow-sm bg-[#d9fdd3] text-[#111b21] text-right font-bold text-[12px]">
                  done
                </div>
              </motion.div>
            )}

            {/* Message 3: Bot Confirmation */}
            {whatsappStep === 2 && (
              <motion.div
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex items-start gap-2"
              >
                <div className="w-6 h-6 rounded-full bg-[#128c7e] text-white text-[9px] font-bold flex items-center justify-center shrink-0">
                  OB
                </div>
                <div className="p-2.5 rounded-lg rounded-tl-none max-w-[80%] shadow-sm bg-white text-[#111b21]">
                  <p className="text-[12px] leading-relaxed">
                    ✓ Schedule <strong>&quot;Morning Coding & Design&quot;</strong> has been marked as <strong>completed</strong> in the app. Great job! 🌟
                  </p>
                </div>
              </motion.div>
            )}

          </div>

          {/* Simulation Trigger Button */}
          <div className="flex justify-center">
            <button
              onClick={handleSimulateReply}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white shadow-md transition-all duration-200 hover:opacity-90 active:scale-[0.98] ${
                whatsappStep > 0
                  ? 'bg-rose-600 hover:bg-rose-700'
                  : 'bg-[#128c7e] hover:bg-[#0e6f63]'
              }`}
            >
              {whatsappStep === 0 ? (
                <>
                  <Send className="w-4 h-4" />
                  Simulate typing &quot;done&quot;
                </>
              ) : (
                <>
                  <RefreshCw className="w-4 h-4" />
                  Reset Simulator
                </>
              )}
            </button>
          </div>

        </div>
      </div>

    </div>
  );
}
