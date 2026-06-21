import { Check } from "lucide-react";

const scheduleEntries = [
  { time: "6:00 AM", title: "Improve Admin section UI/UX", done: true },
  { time: "9:00 AM", title: "Call to Faisal Carpenter ", done: true },
  { time: "10:00 AM", title: "Call to Muneeb to repair doors", done: false },
  { time: "11:00 AM", title: "Team meeting", done: false },
];

export default function FounderStorySection() {
  return (
    <section className="relative overflow-hidden px-6 py-24 sm:py-28 bg-gradient-to-b from-white to-slate-50 dark:from-slate-950 dark:to-slate-900 border-t border-slate-200 dark:border-slate-800 transition-colors duration-300">
      {/* ambient glow */}
      <div
        className="pointer-events-none absolute -left-24 -top-24 h-96 w-96 rounded-full blur-3xl opacity-40 dark:opacity-80"
        style={{
          background:
            "radial-gradient(circle, rgba(20,184,166,0.15), transparent 70%)",
        }}
      />
      <div
        className="pointer-events-none absolute -right-24 bottom-0 h-96 w-96 rounded-full blur-3xl opacity-30 dark:opacity-60"
        style={{
          background:
            "radial-gradient(circle, rgba(52,211,153,0.1), transparent 70%)",
        }}
      />

      <div className="relative mx-auto grid max-w-6xl gap-16 lg:grid-cols-2 lg:items-center lg:gap-12">
        {/* narrative */}
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-teal-500/30 bg-teal-500/5 dark:bg-teal-500/10 px-4 py-1.5 text-sm font-medium text-teal-600 dark:text-teal-300">
            <span className="h-1.5 w-1.5 rounded-full bg-teal-500 animate-pulse" />
            Why I Built MyOrbit
          </div>

          <h2 className="mt-6 text-3xl font-black tracking-tight sm:text-4xl md:text-5xl text-slate-900 dark:text-white leading-[1.1]">
            I kept forgetting things.{" "}
            <span className="bg-gradient-to-r from-teal-500 to-cyan-500 bg-clip-text text-transparent">
              So I built something that wouldn&apos;t let me.
            </span>
          </h2>

          <p className="mt-5 text-base leading-relaxed sm:text-lg text-slate-600 dark:text-slate-300">
            I used to keep forgetting things — tasks, plans, important notes, and small
            stuff in daily routine. Not because I didn&apos;t care, but because my
            mind simply doesn&apos;t hold onto everything in the same time. So, a year ago,
             I built <span className="font-bold text-teal-600 dark:text-teal-400">MyOrbit</span>, originally just for myself: a place to write things down
            before they slipped away.
          </p>
          
          <p className="mt-10 border-l-4 border-teal-500 dark:border-teal-500 pl-4 text-base font-bold italic leading-relaxed sm:text-lg text-slate-600 dark:text-slate-300">
            Every section of the app is helping in its own way. But one section, <span className="font-bold text-teal-600 dark:text-teal-400">Schedules</span>, became the foundation for waking up early and taking control of my all day.
          </p>
        </div>

        {/* schedule visual */}
        <div>
          <div className="rounded-[32px] border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 p-8 backdrop-blur-sm sm:p-10 shadow-xl dark:shadow-none hover:border-teal-500/30 transition-all duration-300">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <span className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Today&apos;s Schedule
              </span>
              <span className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                Schedules
              </span>
            </div>

            <div className="relative mt-6 pl-2">
              <div className="absolute left-[13px] top-2 bottom-2 w-[2px] bg-slate-200 dark:bg-slate-800" />
              <ul className="space-y-6">
                {scheduleEntries.map((entry) => (
                  <li key={entry.title} className="relative flex items-start gap-4">
                    <span
                      className={`relative z-10 mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-colors duration-300 ${
                        entry.done 
                          ? "bg-teal-500 text-white" 
                          : "bg-white dark:bg-slate-950 border-2 border-slate-300 dark:border-slate-700 text-transparent"
                      }`}
                    >
                      {entry.done ? (
                        <Check className="h-4 w-4 stroke-[3]" />
                      ) : (
                        <span className="h-2 w-2 rounded-full bg-slate-200 dark:bg-slate-800" />
                      )}
                    </span>
                    <div>
                      <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                        {entry.time}
                      </p>
                      <p
                        className={`text-sm font-semibold sm:text-base transition-all duration-300 ${
                          entry.done 
                            ? "text-slate-405 dark:text-slate-500 line-through" 
                            : "text-slate-800 dark:text-slate-100"
                        }`}
                      >
                        {entry.title}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="mt-4 text-center text-xs font-medium text-slate-500 dark:text-slate-400">
            A real day, planned hour by hour.
          </p>
        </div>
      </div>
    </section>
  );
}
