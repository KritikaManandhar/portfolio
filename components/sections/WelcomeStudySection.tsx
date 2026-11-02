"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Sprout, Coffee, Cat, Scroll, Mail, Sparkles } from "lucide-react";
import { triggerLeafBurst } from "@/components/particles/LeafParticleBurst";
import { chimeEngine } from "@/components/audio/ChimeEngine";
import { GithubIcon } from "@/components/ui/VectorIcons";
import ParchmentScroll from "@/components/ui/ParchmentScroll";

export default function WelcomeStudySection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [unrollProgress, setUnrollProgress] = useState<number>(0);
  const [catPurring, setCatPurring] = useState<boolean>(false);
  const [mugSteam, setMugSteam] = useState<boolean>(true);

  // Scroll-driven unroll tracking through Section 1's pinned track
  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const totalDistance = rect.height - window.innerHeight;
      if (totalDistance <= 0) {
        setUnrollProgress(1.0);
        return;
      }

      const scrolledIntoSection = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolledIntoSection / totalDistance));

      // As user scrolls through the first 25% of Section 1:
      // unroll smoothly grows from 0.0 to 1.0!
      // Once progress >= 0.25, unroll stays 1.0 (fully open, stable, interactive)
      const unroll = Math.max(0, Math.min(1, progress / 0.25));
      setUnrollProgress(unroll);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCatClick = (e: React.MouseEvent) => {
    triggerLeafBurst(e.clientX, e.clientY, true);
    setCatPurring(true);
    setTimeout(() => setCatPurring(false), 2400);
  };

  const handleMugClick = (e: React.MouseEvent) => {
    triggerLeafBurst(e.clientX, e.clientY, true);
    setMugSteam((prev) => !prev);
  };

  const handlePhotoClick = (e: React.MouseEvent) => {
    triggerLeafBurst(e.clientX, e.clientY, true);
    if (chimeEngine) {
      chimeEngine.playChime(4);
    }
  };

  const handleScrollTo = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    triggerLeafBurst(e.clientX, e.clientY, true);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="study"
      ref={sectionRef}
      className="relative min-h-[200vh] w-full"
    >
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center px-4 sm:px-6 pt-12 pb-6 relative z-10 overflow-hidden">
        <ParchmentScroll
          maxWidth="max-w-[700px]"
          scrollAnimated
          unrollProgress={unrollProgress}
          contentPadding="px-5 sm:px-7 md:px-8 py-4 sm:py-5"
          sealLabel="Section 01 • Sunlit Study Folio"
          onUnroll={() => {
            const section = sectionRef.current;
            if (section) {
              const totalDistance = section.offsetHeight - window.innerHeight;
              window.scrollTo({
                top: section.offsetTop + 0.3 * totalDistance,
                behavior: "smooth",
              });
            }
          }}
        >
        {/* Section Header Tag */}
        <div className="flex items-center justify-between mb-3">
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wider text-[#6B8A68] bg-[#6B8A68]/15 border border-[#6B8A68]/35 flex items-center gap-1.5 shadow-2xs">
            <Sprout className="w-3 h-3 text-[#6B8A68]" />
            <span>Section 01 • The Sunlit Study</span>
          </span>
          <span className="text-[11px] text-[#5C381E]/70 font-serif italic">
            Padmakanya Campus, TU
          </span>
        </div>

        {/* Scholar Intro: Profile Portrait & Biography */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-5 mb-4">
          {/* Profile Picture Mounted on Parchment */}
          <div
            onClick={handlePhotoClick}
            className="relative shrink-0 group cursor-pointer select-none"
            title="Click to greet Kritika in the study"
          >
            {/* Washi Tape Strip at the Top */}
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-12 sm:w-14 h-3.5 bg-[#E2C799]/85 border-x border-[#C29B72]/60 rotate-[-2deg] shadow-2xs backdrop-blur-2xs rounded-2xs pointer-events-none z-20 flex items-center justify-center">
              <div className="w-7 h-[1px] bg-[#8A5228]/25" />
            </div>

            {/* Framed Portrait Card */}
            <div className="relative w-24 h-28 sm:w-32 sm:h-38 md:w-36 md:h-42 rounded-xl overflow-hidden bg-[#FAF4E6] border-2 border-[#C29B72]/70 shadow-[0_8px_18px_rgba(50,25,10,0.18)] transition-all duration-300 group-hover:shadow-[0_12px_26px_rgba(50,25,10,0.26)] group-hover:border-[#6B8A68] group-hover:rotate-1">
              {/* Antique Brass Photo Corners */}
              <div className="absolute top-1 left-1 w-2.5 h-2.5 border-t-2 border-l-2 border-[#8A5228]/50 rounded-tl-xs pointer-events-none z-10" />
              <div className="absolute top-1 right-1 w-2.5 h-2.5 border-t-2 border-r-2 border-[#8A5228]/50 rounded-tr-xs pointer-events-none z-10" />
              <div className="absolute bottom-1 left-1 w-2.5 h-2.5 border-b-2 border-l-2 border-[#8A5228]/50 rounded-bl-xs pointer-events-none z-10" />
              <div className="absolute bottom-1 right-1 w-2.5 h-2.5 border-b-2 border-r-2 border-[#8A5228]/50 rounded-br-xs pointer-events-none z-10" />

              {/* Profile Image */}
              <Image
                src="/profile.png"
                alt="Kritika Manandhar portrait in the study"
                fill
                sizes="(max-width: 640px) 96px, 144px"
                className="object-cover object-top select-none pointer-events-none transition-transform duration-500 group-hover:scale-105"
                priority
              />

              {/* Warm Ambient Watercolor Lighting Wash */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#4A260C]/25 via-transparent to-transparent pointer-events-none" />
              <div className="absolute inset-0 ring-1 ring-inset ring-[#8A5228]/20 rounded-xl pointer-events-none" />
            </div>

            {/* Little Botanical Scholar Badge */}
            <div className="absolute -bottom-1 -right-1 px-1.5 py-0.5 rounded-full bg-[#FFFDF7] border border-[#C29B72]/80 shadow-2xs flex items-center gap-1 select-none pointer-events-none">
              <span className="w-1.5 h-1.5 rounded-full bg-[#6B8A68] animate-pulse" />
              <span className="text-[9px] font-serif font-semibold text-[#5C381E]/90">Scholar</span>
            </div>
          </div>

          {/* Name, Subtitle & Bio Details */}
          <div className="flex-1 text-center sm:text-left">
            <h1 className="text-xl sm:text-2xl md:text-[28px] font-serif font-bold text-[#3D2E24] tracking-tight leading-tight mb-1">
              Hi, I&apos;m <span className="text-[#D0684D]">Kritika Manandhar</span>.
            </h1>
            <p className="text-[11px] sm:text-xs md:text-[13px] font-serif italic text-[#6B8A68] mb-2 sm:mb-2.5">
              Aspiring Software Developer • Web Designer • Kathmandu, Nepal
            </p>
            <p className="text-xs sm:text-[13px] text-[#3D2E24]/85 leading-relaxed font-serif">
              Motivated IT student currently pursuing a Bachelor in Computer Science and
              Information Technology (B.Sc. CSIT) at Padmakanya Multiple Campus,
              Tribhuvan University. Passionate about software development, web design,
              and crafting thoughtful, user-friendly digital experiences inspired by
              warm storytelling and mindful design.
            </p>
          </div>
        </div>

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
      </div>
    </section>
  );
}
