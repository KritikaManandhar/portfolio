"use client";

import React, { useEffect, useState } from "react";
import { triggerLeafBurst } from "@/components/particles/LeafParticleBurst";
import { chimeEngine } from "@/components/audio/ChimeEngine";

interface OrigamiScrollPlaneProps {
  isActive: boolean;
  onFlightComplete: () => void;
  originPos?: { x: number; y: number } | null;
}

// Authentic Multi-Faceted Crumpled Parchment Paper Wad
function CrumpledPaperBall() {
  return (
    <div className="relative w-36 sm:w-44 h-36 sm:h-44 flex items-center justify-center drop-shadow-[0_20px_32px_rgba(40,16,6,0.52)]">
      <svg
        viewBox="0 0 160 160"
        className="w-full h-full select-none pointer-events-none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Highlight Facet Gradient */}
          <linearGradient id="facetHighlight" x1="20%" y1="0%" x2="80%" y2="100%">
            <stop offset="0%" stopColor="#FFFDF7" />
            <stop offset="60%" stopColor="#F8EED8" />
            <stop offset="100%" stopColor="#EAD2AC" />
          </linearGradient>

          {/* Midtone Facet Gradient */}
          <linearGradient id="facetMid" x1="0%" y1="20%" x2="100%" y2="80%">
            <stop offset="0%" stopColor="#F5E4C4" />
            <stop offset="60%" stopColor="#DFBF8C" />
            <stop offset="100%" stopColor="#C49B60" />
          </linearGradient>

          {/* Crease Shadow Facet Gradient */}
          <linearGradient id="facetShadow" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#AA7A45" />
            <stop offset="60%" stopColor="#7E4E22" />
            <stop offset="100%" stopColor="#4A260C" />
          </linearGradient>

          {/* Deep Core Valley Crease Gradient */}
          <linearGradient id="facetDeep" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#5E3312" />
            <stop offset="100%" stopColor="#301504" />
          </linearGradient>
        </defs>

        {/* 1. Base Crumpled Outer Silhouette */}
        <polygon
          points="80,18 114,24 138,48 135,84 146,114 112,140 76,138 42,144 24,112 16,74 38,36 60,20"
          fill="url(#facetMid)"
          stroke="#5A2E10"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />

        {/* 2. Deep Crease Shadow Troughs (Valley Folds) */}
        <polygon points="80,18 68,54 38,36" fill="url(#facetShadow)" stroke="#4A260C" strokeWidth="1" />
        <polygon points="68,54 82,84 56,98 24,112 16,74 38,36" fill="url(#facetDeep)" stroke="#4A260C" strokeWidth="1" />
        <polygon points="82,84 108,102 76,138 56,98" fill="url(#facetShadow)" stroke="#4A260C" strokeWidth="1" />
        <polygon points="114,24 138,48 102,60" fill="url(#facetShadow)" stroke="#4A260C" strokeWidth="1" />
        <polygon points="102,60 135,84 108,102 82,84" fill="url(#facetDeep)" stroke="#381806" strokeWidth="1" />
        <polygon points="135,84 146,114 108,102" fill="url(#facetShadow)" stroke="#4A260C" strokeWidth="1" />

        {/* 3. Raised Lit Paper Ridges & Peaks (Facing Ambient Sunlight) */}
        <polygon points="80,18 114,24 102,60 68,54" fill="url(#facetHighlight)" stroke="#6A3B18" strokeWidth="1.2" />
        <polygon points="68,54 102,60 82,84" fill="url(#facetHighlight)" stroke="#6A3B18" strokeWidth="1.2" />
        <polygon points="56,98 82,84 76,138 42,144" fill="url(#facetMid)" stroke="#5A2E10" strokeWidth="1" />
        <polygon points="108,102 146,114 112,140 76,138" fill="url(#facetMid)" stroke="#5A2E10" strokeWidth="1" />
        <polygon points="38,36 68,54 16,74" fill="url(#facetHighlight)" stroke="#6A3B18" strokeWidth="1" />
        <polygon points="16,74 56,98 24,112" fill="url(#facetHighlight)" stroke="#5A2E10" strokeWidth="1" />

        {/* 4. Sharp Crumpled Ridge Crease Lines & Highlights */}
        <line x1="80" y1="18" x2="68" y2="54" stroke="#FFF7E6" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="68" y1="54" x2="102" y2="60" stroke="#FFF7E6" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="68" y1="54" x2="82" y2="84" stroke="#4A220A" strokeWidth="2" strokeLinecap="round" />
        <line x1="82" y1="84" x2="108" y2="102" stroke="#4A220A" strokeWidth="2" strokeLinecap="round" />
        <line x1="102" y1="60" x2="135" y2="84" stroke="#FFF7E6" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="56" y1="98" x2="82" y2="84" stroke="#FFF7E6" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="76" y1="138" x2="82" y2="84" stroke="#3A1A06" strokeWidth="1.8" strokeLinecap="round" />

        {/* 5. Vermilion Wax Seal Peeking from the Crumpled Fold */}
        <g transform="translate(76, 50) rotate(-24) scale(0.68)">
          <circle cx="11" cy="11" r="10" fill="rgba(184, 56, 40, 0.22)" stroke="#B83828" strokeWidth="1.8" />
          <path d="M 6 11 Q 11 6 16 11 Q 11 16 6 11" fill="none" stroke="#B83828" strokeWidth="1.2" />
        </g>
      </svg>
    </div>
  );
}

