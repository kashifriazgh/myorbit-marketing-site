'use client';

import React, { useState } from "react";
import Link from "next/link";
import {
  MessageSquare,
  Layout,
  BrainCircuit,
  WifiOff,
  MonitorSmartphone,
  BookOpen,
  ArrowLeft,
  Sparkles
} from "lucide-react";

// Status definitions
type Status = "in-progress" | "under-development" | "planning" | "researching";

interface Feature {
  id: number;
  title: string;
  description: string;
  status: Status;
  statusLabel: string;
  statusColor: string;
  icon: React.ComponentType<{ className?: string }>;
  details: string[];
}

const features: Feature[] = [
  {
    id: 1,
    title: "Omnipresent Notification Engine",
    description: "WhatsApp & push notifications integrated across all sections of the app.",
    status: "in-progress",
    statusLabel: "In Progress",
    statusColor: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    icon: MessageSquare,
    details: [
      "Currently, only Tasks and Schedules trigger notification alerts.",
      "Expanding integration to Finance alerts, Habit trackers, and Goal-deadline pings.",
      "Customizable notification frequency and delivery channel preferences."
    ]
  },
  {
    id: 2,
    title: "Next-Gen UI/UX Refinement",
    description: "A highly intuitive interface built for frictionless navigation and comfort.",
    status: "in-progress",
    statusLabel: "In Progress",
    statusColor: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    icon: Layout,
    details: [
      "Redesigning core interfaces to make onboarding completely seamless.",
      "Applying advanced dark mode configurations and fluid, non-blocking page transitions.",
      "Adding customizable widgets and density layouts for power users."
    ]
  },
  {
    id: 3,
    title: "Local Edge Intelligence & Optimized AI",
    description: "Hybrid logic to process queries locally and reduce external AI dependency.",
    status: "under-development",
    statusLabel: "Under Development",
    statusColor: "bg-teal-500/10 text-teal-500 border-teal-500/20",
    icon: BrainCircuit,
    details: [
      "Building rule-based local engines that understand user inputs immediately without sending requests to remote APIs.",
      "Optimizing costs and improving privacy by performing simple text classification on-device.",
      "Reserving expensive LLM models for complex summaries and deep personalized coaching."
    ]
  },
  {
    id: 4,
    title: "Lightweight Architecture & Offline Mode",
    description: "A fast, resilient app that works anywhere, even completely offline.",
    status: "planning",
    statusLabel: "Planning",
    statusColor: "bg-cyan-500/10 text-cyan-500 border-cyan-500/20",
    icon: WifiOff,
    details: [
      "Minimizing assets and scripts to ensure lightning-fast load times on low-bandwidth networks.",
      "Implementing client-side SQLite/IndexedDB syncing so all modifications are saved locally first.",
      "Automatic background syncing with the server once an internet connection is re-established."
    ]
  },
  {
    id: 5,
    title: "True Cross-Platform Compatibility",
    description: "Native-like experience across mobile, tablet, and desktop systems.",
    status: "planning",
    statusLabel: "Planning",
    statusColor: "bg-cyan-500/10 text-cyan-500 border-cyan-500/20",
    icon: MonitorSmartphone,
    details: [
      "Re-optimizing responsive layouts specifically for native mobile screens and desktop wrappers.",
      "Polishing PWA setup for instant installation directly from standard web browsers.",
      "Integrating platform-specific APIs (like native sharing, file systems, and quick-add shortcuts)."
    ]
  },
  {
    id: 6,
    title: "Evidence-Based Productivity Research",
    description: "Features backed by behavioral science to optimize your daily focus.",
    status: "researching",
    statusLabel: "Researching",
    statusColor: "bg-purple-500/10 text-purple-500 border-purple-500/20",
    icon: BookOpen,
    details: [
      "Studying behavioral science frameworks (like the Hook Model and Spaced Repetition).",
      "Designing smart habit-streak mechanics that motivate without causing user burnout.",
      "Translating focus state analytics into actionable tips inside your productivity report."
    ]
  }
];

