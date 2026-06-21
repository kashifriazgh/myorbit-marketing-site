'use client';

import React from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Coins,
  ShieldCheck,
  AlertTriangle,
  Server,
  MapPin,
  Award,
  Scale
} from "lucide-react";

export default function TermsPage() {
  const sections = [
    {
      icon: Coins,
      title: "1. Pricing & Platform Dependencies",
      content: (
        <>
          <p>
            Our pricing is structured as a <strong>one-time setup fee</strong> to use the MyOrbit app. However, MyOrbit relies on third-party cloud infrastructure and database platforms, which may modify their terms, conditions, or pricing policies in the future.
          </p>
          <ul className="mt-3 space-y-2 list-disc list-inside text-slate-400 text-sm">
            <li>
              <strong>Hosting:</strong> Currently hosted on the Netlify platform, which provides a free tier covering up to 100 GB of bandwidth per month along with other baseline features.
            </li>
            <li>
              <strong>Database:</strong> Powered by Google Firebase, which includes a free tier of 1 GB storage, 50,000 daily read requests, and 20,000 daily write requests per project.
            </li>
            <li>
              <strong>AI Engines:</strong> Integrated with Groq AI API, currently offering a generous daily free API request limit.
            </li>
          </ul>
          <p className="mt-3 text-slate-400">
            These platforms reserve the right to alter their policies or pricing at any time. If these providers increase their fees or terminate their free tiers, the MyOrbit team is not responsible for any resulting changes or impacts on the service.
          </p>
        </>
      )
    },
    {
      icon: ShieldCheck,
      title: "2. Scope of 'Free Forever' Promise",
      content: (
        <>
          <p>
            When we specify that you can use the MyOrbit app <em>&ldquo;free forever&rdquo;</em>, this promise refers strictly to the core interface and software features that we directly own and build.
          </p>
          <p className="mt-2 text-slate-400">
            This does not apply to background operations that rely on external paid services. For example, processing and dispatching WhatsApp messages, handling push notifications, or executing cron tasks while you are offline requires 24/7 server infrastructure. Because these third-party integrations incur ongoing usage costs, features linked to these background capabilities cannot be provided free of charge.
          </p>
        </>
      )
    },
    {
      icon: AlertTriangle,
      title: "3. Service Continuity & Upgrades",
      content: (
        <>
          <p>
            We reserve the right to modify, adapt, or suspend app upgrades or services in the future due to external factors beyond our control, such as national crises, telecommunications disruptions, or changes in government policies.
          </p>
          <p className="mt-2 text-slate-400 font-medium text-teal-400">
            Despite this disclaimer, our goal and honest mission remain to continuously improve MyOrbit, making it a reliable, high-performance, and long-lasting productivity tool for all our users.
          </p>
        </>
      )
    },
    {
      icon: Server,
      title: "4. Data Storage & Hosting Disclaimer",
      content: (
        <>
          <p>
            MyOrbit utilizes Google Firebase for database storage and Netlify for site hosting.
          </p>
          <p className="mt-2 text-slate-400">
            In the event that Firebase or Netlify experiences data security breaches, service interruptions, or system outages, the MyOrbit team cannot be held liable. However, we are committed to security and will proactively notify you with updates should any such event occur.
          </p>
        </>
      )
    },
    {
      icon: MapPin,
      title: "5. Remote Operation Model",
      content: (
        <>
          <p>
            MyOrbit does not maintain a physical headquarters or official public office space.
          </p>
          <p className="mt-2 text-slate-400">
            We operate as a fully remote team collaborating in a hybrid model (utilizing online coordination alongside periodic in-person meetings).
          </p>
        </>
      )
    },
    {
      icon: Award,
      title: "6. No Physical Certification",
      content: (
        <>
          <p>
            MyOrbit is a digital-only software solution.
          </p>
          <p className="mt-2 text-slate-400">
            We do not issue physical printed certificates, offline badges, or tangible merchandise. All features, badges (such as the Founding Member badge), and rewards exist solely in a digital format within the application interface.
          </p>
        </>
      )
    },
    {
      icon: Scale,
      title: "7. Taxation Compliance",
      content: (
        <>
          <p>
            Currently, MyOrbit does not collect taxes on purchase amounts.
          </p>
          <p className="mt-2 text-slate-400">
            If local tax codes or government policies regarding digital software services change in the future, we and our users will be required to comply with the updated regulations.
          </p>
        </>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans transition-colors duration-300 relative overflow-hidden">
      {/* Glow Effects */}
      <div
        className="pointer-events-none absolute -left-48 -top-48 h-96 w-96 rounded-full blur-3xl opacity-30"
        style={{
          background: "radial-gradient(circle, rgba(20,184,166,0.3), transparent 70%)",
        }}
      />
      <div
        className="pointer-events-none absolute -right-48 bottom-0 h-96 w-96 rounded-full blur-3xl opacity-20"
        style={{
          background: "radial-gradient(circle, rgba(6,182,212,0.25), transparent 70%)",
        }}
      />

      {/* Header */}
      <header className="relative z-10 border-b border-slate-900 bg-slate-950/75 backdrop-blur-md">
        <div className="mx-auto max-w-6xl px-6 py-5 flex items-center justify-between">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Home
          </Link>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Terms of Service
          </span>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-grow mx-auto max-w-4xl px-6 py-16 sm:py-24">
        {/* Title */}
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
          <span className="inline-flex px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-[0.25em] bg-slate-900 border border-slate-800 text-slate-400">
            Legal Agreement
          </span>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-none text-white">
            Terms &{" "}
            <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
              Conditions
            </span>
          </h1>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            Please read these terms and conditions carefully. They outline the rights, limitations, and platform dependencies associated with using MyOrbit.
          </p>
        </div>

        {/* Terms list */}
        <div className="space-y-6">
          {sections.map((sect, idx) => {
            const Icon = sect.icon;
            return (
              <div
                key={idx}
                className="rounded-3xl border border-slate-900 bg-slate-900/30 p-6 sm:p-8 backdrop-blur-sm hover:border-slate-800 transition-colors duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-teal-500/20 bg-teal-500/5">
                    <Icon className="h-5 w-5 text-teal-400" />
                  </div>
                  <div className="space-y-3 flex-grow text-slate-300 text-sm sm:text-base leading-relaxed">
                    <h2 className="text-lg font-bold text-white">
                      {sect.title}
                    </h2>
                    <div className="space-y-2">
                      {sect.content}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Contact/Support Footer */}
        <div className="mt-16 text-center text-sm text-slate-500 space-y-2">
          <p>Have questions about these terms?</p>
          <Link href="/#contact" className="text-teal-400 hover:text-teal-300 font-semibold transition-colors">
            Get in touch with us
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 py-10 bg-slate-950 text-center">
        <div className="mx-auto max-w-6xl px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <p>© {new Date().getFullYear()} MyOrbit. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/" className="hover:text-slate-300 transition-colors">Home</Link>
            <Link href="/about" className="hover:text-slate-300 transition-colors">About</Link>
            <Link href="/roadmap" className="hover:text-slate-300 transition-colors">Roadmap</Link>
            <Link href="/privacy" className="hover:text-slate-300 transition-colors">Privacy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
