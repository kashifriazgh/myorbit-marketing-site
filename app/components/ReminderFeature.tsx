"use client";

import React, { useState } from "react";
import { Smartphone, MessageSquare } from "lucide-react";

export default function ReminderFeature() {
  // Interactive state for Quick Reminders demo
  const [quickReminderTime, setQuickReminderTime] = useState<string>("Tonight");
  const [reminderInput, setReminderInput] = useState<string>("Pay the electricity bill");

  return (
    <section className="relative isolate overflow-hidden bg-slate-50 dark:bg-[#040d1a] py-24 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      {/* Background Glows */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-1/3 -translate-x-1/2 h-[35rem] w-[35rem] rounded-full bg-purple-500/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl space-y-20">
        
        {/* ========================================================================= */}
        {/* SECTION 1: MULTI-CHANNEL REMINDERS                                        */}
        {/* ========================================================================= */}
        <div className="space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
              Never rely on your memory alone.
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
              Send reminders to yourself or selected contacts directly through Push Notifications or WhatsApp.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Channel 1: Push Notifications */}
            <div className="rounded-3xl border border-slate-200/80 dark:border-white/10 bg-white/90 dark:bg-[#0a1a2e]/90 p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-cyan-500/15 text-cyan-500">
                    <Smartphone className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white">🔔 Push Notifications</h3>
                    <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold">Free (with limits) · High proficiency with ₨200/mo</span>
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Instant alerts for your daily schedules, tasks, and overdue items. Free tier includes basic push alerts with limits, while ₨200/mo subscription unlocks high-proficiency notifications and background AI working.
              </p>
            </div>

            {/* Channel 2: WhatsApp Messaging */}
            <div className="rounded-3xl border border-emerald-500/40 bg-emerald-500/5 p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-emerald-500/20 text-emerald-500">
                    <MessageSquare className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white">💬 WhatsApp Messaging</h3>
                    <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold">Custom Integration</span>
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Direct WhatsApp messaging integration available for custom setup and automated dispatch.
              </p>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SECTION 2: QUICK + SCHEDULED REMINDERS INTERACTIVE DEMO                    */}
        {/* ========================================================================= */}
        <div className="rounded-3xl border border-slate-200/80 dark:border-white/10 bg-white/90 dark:bg-[#0a1a2e]/90 p-8 sm:p-12 shadow-2xl backdrop-blur-xl space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
              Need to remember something? <br />
              <span className="bg-gradient-to-r from-cyan-500 to-emerald-400 bg-clip-text text-transparent">
                Don&apos;t make it complicated.
              </span>
            </h2>
          </div>

          {/* Interactive Remind Me Selector */}
          <div className="max-w-lg mx-auto rounded-2xl border border-slate-200/80 dark:border-white/10 bg-slate-100/90 dark:bg-slate-900/90 p-6 space-y-4">
            <label className="block text-xs font-bold uppercase text-slate-400">Remind Me</label>
            <input
              type="text"
              value={reminderInput}
              onChange={(e) => setReminderInput(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />

            <label className="block text-xs font-bold uppercase text-slate-400 pt-2">When?</label>
            <div className="flex flex-wrap gap-2 text-xs">
              {["Now", "In 5 minutes", "Tonight", "Tomorrow", "Custom"].map((time) => (
                <button
                  key={time}
                  type="button"
                  onClick={() => setQuickReminderTime(time)}
                  className={`px-3 py-1.5 rounded-xl font-bold transition ${
                    quickReminderTime === time
                      ? "bg-cyan-500 text-slate-950 shadow-md"
                      : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>

            <div className="pt-3 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 border-t border-slate-200/60 dark:border-slate-800">
              <span><strong>Quick Reminder:</strong> Sudden thoughts</span>
              <span><strong>Scheduled:</strong> Known timing</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
