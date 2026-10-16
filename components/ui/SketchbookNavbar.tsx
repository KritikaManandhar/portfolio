"use client";

import React, { useState, useEffect } from "react";
import {
  Sprout,
  Menu,
  X,
  BookOpen,
  Palette,
  Mail,
  Send,
  Feather,
  Flower2,
} from "lucide-react";
import { chimeEngine } from "@/components/audio/ChimeEngine";
import { triggerLeafBurst } from "@/components/particles/LeafParticleBurst";
import { WindChimeIcon, GithubIcon } from "@/components/ui/VectorIcons";

interface SketchbookNavbarProps {
  currentFrame: number;
  totalFrames: number;
  scrollProgress?: number;
}

interface NavItem {
  id: string;
  chapter: string;
  label: string;
  shortLabel: string;
  description: string;
  icon: React.ReactNode;
}

const NAV_ITEMS: NavItem[] = [
  {
    id: "study",
    chapter: "01",
    label: "The Study",
    shortLabel: "Study",
    description: "Welcome & Introduction",
    icon: <BookOpen className="w-3.5 h-3.5" />,
  },
  {
    id: "skills",
    chapter: "02",
    label: "Botanist Shelf",
    shortLabel: "Shelf",
    description: "Technical Skills & Craft",
    icon: <Sprout className="w-3.5 h-3.5" />,
  },
  {
    id: "projects",
    chapter: "03",
    label: "Field Journal",
    shortLabel: "Projects",
    description: "Handcrafted Projects",
    icon: <Palette className="w-3.5 h-3.5" />,
  },
  {
    id: "greenhouse",
    chapter: "04",
    label: "Flower Studio",
    shortLabel: "Studio",
    description: "Pressed Bookmark Craft",
    icon: <Flower2 className="w-3.5 h-3.5" />,
  },
  {
    id: "postbox",
    chapter: "05",
    label: "Sunset Postbox",
    shortLabel: "Postbox",
    description: "Contact & Letters",
    icon: <Mail className="w-3.5 h-3.5" />,
  },
];

