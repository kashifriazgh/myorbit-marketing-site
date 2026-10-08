"use client";

import React, { useState } from "react";
import OverdueTasksFeature from "./OverdueTasksFeature";
import {
  Calendar,
  CheckSquare,
  Wallet,
  Target,
  Bell,
  Clock,
  CheckCircle2,
  RefreshCw,
  Edit3,
  TrendingUp,
  DollarSign,
  Plus,
  Layers,
  Play,
  Pause,
  ChevronDown,
  ChevronUp,
  User,
  Check,
} from "lucide-react";

interface DemoTaskStep {
  text: string;
  completed: boolean;
}

interface DemoTask {
  id: string;
  title: string;
  priority: string;
  dueDate: string;
  assignee?: string;
  isFlexible?: boolean;
  workStarted: boolean;
  completed: boolean;
  stepsExpanded: boolean;
  steps: DemoTaskStep[];
}

export default function PillarsShowcase() {
  // Pillar 2 Interactive Demo State
  const [activeDateIndex, setActiveDateIndex] = useState(0);
  const [quickInput, setQuickInput] = useState("");
  const [isAddingQuick, setIsAddingQuick] = useState(false);

  const dates = [
    { day: "Today", date: "19", count: 3 },
    { day: "Sat", date: "20", count: 2 },
    { day: "Sun", date: "21", count: 1 },
    { day: "Mon", date: "22", count: 4 },
    { day: "Tue", date: "23", count: 2 },
  ];

  const [demoTasks, setDemoTasks] = useState<DemoTask[]>([
    {
      id: "t1",
      title: "Client Strategy & Proposal Review",
      priority: "critical",
      dueDate: "Today",
      assignee: "Abdullah",
      workStarted: true,
      completed: false,
      stepsExpanded: true,
      steps: [
        { text: "Gather quarterly analytics report", completed: true },
        { text: "Update financial projection slides", completed: false },
      ],
    },
    {
      id: "t2",
      title: "Finalize Marketing Campaign Assets",
      priority: "urgent",
      dueDate: "Today",
      isFlexible: true,
      workStarted: false,
      completed: false,
      stepsExpanded: false,
      steps: [],
    },
    {
      id: "t3",
      title: "Weekly Team Sync Notes & Action Items",
      priority: "routine",
      dueDate: "Today",
      workStarted: false,
      completed: true,
      stepsExpanded: false,
      steps: [],
    },
  ]);

  const toggleTaskCompleted = (id: string) => {
    setDemoTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const toggleWorkStarted = (id: string) => {
    setDemoTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, workStarted: !t.workStarted } : t))
    );
  };

  const toggleStepsExpanded = (id: string) => {
    setDemoTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, stepsExpanded: !t.stepsExpanded } : t))
    );
  };

  const toggleStepCompleted = (taskId: string, stepIdx: number) => {
    setDemoTasks((prev) =>
      prev.map((t) => {
        if (t.id !== taskId) return t;
        const updatedSteps = [...t.steps];
        updatedSteps[stepIdx] = {
          ...updatedSteps[stepIdx],
          completed: !updatedSteps[stepIdx].completed,
        };
        return { ...t, steps: updatedSteps };
      })
    );
  };

  const handleAddQuickTask = () => {
    if (!quickInput.trim()) return;
    const newTask = {
      id: `t-${Date.now()}`,
      title: quickInput.trim(),
      priority: "routine",
      dueDate: "Today",
      workStarted: false,
      completed: false,
      stepsExpanded: false,
      steps: [],
    };
    setDemoTasks((prev) => [newTask, ...prev]);
    setQuickInput("");
    setIsAddingQuick(false);
  };

  const completedCount = demoTasks.filter((t) => t.completed).length;
  const progressPercent =
    demoTasks.length > 0 ? Math.round((completedCount / demoTasks.length) * 100) : 0;

  // Pillar 3 Goal Demo Interactive State
  const [earnedIncome, setEarnedIncome] = useState(0);
  const [goalTasks, setGoalTasks] = useState([
    {
      id: "gt-1",
      title: "Research freelancing platforms (Upwork, Fiverr, TopTal)",
      kind: "todo",
      priority: "routine",
      dueDate: "Today",
      done: true,
    },
    {
      id: "gt-2",
      title: "Identify your skill set & create portfolio samples",
      kind: "todo",
      priority: "critical",
      dueDate: "Today",
      done: true,
    },
    {
      id: "gt-3",
      title: "Join 5 active social media & freelance community groups",
      kind: "todo",
      priority: "urgent",
      dueDate: "Tomorrow",
      done: false,
    },
    {
      id: "gt-4",
      title: "Set up Fiverr & Upwork profiles & launch service gig",
      kind: "schedule",
      timeSlot: "Tomorrow · 4:00 PM – 5:30 PM",
      priority: "critical",
      done: false,
    },
  ]);

  const toggleGoalTaskDone = (id: string) => {
    setGoalTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  const handleIncomeIncreaseClick = () => {
    setEarnedIncome((prev) => (prev >= 15000 ? 0 : prev + 5000));
  };

  const completedGoalTasks = goalTasks.filter((t) => t.done).length;
  const taskPct = (completedGoalTasks / goalTasks.length) * 50;
  const incomePct = Math.min(50, (earnedIncome / 15000) * 50);
  const totalGoalProgress = Math.round(taskPct + incomePct);

  return (
    <section id="features" className="relative isolate overflow-hidden bg-slate-50 dark:bg-[#040d1a] py-24 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      {/* Background Glows */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/3 top-1/4 h-[40rem] w-[40rem] rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute right-1/4 bottom-1/3 h-[35rem] w-[35rem] rounded-full bg-indigo-500/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl space-y-28 sm:space-y-36">

        {/* ========================================================================= */}
        {/* OVERARCHING SECTION HEADER: 4 MAJOR PILLARS OF THE APP                   */}
        {/* ========================================================================= */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-4">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-700 dark:text-indigo-300 text-xs sm:text-sm font-black tracking-widest uppercase shadow-sm">
            <Layers className="w-4 h-4 text-indigo-500 animate-pulse" />
            Core Architecture
          </span>
          <h2 className="text-4xl sm:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
            <span className="bg-gradient-to-r from-cyan-500 via-indigo-500 to-emerald-400 bg-clip-text text-transparent">
              4 Major Pillars
            </span>{" "}
            of the App
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
            Schedules, Todos, Goals, and Finance — four unified systems working in perfect sync.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* PILLAR 1: SCHEDULES                                                       */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5 space-y-5">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-700 dark:text-cyan-300 text-xs font-black tracking-widest uppercase shadow-sm">
              <Calendar className="w-4 h-4 text-cyan-500" />
              Pillar 1 · Schedules
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
              Create it. Schedule it. Reschedule it.{" "}
              <span className="bg-gradient-to-r from-cyan-500 to-emerald-400 bg-clip-text text-transparent">
                Get it done.
              </span>
            </h2>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              Plan your day down to the minute. Lock in dates, execution times, and durations with instant flexibility to edit or reschedule on the fly.
            </p>

            {/* Schedules Checklist */}
            <div className="pt-3 border-t border-slate-200/80 dark:border-slate-800 space-y-2.5">
              <span className="text-xs font-black uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                Key Schedules Capabilities
              </span>
              <ul className="space-y-2">
                {[
                  "Make schedules of today and any Next coming day",
                  "Set Push Notification Reminders",
                  "Edit, Update and delete schedule anytime",
                  "Hourly separated schedules view",
                  "Iconic status of complete / not complete",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Schedule UI Mockup */}
          <div className="lg:col-span-7">
            <div className="relative rounded-3xl border border-slate-200/80 dark:border-white/10 bg-white/90 dark:bg-[#0a1a2e]/90 p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
              <div className="flex items-center justify-between border-b border-slate-200/70 dark:border-white/10 pb-4 mb-6">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-cyan-500" /> Today&apos;s Schedule
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Friday, Sept 19 · 3 Events Scheduled</p>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border border-cyan-500/20">
                  Live Sync
                </span>
              </div>

              {/* Schedule Card Detail */}
              <div className="rounded-2xl border border-cyan-500/30 bg-cyan-500/5 p-4 sm:p-5 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
                    <Clock className="w-4 h-4 text-cyan-500" />
                    <span>4:00 PM – 4:30 PM</span>
                    <span className="text-xs font-normal text-slate-500 dark:text-slate-400">(30 min)</span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/15 text-emerald-700 dark:text-emerald-300">
                    Confirmed
                  </span>
                </div>

                <div className="min-w-0">
                  <h4 className="text-base font-bold text-slate-900 dark:text-white">Client Strategy Call & Review</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Discuss project deliverables & budget allocation.</p>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-cyan-500/15 text-xs font-semibold">
                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-500 text-slate-950 hover:bg-cyan-400 transition font-bold shadow-sm">
                    <RefreshCw className="w-3.5 h-3.5" /> Reschedule
                  </button>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-200 dark:bg-white/10 text-slate-700 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-white/15 transition">
                    <Edit3 className="w-3.5 h-3.5" /> Edit
                  </button>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-200 dark:bg-white/10 text-slate-700 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-white/15 transition">
                    <Bell className="w-3.5 h-3.5 text-cyan-500" /> Reminder (30m before)
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* PILLAR 2: TODOS & OVERDUE SAFEGUARD                                      */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Important Tasks Showcase Mockup */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            <div className="rounded-3xl border border-slate-200/80 dark:border-white/10 bg-white/95 dark:bg-[#0a1a2e]/95 p-5 sm:p-7 shadow-2xl backdrop-blur-xl space-y-5">
              
              {/* Card Header with Progress Ring */}
              <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-2xl bg-emerald-500/15 text-emerald-500 border border-emerald-500/20">
                    <CheckSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      Today&apos;s Focus &amp; Tasks
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {completedCount} of {demoTasks.length} tasks completed
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    {progressPercent}% Done
                  </span>
                </div>
              </div>

              {/* Date Tabs (5 Days Selector) */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
                {dates.map((d, idx) => {
                  const isActive = activeDateIndex === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => setActiveDateIndex(idx)}
                      className={`flex flex-col items-center min-w-[58px] py-1.5 px-2.5 rounded-xl border text-xs font-bold transition-all ${
                        isActive
                          ? "bg-slate-900 text-white border-slate-900 dark:bg-emerald-500 dark:border-emerald-500 dark:text-slate-950 shadow-md scale-[1.03]"
                          : "bg-slate-100 dark:bg-slate-900/60 text-slate-600 dark:text-slate-400 border-slate-200/80 dark:border-slate-800 hover:border-emerald-500/40"
                      }`}
                    >
                      <span className="text-[10px] uppercase font-extrabold opacity-80">{d.day}</span>
                      <span className="text-sm font-black">{d.date}</span>
                      <span
                        className={`text-[9px] px-1.5 py-0.2 rounded-full mt-0.5 ${
                          isActive
                            ? "bg-white/20 text-white dark:bg-slate-950/30 dark:text-slate-950 font-black"
                            : "bg-slate-200 dark:bg-slate-800 text-slate-500"
                        }`}
                      >
                        {d.count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Quick Add Task Input Row */}
              {!isAddingQuick ? (
                <button
                  onClick={() => setIsAddingQuick(true)}
                  className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 text-slate-400 dark:text-slate-500 hover:text-emerald-500 dark:hover:text-emerald-400 hover:border-emerald-400/60 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/20 text-xs font-semibold transition-all text-left"
                >
                  <span className="w-5 h-5 rounded-md border border-dashed border-slate-400 dark:border-slate-600 flex items-center justify-center shrink-0">
                    <Plus className="w-3.5 h-3.5" />
                  </span>
                  <span>Quickly add a task...</span>
                </button>
              ) : (
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-sky-400/60 bg-sky-50 dark:bg-slate-900 shadow-sm">
                  <div className="p-1 rounded bg-sky-500/10 text-sky-600 dark:text-sky-400 shrink-0">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <input
                    autoFocus
                    type="text"
                    value={quickInput}
                    onChange={(e) => setQuickInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleAddQuickTask();
                      if (e.key === "Escape") setIsAddingQuick(false);
                    }}
                    placeholder="Task title..."
                    className="flex-1 bg-transparent border-none outline-none text-xs font-semibold text-slate-900 dark:text-white placeholder:text-slate-400"
                  />
                  <button
                    onClick={handleAddQuickTask}
                    disabled={!quickInput.trim()}
                    className="w-7 h-7 rounded-full bg-emerald-500 hover:bg-emerald-600 disabled:opacity-40 text-white flex items-center justify-center transition shrink-0 shadow-sm"
                  >
                    <Check className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {/* Task Cards List */}
              <div className="space-y-3">
                {demoTasks.map((task) => {
                  return (
                    <div
                      key={task.id}
                      className={`rounded-2xl border transition-all ${
                        task.completed
                          ? "bg-slate-100/60 dark:bg-slate-900/30 border-slate-200/60 dark:border-slate-800/60 opacity-75"
                          : "bg-white dark:bg-slate-900/80 border-slate-200/90 dark:border-slate-800 hover:border-emerald-500/40 shadow-sm"
                      } p-3 sm:p-3.5 space-y-2`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                        {/* Checkbox & Title & Tags */}
                        <div className="flex items-start sm:items-center gap-2.5 min-w-0 flex-1">
                          <button
                            type="button"
                            onClick={() => toggleTaskCompleted(task.id)}
                            className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 sm:mt-0 transition-all ${
                              task.completed
                                ? "bg-indigo-600 border-indigo-600 text-white shadow-sm"
                                : "border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 hover:border-indigo-400"
                            }`}
                          >
                            {task.completed && <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[3]" />}
                          </button>

                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              {task.workStarted && !task.completed && (
                                <span className="relative flex h-2 w-2">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                </span>
                              )}
                              <span
                                className={`text-xs sm:text-sm font-bold tracking-tight break-words sm:truncate ${
                                  task.completed
                                    ? "line-through text-slate-400 dark:text-slate-500"
                                    : "text-slate-900 dark:text-white"
                                }`}
                              >
                                {task.title}
                              </span>
                            </div>

                            {/* Tags row (Separate line on mobile for maximum clarity) */}
                            <div className="flex items-center gap-1.5 mt-1 flex-wrap text-[10px]">
                              {task.isFlexible ? (
                                <span className="px-2 py-0.5 rounded font-extrabold border border-purple-500/40 text-purple-600 dark:text-purple-400 bg-purple-500/10">
                                  Flexible
                                </span>
                              ) : (
                                <span className="px-2 py-0.5 rounded font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                                  Due: {task.dueDate}
                                </span>
                              )}

                              <span
                                className={`px-2 py-0.5 rounded font-black uppercase text-white shadow-xs ${
                                  task.priority === "critical"
                                    ? "bg-rose-500"
                                    : task.priority === "urgent"
                                    ? "bg-amber-500"
                                    : "bg-emerald-500"
                                }`}
                              >
                                {task.priority}
                              </span>

                              {task.assignee && (
                                <span className="px-2 py-0.5 rounded font-bold bg-sky-500/10 text-sky-700 dark:text-sky-300 border border-sky-500/20 flex items-center gap-1">
                                  <User className="w-3 h-3" />
                                  {task.assignee}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Action buttons on separate row on mobile */}
                        <div className="flex items-center justify-end gap-1.5 pt-2 sm:pt-0 border-t border-slate-100 dark:border-slate-800/60 sm:border-0 shrink-0 text-slate-400 dark:text-slate-500">
                          {task.steps && task.steps.length > 0 && (
                            <button
                              onClick={() => toggleStepsExpanded(task.id)}
                              className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-indigo-500 transition flex items-center gap-1 text-[11px] font-bold"
                              title="Toggle Sub-steps"
                            >
                              <span className="text-[10px] bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-1.5 py-0.2 rounded font-extrabold">
                                {task.steps.filter((s) => s.completed).length}/{task.steps.length}
                              </span>
                              {task.stepsExpanded ? (
                                <ChevronUp className="w-3.5 h-3.5" />
                              ) : (
                                <ChevronDown className="w-3.5 h-3.5" />
                              )}
                            </button>
                          )}

                          <button
                            onClick={() => toggleWorkStarted(task.id)}
                            className={`p-1.5 rounded-lg transition ${
                              task.workStarted
                                ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-bold"
                                : "hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-emerald-500"
                            }`}
                            title={task.workStarted ? "Stop Work Timer" : "Start Work Timer"}
                          >
                            {task.workStarted ? (
                              <Pause className="w-3.5 h-3.5 fill-current" />
                            ) : (
                              <Play className="w-3.5 h-3.5 fill-current" />
                            )}
                          </button>

                          <button
                            className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-amber-500 transition"
                            title="Reschedule Task"
                          >
                            <Calendar className="w-3.5 h-3.5" />
                          </button>

                          <button
                            className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-indigo-500 transition"
                            title="Set Reminder"
                          >
                            <Bell className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Collapsible Sub-steps */}
                      {task.steps && task.steps.length > 0 && task.stepsExpanded && (
                        <div className="pl-9 pr-2 pt-2 border-t border-slate-100 dark:border-slate-800/80 space-y-1.5">
                          {task.steps.map((st, sIdx) => (
                            <div key={sIdx} className="flex items-center gap-2 text-xs">
                              <button
                                onClick={() => toggleStepCompleted(task.id, sIdx)}
                                className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 transition ${
                                  st.completed
                                    ? "bg-emerald-500 border-emerald-500 text-white"
                                    : "border-slate-300 dark:border-slate-600 hover:border-emerald-400"
                                }`}
                              >
                                {st.completed && <Check className="w-3 h-3 stroke-[3]" />}
                              </button>
                              <span
                                className={`font-medium ${
                                  st.completed
                                    ? "line-through text-slate-400 dark:text-slate-500"
                                    : "text-slate-700 dark:text-slate-300"
                                }`}
                              >
                                {st.text}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-5 order-1 lg:order-2">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs font-black tracking-widest uppercase shadow-sm">
              <CheckSquare className="w-4 h-4 text-emerald-500" />
              Pillar 2 · Todos
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
              Your tasks,{" "}
              <span className="bg-gradient-to-r from-emerald-500 to-teal-400 bg-clip-text text-transparent">
                without the clutter.
              </span>
            </h2>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              Organize tasks with due dates, execution timers, sub-steps, priority levels, and assignees. With 5-day focus views and Overdue Safeguard protection, nothing slips through the cracks.
            </p>

            {/* Todos Checklist */}
            <div className="pt-3 border-t border-slate-200/80 dark:border-slate-800 space-y-2.5">
              <span className="text-xs font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                Key Todos Capabilities
              </span>
              <ul className="space-y-2">
                {[
                  "Create Tasks ToDo for today, tomorrow, next week or any future day",
                  "Make a schedule within a task in just 'one click'",
                  "Set Push Notification for reminders",
                  "Create Steps and sub Steps",
                  "Reschedule if not reach on time",
                  "Over Due Tasks shown in a separate UI / section",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* OVERDUE TASKS SAFEGUARD FEATURE (RIGHT BELOW PILLAR 2)                     */}
        {/* ========================================================================= */}
        <div className="pt-4">
          <OverdueTasksFeature />
        </div>

        {/* ========================================================================= */}
        {/* PILLAR 3: GOALS — "SPLIT YOUR GOALS INTO SMALL SCHEDULES, TASKS..."        */}
        {/* ========================================================================= */}
        <div className="space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-500/15 border border-sky-500/30 text-sky-700 dark:text-sky-300 text-xs font-black tracking-widest uppercase shadow-sm">
              <Target className="w-4 h-4 text-sky-500" />
              Pillar 3 · Goals
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
              Split your goals into small Schedules, Tasks and Reminders to{" "}
              <span className="bg-gradient-to-r from-sky-400 via-indigo-500 to-emerald-400 bg-clip-text text-transparent">
                Accomplish something big
              </span>{" "}
              within goal section
            </h2>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              Break down complex ambitions into actionable milestones, daily schedules, connected tasks, and automated reminders.
            </p>

            {/* Goals Checklist Badges */}
            <div className="pt-2 flex flex-wrap justify-center gap-2.5">
              {[
                "Create goals across Finance, Health, Learning & Habit categories",
                "Link Tasks and schedules directly with a goal",
                "Each type of goal has its own dedicated layout design",
                "Track progress ring and count check-in streaks",
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-500/10 border border-sky-500/20 text-xs font-bold text-slate-800 dark:text-slate-200"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Income Goal Milestone Mockup (Inspired by IncomeTemplate.tsx & goals/[id]/page.tsx) */}
          <div className="max-w-4xl mx-auto rounded-3xl border border-slate-200/80 dark:border-white/10 bg-white/95 dark:bg-[#0a1a2e]/95 p-6 sm:p-8 shadow-2xl backdrop-blur-xl space-y-6">
            
            {/* 1. Header Banner (Current Income & Goal Progress) */}
            <div className="rounded-2xl bg-gradient-to-r from-emerald-500/15 via-teal-500/10 to-sky-500/15 p-5 border border-emerald-500/30 flex flex-wrap items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[11px] font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  💰 Income Growth Goal Milestone
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                  <span>Current Income:</span>
                  <span className="text-emerald-500 font-mono">PKR {earnedIncome.toLocaleString()}</span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Target Goal: <strong className="text-slate-800 dark:text-slate-200">PKR 15,000 / month</strong>
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <span className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400 font-mono">
                    {totalGoalProgress}%
                  </span>
                  <span className="block text-[10px] uppercase font-bold text-slate-400">Milestone Progress</span>
                </div>
              </div>
            </div>

            {/* Overall Milestone Progress Bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold text-slate-600 dark:text-slate-300">
                <span>Milestone Completion Pacing</span>
                <span className="text-emerald-500 font-mono">{totalGoalProgress}% Achieved</span>
              </div>
              <div className="w-full h-3 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-400 via-teal-500 to-sky-500 rounded-full transition-all duration-500"
                  style={{ width: `${totalGoalProgress}%` }}
                />
              </div>
            </div>

            {/* 2. Proposed Income Source Card (Template Item) */}
            <div className="rounded-2xl border border-sky-500/30 bg-sky-50/50 dark:bg-slate-900/60 p-4 sm:p-5 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-sky-500/20 pb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-sky-500/15 text-sky-500 border border-sky-500/30">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                      Get 15000 with freelancing
                    </h4>
                    <span className="text-xs text-sky-600 dark:text-sky-400 font-semibold">
                      Proposed Channel · Target: PKR 15,000 / month
                    </span>
                  </div>
                </div>

                <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-sky-500/15 text-sky-700 dark:text-sky-300 border border-sky-500/30">
                  Proposed Income Channel
                </span>
              </div>

              {/* Earned vs Target & Increase Button */}
              <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-semibold">
                <div className="space-y-0.5">
                  <span className="text-slate-500 dark:text-slate-400">Current Earned vs Desired Target:</span>
                  <div className="text-base font-black text-slate-900 dark:text-white font-mono">
                    <span className="text-emerald-500">PKR {earnedIncome.toLocaleString()}</span>
                    <span className="text-slate-400 font-normal"> / Desired Target: PKR 15,000</span>
                  </div>
                </div>

                <button
                  onClick={handleIncomeIncreaseClick}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-xs transition shadow-sm"
                >
                  <TrendingUp className="w-4 h-4" />
                  <span>Have you got an income increase?</span>
                </button>
              </div>

              {/* Channel Progress Bar */}
              <div className="w-full h-2.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-sky-500 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, Math.round((earnedIncome / 15000) * 100))}%` }}
                />
              </div>

              {/* 3. 4 Strategic Tasks & Schedules Linked to this Milestone */}
              <div className="space-y-2.5 pt-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    🎯 Strategic Steps for this Goal ({goalTasks.length})
                  </span>
                  <span className="text-[11px] font-bold text-sky-600 dark:text-sky-400">
                    {completedGoalTasks} of {goalTasks.length} Completed
                  </span>
                </div>

                <div className="space-y-2">
                  {goalTasks.map((gt) => (
                    <div
                      key={gt.id}
                      onClick={() => toggleGoalTaskDone(gt.id)}
                      className={`flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded-xl border transition-all cursor-pointer ${
                        gt.done
                          ? "bg-slate-100/70 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800/80 opacity-75"
                          : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-sky-400 shadow-xs"
                      }`}
                    >
                      <div className="flex items-start sm:items-center gap-2.5 min-w-0 flex-1">
                        <button
                          type="button"
                          className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 mt-0.5 sm:mt-0 transition-colors ${
                            gt.done
                              ? "bg-emerald-500 border-emerald-500 text-slate-950"
                              : "border-slate-300 dark:border-slate-600 hover:border-emerald-400"
                          }`}
                        >
                          {gt.done && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </button>

                        <span
                          className={`text-xs font-bold leading-snug break-words whitespace-normal ${
                            gt.done
                              ? "line-through text-slate-400 dark:text-slate-500"
                              : "text-slate-900 dark:text-white"
                          }`}
                        >
                          {gt.title}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 self-end sm:self-auto shrink-0 text-[10px] font-bold pl-7 sm:pl-0">
                        {gt.kind === "schedule" ? (
                          <span className="px-2 py-0.5 rounded bg-cyan-500/15 text-cyan-700 dark:text-cyan-300 border border-cyan-500/30 flex items-center gap-1">
                            <Clock className="w-3 h-3 text-cyan-500" />
                            {gt.timeSlot}
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                            Due: {gt.dueDate}
                          </span>
                        )}

                        <span
                          className={`px-2 py-0.5 rounded font-black uppercase text-white ${
                            gt.priority === "critical"
                              ? "bg-rose-500"
                              : gt.priority === "urgent"
                              ? "bg-amber-500"
                              : "bg-emerald-500"
                          }`}
                        >
                          {gt.priority}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* PILLAR 3 WORKFLOW INTEGRATION: "GOALS THAT ACTUALLY CONNECT"              */}
        {/* ========================================================================= */}
        <div className="rounded-3xl border border-sky-400/30 bg-gradient-to-br from-sky-500/10 via-indigo-500/5 to-purple-500/10 p-6 sm:p-10 backdrop-blur-2xl space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="px-3.5 py-1 rounded-full bg-sky-500/20 text-sky-700 dark:text-sky-300 text-xs font-bold uppercase tracking-widest">
              Integration Architecture
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
              Goals that actually connect
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
              Connect the things you do with the things you want to achieve. Your goal doesn&apos;t live in isolation.
            </p>
          </div>

          {/* Workflow Scenario (from GoalWorkflowShowcase) */}
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="text-center">
              <p className="text-base sm:text-lg text-slate-700 dark:text-slate-200 font-medium">
                Let&apos;s suppose you want to buy a laptop. You will first need to set a goal with <span className="font-bold text-sky-500 dark:text-sky-400">&apos;saving&apos;</span> type.
              </p>
            </div>

            {/* Distinguished Goal Card */}
            <div className="max-w-2xl mx-auto bg-gradient-to-r from-sky-600 via-indigo-600 to-cyan-600 rounded-2xl p-6 text-white shadow-xl flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white shrink-0">
                  <Target className="w-7 h-7" />
                </div>
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider bg-white/20 px-2.5 py-0.5 rounded-full text-white/90">
                    Saving Goal
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black mt-1 tracking-tight">
                    Goal: Saving 50,000 for Laptop
                  </h3>
                </div>
              </div>
            </div>

            {/* 3 Connected Feature Cards Grid (Finance, Todo, Schedules) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Finance Card */}
              <div className="bg-white/90 dark:bg-[#0a1a2e]/90 border border-emerald-500/30 rounded-2xl p-5 shadow-sm space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                  <DollarSign className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white">
                  Finance
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                  A saving source will automatically be created in the finance section to track your laptop fund.
                </p>
              </div>

              {/* Todo Card */}
              <div className="bg-white/90 dark:bg-[#0a1a2e]/90 border border-indigo-500/30 rounded-2xl p-5 shadow-sm space-y-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center">
                  <CheckSquare className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white">
                  Todo
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                  Research on different brands with specifications and compare pricing options.
                </p>
              </div>

              {/* Schedules Card */}
              <div className="bg-white/90 dark:bg-[#0a1a2e]/90 border border-cyan-500/30 rounded-2xl p-5 shadow-sm space-y-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-500 flex items-center justify-center">
                  <Calendar className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white">
                  Schedules
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300 font-normal">
                  <li className="flex items-start gap-2">
                    <span className="w-4 h-4 rounded-full bg-cyan-500/15 text-cyan-500 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">i</span>
                    <span>Weekly Saving Update</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-4 h-4 rounded-full bg-cyan-500/15 text-cyan-500 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">ii</span>
                    <span>Call Ali to accompany while visiting Laptop Market</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Summary takeaway box */}
            <div className="bg-gradient-to-r from-sky-50 to-indigo-50 dark:from-slate-900/80 dark:to-slate-900/80 border border-sky-200/60 dark:border-slate-800 rounded-2xl p-5 text-center shadow-xs">
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 font-medium leading-relaxed max-w-3xl mx-auto">
                <strong>Zero Context Switching:</strong> You will have no need to create all above things by going into their respective sections. All will be able to create within a single goal. The Schedules and Todos will however, also be available on homepage at Schedules and Todos sections.
              </p>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* PILLAR 4: FINANCE — "KNOW WHERE YOUR MONEY ACTUALLY IS"                  */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5 space-y-5">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-500/15 border border-teal-500/30 text-teal-700 dark:text-teal-300 text-xs font-black tracking-widest uppercase shadow-sm">
              <Wallet className="w-4 h-4 text-teal-500" />
              Pillar 4 · Finance
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
              Know where your money{" "}
              <span className="bg-gradient-to-r from-teal-400 to-emerald-500 bg-clip-text text-transparent">
                actually is.
              </span>
            </h2>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              One picture of your money. Track your sources, allocations, expenses, income, loans and liabilities without keeping everything in your head.
            </p>

            {/* Finance Checklist */}
            <div className="pt-3 border-t border-slate-200/80 dark:border-slate-800 space-y-2.5">
              <span className="text-xs font-black uppercase tracking-wider text-teal-600 dark:text-teal-400">
                Key Finance Capabilities
              </span>
              <ul className="space-y-2">
                {[
                  "Maintain an overall Sum of Money",
                  "Classify money with respect to Ownership and holdership",
                  "Keep record of all loans and liabilities",
                  "Keep record of incomes, expenses and all transactions",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Money Breakdown Mockup */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-slate-200/80 dark:border-white/10 bg-white/90 dark:bg-[#0a1a2e]/90 p-6 sm:p-8 shadow-2xl backdrop-blur-xl space-y-6">
              <div className="flex items-center justify-between border-b border-slate-200/70 dark:border-white/10 pb-4">
                <div>
                  <span className="text-xs uppercase font-bold text-slate-400">Total Money Available</span>
                  <h3 className="text-3xl font-black text-slate-900 dark:text-white">Rs. 185,400</h3>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-teal-500/15 text-teal-700 dark:text-teal-300 border border-teal-500/20">
                  6 Active Sources
                </span>
              </div>

              {/* Source Breakdown Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-semibold">
                <div className="p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-900/60 border border-slate-200/60 dark:border-white/5 flex items-center justify-between">
                  <span className="text-cyan-700 dark:text-cyan-300 font-bold flex items-center gap-1.5">
                    🏦 HBL Bank
                  </span>
                  <span className="text-slate-900 dark:text-white font-mono font-black">Rs. 50,000</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-900/60 border border-slate-200/60 dark:border-white/5 flex items-center justify-between">
                  <span className="text-emerald-700 dark:text-emerald-300 font-bold flex items-center gap-1.5">
                    📱 Easypaisa
                  </span>
                  <span className="text-slate-900 dark:text-white font-mono font-black">Rs. 15,000</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-900/60 border border-slate-200/60 dark:border-white/5 flex items-center justify-between">
                  <span className="text-teal-700 dark:text-teal-300 font-bold flex items-center gap-1.5">
                    💵 In Hand (Cash)
                  </span>
                  <span className="text-slate-900 dark:text-white font-mono font-black">Rs. 10,400</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-900/60 border border-slate-200/60 dark:border-white/5 flex items-center justify-between">
                  <span className="text-rose-700 dark:text-rose-300 font-bold flex items-center gap-1.5">
                    🛡️ Emergency Reserve
                  </span>
                  <span className="text-slate-900 dark:text-white font-mono font-black">Rs. 50,000</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-900/60 border border-slate-200/60 dark:border-white/5 flex items-center justify-between">
                  <span className="text-amber-700 dark:text-amber-300 font-bold flex items-center gap-1.5">
                    🤝 Loan to Ali
                  </span>
                  <span className="text-slate-900 dark:text-white font-mono font-black">Rs. 10,000</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-900/60 border border-slate-200/60 dark:border-white/5 flex items-center justify-between">
                  <span className="text-indigo-700 dark:text-indigo-300 font-bold flex items-center gap-1.5">
                    📈 Invested in
                  </span>
                  <span className="text-slate-900 dark:text-white font-mono font-black">Rs. 50,000</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Bottom CTA Block */}
        <div className="mt-16 text-center p-8 sm:p-10 rounded-[2.5rem] border border-slate-200/80 dark:border-white/10 bg-white/70 dark:bg-slate-900/50 backdrop-blur-xl shadow-xl">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Experience the full power of synchronized productivity
          </h3>
          <p className="mt-3 text-slate-600 dark:text-slate-300 max-w-xl mx-auto text-sm sm:text-base">
            Try our interactive demo directly in your browser or contact us to set up your personal workspace.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://myorbitdemo.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3.5 rounded-2xl bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-bold text-sm sm:text-base shadow-lg shadow-teal-500/25 hover:opacity-95 transition"
            >
              See Live Demo
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-6 py-3.5 rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white font-semibold text-sm sm:text-base hover:bg-slate-100 dark:hover:bg-slate-700 transition"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
