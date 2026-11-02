"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Palette,
  ShoppingBag,
  Lock,
  Home,
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
import ParchmentScroll, { ScrollWoodVariant } from "@/components/ui/ParchmentScroll";

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
  woodVariant?: ScrollWoodVariant;
  sealLabel: string;
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
    woodVariant: "default",
    sealLabel: "Folio 01 • E-Commerce Platform",
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
    woodVariant: "default",
    sealLabel: "Folio 02 • Student Security Portal",
    footerNote:
      "Field Observation: Padmakanya CSIT web security practicum with defensive auth routing",
  },
  {
    id: "room-rental",
    chapterNumber: "03",
    badgeLabel: "Manuscript Folio 03 • Tenancy & Spatial Architecture",
    shortTitle: "Room Rental",
    title: "Room Rental Management System",
    subtitle: "Full-Stack Tenancy Discovery, Leaflet Map & Payment Pipeline",
    description:
      "A comprehensive rental management ecosystem connecting tenants and landlords with Leaflet interactive map discovery, real-time Socket.io chat, digital rent invoicing (eSewa & Khalti), and Prisma PostgreSQL schema modeling.",
    tags: [
      "React 19",
      "TypeScript",
      "Node.js",
      "Prisma ORM",
      "PostgreSQL",
      "Leaflet",
      "Socket.io",
      "Tailwind CSS",
    ],
    githubUrl: "https://github.com/Jyotikunwar/Room-Rental-management-system",
    fieldNotes: [
      "Multi-role RBAC architecture (Tenant, Landlord, Admin) with verified identity credentials.",
      "Interactive spatial discovery with Leaflet geocoordinates, city filtering & amenities.",
      "Real-time tenant-landlord communication powered by Socket.io with attachments & receipts.",
      "Automated digital rent invoicing, deposit tracking & eSewa / Khalti payment workflows.",
      "Recommendation engine with similarity scoring, plus dispute & maintenance complaint resolution.",
    ],
    icon: <Home className="w-4 h-4 text-[#3E6B89]" />,
    accentColor: "border-[#3E6B89]/40 bg-[#3E6B89]/15 text-[#3E6B89]",
    woodVariant: "default",
    sealLabel: "Folio 03 • Room Rental Management",
    footerNote:
      "Field Observation: Production-grade rental marketplace with Prisma relational PostgreSQL and Socket.io pipelines",
  },
];

