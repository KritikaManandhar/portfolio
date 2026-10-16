import React from "react";

interface ParchmentScrollProps {
  children: React.ReactNode;
  maxWidth?: string; // e.g. "max-w-2xl", "max-w-[760px]"
  className?: string;
  isFolding?: boolean; // When true, folds the scroll inward into the origami plane
}

// Hand-Painted Turned Wooden Finial (Left)
function ScrollFinialLeft() {
  return (
    <svg
      viewBox="0 0 76 56"
      className="w-8 sm:w-11 md:w-13 h-6 sm:h-8 md:h-9 shrink-0 select-none pointer-events-none drop-shadow-[0_3px_6px_rgba(40,18,8,0.35)]"
      fill="none"
    >
      <defs>
        {/* Polished Lacquered Rosewood / Walnut Wood Gradient */}
        <linearGradient id="finialWoodGradL" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#482310" />
          <stop offset="16%" stopColor="#8A4820" />
          <stop offset="38%" stopColor="#D88D4E" />
          <stop offset="65%" stopColor="#783A16" />
          <stop offset="100%" stopColor="#2E1306" />
        </linearGradient>

        {/* Polished Antique Brass Inlay Collar */}
        <linearGradient id="brassCollarGradL" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#806222" />
          <stop offset="28%" stopColor="#F4D680" />
          <stop offset="60%" stopColor="#C89E3E" />
          <stop offset="100%" stopColor="#523B10" />
        </linearGradient>

        {/* Spherical Knob Radial Specular Reflection */}
        <radialGradient id="knobHighlightGradL" cx="35%" cy="30%" r="65%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.65)" />
          <stop offset="45%" stopColor="rgba(255,255,255,0.12)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>
      </defs>

      {/* 1. Master Lathe-Turned Wooden Silhouette */}
      <path
        d="M 3 28
           C 3 17, 10 11, 19 11
           C 26 11, 29 15, 32 19
           C 35 17, 39 17, 43 18
           C 45 10, 49 3, 55 3
           L 59 3
           C 61 3, 62 4, 62 6
           L 64 6
           C 66 6, 67 7, 68 9
           L 76 9
           L 76 47
           L 68 47
           C 67 49, 66 50, 64 50
           L 62 50
           C 62 52, 61 53, 59 53
           L 55 53
           C 49 53, 45 46, 43 38
           C 39 39, 35 39, 32 37
           C 29 41, 26 45, 19 45
           C 10 45, 3 39, 3 28
           Z"
        fill="url(#finialWoodGradL)"
        stroke="#361708"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />

      {/* 2. Turned Brass Inlay Ring on the Neck */}
      <rect
        x="39"
        y="16.5"
        width="4.5"
        height="23"
        rx="0.8"
        fill="url(#brassCollarGradL)"
        stroke="#4A340C"
        strokeWidth="1"
      />

      {/* 3. Flared Collar Disc Concentric Turned Highlights */}
      <path
        d="M 55 4 C 57 18, 57 38, 55 52"
        stroke="#F5CA7B"
        strokeWidth="1.2"
        fill="none"
        opacity="0.65"
      />
      <path
        d="M 61 7 C 62 19, 62 37, 61 49"
        stroke="#381806"
        strokeWidth="1.2"
        fill="none"
        opacity="0.8"
      />

      {/* 4. Spherical 3D Knob Specular Gloss Highlights */}
      <ellipse cx="17" cy="20" rx="8" ry="5" fill="url(#knobHighlightGradL)" />
      <path
        d="M 8 23 C 11 16, 17 14, 23 15"
        stroke="rgba(255,255,255,0.48)"
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

// Hand-Painted Turned Wooden Finial (Right - Exact Mirror)
function ScrollFinialRight() {
  return (
    <div className="-scale-x-100 flex items-center">
      <ScrollFinialLeft />
    </div>
  );
}

export default function ParchmentScroll({
  children,
  maxWidth = "max-w-[760px]",
  className = "",
  isFolding = false,
}: ParchmentScrollProps) {
  return (
    <div
      className={`relative w-full ${maxWidth} mx-auto my-3 sm:my-5 ${
        isFolding ? "pointer-events-none" : "scale-100 rotate-0 opacity-100"
      } ${className}`}
    >
      {/* 1. BRAIDED SILK HANGING CORD (Artisanal Hanging Loop) */}
      <div
        className={`flex justify-center -mb-2 sm:-mb-3 pointer-events-none select-none relative z-30 transition-all duration-300 ease-out ${
          isFolding ? "opacity-0 -translate-y-8" : "opacity-100 translate-y-0"
        }`}
      >
        <svg
          viewBox="0 0 160 28"
          className="w-24 sm:w-32 h-5 sm:h-6 text-[#9E6536] drop-shadow-[0_2px_4px_rgba(60,30,10,0.25)]"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
        >
          <path
            d="M 18 26 C 50 10, 70 3, 80 3 C 90 3, 110 10, 142 26"
            stroke="#9E6536"
            strokeWidth="2"
            strokeDasharray="4 2"
          />
          <circle cx="80" cy="4" r="3.5" fill="#E4BA68" stroke="#5A3A16" strokeWidth="1.2" />
          <circle cx="80" cy="4" r="1.5" fill="#FAF3E0" />
          <circle cx="26" cy="22" r="2" fill="#6E4018" />
          <circle cx="134" cy="22" r="2" fill="#6E4018" />
        </svg>
      </div>

      {/* 2. TOP WOODEN SCROLL ROLLER (Detaches and rolls away during crumple) */}
      <div
        className={`relative -mx-3 sm:-mx-5 md:-mx-7 z-30 flex items-center select-none pointer-events-none drop-shadow-[0_5px_12px_rgba(40,18,8,0.32)] transition-all duration-500 ease-out ${
          isFolding
            ? "-translate-y-36 rotate-[-18deg] opacity-0 scale-95 pointer-events-none"
            : "translate-y-0 rotate-0 opacity-100 scale-100"
        }`}
      >
        <ScrollFinialLeft />

        {/* Master Rolled Parchment Cylinder */}
        <div className="grow h-5 sm:h-7 md:h-8 relative overflow-hidden rounded-[2px] border-y border-[#8A5228]/85 shadow-[inset_0_1px_2px_rgba(255,255,255,0.4)]">
          {/* Base Cylindrical Gradient */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, #A87648 0%, #D8A976 12%, #FBF2DE 32%, #EED5AA 55%, #D4A874 74%, #8D5428 92%, #522D13 100%)",
            }}
          />
          {/* Paper Wrap Crease Line */}
          <div className="absolute top-[68%] inset-x-0 h-[1.5px] bg-[#6E3C18]/60 shadow-[0_1px_1px_rgba(255,255,255,0.35)]" />
          {/* Cylindrical Top Specular Light Sheen */}
          <div className="absolute top-[2px] inset-x-0 h-[2.5px] bg-white/45 blur-[0.5px]" />
          {/* Fine Japanese Paper Fiber Striations */}
          <div
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage:
                "repeating-linear-gradient(90deg, transparent, transparent 12px, rgba(90,40,10,0.2) 12px, rgba(90,40,10,0.2) 13px)",
            }}
          />
        </div>

        <ScrollFinialRight />
      </div>

      {/* 3. THE UNROLLED PARCHMENT SHEET (Buckles and crumples into the paper wad) */}
      <div
        style={
          isFolding
            ? {
                animation: "sheet-crumple 0.65s cubic-bezier(0.25, 1, 0.5, 1) forwards",
              }
            : undefined
        }
        className="relative z-10 -my-1 sm:-my-1.5 mx-1.5 sm:mx-2.5 md:mx-3.5 rounded-sm overflow-hidden bg-[#FAF4E6] shadow-[0_16px_40px_-8px_rgba(35,16,6,0.32),0_4px_14px_rgba(50,22,8,0.12)] border-x-2 border-[#C2986E]/75"
      >
        {/* Multi-Tone Watercolor Rice-Paper Wash */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, #F4E7CA 0%, #FAF5E8 4%, #F8F1DF 48%, #F7EEDA 52%, #FAF5E8 96%, #EDE0BE 100%)",
          }}
        />

        {/* Left and Right Curled Paper Lateral Vignettes (3D Curl Depth) */}
        <div className="absolute top-0 bottom-0 left-0 w-3.5 sm:w-5 bg-gradient-to-r from-[#4A240C]/18 via-[#4A240C]/06 to-transparent pointer-events-none z-10" />
        <div className="absolute top-0 bottom-0 right-0 w-3.5 sm:w-5 bg-gradient-to-l from-[#4A240C]/18 via-[#4A240C]/06 to-transparent pointer-events-none z-10" />

        {/* Top and Bottom Paper Curl Shadows */}
        <div className="absolute top-0 inset-x-0 h-6 bg-gradient-to-b from-[#4A240C]/28 via-[#4A240C]/08 to-transparent pointer-events-none z-10" />
        <div className="absolute bottom-0 inset-x-0 h-6 bg-gradient-to-t from-[#4A240C]/28 via-[#4A240C]/08 to-transparent pointer-events-none z-10" />

        {/* Dynamic Crumple Paper Wrinkles & Crease Shading Overlay */}
        {isFolding && (
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-20"
            viewBox="0 0 500 500"
            preserveAspectRatio="none"
            fill="none"
          >
            {/* Shaded Valley Facets */}
            <polygon points="0,0 260,240 110,490 0,500" fill="rgba(55,24,6,0.22)" />
            <polygon points="500,0 240,260 410,500 500,500" fill="rgba(65,30,8,0.25)" />
            <polygon points="120,0 250,250 380,0" fill="rgba(40,16,4,0.18)" />
            <polygon points="250,250 140,500 360,500" fill="rgba(40,16,4,0.2)" />

            {/* Deep Crease Valleys */}
            <path
              d="M 15 25 L 245 255 L 75 485 M 485 15 L 255 245 L 425 485 M 35 250 L 465 245 M 245 15 L 255 485 M 115 65 L 385 435 M 385 65 L 115 435"
              stroke="#3A1705"
              strokeWidth="3.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.9"
            />
            {/* Secondary Crease Lines */}
            <path
              d="M 45 125 L 250 250 L 135 375 M 455 125 L 250 250 L 365 375"
              stroke="#7A3D14"
              strokeWidth="2.2"
              strokeLinecap="round"
              opacity="0.85"
            />
            {/* Crisp Peak Highlight Ridges */}
            <path
              d="M 18 22 L 242 252 L 78 482 M 482 18 L 252 242 M 35 247 L 465 242 M 118 62 L 382 432"
              stroke="#FFFDF6"
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.95"
            />
          </svg>
        )}

        {/* Inner Content Area */}
        <div
          className={`relative z-10 px-5 sm:px-8 md:px-10 py-5 sm:py-7 transition-all duration-300 ${
            isFolding ? "filter blur-[1.5px] opacity-40 scale-95" : ""
          }`}
        >
          {/* Actual Section Content */}
          <div className="relative z-10 text-[#3D2E24]">{children}</div>
        </div>
      </div>

      {/* 4. BOTTOM WOODEN SCROLL ROLLER (Detaches and drops away during crumple) */}
      <div
        className={`relative -mx-3 sm:-mx-5 md:-mx-7 z-30 flex items-center select-none pointer-events-none drop-shadow-[0_8px_18px_rgba(40,18,8,0.38)] transition-all duration-500 ease-out ${
          isFolding
            ? "translate-y-36 rotate-[18deg] opacity-0 scale-95 pointer-events-none"
            : "translate-y-0 rotate-0 opacity-100 scale-100"
        }`}
      >
        <ScrollFinialLeft />

        {/* Master Rolled Parchment Cylinder */}
        <div className="grow h-5 sm:h-7 md:h-8 relative overflow-hidden rounded-[2px] border-y border-[#8A5228]/85 shadow-[inset_0_1px_2px_rgba(255,255,255,0.3)]">
          {/* Base Bottom Cylinder Rolled Paper Gradient */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, #7A421C 0%, #C89966 14%, #FBF2DE 38%, #EED2A2 62%, #C28D56 80%, #7E451E 94%, #42200A 100%)",
            }}
          />
          {/* Paper Hem Wrap Crease */}
          <div className="absolute top-[28%] inset-x-0 h-[1.5px] bg-[#5E2F10]/50 shadow-[0_1px_1px_rgba(255,255,255,0.3)]" />
          {/* Cylindrical Specular Light Sheen */}
          <div className="absolute top-[34%] inset-x-0 h-[2.5px] bg-white/40 blur-[0.5px]" />
          {/* Fine Paper Striations */}
          <div
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage:
                "repeating-linear-gradient(90deg, transparent, transparent 12px, rgba(90,40,10,0.2) 12px, rgba(90,40,10,0.2) 13px)",
            }}
          />
        </div>

        <ScrollFinialRight />
      </div>
    </div>
  );
}
