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
  SlidersHorizontal,
  CheckCircle2,
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
type SortOption = "default" | "name" | "category";

export default function AppGalleryShowcase() {
  const [activeTab, setActiveTab] = useState<CategoryFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("default");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isAutoplay, setIsAutoplay] = useState(false);

  // Filter & Sort screenshots
  const filteredScreenshots = useMemo(() => {
    let result = [...SCREENSHOTS];

    // Filter by category
    if (activeTab !== "all") {
      result = result.filter((item) => item.category === activeTab);
    }

    // Filter by search query
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

    // Sort items
    if (sortBy === "name") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === "category") {
      result.sort((a, b) => a.categoryLabel.localeCompare(b.categoryLabel));
    }

    return result;
  }, [activeTab, searchQuery, sortBy]);

  // Counts for category badges
  const categoryCounts = useMemo(() => {
    return {
      all: SCREENSHOTS.length,
      goals: SCREENSHOTS.filter((s) => s.category === "goals").length,
      schedules: SCREENSHOTS.filter((s) => s.category === "schedules").length,
      todos: SCREENSHOTS.filter((s) => s.category === "todos").length,
      summary: SCREENSHOTS.filter((s) => s.category === "summary").length,
    };
  }, []);

  // Selected screenshot item for lightbox modal
  const selectedItem = selectedIndex !== null ? filteredScreenshots[selectedIndex] : null;

  const handleNext = useCallback(() => {
    if (selectedIndex !== null && filteredScreenshots.length > 0) {
      setSelectedIndex((selectedIndex + 1) % filteredScreenshots.length);
    }
  }, [selectedIndex, filteredScreenshots.length]);

  const handlePrev = useCallback(() => {
    if (selectedIndex !== null && filteredScreenshots.length > 0) {
      setSelectedIndex(
        (selectedIndex - 1 + filteredScreenshots.length) % filteredScreenshots.length
      );
    }
  }, [selectedIndex, filteredScreenshots.length]);

  // Keyboard controls for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === "Escape") {
        setSelectedIndex(null);
      } else if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, handleNext, handlePrev]);

  // Autoplay functionality for Tour / Lightbox mode
  useEffect(() => {
    if (!isAutoplay || selectedIndex === null) return;
    const timer = setInterval(() => {
      handleNext();
    }, 4000);
    return () => clearInterval(timer);
  }, [isAutoplay, selectedIndex, handleNext]);

  return (
    <section
      id="app-gallery"
      className="relative isolate overflow-hidden bg-slate-900 dark:bg-[#030914] py-24 px-4 sm:px-6 lg:px-8 transition-colors duration-300"
    >
      {/* Background ambient glowing shapes */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute left-1/4 top-1/4 h-[40rem] w-[40rem] rounded-full bg-cyan-500/10 blur-[120px]" />
        <div className="absolute right-1/4 bottom-1/4 h-[35rem] w-[35rem] rounded-full bg-indigo-500/10 blur-[120px]" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[45rem] w-[45rem] rounded-full bg-teal-500/5 blur-[140px]" />
      </div>

      <div className="mx-auto max-w-7xl space-y-12">
        {/* ========================================================================= */}
        {/* SECTION HEADER                                                            */}
        {/* ========================================================================= */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs sm:text-sm font-extrabold tracking-widest uppercase shadow-sm"
          >
            <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
            App Feature Showcase
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15]"
          >
            Explore MyOrbit{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-sky-400 bg-clip-text text-transparent">
              In Quick Glance
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-slate-400 text-base sm:text-lg font-medium leading-relaxed max-w-2xl mx-auto"
          >
            Browse real screenshots of our personal productivity app segments — from smart goal tracking to daily schedule intelligence and task management.
          </motion.p>
        </div>

        {/* ========================================================================= */}
        {/* CATEGORY TABS & FILTER BAR                                                */}
        {/* ========================================================================= */}
        <div className="space-y-6">
          {/* Main Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-2xl bg-slate-800/80 border border-slate-700/80 backdrop-blur-md max-w-4xl mx-auto">
            <button
              type="button"
              onClick={() => setActiveTab("all")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === "all"
                  ? "bg-gradient-to-r from-cyan-500 to-teal-500 text-slate-950 shadow-md shadow-cyan-500/20"
                  : "text-slate-400 hover:text-white hover:bg-slate-700/50"
              }`}
            >
              <Layout className="w-4 h-4" />
              <span>All Screenshots</span>
              <span
                className={`ml-1 px-2 py-0.5 rounded-md text-[11px] font-black ${
                  activeTab === "all"
                    ? "bg-slate-950/30 text-slate-950"
                    : "bg-slate-700/70 text-slate-300"
                }`}
              >
                {categoryCounts.all}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("goals")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === "goals"
                  ? "bg-gradient-to-r from-cyan-500 to-teal-500 text-slate-950 shadow-md shadow-cyan-500/20"
                  : "text-slate-400 hover:text-white hover:bg-slate-700/50"
              }`}
            >
              <Target className="w-4 h-4" />
              <span>Goals & Tracking</span>
              <span
                className={`ml-1 px-2 py-0.5 rounded-md text-[11px] font-black ${
                  activeTab === "goals"
                    ? "bg-slate-950/30 text-slate-950"
                    : "bg-slate-700/70 text-slate-300"
                }`}
              >
                {categoryCounts.goals}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("schedules")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === "schedules"
                  ? "bg-gradient-to-r from-cyan-500 to-teal-500 text-slate-950 shadow-md shadow-cyan-500/20"
                  : "text-slate-400 hover:text-white hover:bg-slate-700/50"
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>Schedules & Reminders</span>
              <span
                className={`ml-1 px-2 py-0.5 rounded-md text-[11px] font-black ${
                  activeTab === "schedules"
                    ? "bg-slate-950/30 text-slate-950"
                    : "bg-slate-700/70 text-slate-300"
                }`}
              >
                {categoryCounts.schedules}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("todos")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === "todos"
                  ? "bg-gradient-to-r from-cyan-500 to-teal-500 text-slate-950 shadow-md shadow-cyan-500/20"
                  : "text-slate-400 hover:text-white hover:bg-slate-700/50"
              }`}
            >
              <CheckSquare className="w-4 h-4" />
              <span>Todos & Tasks</span>
              <span
                className={`ml-1 px-2 py-0.5 rounded-md text-[11px] font-black ${
                  activeTab === "todos"
                    ? "bg-slate-950/30 text-slate-950"
                    : "bg-slate-700/70 text-slate-300"
                }`}
              >
                {categoryCounts.todos}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("summary")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === "summary"
                  ? "bg-gradient-to-r from-cyan-500 to-teal-500 text-slate-950 shadow-md shadow-cyan-500/20"
                  : "text-slate-400 hover:text-white hover:bg-slate-700/50"
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Daily Summary</span>
              <span
                className={`ml-1 px-2 py-0.5 rounded-md text-[11px] font-black ${
                  activeTab === "summary"
                    ? "bg-slate-950/30 text-slate-950"
                    : "bg-slate-700/70 text-slate-300"
                }`}
              >
                {categoryCounts.summary}
              </span>
            </button>
          </div>

          {/* Secondary Controls Bar: Search, Sort, Tour Quick Launch */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-slate-800/40 border border-slate-700/50">
            {/* Search input */}
            <div className="relative flex-1 min-w-[220px] max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search screen features (e.g. sleep, debt, schedule)..."
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white text-xs sm:text-sm placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-3">
              {/* Sort Selector */}
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
                <SlidersHorizontal className="w-4 h-4 text-cyan-400" />
                <span>Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="bg-slate-900 border border-slate-700 text-white rounded-lg px-2.5 py-1.5 text-xs font-bold focus:outline-none focus:border-cyan-500"
                >
                  <option value="default">Category Relevance</option>
                  <option value="name">Screen Title (A-Z)</option>
                  <option value="category">Category Name</option>
                </select>
              </div>

              {/* Quick Launch Fullscreen Tour Button */}
              <button
                type="button"
                onClick={() => {
                  if (filteredScreenshots.length > 0) {
                    setSelectedIndex(0);
                    setIsAutoplay(true);
                  }
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/30 text-cyan-300 text-xs font-extrabold transition-all"
              >
                <Play className="w-3.5 h-3.5 fill-cyan-300" />
                <span>Launch Interactive Tour</span>
              </button>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SCREENSHOTS GRID DISPLAY                                                  */}
        {/* ========================================================================= */}
        {filteredScreenshots.length === 0 ? (
          <div className="text-center py-20 p-8 rounded-3xl bg-slate-800/30 border border-slate-700/50 space-y-4">
            <Search className="w-12 h-12 text-slate-500 mx-auto" />
            <h3 className="text-xl font-bold text-white">No matching screenshots found</h3>
            <p className="text-slate-400 text-sm max-w-md mx-auto">
              We couldn&apos;t find any screenshots matching &ldquo;{searchQuery}&rdquo;. Try clearing your search query or choosing a different category.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setActiveTab("all");
              }}
              className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredScreenshots.map((item, index) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.92, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 15 }}
                  transition={{ duration: 0.35, delay: index * 0.03 }}
                  onClick={() => setSelectedIndex(index)}
                  className="group relative flex flex-col rounded-3xl bg-slate-800/60 border border-slate-700/70 hover:border-cyan-500/60 overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-cyan-500/10 cursor-pointer transition-all duration-300"
                >
                  {/* Screenshot Image Container */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-950 flex items-center justify-center p-2">
                    <img
                      src={item.src}
                      alt={item.title}
                      className="w-full h-full object-contain rounded-xl group-hover:scale-105 transition-transform duration-500 ease-out"
                      loading="lazy"
                    />

                    {/* Top overlay badge */}
                    <div className="absolute top-4 left-4 z-10">
                      <span className="px-3 py-1 rounded-full bg-slate-900/90 backdrop-blur-md border border-slate-700 text-cyan-300 text-[11px] font-extrabold uppercase tracking-wider shadow-md">
                        {item.badge}
                      </span>
                    </div>

                    {/* Quick View Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                      <span className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-cyan-500 text-slate-950 text-xs font-black shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <Eye className="w-4 h-4" />
                        Expand Screenshot
                      </span>
                    </div>
                  </div>

                  {/* Card Content & Metadata */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-3 bg-gradient-to-b from-slate-800/80 to-slate-900/90">
                    <div>
                      <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-widest">
                        {item.categoryLabel}
                      </span>
                      <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors mt-0.5">
                        {item.title}
                      </h3>
                      <p className="text-xs text-slate-400 line-clamp-2 mt-1.5 font-medium leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    {/* Highlights bullet tags */}
                    <div className="pt-2 border-t border-slate-700/60 flex items-center justify-between text-[11px] font-semibold text-slate-400">
                      <span className="flex items-center gap-1.5 text-emerald-400">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        {item.keyFeatures[0]}
                      </span>
                      <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* ========================================================================= */}
        {/* LIGHTBOX MODAL / FULLSCREEN SLIDESHOW                                     */}
        {/* ========================================================================= */}
        <AnimatePresence>
          {selectedIndex !== null && selectedItem && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/95 backdrop-blur-xl"
            >
              {/* Modal Container */}
              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 10 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 10 }}
                transition={{ duration: 0.3 }}
                className="relative w-full max-w-6xl max-h-[92vh] flex flex-col rounded-3xl bg-slate-900 border border-slate-700/80 shadow-2xl overflow-hidden"
              >
                {/* Header Bar */}
                <div className="flex items-center justify-between p-4 sm:px-6 border-b border-slate-800 bg-slate-900/90 backdrop-blur-md">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-xs font-black uppercase">
                      {selectedItem.badge}
                    </span>
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-white">
                        {selectedItem.title}
                      </h3>
                      <span className="text-xs text-slate-400 font-medium hidden sm:inline">
                        Screen {selectedIndex + 1} of {filteredScreenshots.length} ·{" "}
                        {selectedItem.categoryLabel}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Autoplay toggle */}
                    <button
                      type="button"
                      onClick={() => setIsAutoplay(!isAutoplay)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        isAutoplay
                          ? "bg-emerald-500 text-slate-950"
                          : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                      }`}
                      title={isAutoplay ? "Pause slideshow" : "Start 4s autoplay slideshow"}
                    >
                      {isAutoplay ? (
                        <>
                          <Pause className="w-3.5 h-3.5 fill-slate-950" />
                          <span className="hidden sm:inline">Autoplay On</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-3.5 h-3.5 fill-slate-300" />
                          <span className="hidden sm:inline">Autoplay</span>
                        </>
                      )}
                    </button>

                    {/* Close modal button */}
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedIndex(null);
                        setIsAutoplay(false);
                      }}
                      className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                      aria-label="Close screen view"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Main Body: Screenshot Image View & Sidebar Details */}
                <div className="flex-1 overflow-y-auto grid grid-cols-1 lg:grid-cols-3 gap-0 min-h-0">
                  {/* Image Display Area */}
                  <div className="relative lg:col-span-2 bg-slate-950 flex items-center justify-center p-4 sm:p-8 min-h-[340px] sm:min-h-[460px]">
                    <motion.img
                      key={selectedItem.id}
                      initial={{ opacity: 0, scale: 0.97 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.97 }}
                      transition={{ duration: 0.25 }}
                      src={selectedItem.src}
                      alt={selectedItem.title}
                      className="max-h-[62vh] max-w-full object-contain rounded-2xl shadow-2xl border border-slate-800/80"
                    />

                    {/* Left arrow navigation */}
                    <button
                      type="button"
                      onClick={handlePrev}
                      className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 p-3 rounded-2xl bg-slate-900/80 hover:bg-cyan-500 text-white hover:text-slate-950 border border-slate-700 shadow-xl backdrop-blur-md transition-all group"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" />
                    </button>

                    {/* Right arrow navigation */}
                    <button
                      type="button"
                      onClick={handleNext}
                      className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 p-3 rounded-2xl bg-slate-900/80 hover:bg-cyan-500 text-white hover:text-slate-950 border border-slate-700 shadow-xl backdrop-blur-md transition-all group"
                      aria-label="Next image"
                    >
                      <ChevronRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>

                  {/* Sidebar Detail Panel */}
                  <div className="p-6 sm:p-8 bg-slate-900 flex flex-col justify-between space-y-6 border-t lg:border-t-0 lg:border-l border-slate-800">
                    <div className="space-y-6">
                      <div>
                        <span className="text-xs font-black text-cyan-400 uppercase tracking-widest">
                          {selectedItem.categoryLabel}
                        </span>
                        <h4 className="text-xl sm:text-2xl font-black text-white mt-1">
                          {selectedItem.title}
                        </h4>
                        <p className="text-xs text-slate-500 font-mono mt-1">
                          File: {selectedItem.filename}
                        </p>
                      </div>

                      <div className="space-y-2">
                        <h5 className="text-xs font-extrabold uppercase tracking-wider text-slate-300">
                          Segment Overview
                        </h5>
                        <p className="text-sm text-slate-300 font-medium leading-relaxed bg-slate-800/50 p-4 rounded-2xl border border-slate-700/50">
                          {selectedItem.description}
                        </p>
                      </div>

                      <div className="space-y-3">
                        <h5 className="text-xs font-extrabold uppercase tracking-wider text-slate-300">
                          Key Capabilities Shown
                        </h5>
                        <ul className="space-y-2.5">
                          {selectedItem.keyFeatures.map((feature, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-2.5 text-xs sm:text-sm font-semibold text-slate-200"
                            >
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Navigation counter and keyboard hint */}
                    <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                      <span>
                        Image <strong className="text-white">{selectedIndex + 1}</strong> of{" "}
                        <strong className="text-white">{filteredScreenshots.length}</strong>
                      </span>
                      <span className="hidden sm:inline text-[11px] font-mono text-slate-500">
                        Use ← → arrow keys to navigate
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bottom Thumbnail Strip Carousel */}
                <div className="p-3 bg-slate-950 border-t border-slate-800 overflow-x-auto flex items-center gap-3 scrollbar-thin">
                  {filteredScreenshots.map((thumb, idx) => (
                    <button
                      key={thumb.id}
                      type="button"
                      onClick={() => setSelectedIndex(idx)}
                      className={`relative h-14 w-20 shrink-0 rounded-xl overflow-hidden border-2 transition-all ${
                        idx === selectedIndex
                          ? "border-cyan-400 scale-105 shadow-md shadow-cyan-500/30"
                          : "border-slate-800 opacity-60 hover:opacity-100 hover:border-slate-600"
                      }`}
                    >
                      <img
                        src={thumb.src}
                        alt={thumb.title}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
