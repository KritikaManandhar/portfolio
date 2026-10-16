"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Sprout,
  GraduationCap,
  Scroll,
  MapPin,
  Calendar,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  CheckCircle2,
} from "lucide-react";
import { triggerLeafBurst } from "@/components/particles/LeafParticleBurst";
import { chimeEngine } from "@/components/audio/ChimeEngine";
import { GithubIcon } from "@/components/ui/VectorIcons";
import ParchmentScroll from "@/components/ui/ParchmentScroll";

interface LogbookScrollData {
  id: string;
  chapterNumber: string;
  shortTitle: string;
  sealText: string;
  genus: string;
  specimen: string;
  institution: string;
  tenure: string;
  location: string;
  icon: React.ReactNode;
  accentColor: string;
  focus: string;
  modules: string[];
  githubUrl?: string;
  footerNote: string;
}

const LOGBOOK_SCROLLS: LogbookScrollData[] = [
  {
    id: "academic",
    chapterNumber: "01",
    shortTitle: "B.Sc. CSIT",
    sealText: "学",
    genus: "Academic Genus • University Degree",
    specimen: "B.Sc. Computer Science & Information Technology",
    institution: "Padmakanya Multiple Campus, Tribhuvan University",
    tenure: "2022 – 2026 (Undergraduate Candidate)",
    location: "Mhepi, Kathmandu, Nepal",
    icon: <GraduationCap className="w-4 h-4 text-[#6B8A68]" />,
    accentColor: "border-[#6B8A68]/40 bg-[#6B8A68]/15 text-[#6B8A68]",
    focus:
      "Rigorous theoretical computing foundations paired with intensive laboratory coursework.",
    modules: [
      "Data Structures & Algorithmic Complexity (C / C++)",
      "Object-Oriented Programming Paradigms (Java & C++)",
      "Database Management Systems & Relational SQL",
      "Web Technologies, Operating Systems & Networking",
    ],
    footerNote:
      "Field Observation: Padmakanya CSIT Laboratory Coursework • Kathmandu, Nepal",
  },
  {
    id: "vocational",
    chapterNumber: "02",
    shortTitle: "Web Design",
    sealText: "技",
    genus: "Practical Cultivation • Vocational Certification",
    specimen: "Professional Web Design Accredited Diploma",
    institution: "Broadway Infosys Nepal",
    tenure: "Core Professional Certificate",
    location: "Tinkune, Kathmandu, Nepal",
    icon: <Scroll className="w-4 h-4 text-[#D0684D]" />,
    accentColor: "border-[#D0684D]/40 bg-[#D0684D]/15 text-[#D0684D]",
    focus:
      "Industry-standard vocational training focused on modern responsive frontend engineering.",
    modules: [
      "HTML5 Semantic Document Anatomy & Modern Web APIs",
      "Responsive Styling with Mobile-First Flexbox & CSS Grid",
      "Interactive Wireframing & Design Systems in Figma",
      "Client-Side DOM Manipulation & Web Accessibility Heuristics",
    ],
    footerNote:
      "Field Observation: Broadway Infosys Certified Web Design Diploma • Nepal",
  },
  {
    id: "github-guild",
    chapterNumber: "03",
    shortTitle: "GitHub Guild",
    sealText: "源",
    genus: "Open Source Habitat • Version Control & Guild",
    specimen: "GitHub Developer Guild & Open Source Repositories",
    institution: "github.com/KritikaManandhar",
    tenure: "Active Practicum & Continuous Workflows",
    location: "Global Version Control & Code Repositories",
    icon: <GithubIcon className="w-4 h-4 text-[#8C5835]" />,
    accentColor: "border-[#C29B72]/50 bg-[#C29B72]/20 text-[#8C5835]",
    focus:
      "Active version-controlled development habitat with modular repositories and clean commit histories.",
    modules: [
      "Git Branching, Commit Discipline & Pull Request Collaboration",
      "Relational Database Backends & Dynamic Web Platforms",
      "Open-Source Repository Architecture & Documentation Standards",
      "Production Deployments & Modular Portfolio Implementations",
    ],
    githubUrl: "https://github.com/KritikaManandhar",
    footerNote:
      "Field Observation: Public GitHub Developer Guild • github.com/KritikaManandhar",
  },
];

