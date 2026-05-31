'use client';

import React from 'react';
import { motion } from 'framer-motion';

const highlights = [
  {
    icon: '📅',
    title: 'Plan Your Day with Tasks & Schedules',
    body: 'Organize your day with tasks, schedules, reminders, and deadlines. Plan ahead for tomorrow, next week, or future commitments so nothing important gets overlooked.',
  },
  {
    icon: '🎯',
    title: 'Track Goals & Projects with Confidence',
    body: 'Turn ambitious goals and complex projects into manageable milestones. Monitor progress, measure achievements, and maintain a clear vision of your future objectives.',
  },
  {
    icon: '🤖',
    title: 'AI Assistance Built Into Your Workflow',
    body: 'No need to switch between multiple apps for help with everyday productivity. AI is seamlessly integrated throughout MyOrbit to assist with planning, writing, organizing, brainstorming, and daily decision-making.',
  },
];

const DescriptiveParagraph = () => {
  return (
    <section
      className="relative py-24 bg-gradient-to-b from-slate-50 via-white to-slate-50 overflow-hidden"
      id="how-it-works"
    >
      {/* Subtle background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(20,184,166,0.12),transparent)]" />

      <div className="relative max-w-5xl mx-auto px-6 md:px-10">
        {/* Label */}
        <div className="flex justify-center mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-400/10 border border-teal-400/25 text-teal-300 text-xs font-semibold tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
            How It Works
          </span>
        </div>

        {/* Main statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 leading-tight mb-5">
            Your personal productivity hub for
            <span className="block bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">
              planning, tracking and achieving more.
            </span>
          </h2>
          <p className="text-slate-600 text-lg max-w-3xl mx-auto leading-relaxed">
            MyOrbit combines tasks, schedules, goals, projects, habits,
            journals, finances and AI assistance into a single workspace. Stay
            organized, maintain momentum, and always know what matters most —
            all from one beautifully designed dashboard.
          </p>
        </motion.div>

        {/* Three highlight cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-14">
          {highlights.map((h, i) => (
            <motion.div
              key={h.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              viewport={{ once: true }}
              className="group bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <span className="text-3xl mb-4 block">{h.icon}</span>
              <h3 className="text-slate-900 font-bold text-base mb-2">
                {h.title}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">{h.body}</p>
            </motion.div>
          ))}
        </div>

        {/* Divider with quote */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative border border-white/10 rounded-2xl px-8 py-7 bg-white/[0.03] text-center"
        >
          {/* Corner accent */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-px w-24 h-px bg-gradient-to-r from-transparent via-teal-400 to-transparent" />

          <p className="text-slate-700 text-base sm:text-lg leading-relaxed font-semibold max-w-3xl mx-auto">
            &#39;Start your morning with a clear plan, stay focused throughout
            the day, and end it knowing your progress, goals, and important
            information are all captured in one place.&#39;
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default DescriptiveParagraph;
