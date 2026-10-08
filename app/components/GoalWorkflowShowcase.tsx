'use client';

import React from 'react';
import { Target, DollarSign, CheckSquare, Calendar, Sparkles, Layers } from 'lucide-react';

export default function GoalWorkflowShowcase() {
  return (
    <section className="py-20 md:py-28 px-6 md:px-12 bg-white dark:bg-[#040d1a] text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <div className="max-w-5xl mx-auto">
        
        {/* Scenario Intro Text (No "How MyOrbit Connects Your Life" heading) */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200/60 dark:border-blue-800/60 text-blue-600 dark:text-blue-400 font-medium text-xs tracking-wide uppercase mb-6 shadow-xs">
            <Sparkles className="w-4 h-4" />
            <span>Workflow Example</span>
          </div>

          <p className="text-xl md:text-2xl text-slate-700 dark:text-slate-200 leading-relaxed font-normal">
            Let&apos;s suppose you want to buy a laptop. You will first need to set a goal with <span className="font-semibold text-blue-600 dark:text-blue-400">&apos;saving&apos;</span> type.
          </p>
        </div>

        {/* Distinguished Goal Card (Extracted from grid, highlighted prominently at top) */}
        <div className="mb-12 max-w-3xl mx-auto bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-600 rounded-3xl p-8 md:p-10 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white shrink-0">
              <Target className="w-8 h-8" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full text-white/90">
                Saving Goal
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold mt-2 tracking-tight">
                Goal: Saving 50,000 for Laptop
              </h3>
            </div>
          </div>
        </div>

        {/* 3 Connected Feature Cards Grid (Finance, Todo, Schedules) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-14 md:mb-16">
          
          {/* Finance Card */}
          <div className="bg-slate-50/70 dark:bg-[#0a1a2e]/70 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-8 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 dark:bg-emerald-400/15 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-6">
                <DollarSign className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                Finance
              </h3>
              <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                A saving source will automatically be created in the finance section.
              </p>
            </div>
          </div>

          {/* Todo Card */}
          <div className="bg-slate-50/70 dark:bg-[#0a1a2e]/70 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-8 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 dark:bg-indigo-400/15 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-6">
                <CheckSquare className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                Todo
              </h3>
              <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                Research on different brands with specifications
              </p>
            </div>
          </div>

          {/* Schedules Card */}
          <div className="bg-slate-50/70 dark:bg-[#0a1a2e]/70 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-8 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 dark:bg-cyan-400/15 flex items-center justify-center text-cyan-600 dark:text-cyan-400 mb-6">
                <Calendar className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                Schedules
              </h3>
              <ul className="space-y-3 text-base text-slate-600 dark:text-slate-300 font-normal">
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-cyan-100 dark:bg-cyan-900/50 text-cyan-700 dark:text-cyan-300 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    i
                  </span>
                  <span>Weekly Saving Update</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-cyan-100 dark:bg-cyan-900/50 text-cyan-700 dark:text-cyan-300 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    ii
                  </span>
                  <span>Call Ali to accompany while visiting Laptop Market</span>
                </li>
              </ul>
            </div>
          </div>

        </div>

        {/* Conclusion / Summary Banner */}
        <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-cyan-50 dark:from-[#0a1a2e] dark:via-[#0c223c] dark:to-[#08182b] border border-blue-100 dark:border-blue-900/50 rounded-3xl p-8 md:p-12 text-center shadow-xs">
          <div className="w-12 h-12 mx-auto mb-5 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-md">
            <Layers className="w-6 h-6" />
          </div>
          <p className="text-base sm:text-lg md:text-xl text-slate-700 dark:text-slate-200 leading-relaxed max-w-4xl mx-auto font-normal">
            You will have no need to create all above things by going into their respective sections. All will be able to create within a single goal. The Schedules and Todos will however, also be available at the homepage at Schedules and todos sections.
          </p>
        </div>

      </div>
    </section>
  );
}
