'use client';

import { motion } from 'framer-motion';
import { NotebookPen, Clock, Search, Archive } from 'lucide-react';

const journalingBenefits = [
  {
    icon: <Clock className="w-6 h-6 text-green-500" />,
    title: 'Never forget useful information',
    description:
      'Prices you were quoted, names of people you met, places you visited — all saved exactly as they happened, ready when you need them again.',
  },
  {
    icon: <Search className="w-6 h-6 text-purple-500" />,
    title: 'Search months later in seconds',
    description:
      'Forgot what someone told you 3 months ago? Search by shop name, person, or any keyword and find the exact entry instantly.',
  },
  {
    icon: <Archive className="w-6 h-6 text-amber-500" />,
    title: 'Build a personal knowledge base',
    description:
      'Over time your journal becomes a searchable record of your life — prices, contacts, ideas, decisions — always available.',
  },
  {
    icon: <NotebookPen className="w-6 h-6 text-blue-500" />,
    title: 'AI remembers what you wrote',
    description:
      'When you save a journal entry, AI quietly picks out the important details — a price, a name, a decision you made. Later, it can remind you about it or use that context to help you automatically.',
  },
];

export default function JournalingSection() {
  return (
    <section className="relative isolate overflow-hidden py-28">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-950 dark:via-slate-900 dark:to-blue-950/30" />
      <div className="relative max-w-6xl mx-auto px-6 md:px-10 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center">
        {/* Left column */}
        <div className="space-y-6">
          <motion.h2
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-gray-900 dark:text-white leading-tight"
          >
            Your memory is limited. Your journal is not.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed"
          >
            Write down what happened each day — a conversation, a price you were
            quoted, a contact you met. Six months later when you need that
            information again, just search one keyword and it is right there.
          </motion.p>

          {/* Tags */}
          <div className="grid md:grid-cols-2 gap-4">
            {[
              'Searchable by keyword',
              'AI text enhancement',
              'Emoji enrichment',
              'Date-based recall',
            ].map((tag) => (
              <span
                key={tag}
                className="text-sm font-medium px-4 py-2 rounded-2xl bg-white dark:bg-gray-900/60 border border-blue-100 dark:border-gray-800 text-blue-700 dark:text-blue-300 text-center"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Real story callout */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-3xl border border-blue-200 dark:border-blue-900/50 bg-blue-50/60 dark:bg-blue-950/30 p-5 space-y-3"
          >
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-blue-500">
              <span>📖</span>
              <span>Real story — not made up</span>
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-200 leading-relaxed">
              <span className="font-semibold text-gray-900 dark:text-white">
                6 months ago
              </span>
              , I visited a door maker shop called{' '}
              <span className="font-semibold text-gray-900 dark:text-white">
                Badar Sanitary Hub
              </span>{' '}
              in my area. The owner{' '}
              <span className="font-semibold text-gray-900 dark:text-white">
                Abdullah
              </span>{' '}
              told me the door price is{' '}
              <span className="font-semibold text-gray-900 dark:text-white">
                Rs. 1,100 per sq ft
              </span>
              , a complete furnished door with hardware comes to{' '}
              <span className="font-semibold text-gray-900 dark:text-white">
                Rs. 37,000
              </span>
              , and the fitter charges{' '}
              <span className="font-semibold text-gray-900 dark:text-white">
                Rs. 1,500
              </span>{' '}
              for fitting. That evening, I wrote all of this in my journal —
              shop name, owner name, prices, and his mobile number.
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-200 leading-relaxed">
              6 months later, I needed a door again. I remembered the shop name
              but had completely forgotten the prices and contact. I opened my
              journal, searched{' '}
              <span className="font-semibold text-blue-600 dark:text-blue-300">
                &#39;Badar Sanitary&#39;
              </span>{' '}
              — and the full entry appeared. Owner name, mobile number, price
              per sq ft, total cost, fitting charge. Everything I needed was
              right there.{' '}
              <span className="font-semibold text-gray-900 dark:text-white">
                No calls. No guessing. No starting over.
              </span>
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 italic">
              Your journal is not just a diary. It is a searchable record of
              everything important that happened.
            </p>
          </motion.div>
        </div>

        {/* Right column */}
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

          {/* AI rewrite demo */}
          <div className="rounded-3xl border border-blue-100 dark:border-slate-800 bg-white dark:bg-gray-900/60 p-5 shadow-lg space-y-3">
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-blue-500">
              <span>AI rewrite</span>
              <span>instant</span>
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-200 leading-relaxed">
              &#39;Kal cement ka rate 1470 tha&#39; → &#39;Cement was Rs. 1,470
              yesterday — noted for future purchases 😊&#39;
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Tone improved + emoji added + translated — all by AI.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
