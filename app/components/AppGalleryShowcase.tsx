"use client";

import React, { useState, useMemo, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  X,
  Target,
  Calendar,
  CheckSquare,
  Sparkles,
  Layout,
  Layers,
  Eye,
  Play,
  Pause,
} from "lucide-react";

export interface ScreenshotItem {
  id: string;
  title: string;
  filename: string;
  src: string;
  category: "goals" | "schedules" | "todos" | "summary";
  categoryLabel: string;
  badge: string;
  description: string;
  keyFeatures: string[];
}

export const SCREENSHOTS: ScreenshotItem[] = [
  {
    id: "summary-day",
    title: "Daily Executive Summary",
    filename: "summary of the day.jpg",
    src: "/screenshots/summary of the day.jpg",
    category: "summary",
    categoryLabel: "Daily Summary",
    badge: "Overview Hub",
    description:
      "A comprehensive high-level snapshot of your day. See your schedule, top priority todos, goal progress, and intelligent notifications together in one place.",
    keyFeatures: [
      "Unified daily dashboard overview",
      "Real-time goal & habit metrics",
      "Contextual AI nudges & morning focus",
    ],
  },
  {
    id: "goals-listing",
    title: "Goals & Life Milestones Hub",
    filename: "Goals listing page.jpg",
    src: "/screenshots/Goals listing page.jpg",
    category: "goals",
    categoryLabel: "Goals & Tracking",
    badge: "Life Goals",
    description:
      "Organize long-term ambitions, financial targets, and personal growth milestones with interactive progress rings and completion dates.",
    keyFeatures: [
      "Visual goal progress rings",
      "Multi-category life goal organization",
      "Target vs accumulated progress stats",
    ],
  },
  {
    id: "goal-streaks",
    title: "Goal Streaks & Consistency Card",
    filename: "Goal streaks card view.jpg",
    src: "/screenshots/Goal streaks card view.jpg",
    category: "goals",
    categoryLabel: "Goals & Tracking",
    badge: "Habit Tracker",
    description:
      "Keep your momentum strong with streak counters, daily check-in indicators, and consistency analytics for active habits.",
    keyFeatures: [
      "Daily streak counters & badges",
      "Momentum tracking and weekly score",
      "Milestone reward indicators",
    ],
  },
  {
    id: "saving-goal",
    title: "Financial Savings Goal Tracker",
    filename: "Saving Goal view.jpg",
    src: "/screenshots/Saving Goal view.jpg",
    category: "goals",
    categoryLabel: "Goals & Tracking",
    badge: "Financial Goal",
    description:
      "Track money saved toward specific items or funds. Monitors target amounts, current deposits, and estimated completion timeline.",
    keyFeatures: [
      "Target savings goal vs balance",
      "Milestone breakdown checkpoints",
      "Auto-calculated remaining amount",
    ],
  },
  {
    id: "debt-goal",
    title: "Debt Repayment & Management",
    filename: "Debt Manage Goal view.jpg",
    src: "/screenshots/Debt Manage Goal view.jpg",
    category: "goals",
    categoryLabel: "Goals & Tracking",
    badge: "Debt Payoff",
    description:
      "A dedicated debt payoff planner to organize loan repayments, track balance reductions, and set clear freedom targets.",
    keyFeatures: [
      "Balance reduction progress bar",
      "Scheduled payment reminders",
      "Payoff milestone dates",
    ],
  },
  {
    id: "nutrition-goal",
    title: "Nutrition & Diet Goal Tracker",
    filename: "Nutrition Goal view.jpg",
    src: "/screenshots/Nutrition Goal view.jpg",
    category: "goals",
    categoryLabel: "Goals & Tracking",
    badge: "Health & Diet",
    description:
      "Set and maintain nutrition targets, calorie benchmarks, and daily meal plans to stay on track with your health journey.",
    keyFeatures: [
      "Calorie & macro targets",
      "Daily meal log breakdown",
      "Hydration and diet check-ins",
    ],
  },
  {
    id: "sleep-goal",
    title: "Sleep & Recovery Tracker",
    filename: "Sleep goal view.jpg",
    src: "/screenshots/Sleep goal view.jpg",
    category: "goals",
    categoryLabel: "Goals & Tracking",
    badge: "Wellness",
    description:
      "Monitor nightly rest quality, sleep debt, bedtime consistency, and wellness scores to optimize daily energy.",
    keyFeatures: [
      "Target sleep duration vs actuals",
      "Bedtime routine reminders",
      "Weekly rest quality trends",
    ],
  },
  {
    id: "weight-goal",
    title: "Weight & Fitness Target Goal",
    filename: "Weight Goal view.jpg",
    src: "/screenshots/Weight Goal view.jpg",
    category: "goals",
    categoryLabel: "Goals & Tracking",
    badge: "Fitness Target",
    description:
      "Log body measurements, target weight goals, progress charts, and workout consistency metrics.",
    keyFeatures: [
      "Target weight delta & progress chart",
      "Measurement history log",
      "Integrated health score",
    ],
  },
  {
    id: "medical-goal",
    title: "Medical Diagnostic & Health Goal",
    filename: "Medical Diagnostic goal view.jpg",
    src: "/screenshots/Medical Diagnostic goal view.jpg",
    category: "goals",
    categoryLabel: "Goals & Tracking",
    badge: "Medical Care",
    description:
      "Keep track of health checkups, lab diagnostic schedules, prescription routines, and doctor recommendations.",
    keyFeatures: [
      "Lab test & diagnostic schedules",
      "Periodic health checkup alerts",
      "Health vitals log history",
    ],
  },
  {
    id: "appointment-goal",
    title: "Appointments & Consultations Goal",
    filename: "Appointment Goal view.jpg",
    src: "/screenshots/Appointment Goal view.jpg",
    category: "goals",
    categoryLabel: "Goals & Tracking",
    badge: "Consultations",
    description:
      "Manage recurring specialist visits, professional appointments, and consultation milestones with attached agendas.",
    keyFeatures: [
      "Consultation milestone timeline",
      "Specialist & doctor directory",
      "Pre-appointment preparation notes",
    ],
  },
  {
    id: "schedules-view",
    title: "Interactive Daily & Weekly Agenda",
    filename: "Schedules View.jpg",
    src: "/screenshots/Schedules View.jpg",
    category: "schedules",
    categoryLabel: "Schedules & Reminders",
    badge: "Calendar Hub",
    description:
      "Time-blocked calendar view integrating scheduled calls, focus hours, meetings, and personal routines.",
    keyFeatures: [
      "Time-blocking daily agenda",
      "Color-coded activity categories",
      "Smart conflict detection",
    ],
  },
  {
    id: "schedule-detail",
    title: "Schedule Event Detail & Notes",
    filename: "Schedule Detail view.jpg",
    src: "/screenshots/Schedule Detail view.jpg",
    category: "schedules",
    categoryLabel: "Schedules & Reminders",
    badge: "Event Detail",
    description:
      "Inspect individual schedule entries with linked tasks, meeting links, reminder timers, and notes.",
    keyFeatures: [
      "Linked todos and follow-ups",
      "Meeting locations & URL links",
      "Custom pre-event reminder triggers",
    ],
  },
  {
    id: "schedule-reminder",
    title: "Smart Notification & Reminder Setup",
    filename: "Schedule a reminder.jpg",
    src: "/screenshots/Schedule a reminder.jpg",
    category: "schedules",
    categoryLabel: "Schedules & Reminders",
    badge: "Smart Nudges",
    description:
      "Create intelligent reminders with custom repeat frequencies, urgency tags, and multi-device notification alerts.",
    keyFeatures: [
      "Custom repeat & trigger rules",
      "Priority tagging system",
      "Smart audio & push notifications",
    ],
  },
  {
    id: "todos-view",
    title: "Todos & Task Central Dashboard",
    filename: "Todos View.jpg",
    src: "/screenshots/Todos View.jpg",
    category: "todos",
    categoryLabel: "Todos & Tasks",
    badge: "Task Center",
    description:
      "Centralized task control hub for fast task capture, status toggling, and priority categorization.",
    keyFeatures: [
      "Instant task creation bar",
      "Status flags (To Do, In Progress, Done)",
      "Priority and project tags",
    ],
  },
  {
    id: "todos-listing",
    title: "Categorized Todo List Page",
    filename: "Todos listing page.jpg",
    src: "/screenshots/Todos listing page.jpg",
    category: "todos",
    categoryLabel: "Todos & Tasks",
    badge: "Task Master",
    description:
      "Organized list view grouping tasks by project, due date, and goal connection for systematic execution.",
    keyFeatures: [
      "Project & goal task groupings",
      "Batch actions & filter views",
      "Due date sorting & highlights",
    ],
  },
  {
    id: "todo-detail",
    title: "Task Inspector & Subtask Breakdown",
    filename: "Todo detail view.jpg",
    src: "/screenshots/Todo detail view.jpg",
    category: "todos",
    categoryLabel: "Todos & Tasks",
    badge: "Subtask Breakdown",
    description:
      "Detailed view of individual tasks with actionable subtask checklists, estimated durations, and notes.",
    keyFeatures: [
      "Checklist subtask breakdown",
      "Estimated time & priority settings",
      "Direct schedule block link",
    ],
  },
  {
    id: "reschedule-task",
    title: "Quick Task Rescheduling Interface",
    filename: "Reschedule a task.jpg",
    src: "/screenshots/Reschedule a task.jpg",
    category: "todos",
    categoryLabel: "Todos & Tasks",
    badge: "Agile Planning",
    description:
      "Effortlessly postpone or shift delayed tasks to optimal upcoming time slots without cluttering your agenda.",
    keyFeatures: [
      "One-click postpone options",
      "Smart open slot recommendations",
      "Automated agenda rebalancing",
    ],
  },
  {
    id: "overdue-tasks",
    title: "Overdue Task Alerts & Recovery",
    filename: "overdue tasks.jpg",
    src: "/screenshots/overdue tasks.jpg",
    category: "todos",
    categoryLabel: "Todos & Tasks",
    badge: "Action Alert",
    description:
      "Targeted alert panel highlighting overdue items with fast actions to mark done, reschedule, or re-prioritize.",
    keyFeatures: [
      "Overdue item counter & alerts",
      "Quick resolution action buttons",
      "Workload recovery manager",
    ],
  },
];

