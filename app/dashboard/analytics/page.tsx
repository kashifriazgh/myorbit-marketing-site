'use client';

import React, { useEffect, useState, useMemo, useCallback } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Users,
  Eye,
  TrendingUp,
  TrendingDown,
  Calendar,
  Monitor,
  Smartphone,
  Tablet,
  Globe,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  BarChart3,
  Compass,
  ArrowUpRight,
  Sun,
  Moon
} from 'lucide-react';
import { AnalyticsSummary, DailyVisitorRecord } from '@/lib/analytics';

export default function AnalyticsDashboardPage() {
  const [range, setRange] = useState<7 | 14 | 30>(30);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [summary, setSummary] = useState<AnalyticsSummary | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [hoveredBar, setHoveredBar] = useState<DailyVisitorRecord | null>(null);
  const [isDark, setIsDark] = useState(false);

  // Theme synchronization
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsDark(document.documentElement.classList.contains('dark'));
    }
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    if (nextDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const fetchStats = useCallback(async (selectedRange: number = range, isRefresh = false) => {
    try {
      if (isRefresh) setRefreshing(true);
      else setLoading(true);
      setError(null);

      const res = await fetch(`/api/analytics/stats?range=${selectedRange}`);
      if (!res.ok) {
        throw new Error('Failed to load analytics statistics');
      }
      const data = await res.json();
      if (data.summary) {
        setSummary(data.summary);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error fetching analytics';
      setError(msg);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [range]);

  useEffect(() => {
    fetchStats(range);
  }, [fetchStats, range]);

  // Find maximum unique visitors in history for scaling the chart
  const maxVisitorsInHistory = useMemo(() => {
    if (!summary?.history || summary.history.length === 0) return 10;
    const maxVal = Math.max(...summary.history.map((h) => h.uniqueVisitors));
    return maxVal > 0 ? maxVal : 10;
  }, [summary]);

  const formatDateDisplay = (dateStr: string) => {
    try {
      const parts = dateStr.split('-');
      if (parts.length === 3) {
        const d = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
        return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(d);
      }
      return dateStr;
    } catch {
      return dateStr;
    }
  };

  const formatFullDateDisplay = (dateStr: string) => {
    try {
      const parts = dateStr.split('-');
      if (parts.length === 3) {
        const d = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
        return new Intl.DateTimeFormat('en-US', {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        }).format(d);
      }
      return dateStr;
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Navigation & Header */}
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-slate-200 dark:border-white/10">
          <div>
            <div className="mb-2">
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 transition group"
              >
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                Back to Command Center
              </Link>
            </div>
            <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-semibold tracking-wider uppercase text-xs">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              Audience Intelligence Desk
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-slate-900 via-cyan-950 to-slate-900 dark:from-white dark:via-cyan-100 dark:to-white bg-clip-text text-transparent mt-1">
              Daily Unique Visitors
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
              Zero-duplicate, bot-filtered analytics for reliable marketing decisions.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Range Selector */}
            <div className="inline-flex p-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-2xl shadow-sm">
              {([7, 14, 30] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => setRange(r)}
                  className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition ${
                    range === r
                      ? 'bg-gradient-to-r from-cyan-500 to-emerald-500 text-white shadow'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {r} Days
                </button>
              ))}
            </div>

            {/* Refresh Button */}
            <button
              onClick={() => fetchStats(range, true)}
              disabled={refreshing}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold transition shadow-sm"
              title="Refresh Analytics Data"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-cyan-500 ${refreshing ? 'animate-spin' : ''}`} />
              Sync
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-2.5 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition shadow-sm"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </header>

        {error && (
          <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/40 text-rose-700 dark:text-rose-300 text-sm">
            {error}
          </div>
        )}

        {/* Top KPI Cards Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          
          {/* Card 1: Today's Unique Visitors */}
          <div className="relative overflow-hidden bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-white/5 rounded-3xl p-6 shadow-sm hover:shadow-md transition">
            <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/10 rounded-bl-full filter blur-xl pointer-events-none" />
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold tracking-wider text-slate-500 dark:text-slate-400 uppercase">
                Unique Visitors Today
              </span>
              <div className="p-2.5 rounded-2xl bg-cyan-50 dark:bg-cyan-950/40 text-cyan-600 dark:text-cyan-400">
                <Users className="w-5 h-5" />
              </div>
            </div>
            
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-extrabold text-slate-900 dark:text-white">
                {loading ? '—' : summary?.todayUnique || 0}
              </span>
              {!loading && summary && (
                <span
                  className={`inline-flex items-center gap-0.5 text-xs font-bold px-2 py-0.5 rounded-full ${
                    summary.percentageChange >= 0
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400'
                      : 'bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400'
                  }`}
                >
                  {summary.percentageChange >= 0 ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : (
                    <TrendingDown className="w-3 h-3" />
                  )}
                  {summary.percentageChange >= 0 ? `+${summary.percentageChange}%` : `${summary.percentageChange}%`}
                </span>
              )}
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              Deduplicated (1 count per user/day)
            </p>
          </div>

          {/* Card 2: Today's Page Views */}
          <div className="relative overflow-hidden bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-white/5 rounded-3xl p-6 shadow-sm hover:shadow-md transition">
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-bl-full filter blur-xl pointer-events-none" />
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold tracking-wider text-slate-500 dark:text-slate-400 uppercase">
                Page Views Today
              </span>
              <div className="p-2.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400">
                <Eye className="w-5 h-5" />
              </div>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-extrabold text-slate-900 dark:text-white">
                {loading ? '—' : summary?.todayPageViews || 0}
              </span>
              {!loading && summary && summary.todayUnique > 0 && (
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  {(summary.todayPageViews / summary.todayUnique).toFixed(1)} views/user
                </span>
              )}
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Includes browsing depth & tabs
            </p>
          </div>

          {/* Card 3: 7-Day Velocity */}
          <div className="relative overflow-hidden bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-white/5 rounded-3xl p-6 shadow-sm hover:shadow-md transition">
            <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 rounded-bl-full filter blur-xl pointer-events-none" />
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold tracking-wider text-slate-500 dark:text-slate-400 uppercase">
                7-Day Unique Reach
              </span>
              <div className="p-2.5 rounded-2xl bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400">
                <TrendingUp className="w-5 h-5" />
              </div>
            </div>

            <div className="text-4xl font-extrabold text-slate-900 dark:text-white">
              {loading ? '—' : summary?.sevenDaysUnique || 0}
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-purple-500" />
              Rolling 7-day marketing audience
            </p>
          </div>

          {/* Card 4: Total Audience in Range */}
          <div className="relative overflow-hidden bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-white/5 rounded-3xl p-6 shadow-sm hover:shadow-md transition">
            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-bl-full filter blur-xl pointer-events-none" />
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold tracking-wider text-slate-500 dark:text-slate-400 uppercase">
                {range}-Day Total Unique
              </span>
              <div className="p-2.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400">
                <BarChart3 className="w-5 h-5" />
              </div>
            </div>

            <div className="text-4xl font-extrabold text-slate-900 dark:text-white">
              {loading ? '—' : summary?.thirtyDaysUnique || 0}
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Clean marketing pool
            </p>
          </div>

        </section>

        {/* Visual Daily Visitors Chart */}
        <section className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-white/5 rounded-3xl p-6 lg:p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-cyan-500" />
                Daily Unique Visitors Trend ({range} Days)
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Hover or click any day to view detailed daily deduplication breakdown.
              </p>
            </div>

            {/* Hover Tooltip / Selection Indicator */}
            {hoveredBar && (
              <div className="px-4 py-2 rounded-2xl bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-800/40 text-xs flex items-center gap-3">
                <span className="font-bold text-cyan-900 dark:text-cyan-300">
                  {formatFullDateDisplay(hoveredBar.date)}:
                </span>
                <span className="font-extrabold text-emerald-600 dark:text-emerald-400">
                  {hoveredBar.uniqueVisitors} Unique
                </span>
                <span className="text-slate-500 dark:text-slate-400">
                  ({hoveredBar.totalPageViews} Views)
                </span>
              </div>
            )}
          </div>

          {/* Interactive Chart Container */}
          <div className="relative h-64 w-full flex items-end gap-1.5 sm:gap-2 pt-6 pb-6 border-b border-slate-100 dark:border-white/5">
            {summary?.history && summary.history.length > 0 ? (
              summary.history.map((record) => {
                const heightPercent = maxVisitorsInHistory > 0
                  ? Math.max(8, Math.round((record.uniqueVisitors / maxVisitorsInHistory) * 100))
                  : 8;
                const isHovered = hoveredBar?.date === record.date;

                return (
                  <div
                    key={record.date}
                    onMouseEnter={() => setHoveredBar(record)}
                    onMouseLeave={() => setHoveredBar(null)}
                    className="relative flex-1 h-full flex flex-col justify-end items-center group cursor-pointer"
                  >
                    {/* Tooltip on bar hover */}
                    <div
                      className={`absolute -top-12 z-20 pointer-events-none transition-all duration-200 ${
                        isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                      }`}
                    >
                      <div className="px-2.5 py-1 rounded-xl bg-slate-900 text-white text-[10px] font-bold shadow-xl whitespace-nowrap">
                        {record.uniqueVisitors} unique • {formatDateDisplay(record.date)}
                      </div>
                    </div>

                    {/* Bar */}
                    <div
                      style={{ height: `${heightPercent}%` }}
                      className={`w-full max-w-[32px] rounded-t-xl transition-all duration-300 ${
                        isHovered
                          ? 'bg-gradient-to-t from-cyan-500 to-emerald-400 shadow-lg scale-x-105'
                          : record.uniqueVisitors > 0
                          ? 'bg-gradient-to-t from-cyan-600/80 to-cyan-400 hover:from-cyan-500 hover:to-emerald-400'
                          : 'bg-slate-200 dark:bg-slate-800'
                      }`}
                    />

                    {/* Day label */}
                    <span className="text-[10px] font-medium text-slate-400 dark:text-slate-500 mt-2 truncate w-full text-center">
                      {record.date.slice(8)}
                    </span>
                  </div>
                );
              })
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-400 text-sm">
                No visitor data recorded yet for this range.
              </div>
            )}
          </div>

          <div className="flex items-center justify-between text-xs text-slate-400 dark:text-slate-500 pt-3">
            <span>← {range} Days Ago</span>
            <span>Date Range: UTC Calendar Days</span>
            <span>Today →</span>
          </div>
        </section>

        {/* Acquisition & Segmentation Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Device Breakdown */}
          <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-white/5 rounded-3xl p-6 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Monitor className="w-4 h-4 text-cyan-500" />
              Device Distribution
            </h3>

            {summary ? (
              (() => {
                const total =
                  (summary.deviceBreakdown.desktop || 0) +
                  (summary.deviceBreakdown.mobile || 0) +
                  (summary.deviceBreakdown.tablet || 0);
                const desktopPct = total > 0 ? Math.round((summary.deviceBreakdown.desktop / total) * 100) : 0;
                const mobilePct = total > 0 ? Math.round((summary.deviceBreakdown.mobile / total) * 100) : 0;
                const tabletPct = total > 0 ? Math.round((summary.deviceBreakdown.tablet / total) * 100) : 0;

                return (
                  <div className="space-y-4 pt-2">
                    {/* Desktop */}
                    <div>
                      <div className="flex justify-between text-xs font-semibold mb-1">
                        <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                          <Monitor className="w-3.5 h-3.5 text-cyan-500" /> Desktop
                        </span>
                        <span>{desktopPct}% ({summary.deviceBreakdown.desktop})</span>
                      </div>
                      <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div
                          style={{ width: `${desktopPct}%` }}
                          className="h-full bg-cyan-500 rounded-full transition-all duration-500"
                        />
                      </div>
                    </div>

                    {/* Mobile */}
                    <div>
                      <div className="flex justify-between text-xs font-semibold mb-1">
                        <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                          <Smartphone className="w-3.5 h-3.5 text-emerald-500" /> Mobile
                        </span>
                        <span>{mobilePct}% ({summary.deviceBreakdown.mobile})</span>
                      </div>
                      <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div
                          style={{ width: `${mobilePct}%` }}
                          className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                        />
                      </div>
                    </div>

                    {/* Tablet */}
                    <div>
                      <div className="flex justify-between text-xs font-semibold mb-1">
                        <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                          <Tablet className="w-3.5 h-3.5 text-purple-500" /> Tablet
                        </span>
                        <span>{tabletPct}% ({summary.deviceBreakdown.tablet})</span>
                      </div>
                      <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div
                          style={{ width: `${tabletPct}%` }}
                          className="h-full bg-purple-500 rounded-full transition-all duration-500"
                        />
                      </div>
                    </div>
                  </div>
                );
              })()
            ) : (
              <p className="text-xs text-slate-400">Loading device stats...</p>
            )}
          </div>

          {/* Browser Distribution */}
          <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-white/5 rounded-3xl p-6 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Globe className="w-4 h-4 text-emerald-500" />
              Browser Landscape
            </h3>

            {summary ? (
              (() => {
                const bb = summary.browserBreakdown;
                const total = bb.chrome + bb.safari + bb.firefox + bb.edge + bb.other;
                const browsers = [
                  { name: 'Chrome', count: bb.chrome, color: 'bg-emerald-500' },
                  { name: 'Safari', count: bb.safari, color: 'bg-cyan-500' },
                  { name: 'Edge', count: bb.edge, color: 'bg-blue-500' },
                  { name: 'Firefox', count: bb.firefox, color: 'bg-orange-500' },
                  { name: 'Other', count: bb.other, color: 'bg-slate-400' },
                ];

                return (
                  <div className="space-y-3 pt-2">
                    {browsers.map((b) => {
                      const pct = total > 0 ? Math.round((b.count / total) * 100) : 0;
                      return (
                        <div key={b.name} className="space-y-1">
                          <div className="flex justify-between text-xs font-semibold">
                            <span className="text-slate-700 dark:text-slate-300">{b.name}</span>
                            <span>{pct}% ({b.count})</span>
                          </div>
                          <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                            <div
                              style={{ width: `${pct}%` }}
                              className={`h-full ${b.color} rounded-full transition-all duration-500`}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })()
            ) : (
              <p className="text-xs text-slate-400">Loading browser stats...</p>
            )}
          </div>

          {/* Top Referrers */}
          <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-white/5 rounded-3xl p-6 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Compass className="w-4 h-4 text-purple-500" />
              Traffic Channels & Sources
            </h3>

            {summary && summary.topReferrers.length > 0 ? (
              <div className="space-y-2.5 pt-1">
                {summary.topReferrers.map((ref, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-white/5 text-xs font-semibold"
                  >
                    <span className="text-slate-800 dark:text-slate-200 truncate max-w-[170px]">
                      {ref.source}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-cyan-100 dark:bg-cyan-900/40 text-cyan-700 dark:text-cyan-300 font-bold">
                      {ref.count} visits ({ref.percentage}%)
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-400 pt-4 text-center">
                Direct / Organic marketing traffic will populate here.
              </p>
            )}
          </div>

        </section>

        {/* Daily History Table */}
        <section className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-white/5 rounded-3xl p-6 lg:p-8 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Calendar className="w-5 h-5 text-cyan-500" />
                Verified Daily Audit Log
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Detailed day-by-day record of unique human visitors and session metrics.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 dark:border-white/10 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  <th className="py-3 px-4">Calendar Date</th>
                  <th className="py-3 px-4">Daily Unique Visitors</th>
                  <th className="py-3 px-4">Total Pageviews</th>
                  <th className="py-3 px-4">Views / Visitor</th>
                  <th className="py-3 px-4">Verification Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                {summary?.history && summary.history.length > 0 ? (
                  [...summary.history]
                    .reverse()
                    .map((row) => {
                      const ratio = row.uniqueVisitors > 0
                        ? (row.totalPageViews / row.uniqueVisitors).toFixed(1)
                        : '0.0';

                      return (
                        <tr
                          key={row.date}
                          className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                        >
                          <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white whitespace-nowrap">
                            {formatFullDateDisplay(row.date)}
                          </td>
                          <td className="py-3.5 px-4 font-extrabold text-cyan-600 dark:text-cyan-400">
                            {row.uniqueVisitors}
                          </td>
                          <td className="py-3.5 px-4 font-medium text-slate-600 dark:text-slate-300">
                            {row.totalPageViews}
                          </td>
                          <td className="py-3.5 px-4 text-xs font-semibold text-slate-500 dark:text-slate-400">
                            {ratio}x
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/40">
                              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                              Deduplicated
                            </span>
                          </td>
                        </tr>
                      );
                    })
                ) : (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-slate-400 text-sm">
                      No daily records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Deduplication Guarantee Card */}
        <section className="bg-gradient-to-br from-slate-900 to-slate-950 text-white border border-cyan-500/20 rounded-3xl p-6 sm:p-8 shadow-xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5" />
                Data Integrity Standard
              </div>
              <h3 className="text-xl font-extrabold tracking-tight">
                How We Guarantee 100% Accurate Daily Unique Counts
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Marketing decisions require true human reach, not inflated pageview counters.
                Our engine enforces a 4-layer deduplication barrier:
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                  <strong>Zero Multiple Counting:</strong> 1 record per visitor per calendar day.
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  <strong>Bot & Spider Filter:</strong> Googlebot, crawlers & scrapers excluded.
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-purple-400" />
                  <strong>Admin Exemption:</strong> Dashboard visits never inflate marketing pool.
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                  <strong>Database Atomicity:</strong> Subcollection document locking prevents races.
                </li>
              </ul>
            </div>

            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 font-extrabold text-sm transition shadow-lg shrink-0"
            >
              Test Live Site Visit
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}
