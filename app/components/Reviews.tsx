'use client';

import { Star } from 'lucide-react';

const placeholderTestimonials = [
  {
    name: 'Khurram Bilal',
    title: 'Employee at Govt Org',
    quote:
      'This app will help me stay organized, build productive habits, and track my daily tasks effortlessly.',
    score: 5,
  },
  {
    name: 'Noman',
    title: 'Student at University',
    quote:
      'I love how clean and focused the interface is. Can’t wait to see my progress over time!',
    score: 5,
  },
  {
    name: 'Mujtaba',
    title: 'Student & Planner',
    quote:
      'A simple, yet powerful way to organize my day, manage goals, and stay motivated.',
    score: 4.8,
  },
];

const featureStats = [
  { label: 'Tasks & Habits', value: 'Organize & Track' },
  { label: 'Goals & Streaks', value: 'Stay Motivated' },
  { label: 'Finance Overview', value: 'Manage Easily' },
];

export default function Reviews() {
  return (
    <section className="py-24 px-6 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Heading */}
        <div className="text-center space-y-4">
          <span className="inline-flex px-4 py-1 rounded-full text-xs uppercase tracking-[0.35em] bg-white/10 border border-white/10 text-cyan-200">
            Reviews & Features
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold leading-tight">
            Designed for focus, clarity, and productivity
          </h2>
          <p className="text-slate-300 max-w-3xl mx-auto">
            Our app helps you plan your day, track habits, manage goals, and stay
            motivated—even if you’re just starting your productivity journey.
          </p>
        </div>

        {/* Feature Stats */}
        <div className="grid md:grid-cols-3 gap-6">
          {featureStats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur p-6 text-center space-y-2"
            >
              <p className="text-3xl font-bold text-cyan-200">{stat.value}</p>
              <p className="text-sm uppercase tracking-[0.3em] text-white/70">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Placeholder Testimonials */}
        <div className="grid gap-6 md:grid-cols-3">
          {placeholderTestimonials.map((review) => (
            <div
              key={review.name}
              className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur p-6 flex flex-col gap-5 shadow-[0_20px_80px_-40px_rgba(15,23,42,0.8)]"
            >
              <div className="flex items-center gap-2 text-amber-300">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    size={16}
                    className={
                      index + 1 <= Math.round(review.score)
                        ? 'fill-current'
                        : 'opacity-30'
                    }
                  />
                ))}
                <span className="text-sm font-semibold text-white/80">
                  {review.score.toFixed(1)}
                </span>
              </div>
              <p className="text-lg text-white/90 leading-relaxed">
                “{review.quote}”
              </p>
              <div>
                <p className="font-semibold text-white">{review.name}</p>
                <p className="text-sm text-white/70">{review.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
