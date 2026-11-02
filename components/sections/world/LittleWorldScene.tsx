"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Sparkles,
  Sun,
  Sunset,
  Moon,
  Compass,
  Sprout,
  BookOpen,
  Hammer,
  Mail,
  Home,
  Palette,
  ArrowRight,
  Info,
} from "lucide-react";
import { triggerLeafBurst } from "@/components/particles/LeafParticleBurst";
import { chimeEngine } from "@/components/audio/ChimeEngine";

export type WorldLandmarkId =
  | "cottage"
  | "greenhouse"
  | "library"
  | "workshop"
  | "mailbox"
  | "pond";

export type LightingMode = "day" | "dusk" | "night";
export type WorldInteractionMode = "explore" | "build";

interface LandmarkHotspot {
  id: WorldLandmarkId;
  name: string;
  subtitle: string;
  icon: React.ReactNode;
  // Positioning as percentages of width/height for responsive scaling
  left: string;
  top: string;
  width: string;
  height: string;
  accentColor: string;
}

const LANDMARK_HOTSPOTS: LandmarkHotspot[] = [
  {
    id: "cottage",
    name: "Cozy Cottage",
    subtitle: "Welcome & Hearth",
    icon: <Home className="w-3.5 h-3.5 text-[#C86D51]" />,
    left: "17%",
    top: "8%",
    width: "25%",
    height: "40%",
    accentColor: "#C86D51",
  },
  {
    id: "greenhouse",
    name: "Skills Conservatory",
    subtitle: "Frontend & Botanical Craft",
    icon: <Sprout className="w-3.5 h-3.5 text-[#627D5B]" />,
    left: "46%",
    top: "3%",
    width: "19%",
    height: "42%",
    accentColor: "#627D5B",
  },
  {
    id: "library",
    name: "Learning Library",
    subtitle: "Journey & Folios",
    icon: <BookOpen className="w-3.5 h-3.5 text-[#8C5835]" />,
    left: "66%",
    top: "5%",
    width: "25%",
    height: "47%",
    accentColor: "#8C5835",
  },
  {
    id: "workshop",
    name: "Project Workshop",
    subtitle: "Handcrafted Blueprints",
    icon: <Hammer className="w-3.5 h-3.5 text-[#D0684D]" />,
    left: "6%",
    top: "36%",
    width: "28%",
    height: "39%",
    accentColor: "#D0684D",
  },
  {
    id: "mailbox",
    name: "Sunset Mailbox",
    subtitle: "Letters & Contact",
    icon: <Mail className="w-3.5 h-3.5 text-[#C94736]" />,
    left: "4%",
    top: "67%",
    width: "24%",
    height: "29%",
    accentColor: "#C94736",
  },
  {
    id: "pond",
    name: "Whispering Pond",
    subtitle: "Secrets, Koi & Familiar",
    icon: <Sparkles className="w-3.5 h-3.5 text-[#3C666B]" />,
    left: "53%",
    top: "53%",
    width: "35%",
    height: "35%",
    accentColor: "#3C666B",
  },
];

interface LittleWorldSceneProps {
  activeLandmark: WorldLandmarkId | null;
  onSelectLandmark: (id: WorldLandmarkId, e?: React.MouseEvent) => void;
  visitedLandmarks?: string[];
}

