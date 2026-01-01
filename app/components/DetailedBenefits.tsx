import React from 'react';
import SchedulesSection from './utilComponents/DetailedFeatures/SchedulesSection';
import TasksSection from './utilComponents/DetailedFeatures/TasksSection';
import GoalsSection from './utilComponents/DetailedFeatures/GoalsSection';
import FinanceSection from './utilComponents/DetailedFeatures/FinanceSection';
import MonthlyShoppingPlanSection from './utilComponents/DetailedFeatures/MonthlyShoppingPlanSection';
import StreaksSection from './utilComponents/DetailedFeatures/StreaksSection';
import AISection from './utilComponents/DetailedFeatures/AiSection';
import JournalingSection from './utilComponents/DetailedFeatures/JournalingSection';

export default function DetailedBenefits() {
  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-950">
      <div className="max-w-4xl mx-auto text-center px-6 mb-16">
        <span className="inline-flex px-4 py-1 rounded-full text-xs uppercase tracking-[0.4em] bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-300 mb-4">
          deep dive
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Every module behaves like its own mini app
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Scroll through the detailed sections below to see how AI-guided
          journaling, smart scheduling, streak tracking, finances, and shopping
          limits all connect back to your homepage view.
        </p>
      </div>
      <div className="max-w-3xl mx-auto text-center px-6 mb-12">
  <p className="text-emerald-600 dark:text-emerald-400 text-2xl font-medium tracking-wide">
    A closer look
  </p>
  <p className="mt-2 text-gray-700 dark:text-gray-300 text-lg">
  Below is a closer look at each section, showing how every tool works on its own
  while staying connected to your daily overview.
  </p>
</div>



      <div className="space-y-16">
        <AISection />
        <SchedulesSection />
        <TasksSection />
        <GoalsSection />
        <JournalingSection />
        <FinanceSection />
        <MonthlyShoppingPlanSection />
        <StreaksSection />
      </div>
    </section>
  );
}
