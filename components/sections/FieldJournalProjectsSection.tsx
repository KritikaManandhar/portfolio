"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Palette,
  ShoppingBag,
  Lock,
  Search,
  X,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ShieldCheck,
} from "lucide-react";
import { triggerLeafBurst } from "@/components/particles/LeafParticleBurst";
import { chimeEngine } from "@/components/audio/ChimeEngine";
import { GithubIcon } from "@/components/ui/VectorIcons";
import ParchmentScroll from "@/components/ui/ParchmentScroll";

interface ProjectDetails {
  id: string;
  chapterNumber: string;
  badgeLabel: string;
  shortTitle: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  githubUrl: string;
  fieldNotes: string[];
  icon: React.ReactNode;
  accentColor: string;
  footerNote: string;
}

const PROJECTS: ProjectDetails[] = [
  {
    id: "ecommerce",
    chapterNumber: "01",
    badgeLabel: "Manuscript Folio 01 • Retail Architecture",
    shortTitle: "E-Commerce",
    title: "E-Commerce Website & Inventory Platform",
    subtitle: "Dynamic Storefront, Session Cart Engine & Relational Catalog",
    description:
      "A complete online retail web application featuring real-time product discovery, interactive shopping cart management, persistent user wishlist, and secure session authentication integrated with a relational MySQL database.",
    tags: ["PHP", "MySQL", "HTML5", "CSS3", "JavaScript"],
    githubUrl: "https://github.com/KritikaManandhar/E-commerce-website",
    fieldNotes: [
      "Relational product categorization with dynamic price & category filtering.",
      "Session-based cart persistence and order quantity calculations.",
      "Password hashing and SQL injection mitigation on user auth routes.",
      "Responsive storefront grid styled for mobile & desktop screens.",
    ],
    icon: <ShoppingBag className="w-4 h-4 text-[#D0684D]" />,
    accentColor: "border-[#D0684D]/40 bg-[#D0684D]/15 text-[#D0684D]",
    footerNote:
      "Field Observation: Dynamic storefront deployment with relational database persistence",
  },
  {
    id: "auth-system",
    chapterNumber: "02",
    badgeLabel: "Manuscript Folio 02 • Security & Student Portal",
    shortTitle: "Student Portal",
    title: "Student Registration & Login System",
    subtitle: "Secure Input Sanitization, Session Cookies & Error Handling",
    description:
      "A structured student onboarding form and authentication portal featuring comprehensive client/server-side validation, error handling, session cookies, and clean responsive layout design for optimized usability.",
    tags: ["PHP", "MySQL", "HTML5", "CSS3", "Session Auth"],
    githubUrl: "https://github.com/KritikaManandhar/Website",
    fieldNotes: [
      "Rigorous form input sanitization and regex pattern checks.",
      "Clear feedback alerts for existing user collision and credential errors.",
      "Session lifecycle management with secure logout redirection.",
      "Semantic HTML forms designed with accessibility best practices.",
    ],
    icon: <Lock className="w-4 h-4 text-[#6B8A68]" />,
    accentColor: "border-[#6B8A68]/40 bg-[#6B8A68]/15 text-[#6B8A68]",
    footerNote:
      "Field Observation: Padmakanya CSIT web security practicum with defensive auth routing",
  },
];

