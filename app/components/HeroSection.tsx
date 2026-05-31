'use client';

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';

const animation = { duration: 18000, easing: (t: number) => t };

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

// ── Floating pill ─────────────────────────────────────────────────────────────
function FloatingPill({
  icon,
  label,
  sub,
  style,
}: {
  icon: string;
  label: string;
  sub: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className="absolute flex items-center gap-2.5 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl px-3.5 py-2.5 shadow-2xl text-white z-20"
      style={style}
    >
      <span className="text-lg">{icon}</span>
      <div>
        <p className="text-xs font-semibold leading-tight">{label}</p>
        <p className="text-[10px] text-slate-300 leading-tight">{sub}</p>
      </div>
    </div>
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

// ── Feature images ────────────────────────────────────────────────────────────
const featureImages = [
  {
    id: 1,
    src: '/static-images/tasks-view.png',
    alt: 'Tasks View',
    label: 'Tasks',
  },
  {
    id: 2,
    src: '/static-images/goals-view.png',
    alt: 'Goals View',
    label: 'Goals',
  },
  {
    id: 3,
    src: '/static-images/schedules-view.png',
    alt: 'Schedules View',
    label: 'Schedules',
  },
  {
    id: 4,
    src: '/static-images/shopping-list-view.png',
    alt: 'Shopping List View',
    label: 'Shopping',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
const HeroSection = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    const handle = () => setIsMobile(window.innerWidth < 768);
    handle();
    window.addEventListener('resize', handle);
    return () => window.removeEventListener('resize', handle);
  }, []);

  // Auto-cycle active image thumbnail
  useEffect(() => {
    const t = setInterval(
      () => setActiveImg((p) => (p + 1) % featureImages.length),
      3000,
    );
    return () => clearInterval(t);
  }, []);

  const [sliderRef] = useKeenSlider({
    loop: true,
    renderMode: 'performance',
    drag: true,
    created(s) {
      s.moveToIdx(5, true, animation);
    },
    updated(s) {
      s.moveToIdx(s.track.details.abs + 5, true, animation);
    },
    animationEnded(s) {
      s.moveToIdx(s.track.details.abs + 5, true, animation);
    },
  });

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
            href="#features"
            className="inline-flex items-center justify-center gap-2 px-9 py-4 rounded-2xl border border-white/25 text-white font-semibold text-base hover:bg-white/10 transition-all duration-200"
          >
            See everything inside
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

        {/* ── Visual hero area ── */}
        <div className="relative">
          {!isMobile ? (
            /* ── Desktop: main preview + thumbnail strip ── */
            <div className="flex flex-col items-center gap-6">
              {/* Main screenshot */}
              <div className="relative w-full max-w-3xl mx-auto rounded-3xl overflow-hidden border border-white/10 shadow-[0_40px_120px_-20px_rgba(6,182,212,0.25)] bg-white/5 backdrop-blur-md aspect-video">
                {featureImages.map((img, i) => (
                  <Image
                    key={img.id}
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 1280px) 80vw, 900px"
                    className={`object-cover transition-opacity duration-700 ${i === activeImg ? 'opacity-100' : 'opacity-0'}`}
                    priority={i === 0}
                  />
                ))}
                {/* Browser chrome illusion */}
                <div className="absolute top-0 left-0 right-0 h-8 bg-black/40 backdrop-blur-sm flex items-center px-4 gap-2 border-b border-white/10 z-10">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400/70" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/70" />
                  <span className="mx-auto text-[10px] text-slate-400 tracking-wider">
                    myorbit.netlify.app
                  </span>
                </div>
                {/* Feature label overlay */}
                <div className="absolute bottom-4 left-4 z-10 px-3 py-1 rounded-full bg-black/50 border border-white/20 text-xs text-white font-medium backdrop-blur-sm">
                  {featureImages[activeImg].label}
                </div>
              </div>

              {/* Thumbnail strip */}
              <div className="flex gap-3">
                {featureImages.map((img, i) => (
                  <button
                    key={img.id}
                    onClick={() => setActiveImg(i)}
                    className={`relative w-20 h-14 rounded-xl overflow-hidden border transition-all duration-300 ${
                      i === activeImg
                        ? 'border-cyan-400 scale-105 shadow-lg shadow-cyan-400/30'
                        : 'border-white/15 opacity-60 hover:opacity-90'
                    }`}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>

              {/* Floating pills */}
              <FloatingPill
                icon="🔔"
                label="Reminder sent"
                sub="Meet Ali · in 30 mins"
                style={{ top: '60px', right: '-20px' }}
              />
              <FloatingPill
                icon="🤖"
                label="AI suggested 4 steps"
                sub="Task: Plan Q3 budget"
                style={{ bottom: '100px', left: '-20px' }}
              />
            </div>
          ) : (
            /* ── Mobile: keen-slider ── */
            <div
              ref={sliderRef}
              className="keen-slider w-full rounded-2xl overflow-hidden"
            >
              {featureImages.map((img) => (
                <div
                  key={img.id}
                  className="keen-slider__slide rounded-2xl overflow-hidden bg-white/10 border border-white/20 shadow-xl aspect-square"
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={400}
                    height={400}
                    className="object-cover w-full h-full"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── Quick-add showcase ── */}
        <div className="mt-12 max-w-xl mx-auto bg-white/5 border border-white/15 backdrop-blur-xl rounded-2xl p-5 shadow-2xl">
          <p className="text-xs text-slate-400 uppercase tracking-widest mb-3">
            Quick Add — type naturally, AI does the rest
          </p>
          <div className="rounded-xl bg-black/40 border border-white/10 px-4 py-3 text-slate-100 text-sm flex items-center gap-2">
            <span className="text-cyan-300 font-semibold">@schedule</span>
            <span>Meet Ali at 5pm + remind me 30 mins before</span>
            <span className="ml-auto text-slate-500 text-xs">⏎</span>
          </div>
          <div className="mt-3 rounded-xl bg-emerald-500/10 border border-emerald-400/20 px-4 py-3 text-sm">
            <span className="text-emerald-400 font-semibold">✨ AI added:</span>
            <span className="text-slate-200 ml-2">
              Schedule created · WhatsApp reminder set · 3 steps suggested
            </span>
          </div>
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
