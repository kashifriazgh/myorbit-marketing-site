'use client';

import React from 'react';
import { Wrench, Zap } from 'lucide-react';

export default function Pricing() {
  const plans = [
    {
      id: 1,
      title: 'App Setup',
      badge: 'Introductory Offer',
      description:
        'A set up of your personal productivity workspace — connected to Firebase database, integrated AI engine, basic push notifications, and hosted on Netlify platform',
      originalPrice: '₨ 3,000',
      price: '500 PKR / year',
      note: 'Limited time · Limited users',
      icon: <Wrench className="w-10 h-10 text-emerald-600" />,
      highlight: true,
      features: [
        'Integrated AI Engine & Personal Workspace',
        'Basic Push Notifications (free mode with limits)',
        'Yearly payment - no monthly recurring fee',
      ],
      cta: 'Get my workspace',
    },
    {
      id: 2,
      title: 'Automation & Reminders',
      badge: '✨ And, this is just optional',
      description:
        'Keep your app fully active in the background — receive high-proficiency push notifications, background AI working, and continuous automation.',
      price: '₨ 200 / month',
      note: 'First month free',
      icon: <Zap className="w-10 h-10 text-blue-500" />,
      highlight: false,
      features: [
        'High-proficiency Push Notifications (more reliable & frequent)',
        'Background AI working & daily data preparation',
        'Always-on service with background automation',
        'Basic Push Notifications available free with limits',
      ],
      cta: 'Add after setup',
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
          Annual workspace setup. Optional monthly power-up.
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-lg">
          Pay 500 PKR / year to get your full personal workspace running. Add the
          automation plan when you want push notifications with higher proficiency, background AI working, and continuous background service.
        </p>
        <div className="mt-6 flex justify-center gap-4">
          <a
            href="https://myorbit-smart-1.netlify.app"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl border border-emerald-500/40 text-emerald-600 dark:text-emerald-300 font-semibold text-sm hover:bg-emerald-50 dark:hover:bg-emerald-950/40 transition"
          >
            See Live Demo
          </a>
        </div>
      </div>

      <div className="max-w-4xl mx-auto grid gap-8 md:grid-cols-2">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`flex flex-col justify-between rounded-[32px] border p-8 transition-all duration-300 ${
              plan.highlight
                ? 'bg-white dark:bg-gray-900 border-emerald-400 shadow-2xl shadow-emerald-200/60 dark:shadow-emerald-900/40'
                : 'bg-white/80 dark:bg-gray-900/80 border-gray-200 dark:border-gray-800 hover:shadow-xl'
            }`}
          >
            <div className="flex flex-col items-center text-center space-y-4">
              {/* Badge */}
              <span
                className={`text-xs font-bold px-3.5 py-1 rounded-full border shadow-xs ${
                  plan.highlight
                    ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300 border-emerald-300/50 uppercase tracking-widest'
                    : 'bg-amber-500/10 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300 border-amber-500/30 tracking-wide font-extrabold'
                }`}
              >
                {plan.badge}
              </span>

              {/* Icon */}
              <div
                className={`p-4 rounded-2xl ${
                  plan.highlight
                    ? 'bg-emerald-50 dark:bg-emerald-900/30'
                    : 'bg-gray-100 dark:bg-gray-800'
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

              {/* Price */}
              <div className="space-y-1">
                {plan.originalPrice && (
                  <p className="text-sm text-gray-400 dark:text-gray-500 line-through">
                    Original price: {plan.originalPrice}
                  </p>
                )}
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

              {/* Feature list */}
              <ul className="w-full text-left space-y-2 pt-2">
                {plan.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300"
                  >
                    <span className="text-emerald-500 mt-0.5">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 flex flex-col gap-3">
              <a
                href="#contact"
                className={`inline-flex items-center justify-center w-full px-6 py-3 rounded-2xl font-semibold transition ${
                  plan.highlight
                    ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-lg shadow-emerald-500/40 hover:opacity-90'
                    : 'border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                {plan.cta}
              </a>
              <a
                href="https://myorbit-smart-1.netlify.app"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full px-6 py-2.5 rounded-2xl text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10 transition"
              >
                See Live Demo →
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom note */}
      <div className="max-w-3xl mx-auto mt-10 p-6 rounded-3xl border border-yellow-300 bg-yellow-50 dark:border-yellow-600 dark:bg-yellow-900/20 text-gray-800 dark:text-gray-100">
        <p className="text-base leading-relaxed">
          The ₨200/month plan covers background AI working, high-proficiency push notifications, and automated services that keep your app active 24/7 — no hidden charges, no surprises. Basic push notifications remain available in free mode with usage limits.
        </p>
      </div>
    </section>
  );
}
