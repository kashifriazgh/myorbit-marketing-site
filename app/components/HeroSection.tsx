'use client';

import React, { useEffect, useState, useRef } from 'react';

// ── Animated counter ─────────────────────────────────────────────────────────
function AnimatedNumber({
  target,
  suffix = '',
}: {
  target: number;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        let start = 0;
        const step = Math.ceil(target / 40);
        const timer = setInterval(() => {
          start += step;
          if (start >= target) {
            setCount(target);
            clearInterval(timer);
          } else setCount(start);
        }, 30);
      },
      { threshold: 0.4 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

// ── Feature chip ──────────────────────────────────────────────────────────────
const features = [
  { label: 'Tasks', icon: '✅' },
  { label: 'Goals', icon: '🎯' },
  { label: 'Journal', icon: '📔' },
  { label: 'Finance', icon: '💰' },
  { label: 'Shopping', icon: '🛒' },
  { label: 'Streaks', icon: '🔥' },
  { label: 'Schedules', icon: '📅' },
  { label: 'Time Table', icon: '🕐' },
  { label: 'AI', icon: '✨' },
];

// ── Stats ─────────────────────────────────────────────────────────────────────
const stats = [
  { value: 9, suffix: '', label: 'built-in tools' },
  { value: 50, suffix: '%', label: 'less typing with AI' },
  { value: 100, suffix: '%', label: 'your data, your DB' },
];

// ─────────────────────────────────────────────────────────────────────────────
const HeroSection = () => {
  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-[#040d1a]">
      {/* ── Layered background ── */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,#0e4a7a55,transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_40%_at_80%_70%,#06b6d420,transparent)]" />
      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(#94a3b8 1px,transparent 1px),linear-gradient(90deg,#94a3b8 1px,transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      {/* ── Main content ── */}
      <div className="relative max-w-7xl mx-auto px-6 md:px-10 pt-24 pb-32">
        {/* Badge */}
        <div className="flex justify-center mb-8">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-400/10 border border-cyan-400/30 text-cyan-300 text-xs font-semibold tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            Personal Productivity · Now Live
          </span>
        </div>

        {/* Headline */}
        <div className="text-center max-w-4xl mx-auto mb-6">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-white leading-[1.05] tracking-tight">
            One app for{' '}
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-cyan-300 via-sky-300 to-emerald-300 bg-clip-text text-transparent">
                everything
              </span>
              <span className="absolute -bottom-1 left-0 w-full h-1 rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400 opacity-60" />
            </span>{' '}
            you want to do.
          </h1>
        </div>

        {/* Subheading */}
        <p className="text-center text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
          MyOrbit brings your tasks, goals, finances, journal, and 5 more tools
          into a single lightweight workspace — with AI that does the heavy
          lifting so you type less and accomplish more.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-14">
          <a
            href="#pricing"
            className="group inline-flex items-center justify-center gap-2 px-9 py-4 rounded-2xl bg-gradient-to-r from-cyan-400 to-emerald-400 text-slate-900 font-bold text-base shadow-2xl shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:scale-[1.03] transition-all duration-200"
          >
            Launch my workspace
            <svg
              className="w-4 h-4 group-hover:translate-x-1 transition-transform"
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
          <a
            href="https://myorbitdemo.netlify.app/"
            className="inline-flex items-center justify-center gap-2 px-9 py-4 rounded-2xl border border-white/25 text-white font-semibold text-base hover:bg-white/10 transition-all duration-200"
          >
            Explore MyOrbit (Demo) - No Signup Required!
          </a>
        </div>

        {/* Stats row */}
        <div className="flex justify-center gap-8 sm:gap-16 mb-16 text-center">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="text-3xl sm:text-4xl font-black text-white">
                <AnimatedNumber target={s.value} suffix={s.suffix} />
              </p>
              <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider">
                {s.label}
              </p>
            </div>
          ))}
        </div>

        {/* ── Feature chips ── */}
        <div className="mt-14 text-center">
          <p className="text-xs text-slate-500 uppercase tracking-widest mb-5">
            Everything packed in
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {features.map((f) => (
              <span
                key={f.label}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/15 text-sm text-slate-200 font-medium hover:bg-white/10 hover:border-white/30 transition cursor-default"
              >
                <span>{f.icon}</span>
                {f.label}
              </span>
            ))}
          </div>
        </div>

        {/* ── Social proof ── */}
        <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-6 text-center sm:text-left">
          <div className="flex -space-x-2">
            {['🧑‍💼', '👩‍🎓', '🧕', '👨‍💻', '👩‍🏫'].map((emoji, i) => (
              <div
                key={i}
                className="w-9 h-9 rounded-full bg-slate-700 border-2 border-[#040d1a] flex items-center justify-center text-base"
              >
                {emoji}
              </div>
            ))}
          </div>
          <p className="text-slate-400 text-sm">
            Built for people who{' '}
            <span className="text-white font-medium">
              want results, not more apps to manage.
            </span>
          </p>
        </div>

        {/* Scroll nudge */}
        <div className="mt-16 flex flex-col items-center gap-2 text-slate-500">
          <p className="text-xs uppercase tracking-widest">Scroll to explore</p>
          <div className="w-5 h-8 rounded-full border border-slate-600 flex items-start justify-center pt-1">
            <div className="w-1 h-2 rounded-full bg-slate-400 animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
