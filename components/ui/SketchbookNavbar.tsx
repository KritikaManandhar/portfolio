"use client";

import React, { useState, useEffect } from "react";
import { Sprout } from "lucide-react";
import { chimeEngine } from "@/components/audio/ChimeEngine";
import { triggerLeafBurst } from "@/components/particles/LeafParticleBurst";
import { WindChimeIcon } from "@/components/ui/VectorIcons";

interface SketchbookNavbarProps {
  currentFrame: number;
  totalFrames: number;
}

export default function SketchbookNavbar({
  currentFrame,
  totalFrames,
}: SketchbookNavbarProps) {
  const [chimesOn, setChimesOn] = useState<boolean>(true);

  useEffect(() => {
    if (chimeEngine) {
      setChimesOn(!chimeEngine.getMuted());
    }
  }, []);

  const handleToggleChimes = (e: React.MouseEvent) => {
    triggerLeafBurst(e.clientX, e.clientY, false);
    if (chimeEngine) {
      const isMuted = chimeEngine.toggleMute();
      setChimesOn(!isMuted);
    }
  };

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string
  ) => {
    e.preventDefault();
    triggerLeafBurst(e.clientX, e.clientY, true);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-3 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl">
      <nav className="ghibli-card px-4 py-2.5 sm:px-6 sm:py-3 flex items-center justify-between shadow-md">
        {/* Author Title / Studio Mark */}
        <div className="flex items-center gap-2">
          <Sprout className="w-5 h-5 text-[#7A9A7E]" />
          <span className="font-serif font-bold text-sm sm:text-base tracking-tight text-[#3D352E]">
            Kritika Manandhar
          </span>
          <span className="hidden md:inline-block text-xs text-[#7A9A7E] font-medium ml-1">
            • Studio Ghibli Journal
          </span>
        </div>

        {/* Section Links */}
        <div className="hidden lg:flex items-center gap-5 text-xs font-medium text-[#3D352E]/90">
          <a
            href="#study"
            onClick={(e) => handleNavClick(e, "study")}
            className="hover:text-[#E07A5F] transition-colors relative py-1 hover:underline underline-offset-4"
          >
            01. Study
          </a>
          <a
            href="#skills"
            onClick={(e) => handleNavClick(e, "skills")}
            className="hover:text-[#E07A5F] transition-colors relative py-1 hover:underline underline-offset-4"
          >
            02. Botanist Shelf
          </a>
          <a
            href="#projects"
            onClick={(e) => handleNavClick(e, "projects")}
            className="hover:text-[#E07A5F] transition-colors relative py-1 hover:underline underline-offset-4"
          >
            03. Field Journal
          </a>
          <a
            href="#greenhouse"
            onClick={(e) => handleNavClick(e, "greenhouse")}
            className="hover:text-[#E07A5F] transition-colors relative py-1 hover:underline underline-offset-4"
          >
            04. Greenhouse
          </a>
          <a
            href="#postbox"
            onClick={(e) => handleNavClick(e, "postbox")}
            className="hover:text-[#E07A5F] transition-colors relative py-1 hover:underline underline-offset-4"
          >
            05. Sunset Postbox
          </a>
        </div>

        {/* Interactive Controls: Frame Counter & Wind Chime Toggle */}
        <div className="flex items-center gap-3">
          {/* Scroll Frame Indicator */}
          <div className="px-2.5 py-1 rounded-full bg-[#FAF6F0] border border-[#7A9A7E]/30 text-[11px] font-mono text-[#3D352E] flex items-center gap-1.5 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#7A9A7E] animate-pulse" />
            <span>
              Frame {String(currentFrame).padStart(3, "0")} / {totalFrames}
            </span>
          </div>

          {/* Wind Chime Mute/Unmute Toggle */}
          <button
            type="button"
            onClick={handleToggleChimes}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 border shadow-xs cursor-pointer ${
              chimesOn
                ? "bg-[#7A9A7E] text-white border-[#5E7D62] hover:bg-[#68886C]"
                : "bg-[#F3ECE1] text-[#3D352E]/70 border-[#D8C7B0] hover:bg-[#EAE1D3]"
            }`}
            title="Toggle wind chime acoustic audio cues"
          >
            <WindChimeIcon className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Chimes:</span>
            <span>{chimesOn ? "ON" : "OFF"}</span>
          </button>
        </div>
      </nav>
    </header>
  );
}
