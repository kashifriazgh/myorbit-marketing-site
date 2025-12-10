'use client';

import React from 'react';
import { motion } from 'framer-motion';

const DescriptiveParagraph = () => {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-950" id="features">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="rounded-3xl bg-white dark:bg-gray-900 border border-gray-200/70 dark:border-gray-800 shadow-xl shadow-emerald-100/40 dark:shadow-black/40 px-6 sm:px-12 py-12 space-y-8"
        >
          <p className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-gray-50 leading-relaxed">
            Humne ek{' '}
            <span className="text-emerald-500">browser-based workspace</span>{' '}
            design kiya hai jo aik mobile app ki tarah smooth feel hota hai,
            aapke tamam routines ko ek jagah rakhta hai, aur aapke raw ideas ko
            organized tasks, schedules, aur financial plans me tabdeel karta hai{' '}
            <span className="text-emerald-500">smart AI</span> ki madad se.
          </p>

          <div className="grid sm:grid-cols-3 gap-6 text-left text-sm text-gray-600 dark:text-gray-300">
            {[
              'Quick add field understands @context and builds full records for you.',
              'Home dashboard shows today + next 3 days for tasks, expenses, and incomes.',
              'Every module (tasks, journal, finance, streaks) has its own AI helper.',
            ].map((item) => (
              <div key={item} className="flex items-start gap-3">
                <span className="text-emerald-500 text-xl">✦</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DescriptiveParagraph;
