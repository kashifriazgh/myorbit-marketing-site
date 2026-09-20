"use client";

/**
 * Hero / LifeConnectedSection
 * ---------------------------------------------------------------
 * A self-playing, video-like story for the MyOrbit landing page.
 * One event ripples through all four sections:
 *   client call (Schedules) -> follow-up task (Todos) -> payment (Finance)
 *   -> goal progress (Goals) -> check-in reminder.
 *
 * Supports both light mode and dark mode seamlessly.
 */

import React, { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  MotionConfig,
  animate,
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
  MotionValue,
} from "framer-motion";

/* ------------------------------------------------------------------ */
/*  Story config: edit copy, numbers and timing here                   */
/* ------------------------------------------------------------------ */

// r,g,b triples so we can build rgba() strings for glows
const ACCENT = {
  schedules: "34,211,238", // cyan-400
  todos: "52,211,153", // emerald-400
  finance: "45,212,191", // teal-400
  goals: "56,189,248", // sky-400
};

const GOAL_TARGET = 120000;
const SAVED_BEFORE = 84000;
const INCOME = 20000;
const SAVED_AFTER = SAVED_BEFORE + INCOME; // 104,000 -> 87%
const BALANCE_BEFORE = 148500;
const BALANCE_AFTER = BALANCE_BEFORE + INCOME;

const LEAD = 0.7; // seconds a card waits for the pulse to arrive

// The timeline. `seg` links a step to a progress segment (-1 = none).
const STEPS = [
  { id: "reset", ms: 1200, seg: -1 },
  { id: "schedule", ms: 3200, seg: 0 },
  { id: "todo-add", ms: 1700, seg: 1 },
  { id: "todo-done", ms: 2300, seg: 1 },
  { id: "finance", ms: 3600, seg: 2 },
  { id: "goal", ms: 3900, seg: 3 },
  { id: "reminder", ms: 4300, seg: 4 },
];

// Which card is lit on desktop (null = none) and shown on mobile, per step
const FOCUS = [null, 0, 1, 1, 2, 3, null]; // 0 sched, 1 todos, 2 finance, 3 goals
const MOBILE_VISIBLE = [0, 0, 1, 1, 2, 3, 3];

const SEGMENT_COPY = [
  {
    key: "schedules",
    label: "Schedules",
    caption: "Plan your day",
    detail: "A client call lands on today's schedule, reminder included.",
  },
  {
    key: "todos",
    label: "Todos",
    caption: "Complete your tasks",
    detail: "A follow-up task appears and gets checked off.",
  },
  {
    key: "finance",
    label: "Finance",
    caption: "Keep track of your money",
    detail: "The payment is logged and your balance updates.",
  },
  {
    key: "goals",
    label: "Goals",
    caption: "Achieve your goals",
    detail: "That income moves your laptop goal to 87%.",
  },
  {
    key: "reminders",
    label: "Reminders",
    caption: "Stay reminded",
    detail: "A check-in nudges you before the goal slips.",
  },
];

/* ------------------------------------------------------------------ */
/*  Timeline maths                                                     */
/* ------------------------------------------------------------------ */

const STARTS = STEPS.map((_, i) =>
  STEPS.slice(0, i).reduce((n, s) => n + s.ms, 0)
);
const TOTAL = STEPS.reduce((n, s) => n + s.ms, 0);

const SEGMENTS = SEGMENT_COPY.map((copy, i) => {
  const idx = STEPS.map((s, k) => (s.seg === i ? k : -1)).filter((k) => k >= 0);
  const last = idx[idx.length - 1];
  return {
    ...copy,
    firstStep: idx[0],
    start: STARTS[idx[0]],
    end: STARTS[last] + STEPS[last].ms,
  };
});

function stepAt(t: number) {
  for (let i = STEPS.length - 1; i >= 0; i--) if (t >= STARTS[i]) return i;
  return 0;
}

/* ------------------------------------------------------------------ */
/*  Tiny inline icons (no icon library needed)                         */
/* ------------------------------------------------------------------ */

