"use client";

import React from "react";
import { X, Award, Sparkles, Compass, Sprout, Hammer, Mail, RotateCcw } from "lucide-react";
import { GARDEN_BADGES, GardenBadge } from "./GardenData";

interface BadgeDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  earnedBadgeIds: string[];
  onResetProgress: () => void;
}

export default function BadgeDrawer({
  isOpen,
  onClose,
  earnedBadgeIds,
  onResetProgress,
}: BadgeDrawerProps) {
  if (!isOpen) return null;

  const renderBadgeIcon = (icon: string) => {
    switch (icon) {
      case "compass":
        return <Compass className="w-5 h-5 text-[#B99A60]" />;
      case "sprout":
        return <Sprout className="w-5 h-5 text-[#627D5B]" />;
      case "hammer":
        return <Hammer className="w-5 h-5 text-[#D0684D]" />;
      case "mail":
        return <Mail className="w-5 h-5 text-[#C94736]" />;
      default:
        return <Sparkles className="w-5 h-5 text-[#3C666B]" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/55 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl max-h-[85vh] bg-[#FAF4E6] rounded-2xl border-2 border-[#B99A60] shadow-[0_24px_60px_rgba(30,15,5,0.35)] flex flex-col overflow-hidden">
        {/* Header Ribbon */}
        <div className="px-5 py-4 border-b border-[#B99A60]/40 bg-gradient-to-r from-[#F5EBD5] via-[#FAF4E6] to-[#F5EBD5] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#B99A60]/20 border border-[#B99A60]/40 flex items-center justify-center text-[#B99A60]">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base sm:text-lg text-[#344C39] leading-tight">
                Garden Explorer Logbook
              </h3>
              <p className="text-[11px] font-serif text-[#49372C]/75 italic">
                {earnedBadgeIds.length} of {GARDEN_BADGES.length} Badges Discovered
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg border border-[#B99A60]/50 hover:bg-[#F6EBD5] text-[#49372C] transition-colors cursor-pointer"
            title="Close logbook"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Badges List */}
        <div className="p-5 overflow-y-auto space-y-2.5 flex-1">
          {GARDEN_BADGES.map((badge) => {
            const isEarned = earnedBadgeIds.includes(badge.id);
            return (
              <div
                key={badge.id}
                className={`p-3.5 rounded-xl border flex items-start gap-3.5 transition-all ${
                  isEarned
                    ? "bg-[#FFFDF7] border-[#B99A60]/60 shadow-xs"
                    : "bg-[#F5EFE0]/60 border-[#B99A60]/30 opacity-70"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-2 ${
                    isEarned
                      ? "bg-[#FFF9EF] border-[#B99A60] shadow-xs"
                      : "bg-[#EAE0CD] border-[#B99A60]/30 grayscale"
                  }`}
                >
                  {renderBadgeIcon(badge.icon)}
                </div>

                <div className="flex-1 overflow-hidden">
                  <div className="flex items-center justify-between gap-1">
                    <h5 className="font-serif font-bold text-xs sm:text-sm text-[#344C39]">
                      {badge.name}
                    </h5>
                    {isEarned ? (
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-mono bg-[#627D5B]/15 text-[#344C39] border border-[#627D5B]/30 font-bold shrink-0">
                        {badge.earnedTitle} ✓
                      </span>
                    ) : (
                      <span className="text-[10px] font-serif italic text-[#49372C]/60 shrink-0">
                        Undiscovered
                      </span>
                    )}
                  </div>

                  <p className="text-xs font-serif text-[#49372C]/85 mt-0.5 leading-relaxed">
                    {badge.description}
                  </p>

                  {!isEarned && (
                    <p className="text-[10px] font-mono text-[#8C5835] mt-1">
                      Hint: {badge.hint}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer with Reset Option */}
        <div className="px-5 py-3 border-t border-[#B99A60]/30 bg-[#FAF4E6] flex items-center justify-between">
          <button
            type="button"
            onClick={onResetProgress}
            className="text-[11px] font-serif text-[#C94736] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset Exploration</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-[#627D5B] hover:bg-[#4E6B47] text-white text-xs font-serif font-semibold shadow-xs transition-colors cursor-pointer"
          >
            Return to Garden
          </button>
        </div>
      </div>
    </div>
  );
}