// Pristine 3D Origami Paper Airplane with 3D Wing Unfold Mechanics
function OrigamiPaperPlane({ isUnfolding }: { isUnfolding: boolean }) {
  return (
    <div
      className="relative w-48 sm:w-60 h-38 sm:h-48 drop-shadow-[0_20px_36px_rgba(40,18,6,0.42)]"
      style={{
        transformStyle: "preserve-3d",
      }}
    >
      <svg
        viewBox="0 0 240 180"
        className="w-full h-full select-none pointer-events-none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Left Wing Lit Parchment Wash */}
          <linearGradient id="leftWingGrad" x1="20%" y1="10%" x2="80%" y2="90%">
            <stop offset="0%" stopColor="#FCF8EE" />
            <stop offset="55%" stopColor="#F5E8D0" />
            <stop offset="100%" stopColor="#E8D4B4" />
          </linearGradient>

          {/* Right Wing Angled Shaded Parchment */}
          <linearGradient id="rightWingGrad" x1="20%" y1="10%" x2="80%" y2="90%">
            <stop offset="0%" stopColor="#F0DFBF" />
            <stop offset="55%" stopColor="#E2CBA3" />
            <stop offset="100%" stopColor="#D1B283" />
          </linearGradient>

          {/* Under-Keel Shadow Left */}
          <linearGradient id="keelLeftGrad" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#D4AA77" />
            <stop offset="100%" stopColor="#9E6F3E" />
          </linearGradient>

          {/* Under-Keel Shadow Right */}
          <linearGradient id="keelRightGrad" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#B58752" />
            <stop offset="100%" stopColor="#784A22" />
          </linearGradient>
        </defs>

        {/* 1. Center Folded Keel (Underside Fuselage) */}
        <polygon
          points="120,16 96,142 120,158"
          fill="url(#keelLeftGrad)"
          stroke="#6E3E18"
          strokeWidth="0.8"
          strokeLinejoin="round"
        />
        <polygon
          points="120,16 120,158 144,142"
          fill="url(#keelRightGrad)"
          stroke="#5A2E10"
          strokeWidth="0.8"
          strokeLinejoin="round"
        />

        {/* 2. Left Wing (Sunlit Face with 3D Unfolding) */}
        <g
          style={
            isUnfolding
              ? {
                  transformOrigin: "120px 80px",
                  animation: "wing-unfold-left 0.55s cubic-bezier(0.34, 1.3, 0.64, 1) forwards",
                }
              : undefined
          }
        >
          <polygon
            points="120,16 22,162 96,142"
            fill="url(#leftWingGrad)"
            stroke="#9E6F3E"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
        </g>

        {/* 3. Right Wing (Angled Face with 3D Unfolding) */}
        <g
          style={
            isUnfolding
              ? {
                  transformOrigin: "120px 80px",
                  animation: "wing-unfold-right 0.55s cubic-bezier(0.34, 1.3, 0.64, 1) forwards",
                }
              : undefined
          }
        >
          <polygon
            points="120,16 144,142 218,162"
            fill="url(#rightWingGrad)"
            stroke="#8B5C2B"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />

          {/* 4. Vermilion Artist Wax Seal Stamped onto the Wing */}
          <g
            transform="translate(152, 112) rotate(14)"
            style={
              isUnfolding
                ? {
                    transformOrigin: "163px 123px",
                    animation: "stamp-press 0.4s 0.3s cubic-bezier(0.34, 1.5, 0.64, 1) both",
                  }
                : undefined
            }
          >
            <circle
              cx="11"
              cy="11"
              r="10"
              fill="rgba(184, 56, 40, 0.16)"
              stroke="#B83828"
              strokeWidth="1.6"
            />
            <path
              d="M 6 11 Q 11 6 16 11 Q 11 16 6 11"
              fill="none"
              stroke="#B83828"
              strokeWidth="1.2"
            />
          </g>
        </g>

        {/* 5. Center Fold Spine Highlight Crease */}
        <line
          x1="120"
          y1="16"
          x2="120"
          y2="158"
          stroke="rgba(255,255,255,0.75)"
          strokeWidth="1.6"
          strokeLinecap="round"
        />

        {/* 6. Wing Fold Crease Accents */}
        <line x1="120" y1="16" x2="96" y2="142" stroke="#8F6432" strokeWidth="1.2" />
        <line x1="120" y1="16" x2="144" y2="142" stroke="#76491E" strokeWidth="1.2" />
      </svg>
    </div>
  );
}