interface IconProps {
  className?: string;
}

function Svg({ children, className = "h-4 w-4" }: { children: React.ReactNode; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}
const CalendarIcon = (p: IconProps) => (
  <Svg {...p}>
    <rect x="3.5" y="5" width="17" height="15.5" rx="3" />
    <path d="M8 3v4M16 3v4M3.5 10h17" />
  </Svg>
);
const ListCheckIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4 7l1.8 1.8L9 5.5M4 16.5l1.8 1.8L9 15M13 7h7M13 16.5h7" />
  </Svg>
);
const WalletIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4 7.5A2.5 2.5 0 0 1 6.5 5H18v3" />
    <rect x="3.5" y="7.5" width="17" height="12" rx="3" />
    <circle cx="16.5" cy="13.5" r="1" fill="currentColor" />
  </Svg>
);
const TargetIcon = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <circle cx="12" cy="12" r="4.5" />
    <circle cx="12" cy="12" r=".8" fill="currentColor" />
  </Svg>
);
const BellIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M6 16.5V11a6 6 0 0 1 12 0v5.5l1.5 1.5h-15L6 16.5z" />
    <path d="M10 20.5a2 2 0 0 0 4 0" />
  </Svg>
);
const PlayIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M8 5.5v13l10.5-6.5L8 5.5z" fill="currentColor" />
  </Svg>
);
const PauseIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M8.5 5.5v13M15.5 5.5v13" strokeWidth="2.6" />
  </Svg>
);

/* ------------------------------------------------------------------ */
/*  Small building blocks                                              */
/* ------------------------------------------------------------------ */

interface CounterProps {
  value: number;
  format?: (n: number) => string;
  duration?: number;
  delay?: number;
}

// Number that counts smoothly to its new value
function Counter({
  value,
  format = (n: number) => Math.round(n).toLocaleString("en-US"),
  duration = 1.1,
  delay = 0,
}: CounterProps) {
  const reduce = useReducedMotion();
  const mv = useMotionValue(value);
  const text = useTransform(mv, format);

  useEffect(() => {
    const controls = animate(mv, value, {
      duration: reduce ? 0 : duration,
      delay: reduce ? 0 : delay,
      ease: "easeOut",
    });
    return () => controls.stop();
  }, [value, mv, duration, delay, reduce]);

  return <motion.span>{text}</motion.span>;
}

interface CheckboxProps {
  checked: boolean;
  accent: string;
  delay?: number;
}

// Animated tick box
function Checkbox({ checked, accent, delay = 0.1 }: CheckboxProps) {
  return (
    <motion.span
      initial={false}
      animate={{
        backgroundColor: checked ? `rgb(${accent})` : "rgba(0,0,0,0)",
      }}
      transition={{ duration: 0.25, delay: checked ? delay : 0 }}
      className={`grid h-5 w-5 shrink-0 place-items-center rounded-md border transition-colors ${
        checked ? "border-transparent" : "border-slate-300 dark:border-white/25"
      }`}
    >
      <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" aria-hidden="true">
        <motion.path
          d="M3.5 8.5l3 3 6-7"
          stroke="#04121f"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={false}
          animate={{ pathLength: checked ? 1 : 0, opacity: checked ? 1 : 0 }}
          transition={{ duration: 0.3, delay: checked ? delay + 0.1 : 0 }}
        />
      </svg>
    </motion.span>
  );
}

interface RowProps {
  hot?: boolean;
  accent: string;
  delay?: number;
  children: React.ReactNode;
}

// A list row that slides in, glows while "hot", then settles
function Row({ hot = false, accent, delay = 0, children }: RowProps) {
  return (
    <motion.li
      layout="position"
      initial={{
        opacity: 0,
        x: -14,
      }}
      animate={{
        opacity: 1,
        x: 0,
      }}
      exit={{ opacity: 0, x: 14, transition: { duration: 0.25 } }}
      transition={{
        opacity: { duration: 0.4, delay },
        x: { duration: 0.45, delay, ease: "easeOut" },
        layout: { duration: 0.4 },
      }}
      style={{
        backgroundColor: hot ? `rgba(${accent},0.16)` : undefined,
        borderColor: hot ? `rgba(${accent},0.35)` : undefined,
      }}
      className={`flex items-center gap-3 rounded-xl border px-3 py-2.5 transition-colors duration-300 ${
        !hot
          ? "bg-slate-100/70 dark:bg-white/[0.04] border-slate-200/70 dark:border-white/5"
          : ""
      }`}
    >
      {children}
    </motion.li>
  );
}

