"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Bell, ArrowLeft, Sun, Moon, ShieldCheck, AlertCircle, Loader2 } from "lucide-react";

export default function NotificationSubscribe() {
  const [isDark, setIsDark] = useState(false);
  const [subscribing, setSubscribing] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsDark(document.documentElement.classList.contains("dark"));
    }
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    if (nextDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const subscribe = async () => {
    if (!window.OneSignalDeferred) {
      console.error("OneSignal SDK not loaded");
      setStatus("error");
      setErrorMessage("OneSignal SDK could not be loaded. Please disable ad-blockers and try again.");
      return;
    }
    
    setSubscribing(true);
    setStatus("idle");
    setErrorMessage("");
  
    window.OneSignalDeferred.push(async (OneSignal) => {
      try {
        if (!OneSignal || !OneSignal.Notifications) {
          console.error("OneSignal not initialized");
          setStatus("error");
          setErrorMessage("OneSignal was not initialized correctly.");
          setSubscribing(false);
          return;
        }

        // Request notification permission (correct method for SDK v16)
        const permission = await OneSignal.Notifications.requestPermission();
        
        if (permission) {
          console.log("Notification permission granted");
          setStatus("success");
        } else {
          console.log("Notification permission denied");
          setStatus("error");
          setErrorMessage("Notification permission was denied by the browser.");
        }
      } catch (error) {
        console.error("Error requesting notification permission:", error);
        setStatus("error");
        if (error instanceof Error) {
          if (error.message.includes("Can only be used on")) {
            setErrorMessage("OneSignal is restricted to the production domain (www.myorbit.site). It cannot be configured on localhost.");
          } else {
            setErrorMessage(error.message);
          }
        } else {
          setErrorMessage("An unknown error occurred while requesting notification permissions.");
        }
      } finally {
        setSubscribing(false);
      }
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300 p-6 md:p-8">
      <div className="max-w-3xl mx-auto space-y-8">
        
        {/* Navigation & Header */}
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 pb-6 border-b border-slate-200 dark:border-white/10">
          <div>
            <div className="mb-4">
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-1.5 text-base font-semibold text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 transition"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Dashboard
              </Link>
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-slate-900 via-cyan-950 to-slate-900 dark:from-white dark:via-cyan-100 dark:to-white bg-clip-text text-transparent">
              Push Notifications
            </h1>
            <p className="text-slate-650 dark:text-slate-400 mt-1 text-base">
              Enable real-time alert updates for this browser device.
            </p>
          </div>

          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="self-start md:self-auto p-3 rounded-2xl border border-slate-200 dark:border-slate-800 text-slate-650 dark:text-slate-350 hover:text-slate-900 dark:hover:text-white transition bg-white dark:bg-slate-900/60 hover:bg-slate-100 dark:hover:bg-slate-800/80"
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </header>

        {/* Content Card */}
        <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-white/5 rounded-3xl p-6 md:p-8 shadow-sm hover:shadow-md transition space-y-6">
          <div className="flex items-start gap-4">
            <div className="p-4 rounded-2xl bg-cyan-50 dark:bg-cyan-950/30 text-cyan-600 dark:text-cyan-400 shrink-0">
              <Bell className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-slate-950 dark:text-white">
                Subscribe to Browser Alerts
              </h2>
              <p className="text-slate-650 dark:text-slate-400 text-sm leading-relaxed">
                By enabling notifications, this administrative device will receive instant browser alerts whenever a prospective client submits an inquiry message or a call back request on your website.
              </p>
            </div>
          </div>

          <div className="border-t border-slate-150 dark:border-white/5 pt-6 space-y-4">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0" />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Securely managed by OneSignal SDK
              </span>
            </div>
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0" />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Supports background notifications even when the dashboard tab is closed
              </span>
            </div>
          </div>

          {status === "success" && (
            <div className="p-4 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/30 rounded-2xl flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold text-emerald-800 dark:text-emerald-300">
                  Notification Permissions Enabled!
                </p>
                <p className="text-xs text-emerald-655 dark:text-emerald-400 mt-1">
                  This browser device will now receive real-time push alerts. You can test submissions to verify.
                </p>
              </div>
            </div>
          )}

          {status === "error" && (
            <div className="p-4 bg-red-50 dark:bg-red-950/25 border border-red-200 dark:border-red-900/30 rounded-2xl flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold text-red-800 dark:text-red-300">
                  Subscription Failed
                </p>
                <p className="text-xs text-red-655 dark:text-red-400 mt-1 leading-relaxed">
                  {errorMessage}
                </p>
              </div>
            </div>
          )}

          <div className="flex justify-end pt-4">
            <button
              onClick={subscribe}
              disabled={subscribing}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-white font-bold hover:opacity-90 disabled:opacity-50 transition shadow-lg shadow-cyan-500/10"
            >
              {subscribing && <Loader2 className="w-4 h-4 animate-spin" />}
              {subscribing ? "Checking permission..." : "Enable Push Notifications"}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
