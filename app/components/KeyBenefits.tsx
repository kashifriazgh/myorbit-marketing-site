'use client';

import React, { useState } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────
interface SubFeature {
  label: string;
}

interface Benefit {
  id: number;
  icon: string;
  title: string;
  description: string;
  textAccent: string;
  borderAccent: string;
  bgAccent: string;
  glowColor: string;
  subFeatures?: SubFeature[];
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const benefits: Benefit[] = [
  {
    id: 1,
    icon: '📔',
    title: 'Daily Journal',
    description:
      'Capture thoughts, experiences and reflections as a private digital diary. AI polishes your writing — fixing grammar, adding clarity and inserting relevant emojis.',
    textAccent: 'text-violet-300',
    borderAccent: 'border-violet-500/40',
    bgAccent: 'bg-violet-500/10',
    glowColor: '#7c3aed',
    subFeatures: [
      { label: 'AI grammar & style fix' },
      { label: 'Emoji suggestions' },
      { label: 'Daily reflection prompts' },
    ],
  },
  {
    id: 2,
    icon: '✅',
    title: 'Tasks',
    description:
      'Create tasks with rich steps and sub-steps. AI generates a full action plan from just a title — focus on doing, not planning.',
    textAccent: 'text-cyan-300',
    borderAccent: 'border-cyan-500/40',
    bgAccent: 'bg-cyan-500/10',
    glowColor: '#0891b2',
    subFeatures: [
      { label: 'AI-generated steps from title' },
      { label: 'Sub-step nesting' },
      { label: 'Daily / weekly / monthly' },
      { label: 'WhatsApp & push reminders' },
    ],
  },
  {
    id: 3,
    icon: '🎯',
    title: 'Goals',
    description:
      'Set meaningful goals with target values and live progress tracking. Link tasks as milestones and watch progress cards update on your homepage.',
    textAccent: 'text-emerald-300',
    borderAccent: 'border-emerald-500/40',
    bgAccent: 'bg-emerald-500/10',
    glowColor: '#059669',
    subFeatures: [
      { label: 'Progress cards on homepage' },
      { label: 'Target value tracking' },
      { label: 'Task milestone linking' },
    ],
  },
  {
    id: 4,
    icon: '💰',
    title: 'Finance',
    description:
      'A full personal finance hub — cash in hand, income & expenses, loans, shopping budgets and a 60-day financial forecast after every 15 days.',
    textAccent: 'text-amber-300',
    borderAccent: 'border-amber-500/40',
    bgAccent: 'bg-amber-500/10',
    glowColor: '#d97706',
    subFeatures: [
      { label: 'Overall budget & cash held' },
      { label: 'Income & expense records' },
      { label: 'Loan tracker (lent & borrowed)' },
      { label: 'Shopping lists with budget limits' },
      { label: '60-day financial forecast' },
    ],
  },
  {
    id: 5,
    icon: '🔥',
    title: 'Streaks',
    description:
      'Build positive habits with daily and weekly streaks. Mark each day done, track consistency scores and keep them front-and-centre on the homepage.',
    textAccent: 'text-orange-300',
    borderAccent: 'border-orange-500/40',
    bgAccent: 'bg-orange-500/10',
    glowColor: '#ea580c',
    subFeatures: [
      { label: 'Daily & weekly habit tracking' },
      { label: 'Current streak display' },
      { label: 'Homepage summary strip' },
    ],
  },
  {
    id: 6,
    icon: '🕐',
    title: 'Time Table',
    description:
      'Create recurring timetables for fixed routines — office hours, Salah times, college classes — and let them auto-merge into your daily schedule.',
    textAccent: 'text-sky-300',
    borderAccent: 'border-sky-500/40',
    bgAccent: 'bg-sky-500/10',
    glowColor: '#0284c7',
    subFeatures: [
      { label: 'Recurring daily routines' },
      { label: 'Salah / prayer time support' },
      { label: 'Auto-merge with schedules' },
    ],
  },
  {
    id: 7,
    icon: '📅',
    title: 'Schedules',
    description:
      'Plan your 24 hrs in a clean vertical stepper view. Schedules show on the homepage for the next 5 days with WhatsApp and push notification reminders.',
    textAccent: 'text-teal-300',
    borderAccent: 'border-teal-500/40',
    bgAccent: 'bg-teal-500/10',
    glowColor: '#0d9488',
    subFeatures: [
      { label: '5-day homepage view' },
      { label: 'WhatsApp reminders' },
      { label: 'Firebase push notifications' },
      { label: 'Duration & time blocks' },
    ],
  },
  {
    id: 8,
    icon: '🗂️',
    title: 'Projects',
    description:
      'Create project workspaces with multiple agendas. Each agenda holds tasks, schedules, goals, streaks and plain notes — all in one focused place.',
    textAccent: 'text-indigo-300',
    borderAccent: 'border-indigo-500/40',
    bgAccent: 'bg-indigo-500/10',
    glowColor: '#4338ca',
    subFeatures: [
      { label: 'Multiple agendas per project' },
      { label: 'Tasks, goals & streaks inside' },
      { label: 'Schedules & plain notes' },
    ],
  },
  {
    id: 9,
    icon: '📝',
    title: 'Quick Notes',
    description:
      'A rich text input pinned at the top of every page. Capture ideas instantly with formatting — no extra screens, no context switching, no friction.',
    textAccent: 'text-rose-300',
    borderAccent: 'border-rose-500/40',
    bgAccent: 'bg-rose-500/10',
    glowColor: '#e11d48',
    subFeatures: [
      { label: 'Always-visible top bar' },
      { label: 'Rich text formatting' },
      { label: 'Instant save' },
    ],
  },
  {
    id: 10,
    icon: '✨',
    title: 'AI Assistant',
    description:
      'Every section has a context-aware AI helper. Generate task steps, polish journal entries, get finance insights and brainstorm ideas — all with minimal typing.',
    textAccent: 'text-fuchsia-300',
    borderAccent: 'border-fuchsia-500/40',
    bgAccent: 'bg-fuchsia-500/10',
    glowColor: '#a21caf',
    subFeatures: [
      { label: 'Task step generator' },
      { label: 'Journal writing polish' },
      { label: 'Idea expansion' },
      { label: 'Finance summaries' },
    ],
  },
];

// ─── Component ────────────────────────────────────────────────────────────────
export default function KeyBenefits() {
  const [expanded, setExpanded] = useState<number | null>(null);

  const toggle = (id: number) =>
    setExpanded((prev) => (prev === id ? null : id));

  return (
    <section
      id="features"
      className="relative py-28 bg-[#040d1a] overflow-hidden"
    >
      {/* Background glows */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_15%_60%,#0f766e14,transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_85%_20%,#6366f114,transparent)]" />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(#94a3b8 1px,transparent 1px),linear-gradient(90deg,#94a3b8 1px,transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6 md:px-10">
        {/* ── Section header ── */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-400/10 border border-teal-400/25 text-teal-300 text-xs font-semibold tracking-widest uppercase mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
            What&#39;s Inside
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-5">
            9 tools. Zero friction.{' '}
            <span className="bg-gradient-to-r from-teal-300 to-emerald-300 bg-clip-text text-transparent">
              All connected.
            </span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Every module feeds the homepage so you always see your ongoing
            tasks, upcoming schedules, streaks, finances and more — in one
            glance.
          </p>
        </div>

        {/* ── Notification callouts ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-14 max-w-2xl mx-auto">
          <div className="flex items-start gap-3 bg-white/[0.04] border border-white/10 rounded-2xl px-5 py-4">
            <span className="text-2xl flex-shrink-0 mt-0.5">💬</span>
            <div>
              <p className="text-sm font-semibold text-white mb-1">
                WhatsApp Reminders
              </p>
              <p className="text-xs text-slate-400 leading-relaxed">
                Tasks and schedules message you on WhatsApp at exactly the right
                time via <span className="text-slate-300">whatsapp-web.js</span>
                .
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 bg-white/[0.04] border border-white/10 rounded-2xl px-5 py-4">
            <span className="text-2xl flex-shrink-0 mt-0.5">🔔</span>
            <div>
              <p className="text-sm font-semibold text-white mb-1">
                Push Notifications
              </p>
              <p className="text-xs text-slate-400 leading-relaxed">
                Firebase Cloud Messaging sends browser push notifications for
                all task and schedule reminders.
              </p>
            </div>
          </div>
        </div>

        {/* ── Feature grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {benefits.map((b) => {
            const isOpen = expanded === b.id;
            return (
              <div
                key={b.id}
                onClick={() => toggle(b.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && toggle(b.id)}
                aria-expanded={isOpen}
                className={`
                  relative group cursor-pointer rounded-2xl border transition-all duration-300
                  ${
                    isOpen
                      ? `${b.bgAccent} ${b.borderAccent}`
                      : 'bg-white/[0.03] border-white/10 hover:bg-white/[0.06] hover:border-white/20'
                  }
                `}
                style={
                  isOpen
                    ? { boxShadow: `0 8px 40px -8px ${b.glowColor}55` }
                    : {}
                }
              >
                {/* Top shimmer line (shows on hover + when open) */}
                <div
                  className={`absolute top-0 left-8 right-8 h-px transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'}`}
                  style={{
                    background: `linear-gradient(90deg, transparent, ${b.glowColor}cc, transparent)`,
                  }}
                />

                <div className="p-5">
                  {/* Header row */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl transition-all duration-300 ${
                          isOpen
                            ? 'bg-white/15 scale-110'
                            : 'bg-white/5 group-hover:bg-white/10'
                        }`}
                      >
                        {b.icon}
                      </span>
                      <h3
                        className={`font-bold text-sm transition-colors duration-200 ${
                          isOpen
                            ? b.textAccent
                            : 'text-slate-200 group-hover:text-white'
                        }`}
                      >
                        {b.title}
                      </h3>
                    </div>
                    <span
                      className={`text-slate-500 text-xs transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                    >
                      ▾
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {b.description}
                  </p>

                  {/* Sub-features accordion */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      isOpen ? 'max-h-64 mt-4 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className={`border-t mb-3 ${b.borderAccent}`} />
                    <div className="flex flex-wrap gap-1.5">
                      {b.subFeatures?.map((sf) => (
                        <span
                          key={sf.label}
                          className={`inline-flex items-center gap-1 text-[10px] px-2.5 py-1 rounded-full border ${b.borderAccent} ${b.textAccent} bg-white/5 font-medium`}
                        >
                          <span className="opacity-50">✦</span> {sf.label}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Bottom CTA ── */}
        <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-5 text-center">
          <p className="text-slate-400 text-sm">
            All 9 tools. One workspace. Your data, your hosting.
          </p>
          <a
            href="#pricing"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-2xl bg-gradient-to-r from-teal-400 to-emerald-400 text-slate-900 font-bold text-sm shadow-xl shadow-teal-500/25 hover:scale-[1.02] transition"
          >
            Launch my workspace
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