export default function OrigamiScrollPlane({
  isActive,
  onFlightComplete,
}: OrigamiScrollPlaneProps) {
  const [phase, setPhase] = useState<"idle" | "crumpling" | "unfolding" | "launching" | "gone">("idle");

  useEffect(() => {
    if (!isActive) {
      const resetTimer = setTimeout(() => {
        setPhase("idle");
      }, 0);
      return () => clearTimeout(resetTimer);
    }

    // Step 1: Crumple Phase (0ms - 550ms)
    // The paper sheet wrinkles, folds in, and crunches into the crumpled ball
    const crumpleTimer = setTimeout(() => {
      setPhase("crumpling");
    }, 0);

    // Step 2: Unfold & Morph Phase (550ms - 1150ms)
    // The crumpled ball pops open, wings unfold in 3D, and wax seal stamps
    const unfoldTimer = setTimeout(() => {
      setPhase("unfolding");
      triggerLeafBurst(window.innerWidth / 2, window.innerHeight / 2, false);
      if (chimeEngine) {
        chimeEngine.playChime(3);
      }
    }, 550);

    // Step 3: Launch & Soar Phase (1150ms - 2750ms)
    // The paper plane takes flight across the sunset sky
    const launchTimer = setTimeout(() => {
      setPhase("launching");
      if (chimeEngine) {
        chimeEngine.playBreezeChord();
      }
    }, 1150);

    // Step 4: Complete Flight (2750ms+)
    const completeTimer = setTimeout(() => {
      setPhase("gone");
      onFlightComplete();
    }, 2750);

    return () => {
      clearTimeout(crumpleTimer);
      clearTimeout(unfoldTimer);
      clearTimeout(launchTimer);
      clearTimeout(completeTimer);
    };
  }, [isActive, onFlightComplete]);

  if (!isActive && phase === "idle") return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden flex items-center justify-center">
      {/* 1. Backdrop Sunset Sky Glow during flight */}
      <div
        className={`absolute inset-0 bg-gradient-to-t from-[#D0684D]/12 via-[#F4ACB7]/08 to-transparent transition-opacity duration-1000 ${
          phase === "launching" ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* 2. PHASE 1: TACTILE CRUMPLED PAPER BALL (0ms - 550ms) */}
      {phase === "crumpling" && (
        <div
          className="relative flex items-center justify-center"
          style={{
            animation: "crumple-squeeze 0.55s cubic-bezier(0.34, 1.3, 0.64, 1) forwards",
          }}
        >
          <CrumpledPaperBall />
        </div>
      )}

      {/* 3. PHASE 2 & 3: ORIGAMI PLANE UNFOLDING & LAUNCHING (550ms+) */}
      {(phase === "unfolding" || phase === "launching") && (
        <div
          className="relative flex items-center justify-center"
          style={{
            transformStyle: "preserve-3d",
            animation:
              phase === "unfolding"
                ? "none"
                : "airplane-soar 1.6s cubic-bezier(0.22, 1, 0.36, 1) forwards",
          }}
        >
          {/* Trailing Wind Breeze Ribbons & Floating Petals */}
          {phase === "launching" && (
            <div className="absolute -left-36 top-1/2 -translate-y-1/2 w-48 h-12 pointer-events-none opacity-80">
              <svg viewBox="0 0 180 50" className="w-full h-full" fill="none">
                <path
                  d="M 10 25 C 50 15, 90 35, 140 22 C 160 18, 175 25, 180 25"
                  stroke="rgba(208, 104, 77, 0.5)"
                  strokeWidth="2.5"
                  strokeDasharray="6 4"
                  strokeLinecap="round"
                  className="animate-pulse"
                />
                <path
                  d="M 25 35 C 65 28, 110 40, 155 30"
                  stroke="rgba(244, 172, 183, 0.55)"
                  strokeWidth="1.8"
                  strokeDasharray="4 4"
                  strokeLinecap="round"
                />
                <circle cx="45" cy="20" r="2.5" fill="#F4ACB7" opacity="0.85" />
                <circle cx="85" cy="38" r="3" fill="#D0684D" opacity="0.75" />
                <circle cx="120" cy="18" r="2" fill="#E4BA68" opacity="0.9" />
              </svg>
            </div>
          )}

          {/* Master 3D Origami Paper Plane with Unfolding Wings */}
          <OrigamiPaperPlane isUnfolding={phase === "unfolding"} />
        </div>
      )}
    </div>
  );
}
