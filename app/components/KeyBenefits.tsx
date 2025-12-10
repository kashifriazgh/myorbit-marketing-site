'use client';

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Benefit {
  id: number;
  title: string;
  description: string;
  image?: string;
}

const benefits: Benefit[] = [
  {
    id: 1,
    title: 'Journaling',
    description:
      'Plan each day with clear schedules so you never miss a task, routine, or important activity.',
  },
  {
    id: 2,
    title: 'Tasks',
    description:
      'Write down daily, weekly, or monthly tasks, prioritize them, and track their progress effortlessly.',
  },
  {
    id: 3,
    title: 'Goals',
    description:
      'Set meaningful goals and achieve them step by step. Link your tasks as milestones to monitor productivity over time.',
  },
  {
    id: 4,
    title: 'Monthly Shopping Plans',
    description:
      'List the items you need to buy each month, manage your spending and budget, and keep track of your purchases easily.',
  },
  {
    id: 5,
    title: 'Streaks',
    description:
      'Build positive habits by setting daily or weekly streaks. Track your consistency and watch your growth over time.',
  },
  {
    id: 6,
    title: 'Time Table',
    description:
      'Set custom timetables for your daily routines, such as office, college, or nearby Masjid Salah times.',
  },
  {
    id: 7,
    title: 'Finance',
    description:
      'Manage your overall budget and cash flow. Keep records of income, expenses, and any loans you’ve lent or borrowed.',
  },
  {
    id: 8,
    title: 'AI',
    description:
      'Our intelligent AI assistant helps you plan smarter, stay consistent, and achieve higher productivity every day.',
  },
];

