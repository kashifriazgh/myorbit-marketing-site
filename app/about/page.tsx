'use client';

export default function About() {
  return (
    <section className="py-24 px-6 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      <div className="max-w-5xl mx-auto space-y-16">
        {/* Heading */}
        <div className="text-center space-y-4">
          <span className="inline-flex px-4 py-1 rounded-full text-xs uppercase tracking-[0.35em] bg-white/10 border border-white/10 text-cyan-200">
            About
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
            Our Story & Mission
          </h1>
          <p className="text-slate-300 max-w-3xl mx-auto text-lg">
            Learn why we built this app and how it helps users stay productive,
            organized, and motivated every day.
          </p>
        </div>

        {/* App Story */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-cyan-200">
            Why We Exist
          </h2>
          <p className="text-white/90 text-lg leading-relaxed">
            I found that many apps in the market don’t provide the local tone—they
            are designed for international users. In order to make an app that
            preserves the necessities of locals, we created this one.
          </p>
        </div>

        {/* Mission */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-cyan-200">Our Mission</h2>
          <p className="text-white/90 text-lg leading-relaxed">
            To make the first ever Pakistan-based web app that leverages AI to
            help users achieve higher productivity and manage their daily tasks
            effectively.
          </p>
        </div>

        {/* How It Helps Users */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-cyan-200">
            How It Helps You
          </h2>
          <p className="text-white/90 text-lg leading-relaxed">
            Our app allows users to:
          </p>
          <ul className="list-disc list-inside text-white/80 space-y-2">
            <li>Create and organize daily tasks</li>
            <li>Plan your day with schedules</li>
            <li>Manage finances, including money, incomes, expenses, and loans</li>
            <li>Create shopping lists for monthly or general needs</li>
            <li>Track habits and streaks</li>
            <li>Set and monitor personal goals</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
