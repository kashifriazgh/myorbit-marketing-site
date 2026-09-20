"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Calendar,
  CheckSquare,
  Target,
  Wallet,
  Bell,
  Check,
  Loader2,
  Activity,
  Zap,
  TrendingUp,
  Cpu,
} from "lucide-react";

/* Reusable Animated AI Mascot Robot SVG Logo */
function RobotLogo({ className = "w-full h-full" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" className={className}>
      <defs>
        <linearGradient id="goldPlate" x1="20%" y1="0%" x2="80%" y2="100%">
          <stop offset="0%" stopColor="#fffae0" />
          <stop offset="35%" stopColor="#fde047" />
          <stop offset="85%" stopColor="#eab308" />
          <stop offset="100%" stopColor="#ca8a04" />
        </linearGradient>

        <radialGradient id="goldDome" cx="40%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="40%" stopColor="#fef08a" />
          <stop offset="80%" stopColor="#eab308" />
          <stop offset="100%" stopColor="#a16207" />
        </radialGradient>

        <linearGradient id="armorBlue" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e0f2fe" />
          <stop offset="40%" stopColor="#38bdf8" />
          <stop offset="85%" stopColor="#0284c7" />
          <stop offset="100%" stopColor="#0369a1" />
        </linearGradient>

        <linearGradient id="darkMetal" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#f8fafc" />
          <stop offset="50%" stopColor="#e2e8f0" />
          <stop offset="100%" stopColor="#cbd5e1" />
        </linearGradient>

        <linearGradient id="chromeLimb" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="40%" stopColor="#f1f5f9" />
          <stop offset="70%" stopColor="#cbd5e1" />
          <stop offset="100%" stopColor="#94a3b8" />
        </linearGradient>

        <linearGradient id="wingGlass" x1="0%" y1="0%" x2="100%" y2="80%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
          <stop offset="40%" stopColor="#7dd3fc" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.2" />
        </linearGradient>

        <filter id="neonCyanGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="8" result="glow" />
          <feMerge>
            <feMergeNode in="glow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <filter id="lightBloom" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <radialGradient id="eyePupil" cx="45%" cy="40%" r="55%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="40%" stopColor="#38bdf8" />
          <stop offset="75%" stopColor="#0284c7" />
          <stop offset="100%" stopColor="#0369a1" />
        </radialGradient>
      </defs>

      <style>{`
        .mech-hover {
          animation: hoverFly 4s ease-in-out infinite alternate;
          transform-origin: 400px 480px;
        }
        .wing-flap-left {
          transform-origin: 290px 450px;
          animation: wingLeft 0.16s ease-in-out infinite alternate;
        }
        .wing-flap-right {
          transform-origin: 510px 450px;
          animation: wingRight 0.16s ease-in-out infinite alternate;
        }
        .eye-scan {
          animation: eyeTracking 6s ease-in-out infinite;
        }
        .eyelid-blink {
          animation: roboticBlink 6s ease-in-out infinite;
          transform-origin: 400px 300px;
        }
        .antenna-sweep-left {
          transform-origin: 340px 170px;
          animation: antLeft 3s ease-in-out infinite alternate;
        }
        .antenna-sweep-right {
          transform-origin: 460px 170px;
          animation: antRight 3s ease-in-out infinite alternate-reverse;
        }
        .reticle-spin {
          transform-origin: 485px 335px;
          animation: spinReticle 10s linear infinite;
        }
        .circuit-pulse {
          animation: neonPulse 2.5s ease-in-out infinite alternate;
        }
        @keyframes hoverFly {
          0%   { transform: translateY(0px) rotate(0deg); }
          50%  { transform: translateY(-16px) rotate(0.8deg); }
          100% { transform: translateY(10px) rotate(-0.8deg); }
        }
        @keyframes wingLeft {
          0%   { transform: rotate(0deg) scaleX(1); opacity: 0.95; }
          100% { transform: rotate(-14deg) scaleX(0.72) skewY(-8deg); opacity: 0.7; }
        }
        @keyframes wingRight {
          0%   { transform: rotate(0deg) scaleX(1); opacity: 0.95; }
          100% { transform: rotate(14deg) scaleX(0.72) skewY(8deg); opacity: 0.7; }
        }
        @keyframes eyeTracking {
          0%, 18%, 100% { transform: translate(0, 0); }
          22%, 40%      { transform: translate(8px, -4px); }
          45%, 65%      { transform: translate(-8px, 4px); }
          70%, 85%      { transform: translate(0, 7px); }
        }
        @keyframes roboticBlink {
          0%, 48%, 52%, 100% { transform: scaleY(0); opacity: 0; }
          50%                { transform: scaleY(1.1); opacity: 1; }
        }
        @keyframes antLeft {
          0%   { transform: rotate(0deg); }
          100% { transform: rotate(-7deg); }
        }
        @keyframes antRight {
          0%   { transform: rotate(0deg); }
          100% { transform: rotate(7deg); }
        }
        @keyframes spinReticle {
          100% { transform: rotate(360deg); }
        }
        @keyframes neonPulse {
          0%   { filter: drop-shadow(0 0 4px #38bdf8); opacity: 0.9; }
          100% { filter: drop-shadow(0 0 16px #00f0ff); opacity: 1; }
        }
      `}</style>

      {/* Circuit Lines */}
      <g stroke="#38bdf8" strokeWidth="2" fill="none" opacity="0.6">
        <path d="M 50 150 L 180 150 L 230 200 L 230 380" />
        <circle cx="50" cy="150" r="5" fill="#38bdf8" />
        <circle cx="230" cy="380" r="4" fill="#7dd3fc" />
        <path d="M 80 700 L 150 700 L 210 640 L 210 500" />
        <circle cx="80" cy="700" r="5" fill="#38bdf8" />
        <path d="M 750 150 L 620 150 L 570 200 L 570 380" />
        <circle cx="750" cy="150" r="5" fill="#38bdf8" />
        <path d="M 720 700 L 650 700 L 590 640 L 590 500" />
        <circle cx="720" cy="700" r="5" fill="#38bdf8" />
      </g>

      <g className="mech-hover">

        <g className="wing-flap-left">
          <path d="M 280 430 C 180 340, 70 320, 60 410 C 50 490, 160 550, 280 470 Z"
                fill="url(#wingGlass)" stroke="#38bdf8" strokeWidth="3" filter="url(#neonCyanGlow)" />
          <path d="M 120 400 L 220 420 L 260 450 M 110 440 L 180 450 L 230 465 M 150 480 L 210 480"
                stroke="#ffffff" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.9" />
          <circle cx="120" cy="400" r="3.5" fill="#ffffff" />
          <circle cx="110" cy="440" r="3.5" fill="#ffffff" />
          <circle cx="150" cy="480" r="3.5" fill="#ffffff" />
        </g>

        <g className="wing-flap-right">
          <path d="M 520 430 C 620 340, 730 320, 740 410 C 750 490, 640 550, 520 470 Z"
                fill="url(#wingGlass)" stroke="#38bdf8" strokeWidth="3" filter="url(#neonCyanGlow)" />
          <path d="M 680 400 L 580 420 L 540 450 M 690 440 L 620 450 L 570 465 M 650 480 L 590 480"
                stroke="#ffffff" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.9" />
          <circle cx="680" cy="400" r="3.5" fill="#ffffff" />
          <circle cx="690" cy="440" r="3.5" fill="#ffffff" />
          <circle cx="650" cy="480" r="3.5" fill="#ffffff" />
        </g>

        <g className="antenna-sweep-left">
          <path d="M 345 170 C 330 110, 270 90, 250 65" fill="none" stroke="#cbd5e1" strokeWidth="8" strokeLinecap="round" />
          <circle cx="245" cy="60" r="18" fill="url(#darkMetal)" stroke="#38bdf8" strokeWidth="2.5" />
          <circle cx="245" cy="60" r="9" fill="#0284c7" />
          <circle cx="243" cy="58" r="4" fill="#ffffff" filter="url(#lightBloom)" />
        </g>

        <g className="antenna-sweep-right">
          <path d="M 455 170 C 470 110, 530 90, 550 65" fill="none" stroke="#cbd5e1" strokeWidth="8" strokeLinecap="round" />
          <circle cx="555" cy="60" r="18" fill="url(#darkMetal)" stroke="#38bdf8" strokeWidth="2.5" />
          <circle cx="555" cy="60" r="9" fill="#0284c7" />
          <circle cx="553" cy="58" r="4" fill="#ffffff" filter="url(#lightBloom)" />
        </g>

        <polygon points="400,695 380,630 420,630" fill="url(#darkMetal)" stroke="#94a3b8" strokeWidth="2" />
        <polygon points="400,685 390,640 410,640" fill="#38bdf8" filter="url(#neonCyanGlow)" />

        <g>
          <ellipse cx="400" cy="545" rx="145" ry="120" fill="url(#goldDome)" stroke="#ca8a04" strokeWidth="3" />

          <path d="M 270 500 Q 400 550 530 500 L 535 535 Q 400 590 265 535 Z" fill="#f8fafc" stroke="#0284c7" strokeWidth="2" />
          <path d="M 285 570 Q 400 625 515 570 L 505 605 Q 400 660 295 605 Z" fill="#f8fafc" stroke="#0284c7" strokeWidth="2" />

          <path d="M 330 520 Q 400 550 470 520" stroke="#00f0ff" strokeWidth="4" strokeLinecap="round" fill="none" className="circuit-pulse" />
          <path d="M 340 590 Q 400 620 460 590" stroke="#00f0ff" strokeWidth="4" strokeLinecap="round" fill="none" className="circuit-pulse" />

          <g stroke="#eab308" strokeWidth="1.2" fill="none" opacity="0.8">
            <polygon points="400,465 412,472 412,486 400,493 388,486 388,472" />
            <polygon points="425,480 437,487 437,501 425,508 413,501 413,487" />
            <polygon points="375,480 387,487 387,501 375,508 363,501 363,487" />
          </g>
        </g>

        <g>
          <circle cx="285" cy="460" r="14" fill="url(#darkMetal)" stroke="#94a3b8" strokeWidth="2" />
          <path d="M 285 460 L 220 440 L 175 410" fill="none" stroke="url(#chromeLimb)" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="220" cy="440" r="9" fill="#38bdf8" />
          <circle cx="175" cy="410" r="13" fill="url(#darkMetal)" />
          <path d="M 175 410 L 145 385 M 175 410 L 140 405 M 175 410 L 145 425" stroke="url(#chromeLimb)" strokeWidth="5" strokeLinecap="round" />
        </g>

        <g>
          <circle cx="295" cy="520" r="13" fill="url(#darkMetal)" stroke="#94a3b8" strokeWidth="2" />
          <path d="M 295 520 L 235 535 L 180 545" fill="none" stroke="url(#chromeLimb)" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="235" cy="535" r="8" fill="#38bdf8" />
          <circle cx="180" cy="545" r="12" fill="url(#darkMetal)" />
          <path d="M 180 545 L 150 530 M 180 545 L 145 550 M 180 545 L 155 570" stroke="url(#chromeLimb)" strokeWidth="4.5" strokeLinecap="round" />
        </g>

        <g>
          <circle cx="515" cy="460" r="14" fill="url(#darkMetal)" stroke="#94a3b8" strokeWidth="2" />
          <path d="M 515 460 L 580 440 L 625 410" fill="none" stroke="url(#chromeLimb)" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="580" cy="440" r="9" fill="#38bdf8" />
          <circle cx="625" cy="410" r="13" fill="url(#darkMetal)" />
          <path d="M 625 410 L 655 385 M 625 410 L 660 405 M 625 410 L 655 425" stroke="url(#chromeLimb)" strokeWidth="5" strokeLinecap="round" />
        </g>

        <g>
          <circle cx="505" cy="520" r="13" fill="url(#darkMetal)" stroke="#94a3b8" strokeWidth="2" />
          <path d="M 505 520 L 565 535 L 620 545" fill="none" stroke="url(#chromeLimb)" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="565" cy="535" r="8" fill="#38bdf8" />
          <circle cx="620" cy="545" r="12" fill="url(#darkMetal)" />
          <path d="M 620 545 L 650 530 M 620 545 L 655 550 M 620 545 L 645 570" stroke="url(#chromeLimb)" strokeWidth="4.5" strokeLinecap="round" />
        </g>

        <g>
          <path d="M 330 635 L 305 690 L 270 720" fill="none" stroke="url(#armorBlue)" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="305" cy="690" r="11" fill="url(#darkMetal)" stroke="#38bdf8" strokeWidth="2" />
          <ellipse cx="260" cy="730" rx="25" ry="14" fill="url(#goldPlate)" stroke="#ca8a04" strokeWidth="2" />
          <rect x="245" y="725" width="28" height="6" rx="3" fill="#00f0ff" filter="url(#lightBloom)" />
        </g>

        <g>
          <path d="M 470 635 L 495 690 L 530 720" fill="none" stroke="url(#armorBlue)" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="495" cy="690" r="11" fill="url(#darkMetal)" stroke="#38bdf8" strokeWidth="2" />
          <ellipse cx="540" cy="730" rx="25" ry="14" fill="url(#goldPlate)" stroke="#ca8a04" strokeWidth="2" />
          <rect x="527" y="725" width="28" height="6" rx="3" fill="#00f0ff" filter="url(#lightBloom)" />
        </g>

        <g>
          <path d="M 310 435 Q 400 460 490 435 L 475 490 Q 400 525 325 490 Z" fill="url(#armorBlue)" stroke="#38bdf8" strokeWidth="3" />
          <polygon points="400,455 416,464 416,482 400,491 384,482 384,464" fill="#ffffff" stroke="#38bdf8" strokeWidth="2" />
          <circle cx="400" cy="473" r="6" fill="#00f0ff" filter="url(#neonCyanGlow)" />
        </g>

        <g>
          <ellipse cx="400" cy="300" rx="170" ry="155" fill="url(#goldDome)" stroke="#ca8a04" strokeWidth="3.5" />

          <path d="M 300 205 Q 400 160 500 205 L 485 245 Q 400 215 315 245 Z" fill="url(#armorBlue)" stroke="#38bdf8" strokeWidth="2.5" />
          <circle cx="400" cy="205" r="4.5" fill="#ffffff" filter="url(#lightBloom)" />

          <g stroke="#eab308" strokeWidth="1.3" fill="none" opacity="0.8">
            <polygon points="400,240 412,247 412,261 400,268 388,261 388,247" />
            <polygon points="426,255 438,262 438,276 426,283 414,276 414,262" />
            <polygon points="374,255 386,262 386,276 374,283 362,276 362,262" />
          </g>

          <rect x="220" y="270" width="16" height="55" rx="7" fill="url(#darkMetal)" stroke="#38bdf8" strokeWidth="2" />
          <rect x="564" y="270" width="16" height="55" rx="7" fill="url(#darkMetal)" stroke="#38bdf8" strokeWidth="2" />

          <ellipse cx="400" cy="365" rx="65" ry="38" fill="url(#goldPlate)" />
          <circle cx="392" cy="355" r="3.5" fill="#ca8a04" />
          <circle cx="408" cy="355" r="3.5" fill="#ca8a04" />

          <path d="M 355 375 Q 400 425 445 375" fill="#fef08a" stroke="#ca8a04" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M 378 395 Q 400 415 422 395" fill="#f43f5e" />
        </g>

        <g>
          <ellipse cx="315" cy="335" rx="48" ry="62" fill="#ffffff" stroke="#94a3b8" strokeWidth="4" />

          <g className="eye-scan">
            <ellipse cx="320" cy="335" rx="34" ry="44" fill="url(#eyePupil)" />
            <circle cx="320" cy="335" r="24" fill="none" stroke="#38bdf8" strokeDasharray="6,4" strokeWidth="2" opacity="0.9" />
            <ellipse cx="320" cy="335" rx="18" ry="24" fill="#0284c7" />
            <circle cx="308" cy="315" r="10" fill="#ffffff" opacity="0.95" />
            <circle cx="328" cy="345" r="4.5" fill="#ffffff" opacity="0.85" />
          </g>
        </g>

        <g>
          <ellipse cx="485" cy="335" rx="48" ry="62" fill="#ffffff" stroke="#94a3b8" strokeWidth="4" />

          <g className="eye-scan">
            <ellipse cx="480" cy="335" rx="34" ry="44" fill="url(#eyePupil)" />
            <ellipse cx="480" cy="335" rx="18" ry="24" fill="#0284c7" />
            <circle cx="468" cy="315" r="10" fill="#ffffff" opacity="0.95" />
            <circle cx="488" cy="345" r="4.5" fill="#ffffff" opacity="0.85" />
          </g>

          <g className="reticle-spin">
            <circle cx="485" cy="335" r="40" fill="none" stroke="#00f0ff" strokeWidth="2" strokeDasharray="14,12,6,12" opacity="0.9" filter="url(#lightBloom)" />
            <path d="M 485 288 L 485 296 M 485 374 L 485 382 M 438 335 L 446 335 M 524 335 L 532 335" stroke="#00f0ff" strokeWidth="2.5" />
          </g>
        </g>

        <g className="eyelid-blink">
          <ellipse cx="315" cy="335" rx="50" ry="64" fill="url(#armorBlue)" opacity="0.95" />
          <line x1="265" y1="335" x2="365" y2="335" stroke="#00f0ff" strokeWidth="4" filter="url(#neonCyanGlow)" />
          <ellipse cx="485" cy="335" rx="50" ry="64" fill="url(#armorBlue)" opacity="0.95" />
          <line x1="435" y1="335" x2="535" y2="335" stroke="#00f0ff" strokeWidth="4" filter="url(#neonCyanGlow)" />
        </g>

      </g>
    </svg>
  );
}