export default function KeyBenefits() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const progressRef = useRef<NodeJS.Timeout | null>(null);

  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    slideChanged: (s) => {
      const newSlide = s.track.details.rel;
      setActiveIndex(newSlide * 4); // reset to first benefit of new slide
      resetTimer();
    },
  });

  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 768);
    checkScreen();
    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, []);

  const getImagePath = (title: string) =>
    `/static-images/key-benefits/edited/${title
      .toLowerCase()
      .replace(/\s+/g, '-')}.png`;

  const handleBenefitClick = (id: number) => {
    setActiveIndex(id - 1);
    if (isMobile) setExpandedId((prev) => (prev === id ? null : id));
    resetTimer();
  };

  // ---- Auto Play Logic ----
  useEffect(() => {
    startTimer();
    return () => stopTimer();
  }, [activeIndex]);

  const startTimer = () => {
    stopTimer();
    setProgress(0);
    let p = 0;

    progressRef.current = setInterval(() => {
      p += 2; // progress grows 0 → 100
      setProgress(p);
    }, 100);

    intervalRef.current = setTimeout(() => {
      const nextIndex = (activeIndex + 1) % benefits.length;
      setActiveIndex(nextIndex);

      // change slide when crossing every 4th benefit
      if ((nextIndex + 1) % 4 === 1) instanceRef.current?.next();
    }, 5000);
  };

  const stopTimer = () => {
    if (intervalRef.current) clearTimeout(intervalRef.current);
    if (progressRef.current) clearInterval(progressRef.current);
  };

  const resetTimer = () => {
    stopTimer();
    startTimer();
  };

  return (
    <section
      className="py-24 bg-gradient-to-b from-white via-emerald-50/40 to-white dark:from-gray-950 dark:via-emerald-950/30 dark:to-gray-950 relative"
      id="preview"
    >
      <div className="absolute inset-x-0 top-10 h-32 mx-auto max-w-4xl bg-emerald-300/20 blur-3xl rounded-full opacity-40" />
      <div className="relative max-w-6xl mx-auto px-6">
        <div className="text-center mb-16 space-y-4">
          <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.4em] text-emerald-600 dark:text-emerald-300">
            orchestration board
          </span>
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
            Key Benefits that keep everything in motion
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Every module feeds the homepage, so you always see today, the next 3
            days, overdue work, upcoming income and expenses, streaks, and quick
            AI suggestions.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 items-stretch">
          {/* Left Column */}
          <div className="lg:w-1/2 w-full relative bg-white dark:bg-gray-900 border border-emerald-100 dark:border-emerald-900/40 rounded-3xl shadow-xl px-2 py-6 overflow-hidden">
            <div className="flex items-center justify-between px-6 pb-4 border-b border-gray-100 dark:border-gray-800">
              <div>
                <p className="text-sm uppercase tracking-[0.4em] text-emerald-500">
                  auto-play
                </p>
                <p className="text-lg font-semibold text-gray-900 dark:text-gray-50">
                  {benefits[activeIndex].title}
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    instanceRef.current?.prev();
                    resetTimer();
                  }}
                  className="p-3 rounded-2xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-emerald-50 dark:hover:bg-emerald-900/40 transition"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    instanceRef.current?.next();
                    resetTimer();
                  }}
                  className="p-3 rounded-2xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-emerald-50 dark:hover:bg-emerald-900/40 transition"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div ref={sliderRef} className="keen-slider px-4">
              {[0, 1].map((slideIndex) => (
                <div
                  key={slideIndex}
                  className="keen-slider__slide space-y-4 py-6"
                >
                  {benefits
                    .slice(slideIndex * 4, slideIndex * 4 + 4)
                    .map((b) => {
                      const isActive = b.id === activeIndex + 1;
                      return (
                        <div key={b.id} className="w-full relative">
                          <div
                            onClick={() => handleBenefitClick(b.id)}
                            className={`relative flex flex-col md:flex-row gap-4 cursor-pointer rounded-2xl border px-5 py-5 transition-all ${
                              isActive
                                ? 'bg-emerald-50 dark:bg-emerald-900/30 border-emerald-200 dark:border-emerald-700 shadow-lg'
                                : 'border-gray-200 dark:border-gray-800'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                                  isActive
                                    ? 'bg-emerald-500 text-white'
                                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200'
                                }`}
                              >
                                {b.id}
                              </div>
                              <h3
                                className={`font-semibold text-lg ${
                                  isActive
                                    ? 'text-emerald-600 dark:text-emerald-300'
                                    : 'text-gray-800 dark:text-gray-200'
                                }`}
                              >
                                {b.title}
                              </h3>
                            </div>
                            <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base">
                              {b.description}
                            </p>

                            {/* Animated Progress */}
                            <div className="absolute inset-y-0 left-0 w-[6px] rounded-full overflow-hidden bg-gray-100 dark:bg-gray-800">
                              {isActive && (
                                <div
                                  className="absolute left-0 bottom-0 w-full bg-emerald-500 transition-all duration-100 ease-linear"
                                  style={{ height: `${progress}%` }}
                                />
                              )}
                            </div>
                          </div>

                          {isMobile && expandedId === b.id && (
                            <div className="flex justify-center py-3">
                              <Image
                                src={getImagePath(b.title)}
                                alt={`${b.title} preview`}
                                width={420}
                                height={260}
                                className="rounded-2xl border border-gray-200 dark:border-gray-800 shadow-lg object-contain"
                              />
                            </div>
                          )}
                        </div>
                      );
                    })}
                </div>
              ))}
            </div>
          </div>

          {/* Right Column — Desktop Preview */}
          <div className="lg:w-1/2 w-full relative">
            <div className="hidden md:flex items-center justify-center bg-slate-900 rounded-[32px] min-h-[480px] border border-slate-800 relative overflow-hidden shadow-[0_30px_80px_-30px_rgba(15,23,42,0.8)]">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/30 via-transparent to-cyan-500/30" />
              {benefits.map((b, index) => (
                <div
                  key={b.id}
                  className={`absolute inset-6 flex items-center justify-center rounded-[24px] bg-white/95 dark:bg-gray-950 transition-opacity duration-700 ${
                    index === activeIndex ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <Image
                    src={getImagePath(b.title)}
                    alt={`${b.title} feature preview`}
                    width={520}
                    height={420}
                    className="rounded-2xl object-contain"
                  />
                </div>
              ))}
            </div>

            <div className="md:hidden rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 shadow-xl">
              <Image
                src={getImagePath(benefits[activeIndex].title)}
                alt={`${benefits[activeIndex].title} preview`}
                width={520}
                height={420}
                className="rounded-2xl object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
