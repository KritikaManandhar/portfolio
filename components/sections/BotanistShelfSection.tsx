"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Sprout,
  Droplets,
  Sparkles,
  Code,
  Database,
  Palette,
  Leaf,
  Flower2,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import { triggerLeafBurst } from "@/components/particles/LeafParticleBurst";
import { chimeEngine } from "@/components/audio/ChimeEngine";
import ParchmentScroll from "@/components/ui/ParchmentScroll";

interface SkillItem {
  name: string;
  tag: string;
  description: string;
}

interface ShelfScrollData {
  id: string;
  chapterNumber: string;
  shortTitle: string;
  badgeLabel: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  accentColor: string;
  skills: SkillItem[];
  footerNote: string;
}

const SHELF_SCROLLS: ShelfScrollData[] = [
  {
    id: "programming",
    chapterNumber: "01",
    shortTitle: "Programming",
    badgeLabel: "Specimen Folio 01 • Core Logic",
    title: "Programming Languages & Algorithms",
    subtitle:
      "Foundational software logic, object-oriented paradigms, and system compilation.",
    icon: <Code className="w-4 h-4 text-[#6B8A68]" />,
    accentColor: "border-[#6B8A68]/40 bg-[#6B8A68]/15 text-[#6B8A68]",
    skills: [
      {
        name: "JavaScript",
        tag: "Dynamic Scripting",
        description: "ES6+ standards, asynchronous logic, and interactive DOM dynamics.",
      },
      {
        name: "PHP",
        tag: "Server-Side Architecture",
        description: "Backend execution, MySQL persistence, session auth, and MVC design.",
      },
      {
        name: "C",
        tag: "Low-Level Systems",
        description: "Memory pointers, data structure algorithms, and computational speed.",
      },
      {
        name: "C++",
        tag: "Object-Oriented Design",
        description: "Class hierarchies, polymorphism, memory safety, and performance.",
      },
      {
        name: "Java",
        tag: "Robust OOP",
        description: "Enterprise class architecture, strict typing, and JVM modularity.",
      },
    ],
    footerNote:
      "Field Note: Padmakanya CSIT Laboratory Coursework • OOP & Computational Foundations",
  },
  {
    id: "web-databases",
    chapterNumber: "02",
    shortTitle: "Web & Databases",
    badgeLabel: "Specimen Folio 02 • Web & Data Vault",
    title: "Web Architectures & Database Systems",
    subtitle:
      "Semantic web markup, responsive UI layouts, relational schemas, and ACID transactions.",
    icon: <Database className="w-4 h-4 text-[#D0684D]" />,
    accentColor: "border-[#D0684D]/40 bg-[#D0684D]/15 text-[#D0684D]",
    skills: [
      {
        name: "HTML5",
        tag: "Document Structure",
        description: "Semantic page anatomy, accessible web elements, and multimedia APIs.",
      },
      {
        name: "CSS3",
        tag: "Visual Styling & Motion",
        description: "Responsive Flexbox & CSS Grid, keyframes, and fluid viewport layouts.",
      },
      {
        name: "MySQL",
        tag: "Relational Database Engine",
        description: "Schema normalization, indexed queries, foreign keys, and transactions.",
      },
      {
        name: "SQL Server",
        tag: "Enterprise Relational Management",
        description: "Structured T-SQL queries, relational views, and integrity constraints.",
      },
    ],
    footerNote:
      "Field Note: Relational schema models integrated with responsive UI frontends",
  },
  {
    id: "design-training",
    chapterNumber: "03",
    shortTitle: "Design & Training",
    badgeLabel: "Specimen Folio 03 • UI Craft & Training",
    title: "Design Tools & Certified Training",
    subtitle:
      "Interactive wireframing, design systems, visual branding, and accredited professional training.",
    icon: <Palette className="w-4 h-4 text-[#8C5835]" />,
    accentColor: "border-[#C29B72]/50 bg-[#C29B72]/20 text-[#8C5835]",
    skills: [
      {
        name: "Figma",
        tag: "UI/UX Prototyping",
        description: "High-fidelity wireframes, interactive component variants, and design systems.",
      },
      {
        name: "Canva",
        tag: "Visual Branding & Assets",
        description: "Visual identity composition, presentation craft, and vector illustrations.",
      },
      {
        name: "Web Design Training",
        tag: "Broadway Infosys Nepal",
        description:
          "Comprehensive accredited diploma in modern responsive web design, UX standards, and frontend workflow.",
      },
    ],
    footerNote:
      "Field Note: Broadway Infosys Certified Web Design Diploma • Nepal",
  },
];

