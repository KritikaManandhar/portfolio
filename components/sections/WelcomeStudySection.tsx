"use client";

import React, { useState } from "react";
import { Sprout, Coffee, Cat, Scroll, Mail, Sparkles } from "lucide-react";
import { triggerLeafBurst } from "@/components/particles/LeafParticleBurst";
import { GithubIcon } from "@/components/ui/VectorIcons";

export default function WelcomeStudySection() {
  const [catPurring, setCatPurring] = useState<boolean>(false);
  const [mugSteam, setMugSteam] = useState<boolean>(true);

  const handleCatClick = (e: React.MouseEvent) => {
    triggerLeafBurst(e.clientX, e.clientY, true);
    setCatPurring(true);
    setTimeout(() => setCatPurring(false), 2400);
  };

  const handleMugClick = (e: React.MouseEvent) => {
    triggerLeafBurst(e.clientX, e.clientY, true);
    setMugSteam((prev) => !prev);
  };

  const handleScrollTo = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    triggerLeafBurst(e.clientX, e.clientY, true);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="study"
      className="min-h-screen w-full flex items-center justify-center px-4 sm:px-6 py-20 relative z-10"
    >
      <div className="max-w-3xl w-full ghibli-card p-6 sm:p-10 relative">
        {/* Washi Tape Accent */}
        <div className="washi-tape washi-tape-top-left" />
        <div className="washi-tape washi-tape-top-right" />

        {/* Section Header Tag */}
        <div className="flex items-center justify-between mb-4">
          <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wider text-[#7A9A7E] bg-[#7A9A7E]/15 border border-[#7A9A7E]/30 flex items-center gap-1.5">
            <Sprout className="w-3.5 h-3.5 text-[#7A9A7E]" />
            <span>Section 01 • The Sunlit Study</span>
          </span>
          <span className="text-xs text-[#3D352E]/60 font-mono">
            Padmakanya Campus, TU
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#3D352E] tracking-tight leading-tight mb-3">
          Hi, I&apos;m <span className="text-[#E07A5F]">Kritika Manandhar</span>.
        </h1>
        <p className="text-sm sm:text-base font-medium text-[#7A9A7E] mb-4">
          Aspiring Software Developer • Web Designer • Kathmandu, Nepal
        </p>

        {/* Bio Copy */}
        <p className="text-sm sm:text-base text-[#3D352E]/85 leading-relaxed mb-6 font-sans">
          Motivated IT student currently pursuing a Bachelor in Computer Science and
          Information Technology (B.Sc. CSIT) at Padmakanya Multiple Campus,
          Tribhuvan University. Passionate about software development, web design,
          and crafting thoughtful, user-friendly digital experiences inspired by
          warm storytelling and mindful design.
        </p>

        {/* Interactive Desk Illustrations: Steaming Mug & Sleepy Calico Cat */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {/* Steaming Mug Spot */}
          <div
            onClick={handleMugClick}
            className="p-4 rounded-2xl bg-[#FAF6F0] border border-[#7A9A7E]/20 flex items-center gap-4 cursor-pointer hover:border-[#7A9A7E]/50 transition-all group"
          >
            <div className="relative select-none p-2 rounded-xl bg-[#7A9A7E]/10">
              <Coffee className="w-7 h-7 text-[#7A9A7E]" />
              {mugSteam && (
                <span className="absolute -top-3 left-4 text-xs text-[#7A9A7E] font-serif animate-steam pointer-events-none">
                  ~
                </span>
              )}
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#3D352E] group-hover:text-[#E07A5F] transition-colors">
                Steaming Matcha Mug
              </h4>
              <p className="text-[11px] text-[#3D352E]/70">
                Click to sip or stir the tea steam
              </p>
            </div>
          </div>

          {/* Sleepy Calico Cat Spot */}
          <div
            onClick={handleCatClick}
            className="p-4 rounded-2xl bg-[#FAF6F0] border border-[#E07A5F]/20 flex items-center gap-4 cursor-pointer hover:border-[#E07A5F]/50 transition-all group relative"
          >
            <div className="p-2 rounded-xl bg-[#E07A5F]/10 select-none animate-ghibli-float">
              <Cat className="w-7 h-7 text-[#E07A5F]" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#3D352E] group-hover:text-[#E07A5F] transition-colors">
                Sleepy Calico Familiar
              </h4>
              <p className="text-[11px] text-[#3D352E]/70">
                {catPurring ? "Purr... soft meow!" : "Curled by the windowsill"}
              </p>
            </div>
            {catPurring && (
              <span className="absolute -top-3 right-3 px-2.5 py-0.5 rounded-full bg-[#E07A5F] text-white text-[10px] font-medium shadow-xs animate-bounce flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5" />
                <span>Meow!</span>
              </span>
            )}
          </div>
        </div>

        {/* Action CTAs */}
        <div className="flex flex-wrap gap-3 pt-2">
          <a
            href="#projects"
            onClick={(e) => handleScrollTo(e, "projects")}
            className="px-5 py-2.5 rounded-xl bg-[#7A9A7E] hover:bg-[#68886C] text-white text-xs sm:text-sm font-semibold transition-all shadow-sm flex items-center gap-2"
          >
            <Scroll className="w-4 h-4" />
            <span>View Field Journal</span>
          </a>
          <a
            href="#postbox"
            onClick={(e) => handleScrollTo(e, "postbox")}
            className="px-5 py-2.5 rounded-xl bg-[#FAF6F0] hover:bg-[#F3ECE1] border border-[#D8C7B0] text-[#3D352E] text-xs sm:text-sm font-semibold transition-all flex items-center gap-2"
          >
            <Mail className="w-4 h-4 text-[#E07A5F]" />
            <span>Send a Postcard</span>
          </a>
          <a
            href="https://github.com/KritikaManandhar"
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => triggerLeafBurst(e.clientX, e.clientY, true)}
            className="px-4 py-2.5 rounded-xl bg-[#FAF6F0] hover:bg-[#F3ECE1] border border-[#D8C7B0] text-[#3D352E] text-xs sm:text-sm font-semibold transition-all flex items-center gap-2"
          >
            <GithubIcon className="w-4 h-4 text-[#3D352E]" />
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </section>
  );
}
