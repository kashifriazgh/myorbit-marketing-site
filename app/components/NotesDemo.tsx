'use client';

import React, { useState } from 'react';
import {
  Star,
  AlertOctagon,
  FileText
} from 'lucide-react';

export default function NotesDemo() {
  // State for Mockup 1: Live Markdown Editor
  const defaultMd = `# Workout Routine\n- Run **2 miles**\n- *15 pushups*\n- ~~Drink water~~`;
  const [mdInput, setMdInput] = useState(defaultMd);

  // State for Mockup 2: Note properties
  const [isFav, setIsFav] = useState(false);
  const [isImportant, setIsImportant] = useState(false);

  // Simple Markdown Parser for Live Preview
  const parseMarkdownToJsx = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, idx) => {
      let content = line;
      let isHeader = false;
      let isBullet = false;

      // Check header
      if (content.startsWith('#')) {
        isHeader = true;
        content = content.replace(/^#\s*/, '');
      }
      // Check bullet
      else if (content.startsWith('-')) {
        isBullet = true;
        content = content.replace(/^-+\s*/, '');
      }

      // Parse bold **text**
      const boldRegex = /\*\*(.*?)\*\*/g;
      const italicRegex = /\*(.*?)\*/g;
      const strikeRegex = /~~(.*?)~~/g;

      // Simple JSX conversion helper for inline formats
      const renderFormattedText = (rawStr: string) => {
        const htmlContent = rawStr
          .replace(boldRegex, '<strong>$1</strong>')
          .replace(italicRegex, '<em>$1</em>')
          .replace(strikeRegex, '<del>$1</del>');
        
        return <span dangerouslySetInnerHTML={{ __html: htmlContent }} />;
      };

      if (isHeader) {
        return (
          <h4 key={idx} className="font-extrabold text-slate-800 dark:text-slate-100 mt-2 mb-1 text-lg">
            {renderFormattedText(content)}
          </h4>
        );
      }

      if (isBullet) {
        return (
          <li key={idx} className="ml-4 list-disc text-slate-600 dark:text-slate-400 text-sm">
            {renderFormattedText(content)}
          </li>
        );
      }

      return (
        <p key={idx} className="text-slate-600 dark:text-slate-400 min-h-[1.2rem] my-0.5 text-sm">
          {renderFormattedText(line)}
        </p>
      );
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
      
      {/* Live Markdown Preview */}
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-xl overflow-hidden transition-all duration-300">
        <div className="p-6 sm:p-8">
          
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-full bg-cyan-500/10 text-cyan-500 flex items-center justify-center shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-850 dark:text-white leading-tight">
                Live Markdown Editor
              </h4>
              <span className="text-[10px] text-slate-400 font-semibold block mt-0.5">
                Rich Text Formatting
              </span>
            </div>
          </div>

          <p className="text-xs text-slate-550 dark:text-slate-400 mb-4 leading-relaxed">
            Write markdown below to see how MyOrbit instantly parses and renders rich text formatting:
          </p>

          {/* Textarea Input */}
          <textarea
            rows={4}
            className="w-full px-3 py-2 text-xs font-mono rounded-xl border border-slate-250 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition resize-none placeholder-slate-400 mb-4"
            placeholder="Type markdown here..."
            value={mdInput}
            onChange={(e) => setMdInput(e.target.value)}
          />

          <hr className="border-slate-200 dark:border-slate-800/80 mb-4" />

          <span className="text-[10px] uppercase font-extrabold text-slate-400 dark:text-slate-500 block tracking-wider mb-2">
            Live Rendered Note
          </span>

          {/* Render output box */}
          <div className="p-4 rounded-2xl border min-h-[120px] bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-850 text-left">
            {parseMarkdownToJsx(mdInput)}
          </div>

        </div>
      </div>

      {/* Note properties (Star & Importance toggle) */}
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-xl overflow-hidden transition-all duration-300">
        <div className="p-6 sm:p-8">
          
          <div className="flex justify-between items-center gap-4 mb-4">
            <h4 className="text-lg font-bold text-slate-850 dark:text-white leading-tight">
              Project Kickoff Notes
            </h4>
            
            <div className="flex gap-1">
              {/* Star Button */}
              <button
                onClick={() => setIsFav(!isFav)}
                aria-label="Toggle favorite"
                className={`p-2 rounded-xl transition cursor-pointer ${
                  isFav
                    ? 'bg-amber-500/10 text-amber-500'
                    : 'text-slate-400 hover:text-slate-600 dark:text-slate-600 dark:hover:text-slate-400'
                }`}
              >
                <Star className={`w-5 h-5 ${isFav ? 'fill-current' : ''}`} />
              </button>

              {/* Importance Button */}
              <button
                onClick={() => setIsImportant(!isImportant)}
                aria-label="Toggle importance"
                className={`p-2 rounded-xl transition cursor-pointer ${
                  isImportant
                    ? 'bg-red-500/10 text-red-500'
                    : 'text-slate-400 hover:text-slate-600 dark:text-slate-600 dark:hover:text-slate-400'
                }`}
              >
                <AlertOctagon className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Tags */}
          <div className="flex gap-2 mb-4">
            {isImportant && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold border border-red-200 bg-red-50 dark:bg-red-500/10 text-red-700 dark:text-red-400">
                Important
              </span>
            )}
            {isFav && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold border border-amber-200 bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-450">
                Favorite
              </span>
            )}
            {!isImportant && !isFav && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 text-slate-400 dark:text-slate-500">
                General
              </span>
            )}
          </div>

          <p className="text-xs text-slate-550 dark:text-slate-400 leading-relaxed">
            Kickoff meeting details. Try clicking the star or high priority icons above to change its status!
          </p>

        </div>
      </div>

    </div>
  );
}
