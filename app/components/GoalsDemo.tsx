'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  Check,
  Target
} from 'lucide-react';

export default function GoalsDemo() {
  // Preset titles for AI simulator
  const presets = [
    {
      en: 'Save 50000 PKR in 3 months',
      parsed: {
        title: 'Save 50000 PKR in 3 months',
        targetValue: '50,000',
        targetUnit: 'PKR',
        dueDate: '3 Months Later',
        priority: 'High',
        category: 'Finance',
      },
    },
    {
      en: 'Run 10 km in next 2 weeks',
      parsed: {
        title: 'Run 10 km in next 2 weeks',
        targetValue: '10',
        targetUnit: 'km',
        dueDate: '2 Weeks Later',
        priority: 'Medium',
        category: 'Health',
      },
    },
    {
      en: 'Study React 40 hours',
      parsed: {
        title: 'Study React 40 hours',
        targetValue: '40',
        targetUnit: 'hours',
        dueDate: 'End of month',
        priority: 'Medium',
        category: 'Learning',
      },
    },
  ];

  // State for AI Parser Simulator
  const [inputText, setInputText] = useState(presets[0].en);
  const [parsedData, setParsedData] = useState(presets[0].parsed);

  const handleSelectPreset = (idx: number) => {
    const p = presets[idx];
    setInputText(p.en);
    setParsedData(p.parsed);
  };

  // State for Interactive Milestones mockup
  const [milestones, setMilestones] = useState([
    { id: 1, text: 'Research & project setup', completed: true },
    { id: 2, text: 'Design layout wireframes', completed: false },
    { id: 3, text: 'Develop frontend views', completed: false },
  ]);

  const toggleMilestone = (id: number) => {
    setMilestones((prev) =>
      prev.map((m) => (m.id === id ? { ...m, completed: !m.completed } : m))
    );
  };

  const completedCount = milestones.filter((m) => m.completed).length;
  const progressPercent = Math.round((completedCount / milestones.length) * 100);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
      
      {/* Simulation Part 1: AI Parser Simulator */}
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-xl overflow-hidden transition-all duration-300">
        <div className="p-6 sm:p-8">
          
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-full bg-indigo-500/10 text-indigo-500 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-805 dark:text-white leading-tight">
                AI Parser Simulator
              </h4>
              <span className="text-[10px] text-slate-400 font-semibold block mt-0.5">
                Natural Language Parsing
              </span>
            </div>
          </div>

          <p className="text-xs text-slate-550 dark:text-slate-400 mb-4 leading-relaxed">
            Click on a preset title below to see how our NLP AI automatically parses text and populates other fields:
          </p>

          {/* Presets Grid */}
          <div className="flex flex-wrap gap-2 mb-4 justify-center">
            {presets.map((preset, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectPreset(idx)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition border ${
                  inputText === preset.en
                    ? 'bg-indigo-500 border-indigo-500 text-white shadow-md shadow-indigo-500/15'
                    : 'border-indigo-500/20 text-indigo-600 dark:text-indigo-400 bg-indigo-500/5 hover:bg-indigo-500/10'
                }`}
              >
                {preset.en.split(' ')[0] + ' ' + preset.en.split(' ')[1] + '...'}
              </button>
            ))}
          </div>

          {/* Simulator Form Display Box */}
          <div className="p-4 border rounded-2xl relative overflow-hidden bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-850">
            <div className="absolute top-3 right-3 z-10">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-bold bg-indigo-500 text-white shadow-sm shadow-indigo-500/20">
                <Sparkles className="w-2.5 h-2.5" />
                AI Parsed
              </span>
            </div>

            <div className="mb-4">
              <span className="text-[10px] uppercase font-extrabold text-slate-400 dark:text-slate-500 block tracking-wider mb-1">
                Goal Title:
              </span>
              <p className="text-sm font-bold text-slate-800 dark:text-slate-100 pr-16 leading-relaxed">
                {inputText}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-y-3 gap-x-4 border-t border-slate-200 dark:border-slate-800/80 pt-3">
              <div>
                <span className="text-[9px] uppercase font-extrabold text-slate-450 dark:text-slate-500 block tracking-wider leading-none mb-1">
                  Target Value:
                </span>
                <p className="text-xs font-bold text-blue-600 dark:text-blue-400">
                  {parsedData.targetValue} {parsedData.targetUnit}
                </p>
              </div>
              <div>
                <span className="text-[9px] uppercase font-extrabold text-slate-455 dark:text-slate-500 block tracking-wider leading-none mb-1">
                  Due Date Preset:
                </span>
                <p className="text-xs font-bold text-slate-700 dark:text-slate-350">
                  {parsedData.dueDate}
                </p>
              </div>
              <div>
                <span className="text-[9px] uppercase font-extrabold text-slate-455 dark:text-slate-500 block tracking-wider leading-none mb-1">
                  Priority:
                </span>
                <p className={`text-xs font-bold ${
                  parsedData.priority === 'High' ? 'text-red-550' : 'text-amber-550'
                }`}>
                  {parsedData.priority}
                </p>
              </div>
              <div>
                <span className="text-[9px] uppercase font-extrabold text-slate-455 dark:text-slate-500 block tracking-wider leading-none mb-1">
                  Suggested Category:
                </span>
                <p className="text-xs font-bold text-purple-600 dark:text-purple-400">
                  {parsedData.category}
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Simulation Part 2: Milestones Progress Mockup */}
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-xl overflow-hidden transition-all duration-300">
        <div className="p-6 sm:p-8">
          
          {/* Header Card row */}
          <div className="flex justify-between items-start gap-4 mb-4">
            <div>
              <h4 className="text-lg font-bold text-slate-850 dark:text-white leading-tight">
                Build Professional Portfolio
              </h4>
              <span className="text-xs text-slate-405 dark:text-slate-500">
                Target: Oct 2026
              </span>
            </div>

            <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold text-white ${
              progressPercent === 100 ? 'bg-emerald-500' : 'bg-blue-500'
            }`}>
              <Target className="w-3 h-3" />
              {progressPercent === 100 ? 'Completed' : 'In Progress'}
            </span>
          </div>

          <hr className="border-slate-200 dark:border-slate-800/80 mb-4" />

          {/* Progress row */}
          <div className="flex justify-between items-center text-xs font-bold mb-2">
            <span className="text-slate-500 dark:text-slate-400">
              Goal Milestones:
            </span>
            <span className="text-blue-600 dark:text-blue-400">
              {progressPercent}% Progress
            </span>
          </div>

          <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden mb-5">
            <div
              className="h-full rounded-full transition-all duration-500 ease-out"
              style={{
                width: `${progressPercent}%`,
                backgroundColor: progressPercent === 100 ? '#10b981' : '#3b82f6',
              }}
            />
          </div>

          {/* Milestone List checkboxes */}
          <div className="space-y-1">
            {milestones.map((m) => (
              <button
                key={m.id}
                onClick={() => toggleMilestone(m.id)}
                className="w-full flex items-center gap-3 p-2 rounded-xl text-left transition hover:bg-slate-100/50 dark:hover:bg-white/5"
              >
                <div className={`w-5 h-5 rounded border flex items-center justify-center shrink-0 transition ${
                  m.completed
                    ? 'bg-blue-500 border-blue-500 text-white'
                    : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900'
                }`}>
                  {m.completed && <Check className="w-3.5 h-3.5 stroke-[3px]" />}
                </div>
                <span className={`text-sm transition ${
                  m.completed
                    ? 'line-through text-slate-400 dark:text-slate-500'
                    : 'text-slate-700 dark:text-slate-200'
                }`}>
                  {m.text}
                </span>
              </button>
            ))}
          </div>

        </div>
      </div>

    </div>
  );
}