type CategoryFilter = "all" | "goals" | "schedules" | "todos" | "summary";

export default function AppGalleryShowcase() {
  const [activeTab, setActiveTab] = useState<CategoryFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Filter screenshots based on category & search
  const filteredScreenshots = useMemo(() => {
    let result = [...SCREENSHOTS];

    if (activeTab !== "all") {
      result = result.filter((item) => item.category === activeTab);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.badge.toLowerCase().includes(q) ||
          item.categoryLabel.toLowerCase().includes(q) ||
          item.keyFeatures.some((f) => f.toLowerCase().includes(q))
      );
    }

    return result;
  }, [activeTab, searchQuery]);

  // Reset slide index when category/search changes
  useEffect(() => {
    setActiveSlideIndex(0);
  }, [activeTab, searchQuery]);

  const categoryCounts = useMemo(() => {
    return {
      all: SCREENSHOTS.length,
      goals: SCREENSHOTS.filter((s) => s.category === "goals").length,
      schedules: SCREENSHOTS.filter((s) => s.category === "schedules").length,
      todos: SCREENSHOTS.filter((s) => s.category === "todos").length,
      summary: SCREENSHOTS.filter((s) => s.category === "summary").length,
    };
  }, []);

  const totalSlides = filteredScreenshots.length;
  const currentSlide = filteredScreenshots[activeSlideIndex] || filteredScreenshots[0];

  const handleNext = useCallback(() => {
    if (totalSlides > 0) {
      setActiveSlideIndex((prev) => (prev + 1) % totalSlides);
    }
  }, [totalSlides]);

  const handlePrev = useCallback(() => {
    if (totalSlides > 0) {
      setActiveSlideIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
    }
  }, [totalSlides]);

  // Autoplay functionality
  useEffect(() => {
    if (!isAutoplay || totalSlides <= 1 || isLightboxOpen) return;
    const timer = setInterval(() => {
      handleNext();
    }, 4500);
    return () => clearInterval(timer);
  }, [isAutoplay, totalSlides, handleNext, isLightboxOpen]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "Escape" && isLightboxOpen) setIsLightboxOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev, isLightboxOpen]);

  return (
    <section
      id="app-gallery"
      className="relative isolate overflow-hidden bg-slate-900 dark:bg-[#030914] py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-300"
    >
      {/* Background ambient glowing shapes */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute left-1/4 top-1/4 h-[35rem] w-[35rem] rounded-full bg-cyan-500/10 blur-[120px]" />
        <div className="absolute right-1/4 bottom-1/4 h-[30rem] w-[30rem] rounded-full bg-indigo-500/10 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-6xl space-y-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-extrabold tracking-widest uppercase shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            Interactive Slide Showcase
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight"
          >
            Explore MyOrbit{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-sky-400 bg-clip-text text-transparent">
              In Interactive Slides
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-slate-400 text-sm sm:text-base font-medium leading-relaxed max-w-2xl mx-auto"
          >
            Slide through real screenshots of our personal productivity app — goal tracking, daily schedule intelligence, tasks & summary.
          </motion.p>
        </div>

        {/* Category Tabs & Search Bar */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-2xl bg-slate-800/80 border border-slate-700/80 backdrop-blur-md max-w-4xl mx-auto">
            {(
              [
                { id: "all", label: "All Slides", icon: Layout, count: categoryCounts.all },
                { id: "goals", label: "Goals & Tracking", icon: Target, count: categoryCounts.goals },
                { id: "schedules", label: "Schedules", icon: Calendar, count: categoryCounts.schedules },
                { id: "todos", label: "Todos & Tasks", icon: CheckSquare, count: categoryCounts.todos },
                { id: "summary", label: "Daily Summary", icon: Layers, count: categoryCounts.summary },
              ] as const
            ).map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? "bg-gradient-to-r from-cyan-500 to-teal-500 text-slate-950 shadow-md shadow-cyan-500/20"
                      : "text-slate-400 hover:text-white hover:bg-slate-700/50"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                  <span
                    className={`px-1.5 py-0.2 rounded text-[10px] font-black ${
                      isActive ? "bg-slate-950/30 text-slate-950" : "bg-slate-700/70 text-slate-300"
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search bar inside slider header */}
          <div className="flex items-center justify-between gap-3 max-w-4xl mx-auto">
            <div className="relative flex-1 max-w-xs sm:max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search features (e.g. sleep, debt, schedule)..."
                className="w-full pl-9 pr-7 py-1.5 rounded-xl bg-slate-800/70 border border-slate-700/70 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Autoplay & Counter controls */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsAutoplay(!isAutoplay)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  isAutoplay
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                    : "bg-slate-800 text-slate-400 hover:bg-slate-700"
                }`}
              >
                {isAutoplay ? (
                  <>
                    <Pause className="w-3.5 h-3.5 fill-current" />
                    <span className="hidden sm:inline">Autoplay</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span className="hidden sm:inline">Paused</span>
                  </>
                )}
              </button>

              <span className="text-xs font-extrabold text-cyan-400 px-3 py-1 rounded-xl bg-slate-800/80 border border-slate-700">
                {totalSlides > 0 ? `${activeSlideIndex + 1} / ${totalSlides}` : "0 / 0"}
              </span>
            </div>
          </div>
        </div>

        {/* MAIN SLIDE CAROUSEL CONTAINER */}
        {totalSlides === 0 ? (
          <div className="text-center py-16 p-6 rounded-3xl bg-slate-800/30 border border-slate-700/50 space-y-3 max-w-3xl mx-auto">
            <Search className="w-10 h-10 text-slate-500 mx-auto" />
            <h3 className="text-lg font-bold text-white">No matching screenshots found</h3>
            <p className="text-slate-400 text-xs max-w-sm mx-auto">
              We couldn&apos;t find any screenshots matching &ldquo;{searchQuery}&rdquo;.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setActiveTab("all");
              }}
              className="px-4 py-1.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="relative max-w-5xl mx-auto rounded-3xl bg-slate-800/70 border border-slate-700/80 shadow-2xl overflow-hidden backdrop-blur-xl">
            {/* Top Autoplay Progress Bar */}
            {isAutoplay && (
              <div className="h-1 bg-slate-950 w-full overflow-hidden">
                <motion.div
                  key={activeSlideIndex}
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 4.5, ease: "linear" }}
                  className="h-full bg-gradient-to-r from-cyan-400 to-teal-400"
                />
              </div>
            )}

            {/* FULL SCALE IMAGE DISPLAY AREA (No text/caption) */}
            <div className="relative p-3 sm:p-5 flex items-center justify-center bg-slate-950/60 min-h-[350px] sm:min-h-[500px]">
              <div className="relative w-full max-h-[580px] flex items-center justify-center overflow-hidden rounded-2xl bg-slate-950 p-2 border border-slate-700/60 shadow-inner group">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentSlide.id}
                    src={currentSlide.src}
                    alt={currentSlide.title}
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    onClick={() => setIsLightboxOpen(true)}
                    className="w-full max-h-[540px] object-contain rounded-xl cursor-pointer hover:scale-[1.01] transition-transform duration-300"
                  />
                </AnimatePresence>

                {/* Expand Lightbox Button overlay */}
                <button
                  type="button"
                  onClick={() => setIsLightboxOpen(true)}
                  aria-label="Expand image"
                  className="absolute bottom-4 right-4 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/90 hover:bg-cyan-500 text-slate-200 hover:text-slate-950 text-xs font-bold border border-slate-700 transition-colors shadow-lg"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Expand</span>
                </button>
              </div>

              {/* Left/Right Slide Arrows */}
              <button
                type="button"
                onClick={handlePrev}
                className="absolute left-4 sm:left-7 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-900/90 hover:bg-cyan-500 text-slate-200 hover:text-slate-950 border border-slate-700 flex items-center justify-center transition-all shadow-xl z-20"
                aria-label="Previous Slide"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="absolute right-4 sm:right-7 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-900/90 hover:bg-cyan-500 text-slate-200 hover:text-slate-950 border border-slate-700 flex items-center justify-center transition-all shadow-xl z-20"
                aria-label="Next Slide"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* BOTTOM THUMBNAIL STRIP */}
            <div className="p-3 bg-slate-950/80 border-t border-slate-800 flex items-center gap-2 overflow-x-auto no-scrollbar">
              {filteredScreenshots.map((item, idx) => {
                const isActive = idx === activeSlideIndex;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveSlideIndex(idx)}
                    className={`relative shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                      isActive
                        ? "border-cyan-400 scale-105 shadow-md shadow-cyan-500/30 ring-2 ring-cyan-500/20"
                        : "border-slate-800 opacity-50 hover:opacity-100 hover:border-slate-600"
                    }`}
                  >
                    <img
                      src={item.src}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* FULLSCREEN LIGHTBOX MODAL */}
      <AnimatePresence>
        {isLightboxOpen && currentSlide && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/95 backdrop-blur-xl"
          >
            <div className="relative w-full max-w-5xl max-h-[90vh] flex flex-col rounded-3xl bg-slate-900 border border-slate-700 shadow-2xl overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-slate-900/90">
                <div>
                  <h3 className="text-base font-bold text-white">{currentSlide.title}</h3>
                  <span className="text-xs text-slate-400">{currentSlide.categoryLabel}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsLightboxOpen(false)}
                  className="p-1.5 rounded-full text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-4 flex-1 overflow-auto flex items-center justify-center bg-slate-950">
                <img
                  src={currentSlide.src}
                  alt={currentSlide.title}
                  className="max-h-[75vh] w-auto object-contain rounded-xl"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
