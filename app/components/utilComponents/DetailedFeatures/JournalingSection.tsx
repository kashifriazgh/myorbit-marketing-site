'use client';

import { motion } from 'framer-motion';
import { NotebookPen, Clock, Search, Archive, Lightbulb } from 'lucide-react';

const journalingBenefits = [
  {
    icon: <NotebookPen className="w-6 h-6 text-blue-500" />,
    title: 'Save your thoughts daily',
    description:
      'Record your feelings, ideas, and moments in a safe and structured way — your digital diary that grows with you.',
  },
  {
    icon: <Clock className="w-6 h-6 text-green-500" />,
    title: 'Preserve your daily activities',
    description:
      'Capture useful details from your day — meetings, prices, places, or people — to easily recall them later when needed.',
  },
  {
    icon: <Search className="w-6 h-6 text-purple-500" />,
    title: 'Search your past easily',
    description:
      'Find what you noted months or even years ago by just searching keywords like “cement block” or “Kamran.”',
  },
  {
    icon: <Archive className="w-6 h-6 text-amber-500" />,
    title: 'Build your personal archive',
    description:
      'Over time, your journaling becomes a living record — a timeline of your experiences, ideas, and learnings.',
  },
  {
    icon: <Lightbulb className="w-6 h-6 text-pink-500" />,
    title: 'Get insights from your past',
    description:
      'AI can analyze your past notes to reveal patterns — helping you remember lessons, make better choices, and stay consistent.',
  },
];

export default function JournalingSection() {
  return (
    <section className="relative isolate overflow-hidden py-28">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-950 dark:via-slate-900 dark:to-blue-950/30" />
      <div className="relative max-w-6xl mx-auto px-6 md:px-10 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center">
        <div className="space-y-6">
          <motion.h2
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-gray-900 dark:text-white leading-tight"
          >
            Journaling is your intelligent archive — searchable, beautiful, and
            AI-polished
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed"
          >
            Every note you write is indexed by people, places, prices, emotions,
            and hashtags. When you need “cement rate Lahore March”, it appears
            instantly — with AI-summarized context.
          </motion.p>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              'Context tags & filters',
              'Rewrite to formal/friendly tone',
              'Emoji enrichment',
              'Quick share as PDF',
            ].map((tag) => (
              <span
                key={tag}
                className="text-sm font-medium px-4 py-2 rounded-2xl bg-white dark:bg-gray-900/60 border border-blue-100 dark:border-gray-800 text-blue-700 dark:text-blue-300 text-center"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            {journalingBenefits.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-gray-900/70 p-5 shadow-sm text-left"
              >
                <div className="flex items-center gap-3 mb-3">
                  {item.icon}
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {item.title}
                  </h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="rounded-3xl border border-blue-100 dark:border-slate-800 bg-white dark:bg-gray-900/60 p-5 shadow-lg space-y-3">
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-blue-500">
              <span>AI rewrite</span>
              <span>instant</span>
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-200 leading-relaxed">
              “Kal cement ka rate 1470 tha” → “Cement was Rs.1470 yesterday —
              noted for future purchases 😊”
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Tone softened + emoji + translation handled by AI.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
