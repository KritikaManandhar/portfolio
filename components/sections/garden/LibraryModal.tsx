"use client";

import React, { useState } from "react";
import { X, BookOpen, ChevronRight, Bookmark, Sparkles, Feather } from "lucide-react";
import { LEARNING_CHAPTERS, LearningChapter } from "./GardenData";

interface LibraryModalProps {
  onClose: () => void;
  onChapterRead: (chapterId: string) => void;
  readChapters: string[];
}

export default function LibraryModal({
  onClose,
  onChapterRead,
  readChapters,
}: LibraryModalProps) {
  const [activeChapterIndex, setActiveChapterIndex] = useState<number>(0);
  const currentChapter = LEARNING_CHAPTERS[activeChapterIndex] || LEARNING_CHAPTERS[0];

  const handleSelectChapter = (idx: number) => {
    setActiveChapterIndex(idx);
    onChapterRead(LEARNING_CHAPTERS[idx].id);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/55 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#FAF4E6] rounded-2xl border-2 border-[#8C5835] shadow-[0_24px_60px_rgba(30,15,5,0.35)] flex flex-col overflow-hidden">
        {/* Header Ribbon */}
        <div className="px-5 py-4 border-b border-[#B99A60]/40 bg-gradient-to-r from-[#F5EBD5] via-[#FAF4E6] to-[#F5EBD5] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#8C5835]/20 border border-[#8C5835]/40 flex items-center justify-center text-[#8C5835]">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base sm:text-lg text-[#3D2E24] leading-tight">
                The Little Library Reading Nook
              </h3>
              <p className="text-[11px] font-serif text-[#49372C]/75 italic">
                Illustrated Learning Folios • Padmakanya TU &amp; Beyond
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg border border-[#B99A60]/50 hover:bg-[#F6EBD5] text-[#49372C] transition-colors cursor-pointer"
            title="Return to Garden"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Library Layout: Left Leatherbound Spine Bookshelf (5 cols), Right Open Manuscript (7 cols) */}
        <div className="grid grid-cols-1 md:grid-cols-12 flex-1 overflow-y-auto">
          {/* Bookshelf Left Panel */}
          <div className="md:col-span-5 p-4 sm:p-5 border-b md:border-b-0 md:border-r border-[#B99A60]/30 space-y-2 bg-[#F6EBD5]/60">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#8C5835] font-bold block mb-2">
              Select an Illustrated Folio:
            </span>

            <div className="flex flex-col gap-2">
              {LEARNING_CHAPTERS.map((chap, idx) => {
                const isActive = activeChapterIndex === idx;
                const isRead = readChapters.includes(chap.id);
                return (
                  <button
                    key={chap.id}
                    type="button"
                    onClick={() => handleSelectChapter(idx)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between group active:scale-98 ${
                      isActive
                        ? "bg-[#FAF4E6] border-[#8C5835] ring-2 ring-[#8C5835]/30 shadow-xs"
                        : "bg-[#FFFDF7] border-[#B99A60]/35 hover:bg-[#FAF4E6] hover:border-[#8C5835]/60"
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-mono text-[#8C5835] font-semibold">
                          {chap.chapterNumber}
                        </span>
                        {isRead && (
                          <span className="text-[9px] text-[#627D5B] font-mono">
                            ✓
                          </span>
                        )}
                      </div>
                      <h5 className="font-serif font-bold text-xs sm:text-sm text-[#3D2E24] mt-0.5">
                        {chap.tomeTitle}
                      </h5>
                      <span className="text-[10px] font-serif text-[#49372C]/70 italic block truncate max-w-[200px]">
                        {chap.focus}
                      </span>
                    </div>

                    <ChevronRight
                      className={`w-4 h-4 text-[#8C5835] transition-transform ${
                        isActive ? "translate-x-1" : "opacity-40 group-hover:opacity-80"
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Open Manuscript Right Panel */}
          <div className="md:col-span-7 p-5 sm:p-6 bg-[#FAF4E6] flex flex-col justify-between">
            <div className="space-y-4">
              {/* Folio Header & Era */}
              <div className="p-4 rounded-xl bg-[#FFFDF7] border border-[#B99A60]/45 shadow-xs">
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#8C5835]/15 text-[#8C5835] border border-[#8C5835]/30">
                    {currentChapter.chapterNumber} • {currentChapter.focus}
                  </span>
                  <span className="text-[10px] font-serif italic text-[#49372C]/70">
                    {currentChapter.era}
                  </span>
                </div>

                <h4 className="font-serif font-bold text-xl text-[#3D2E24] tracking-tight mb-2">
                  {currentChapter.tomeTitle}
                </h4>

                <p className="text-xs sm:text-[13px] font-serif text-[#49372C]/90 leading-relaxed">
                  {currentChapter.summary}
                </p>
              </div>

              {/* Key Takeaways & Practiced Realities */}
              <div className="p-4 rounded-xl bg-[#FFFDF7] border border-[#B99A60]/45 shadow-xs space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#8C5835] font-bold block">
                  ✦ Practiced Concepts &amp; Key Lessons
                </span>
                <ul className="space-y-1.5">
                  {currentChapter.keyTakeaways.map((item, i) => (
                    <li
                      key={i}
                      className="text-xs font-serif text-[#3D2E24] flex items-start gap-2 leading-relaxed"
                    >
                      <span className="text-[#8C5835] mt-0.5 text-xs">❧</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Handwritten Quote Scroll */}
              <div className="p-3.5 rounded-xl bg-[#F6EBD5] border border-[#B99A60]/50 shadow-2xs">
                <div className="flex items-center gap-1.5 mb-1 text-[10px] font-mono uppercase text-[#8C5835] font-bold">
                  <Feather className="w-3 h-3 text-[#8C5835]" />
                  <span>Journal Reflection:</span>
                </div>
                <p className="font-serif italic text-xs text-[#3D2E24] leading-relaxed">
                  “{currentChapter.quote}”
                </p>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-[#B99A60]/30 flex items-center justify-between mt-4">
              <span className="text-[11px] font-serif italic text-[#49372C]/60">
                Chapter {activeChapterIndex + 1} of {LEARNING_CHAPTERS.length}
              </span>

              <button
                type="button"
                onClick={onClose}
                className="px-4 py-1.5 rounded-lg bg-[#8C5835] hover:bg-[#724426] text-white text-xs font-serif font-semibold shadow-xs transition-colors cursor-pointer"
              >
                Return to Garden
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
