'use client';

import Image from 'next/image';
import React from 'react';

const SchedulePreview = () => {
  return (
    <section className="w-full flex flex-col md:flex-row items-center justify-center py-24 px-6 md:px-16 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
      {/* --- Left Column --- */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-start text-left space-y-6 mb-12 md:mb-0">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white leading-snug">
          Plan Smarter with Clear Schedules
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed max-w-lg">
          Visualize your day and week with beautiful, organized schedules. Stay
          punctual, manage your priorities, and maintain balance between work,
          study, and life — all in one place.
        </p>
      </div>

      {/* --- Right Column (Single Image) --- */}
      <div className="w-full md:w-1/2 flex items-center justify-center">
        <Image
          src="/static-images/key-benefits/schedules-review.png"
          alt="Schedules Section Preview"
          width={700}
          height={450}
          className="rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 w-full h-auto"
        />
      </div>
    </section>
  );
};

export default SchedulePreview;
