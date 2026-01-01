'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
const animation = { duration: 15000, easing: (t: number) => t };

const HeroSection = () => {
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen width
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [sliderRef] = useKeenSlider({
    loop: true,
    renderMode: 'performance',
    drag: false,
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

  // Images for the feature boxes
  const featureImages = [
    { id: 1, src: '/static-images/tasks-view.png', alt: 'Tasks View' },
    { id: 2, src: '/static-images/goals-view.png', alt: 'Goals View' },
    { id: 3, src: '/static-images/schedules-view.png', alt: 'Schedules View' },
    {
      id: 4,
      src: '/static-images/shopping-list-view.png',
      alt: 'Shopping List View',
    },
  ];

  const heroHighlights = [
    { title: 'Everything in one App', badge: '9 helpful tools' },
    { title: 'AI speeds up input', badge: '50% less typing' },
    { title: 'Fully personal setup', badge: 'Your own DB & Hosting' },
  ];

  return (
    <section className="relative w-full min-h-[85vh] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900 to-sky-900" />
      <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_top,#22d3ee40,transparent_45%)]" />
      <div className="relative max-w-7xl mx-auto px-6 md:px-10 py-28 flex flex-col md:flex-row items-center gap-16">
        {/* Left */}
        <div className="w-full md:w-1/2 flex flex-col gap-8 text-left text-white">
          <div>
            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-cyan-300 bg-white/10 border border-white/20 rounded-full px-4 py-1 mb-4">
              Personal Productivity App
            </span>
            <h1 className="text-4xl sm:text-5xl font-black leading-tight">
              Plan your daily activities with minimum manual effort.
            </h1>
          </div>

          <p className="text-lg text-slate-200 leading-relaxed">
            MyOrbit is a lightweight productivity Dashboard that brings together
            tasks, goals, finances, journaling, shopping lists and more — all
            powered by contextual AI helpers so you never start from scratch.
          </p>
          <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-cyan-300  rounded-full px-4 py-1 mb-4">
              This App offers to do following things:
            </span>
          <div className="flex flex-wrap gap-3">
            {[
              'Tasks',
              'Goals',
              'Journal',
              'Finance',
              'Shopping',
              'Streaks',
              'Schedules',
              'Time Table',
              'AI',
            ].map((item) => (
              <span
                key={item}
                className="px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-sm font-medium tracking-wide"
              >
                {item}
              </span>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <a
              href="#pricing"
              className="inline-flex items-center justify-center px-8 py-3 rounded-2xl bg-gradient-to-r from-cyan-400 to-emerald-400 text-slate-900 font-semibold shadow-xl shadow-cyan-500/40 hover:scale-[1.01] transition"
            >
              Launch my workspace
            </a>
            <a
              href="#features"
              className="inline-flex items-center justify-center px-8 py-3 rounded-2xl border border-white/40 text-white font-semibold hover:bg-white/10 transition"
            >
              See everything
            </a>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 text-sm">
            {heroHighlights.map((item) => (
              <div
                key={item.title}
                className="p-4 rounded-2xl bg-white/5 border border-white/15 backdrop-blur"
              >
                <p className="text-cyan-300 text-xs tracking-wider uppercase mb-1">
                  {item.badge}
                </p>
                <p className="font-semibold">{item.title}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right */}
        <div className="w-full md:w-1/2 relative">
          <div className="absolute -top-10 -right-8 w-40 h-40 bg-cyan-400/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-8 -left-8 w-44 h-44 bg-indigo-400/20 rounded-full blur-3xl" />
          {!isMobile ? (
            <div className="grid grid-cols-2 gap-6 w-full max-w-lg mx-auto">
              {featureImages.map((img) => (
                <div
                  key={img.id}
                  className="relative rounded-3xl overflow-hidden bg-white/5 border border-white/15 shadow-2xl shadow-black/40 backdrop-blur-lg aspect-square"
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent opacity-0 hover:opacity-100 transition" />
                </div>
              ))}
            </div>
          ) : (
            <div ref={sliderRef} className="keen-slider w-full max-w-sm">
              {featureImages.map((img) => (
                <div
                  key={img.id}
                  className="keen-slider__slide rounded-3xl overflow-hidden bg-white/10 border border-white/20 shadow-xl"
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

          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-full max-w-sm bg-white/10 border border-white/20 backdrop-blur-xl rounded-3xl p-5 shadow-2xl">
            <p className="text-sm text-slate-100 mb-3">Quick add example</p>
            <div className="rounded-2xl bg-black/50 border border-white/10 p-4 text-slate-100 text-sm">
              <span className="text-cyan-300 font-semibold">@schedule</span>{' '}
              Meet Ali at 5pm + remind me 30 mins before
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
