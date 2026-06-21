'use client';

import React, { useState } from 'react';
import {
  Clock,
  Plus,
  Bus,
  MapPin,
  Trash2
} from 'lucide-react';

interface TimetableStep {
  title: string;
  startTime: string;
  endTime?: string;
}

export default function TimetableDemo() {
  // Preset Timetables for Mockup
  const masjidTimetable: TimetableStep[] = [
    { title: 'Fajr', startTime: '04:30 AM' },
    { title: 'Dhuhr', startTime: '01:30 PM' },
    { title: 'Asr', startTime: '05:15 PM' },
    { title: 'Maghrib', startTime: '07:15 PM' },
    { title: 'Isha', startTime: '09:00 PM' },
  ];

  const transitTimetable: TimetableStep[] = [
    { title: 'Morning Express Bus', startTime: '07:45 AM', endTime: '08:30 AM' },
    { title: 'Mid-Day Shuttle', startTime: '01:15 PM', endTime: '02:00 PM' },
    { title: 'Evening Return Route', startTime: '05:30 PM', endTime: '06:15 PM' },
  ];

  const [activePreset, setActivePreset] = useState<'masjid' | 'transit'>('masjid');
  const [customSteps, setCustomSteps] = useState<TimetableStep[]>([]);
  
  // Step Adder Form State
  const [newTitle, setNewTitle] = useState('');
  const [newStart, setNewStart] = useState('');
  const [newEnd, setNewEnd] = useState('');

  const activeTimetableSteps = activePreset === 'masjid' 
    ? [...masjidTimetable, ...customSteps.filter((_, i) => i % 2 === 0)]
    : [...transitTimetable, ...customSteps.filter((_, i) => i % 2 !== 0)];

  const handleAddStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newStart.trim()) return;

    const newStep: TimetableStep = {
      title: newTitle.trim(),
      startTime: newStart.trim(),
      endTime: newEnd.trim() || undefined,
    };

    setCustomSteps((prev) => [...prev, newStep]);
    setNewTitle('');
    setNewStart('');
    setNewEnd('');
  };

  const handleResetCustomSteps = () => {
    setCustomSteps([]);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
      
      {/* Timetable Profile Switcher Card */}
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-xl overflow-hidden transition-all duration-300">
        <div className="p-6 sm:p-8">
          
          <span className="text-[10px] uppercase font-extrabold text-slate-400 dark:text-slate-500 block tracking-wider mb-3">
            Select Timetable Profile:
          </span>

          {/* Toggle Tabs Buttons */}
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setActivePreset('masjid')}
              className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-bold transition border cursor-pointer ${
                activePreset === 'masjid'
                  ? 'bg-blue-500 border-blue-500 text-white shadow-md shadow-blue-500/15'
                  : 'border-slate-250 dark:border-slate-850 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-350 bg-transparent'
              }`}
            >
              <MapPin className="w-3.5 h-3.5" />
              Mosque
            </button>
            <button
              onClick={() => setActivePreset('transit')}
              className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-bold transition border cursor-pointer ${
                activePreset === 'transit'
                  ? 'bg-blue-500 border-blue-500 text-white shadow-md shadow-blue-500/15'
                  : 'border-slate-250 dark:border-slate-850 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-350 bg-transparent'
              }`}
            >
              <Bus className="w-3.5 h-3.5" />
              Transit
            </button>
          </div>

          {/* Render Selected Timetable */}
          <div className="p-4 rounded-2xl border bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-850">
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs font-extrabold text-slate-800 dark:text-slate-200">
                {activePreset === 'masjid'
                  ? 'Al-Falah Mosque (Prayer Times)'
                  : 'Office Shuttle (Express Bus)'}
              </span>
              <span className="inline-flex px-2 py-0.5 rounded-md text-[9px] font-bold bg-blue-100 text-blue-600 dark:bg-blue-950/40 dark:text-blue-300">
                {activeTimetableSteps.length} Steps
              </span>
            </div>

            <hr className="border-slate-200 dark:border-slate-800/80 mb-3" />

            <div className="space-y-2">
              {activeTimetableSteps.map((step, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 shadow-sm"
                >
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    {step.title}
                  </span>
                  <span className="text-[11px] font-bold text-blue-500 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-blue-500" />
                    {step.startTime} {step.endTime ? ` - ${step.endTime}` : ''}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Add Step Simulator Form */}
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-xl overflow-hidden transition-all duration-300">
        <div className="p-6 sm:p-8">
          
          <span className="text-[10px] uppercase font-extrabold text-slate-400 dark:text-slate-500 block tracking-wider mb-3">
            Simulate Adding a Time Slot Step:
          </span>

          <form onSubmit={handleAddStep} className="space-y-3">
            <div>
              <input
                type="text"
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-250 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition placeholder-slate-400"
                placeholder="Step Title (e.g. Fajr or Bus Departure)"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-250 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition placeholder-slate-400"
                placeholder="Start Time (e.g. 05:15)"
                value={newStart}
                onChange={(e) => setNewStart(e.target.value)}
              />
              <input
                type="text"
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-250 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition placeholder-slate-400"
                placeholder="End Time (Optional)"
                value={newEnd}
                onChange={(e) => setNewEnd(e.target.value)}
              />
            </div>

            <div className="flex gap-2 justify-end pt-1">
              {customSteps.length > 0 && (
                <button
                  type="button"
                  onClick={handleResetCustomSteps}
                  className="flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-bold text-rose-500 hover:bg-rose-500/10 transition cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Reset Custom
                </button>
              )}
              <button
                type="submit"
                className="flex items-center gap-1 px-4 py-2 rounded-xl text-xs font-bold bg-blue-500 hover:bg-blue-600 text-white shadow-md shadow-blue-500/20 transition cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Slot
              </button>
            </div>
          </form>

        </div>
      </div>

    </div>
  );
}