export default function FieldJournalProjectsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [activeScrollIndex, setActiveScrollIndex] = useState<number>(0);
  const [sectionProgress, setSectionProgress] = useState<number>(0);
  const [activeModalProject, setActiveModalProject] = useState<ProjectDetails | null>(null);

  // Synchronize multi-scroll stage & dynamic unroll/reroll progress with window scroll
  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const totalDistance = rect.height - window.innerHeight;
      if (totalDistance <= 0) {
        setSectionProgress(1.0);
        return;
      }

      const scrolledIntoSection = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolledIntoSection / totalDistance));
      setSectionProgress(progress);

      // Active project chapter selection across the 300vh track
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

  // Compute scroll-driven unroll/reroll progress for each individual scroll
  // Scrolls unroll when scrolling down and smoothly reroll when scrolling back up (matching study & shelf sections)
  const getScrollUnrollProgress = (index: number): number => {
    if (index === 0) {
      // Unrolls during [0.00, 0.20], stays open during [0.20, 0.33]
      // Rerolls during [0.20, 0.00] when scrolling up
      return Math.max(0, Math.min(1, sectionProgress / 0.20));
    } else if (index === 1) {
      // Unrolls during [0.33, 0.53], stays open during [0.53, 0.67]
      // Rerolls during [0.53, 0.33] when scrolling up
      if (sectionProgress < 0.33) return 0.0;
      return Math.max(0, Math.min(1, (sectionProgress - 0.33) / 0.20));
    } else {
      // Unrolls during [0.67, 0.87], stays open during [0.87, 1.00]
      // Rerolls during [0.87, 0.67] when scrolling up
      if (sectionProgress < 0.67) return 0.0;
      return Math.max(0, Math.min(1, (sectionProgress - 0.67) / 0.20));
    }
  };

  // Smoothly scroll window to target chapter milestone plateau
  const scrollToScrollIndex = (targetIndex: number) => {
    const section = sectionRef.current;
    if (!section) return;

    const totalDistance = section.offsetHeight - window.innerHeight;
    if (totalDistance <= 0) return;

    // Target mid-plateaus: Chapter 0: 0.22, Chapter 1: 0.55, Chapter 2: 0.88
    const progressTargets = [0.22, 0.55, 0.88];
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

  const handleUnrollScroll = (index: number) => {
    scrollToScrollIndex(index);
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
      className="relative min-h-[300vh] w-full"
    >
      {/* Pinned Viewport Container */}
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center px-3 sm:px-6 pt-12 sm:pt-14 pb-2 sm:pb-3 overflow-hidden z-10">
        {/* Top Control Bar: Section Tag & Subtitle */}
        <div className="w-full max-w-[760px] flex items-center justify-between gap-2 mb-1 sm:mb-1.5 px-1">
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wider text-[#6B8A68] bg-[#6B8A68]/15 border border-[#6B8A68]/35 flex items-center gap-1.5 shadow-2xs">
            <Palette className="w-3 h-3 text-[#6B8A68]" />
            <span>Section 03 • The Field Journal Manuscripts</span>
          </span>

          <span className="text-[11px] text-[#5C381E]/70 font-serif italic hidden sm:inline">
            Featured Full-Stack Folios
          </span>
        </div>

        {/* Carousel Navigation Header Ribbon */}
        <div className="w-full max-w-[760px] flex items-center justify-between gap-2 mb-1 sm:mb-1.5 px-1">
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

        {/* 3 Distinct Physical Scrolls Stage */}
        <div className="relative w-full max-w-[760px] mx-auto min-h-[440px] sm:min-h-[460px]">
          {PROJECTS.map((proj, index) => {
            const isActive = activeScrollIndex === index;
            const offset = index - activeScrollIndex;
            const scrollUnroll = getScrollUnrollProgress(index);

            return (
              <div
                key={proj.id}
                className={`w-full transition-all duration-500 cubic-bezier(0.22, 1, 0.36, 1) ${
                  isActive
                    ? "relative z-20 opacity-100 translate-x-0 scale-100 pointer-events-auto"
                    : offset > 0
                    ? "absolute inset-0 z-10 opacity-0 translate-x-12 scale-96 pointer-events-none"
                    : "absolute inset-0 z-10 opacity-0 -translate-x-12 scale-96 pointer-events-none"
                }`}
              >
                <ParchmentScroll
                  maxWidth="max-w-[760px]"
                  className="my-1 sm:my-1.5"
                  scrollAnimated
                  woodVariant={proj.woodVariant}
                  unrollProgress={scrollUnroll}
                  contentPadding="px-4 sm:px-6 md:px-7 py-3 sm:py-3.5"
                  sealLabel={proj.sealLabel}
                  onUnroll={() => handleUnrollScroll(index)}
                >
                  {/* Scroll Header */}
                  <div className="flex items-center justify-between gap-2 mb-1.5 pr-10">
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

                  <h3 className="text-lg sm:text-xl font-serif font-bold text-[#3D2E24] tracking-tight mb-0.5">
                    {proj.title}
                  </h3>
                  <p className="text-xs sm:text-[13px] text-[#6B8A68] font-serif italic mb-1.5">
                    {proj.subtitle}
                  </p>

                  <p className="text-xs sm:text-[12.5px] text-[#3D2E24]/85 leading-relaxed mb-2 font-serif">
                    {proj.description}
                  </p>

                  {/* Tech Stack Badges */}
                  <div className="flex flex-wrap gap-1 mb-2">
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

                  {/* Architectural Field Highlights: Balanced 2x2 Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2 mb-2">
                    {proj.fieldNotes.slice(0, 4).map((note, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-1.5 p-1.5 sm:p-2 rounded-md bg-[#FFFDF7] border border-[#C29B72]/40 text-[10.5px] sm:text-[11px] text-[#3D2E24] font-serif shadow-2xs"
                      >
                        <ShieldCheck className="w-3.5 h-3.5 text-[#6B8A68] mt-0.5 shrink-0" />
                        <span className="leading-snug">{note}</span>
                      </div>
                    ))}
                  </div>

                  {/* Actions & Botanical Observation Footer */}
                  <div className="pt-2 border-t border-[#C29B72]/40 flex flex-wrap items-center justify-between gap-2 text-[10px] sm:text-[11px] text-[#5C381E]/70 font-serif">
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
                        className="px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-md bg-[#3D2E24] hover:bg-[#2A1E16] text-[#FAF6EE] text-[11px] font-medium transition-all shadow-xs flex items-center gap-1.5 border border-[#2B180A]"
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
        <div className="flex items-center justify-center gap-1.5 mt-1 sm:mt-1.5 text-[10px] sm:text-[11px] font-serif text-[#5C381E]/75 select-none pointer-events-none">
          <span className="w-1.5 h-1.5 rounded-full bg-[#6B8A68] animate-ping" />
          <span>
            {activeScrollIndex === 0
              ? "Scroll down to unfurl Folio 02 • Student Portal"
              : activeScrollIndex === 1
              ? "Scroll down to unfurl Folio 03 • Room Rental"
              : "Scroll down to enter The Little World"}
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