interface CardProps {
  accent: string;
  title: string;
  meta: string;
  Icon: React.ComponentType<IconProps>;
  focused: boolean;
  dimmed: boolean;
  showOnMobile: boolean;
  children: React.ReactNode;
}

// The glass card every section lives in
function Card({ accent, title, meta, Icon, focused, dimmed, showOnMobile, children }: CardProps) {
  return (
    <motion.article
      initial={false}
      animate={{
        opacity: dimmed ? 0.35 : 1,
        scale: focused ? 1.015 : 1,
        borderColor: focused ? `rgba(${accent},0.55)` : undefined,
        boxShadow: focused
          ? `0 0 0 1px rgba(${accent},0.25), 0 24px 60px -24px rgba(${accent},0.45)`
          : undefined,
      }}
      transition={{ duration: 0.5, delay: focused ? LEAD * 0.7 : 0, ease: "easeOut" }}
      className={`${
        showOnMobile ? "flex" : "hidden md:flex"
      } relative z-[1] min-h-[15.5rem] flex-col rounded-2xl border bg-white/90 dark:bg-[#0a1a2e]/80 border-slate-200/80 dark:border-white/10 p-4 shadow-lg shadow-slate-200/40 dark:shadow-none backdrop-blur-xl sm:p-5 transition-colors duration-300`}
    >
      <header className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span
            className="grid h-8 w-8 place-items-center rounded-lg"
            style={{ backgroundColor: `rgba(${accent},0.14)`, color: `rgb(${accent})` }}
          >
            <Icon className="h-4 w-4" />
          </span>
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white">{title}</h3>
        </div>
        <span className="text-xs text-slate-500 dark:text-slate-400">{meta}</span>
      </header>
      <div className="mt-4 flex-1">{children}</div>
    </motion.article>
  );
}

/* ------------------------------------------------------------------ */
/*  Section bodies                                                     */
/* ------------------------------------------------------------------ */

interface StepProps {
  step: number;
}

function SchedulesBody({ step }: StepProps) {
  const accent = ACCENT.schedules;
  return (
    <ul className="flex flex-col gap-2">
      <AnimatePresence initial={false}>
        <Row key="walk" accent={accent}>
          <span className="w-[4.25rem] shrink-0 text-xs tabular-nums text-slate-400 dark:text-slate-500">
            6:30 AM
          </span>
          <span className="flex-1 text-sm text-slate-500 dark:text-slate-400">Morning walk</span>
        </Row>

        {step >= 1 && (
          <Row key="call" accent={accent} hot={step === 1} delay={0.2}>
            <span className="w-[4.25rem] shrink-0 text-xs tabular-nums text-cyan-700 dark:text-cyan-200 font-medium">
              4:00 PM
            </span>
            <span className="flex-1 text-sm font-medium text-slate-900 dark:text-white">Client call</span>
            <span className="inline-flex items-center gap-1 rounded-full bg-cyan-500/15 dark:bg-cyan-400/15 px-2 py-0.5 text-[11px] font-medium text-cyan-800 dark:text-cyan-200">
              <BellIcon className="h-3 w-3" />
              30 min
            </span>
          </Row>
        )}

        <Row key="read" accent={accent}>
          <span className="w-[4.25rem] shrink-0 text-xs tabular-nums text-slate-500 dark:text-slate-400">
            9:00 PM
          </span>
          <span className="flex-1 text-sm text-slate-700 dark:text-slate-200">Read 20 pages</span>
        </Row>
      </AnimatePresence>
    </ul>
  );
}

