"use client";

import React, { useState } from "react";
import { X, Sparkles, Cat, Scroll, CheckCircle, Heart } from "lucide-react";
import { POND_EASTER_EGGS, PondEasterEgg } from "./GardenData";

interface PondModalProps {
  onClose: () => void;
  onEggDiscovered: (eggId: string) => void;
  discoveredEggs: string[];
}

export default function PondModal({
  onClose,
  onEggDiscovered,
  discoveredEggs,
}: PondModalProps) {
  const [selectedEggId, setSelectedEggId] = useState<string>("glowing-mushroom");
  const [purring, setPurring] = useState<boolean>(false);
  const [sporesGlowing, setSporesGlowing] = useState<boolean>(false);

  const selectedEgg =
    POND_EASTER_EGGS.find((e) => e.id === selectedEggId) || POND_EASTER_EGGS[0];

  const handleInspectEgg = (egg: PondEasterEgg) => {
    setSelectedEggId(egg.id);
    onEggDiscovered(egg.id);

    if (egg.id === "familiar-sprite") {
      setPurring(true);
      setTimeout(() => setPurring(false), 2400);
    }
    if (egg.id === "glowing-mushroom") {
      setSporesGlowing(true);
      setTimeout(() => setSporesGlowing(false), 2400);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/55 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-[#FAF4E6] rounded-2xl border-2 border-[#3C666B] shadow-[0_24px_60px_rgba(30,15,5,0.35)] flex flex-col overflow-hidden">
        {/* Header Ribbon */}
        <div className="px-5 py-4 border-b border-[#B99A60]/40 bg-gradient-to-r from-[#DFF0EE] via-[#FAF4E6] to-[#DFF0EE] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#3C666B]/20 border border-[#3C666B]/40 flex items-center justify-center text-[#3C666B]">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base sm:text-lg text-[#134E4A] leading-tight">
                The Hidden Pond &amp; Secluded Reeds
              </h3>
              <p className="text-[11px] font-serif text-[#49372C]/75 italic">
                Secret Discoveries • {discoveredEggs.length}/{POND_EASTER_EGGS.length} Easter Eggs Unveiled
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

        {/* Pond Interactive Area */}
        <div className="p-5 sm:p-6 space-y-4 overflow-y-auto">
          {/* Discovery Selector Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {POND_EASTER_EGGS.map((egg) => {
              const isSelected = selectedEggId === egg.id;
              const isFound = discoveredEggs.includes(egg.id);
              return (
                <button
                  key={egg.id}
                  type="button"
                  onClick={() => handleInspectEgg(egg)}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-2 active:scale-98 relative ${
                    isSelected
                      ? "bg-[#E6F3F2] border-[#3C666B] ring-2 ring-[#3C666B]/30 shadow-xs"
                      : "bg-[#FFFDF7] border-[#B99A60]/35 hover:bg-[#FAF4E6]"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xl">
                      {egg.id === "glowing-mushroom" && "🍄"}
                      {egg.id === "familiar-sprite" && "🐱"}
                      {egg.id === "secret-note" && "📜"}
                    </span>
                    {isFound ? (
                      <span className="px-1.5 py-0.5 rounded-md text-[9px] font-mono bg-[#3C666B]/15 text-[#134E4A] font-bold">
                        Discovered ✓
                      </span>
                    ) : (
                      <span className="text-[10px] text-[#B99A60]">✦ Tap</span>
                    )}
                  </div>

                  <div>
                    <h5 className="font-serif font-bold text-xs text-[#134E4A]">
                      {egg.name}
                    </h5>
                    <span className="text-[10px] font-serif italic text-[#49372C]/70 block truncate">
                      {egg.title}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Discovery Reveal Sheet */}
          <div className="p-4 sm:p-5 rounded-xl bg-[#FFFDF7] border border-[#B99A60]/45 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#3C666B] font-bold">
                {selectedEgg.title}
              </span>
              {selectedEggId === "familiar-sprite" && purring && (
                <span className="text-xs text-[#C94736] font-serif animate-pulse flex items-center gap-1">
                  <Heart className="w-3 h-3 fill-current" />
                  <span>*purrrrr*</span>
                </span>
              )}
              {selectedEggId === "glowing-mushroom" && sporesGlowing && (
                <span className="text-xs text-[#0D9488] font-serif animate-pulse flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  <span>*glowing emerald spores*</span>
                </span>
              )}
            </div>

            <p className="text-xs sm:text-[13px] font-serif text-[#3D2E24] leading-relaxed">
              {selectedEgg.message}
            </p>

            <div className="p-2.5 rounded-lg bg-[#EBF5F3] border border-[#3C666B]/30 text-xs font-serif text-[#134E4A] italic">
              {selectedEgg.discoveryNote}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-[#B99A60]/30 bg-[#FAF4E6] flex items-center justify-between">
          <span className="text-[11px] font-serif italic text-[#49372C]/65">
            Pond Discoveries remain saved in your browser session
          </span>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-[#3C666B] hover:bg-[#28484C] text-white text-xs font-serif font-semibold shadow-xs transition-colors cursor-pointer"
          >
            Return to Garden
          </button>
        </div>
      </div>
    </div>
  );
}