export default function GreenhouseLogbookSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [activeScrollIndex, setActiveScrollIndex] = useState<number>(0);

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
    if (activeScrollIndex < LOGBOOK_SCROLLS.length - 1) {
      scrollToScrollIndex(activeScrollIndex + 1);
    }
  };

  return (
    <section
      id="greenhouse"
      ref={sectionRef}
      className="relative min-h-[300vh] w-full"
    >
      {/* Pinned Viewport Container */}
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center px-3 sm:px-6 pt-14 pb-4 overflow-hidden z-10">
        {/* Top Control Bar: Section Tag & Subtitle */}
        <div className="w-full max-w-[760px] flex items-center justify-between gap-2 mb-2 px-1">
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wider text-[#6B8A68] bg-[#6B8A68]/15 border border-[#6B8A68]/35 flex items-center gap-1.5 shadow-2xs">
            <Sprout className="w-3 h-3 text-[#6B8A68]" />
            <span>Section 04 • The Glass Greenhouse Logbook</span>
          </span>

          <span className="text-[11px] text-[#5C381E]/70 font-serif italic hidden sm:inline">
            Academic Foundation &amp; Guild
          </span>
        </div>

        {/* Carousel Navigation Header Ribbon */}
        <div className="w-full max-w-[760px] flex items-center justify-between gap-2 mb-2 px-1">
          {/* Chapter Selector Tabs */}
          <div className="flex items-center gap-1 sm:gap-2">
            {LOGBOOK_SCROLLS.map((log, idx) => {
              const isActive = activeScrollIndex === idx;
              return (
                <button
                  key={log.id}
                  type="button"
                  onClick={(e) => handleSelectTab(idx, e)}
                  className={`px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-serif transition-all flex items-center gap-1.5 border cursor-pointer select-none ${
                    isActive
                      ? "bg-[#6B8A68] text-white border-[#536E50] shadow-xs scale-102 font-medium"
                      : "bg-[#FAF5E8]/90 text-[#5C381E]/75 border-[#C29B72]/45 hover:bg-[#F3ECE1] hover:text-[#D0684D]"
                  }`}
                >
                  <span className="text-[10px] font-mono opacity-80">
                    {log.sealText}
                  </span>
                  <span>{log.shortTitle}</span>
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
              aria-label="Previous logbook entry"
              title="Previous logbook entry"
            >
              <ChevronLeft className="w-3.5 h-3.5 text-[#5C381E]" />
            </button>
            <span className="text-[10px] sm:text-[11px] font-mono text-[#5C381E]/75 px-1 select-none">
              {activeScrollIndex + 1} / {LOGBOOK_SCROLLS.length}
            </span>
            <button
              type="button"
              onClick={handleNextScroll}
              disabled={activeScrollIndex === LOGBOOK_SCROLLS.length - 1}
              className="p-1 sm:p-1.5 rounded-full border border-[#C29B72]/50 bg-[#FAF5E8]/95 text-[#3D2E24] hover:bg-[#F3ECE1] disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer shadow-2xs active:scale-95"
              aria-label="Next logbook entry"
              title="Next logbook entry"
            >
              <ChevronRight className="w-3.5 h-3.5 text-[#5C381E]" />
            </button>
          </div>
        </div>

        {/* Carousel Frame: Each Logbook Unrolled on Dedicated Parchment Scroll */}
        <div className="relative w-full max-w-[760px] min-h-[440px] sm:min-h-[470px] flex items-center justify-center">
          {LOGBOOK_SCROLLS.map((log, index) => {
            const isCurrent = activeScrollIndex === index;
            const isPast = index < activeScrollIndex;

            return (
              <div
                key={log.id}
                className={`w-full transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  isCurrent
                    ? "opacity-100 translate-x-0 scale-100 relative z-20 pointer-events-auto"
                    : isPast
                    ? "opacity-0 -translate-x-[115%] scale-95 absolute inset-0 z-10 pointer-events-none"
                    : "opacity-0 translate-x-[115%] scale-95 absolute inset-0 z-10 pointer-events-none"
                }`}
              >
                <ParchmentScroll maxWidth="max-w-[760px]" sealText={log.sealText}>
                  {/* Scroll Header */}
                  <div className="flex items-center justify-between gap-2 mb-2 pr-10">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-semibold tracking-wider border flex items-center gap-1.5 shadow-2xs ${log.accentColor}`}
                    >
                      {log.icon}
                      <span>{log.genus}</span>
                    </span>

                    <span className="text-[11px] font-mono text-[#5C381E]/60 italic hidden sm:inline">
                      Chapter IV • Log {log.chapterNumber}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#3D2E24] tracking-tight mb-0.5">
                    {log.specimen}
                  </h3>

                  {/* Metadata Chips: Institution, Tenure, Location */}
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="text-xs font-serif font-semibold text-[#6B8A68]">
                      {log.institution}
                    </span>
                    <span className="text-[#C29B72]">•</span>
                    <span className="text-[10px] font-mono text-[#5C381E]/80 bg-[#FAF5E8] px-2 py-0.5 rounded-sm border border-[#C29B72]/40 flex items-center gap-1">
                      <Calendar className="w-2.5 h-2.5 text-[#6B8A68]" />
                      <span>{log.tenure}</span>
                    </span>
                    <span className="text-[#C29B72]">•</span>
                    <span className="text-[10px] font-serif text-[#5C381E]/70 flex items-center gap-1 italic">
                      <MapPin className="w-2.5 h-2.5 text-[#D0684D]" />
                      <span>{log.location}</span>
                    </span>
                  </div>

                  <p className="text-xs sm:text-[13px] text-[#3D2E24]/85 leading-relaxed mb-3.5 font-serif">
                    {log.focus}
                  </p>

                  {/* Curricula & Competency Modules Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3.5">
                    {log.modules.map((mod, idx) => (
                      <div
                        key={idx}
                        onClick={(e) =>
                          triggerLeafBurst(e.clientX, e.clientY, true)
                        }
                        className="flex items-start gap-1.5 p-2 rounded-md bg-[#FFFDF7] border border-[#C29B72]/40 text-[11px] text-[#3D2E24] font-serif shadow-2xs cursor-pointer hover:border-[#6B8A68] hover:bg-[#FAF5E8] transition-all select-none"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#6B8A68] mt-0.5 shrink-0" />
                        <span className="leading-snug">{mod}</span>
                      </div>
                    ))}
                  </div>

                  {/* Actions & Botanical Observation Footer */}
                  <div className="pt-2.5 border-t border-[#C29B72]/40 flex flex-wrap items-center justify-between gap-2 text-[10px] sm:text-[11px] text-[#5C381E]/70 font-serif">
                    <span>{log.footerNote}</span>

                    {log.githubUrl && (
                      <a
                        href={log.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) =>
                          triggerLeafBurst(e.clientX, e.clientY, true)
                        }
                        className="px-3.5 py-1.5 rounded-md bg-[#6B8A68] hover:bg-[#5A7757] text-[#FFFDF9] text-[11px] font-semibold transition-all shadow-xs flex items-center gap-1.5 border border-[#4E6B4B]"
                      >
                        <GithubIcon className="w-3.5 h-3.5" />
                        <span>Open GitHub Profile &rarr;</span>
                      </a>
                    )}
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
            {activeScrollIndex < LOGBOOK_SCROLLS.length - 1
              ? "Scroll down to unroll next logbook scroll"
              : "Scroll down to enter Sunset Postbox"}
          </span>
          <ChevronDown className="w-3 h-3 text-[#6B8A68] animate-bounce" />
        </div>
      </div>
    </section>
  );
}