/* Item 2 & 3: Live Typewriter Goal Creation + 4 AI Processing Steps */
function LiveGoalCreationWorkflow() {
  const goalTitleFull = "Reading the Book 'Atomic Habits'";
  const [typedText, setTypedText] = useState("");
  const [isCreated, setIsCreated] = useState(false);
  const [completedCount, setCompletedCount] = useState(0);

  useEffect(() => {
    let isCancelled = false;

    async function runSequence() {
      while (!isCancelled) {
        // Reset state
        setTypedText("");
        setIsCreated(false);
        setCompletedCount(0);

        // Step 1: Typewriter effect
        for (let i = 1; i <= goalTitleFull.length; i++) {
          if (isCancelled) return;
          setTypedText(goalTitleFull.slice(0, i));
          await new Promise((r) => setTimeout(r, 45));
        }

        if (isCancelled) return;
        // Mark as Created Successfully
        setIsCreated(true);
        await new Promise((r) => setTimeout(r, 700));

        // Step 2: Trigger 4 AI Processing steps sequentially
        for (let step = 1; step <= 4; step++) {
          if (isCancelled) return;
          setCompletedCount(step);
          await new Promise((r) => setTimeout(r, 1400));
        }

        // Hold completed state before restarting
        await new Promise((r) => setTimeout(r, 3800));
      }
    }

    runSequence();
    return () => {
      isCancelled = true;
    };
  }, []);

  const processes = [
    {
      id: 1,
      text: "Goal is Achievable.",
      badge: "Feasibility Check",
    },
    {
      id: 2,
      text: 'Get the Book from "Abdullah Books"',
      badge: "Suggested Todo",
    },
    {
      id: 3,
      text: "Scheduled Reading time",
      badge: "Suggested Schedule : Daily 9:00 PM",
    },
    {
      id: 4,
      text: "Reminder Set",
      badge: "Suggested: Thrice a week at 5 PM",
    },
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Live Goal Creation Input Card */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md">
        <div className="flex items-center gap-3.5 min-w-0 flex-1">
          
          <div className="min-w-0 flex-1">
            <span className="block font-bold text-slate-900 dark:text-white text-xs sm:text-sm truncate">
              &ldquo;{typedText}&rdquo;
              {!isCreated && (
                <span className="inline-block w-1.5 h-4 ml-1 bg-cyan-500 animate-pulse align-middle" />
              )}
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
              Target: 30 Days · Learning Category
            </span>
          </div>
        </div>

        <div className="shrink-0 self-end sm:self-auto">
          {isCreated ? (
            <motion.span
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 text-xs font-black shadow-xs"
            >
              <Check className="w-3.5 h-3.5 text-emerald-500 stroke-[3]" />
              Goal Created Successfully!
            </motion.span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-300 border border-cyan-500/20 text-xs font-bold animate-pulse">
              <Loader2 className="w-3.5 h-3.5 animate-spin text-cyan-500" />
              User Creating Goal...
            </span>
          )}
        </div>
      </div>

      {/* AI Processing Transition Header */}
      <div className="flex items-center gap-2 px-1 pt-1">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
        </span>
        <span className="text-xs font-black uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
          AI processing
        </span>
        <div className="flex-1 h-px bg-slate-200 dark:bg-slate-800/80 ml-2" />
      </div>

      {/* 4 AI Processing Steps */}
      <ul className="flex flex-col gap-3">
        {processes.map((proc, index) => {
          const isDone = index < completedCount;
          const isProcessing = index === completedCount && isCreated;

          return (
            <li
              key={proc.id}
              className={`flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-4 rounded-xl border p-3.5 sm:px-4 sm:py-3.5 transition-all duration-500 ${
                isDone
                  ? "bg-emerald-50/80 dark:bg-emerald-950/30 border-emerald-500/40 text-emerald-900 dark:text-emerald-200 shadow-xs"
                  : isProcessing
                  ? "bg-cyan-50/60 dark:bg-cyan-950/20 border-cyan-400 dark:border-cyan-500/60 shadow-sm"
                  : "bg-white dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 opacity-60"
              }`}
            >
              <div className="flex items-start sm:items-center gap-3 min-w-0 flex-1">
                {/* Step indicator */}
                <span className="grid h-7 w-7 sm:h-8 sm:w-8 shrink-0 place-items-center rounded-lg relative overflow-hidden">
                  {isDone ? (
                    <motion.span
                      initial={{ opacity: 0, scale: 0.4 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="grid h-7 w-7 sm:h-8 sm:w-8 place-items-center rounded-lg bg-emerald-500 text-white shadow-sm"
                    >
                      <Check className="h-4 w-4 stroke-[3]" />
                    </motion.span>
                  ) : isProcessing ? (
                    <span className="grid h-7 w-7 sm:h-8 sm:w-8 place-items-center rounded-lg bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 border border-cyan-400/30">
                      <Loader2 className="h-4 w-4 animate-spin" />
                    </span>
                  ) : (
                    <span className="grid h-7 w-7 sm:h-8 sm:w-8 place-items-center rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-400 font-bold text-xs">
                      {proc.id}
                    </span>
                  )}
                </span>

                {/* Step Title (Item 3: text fits comfortably on mobile screens) */}
                <span
                  className={`text-xs sm:text-sm font-bold leading-relaxed transition-all duration-700 ease-out whitespace-normal break-words ${
                    isDone
                      ? "text-slate-900 dark:text-white blur-none opacity-100"
                      : isProcessing
                      ? "text-slate-700/80 dark:text-slate-300/80 blur-[2px] opacity-80 animate-pulse select-none"
                      : "text-slate-400 dark:text-slate-500 blur-[3px] opacity-40 select-none"
                  }`}
                >
                  {proc.id}. {proc.text}
                </span>
              </div>

              {/* Step Label / Badge (Item 3: smaller font size & on a separate line below on mobile) */}
              <div className="self-end sm:self-auto pl-10 sm:pl-0">
                <span
                  className={`inline-block text-[10px] sm:text-xs font-extrabold px-2.5 py-1 rounded-full transition-all duration-700 ease-out ${
                    isDone
                      ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 blur-none opacity-100"
                      : isProcessing
                      ? "bg-cyan-500/20 text-cyan-600 dark:text-cyan-300 border border-cyan-400/30 blur-[1px] opacity-80 animate-pulse select-none"
                      : "text-slate-400 bg-slate-100 dark:bg-slate-800 blur-[2px] opacity-40 select-none"
                  }`}
                >
                  {isDone ? `${proc.badge} ✓` : proc.badge}
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default function AiFeatureShowcase() {
  return (
    <section id="preview" className="relative isolate overflow-hidden bg-slate-50 dark:bg-[#040d1a] py-24 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      {/* Background Ambient Glowing Blobs */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 h-[45rem] w-[45rem] rounded-full bg-gradient-to-tr from-cyan-400/25 via-sky-300/20 to-indigo-400/20 blur-3xl dark:from-cyan-500/15 dark:via-indigo-500/15 dark:to-sky-500/15" />
      </div>

      <div className="mx-auto max-w-6xl space-y-20">

        {/* ========================================================================= */}
        {/* SECTION 1: AI LOGO & HEADER SEQUENCE                                       */}
        {/* ========================================================================= */}
        <div className="text-center max-w-4xl mx-auto space-y-8">
          
          {/* Item 1: Main Mascot Logo Container resized to ~65% size */}
          <div className="flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative w-40 h-40 sm:w-52 sm:h-52 flex items-center justify-center filter drop-shadow-[0_0_25px_rgba(56,189,248,0.4)]"
            >
              <RobotLogo className="w-full h-full" />
            </motion.div>
          </div>

          {/* Headline with Inline Small Robot Logo Badge */}
          <div className="space-y-4">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-700 dark:text-cyan-300 text-xs sm:text-sm font-extrabold tracking-widest uppercase shadow-sm">
              <Sparkles className="w-4 h-4 text-cyan-500 animate-pulse" />
              MyOrbit Intelligence Engine
            </span>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.12]">
              <span className="font-extrabold bg-gradient-to-r from-cyan-500 via-sky-400 to-indigo-500 bg-clip-text text-transparent">
                Apis
              </span>{" "}
              <span className="inline-flex items-center align-middle mx-1">
                <span className="relative inline-flex h-10 w-10 sm:h-14 sm:w-14 items-center justify-center overflow-hidden rounded-2xl border border-cyan-400/40 bg-white/90 dark:bg-slate-900/90 shadow-xl shadow-cyan-500/20 backdrop-blur-md p-1">
                  <RobotLogo className="w-full h-full scale-110" />
                </span>
              </span>{" "}
              AI Agent is Learning Continuously from your activities.
            </h1>
          </div>

          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed font-medium max-w-3xl mx-auto">
            Your schedules, tasks, goals and financial activity create context. MyOrbit can use that context to help you make better decisions and surface useful insights.
          </p>

        </div>

        {/* ========================================================================= */}
        {/* SECTION 2: HOW AI WORKS BEHIND THE SCENES (LIVE TYPEWRITER + 4 STEPS)      */}
        {/* ========================================================================= */}
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-12 shadow-sm space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="px-4 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs sm:text-sm font-extrabold uppercase tracking-widest">
              Behind The Scenes Intelligence
            </span>
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
              How Activity Context Transforms Into AI Insights
            </h3>
            <p className="text-sm sm:text-base font-medium text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              When you create a goal, Apis AI works in the background to analyze your routines, schedules, and priorities.
            </p>
          </div>

          {/* Live Typewriter Goal Creation & 4 AI Steps Sequence */}
          <LiveGoalCreationWorkflow />
        </div>

        {/* ========================================================================= */}
        {/* SECTION 3: ITEM 4 — REAL-TIME AI INSIGHTS DASHBOARD PANEL                 */}
        {/* ========================================================================= */}
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-[#071324]/95 p-6 sm:p-10 shadow-2xl backdrop-blur-xl space-y-6">
          
          {/* Dashboard Header Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-cyan-500/15 text-cyan-500 border border-cyan-500/30">
                <Cpu className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <h4 className="text-sm font-black uppercase tracking-wider text-slate-900 dark:text-white">
                    Live AI Intelligence Dashboard
                  </h4>
                </div>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  Continuous Context Stream · Auto-Generated Nudges
                </span>
              </div>
            </div>

            {/* Live Stats Indicators */}
            <div className="flex items-center gap-2 text-[11px] font-bold">
              <span className="px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-cyan-500" />
                14 Signals Tracked
              </span>
              <span className="px-3 py-1 rounded-lg bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-emerald-500" />
                3 Actionable Nudges
              </span>
            </div>
          </div>

          {/* Dashboard Cards Grid (3 Live Insight Modules) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            
            {/* Insight Widget 1: Tasks Overload */}
            <motion.div
              whileHover={{ y: -3 }}
              className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800 flex flex-col justify-between space-y-4 shadow-sm hover:border-cyan-400/50 transition-all"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 font-black text-slate-900 dark:text-white uppercase tracking-wider text-[11px]">
                  <CheckSquare className="w-4 h-4 text-cyan-500" />
                  Task Schedule Balance
                </span>
                <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20">
                  9 Tasks Today
                </span>
              </div>
              
              <div className="space-y-2.5">
                <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 leading-relaxed">
                  &ldquo;For tomorrow, you have 9 tasks, which may be hard to accomplish. Reschedule these 3 tasks to next day:&rdquo;
                </p>

                <div className="p-3 rounded-xl bg-white dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 space-y-1.5 text-[11px] font-medium text-slate-700 dark:text-slate-300">
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-500 shrink-0" />
                    <span className="truncate">1. Review Monthly Tax Filing</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-500 shrink-0" />
                    <span className="truncate">2. Organize Desktop Documents</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-500 shrink-0" />
                    <span className="truncate">3. Update Client Feedback Notes</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-slate-950 text-xs font-black transition-all shadow-sm"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Auto-Reschedule 3 Tasks</span>
              </button>
            </motion.div>

            {/* Insight Widget 2: Finance Nudge */}
            <motion.div
              whileHover={{ y: -3 }}
              className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800 flex flex-col justify-between space-y-4 shadow-sm hover:border-teal-400/50 transition-all"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 font-black text-slate-900 dark:text-white uppercase tracking-wider text-[11px]">
                  <Wallet className="w-4 h-4 text-teal-500" />
                  Finance Guard Nudge
                </span>
                <span className="text-[10px] font-bold text-rose-600 dark:text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded-md border border-rose-500/20">
                  Low Balance Alert
                </span>
              </div>

              <div className="space-y-2.5">
                <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 leading-relaxed">
                  &ldquo;Next week, you will be left with only PKR 6,000. Ask Abdullah to return your loan PKR 4,000 by this weekend.&rdquo;
                </p>

                <div className="p-3 rounded-xl bg-white dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 space-y-1.5 text-[11px]">
                  <div className="flex items-center justify-between font-bold">
                    <span className="text-slate-500">Projected Balance:</span>
                    <span className="text-rose-500 font-mono">PKR 6,000</span>
                  </div>
                  <div className="flex items-center justify-between font-bold">
                    <span className="text-slate-500">Pending Loan:</span>
                    <span className="text-emerald-500 font-mono">+PKR 4,000</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-teal-500 hover:bg-teal-600 text-slate-950 text-xs font-black transition-all shadow-sm"
              >
                <Bell className="w-3.5 h-3.5" />
                <span>Schedule WhatsApp Reminder</span>
              </button>
            </motion.div>

            {/* Insight Widget 3: Goal Check-in */}
            <motion.div
              whileHover={{ y: -3 }}
              className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800 flex flex-col justify-between space-y-4 shadow-sm hover:border-sky-400/50 transition-all"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 font-black text-slate-900 dark:text-white uppercase tracking-wider text-[11px]">
                  <Target className="w-4 h-4 text-sky-500" />
                  Goal Progress Check-in
                </span>
                <span className="text-[10px] font-bold text-sky-600 dark:text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded-md border border-sky-500/20">
                  3 Days Inactive
                </span>
              </div>

              <div className="space-y-2.5">
                <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 leading-relaxed">
                  &ldquo;You have not logged any progress for goal &apos;Gardening 100 vegetable pots&apos;. What is the progress?&rdquo;
                </p>

                <div className="p-3 rounded-xl bg-white dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 space-y-1.5">
                  <div className="flex justify-between text-[11px] font-bold">
                    <span className="text-slate-600 dark:text-slate-300">Target Goal</span>
                    <span className="text-sky-500">42 / 100 Pots</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                    <div className="h-full bg-sky-500 rounded-full w-[42%]" />
                  </div>
                </div>
              </div>

              <button
                type="button"
                className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-sky-500 hover:bg-sky-600 text-slate-950 text-xs font-black transition-all shadow-sm"
              >
                <TrendingUp className="w-3.5 h-3.5" />
                <span>Log Progress Now</span>
              </button>
            </motion.div>

          </div>
        </div>

      </div>
    </section>
  );
}