export default function LittleWorldScene({
  activeLandmark,
  onSelectLandmark,
  visitedLandmarks = [],
}: LittleWorldSceneProps) {
  const [worldMode, setWorldMode] = useState<WorldInteractionMode>("explore");
  const [lighting, setLighting] = useState<LightingMode>("day");
  const [hoveredLandmark, setHoveredLandmark] = useState<WorldLandmarkId | null>(null);

  const isNight = lighting === "night";
  const isDusk = lighting === "dusk";

  const handleLandmarkClick = (id: WorldLandmarkId, e: React.MouseEvent) => {
    triggerLeafBurst(e.clientX, e.clientY, true);
    if (chimeEngine) chimeEngine.playBreezeChord();
    onSelectLandmark(id, e);
  };

  const handleToggleLighting = (mode: LightingMode) => {
    if (chimeEngine) chimeEngine.playChime(3);
    setLighting(mode);
  };

  const handleToggleMode = (mode: WorldInteractionMode) => {
    if (chimeEngine) chimeEngine.playChime(2);
    setWorldMode(mode);
  };

  // Atmospheric filter styles based on lighting mode
  const getAtmosphericFilter = () => {
    if (isNight) {
      return "brightness(0.68) saturate(0.85) hue-rotate(185deg) contrast(1.1)";
    }
    if (isDusk) {
      return "sepia(0.28) saturate(1.25) hue-rotate(-12deg) contrast(1.04) brightness(0.96)";
    }
    return "none";
  };

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border-2 border-[#B99A60]/50 shadow-[0_24px_60px_rgba(35,20,10,0.28)] bg-[#F5EEDB] select-none transition-colors duration-500 p-1.5 sm:p-2.5">
      {/* Top Controls Bar: Mode Switcher (Left) & Atmospheric Lighting (Right) */}
      <div className="flex flex-wrap items-center justify-between gap-1.5 mb-1.5 sm:mb-2">
        {/* Dual Mode Switcher (Explore vs Build Mode) */}
        <div className="flex items-center p-1 rounded-xl bg-[#FAF5E8]/95 backdrop-blur-xs border border-[#B99A60]/60 shadow-xs">
          <button
            type="button"
            onClick={() => handleToggleMode("explore")}
            className={`px-3 py-1 rounded-lg text-xs font-serif flex items-center gap-1.5 transition-all cursor-pointer ${
              worldMode === "explore"
                ? "bg-[#627D5B] text-white font-semibold shadow-2xs"
                : "text-[#49372C]/75 hover:text-[#49372C] hover:bg-black/5"
            }`}
            title="Explore buildings, skills, projects, and secrets"
          >
            <Compass className="w-3.5 h-3.5 text-[#FFEAA7]" />
            <span>Explore Mode</span>
          </button>

          <button
            type="button"
            onClick={() => handleToggleMode("build")}
            className={`px-3 py-1 rounded-lg text-xs font-serif flex items-center gap-1.5 transition-all cursor-pointer ${
              worldMode === "build"
                ? "bg-[#D0684D] text-white font-semibold shadow-2xs"
                : "text-[#49372C]/75 hover:text-[#49372C] hover:bg-black/5"
            }`}
            title="Customize and decorate the world (Stage 3 preview)"
          >
            <Palette className="w-3.5 h-3.5" />
            <span>Build Mode</span>
            <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-black/10 font-mono hidden sm:inline">
              Preview
            </span>
          </button>
        </div>

        {/* Atmospheric Lighting Mode Switcher */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-[#FAF5E8]/95 backdrop-blur-xs border border-[#B99A60]/60 shadow-xs">
          <button
            type="button"
            onClick={() => handleToggleLighting("day")}
            className={`px-2.5 py-1 rounded-lg text-xs font-serif flex items-center gap-1 transition-all cursor-pointer ${
              lighting === "day"
                ? "bg-[#627D5B] text-white font-semibold shadow-2xs"
                : "text-[#49372C]/70 hover:text-[#49372C] hover:bg-black/5"
            }`}
            title="Bright Morning Sun"
          >
            <Sun className="w-3.5 h-3.5 text-[#E4BA68]" />
            <span className="hidden sm:inline">Morning</span>
          </button>

          <button
            type="button"
            onClick={() => handleToggleLighting("dusk")}
            className={`px-2.5 py-1 rounded-lg text-xs font-serif flex items-center gap-1 transition-all cursor-pointer ${
              lighting === "dusk"
                ? "bg-[#C86D51] text-white font-semibold shadow-2xs"
                : "text-[#49372C]/70 hover:text-[#49372C] hover:bg-black/5"
            }`}
            title="Golden Sunset Hour"
          >
            <Sunset className="w-3.5 h-3.5 text-[#FFEAA7]" />
            <span className="hidden sm:inline">Dusk</span>
          </button>

          <button
            type="button"
            onClick={() => handleToggleLighting("night")}
            className={`px-2.5 py-1 rounded-lg text-xs font-serif flex items-center gap-1 transition-all cursor-pointer ${
              lighting === "night"
                ? "bg-[#253939] text-[#FFEAA7] font-semibold shadow-2xs"
                : "text-[#49372C]/70 hover:text-[#49372C] hover:bg-black/5"
            }`}
            title="Starlit Twilight"
          >
            <Moon className="w-3.5 h-3.5 text-[#FFDC73]" />
            <span className="hidden sm:inline">Night</span>
          </button>
        </div>
      </div>

      {/* ================================================================= */}
      {/* MASTER HAND-PAINTED DIORAMA CONTAINER (1376 x 768 Aspect Ratio)  */}
      {/* ================================================================= */}
      <div className="relative w-auto max-w-full aspect-[1376/768] max-h-[46vh] sm:max-h-[50vh] rounded-xl overflow-hidden shadow-[0_18px_45px_rgba(30,20,10,0.32)] border border-[#B99A60]/40 mx-auto">
        {/* 1. Master Hand-Painted Illustrated Artwork */}
        <div
          className="relative w-full h-full transition-all duration-700 ease-in-out"
          style={{ filter: getAtmosphericFilter() }}
        >
          <Image
            src="/little-world-map.jpg"
            alt="The Little World - Hand-painted storybook garden diorama featuring Cozy Cottage, Conservatory, Library, Workshop, Mailbox, and Pond"
            fill
            priority
            sizes="(max-width: 1200px) 100vw, 1200px"
            className="object-cover object-center pointer-events-none select-none"
          />
        </div>

        {/* 2. Night Starlit Twilight Glow Overlays (Candlelight in Windows & Lanterns) */}
        {isNight && (
          <div className="absolute inset-0 pointer-events-none z-10 transition-opacity duration-700">
            {/* Cottage Warm Window Glow */}
            <div className="absolute left-[31%] top-[27%] w-10 h-8 rounded-full bg-[#FFEAA7]/60 blur-md animate-pulse" />
            {/* Greenhouse Luminous Glass Dome */}
            <div className="absolute left-[54%] top-[22%] w-14 h-14 rounded-full bg-[#99F3BD]/50 blur-lg animate-pulse" />
            {/* Library Bay Window Glow */}
            <div className="absolute left-[79%] top-[26%] w-12 h-10 rounded-full bg-[#FFEAA7]/60 blur-md animate-pulse" />
            {/* Workshop Forge & Skylight Glow */}
            <div className="absolute left-[19%] top-[53%] w-10 h-8 rounded-full bg-[#FFD166]/55 blur-md animate-pulse" />

            {/* Drifting Golden Fireflies */}
            <div className="absolute left-[25%] top-[65%] w-2 h-2 rounded-full bg-[#FFEAA7] shadow-[0_0_8px_#FFEAA7] animate-ping" />
            <div className="absolute left-[45%] top-[45%] w-2.5 h-2.5 rounded-full bg-[#FFEAA7] shadow-[0_0_10px_#FFEAA7] animate-pulse" />
            <div className="absolute left-[68%] top-[60%] w-2 h-2 rounded-full bg-[#FFEAA7] shadow-[0_0_8px_#FFEAA7] animate-ping" />
            <div className="absolute left-[82%] top-[48%] w-2 h-2 rounded-full bg-[#FFEAA7] shadow-[0_0_8px_#FFEAA7] animate-pulse" />
            <div className="absolute left-[38%] top-[30%] w-2 h-2 rounded-full bg-[#FFEAA7] shadow-[0_0_8px_#FFEAA7] animate-pulse" />
          </div>
        )}

        {/* 3. Build Mode Preview Overlay (When Build Mode is Active) */}
        {worldMode === "build" && (
          <div className="absolute inset-0 z-25 bg-[#FAF4E6]/40 backdrop-blur-2xs flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="max-w-md w-full p-5 rounded-2xl bg-[#FAF5E8] border-2 border-[#D0684D] shadow-2xl text-center space-y-3 animate-in zoom-in-95 duration-200">
              <div className="w-10 h-10 rounded-full bg-[#D0684D]/20 border border-[#D0684D]/40 text-[#D0684D] mx-auto flex items-center justify-center">
                <Palette className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-base sm:text-lg text-[#3D2E24]">
                The Workshop Drafting Table (Stage 3 Preview)
              </h3>
              <p className="text-xs text-[#49372C]/85 font-serif leading-relaxed">
                The garden catalogue is being crafted! In Stage 3, you will be able to select trees, flowerbeds, stone lanterns, and decorative fences to personalize your own miniature garden.
              </p>
              <div className="pt-1">
                <button
                  type="button"
                  onClick={() => handleToggleMode("explore")}
                  className="px-4 py-2 rounded-lg bg-[#627D5B] hover:bg-[#526D4B] text-white font-serif font-semibold text-xs shadow-2xs cursor-pointer transition-all active:scale-95 inline-flex items-center gap-1.5"
                >
                  <Compass className="w-3.5 h-3.5 text-[#FFEAA7]" />
                  <span>Return to Explore Mode</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 4. Interactive Landmark Hotspot Hit-Zones (Active in Explore Mode) */}
        {worldMode === "explore" &&
          LANDMARK_HOTSPOTS.map((hotspot) => {
            const isSelected = activeLandmark === hotspot.id;
            const isHovered = hoveredLandmark === hotspot.id;
            const isVisited = visitedLandmarks.includes(hotspot.id);

            return (
              <div
                key={hotspot.id}
                role="button"
                tabIndex={0}
                onClick={(e) => handleLandmarkClick(hotspot.id, e)}
                onMouseEnter={() => setHoveredLandmark(hotspot.id)}
                onMouseLeave={() => setHoveredLandmark(null)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onSelectLandmark(hotspot.id);
                  }
                }}
                style={{
                  left: hotspot.left,
                  top: hotspot.top,
                  width: hotspot.width,
                  height: hotspot.height,
                }}
                className="absolute z-20 cursor-pointer rounded-2xl group transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-[#E8B84B]"
                aria-label={`${hotspot.name} - ${hotspot.subtitle}. Click to open detailed folio.`}
              >
                {/* Subtle Ambient Hover Glow Ring */}
                <div
                  className={`w-full h-full rounded-2xl transition-all duration-300 pointer-events-none ${
                    isSelected
                      ? "ring-3 ring-[#E8B84B] bg-[#FFEAA7]/15 shadow-[0_0_25px_rgba(232,184,75,0.6)]"
                      : isHovered
                      ? "ring-2 ring-[#E8B84B]/70 bg-white/10 shadow-[0_0_20px_rgba(232,184,75,0.4)]"
                      : "hover:bg-white/5"
                  }`}
                />

                {/* Storybook Banner Nameplate Ribbon (Appears on Hover or Selection) */}
                {(isHovered || isSelected) && (
                  <div
                    style={{
                      position: "absolute",
                      left: "50%",
                      bottom: "102%",
                      transform: "translateX(-50%)",
                    }}
                    className="z-30 pointer-events-none whitespace-nowrap animate-in fade-in zoom-in-95 duration-150"
                  >
                    <div className="px-3 py-1.5 rounded-lg bg-[#FAF5E8] border border-[#B99A60] shadow-lg flex items-center gap-1.5 text-xs font-serif text-[#3D2E24]">
                      {hotspot.icon}
                      <span className="font-bold">{hotspot.name}</span>
                      <span className="text-[10px] text-[#49372C]/65 font-mono hidden sm:inline">
                        • {hotspot.subtitle}
                      </span>
                      {isVisited && (
                        <span className="text-[10px] text-[#B99A60] font-bold">✦ Visited</span>
                      )}
                      <span className="text-[10px] text-[#627D5B] font-semibold">
                        (Click to Enter &rarr;)
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
      </div>

      {/* Bottom Landmark Quick-Navigation Bar */}
      <div className="mt-1.5 sm:mt-2 p-1.5 sm:p-2 bg-[#FAF5E8]/95 rounded-xl border border-[#B99A60]/40 flex items-center justify-between gap-1 overflow-x-auto scrollbar-none shadow-xs">
        <div className="flex items-center gap-1 sm:gap-1.5">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#B99A60] font-bold px-1.5 hidden lg:inline">
            Destinations:
          </span>

          {LANDMARK_HOTSPOTS.map((item) => {
            const isSelected = activeLandmark === item.id;
            const isVisited = visitedLandmarks.includes(item.id);

            return (
              <button
                key={item.id}
                type="button"
                onClick={(e) => handleLandmarkClick(item.id, e)}
                className={`px-2.5 py-1.5 rounded-lg border text-xs font-serif transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer shadow-2xs active:scale-95 ${
                  isSelected
                    ? "bg-[#627D5B] text-white border-[#4D6747] font-semibold shadow-xs"
                    : "bg-[#FFFDF7] hover:bg-[#F2E5CE] text-[#344C39] border-[#B99A60]/35"
                }`}
                title={`Visit ${item.name} (${item.subtitle})`}
              >
                {item.icon}
                <span>{item.name}</span>
                <span className={`text-[10px] font-mono hidden md:inline ${isSelected ? "text-white/80" : "text-[#49372C]/60"}`}>
                  • {item.subtitle}
                </span>
                {isVisited && (
                  <span className={`text-[9px] ${isSelected ? "text-[#FFEAA7]" : "text-[#B99A60]"}`}>
                    ✦
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <div className="text-[11px] font-serif text-[#49372C]/80 px-2 shrink-0 hidden md:block">
          Click any landmark to open its journal
        </div>
      </div>
    </div>
  );
}