export default function SketchbookNavbar({
  currentFrame,
  totalFrames,
  scrollProgress = 0,
}: SketchbookNavbarProps) {
  const [chimesOn, setChimesOn] = useState<boolean>(() => {
    return chimeEngine ? !chimeEngine.getMuted() : true;
  });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>("study");

  // Scrollspy: Detect currently active section
  useEffect(() => {
    const sectionIds = ["study", "skills", "projects", "greenhouse", "postbox"];

    const handleScroll = () => {
      // Near bottom of page: activate postbox
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 80
      ) {
        setActiveSection("postbox");
        return;
      }

      // Check current section threshold
      const scrollPosition = window.scrollY + window.innerHeight * 0.35;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(sectionIds[i]);
            return;
          }
        }
      }
      setActiveSection("study");
    };

    const rafId = requestAnimationFrame(handleScroll);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Keyboard navigation & outside click dismissal for mobile menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      const header = document.getElementById("sketchbook-navbar-header");
      if (header && !header.contains(e.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  const handleToggleChimes = (e: React.MouseEvent) => {
    triggerLeafBurst(e.clientX, e.clientY, false);
    if (chimeEngine) {
      const isMuted = chimeEngine.toggleMute();
      setChimesOn(!isMuted);
    }
  };

  const handleBrandClick = (e: React.MouseEvent) => {
    e.preventDefault();
    triggerLeafBurst(e.clientX, e.clientY, true);
    if (chimeEngine) {
      chimeEngine.playBreezeChord();
    }
    const element = document.getElementById("study");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string
  ) => {
    e.preventDefault();
    triggerLeafBurst(e.clientX, e.clientY, true);
    if (chimeEngine) {
      chimeEngine.playPaperRustle();
    }
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  const handleToggleMobileMenu = (e: React.MouseEvent) => {
    triggerLeafBurst(e.clientX, e.clientY, false);
    if (chimeEngine) {
      chimeEngine.playPaperRustle();
    }
    setIsMobileMenuOpen((prev) => !prev);
  };

  // Compute scroll progress percentage
  const progressPercent =
    typeof scrollProgress === "number" && scrollProgress > 0
      ? Math.min(100, Math.max(0, scrollProgress * 100))
      : Math.min(
          100,
          Math.max(
            0,
            ((currentFrame - 1) / Math.max(1, totalFrames - 1)) * 100
          )
        );

  return (
    <header
      id="sketchbook-navbar-header"
      className="fixed top-2.5 sm:top-3.5 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl transition-all duration-300"
    >
      {/* Decorative Washi Tape Tabs */}
      <div className="absolute -top-1.5 left-8 w-10 h-3 bg-[#FAF3E0] border-l border-r border-dashed border-[#D0684D]/40 -rotate-3 rounded-xs pointer-events-none shadow-2xs hidden sm:block opacity-90 z-20" />
      <div className="absolute -top-1.5 right-8 w-10 h-3 bg-[#FAF3E0] border-l border-r border-dashed border-[#6B8A68]/40 rotate-3 rounded-xs pointer-events-none shadow-2xs hidden sm:block opacity-90 z-20" />

      {/* Primary Floating Parchment Bar */}
      <nav className="ghibli-card relative px-3 py-2 sm:px-5 sm:py-2.5 flex items-center justify-between shadow-[0_10px_30px_rgba(61,46,36,0.12)] border border-[#C29B72]/50 bg-[#FAF5E8]/90 backdrop-blur-md rounded-2xl overflow-hidden">
        {/* Brand / Artist Signature */}
        <button
          type="button"
          onClick={handleBrandClick}
          className="flex items-center gap-2 group cursor-pointer text-left focus:outline-none"
          title="Return to Study (Top)"
        >
          <div className="p-1 sm:p-1.5 rounded-lg bg-[#6B8A68]/15 border border-[#6B8A68]/30 group-hover:scale-110 transition-transform">
            <Sprout className="w-4 h-4 text-[#6B8A68] group-hover:rotate-12 transition-transform" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif font-bold text-xs sm:text-sm tracking-tight text-[#3D2E24] group-hover:text-[#D0684D] transition-colors leading-tight">
              Kritika Manandhar
            </span>
            <span className="text-[10px] text-[#6B8A68] font-medium leading-none hidden md:inline-block">
              Studio Ghibli Journal
            </span>
          </div>
        </button>

        {/* Section Navigation Links (Desktop) */}
        <div className="hidden lg:flex items-center gap-1 xl:gap-1.5 text-xs font-medium">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleNavClick(e, item.id)}
                className={`relative px-3 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${
                  isActive
                    ? "bg-[#6B8A68]/15 text-[#3D2E24] font-semibold border border-[#6B8A68]/40 shadow-2xs"
                    : "text-[#5C381E]/75 hover:text-[#D0684D] hover:bg-[#F3ECE1]/70"
                }`}
              >
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#6B8A68] animate-pulse" />
                )}
                <span className="text-[10px] font-mono text-[#C29B72]">
                  {item.chapter}.
                </span>
                <span>{item.shortLabel}</span>
              </a>
            );
          })}
        </div>

        {/* Controls & Badges */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          {/* Scroll Frame Indicator */}
          <div
            className="px-2.5 py-1 rounded-full bg-[#FAF5E8] border border-[#C29B72]/40 text-[11px] font-mono text-[#3D2E24] flex items-center gap-1.5 shadow-2xs select-none"
            title={`Canvas frame: ${currentFrame} of ${totalFrames}`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#6B8A68] animate-pulse" />
            <span className="hidden sm:inline">Frame</span>
            <span>{String(currentFrame).padStart(3, "0")}</span>
            <span className="text-[#C29B72] hidden sm:inline">
              / {totalFrames}
            </span>
          </div>

          {/* Wind Chime Mute/Unmute Toggle */}
          <button
            type="button"
            onClick={handleToggleChimes}
            className={`px-2.5 sm:px-3 py-1 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 border shadow-2xs cursor-pointer select-none active:scale-95 ${
              chimesOn
                ? "bg-[#6B8A68] text-white border-[#536E50] hover:bg-[#5C7859]"
                : "bg-[#F3ECE1] text-[#5C381E]/70 border-[#D8C7B0] hover:bg-[#EAE1D3]"
            }`}
            title={
              chimesOn
                ? "Mute wind chime audio cues"
                : "Enable wind chime audio cues"
            }
            aria-label="Toggle wind chime audio"
          >
            <WindChimeIcon
              className={`w-3.5 h-3.5 ${
                chimesOn ? "animate-ghibli-float" : "opacity-60"
              }`}
            />
            <span className="hidden md:inline">Chimes:</span>
            <span className="text-[11px] font-mono font-semibold">
              {chimesOn ? "ON" : "OFF"}
            </span>
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={handleToggleMobileMenu}
            className="p-1.5 rounded-xl border border-[#C29B72]/50 bg-[#FAF5E8] hover:bg-[#F3ECE1] text-[#3D2E24] lg:hidden flex items-center justify-center transition-all cursor-pointer shadow-2xs active:scale-95"
            aria-label={
              isMobileMenuOpen ? "Close chapter menu" : "Open chapter menu"
            }
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <X className="w-4 h-4 text-[#D0684D]" />
            ) : (
              <Menu className="w-4 h-4 text-[#5C381E]" />
            )}
          </button>
        </div>

        {/* Integrated Scroll Progress Hairline Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#C29B72]/20">
          <div
            className="h-full bg-gradient-to-r from-[#6B8A68] via-[#D0684D] to-[#C29B72] transition-all duration-150 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </nav>

      {/* Mobile & Tablet Sketchbook Chapter Drawer */}
      {isMobileMenuOpen && (
        <div className="mt-2 w-full ghibli-card bg-[#FAF5E8]/98 backdrop-blur-xl border border-[#C29B72]/60 rounded-2xl p-4 shadow-[0_16px_40px_rgba(45,30,20,0.22)] lg:hidden flex flex-col gap-2 animate-in fade-in slide-in-from-top-2 duration-200">
          {/* Drawer Header */}
          <div className="flex items-center justify-between pb-2 mb-1 border-b border-[#C29B72]/30 px-1">
            <div className="flex items-center gap-1.5 text-xs font-serif font-bold text-[#5C381E]">
              <Feather className="w-3.5 h-3.5 text-[#6B8A68]" />
              <span>Sketchbook Chapters</span>
            </div>
            <span className="text-[10px] font-mono text-[#6B8A68] bg-[#6B8A68]/15 px-2 py-0.5 rounded-full border border-[#6B8A68]/30">
              Frame {String(currentFrame).padStart(3, "0")} / {totalFrames}
            </span>
          </div>

          {/* Chapter Links */}
          <div className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => handleNavClick(e, item.id)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? "bg-[#6B8A68]/15 text-[#3D2E24] font-bold border border-[#6B8A68]/40 shadow-2xs"
                      : "text-[#5C381E]/85 hover:bg-[#F3ECE1] hover:text-[#D0684D]"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`p-1.5 rounded-lg border ${
                        isActive
                          ? "bg-[#6B8A68] text-white border-[#536E50]"
                          : "bg-[#FAF5E8] border-[#C29B72]/40 text-[#6B8A68]"
                      }`}
                    >
                      {item.icon}
                    </span>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-mono text-[#C29B72] uppercase tracking-wider">
                        Chapter {item.chapter}
                      </span>
                      <span className="font-serif text-xs text-[#3D2E24]">
                        {item.label}
                      </span>
                      <span className="text-[10px] text-[#5C381E]/60">
                        {item.description}
                      </span>
                    </div>
                  </div>
                  {isActive && (
                    <span className="flex items-center gap-1 text-[10px] font-mono text-[#6B8A68] font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#6B8A68] animate-ping" />
                      Viewing
                    </span>
                  )}
                </a>
              );
            })}
          </div>

          {/* Quick Drawer Footer Actions */}
          <div className="pt-2.5 mt-1 border-t border-[#C29B72]/30 flex items-center justify-between gap-2 px-1">
            <a
              href="https://github.com/KritikaManandhar"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-[#5C381E]/80 hover:text-[#D0684D] px-3 py-1.5 rounded-lg border border-[#C29B72]/40 bg-[#FAF5E8] hover:bg-[#F3ECE1] transition-all"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>

            <a
              href="#postbox"
              onClick={(e) => handleNavClick(e, "postbox")}
              className="flex items-center gap-1.5 text-xs font-medium text-white px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-[#D0684D] to-[#E07A5F] hover:from-[#B8573E] hover:to-[#D0684D] transition-all shadow-2xs cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send Letter</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
