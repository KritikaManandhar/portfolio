"use client";

import React, { useState, useEffect, useCallback } from "react";
import GhibliScrollCanvas from "@/components/canvas/GhibliScrollCanvas";
import SketchbookNavbar from "@/components/ui/SketchbookNavbar";
import LeafParticleBurst from "@/components/particles/LeafParticleBurst";
import WelcomeStudySection from "@/components/sections/WelcomeStudySection";
import BotanistShelfSection from "@/components/sections/BotanistShelfSection";
import FieldJournalProjectsSection from "@/components/sections/FieldJournalProjectsSection";
import GreenhouseLogbookSection from "@/components/sections/GreenhouseLogbookSection";
import SunsetPostboxSection from "@/components/sections/SunsetPostboxSection";

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [currentFrame, setCurrentFrame] = useState<number>(1);
  const totalFrames = 150;

  // Track vertical scroll progress across the 500vh container
  const onScroll = useCallback(() => {
    const totalScroll =
      document.documentElement.scrollHeight - window.innerHeight;
    if (totalScroll > 0) {
      const progress = Math.min(1, Math.max(0, window.scrollY / totalScroll));
      setScrollProgress(progress);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  const handleFrameChange = useCallback((frame: number) => {
    setCurrentFrame(frame);
  }, []);

  return (
    <main className="relative min-h-[500vh] w-full bg-[#FAF6F0] selection:bg-[#F4ACB7]/50 selection:text-[#3D352E]">
      {/* 1. Global Interactive Click Particle Burst Engine */}
      <LeafParticleBurst />

      {/* 2. Top Floating Sketchbook Ribbon Navbar */}
      <SketchbookNavbar
        currentFrame={currentFrame}
        totalFrames={totalFrames}
        scrollProgress={scrollProgress}
      />

      {/* 3. Full-Screen Sticky Background Canvas (100% Scroll-Linked) */}
      <GhibliScrollCanvas
        scrollProgress={scrollProgress}
        onFrameChange={handleFrameChange}
      />

      {/* 4. Left Scroll Progress Spine Indicator */}
      <div className="fixed left-4 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-center gap-2 pointer-events-none">
        <span className="text-[10px] font-mono font-bold text-[#7A9A7E] -rotate-90 origin-center mb-4">
          JOURNEY
        </span>
        <div className="w-1.5 h-48 rounded-full bg-[#EAE1D3] relative overflow-hidden border border-[#D8C7B0]/60">
          <div
            className="w-full bg-[#7A9A7E] rounded-full transition-all duration-75"
            style={{ height: `${Math.round(scrollProgress * 100)}%` }}
          />
        </div>
        <span className="text-[10px] font-mono text-[#3D352E]/60 mt-4">
          {Math.round(scrollProgress * 100)}%
        </span>
      </div>

      {/* 5. The 5 Foreground Content Sections (100vh each along the 500vh track) */}
      <div className="relative z-10 w-full flex flex-col">
        {/* Section 1: The Sunlit Study (0.00 - 0.20) */}
        <WelcomeStudySection />

        {/* Section 2: Botanist Shelf / Skills (0.20 - 0.40) */}
        <BotanistShelfSection />

        {/* Section 3: Field Journal / Projects (0.40 - 0.60) */}
        <FieldJournalProjectsSection />

        {/* Section 4: Greenhouse Logbook / Education & GitHub (0.60 - 0.80) */}
        <GreenhouseLogbookSection />

        {/* Section 5: Sunset Postbox / Contact (0.80 - 1.00) */}
        <SunsetPostboxSection />
      </div>
    </main>
  );
}