'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';

export default function AISection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
    {
      loop: true,
      slides: {
        perView: 1,
        spacing: 16,
      },
      slideChanged(slider) {
        setCurrentSlide(slider.track.details.rel);
      },
    },
    []
  );

  // 🔄 Centralized AutoPlay Hook — fully synced
  useEffect(() => {
    const slider = instanceRef.current;
    if (!slider) return;

    let timer: NodeJS.Timeout;
    let mouseOver = false;

    const clearTimer = () => clearTimeout(timer);

    const nextSlide = () => {
      clearTimeout(timer);
      if (mouseOver) return;
      timer = setTimeout(() => {
        slider.next();
      }, 4000);
    };

    // Auto start right away (even before manual interaction)
    nextSlide();

    slider.on('created', () => {
      // Pause on hover
      slider.container.addEventListener('mouseover', () => {
        mouseOver = true;
        clearTimer();
      });
      slider.container.addEventListener('mouseout', () => {
        mouseOver = false;
        nextSlide();
      });
    });

    // Restart autoplay when slide changes manually or automatically
    slider.on('animationEnded', nextSlide);
    slider.on('updated', nextSlide);
    slider.on('dragStarted', clearTimer);

    return () => {
      clearTimer();
      slider.destroy();
    };
  }, [instanceRef]);

  const aiBenefits = [
    {
      title: 'Smarter Decision-Making',
      desc: 'AI studies your habits, goals, and schedules to help you make better, data-driven decisions every day.',
      icon: '🧠',
      bg: 'from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/40',
    },
    {
      title: 'AI-Powered Content & Task Generation',
      desc: 'AI understands what you mean — just type things like @tasks or @goals to instantly create them, or use the built-in AI buttons in each form to get automatic steps or summaries',
      icon: '⚙️',
      bg: 'from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/40',
    },
    {
      title: 'AI-Powered Writing',
      desc: 'Refine your journaling, ideas, and notes with better grammar, clarity, and expressive emojis ✨.',
      icon: '✍️',
      bg: 'from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/40',
    },
    {
      title: 'Intent Understanding',
      desc: 'AI interprets your natural text — e.g. "@addTask: Get laptop repaired tomorrow" → auto task with due date.',
      icon: '🤖',
      bg: 'from-yellow-50 to-yellow-100 dark:from-yellow-900/30 dark:to-yellow-800/40',
    },
    {
      title: 'Performance Insights',
      desc: 'AI works silently to analyze your activity and generate personal productivity insights.',
      icon: '📊',
      bg: 'from-pink-50 to-pink-100 dark:from-pink-900/30 dark:to-pink-800/40',
    },
    {
      title: 'Smart Prioritization',
      desc: 'Get intelligent recommendations on what to do first or which tasks matter most.',
      icon: '🎯',
      bg: 'from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/40',
    },
  ];

  return (
    <section className="w-full py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 px-6 md:px-12">
        {/* --- Left Column: Text & Slider --- */}
        <div className="md:w-1/2 w-full">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Empower Your Productivity with AI
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-10 text-lg leading-relaxed">
            ✍️ Zyada likhnay mein time lagta hai? <strong>AI Assistant</strong>{' '}
            ko sirf thoda sa content dein — ye aap ke liye poora aur smart data
            tayar kar dega ⚡💡 AI se aap apne kaam ko aur bhi asaan bana saktay
            hain.
          </p>

          {/* --- Slider --- */}
          <div ref={sliderRef} className="keen-slider mb-6">
            {aiBenefits.map((benefit, index) => (
              <div
                key={index}
                className={`keen-slider__slide bg-gradient-to-br ${benefit.bg} rounded-2xl shadow-md p-6 border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-lg`}
              >
                <div className="text-4xl mb-3">{benefit.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 text-base">
                  {benefit.desc}
                </p>
              </div>
            ))}
          </div>

          {/* --- Custom Dots Navigation --- */}
          <div className="flex items-center justify-center gap-2">
            {aiBenefits.map((_, idx) => (
              <button
                key={idx}
                onClick={() => instanceRef.current?.moveToIdx(idx)}
                className={`w-3 h-3 rounded-full transition-all ${
                  currentSlide === idx
                    ? 'bg-green-500 scale-125'
                    : 'bg-gray-300 dark:bg-gray-600 hover:bg-green-400'
                }`}
              />
            ))}
          </div>
        </div>

        {/* --- Right Column: Image --- */}
        <div className="md:w-1/2 w-full flex justify-center">
          <Image
            src="/static-images/key-benefits/animated/quick editor.gif"
            alt="AI assistant feature preview"
            width={550}
            height={400}
            className="rounded-xl shadow-xl object-contain"
          />
        </div>
      </div>
    </section>
  );
}
