'use client';

import React, { useState } from 'react';
import { Calendar, CheckSquare, Target, DollarSign, Sparkles } from 'lucide-react';

interface CardItem {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
  tag: string;
}

export default function DailyProductivityDashboard() {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const cards: CardItem[] = [
    {
      id: 1,
      icon: <Calendar className="w-5 h-5" />,
      title: "Schedules of the Day",
      description: "Make your each hour engaged and productive.",
      tag: "Time Management"
    },
    {
      id: 2,
      icon: <CheckSquare className="w-5 h-5" />,
      title: "Tasks ToDo",
      description: "Write down your each task and assign a specific Date to do it.",
      tag: "Productivity"
    },
    {
      id: 3,
      icon: <Target className="w-5 h-5" />,
      title: "Define Goals of your life",
      description: "Convert your small schedules and todos into a big achievement.",
      tag: "Vision & Growth"
    },
    {
      id: 4,
      icon: <DollarSign className="w-5 h-5" />,
      title: "Finance - Manage your money",
      description: "Keep track of your income, saving and expenses, maintain each transaction history and note down loan & liabilities record.",
      tag: "Wealth Tracking"
    }
  ];

  return (
    <div className="pt-28 pb-12 px-6 md:px-12 bg-slate-50 dark:bg-[#040d1a] text-slate-900 dark:text-slate-100 font-sans flex flex-col justify-center transition-colors duration-300">
      <div className="max-w-6xl mx-auto mb-10 w-full">
        <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 font-medium text-sm mb-2">
          <Sparkles className="w-4 h-4" />
          <span>Daily Productivity Dashboard</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white mb-2">
          Master your daily workflow.
        </h1>
        <p className="text-slate-600 dark:text-slate-300 text-lg">
          Organize your time, track tasks, set life goals, and manage your financial records seamlessly.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-6">
        {cards.map((card) => (
          <div 
            key={card.id}
            onClick={() => setActiveCard(card.id)}
            className={`bg-white dark:bg-[#0a1a2e]/90 border rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between group cursor-pointer relative overflow-hidden ${
              activeCard === card.id ? 'border-blue-500 ring-2 ring-blue-500/10' : 'border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
            }`}
          >
            {/* Top accent line on hover */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white dark:group-hover:bg-blue-600 dark:group-hover:text-white transition-all duration-300 shadow-sm">
                  {card.icon}
                </div>
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/80 px-2.5 py-1 rounded-full">
                  {card.tag}
                </span>
              </div>
              
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                {card.title}
              </h2>
              
              <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed mb-6">
                {card.description}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-400 font-medium">
              <span>Click to view details</span>
              <span className="text-blue-600 dark:text-blue-400 font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                Explore →
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {activeCard && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-[#0b1d33] rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100 dark:border-slate-800">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              {cards.find(c => c.id === activeCard)?.title}
            </h3>
            <p className="text-slate-600 dark:text-slate-300 text-sm mb-6 leading-relaxed">
              {cards.find(c => c.id === activeCard)?.description} This module helps you organize and optimize your personal routine efficiently.
            </p>
            <div className="flex justify-end space-x-3">
              <button 
                onClick={() => setActiveCard(null)}
                className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-medium rounded-xl text-sm transition-colors"
              >
                Close
              </button>
              <button 
                onClick={() => setActiveCard(null)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl text-sm shadow-sm transition-colors"
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
