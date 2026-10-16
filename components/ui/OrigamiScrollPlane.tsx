"use client";

import React, { useEffect, useState } from "react";

interface OrigamiScrollPlaneProps {
  isActive: boolean;
  onFlightComplete: () => void;
}

export default function OrigamiScrollPlane({
  isActive,
  onFlightComplete,
}: OrigamiScrollPlaneProps) {
  const [phase, setPhase] = useState<"idle" | "folding" | "launching" | "gone">("idle");

  useEffect(() => {
    if (!isActive) {
      setPhase("idle");
      return;
    }

    // Step 1: Start origami folding transformation (0ms - 750ms)
    setPhase("folding");

    // Step 2: Launch the folded paper airplane across the sunset sky (750ms - 2400ms)
    const launchTimer = setTimeout(() => {
      setPhase("launching");
    }, 750);

    // Step 3: Complete flight and reveal the sent letter in the scroll
    const completeTimer = setTimeout(() => {
      setPhase("gone");
      onFlightComplete();
    }, 2400);

    return () => {
      clearTimeout(launchTimer);
      clearTimeout(completeTimer);
    };
  }, [isActive, onFlightComplete]);

  if (!isActive && phase === "idle") return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden flex items-center justify-center">
      {/* 1. Backdrop Ambient Sky Breeze Glow during takeoff */}
      <div
        className={`absolute inset-0 bg-gradient-to-t from-[#D0684D]/10 via-[#F4ACB7]/05 to-transparent transition-opacity duration-1000 ${
          phase === "launching" ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* 2. THE 3D ORIGAMI SCROLL PAPER AIRPLANE */}
      <div
        className="relative flex items-center justify-center"
        style={{
          transformStyle: "preserve-3d",
          animation:
            phase === "folding"
              ? "origami-morph 0.75s cubic-bezier(0.34, 1.56, 0.64, 1) forwards"
              : phase === "launching"
              ? "airplane-soar 1.65s cubic-bezier(0.22, 1, 0.36, 1) forwards"
              : "none",
        }}
      >
        {/* Trailing Wind Vapor / Breeze Swirl Ribbons */}
        {phase === "launching" && (
          <div className="absolute -left-36 top-1/2 -translate-y-1/2 w-48 h-12 pointer-events-none opacity-70">
            <svg viewBox="0 0 180 50" className="w-full h-full" fill="none">
              <path
                d="M 10 25 C 50 15, 90 35, 140 22 C 160 18, 175 25, 180 25"
                stroke="rgba(208, 104, 77, 0.45)"
                strokeWidth="2.5"
                strokeDasharray="6 4"
                strokeLinecap="round"
                className="animate-pulse"
              />
              <path
                d="M 25 35 C 65 28, 110 40, 155 30"
                stroke="rgba(244, 172, 183, 0.5)"
                strokeWidth="1.8"
                strokeDasharray="4 4"
                strokeLinecap="round"
              />
              {/* Drifting Petals in the wake */}
              <circle cx="45" cy="20" r="2.5" fill="#F4ACB7" opacity="0.8" />
              <circle cx="85" cy="38" r="3" fill="#D0684D" opacity="0.7" />
              <circle cx="120" cy="18" r="2" fill="#E4BA68" opacity="0.9" />
            </svg>
          </div>
        )}

        {/* Master Handcrafted Origami Paper Plane Vector */}
        <div className="relative w-44 sm:w-56 h-36 sm:h-44 drop-shadow-[0_16px_32px_rgba(40,18,6,0.38)]">
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

            {/* 2. Left Wing (Sunlit Face) */}
            <polygon
              points="120,16 22,162 96,142"
              fill="url(#leftWingGrad)"
              stroke="#9E6F3E"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />

            {/* 3. Right Wing (Angled Shaded Face) */}
            <polygon
              points="120,16 144,142 218,162"
              fill="url(#rightWingGrad)"
              stroke="#8B5C2B"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />

            {/* 4. Center Fold Spine Highlight Crease */}
            <line
              x1="120"
              y1="16"
              x2="120"
              y2="158"
              stroke="rgba(255,255,255,0.75)"
              strokeWidth="1.6"
              strokeLinecap="round"
            />

            {/* 5. Wing Fold Crease Accents */}
            <line x1="120" y1="16" x2="96" y2="142" stroke="#8F6432" strokeWidth="1.2" />
            <line x1="120" y1="16" x2="144" y2="142" stroke="#76491E" strokeWidth="1.2" />

            {/* 6. Authentic Vermilion Artist Hanko Stamp on Wing */}
            <g transform="translate(152, 112) rotate(14)">
              <rect
                x="0"
                y="0"
                width="22"
                height="22"
                rx="2"
                fill="rgba(184, 56, 40, 0.16)"
                stroke="#B83828"
                strokeWidth="1.6"
              />
              <text
                x="11"
                y="16"
                fontFamily="serif"
                fontWeight="bold"
                fontSize="12"
                fill="#B83828"
                textAnchor="middle"
              >
                信
              </text>
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}
