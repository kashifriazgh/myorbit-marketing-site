'use client';

export default function Privacy() {
  return (
    <section className="py-24 px-6 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      <div className="max-w-5xl mx-auto space-y-16">
        {/* Heading */}
        <div className="text-center space-y-4">
          <span className="inline-flex px-4 py-1 rounded-full text-xs uppercase tracking-[0.35em] bg-white/10 border border-white/10 text-cyan-200">
            Privacy
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
            Privacy & Data Safety
          </h1>
          <p className="text-slate-300 max-w-3xl mx-auto text-lg">
            We take your privacy seriously and want to be transparent about how your data is used.
          </p>
        </div>

        {/* Data Usage with AI */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-cyan-200">
            Use of Your Data with AI
          </h2>
          <p className="text-white/90 text-lg leading-relaxed">
            To provide more meaningful and accurate insights or responses, our AI may sometimes use information such as your name, email, and other general profile data (like city, country, education, profession, or preferences). This only happens if you have added this information in your profile section.
          </p>
          <p className="text-white/90 text-lg leading-relaxed">
            This helps the AI give suggestions and outputs that are more relevant to your personal context, improving your overall productivity experience.
          </p>
        </div>

        {/* Database Security */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-cyan-200">
            Database Security
          </h2>
          <p className="text-white/90 text-lg leading-relaxed">
            We do <strong>not</strong> have access to your database. Each client has their own Firebase account attached, ensuring complete isolation of your data. Your personal tasks, financial information, and other stored content remain private and fully under your control.
          </p>
          <p className="text-white/90 text-lg leading-relaxed">
            Our system only interacts with AI using data you provide (as explained above) and does not store or access your database directly.
          </p>
        </div>

        {/* Closing Note */}
        <div className="space-y-4 text-center">
          <p className="text-white/80 text-lg leading-relaxed">
            Your privacy is our priority, and we are committed to keeping your data secure while providing a productive experience.
          </p>
        </div>
      </div>
    </section>
  );
}
