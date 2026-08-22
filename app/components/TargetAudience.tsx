'use client';

import React, { useRef, useState } from 'react';
import { Users, Briefcase, GraduationCap, Target } from 'lucide-react';

interface Audience {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const audiences: Audience[] = [
  {
    id: 1,
    title: 'College & University Students',
    description:
      'Stay on top of personal goals with structured study planning and motivation.',
    icon: <GraduationCap className="w-8 h-8 text-blue-600" />,
  },
  {
    id: 2,
    title: 'Freelancers & Remote Workers',
    description:
      'Organize your projects, client tasks, and deadlines to maintain balance and consistency.',
    icon: <Briefcase className="w-8 h-8 text-green-600" />,
  },
  {
    id: 3,
    title: 'People Who Aim Higher Than To-Do Lists',
    description:
      "For people who don't just create to-do lists, but actually want to achieve measurable goals and make real progress in their careers and life.",
    icon: <Target className="w-8 h-8 text-orange-600" />,
  },
  {
    id: 4,
    title: 'Personal Growth Enthusiasts',
    description:
      'People who are serious about improving their life systematically to achieve a more productive lifestyle.',
    icon: <Users className="w-8 h-8 text-purple-600" />,
  },
];

export default function TargetAudience() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Track active card by scroll position
  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, offsetWidth } = scrollRef.current;
    const newIndex = Math.round(scrollLeft / (offsetWidth * 0.8));
    setActiveIndex(newIndex);
  };

  return (
    <section className="py-24 px-6 md:px-12 bg-slate-950 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_center,#22d3ee33,transparent_55%)]" />
      <div className="relative max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-flex px-4 py-1 rounded-full text-xs uppercase tracking-[0.4em] bg-white/10 border border-white/20 text-cyan-200">
            ideal users
          </span>
          <h2 className="text-4xl font-bold mt-6">
            Built for people who love to plan, achieve, and celebrate every day
          </h2>
          <p className="text-slate-200 text-lg max-w-3xl mx-auto mt-4">
            Whether you’re a student, a freelancer, or someone who loves
            personal growth, every tool adapts to how you plan, track, and
            achieve.
          </p>
        </div>

        <div className="hidden pt-3 md:grid grid-cols-2 lg:grid-cols-4 gap-6">
          {audiences.map((a) => (
            <div
              key={a.id}
              className="group rounded-3xl border border-white/20 bg-white/5 backdrop-blur p-6 flex flex-col items-start gap-4 hover:border-cyan-300/60 transition"
            >
              <div className="p-3 rounded-2xl bg-white/10 border border-white/20 text-cyan-300">
                {a.icon}
              </div>
              <h3 className="text-xl font-semibold">{a.title}</h3>
              <p className="text-sm text-slate-200">{a.description}</p>
            </div>
          ))}
        </div>

        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="md:hidden flex overflow-x-auto gap-4 mt-8 px-2 snap-x snap-mandatory scroll-smooth pb-6"
        >
          {audiences.map((a, index) => {
            const isActive = index === activeIndex;
            return (
              <div
                key={a.id}
                className={`flex-shrink-0 snap-center w-[80%] mx-auto rounded-3xl border backdrop-blur p-6 text-center transition-all duration-500 ${
                  isActive
                    ? 'scale-105 border-cyan-400 bg-white/10'
                    : 'scale-95 border-white/10 bg-white/5 text-slate-200'
                }`}
              >
                <div className="mb-4 flex justify-center">{a.icon}</div>
                <h3 className="font-semibold text-lg mb-2">{a.title}</h3>
                <p className="text-sm">{a.description}</p>
              </div>
            );
          })}
        </div>

        {/* CTA Button */}
        <div className="flex justify-center mt-12 md:mt-16">
          <a
            href="https://myorbitdemo.netlify.app"
            className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-cyan-500 text-slate-950 font-bold text-base shadow-xl shadow-cyan-500/20 hover:bg-cyan-400 hover:shadow-cyan-500/40 hover:-translate-y-0.5 transition-all duration-200"
          >
            Try a Quick Demo
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
        </div>
      </div>
    </section>
  );
}
