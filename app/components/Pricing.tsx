'use client';

import React from 'react';
import { Cloud, MessageCircle, Wrench } from 'lucide-react';

export default function Pricing() {
  const plans = [
    {
      id: 1,
      title: 'App Setup Plan',
      description:
        'We’ll set up your personalized productivity web app — connected to Firebase, Gemini AI, and hosted on Netlify using your credentials.',
      price: '₨ 1000',
      note: 'One-time payment (or split into 2 x ₨500 payments)',
      icon: <Wrench className="w-10 h-10 text-green-600" />,
      highlight: true,
    },
    {
      id: 2,
      title: 'Cloud Function Service',
      description:
        'We’ll host your background functions (like scheduled tasks) on Railway Cloud for continuous operation.',
      price: '₨ 200 / month',
      note: 'First month free',
      icon: <Cloud className="w-10 h-10 text-blue-600" />,
      highlight: false,
    },
    {
      id: 3,
      title: 'WhatsApp Messaging Service',
      description:
        'Enable WhatsApp messaging automation (e.g., task alerts, reminders, confirmations).',
      price: '₨ 200 / month',
      note: 'Covers approx. 30 conversations / month',
      icon: <MessageCircle className="w-10 h-10 text-teal-600" />,
      highlight: false,
    },
  ];

  return (
    <section
      className="py-24 px-6 md:px-12 bg-gradient-to-b from-white to-emerald-50 dark:from-gray-950 dark:to-emerald-950/30"
      id="pricing"
    >
      <div className="max-w-5xl mx-auto text-center mb-14">
        <span className="inline-flex px-4 py-1 rounded-full text-xs uppercase tracking-[0.4em] bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-300 mb-5">
          pricing
        </span>
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Simple plan, optional power-ups
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-lg">
          Every workspace is deployed under your own Firebase + Netlify setup.
          Pay once to get the full product, then enable optional automation
          services when you need scale.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-3">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`flex flex-col justify-between rounded-[32px] border p-8 transition-all duration-300 ${
              plan.highlight
                ? 'bg-white dark:bg-gray-900 border-emerald-400 shadow-2xl shadow-emerald-200/60'
                : 'bg-white/80 dark:bg-gray-900/80 border-gray-200 dark:border-gray-800 hover:shadow-xl'
            }`}
          >
            <div className="flex flex-col items-center text-center space-y-4">
              <div
                className={`p-4 rounded-2xl ${
                  plan.highlight
                    ? 'bg-emerald-50 text-emerald-600'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200'
                }`}
              >
                {plan.icon}
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                {plan.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                {plan.description}
              </p>
              <div className="text-4xl font-bold text-gray-900 dark:text-white">
                {plan.price}
              </div>
              <p
                className={`text-sm font-medium ${
                  plan.highlight
                    ? 'text-emerald-600 dark:text-emerald-400'
                    : 'text-gray-500 dark:text-gray-400'
                }`}
              >
                {plan.note}
              </p>
            </div>
            {plan.highlight && (
              <a
                href="#contact"
                className="mt-8 inline-flex items-center justify-center w-full px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold shadow-lg shadow-emerald-500/40 hover:opacity-90"
              >
                Get started
              </a>
            )}
          </div>
        ))}
      </div>

      <div className="max-w-4xl mx-auto text-center mt-12 text-gray-700 dark:text-gray-300 text-base leading-relaxed">
        <p>
          💡{' '}
          <span className="font-semibold text-gray-900 dark:text-gray-100">
            Start with ₨500 today
          </span>{' '}
          and clear the remaining ₨500 next month. Upgrade to Cloud Functions or
          WhatsApp automation only when you are ready.
        </p>
      </div>
      <div className="max-w-3xl mx-auto mt-8 p-6 rounded-3xl border border-yellow-300 bg-yellow-50 dark:border-yellow-600 dark:bg-yellow-900/20 text-gray-800 dark:text-gray-100">
        <p className="text-base leading-relaxed">
          <strong>Note:</strong> Charges for Cloud Functions and WhatsApp
          messaging go <strong>directly</strong> to their platforms. We only
          configure and manage them for you — no hidden margins.
        </p>
      </div>
    </section>
  );
}
