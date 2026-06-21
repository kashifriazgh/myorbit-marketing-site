'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckSquare,
  Clock,
  Target,
  Flame,
  FileText,
  Calendar,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import TasksDemo from './TasksDemo';
import SchedulesDemo from './SchedulesDemo';
import GoalsDemo from './GoalsDemo';
import StreaksDemo from './StreaksDemo';
import NotesDemo from './NotesDemo';
import TimetableDemo from './TimetableDemo';

export default function InteractiveDemos() {
  type TabId = 'tasks' | 'schedules' | 'goals' | 'streaks' | 'notes' | 'timetable';
  const [activeTab, setActiveTab] = useState<TabId>('tasks');

  const tabs: { id: TabId; label: string; icon: typeof CheckSquare }[] = [
    { id: 'tasks', label: 'Tasks', icon: CheckSquare },
    { id: 'schedules', label: 'Schedules', icon: Clock },
    { id: 'goals', label: 'Goals', icon: Target },
    { id: 'streaks', label: 'Streaks', icon: Flame },
    { id: 'notes', label: 'Notes', icon: FileText },
    { id: 'timetable', label: 'Timetable', icon: Calendar },
  ];

  const currentIndex = tabs.findIndex((t) => t.id === activeTab);
  const prevTab = tabs[(currentIndex - 1 + tabs.length) % tabs.length];
  const nextTab = tabs[(currentIndex + 1) % tabs.length];

  return (
    <section className="py-20 px-6 md:px-10 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,#06b6d415,transparent_50%)]" />
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_bottom_left,#10b98110,transparent_55%)]" />

      <div className="relative max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <span className="inline-flex px-4 py-1 rounded-full text-xs font-semibold uppercase tracking-[0.3em] bg-cyan-100 text-cyan-605 dark:bg-cyan-950/40 dark:text-cyan-300 mb-4">
            Interactive Playground
          </span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.1]">
            See how it{' '}
            <span className="bg-gradient-to-r from-cyan-500 to-emerald-400 bg-clip-text text-transparent">
              feels in action
            </span>
          </h2>
          <p className="mt-4 text-slate-605 dark:text-slate-400 text-base md:text-lg max-w-2xl leading-relaxed">
            Select a feature tab below to play with real-time interactive simulations of the MyOrbit productivity system.
          </p>
        </div>

        {/* Tab Selection Bar */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-12">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center gap-2 px-4 py-2.5 rounded-2xl text-sm font-bold transition-all duration-300 border cursor-pointer ${
                  isActive
                    ? 'bg-slate-900 text-white border-slate-900 dark:bg-white dark:text-slate-900 dark:border-white shadow-lg shadow-slate-900/10 dark:shadow-none'
                    : 'bg-white text-slate-605 border-slate-200 hover:bg-slate-50 dark:bg-slate-900/50 dark:text-slate-400 dark:border-slate-800 dark:hover:bg-slate-900'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? '' : 'text-slate-450 dark:text-slate-500'}`} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Live Simulator View */}
        <div className="min-h-[450px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === 'tasks' && <TasksDemo />}
              {activeTab === 'schedules' && <SchedulesDemo />}
              {activeTab === 'goals' && <GoalsDemo />}
              {activeTab === 'streaks' && <StreaksDemo />}
              {activeTab === 'notes' && <NotesDemo />}
              {activeTab === 'timetable' && <TimetableDemo />}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mt-12 pt-8 border-t border-slate-200 dark:border-slate-800/80">
          <button
            onClick={() => setActiveTab(prevTab.id)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold border border-slate-200 hover:bg-slate-100/50 text-slate-700 dark:border-slate-800 dark:hover:bg-slate-900 dark:text-slate-300 transition duration-200 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4 text-slate-400" />
            <span>Prev: {prevTab.label}</span>
          </button>
          
          <button
            onClick={() => setActiveTab(nextTab.id)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold border border-slate-200 hover:bg-slate-100/50 text-slate-700 dark:border-slate-800 dark:hover:bg-slate-900 dark:text-slate-300 transition duration-200 cursor-pointer"
          >
            <span>Next: {nextTab.label}</span>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>
        </div>

      </div>
    </section>
  );
}