export default function FieldJournalProjectsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [activeScrollIndex, setActiveScrollIndex] = useState<number>(0);
  const [activeModalProject, setActiveModalProject] = useState<ProjectDetails | null>(null);

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

      const nextIndex = progress >= 0.5 ? 1 : 0;

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

    // Target midpoints: 0 -> 0.25, 1 -> 0.75
    const progressTargets = [0.25, 0.75];
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
    if (activeScrollIndex < PROJECTS.length - 1) {
      scrollToScrollIndex(activeScrollIndex + 1);
    }
  };

  const openFieldNotes = (e: React.MouseEvent, p: ProjectDetails) => {
    triggerLeafBurst(e.clientX, e.clientY, true);
    if (chimeEngine) {
      chimeEngine.playPaperRustle();
    }
    setActiveModalProject(p);
  };

  const closeFieldNotes = (e: React.MouseEvent) => {
    triggerLeafBurst(e.clientX, e.clientY, false);
    setActiveModalProject(null);
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative min-h-[200vh] w-full"
    >
      {/* Pinned Viewport Container */}
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center px-3 sm:px-6 pt-14 pb-4 overflow-hidden z-10">
        {/* Top Control Bar: Section Tag & Subtitle */}
        <div className="w-full max-w-[760px] flex items-center justify-between gap-2 mb-2 px-1">
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wider text-[#6B8A68] bg-[#6B8A68]/15 border border-[#6B8A68]/35 flex items-center gap-1.5 shadow-2xs">
            <Palette className="w-3 h-3 text-[#6B8A68]" />
            <span>Section 03 • The Field Journal Manuscripts</span>
          </span>

          <span className="text-[11px] text-[#5C381E]/70 font-serif italic hidden sm:inline">
            Featured Full-Stack Folios
          </span>
        </div>

        {/* Carousel Navigation Header Ribbon */}
        <div className="w-full max-w-[760px] flex items-center justify-between gap-2 mb-2 px-1">
          {/* Chapter Selector Tabs */}
          <div className="flex items-center gap-1 sm:gap-2">
            {PROJECTS.map((proj, idx) => {
              const isActive = activeScrollIndex === idx;
              return (
                <button
                  key={proj.id}
                  type="button"
                  onClick={(e) => handleSelectTab(idx, e)}
                  className={`px-2.5 sm:px-3.5 py-1 rounded-full text-[11px] sm:text-xs font-serif transition-all flex items-center gap-1.5 border cursor-pointer select-none ${
                    isActive
                      ? "bg-[#6B8A68] text-white border-[#536E50] shadow-xs scale-102 font-medium"
                      : "bg-[#FAF5E8]/90 text-[#5C381E]/75 border-[#C29B72]/45 hover:bg-[#F3ECE1] hover:text-[#D0684D]"
                  }`}
                >
                  <span className="text-[10px] font-mono opacity-80">
                    {proj.chapterNumber}
                  </span>
                  <span>{proj.shortTitle}</span>
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
              aria-label="Previous project"
              title="Previous project"
            >
              <ChevronLeft className="w-3.5 h-3.5 text-[#5C381E]" />
            </button>
            <span className="text-[10px] sm:text-[11px] font-mono text-[#5C381E]/75 px-1 select-none">
              {activeScrollIndex + 1} / {PROJECTS.length}
            </span>
            <button
              type="button"
              onClick={handleNextScroll}
              disabled={activeScrollIndex === PROJECTS.length - 1}
              className="p-1 sm:p-1.5 rounded-full border border-[#C29B72]/50 bg-[#FAF5E8]/95 text-[#3D2E24] hover:bg-[#F3ECE1] disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer shadow-2xs active:scale-95"
              aria-label="Next project"
              title="Next project"
            >
              <ChevronRight className="w-3.5 h-3.5 text-[#5C381E]" />
            </button>
          </div>
        </div>

        {/* Carousel Frame: Each Project Unrolled on Dedicated Parchment Scroll */}
        <div className="relative w-full max-w-[760px] min-h-[440px] sm:min-h-[470px] flex items-center justify-center">
          {PROJECTS.map((proj, index) => {
            const isCurrent = activeScrollIndex === index;
            const isPast = index < activeScrollIndex;

            return (
              <div
                key={proj.id}
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
                  <div className="flex items-center justify-between gap-2 mb-2 pr-10">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-semibold tracking-wider border flex items-center gap-1.5 shadow-2xs ${proj.accentColor}`}
                    >
                      {proj.icon}
                      <span>{proj.badgeLabel}</span>
                    </span>

                    <span className="text-[11px] font-mono text-[#5C381E]/60 italic hidden sm:inline">
                      Chapter III • Folio {proj.chapterNumber}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#3D2E24] tracking-tight mb-0.5">
                    {proj.title}
                  </h3>
                  <p className="text-xs sm:text-[13px] text-[#6B8A68] font-serif italic mb-2.5">
                    {proj.subtitle}
                  </p>

                  <p className="text-xs sm:text-[13px] text-[#3D2E24]/85 leading-relaxed mb-3.5 font-serif">
                    {proj.description}
                  </p>

                  {/* Tech Stack Badges */}
                  <div className="flex flex-wrap gap-1 mb-3.5">
                    {proj.tags.map((t) => (
                      <span
                        key={t}
                        onClick={(e) =>
                          triggerLeafBurst(e.clientX, e.clientY, true)
                        }
                        className="px-2 py-0.5 rounded-sm text-[10px] font-mono bg-[#FFFDF7] border border-[#C29B72]/50 text-[#3D2E24] shadow-2xs cursor-pointer hover:border-[#6B8A68] transition-all"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Architectural Field Highlights */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3.5">
                    {proj.fieldNotes.map((note, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-1.5 p-2 rounded-md bg-[#FFFDF7] border border-[#C29B72]/40 text-[11px] text-[#3D2E24] font-serif shadow-2xs"
                      >
                        <ShieldCheck className="w-3.5 h-3.5 text-[#6B8A68] mt-0.5 shrink-0" />
                        <span className="leading-snug">{note}</span>
                      </div>
                    ))}
                  </div>

                  {/* Actions & Botanical Observation Footer */}
                  <div className="pt-2.5 border-t border-[#C29B72]/40 flex flex-wrap items-center justify-between gap-2 text-[10px] sm:text-[11px] text-[#5C381E]/70 font-serif">
                    <button
                      type="button"
                      onClick={(e) => openFieldNotes(e, proj)}
                      className="font-semibold text-[#6B8A68] hover:text-[#4E6B4B] transition-colors flex items-center gap-1 cursor-pointer underline underline-offset-4"
                    >
                      <Search className="w-3 h-3" />
                      <span>Inspect Complete Specs</span>
                    </button>

                    <div className="flex items-center gap-2">
                      <a
                        href={proj.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) =>
                          triggerLeafBurst(e.clientX, e.clientY, true)
                        }
                        className="px-3.5 py-1.5 rounded-md bg-[#3D2E24] hover:bg-[#2A1E16] text-[#FAF6EE] text-[11px] font-medium transition-all shadow-xs flex items-center gap-1.5 border border-[#2B180A]"
                      >
                        <GithubIcon className="w-3 h-3" />
                        <span>Source Repository &rarr;</span>
                      </a>
                    </div>
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
            {activeScrollIndex < PROJECTS.length - 1
              ? "Scroll down to unroll next project scroll"
              : "Scroll down to enter Greenhouse Logbook"}
          </span>
          <ChevronDown className="w-3 h-3 text-[#6B8A68] animate-bounce" />
        </div>
      </div>

      {/* Modal: Full Field Notes Inspector */}
      {activeModalProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-xs">
          <div className="max-w-md w-full bg-[#FAF5E8] p-5 sm:p-6 relative rounded-lg border-2 border-[#C29B72] shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-serif uppercase text-[#6B8A68] tracking-wider font-semibold">
                Field Journal Manuscript Entry
              </span>
              <button
                type="button"
                onClick={closeFieldNotes}
                className="p-1 rounded-md text-[#5C381E]/60 hover:text-[#D0684D] hover:bg-black/5 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <h3 className="font-serif font-bold text-lg text-[#3D2E24] mb-0.5">
              {activeModalProject.title}
            </h3>
            <p className="text-xs font-serif italic text-[#6B8A68] mb-3">
              Full Architecture &amp; Implementation Details
            </p>

            <div className="space-y-1.5 mb-4">
              {activeModalProject.fieldNotes.map((note, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2 p-2 rounded-md bg-[#FFFDF7] border border-[#C29B72]/50 text-xs text-[#3D2E24] font-serif"
                >
                  <Sparkles className="w-3 h-3 text-[#D0684D] mt-0.5 shrink-0" />
                  <span className="leading-relaxed">{note}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-2.5 border-t border-[#C29B72]/40">
              <button
                type="button"
                onClick={closeFieldNotes}
                className="px-3 py-1.5 rounded-md bg-[#FAF3E0] hover:bg-[#F2E5C4] border border-[#C29B72]/70 text-xs font-serif font-semibold text-[#3D2E24] transition-all cursor-pointer"
              >
                Close Note
              </button>
              <a
                href={activeModalProject.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => triggerLeafBurst(e.clientX, e.clientY, true)}
                className="px-3.5 py-1.5 rounded-md bg-[#6B8A68] hover:bg-[#5A7757] text-xs font-semibold text-[#FFFDF9] transition-all shadow-xs flex items-center gap-1.5 border border-[#4E6B4B]"
              >
                <GithubIcon className="w-3 h-3" />
                <span>Open on GitHub</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
