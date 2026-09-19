"use client";

import React, { useState } from "react";
import {
  AlertTriangle,
  RefreshCw,
  CheckCircle2,
  Calendar,
  Clock,
  Check,
  ChevronDown,
  ChevronUp,
  User,
  Play,
  Pause,
  Bell,
  Zap,
  ShieldAlert,
  ArrowRight,
} from "lucide-react";

interface OverdueTaskStep {
  text: string;
  completed: boolean;
}

interface OverdueTask {
  id: string;
  title: string;
  priority: "critical" | "urgent" | "routine";
  overdueText: string;
  assignee?: string;
  workStarted: boolean;
  completed: boolean;
  rescheduled: boolean;
  stepsExpanded: boolean;
  steps: OverdueTaskStep[];
}

export default function OverdueTasksFeature() {
  const [filter, setFilter] = useState<"all" | "critical" | "urgent">("all");

  const [overdueTasks, setOverdueTasks] = useState<OverdueTask[]>([
    {
      id: "ot-1",
      title: "Review Quarterly Tax Report & Filing",
      priority: "critical",
      overdueText: "Overdue by 2 days",
      assignee: "Abdullah",
      workStarted: true,
      completed: false,
      rescheduled: false,
      stepsExpanded: true,
      steps: [
        { text: "Collect expense receipts & invoices", completed: true },
        { text: "Calculate total deductions & net income", completed: false },
      ],
    },
    {
      id: "ot-2",
      title: "Submit Final Marketing Strategy Draft",
      priority: "critical",
      overdueText: "Overdue by 1 day",
      assignee: "Sarah",
      workStarted: false,
      completed: false,
      rescheduled: false,
      stepsExpanded: false,
      steps: [],
    },
    {
      id: "ot-3",
      title: "Server Maintenance & Database Audit",
      priority: "urgent",
      overdueText: "Due Yesterday",
      workStarted: false,
      completed: false,
      rescheduled: false,
      stepsExpanded: false,
      steps: [],
    },
  ]);

  const toggleTaskCompleted = (id: string) => {
    setOverdueTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const toggleRescheduled = (id: string) => {
    setOverdueTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, rescheduled: !t.rescheduled } : t))
    );
  };

  const toggleWorkStarted = (id: string) => {
    setOverdueTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, workStarted: !t.workStarted } : t))
    );
  };

  const toggleStepsExpanded = (id: string) => {
    setOverdueTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, stepsExpanded: !t.stepsExpanded } : t))
    );
  };

  const toggleStepCompleted = (taskId: string, stepIdx: number) => {
    setOverdueTasks((prev) =>
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

  const filteredTasks = overdueTasks.filter((t) => {
    if (filter === "critical") return t.priority === "critical";
    if (filter === "urgent") return t.priority === "urgent";
    return true;
  });

  return (
    <section className="relative isolate overflow-hidden bg-slate-900 dark:bg-[#090306] text-white py-24 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      {/* Background Warning Glows */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/4 top-1/3 h-[35rem] w-[35rem] rounded-full bg-rose-600/10 blur-3xl" />
        <div className="absolute right-1/4 bottom-1/4 h-[30rem] w-[30rem] rounded-full bg-amber-500/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs font-bold tracking-widest uppercase shadow-sm">
            <AlertTriangle className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
            Overdue Safeguard · Never Forget A Task
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
            Nothing gets quietly{" "}
            <span className="bg-gradient-to-r from-rose-400 via-amber-300 to-rose-500 bg-clip-text text-transparent">
              forgotten.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            When life happens and deadlines slip, MyOrbit automatically elevates overdue tasks directly into your daily focus overview until completed or rescheduled with a single tap.
          </p>
        </div>

        {/* Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Overdue Tasks Interactive Card (Left / Main) */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-rose-500/30 bg-slate-950/90 p-5 sm:p-7 shadow-2xl backdrop-blur-xl space-y-5 relative">
              
              {/* Top Banner Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-rose-500/20 pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-2xl bg-rose-500/20 text-rose-400 border border-rose-500/30 animate-pulse">
                    <ShieldAlert className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      Overdue Tasks Overview
                    </h3>
                    <p className="text-xs text-rose-300 font-medium">
                      3 Items Require Immediate Action
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="px-3 py-1 rounded-full text-xs font-black bg-rose-500/20 text-rose-300 border border-rose-500/30">
                    Safeguard Active
                  </span>
                </div>
              </div>

              {/* Filter Tabs */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-bold">
                <button
                  onClick={() => setFilter("all")}
                  className={`px-3 py-1.5 rounded-xl border transition-all ${
                    filter === "all"
                      ? "bg-rose-500 text-white border-rose-500 shadow-md"
                      : "bg-slate-900 text-slate-400 border-slate-800 hover:border-rose-500/40"
                  }`}
                >
                  All Overdue ({overdueTasks.length})
                </button>
                <button
                  onClick={() => setFilter("critical")}
                  className={`px-3 py-1.5 rounded-xl border transition-all ${
                    filter === "critical"
                      ? "bg-rose-500 text-white border-rose-500 shadow-md"
                      : "bg-slate-900 text-slate-400 border-slate-800 hover:border-rose-500/40"
                  }`}
                >
                  Critical ({overdueTasks.filter((t) => t.priority === "critical").length})
                </button>
                <button
                  onClick={() => setFilter("urgent")}
                  className={`px-3 py-1.5 rounded-xl border transition-all ${
                    filter === "urgent"
                      ? "bg-rose-500 text-white border-rose-500 shadow-md"
                      : "bg-slate-900 text-slate-400 border-slate-800 hover:border-rose-500/40"
                  }`}
                >
                  Urgent ({overdueTasks.filter((t) => t.priority === "urgent").length})
                </button>
              </div>

              {/* Interactive Overdue Task Items List */}
              <div className="space-y-3.5">
                {filteredTasks.map((task) => {
                  return (
                    <div
                      key={task.id}
                      className={`rounded-2xl border transition-all ${
                        task.completed
                          ? "bg-slate-900/40 border-slate-800 opacity-60"
                          : task.rescheduled
                          ? "bg-emerald-950/20 border-emerald-500/40"
                          : "bg-rose-950/20 border-rose-500/30 hover:border-rose-500/60 shadow-lg"
                      } p-3.5 sm:p-4 space-y-3`}
                    >
                      {/* Main Task Header Row */}
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3 min-w-0 flex-1">
                          {/* Checkbox button */}
                          <button
                            type="button"
                            onClick={() => toggleTaskCompleted(task.id)}
                            className={`w-7 h-7 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                              task.completed
                                ? "bg-emerald-500 border-emerald-500 text-slate-950 shadow-sm"
                                : "border-rose-500/50 bg-slate-900 hover:border-emerald-400"
                            }`}
                          >
                            {task.completed && <Check className="w-4 h-4 stroke-[3]" />}
                          </button>

                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              {task.workStarted && !task.completed && (
                                <span className="relative flex h-2 w-2">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                                  <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
                                </span>
                              )}
                              <span
                                className={`text-xs sm:text-sm font-bold tracking-tight truncate ${
                                  task.completed
                                    ? "line-through text-slate-500"
                                    : "text-white"
                                }`}
                              >
                                {task.title}
                              </span>
                            </div>

                            {/* Tags Row */}
                            <div className="flex items-center gap-2 mt-1.5 flex-wrap text-[10px]">
                              {/* Overdue Warning Tag */}
                              <span
                                className={`px-2.5 py-0.5 rounded font-black uppercase flex items-center gap-1 ${
                                  task.rescheduled
                                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                                    : "bg-rose-500/20 text-rose-300 border border-rose-500/40 animate-pulse"
                                }`}
                              >
                                <AlertTriangle className="w-3 h-3 text-rose-400" />
                                {task.rescheduled ? "Rescheduled for Today" : task.overdueText}
                              </span>

                              <span
                                className={`px-2 py-0.5 rounded font-black uppercase text-white ${
                                  task.priority === "critical"
                                    ? "bg-rose-600"
                                    : "bg-amber-600"
                                }`}
                              >
                                {task.priority}
                              </span>

                              {task.assignee && (
                                <span className="px-2 py-0.5 rounded font-bold bg-sky-500/15 text-sky-300 border border-sky-500/30 flex items-center gap-1">
                                  <User className="w-3 h-3" />
                                  {task.assignee}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Primary Reschedule Button & Quick Icons */}
                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={() => toggleRescheduled(task.id)}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition shadow-md ${
                              task.rescheduled
                                ? "bg-emerald-500 text-slate-950 hover:bg-emerald-400"
                                : "bg-rose-500 text-white hover:bg-rose-600"
                            }`}
                          >
                            <RefreshCw className={`w-3.5 h-3.5 ${task.rescheduled ? "" : "animate-spin-once"}`} />
                            <span>{task.rescheduled ? "Rescheduled ✓" : "Reschedule Today"}</span>
                          </button>

                          {task.steps && task.steps.length > 0 && (
                            <button
                              onClick={() => toggleStepsExpanded(task.id)}
                              className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition flex items-center gap-1 text-[11px] font-bold"
                              title="Toggle Sub-steps"
                            >
                              <span className="text-[10px] bg-slate-800 text-slate-300 px-1.5 py-0.2 rounded font-extrabold">
                                {task.steps.filter((s) => s.completed).length}/{task.steps.length}
                              </span>
                              {task.stepsExpanded ? (
                                <ChevronUp className="w-3.5 h-3.5" />
                              ) : (
                                <ChevronDown className="w-3.5 h-3.5" />
                              )}
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Sub-steps collapsible */}
                      {task.steps && task.steps.length > 0 && task.stepsExpanded && (
                        <div className="pl-9 pr-2 pt-2 border-t border-rose-500/15 space-y-1.5">
                          {task.steps.map((st, sIdx) => (
                            <div key={sIdx} className="flex items-center gap-2 text-xs">
                              <button
                                onClick={() => toggleStepCompleted(task.id, sIdx)}
                                className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 transition ${
                                  st.completed
                                    ? "bg-emerald-500 border-emerald-500 text-slate-950"
                                    : "border-slate-600 hover:border-emerald-400"
                                }`}
                              >
                                {st.completed && <Check className="w-3 h-3 stroke-[3]" />}
                              </button>
                              <span
                                className={`font-medium ${
                                  st.completed ? "line-through text-slate-500" : "text-slate-300"
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

          {/* Right Column: 3 Core Safeguard Highlights */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-3xl border border-rose-500/25 bg-slate-950/80 backdrop-blur-xl space-y-3">
              <div className="p-2.5 w-fit rounded-2xl bg-rose-500/20 text-rose-400 border border-rose-500/30">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">
                Zero Forgotten Commitments
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Most task managers archive overdue items into hidden lists where they go unnoticed. MyOrbit elevates overdue items to your daily focus overview until resolved.
              </p>
            </div>

            <div className="p-6 rounded-3xl border border-amber-500/25 bg-slate-950/80 backdrop-blur-xl space-y-3">
              <div className="p-2.5 w-fit rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
                <RefreshCw className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">
                1-Tap Batch Rescheduling
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Easily push overdue tasks into today&apos;s schedule, tomorrow, or next week without tedious form edits or date picking dialogs.
              </p>
            </div>

            <div className="p-6 rounded-3xl border border-sky-500/25 bg-slate-950/80 backdrop-blur-xl space-y-3">
              <div className="p-2.5 w-fit rounded-2xl bg-sky-500/20 text-sky-400 border border-sky-500/30">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">
                Connected Goal Safeguard
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                If an overdue task is linked to an active goal (e.g. quarterly savings or fitness milestone), MyOrbit alerts you before your target is impacted.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
