import { Heart, Zap, Code2, Rocket, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

const flowNodes = [
  { icon: Heart, label: "Your Support" },
  { icon: Zap, label: "We Get Motivated" },
  { icon: Code2, label: "More Work on the App" },
  { icon: Rocket, label: "New Features Added Faster" },
];

export default function FoundingMemberSection() {
  return (
    <section className="relative overflow-hidden px-6 py-24 sm:py-28 bg-gradient-to-b from-white to-slate-50 dark:from-slate-950 dark:to-slate-900 border-t border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
      {/* ambient glow */}
      <div
        className="pointer-events-none absolute -top-32 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full blur-3xl opacity-50 dark:opacity-100"
        style={{
          background:
            "radial-gradient(circle, rgba(45,212,191,0.18), transparent 70%)",
        }}
      />
      <div
        className="pointer-events-none absolute bottom-0 right-0 h-80 w-80 rounded-full blur-3xl opacity-30 dark:opacity-70"
        style={{
          background:
            "radial-gradient(circle, rgba(34,211,238,0.12), transparent 70%)",
        }}
      />

      {/* heading */}
      <div className="relative mx-auto max-w-3xl text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-teal-500/30 bg-teal-500/5 dark:bg-teal-500/10 px-4 py-1.5 text-sm font-medium text-teal-600 dark:text-teal-300">
          <span className="h-1.5 w-1.5 rounded-full bg-teal-500 animate-pulse" />
          Founding Member Pricing
        </div>

        <h2 className="mt-6 text-3xl font-black tracking-tight sm:text-4xl md:text-5xl text-slate-900 dark:text-white leading-[1.1]">
          Your Annual Subscription{" "}
          <span className="bg-gradient-to-r from-teal-500 to-cyan-500 bg-clip-text text-transparent">
            Helps Build a Better Experience
          </span>
        </h2>

        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed sm:text-lg text-slate-650 dark:text-slate-300">
          This is your PKR 500 / year subscription (for limited time pricing) — and you get full app access today.
          Plus, your purchase helps us keep improving it with smarter AI, a more refined interface, and the features you’ve been asking for.
        </p>
      </div>

      {/* stage / honesty block */}
      <div className="relative mx-auto mt-12 max-w-2xl">
        <div className="rounded-[32px] border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 p-8 backdrop-blur-sm sm:p-10 shadow-xl dark:shadow-none">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-teal-500/30 bg-teal-500/5 dark:bg-teal-500/10 px-3 py-1 text-xs font-bold text-teal-600 dark:text-teal-300">
              <span className="h-1.5 w-1.5 rounded-full bg-teal-500" />
              Stage 01 — Introducing the Idea
            </span>
            <span className="h-px w-6 bg-slate-200 dark:bg-slate-800" />
            <span className="inline-flex items-center rounded-full border border-slate-200 dark:border-slate-800 px-3 py-1 text-xs font-medium text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/30">
              Next stages — Depends on your feedback
            </span>
          </div>

          <p className="mt-5 text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-300">
            Building a basic app is easy, but making one that actually adds a value into the daily life routine is a journey. And it takes efforts, time, energy and financial resources.
          </p>
          <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-300">
            Right now, MyOrbit is at <strong className="text-slate-850 dark:text-slate-100">Stage 01: introducing the idea</strong> to early users like you. We are constantly working on it and refining it based on feedback from you all.
          </p>
          <p className="mt-4 border-l-4 border-teal-500 dark:border-teal-500 pl-4 text-sm sm:text-base font-bold text-slate-800 dark:text-slate-200">
            Your support with an annual <span className="text-teal-600 dark:text-teal-400">PKR 500 / year</span> subscription directly supports building an app that actually serves you.
          </p>
        </div>
      </div>

      {/* flow diagram: support -> outcomes */}
      <div className="relative mx-auto mt-16 max-w-4xl">
        <div className="absolute left-6 top-0 bottom-0 w-px sm:hidden bg-gradient-to-b from-teal-400 to-cyan-500" />
        <div className="absolute left-0 right-0 top-6 hidden h-px sm:block bg-gradient-to-r from-teal-400 via-emerald-400 to-cyan-500" />

        <div className="relative flex flex-col gap-10 sm:flex-row sm:justify-between sm:gap-4">
          {flowNodes.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="relative flex items-center gap-4 sm:flex-col sm:items-center sm:gap-3 sm:text-center"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-teal-500/30 dark:border-teal-500/40 bg-white dark:bg-slate-900 shadow-md dark:shadow-none backdrop-blur-sm transition-transform duration-300 hover:scale-110 motion-reduce:transition-none">
                <Icon className="h-5 w-5 text-teal-600 dark:text-teal-300" />
              </div>
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 sm:max-w-[7rem]">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* actions */}
      <div className="relative mx-auto mt-12 flex max-w-2xl flex-col items-center gap-4 sm:flex-row sm:justify-center">
        <a
          href="#contact"
          className="group inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-teal-400 to-cyan-500 text-slate-900 font-bold px-7 py-4 text-sm transition-all duration-300 hover:scale-[1.03] hover:opacity-95 shadow-lg shadow-teal-500/25 dark:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 sm:w-auto text-center"
        >
          Get MyOrbit — PKR 500 / year
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none" />
        </a>
        <a
          href="https://myorbitdemo.netlify.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-full items-center justify-center rounded-2xl border border-teal-500/40 text-teal-600 dark:text-teal-300 font-bold px-7 py-4 text-sm hover:bg-teal-500/10 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 sm:w-auto text-center"
        >
          See Live Demo
        </a>
      </div>

      <p className="relative mx-auto mt-6 max-w-md text-center text-xs text-slate-500 dark:text-slate-400">
        PKR 500 / year subscription. Full app access from day one.
      </p>

      {/* Colored Notice Card */}
      <div className="relative mx-auto mt-8 max-w-2xl rounded-3xl border border-teal-500/30 bg-teal-500/10 dark:bg-teal-950/40 p-5 sm:p-6 backdrop-blur-md shadow-md">
        <div className="flex items-start gap-3.5">
          <div className="p-2 rounded-xl bg-teal-500/20 text-teal-600 dark:text-teal-300 border border-teal-500/30 shrink-0 mt-0.5">
            <Sparkles className="h-5 w-5 animate-pulse text-teal-500" />
          </div>
          <div className="space-y-1 text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-slate-200">
            <span className="block font-black uppercase tracking-wider text-teal-700 dark:text-teal-300 text-xs">
              🎁 Bonus Access Included
            </span>
            <p>
              By subscribing to MyOrbit today, you automatically unlock the access to our upcoming <strong className="text-teal-700 dark:text-teal-300">Web App for planning</strong> (special discounted price for you) — specially crafted for students, freelancers, and professionals to manage routines, work, and revenue in a smarter way.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}