'use client';

import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Aisha Noor',
    title: 'Founder, WorkNest Labs',
    quote:
      'MyOrbit replaced three different tools. Quick add + AI assistant means our team can turn messy thoughts into structured tasks in seconds.',
    score: 4.9,
  },
  {
    name: 'Talha Rafiq',
    title: 'Operations Lead',
    quote:
      'We onboarded 12 teammates with their own Firebase + Netlify stacks. The home dashboard keeps upcoming expenses and streaks in one glance.',
    score: 5,
  },
  {
    name: 'Sadia Hanif',
    title: 'Productivity Coach',
    quote:
      'Clients love the journaling AI. It cleans rough Urdu/English blends, adds emojis, and archives everything for later reference.',
    score: 4.8,
  },
];

const reviewStats = [
  { label: 'Active workspaces', value: '120+' },
  { label: 'Avg. satisfaction', value: '4.9/5' },
  { label: 'Tasks structured via AI', value: '68K+' },
];

export default function Reviews() {
  return (
    <section className="py-24 px-6 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <span className="inline-flex px-4 py-1 rounded-full text-xs uppercase tracking-[0.35em] bg-white/10 border border-white/10 text-cyan-200">
            Reviews
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold leading-tight">
            Trusted by builders who value focus, clarity, and automation
          </h2>
          <p className="text-slate-300 max-w-3xl mx-auto">
            Every workspace ships with its own Firebase/Netlify setup, so
            customers get privacy while still enjoying the same MyOrbit
            experience.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {reviewStats.map((stat) => (
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

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((review) => (
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
