'use client';

import React from 'react';
import { Calendar, CheckSquare, Target, DollarSign, Sparkles } from 'lucide-react';

interface FeatureSection {
  id: string;
  title: string;
  tagline: string;
  accentGradient: string;
  bulletGradient: string;
  ringColor: string;
  badgeBg: string;
  badgeText: string;
  icon: React.ReactNode;
  items: string[];
}

function TickBullet({ gradient, ring }: { gradient: string; ring: string }) {
  return (
    <span
      className={`relative flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${gradient} shadow-sm shadow-slate-900/10 ring-4 ${ring} transition-transform duration-300 group-hover/item:scale-110`}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4 text-white drop-shadow-xs"
        aria-hidden="true"
      >
        <path d="M6 12.8l4 4L18 8" />
      </svg>
    </span>
  );
}

export default function FourPillarsChecklist() {
  const sections: FeatureSection[] = [
    {
      id: 'schedules',
      title: 'Schedules',
      tagline: 'Master your daily workflow with hourly precision & push notification reminders.',
      accentGradient: 'from-cyan-500 to-blue-600',
      bulletGradient: 'from-cyan-400 to-blue-600',
      ringColor: 'ring-cyan-500/15 shadow-cyan-500/30',
      badgeBg: 'bg-cyan-50 dark:bg-cyan-950/60 border-cyan-200/60 dark:border-cyan-800/60',
      badgeText: 'text-cyan-600 dark:text-cyan-400',
      icon: <Calendar className="w-6 h-6" />,
      items: [
        'Make schedules of today and any Next coming day',
        'Set Push Notification Reminders',
        'Edit, Update and delete schedule anytime',
        'Hourly separated schedules view',
        'Iconic status of complete / not complete',
      ],
    },
    {
      id: 'todos',
      title: 'Todos',
      tagline: 'Transform tasks into structured sub-steps and automatic schedules.',
      accentGradient: 'from-emerald-500 to-teal-600',
      bulletGradient: 'from-emerald-400 to-teal-600',
      ringColor: 'ring-emerald-500/15 shadow-emerald-500/30',
      badgeBg: 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200/60 dark:border-emerald-800/60',
      badgeText: 'text-emerald-600 dark:text-emerald-400',
      icon: <CheckSquare className="w-6 h-6" />,
      items: [
        'Create Tasks ToDo for today, tomorrow, next week or any future day',
        "Make a schedule within a task in just 'one click'",
        'Set Push Notification for reminders',
        'Create Steps and sub Steps',
        'Reschedule if not reach on time',
        'Over Due Tasks shown in a separate UI / section',
      ],
    },
    {
      id: 'goals',
      title: 'Goals',
      tagline: 'Link tasks and schedules to life goals across finance, health & habits.',
      accentGradient: 'from-sky-500 to-indigo-600',
      bulletGradient: 'from-sky-400 to-indigo-600',
      ringColor: 'ring-sky-500/15 shadow-sky-500/30',
      badgeBg: 'bg-sky-50 dark:bg-sky-950/60 border-sky-200/60 dark:border-sky-800/60',
      badgeText: 'text-sky-600 dark:text-sky-400',
      icon: <Target className="w-6 h-6" />,
      items: [
        'Create goals with different categories including Finance, Health, Learning and Habit',
        'Link Tasks and schedules with a goal',
        'Each type of goal has its own layout design',
        'Track progress and count streaks',
      ],
    },
    {
      id: 'finance',
      title: 'Finance',
      tagline: 'Complete financial clarity, ownership classification & liability tracking.',
      accentGradient: 'from-teal-500 to-emerald-600',
      bulletGradient: 'from-teal-400 to-emerald-600',
      ringColor: 'ring-teal-500/15 shadow-teal-500/30',
      badgeBg: 'bg-teal-50 dark:bg-teal-950/60 border-teal-200/60 dark:border-teal-800/60',
      badgeText: 'text-teal-600 dark:text-teal-400',
      icon: <DollarSign className="w-6 h-6" />,
      items: [
        'Maintain an overall Sum of Money',
        'Classify money with respect to Ownership and holdership',
        'Keep record of all loans and liabilities',
        'Keep record of incomes, expenses and all transactions',
      ],
    },
  ];

  return (
    <section className="py-20 md:py-28 px-6 md:px-12 bg-slate-50 dark:bg-[#040d1a] text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <div className="max-w-6xl mx-auto space-y-16 md:space-y-24">
        
        {/* Section Main Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200/60 dark:border-blue-800/60 text-blue-600 dark:text-blue-400 font-medium text-xs tracking-wide uppercase mb-4 shadow-xs">
            <Sparkles className="w-4 h-4" />
            <span>Core Pillars & Features</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-5">
            Everything You Need in One System
          </h2>

          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            Explore the powerful feature breakdown across our 4 core modules designed for ultimate productivity.
          </p>
        </div>

        {/* 4 Feature Sections */}
        <div className="space-y-12 md:space-y-20">
          {sections.map((section) => (
            <div
              key={section.id}
              className="bg-white/80 dark:bg-[#0a1a2e]/80 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-10 md:p-12 shadow-xl shadow-slate-200/40 dark:shadow-none backdrop-blur-xl transition-all duration-300 hover:border-slate-300 dark:hover:border-slate-700"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                
                {/* 50% Left Side (Desktop): Feature Title & Tagline */}
                <div className="lg:col-span-6 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${section.badgeBg} ${section.badgeText}`}
                    >
                      {section.icon}
                    </div>
                    <span
                      className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${section.badgeBg} ${section.badgeText}`}
                    >
                      {section.title} Module
                    </span>
                  </div>

                  {/* Desktop Title (Large font) / Mobile Title */}
                  <h3 className="text-2xl sm:text-3xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-4 leading-none">
                    {section.title}
                  </h3>

                  <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-lg">
                    {section.tagline}
                  </p>

                  <div
                    className={`mt-6 h-1 w-20 rounded-full bg-gradient-to-r ${section.accentGradient}`}
                  />
                </div>

                {/* 50% Right Side (Desktop): Modern Checklist Card */}
                <div className="lg:col-span-6">
                  <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-slate-50/70 dark:bg-[#061426]/70 p-6 sm:p-8 shadow-xs">
                    <ul className="space-y-4 sm:space-y-5">
                      {section.items.map((item, idx) => (
                        <li
                          key={idx}
                          className="group/item flex items-start gap-4 p-2 rounded-xl hover:bg-white/80 dark:hover:bg-slate-800/40 transition-colors duration-200"
                        >
                          <TickBullet
                            gradient={section.bulletGradient}
                            ring={section.ringColor}
                          />
                          <span className="text-sm sm:text-[15px] font-medium text-slate-800 dark:text-slate-200 leading-snug pt-0.5">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