interface TodoTitleProps {
  children: React.ReactNode;
  done: boolean;
}

function TodoTitle({ children, done }: TodoTitleProps) {
  return (
    <span className="relative min-w-0 flex-1">
      <motion.span
        initial={false}
        className={`block truncate text-sm transition-colors ${
          done ? "text-slate-400 dark:text-slate-500" : "text-slate-900 dark:text-slate-100 font-medium"
        }`}
      >
        {children}
      </motion.span>
      <motion.span
        aria-hidden="true"
        initial={false}
        animate={{ scaleX: done ? 1 : 0 }}
        transition={{ duration: 0.35, delay: done ? 0.3 : 0, ease: "easeOut" }}
        className="absolute inset-x-0 top-1/2 h-px origin-left bg-slate-400 dark:bg-slate-400"
      />
    </span>
  );
}

function TodosBody({ step }: StepProps) {
  const accent = ACCENT.todos;
  const added = step >= 2;
  const done = step >= 3;
  return (
    <ul className="flex flex-col gap-2">
      <AnimatePresence initial={false}>
        {added && (
          <Row key="invoice" accent={accent} hot={step === 2 || step === 3} delay={LEAD}>
            <Checkbox checked={done} accent={accent} delay={0.35} />
            <TodoTitle done={done}>Send invoice to client</TodoTitle>
          </Row>
        )}
        <Row key="budget" accent={accent}>
          <Checkbox checked={false} accent={accent} />
          <TodoTitle done={false}>Review weekly budget</TodoTitle>
        </Row>
        <Row key="notes" accent={accent}>
          <Checkbox checked accent={accent} />
          <TodoTitle done>Prepare call notes</TodoTitle>
        </Row>
      </AnimatePresence>
    </ul>
  );
}

function FinanceBody({ step }: StepProps) {
  const accent = ACCENT.finance;
  const paid = step >= 4;
  return (
    <div>
      <p className="text-xs text-slate-500 dark:text-slate-400">Total balance</p>
      <p className="mt-1 text-3xl font-semibold tabular-nums text-slate-900 dark:text-white">
        Rs{" "}
        <Counter
          value={paid ? BALANCE_AFTER : BALANCE_BEFORE}
          delay={step === 4 ? LEAD : 0}
        />
      </p>

      <ul className="mt-4 flex flex-col gap-2">
        <AnimatePresence initial={false}>
          {paid && (
            <Row key="invoice" accent={accent} hot={step === 4} delay={LEAD}>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-medium text-slate-900 dark:text-white">Client invoice</span>
                <span className="mt-0.5 flex items-center gap-1.5 text-[11px] font-medium text-teal-700 dark:text-teal-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-teal-600 dark:bg-teal-300" />
                  Goal: New laptop
                </span>
              </span>
              <span className="text-sm font-semibold tabular-nums text-emerald-700 dark:text-emerald-300">
                +Rs {INCOME.toLocaleString("en-US")}
              </span>
            </Row>
          )}
          <Row key="bill" accent={accent}>
            <span className="flex-1 truncate text-sm text-slate-700 dark:text-slate-300">Electricity bill</span>
            <span className="text-sm tabular-nums text-slate-500 dark:text-slate-400">−Rs 4,200</span>
          </Row>
        </AnimatePresence>
      </ul>
    </div>
  );
}

const MILESTONES = [
  { at: 60000, label: "Rs 60,000" },
  { at: 100000, label: "Rs 100,000" },
  { at: 120000, label: "Rs 120,000: buy it" },
];