export default function RoadmapPage() {
  const [activeFilter, setActiveFilter] = useState<"all" | Status>("all");

  const filteredFeatures = activeFilter === "all"
    ? features
    : features.filter(f => f.status === activeFilter);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans transition-colors duration-300 relative overflow-hidden">
      {/* Background Decorative Ambient Glows */}
      <div
        className="pointer-events-none absolute -left-48 -top-48 h-96 w-96 rounded-full blur-3xl opacity-30"
        style={{
          background: "radial-gradient(circle, rgba(20,184,166,0.3), transparent 70%)",
        }}
      />
      <div
        className="pointer-events-none absolute -right-48 top-1/2 h-[500px] w-[500px] rounded-full blur-3xl opacity-20"
        style={{
          background: "radial-gradient(circle, rgba(6,182,212,0.25), transparent 70%)",
        }}
      />

      {/* Header / Navigation */}
      <header className="relative z-10 border-b border-slate-900 bg-slate-950/75 backdrop-blur-md">
        <div className="mx-auto max-w-6xl px-6 py-5 flex items-center justify-between">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Home
          </Link>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-teal-500 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Future of MyOrbit
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-grow mx-auto max-w-5xl px-6 py-16 sm:py-24">
        {/* Title */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="inline-flex px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-[0.25em] bg-teal-500/10 border border-teal-500/20 text-teal-400">
            Developer Roadmap
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-none text-white">
            See What We Are{" "}
            <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
              Building
            </span>
          </h1>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            We are working hard to refine MyOrbit into the ultimate personal productivity engine. Here is a transparent look at what features we are currently developing, optimization plans, and future research directions.
          </p>
        </div>

        {/* Filter Navigation */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {(["all", "in-progress", "under-development", "planning", "researching"] as const).map((filter) => {
            const label = filter === "all"
              ? "All Features"
              : filter === "in-progress"
              ? "In Progress"
              : filter === "under-development"
              ? "Under Dev"
              : filter === "planning"
              ? "Planning"
              : "Researching";
            
            const isActive = activeFilter === filter;
            return (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold border transition-all duration-300 ${
                  isActive
                    ? "bg-teal-500 text-slate-950 border-teal-500 shadow-lg shadow-teal-500/20 font-bold"
                    : "border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200 bg-slate-900/40"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Features Timeline/Grid */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          {filteredFeatures.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.id}
                className="group relative flex flex-col justify-between rounded-3xl border border-slate-900 bg-slate-900/30 p-6 sm:p-8 backdrop-blur-sm transition-all duration-300 hover:border-teal-500/20 hover:bg-slate-900/50 hover:shadow-2xl hover:shadow-teal-500/5"
              >
                <div>
                  {/* Icon & Status */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-teal-500/20 bg-teal-500/5 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="h-6 w-6 text-teal-400" />
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${feat.statusColor}`}>
                      {feat.statusLabel}
                    </span>
                  </div>

                  {/* Title & Short Description */}
                  <h3 className="text-xl font-bold text-white group-hover:text-teal-400 transition-colors">
                    {feat.title}
                  </h3>
                  <p className="mt-3 text-slate-400 text-sm sm:text-base leading-relaxed">
                    {feat.description}
                  </p>

                  {/* Bullet Details */}
                  <ul className="mt-6 space-y-2 border-t border-slate-900 pt-6">
                    {feat.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-400">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-500/60" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* Call to action note */}
        <div className="mt-16 text-center bg-slate-900/25 border border-slate-900 rounded-3xl p-8 max-w-2xl mx-auto space-y-4">
          <Sparkles className="h-8 w-8 text-teal-400 mx-auto animate-pulse" />
          <h3 className="text-lg font-bold text-white">Have a feature request?</h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            As a Founding Member, your input guides our priority development pipeline. Support us today, unlock the app for a single PKR 500 flat fee, and gain priority feedback channels to shape MyOrbit.
          </p>
          <div className="pt-2">
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 text-sm font-semibold text-teal-400 hover:text-teal-300 transition-colors"
            >
              Get in Touch with the Founder
              <ArrowLeft className="h-4 w-4 rotate-180" />
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 py-10 bg-slate-950 text-center">
        <div className="mx-auto max-w-6xl px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <p>© {new Date().getFullYear()} MyOrbit. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/" className="hover:text-slate-300 transition-colors">Home</Link>
            <Link href="/about" className="hover:text-slate-300 transition-colors">About</Link>
            <Link href="/privacy" className="hover:text-slate-300 transition-colors">Privacy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