export default function BotanistShelfSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [activeScrollIndex, setActiveScrollIndex] = useState<number>(0);
  const [bloomed, setBloomed] = useState<boolean>(false);

  // Synchronize carousel slide with native window scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const totalDistance = rect.height - window.innerHeight;
      if (totalDistance <= 0) return;

      const scrolledIntoSection = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolledIntoSection / totalDistance));

      let nextIndex = 0;
      if (progress >= 0.67) {
        nextIndex = 2;
      } else if (progress >= 0.33) {
        nextIndex = 1;
      } else {
        nextIndex = 0;
      }

      setActiveScrollIndex((prev) => {
        if (prev !== nextIndex) {
          if (chimeEngine) {
            chimeEngine.playPaperRustle();
          }
          return nextIndex;
        }
        return prev;
      });
    };

    const rafId = requestAnimationFrame(handleScroll);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Smoothly scroll window to target scroll slide
  const scrollToScrollIndex = (targetIndex: number) => {
    const section = sectionRef.current;
    if (!section) return;

    const totalDistance = section.offsetHeight - window.innerHeight;
    if (totalDistance <= 0) return;

    // Target midpoints: 0 -> 0.15, 1 -> 0.50, 2 -> 0.85
    const progressTargets = [0.15, 0.50, 0.85];
    const targetY = section.offsetTop + progressTargets[targetIndex] * totalDistance;

    window.scrollTo({
      top: targetY,
      behavior: "smooth",
    });

    setActiveScrollIndex(targetIndex);
    if (chimeEngine) {
      chimeEngine.playPaperRustle();
    }
  };

  const handleSelectTab = (idx: number, e: React.MouseEvent) => {
    triggerLeafBurst(e.clientX, e.clientY, true);
    scrollToScrollIndex(idx);
  };

  const handlePrevScroll = (e: React.MouseEvent) => {
    triggerLeafBurst(e.clientX, e.clientY, true);
    if (activeScrollIndex > 0) {
      scrollToScrollIndex(activeScrollIndex - 1);
    }
  };

  const handleNextScroll = (e: React.MouseEvent) => {
    triggerLeafBurst(e.clientX, e.clientY, true);
    if (activeScrollIndex < SHELF_SCROLLS.length - 1) {
      scrollToScrollIndex(activeScrollIndex + 1);
    }
  };

  const handleWaterCan = (e: React.MouseEvent) => {
    triggerLeafBurst(e.clientX, e.clientY, true);
    setBloomed(true);
    if (chimeEngine) {
      chimeEngine.playBreezeChord();
    }
    setTimeout(() => setBloomed(false), 3500);
  };

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative min-h-[300vh] w-full"
    >
      {/* Pinned Viewport Container */}
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center px-3 sm:px-6 pt-14 pb-4 overflow-hidden z-10">
        {/* Top Control Bar: Tag & Interactive Watering Can */}
        <div className="w-full max-w-[760px] flex items-center justify-between gap-2 mb-2 px-1">
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wider text-[#6B8A68] bg-[#6B8A68]/15 border border-[#6B8A68]/35 flex items-center gap-1.5 shadow-2xs">
            <Sprout className="w-3 h-3 text-[#6B8A68]" />
            <span>Section 02 • Botanist Field Guide</span>
          </span>

          {/* Interactive Watering Can */}
          <button
            type="button"
            onClick={handleWaterCan}
            className="px-3 py-1 rounded-md bg-[#FFFDF7] hover:bg-[#F5ECD2] border border-[#C29B72]/70 text-[11px] font-serif font-semibold text-[#3D2E24] flex items-center gap-1.5 shadow-2xs transition-all active:scale-95 cursor-pointer"
            title="Water specimens to bloom flowers across all scrolls"
          >
            <Droplets className="w-3 h-3 text-[#6B8A68]" />
            <span>{bloomed ? "Vibrant & Blooming!" : "Water Plants"}</span>
            {bloomed && <Sparkles className="w-2.5 h-2.5 text-[#D0684D]" />}
          </button>
        </div>

        {/* Carousel Navigation Header Ribbon */}
        <div className="w-full max-w-[760px] flex items-center justify-between gap-2 mb-2 px-1">
          {/* Chapter Selector Tabs */}
          <div className="flex items-center gap-1 sm:gap-2">
            {SHELF_SCROLLS.map((s, idx) => {
              const isActive = activeScrollIndex === idx;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={(e) => handleSelectTab(idx, e)}
                  className={`px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-serif transition-all flex items-center gap-1.5 border cursor-pointer select-none ${
                    isActive
                      ? "bg-[#6B8A68] text-white border-[#536E50] shadow-xs scale-102 font-medium"
                      : "bg-[#FAF5E8]/90 text-[#5C381E]/75 border-[#C29B72]/45 hover:bg-[#F3ECE1] hover:text-[#D0684D]"
                  }`}
                >
                  <span className="text-[10px] font-mono opacity-80">
                    {s.chapterNumber}
                  </span>
                  <span>{s.shortTitle}</span>
                </button>
              );
            })}
          </div>

          {/* Previous / Next Arrow Controls & Page Indicator */}
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={handlePrevScroll}
              disabled={activeScrollIndex === 0}
              className="p-1 sm:p-1.5 rounded-full border border-[#C29B72]/50 bg-[#FAF5E8]/95 text-[#3D2E24] hover:bg-[#F3ECE1] disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer shadow-2xs active:scale-95"
              aria-label="Previous scroll"
              title="Previous scroll"
            >
              <ChevronLeft className="w-3.5 h-3.5 text-[#5C381E]" />
            </button>
            <span className="text-[10px] sm:text-[11px] font-mono text-[#5C381E]/75 px-1 select-none">
              {activeScrollIndex + 1} / {SHELF_SCROLLS.length}
            </span>
            <button
              type="button"
              onClick={handleNextScroll}
              disabled={activeScrollIndex === SHELF_SCROLLS.length - 1}
              className="p-1 sm:p-1.5 rounded-full border border-[#C29B72]/50 bg-[#FAF5E8]/95 text-[#3D2E24] hover:bg-[#F3ECE1] disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer shadow-2xs active:scale-95"
              aria-label="Next scroll"
              title="Next scroll"
            >
              <ChevronRight className="w-3.5 h-3.5 text-[#5C381E]" />
            </button>
          </div>
        </div>

        {/* Carousel Frame: Each Scroll Unrolled Independently */}
        <div className="relative w-full max-w-[760px] min-h-[440px] sm:min-h-[470px] flex items-center justify-center">
          {SHELF_SCROLLS.map((scroll, index) => {
            const isCurrent = activeScrollIndex === index;
            const isPast = index < activeScrollIndex;

            return (
              <div
                key={scroll.id}
                className={`w-full transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  isCurrent
                    ? "opacity-100 translate-x-0 scale-100 relative z-20 pointer-events-auto"
                    : isPast
                    ? "opacity-0 -translate-x-[115%] scale-95 absolute inset-0 z-10 pointer-events-none"
                    : "opacity-0 translate-x-[115%] scale-95 absolute inset-0 z-10 pointer-events-none"
                }`}
              >
                <ParchmentScroll maxWidth="max-w-[760px]">
                  {/* Scroll Header */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-semibold tracking-wider border flex items-center gap-1.5 shadow-2xs ${scroll.accentColor}`}
                    >
                      {scroll.icon}
                      <span>{scroll.badgeLabel}</span>
                    </span>

                    <span className="text-[11px] font-mono text-[#5C381E]/60 italic hidden sm:inline">
                      Chapter II • Scroll {scroll.chapterNumber}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#3D2E24] tracking-tight mb-1">
                    {scroll.title}
                  </h3>
                  <p className="text-xs sm:text-[13px] text-[#5C381E]/80 mb-4 font-serif">
                    {scroll.subtitle}
                  </p>

                  {/* Herbarium Specimens Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5 mb-3">
                    {scroll.skills.map((skill) => (
                      <div
                        key={skill.name}
                        onClick={(e) =>
                          triggerLeafBurst(e.clientX, e.clientY, true)
                        }
                        className={`p-2 sm:p-2.5 rounded-lg border transition-all cursor-pointer shadow-2xs select-none ${
                          bloomed
                            ? "bg-[#D0684D]/10 border-[#D0684D] scale-[1.02]"
                            : "bg-[#FFFDF7] border-[#C29B72]/45 hover:border-[#6B8A68] hover:bg-[#FAF5E8]"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-1.5">
                            {bloomed ? (
                              <Flower2 className="w-3 h-3 text-[#D0684D] animate-spin-slow" />
                            ) : (
                              <Leaf className="w-3 h-3 text-[#6B8A68]" />
                            )}
                            <span className="font-serif font-bold text-xs sm:text-[13px] text-[#3D2E24]">
                              {skill.name}
                            </span>
                          </div>
                          <span className="text-[9px] sm:text-[10px] font-mono text-[#C29B72] px-1.5 py-0.5 rounded-sm bg-[#FAF5E8] border border-[#C29B72]/30">
                            {skill.tag}
                          </span>
                        </div>
                        <p className="text-[10px] sm:text-[11px] text-[#5C381E]/75 leading-snug">
                          {skill.description}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Botanical Observation Footer */}
                  <div className="pt-2 border-t border-[#C29B72]/40 flex flex-wrap items-center justify-between gap-1 text-[10px] sm:text-[11px] text-[#5C381E]/70 font-serif italic">
                    <span>{scroll.footerNote}</span>
                    <span className="text-[#6B8A68] font-mono">
                      Scroll {scroll.chapterNumber} of 03
                    </span>
                  </div>
                </ParchmentScroll>
              </div>
            );
          })}
        </div>

        {/* Bottom Interactive Scroll Hint */}
        <div className="flex items-center justify-center gap-1.5 mt-2 text-[10px] sm:text-[11px] font-serif text-[#5C381E]/75 select-none pointer-events-none">
          <span className="w-1.5 h-1.5 rounded-full bg-[#6B8A68] animate-ping" />
          <span>
            {activeScrollIndex < SHELF_SCROLLS.length - 1
              ? "Scroll down to unroll next scroll"
              : "Scroll down to enter Field Journal"}
          </span>
          <ChevronDown className="w-3 h-3 text-[#6B8A68] animate-bounce" />
        </div>
      </div>
    </section>
  );
}