function GoalsBody({ step }: StepProps) {
  const accent = ACCENT.goals;
  const saved = step >= 5 ? SAVED_AFTER : SAVED_BEFORE;
  const pct = saved / GOAL_TARGET;
  const lead = step === 5 ? LEAD : 0;

  return (
    <div>
      <div className="flex items-center gap-4">
        <div className="relative h-[5.5rem] w-[5.5rem] shrink-0">
          <svg viewBox="0 0 88 88" className="h-full w-full -rotate-90" aria-hidden="true">
            <defs>
              <linearGradient id="life-connected-ring" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#34d399" />
              </linearGradient>
            </defs>
            <circle
              cx="44"
              cy="44"
              r="36"
              fill="none"
              className="stroke-slate-200 dark:stroke-white/[0.08]"
              strokeWidth="8"
            />
            <motion.circle
              cx="44"
              cy="44"
              r="36"
              fill="none"
              stroke="url(#life-connected-ring)"
              strokeWidth="8"
              strokeLinecap="round"
              initial={false}
              animate={{ pathLength: pct }}
              transition={{ duration: 1.4, delay: lead, ease: [0.22, 1, 0.36, 1] }}
            />
          </svg>
          <div className="absolute inset-0 grid place-items-center">
            <span className="text-lg font-semibold tabular-nums text-slate-900 dark:text-white">
              <Counter
                value={Math.round(pct * 100)}
                format={(n) => `${Math.round(n)}`}
                duration={1.4}
                delay={lead}
              />
              %
            </span>
          </div>
        </div>

        <div className="min-w-0">
          <p className="text-sm font-semibold text-slate-900 dark:text-white">New laptop</p>
          <p className="mt-0.5 text-xs tabular-nums text-slate-500 dark:text-slate-400">
            Rs <Counter value={saved} duration={1.4} delay={lead} /> of Rs{" "}
            {GOAL_TARGET.toLocaleString("en-US")}
          </p>
        </div>
      </div>

      <ul className="mt-4 flex flex-col gap-2">
        {MILESTONES.map((m) => {
          const reached = saved >= m.at;
          const justNow = m.at === 100000 && step === 5;
          return (
            <li key={m.at} className="flex items-center gap-2.5">
              <Checkbox checked={reached} accent={accent} delay={justNow ? 1.5 : 0.1} />
              <span className={`text-xs ${reached ? "text-slate-800 dark:text-slate-200 font-medium" : "text-slate-400 dark:text-slate-500"}`}>
                {m.label}
              </span>
              <AnimatePresence>
                {justNow && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: 1.8, duration: 0.35 }}
                    className="rounded-full bg-sky-500/15 dark:bg-sky-400/15 px-2 py-0.5 text-[11px] font-medium text-sky-800 dark:text-sky-200"
                  >
                    Milestone reached
                  </motion.span>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Connectors, hub and the reminder toast                             */
/* ------------------------------------------------------------------ */

interface ConnectorProps {
  style?: React.CSSProperties;
  vertical?: boolean;
  reverse?: boolean;
  fire?: number | null;
}

// A short link in the gap between two cards. `fire` = key when its pulse runs.
function Connector({ style, vertical = false, reverse = false, fire = null }: ConnectorProps) {
  const axis = vertical ? "top" : "left";
  const cross = vertical ? "left" : "top";
  const from = reverse ? "100%" : "0%";
  const to = reverse ? "0%" : "100%";
  const origin = vertical
    ? reverse
      ? "50% 100%"
      : "50% 0%"
    : reverse
    ? "100% 50%"
    : "0% 50%";

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute z-0 hidden bg-slate-300/60 dark:bg-white/10 md:block ${
        vertical ? "w-px" : "h-px"
      }`}
      style={{ ...style, [vertical ? "height" : "width"]: "4rem" }}
    >
      {fire !== null && (
        <>
          <motion.span
            key={`bar-${fire}`}
            className="absolute inset-0 bg-cyan-400 dark:bg-cyan-300 shadow-[0_0_8px_rgba(34,211,238,0.9)]"
            style={{ transformOrigin: origin }}
            initial={vertical ? { scaleY: 0, opacity: 1 } : { scaleX: 0, opacity: 1 }}
            animate={
              vertical
                ? { scaleY: 1, opacity: [1, 1, 0] }
                : { scaleX: 1, opacity: [1, 1, 0] }
            }
            transition={{ duration: 0.9, ease: "easeInOut" }}
          />
          <motion.span
            key={`dot-${fire}`}
            className="absolute -m-1 h-2 w-2 rounded-full bg-cyan-400 dark:bg-cyan-200 shadow-[0_0_14px_3px_rgba(34,211,238,0.85)]"
            style={{ [cross]: "50%" }}
            initial={{ [axis]: from, opacity: 0 }}
            animate={{ [axis]: to, opacity: [0, 1, 1, 0] }}
            transition={{ duration: 0.9, ease: "easeInOut" }}
          />
        </>
      )}
    </div>
  );
}

interface HubProps {
  clock: MotionValue<number>;
  step: number;
}

// The orbit mark that sits where the four gaps cross
function Hub({ clock, step }: HubProps) {
  const rotate = useTransform(clock, [0, TOTAL], [0, 720]);
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute left-1/2 top-1/2 z-10 hidden h-12 w-12 -translate-x-1/2 -translate-y-1/2 md:block"
    >
      <span className="absolute inset-0 rounded-full border border-cyan-500/40 dark:border-cyan-300/30 bg-white/95 dark:bg-[#06162a]/90 backdrop-blur shadow-md" />
      <motion.span className="absolute inset-0" style={{ rotate }}>
        <span className="absolute left-1/2 top-0 -ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full bg-cyan-500 dark:bg-cyan-300 shadow-[0_0_10px_2px_rgba(34,211,238,0.8)]" />
      </motion.span>
      <span className="absolute inset-[15px] rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 dark:from-teal-300 dark:to-cyan-400" />
      {step > 0 && (
        <motion.span
          key={step}
          className="absolute inset-0 rounded-full border border-cyan-400/60 dark:border-cyan-300/60"
          initial={{ scale: 1, opacity: 0.8 }}
          animate={{ scale: 2.4, opacity: 0 }}
          transition={{ duration: 1.1, ease: "easeOut" }}
        />
      )}
    </div>
  );
}

function ReminderToast() {
  return (
    <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center px-2">
      <motion.div
        initial={{ opacity: 0, y: 28, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -14, transition: { duration: 0.3 } }}
        transition={{ type: "spring", stiffness: 260, damping: 22, delay: LEAD }}
        className="w-[min(100%,24rem)] rounded-2xl border border-slate-200 dark:border-white/15 bg-white/95 dark:bg-[#0b1d33]/90 p-4 shadow-2xl shadow-slate-900/10 dark:shadow-black/60 backdrop-blur-2xl"
      >
        <div className="flex gap-3">
          <motion.span
            animate={{ rotate: [0, -14, 12, -8, 6, 0] }}
            transition={{ delay: LEAD + 0.5, duration: 0.7 }}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-teal-400 to-cyan-500 dark:from-teal-300 dark:to-cyan-400 text-white dark:text-[#04121f]"
          >
            <BellIcon className="h-5 w-5" />
          </motion.span>
          <div className="min-w-0">
            <div className="flex items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
              <span>MyOrbit</span>
              <span>now</span>
            </div>
            <p className="mt-0.5 text-sm font-semibold text-slate-900 dark:text-white">
              Laptop goal is 87% there
            </p>
            <p className="mt-0.5 text-sm text-slate-600 dark:text-slate-300">
              Rs {(GOAL_TARGET - SAVED_AFTER).toLocaleString("en-US")} to go. Log this
              week&apos;s savings?
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Player controls                                                    */
/* ------------------------------------------------------------------ */

interface SegmentButtonProps {
  seg: (typeof SEGMENTS)[number];
  clock: MotionValue<number>;
  active: boolean;
  onClick: () => void;
}

function SegmentButton({ seg, clock, active, onClick }: SegmentButtonProps) {
  const fill = useTransform(clock, (t) =>
    Math.min(1, Math.max(0, (t - seg.start) / (seg.end - seg.start)))
  );
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Show ${seg.label}`}
      className="group py-2 text-left focus-visible:outline-none"
    >
      <span className="block h-1 overflow-hidden rounded-full bg-slate-200 dark:bg-white/10 group-focus-visible:ring-2 group-focus-visible:ring-cyan-500/70 dark:group-focus-visible:ring-cyan-300/70">
        <motion.span
          style={{ scaleX: fill }}
          className="block h-full origin-left rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 dark:from-teal-300 dark:to-cyan-300"
        />
      </span>
      <span
        className={`mt-2 block truncate text-xs transition-colors ${
          active
            ? "font-semibold text-slate-900 dark:text-white"
            : "text-slate-500 dark:text-slate-500 group-hover:text-slate-800 dark:group-hover:text-slate-300"
        }`}
      >
        {seg.label}
      </span>
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  The main Hero section                                              */
/* ------------------------------------------------------------------ */

export default function Hero() {
  const reduce = useReducedMotion();
  const rootRef = useRef<HTMLElement>(null);
  const inView = useInView(rootRef, { amount: 0.35 });
  const clock = useMotionValue(0); // ms into the loop
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(true);

  // Reduced motion: don't autoplay, park on the "everything connected" frame
  useEffect(() => {
    if (reduce) {
      setPlaying(false);
      setStep(5);
      clock.set(SEGMENTS[3].end - 1);
    }
  }, [reduce, clock]);

  // One clock drives everything, so pause/scrub stay perfectly in sync
  useAnimationFrame((_, delta) => {
    if (!playing || !inView) return;
    let next = clock.get() + Math.min(delta, 50);
    if (next >= TOTAL) next -= TOTAL;
    clock.set(next);
    const s = stepAt(next);
    setStep((prev) => (prev === s ? prev : s));
  });

  const jumpTo = (i: number) => {
    const seg = SEGMENTS[i];
    clock.set(seg.start + 1);
    setStep(seg.firstStep);
    if (!reduce) setPlaying(true);
  };

  const activeSeg = STEPS[step].seg;
  const shownSeg = Math.max(activeSeg, 0);
  const focus = FOCUS[step];
  const mobileCard = MOBILE_VISIBLE[step];
  const dimAll = step === 6;

  const cardState = (i: number) => ({
    focused: focus === i,
    dimmed: dimAll,
    showOnMobile: mobileCard === i,
  });

  return (
    <MotionConfig reducedMotion="user">
      <section
        ref={rootRef}
        className="relative isolate overflow-hidden bg-slate-50 dark:bg-[#040d1a] px-4 pt-28 pb-20 sm:px-6 sm:pt-36 sm:pb-28 transition-colors duration-300"
      >
        {/* backdrop */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-[-12%] h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-cyan-400/20 dark:bg-cyan-500/10 blur-3xl" />
          <div className="absolute bottom-[-20%] right-[-10%] h-[28rem] w-[28rem] rounded-full bg-emerald-400/20 dark:bg-emerald-500/10 blur-3xl" />
        </div>

        {/* heading */}
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-6xl">
            Your life, connected
          </h2>
          <p className="mt-4 bg-gradient-to-r from-teal-600 via-emerald-600 to-cyan-600 dark:from-teal-300 dark:via-emerald-300 dark:to-cyan-300 bg-clip-text text-xl font-medium text-transparent sm:text-2xl">
            MyOrbit manages more. You manage less
          </p>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-600 dark:text-slate-300/80 sm:text-lg">
            Plan your day, complete your tasks, achieve your goals, keep track of your
            money, and stay reminded — all in one connected app.
          </p>
          
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://myorbit-smart-1.netlify.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-bold text-sm sm:text-base shadow-xl shadow-emerald-500/25 hover:opacity-95 hover:scale-[1.02] transition"
            >
              See Live Demo
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-6 py-3.5 rounded-2xl border border-slate-300 dark:border-white/15 bg-white dark:bg-white/5 text-slate-800 dark:text-white font-semibold text-sm sm:text-base hover:bg-slate-100 dark:hover:bg-white/10 transition"
            >
              Contact Us
            </a>
          </div>
        </div>

        {/* player */}
        <div className="mx-auto mt-12 max-w-4xl rounded-[2rem] border border-slate-200/80 dark:border-white/10 bg-white/60 dark:bg-white/[0.02] shadow-xl shadow-slate-200/50 dark:shadow-none p-4 backdrop-blur-xl sm:p-6 transition-colors duration-300">
          <p className="sr-only">
            Animated demo. A client call is added to Schedules, a follow-up todo is
            completed, the payment appears in Finance, the laptop goal moves to 87
            percent, and a reminder arrives.
          </p>

          {/* stage */}
          <div aria-hidden="true" className="relative">
            <div className="pointer-events-none absolute left-1/2 top-1/2 hidden h-[125%] w-[72%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-slate-200/70 dark:border-white/[0.04] md:block" />
            <div className="pointer-events-none absolute left-1/2 top-1/2 hidden h-[95%] w-[52%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-slate-200/70 dark:border-white/[0.05] md:block" />

            <div className="relative grid grid-cols-1 md:auto-rows-fr md:grid-cols-2 md:gap-16">
              <Card
                accent={ACCENT.schedules}
                title="Schedules"
                meta="Today"
                Icon={CalendarIcon}
                {...cardState(0)}
              >
                <SchedulesBody step={step} />
              </Card>

              <Card
                accent={ACCENT.todos}
                title="Todos"
                meta={`${1 + (step >= 2 && step < 3 ? 1 : 0)} open`}
                Icon={ListCheckIcon}
                {...cardState(1)}
              >
                <TodosBody step={step} />
              </Card>

              {/* Goals sits bottom-left and Finance bottom-right so the
                  story travels clockwise: Schedules, Todos, Finance, Goals */}
              <Card
                accent={ACCENT.goals}
                title="Goals"
                meta="1 in progress"
                Icon={TargetIcon}
                {...cardState(3)}
              >
                <GoalsBody step={step} />
              </Card>

              <Card
                accent={ACCENT.finance}
                title="Finance"
                meta="This week"
                Icon={WalletIcon}
                {...cardState(2)}
              >
                <FinanceBody step={step} />
              </Card>

              {/* pulses between cards (desktop) */}
              <Connector
                style={{ left: "calc(50% - 2rem)", top: "calc(25% - 1rem)" }}
                fire={step === 2 ? step : null}
              />
              <Connector
                vertical
                style={{ left: "calc(75% + 1rem)", top: "calc(50% - 2rem)" }}
                fire={step === 4 ? step : null}
              />
              <Connector
                reverse
                style={{ left: "calc(50% - 2rem)", top: "calc(75% + 1rem)" }}
                fire={step === 5 ? step : null}
              />
              <Connector
                vertical
                reverse
                style={{ left: "calc(25% - 1rem)", top: "calc(50% - 2rem)" }}
                fire={step === 6 ? step : null}
              />

              <Hub clock={clock} step={step} />
            </div>

            <AnimatePresence>{step === 6 && <ReminderToast key="toast" />}</AnimatePresence>
          </div>

          {/* progress + caption */}
          <div className="mt-6 grid grid-cols-5 gap-2 sm:gap-3">
            {SEGMENTS.map((seg, i) => (
              <SegmentButton
                key={seg.key}
                seg={seg}
                clock={clock}
                active={activeSeg === i}
                onClick={() => jumpTo(i)}
              />
            ))}
          </div>

          <div className="mt-2 flex items-start justify-between gap-4">
            <div className="min-h-[3.25rem]">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={shownSeg}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25 }}
                >
                  <p className="text-base font-semibold text-slate-900 dark:text-white">
                    {SEGMENTS[shownSeg].caption}
                  </p>
                  <p className="mt-0.5 text-sm text-slate-600 dark:text-slate-400">
                    {SEGMENTS[shownSeg].detail}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            <button
              type="button"
              onClick={() => setPlaying((p) => !p)}
              aria-label={playing ? "Pause demo" : "Play demo"}
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-slate-300 dark:border-white/15 bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-white transition-colors hover:bg-slate-200 dark:hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/70 dark:focus-visible:ring-cyan-300/70"
            >
              {playing ? <PauseIcon className="h-4 w-4" /> : <PlayIcon className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}

export { Hero as LifeConnectedSection };