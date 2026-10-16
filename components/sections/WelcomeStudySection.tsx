"use client";

import React, { useState } from "react";
import { Sprout, Coffee, Cat, Scroll, Mail, Sparkles } from "lucide-react";
import { triggerLeafBurst } from "@/components/particles/LeafParticleBurst";
import { GithubIcon } from "@/components/ui/VectorIcons";
import ParchmentScroll from "@/components/ui/ParchmentScroll";

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
      className="min-h-screen w-full flex items-center justify-center px-4 sm:px-6 pt-14 pb-6 relative z-10"
    >
      <ParchmentScroll maxWidth="max-w-[700px]" sealText="吉">
        {/* Section Header Tag */}
        <div className="flex items-center justify-between mb-3 pr-10">
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wider text-[#6B8A68] bg-[#6B8A68]/15 border border-[#6B8A68]/35 flex items-center gap-1.5 shadow-2xs">
            <Sprout className="w-3 h-3 text-[#6B8A68]" />
            <span>Section 01 • The Sunlit Study</span>
          </span>
          <span className="text-[11px] text-[#5C381E]/70 font-serif italic">
            Padmakanya Campus, TU
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="text-2xl sm:text-[28px] font-serif font-bold text-[#3D2E24] tracking-tight leading-tight mb-1">
          Hi, I&apos;m <span className="text-[#D0684D]">Kritika Manandhar</span>.
        </h1>
        <p className="text-xs sm:text-[13px] font-serif italic text-[#6B8A68] mb-3">
          Aspiring Software Developer • Web Designer • Kathmandu, Nepal
        </p>

        {/* Bio Copy */}
        <p className="text-xs sm:text-[13px] text-[#3D2E24]/85 leading-relaxed mb-4 font-serif">
          Motivated IT student currently pursuing a Bachelor in Computer Science and
          Information Technology (B.Sc. CSIT) at Padmakanya Multiple Campus,
          Tribhuvan University. Passionate about software development, web design,
          and crafting thoughtful, user-friendly digital experiences inspired by
          warm storytelling and mindful design.
        </p>

        {/* Interactive Desk Illustrations: Steaming Mug & Sleepy Calico Cat */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
          {/* Steaming Mug Spot */}
          <div
            onClick={handleMugClick}
            className="p-2.5 sm:p-3 rounded-lg bg-[#FFFDF7] border border-[#C29B72]/45 flex items-center gap-3 cursor-pointer hover:border-[#6B8A68] transition-all group shadow-2xs"
          >
            <div className="relative select-none p-2 rounded-md bg-[#6B8A68]/15 border border-[#6B8A68]/30 shrink-0">
              <Coffee className="w-5 h-5 text-[#6B8A68]" />
              {mugSteam && (
                <span className="absolute -top-2.5 left-3 text-[10px] text-[#6B8A68] font-serif animate-steam pointer-events-none">
                  ~
                </span>
              )}
            </div>
            <div>
              <h4 className="text-[11px] font-serif font-bold text-[#3D2E24] group-hover:text-[#D0684D] transition-colors leading-tight">
                Steaming Matcha Mug
              </h4>
              <p className="text-[10px] text-[#5C381E]/70 font-sans mt-0.5">
                Click to sip or stir the tea steam
              </p>
            </div>
          </div>

          {/* Sleepy Calico Cat Spot */}
          <div
            onClick={handleCatClick}
            className="p-2.5 sm:p-3 rounded-lg bg-[#FFFDF7] border border-[#C29B72]/45 flex items-center gap-3 cursor-pointer hover:border-[#D0684D] transition-all group relative shadow-2xs"
          >
            <div className="p-2 rounded-md bg-[#D0684D]/15 border border-[#D0684D]/30 select-none animate-ghibli-float shrink-0">
              <Cat className="w-5 h-5 text-[#D0684D]" />
            </div>
            <div>
              <h4 className="text-[11px] font-serif font-bold text-[#3D2E24] group-hover:text-[#D0684D] transition-colors leading-tight">
                Sleepy Calico Familiar
              </h4>
              <p className="text-[10px] text-[#5C381E]/70 font-sans mt-0.5">
                {catPurring ? "Purr... soft meow!" : "Curled by the windowsill"}
              </p>
            </div>
            {catPurring && (
              <span className="absolute -top-2.5 right-2 px-2 py-0.5 rounded-full bg-[#D0684D] text-white text-[9px] font-medium shadow-xs animate-bounce flex items-center gap-1">
                <Sparkles className="w-2 h-2" />
                <span>Meow!</span>
              </span>
            )}
          </div>
        </div>

        {/* Action CTAs */}
        <div className="flex flex-wrap gap-2.5 pt-1">
          <a
            href="#projects"
            onClick={(e) => handleScrollTo(e, "projects")}
            className="px-4 py-2 rounded-md bg-[#6B8A68] hover:bg-[#5A7757] text-[#FFFDF9] text-xs font-semibold transition-all shadow-xs border border-[#4E6B4B] flex items-center gap-1.5"
          >
            <Scroll className="w-3.5 h-3.5" />
            <span>View Field Journal</span>
          </a>
          <a
            href="#postbox"
            onClick={(e) => handleScrollTo(e, "postbox")}
            className="px-4 py-2 rounded-md bg-[#FFFDF7] hover:bg-[#F5ECD2] border border-[#C29B72]/70 text-[#3D2E24] text-xs font-semibold transition-all flex items-center gap-1.5 shadow-2xs"
          >
            <Mail className="w-3.5 h-3.5 text-[#D0684D]" />
            <span>Send a Postcard</span>
          </a>
          <a
            href="https://github.com/KritikaManandhar"
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => triggerLeafBurst(e.clientX, e.clientY, true)}
            className="px-3.5 py-2 rounded-md bg-[#FFFDF7] hover:bg-[#F5ECD2] border border-[#C29B72]/70 text-[#3D2E24] text-xs font-semibold transition-all flex items-center gap-1.5 shadow-2xs"
          >
            <GithubIcon className="w-3.5 h-3.5 text-[#3D2E24]" />
            <span>GitHub</span>
          </a>
        </div>
      </ParchmentScroll>
    </section>
  );
}
