"use client";

import React from "react";
import { Home, X, Sparkles, Sprout, BookOpen, Hammer, Mail, Compass } from "lucide-react";
import { chimeEngine } from "@/components/audio/ChimeEngine";

interface CottageModalProps {
  onClose: () => void;
  onNavigateDestination?: (id: "greenhouse" | "library" | "workshop" | "mailbox" | "pond") => void;
}

export default function CottageModal({ onClose, onNavigateDestination }: CottageModalProps) {
  const handleJump = (dest: "greenhouse" | "library" | "workshop" | "mailbox" | "pond") => {
    if (chimeEngine) chimeEngine.playBreezeChord();
    onClose();
    if (onNavigateDestination) {
      setTimeout(() => onNavigateDestination(dest), 150);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="max-w-xl w-full bg-[#FAF5E8] rounded-2xl border-2 border-[#B99A60] shadow-[0_25px_60px_rgba(40,20,10,0.35)] overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
        {/* Header Bar */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-[#F6EBD5] via-[#FAF4E6] to-[#EFE2C6] border-b border-[#B99A60]/40 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#C86D51]/20 border border-[#C86D51]/40 flex items-center justify-center text-[#C86D51]">
              <Home className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-[#C86D51] font-bold">
                The Hearth &amp; Homestead
              </div>
              <h3 className="font-serif font-bold text-lg text-[#3D2E24] leading-tight">
                The Cozy Cottage
              </h3>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#5C381E]/60 hover:text-[#C94736] hover:bg-black/5 transition-colors cursor-pointer"
            aria-label="Close Cottage Dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 text-[#49372C] font-serif text-xs sm:text-sm leading-relaxed">
          {/* Welcome Letter */}
          <div className="p-4 rounded-xl bg-[#FFFDF7] border border-[#B99A60]/40 shadow-2xs relative">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#627D5B] font-bold block mb-1">
              ✦ A Handcrafted Welcome
            </span>
            <p className="italic text-[#344C39] font-medium mb-2 text-sm">
              &ldquo;Welcome to my Little World — a miniature sanctuary where code, craft, and curiosity grow side-by-side.&rdquo;
            </p>
            <p className="text-[#49372C]/90 mb-2">
              I am <strong>Kritika Manandhar</strong>, a computer science scholar and frontend craftsman from Kathmandu, Nepal. I believe modern software should feel tactile, intentional, and warm, like turning the pages of an illustrated journal.
            </p>
            <p className="text-[#49372C]/90">
              Take your time to stroll down each winding garden path. Every landmark in this miniature world opens a window into my real skills, projects, and learning journey.
            </p>
          </div>

          {/* Quick Landmark Guide */}
          <div>
            <div className="text-[11px] font-mono uppercase tracking-wider text-[#B99A60] font-bold mb-2">
              Garden Landmark Directory:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleJump("greenhouse")}
                className="p-3 rounded-lg bg-[#FAF4E6] hover:bg-[#F2E5CE] border border-[#B99A60]/40 text-left transition-all cursor-pointer flex items-start gap-2.5 group"
              >
                <div className="p-1.5 rounded-md bg-[#627D5B]/20 text-[#627D5B] group-hover:scale-110 transition-transform shrink-0">
                  <Sprout className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-[#344C39] text-xs">The Greenhouse</div>
                  <div className="text-[10px] text-[#49372C]/70">Explore frontend &amp; fullstack botanical skills</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleJump("library")}
                className="p-3 rounded-lg bg-[#FAF4E6] hover:bg-[#F2E5CE] border border-[#B99A60]/40 text-left transition-all cursor-pointer flex items-start gap-2.5 group"
              >
                <div className="p-1.5 rounded-md bg-[#8C5835]/20 text-[#8C5835] group-hover:scale-110 transition-transform shrink-0">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-[#344C39] text-xs">The Little Library</div>
                  <div className="text-[10px] text-[#49372C]/70">Browse academic degrees, folios &amp; learning journey</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleJump("workshop")}
                className="p-3 rounded-lg bg-[#FAF4E6] hover:bg-[#F2E5CE] border border-[#B99A60]/40 text-left transition-all cursor-pointer flex items-start gap-2.5 group"
              >
                <div className="p-1.5 rounded-md bg-[#D0684D]/20 text-[#D0684D] group-hover:scale-110 transition-transform shrink-0">
                  <Hammer className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-[#344C39] text-xs">The Workshop</div>
                  <div className="text-[10px] text-[#49372C]/70">Inspect real software projects &amp; GitHub repos</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleJump("mailbox")}
                className="p-3 rounded-lg bg-[#FAF4E6] hover:bg-[#F2E5CE] border border-[#B99A60]/40 text-left transition-all cursor-pointer flex items-start gap-2.5 group"
              >
                <div className="p-1.5 rounded-md bg-[#C94736]/20 text-[#C94736] group-hover:scale-110 transition-transform shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-[#344C39] text-xs">The Mailbox</div>
                  <div className="text-[10px] text-[#49372C]/70">Send a letter or copy verified contact info</div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3.5 sm:p-4 bg-[#F6EBD5] border-t border-[#B99A60]/40 flex items-center justify-between">
          <span className="text-[11px] font-mono text-[#627D5B] flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-[#E4BA68]" />
            <span>The Little World • Interactive Garden</span>
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-[#627D5B] hover:bg-[#526D4B] text-white font-serif font-semibold text-xs shadow-2xs transition-all active:scale-95 cursor-pointer"
          >
            Return to World
          </button>
        </div>
      </div>
    </div>
  );
}
