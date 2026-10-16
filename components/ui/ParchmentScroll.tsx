import React from "react";

interface ParchmentScrollProps {
  children: React.ReactNode;
  maxWidth?: string; // e.g. "max-w-2xl", "max-w-3xl"
  className?: string;
  sealText?: string;
}

// Left Hand-Painted Turned Wooden Finial
function ScrollFinialLeft() {
  return (
    <svg
      viewBox="0 0 52 36"
      className="w-6 sm:w-8 h-4.5 sm:h-6 shrink-0 select-none pointer-events-none drop-shadow-[0_3px_6px_rgba(50,25,10,0.3)]"
      fill="none"
    >
      <defs>
        <linearGradient id="woodGradL" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#7E4420" />
          <stop offset="20%" stopColor="#B87640" />
          <stop offset="45%" stopColor="#E4A972" />
          <stop offset="75%" stopColor="#A86532" />
          <stop offset="100%" stopColor="#5A2E12" />
        </linearGradient>
        <linearGradient id="brassGradL" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#8A6B29" />
          <stop offset="30%" stopColor="#E2BE6C" />
          <stop offset="60%" stopColor="#C99B42" />
          <stop offset="100%" stopColor="#684C16" />
        </linearGradient>
        <linearGradient id="endCapGradL" x1="0%" y1="30%" x2="100%" y2="70%">
          <stop offset="0%" stopColor="#E4A972" />
          <stop offset="40%" stopColor="#A86532" />
          <stop offset="100%" stopColor="#4A240C" />
        </linearGradient>
      </defs>

      <path
        d="M 12 7 C 4 7, 1 12, 1 18 C 1 24, 4 29, 12 29 C 16 29, 18 26.5, 20 24.5 L 20 11.5 C 18 9.5, 16 7, 12 7 Z"
        fill="url(#endCapGradL)"
        stroke="#48220A"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M 20 11.5 C 22.5 10.5, 24.5 10.5, 26 11.5 L 26 24.5 C 24.5 25.5, 22.5 25.5, 20 24.5 Z"
        fill="url(#woodGradL)"
        stroke="#48220A"
        strokeWidth="1.4"
      />
      <rect
        x="26"
        y="9.5"
        width="5"
        height="17"
        rx="1"
        fill="url(#brassGradL)"
        stroke="#4E350E"
        strokeWidth="1.2"
      />
      <path
        d="M 31 11 L 52 11 L 52 25 L 31 25 Z"
        fill="url(#woodGradL)"
        stroke="#48220A"
        strokeWidth="1.5"
      />
      <path
        d="M 6 15 Q 12 11 18 13.5"
        stroke="rgba(255,255,255,0.45)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

// Right Hand-Painted Turned Wooden Finial
function ScrollFinialRight() {
  return (
    <svg
      viewBox="0 0 52 36"
      className="w-6 sm:w-8 h-4.5 sm:h-6 shrink-0 select-none pointer-events-none drop-shadow-[0_3px_6px_rgba(50,25,10,0.3)] -scale-x-100"
      fill="none"
    >
      <defs>
        <linearGradient id="woodGradR" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#7E4420" />
          <stop offset="20%" stopColor="#B87640" />
          <stop offset="45%" stopColor="#E4A972" />
          <stop offset="75%" stopColor="#A86532" />
          <stop offset="100%" stopColor="#5A2E12" />
        </linearGradient>
        <linearGradient id="brassGradR" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#8A6B29" />
          <stop offset="30%" stopColor="#E2BE6C" />
          <stop offset="60%" stopColor="#C99B42" />
          <stop offset="100%" stopColor="#684C16" />
        </linearGradient>
        <linearGradient id="endCapGradR" x1="0%" y1="30%" x2="100%" y2="70%">
          <stop offset="0%" stopColor="#E4A972" />
          <stop offset="40%" stopColor="#A86532" />
          <stop offset="100%" stopColor="#4A240C" />
        </linearGradient>
      </defs>

      <path
        d="M 12 7 C 4 7, 1 12, 1 18 C 1 24, 4 29, 12 29 C 16 29, 18 26.5, 20 24.5 L 20 11.5 C 18 9.5, 16 7, 12 7 Z"
        fill="url(#endCapGradR)"
        stroke="#48220A"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M 20 11.5 C 22.5 10.5, 24.5 10.5, 26 11.5 L 26 24.5 C 24.5 25.5, 22.5 25.5, 20 24.5 Z"
        fill="url(#woodGradR)"
        stroke="#48220A"
        strokeWidth="1.4"
      />
      <rect
        x="26"
        y="9.5"
        width="5"
        height="17"
        rx="1"
        fill="url(#brassGradR)"
        stroke="#4E350E"
        strokeWidth="1.2"
      />
      <path
        d="M 31 11 L 52 11 L 52 25 L 31 25 Z"
        fill="url(#woodGradR)"
        stroke="#48220A"
        strokeWidth="1.5"
      />
      <path
        d="M 6 15 Q 12 11 18 13.5"
        stroke="rgba(255,255,255,0.45)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function ParchmentScroll({
  children,
  maxWidth = "max-w-2xl",
  className = "",
  sealText = "吉",
}: ParchmentScrollProps) {
  return (
    <div className={`relative w-full ${maxWidth} mx-auto my-2 sm:my-4 ${className}`}>
      {/* 1. BRAIDED SILK HANGING CORD (Artisanal Hanging Loop) */}
      <div className="flex justify-center -mb-2 pointer-events-none select-none">
        <svg
          viewBox="0 0 160 28"
          className="w-28 sm:w-36 h-6 text-[#9E6536] drop-shadow-[0_2px_3px_rgba(60,30,10,0.2)]"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
        >
          <path
            d="M 14 26 C 50 10, 70 3, 80 3 C 90 3, 110 10, 146 26"
            stroke="#9E6536"
            strokeWidth="2"
            strokeDasharray="4 2"
          />
          <circle cx="80" cy="4" r="3.5" fill="#E4BA68" stroke="#5A3A16" strokeWidth="1.2" />
          <circle cx="80" cy="4" r="1.5" fill="#FAF3E0" />
          <circle cx="22" cy="22" r="2" fill="#6E4018" />
          <circle cx="138" cy="22" r="2" fill="#6E4018" />
        </svg>
      </div>

      {/* 2. TOP WOODEN SCROLL ROLLER (Honey-Oak Anime Dowel & Turned Finials) */}
      <div className="relative -mx-2 sm:-mx-4 z-30 flex items-center select-none pointer-events-none">
        <ScrollFinialLeft />

        {/* Master Cylindrical Honey-Oak Rod */}
        <div className="grow h-3.5 sm:h-4.5 bg-gradient-to-b from-[#7E4420] via-[#B87640] via-[#E4A972] via-[#A86532] to-[#5A2E12] relative border-y border-[#48220A] shadow-[0_3px_8px_rgba(50,25,10,0.3)]">
          <div className="absolute top-[1.5px] inset-x-0 h-[2px] bg-white/40 blur-[0.4px]" />
          <div className="absolute bottom-[1px] inset-x-0 h-[1.5px] bg-[#381B08]/40" />
        </div>

        <ScrollFinialRight />
      </div>

      {/* 3. THE UNROLLED PARCHMENT SHEET */}
      <div className="relative z-20 -mt-1.5 sm:-mt-2 -mb-1.5 sm:-mb-2 rounded-t-lg sm:rounded-t-xl rounded-b-lg sm:rounded-b-xl overflow-hidden bg-[#FAF4E6] shadow-[0_16px_36px_-8px_rgba(40,22,10,0.32),0_4px_12px_rgba(50,25,10,0.1)] border-x border-[#C29B72]/50">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, #F5ECD2 0%, #FAF5E8 5%, #F9F2E3 50%, #FAF5E8 95%, #EFE1C2 100%)",
          }}
        />

        {/* Top Roll Paper Hem & Cast Shadow */}
        <div className="absolute top-0 inset-x-0 h-5 bg-gradient-to-b from-[#5A2E12]/30 via-[#5A2E12]/10 to-transparent pointer-events-none z-10" />
        {/* Bottom Roll Paper Hem & Cast Shadow */}
        <div className="absolute bottom-0 inset-x-0 h-5 bg-gradient-to-t from-[#5A2E12]/30 via-[#5A2E12]/10 to-transparent pointer-events-none z-10" />

        {/* Left and Right Curled Paper Lateral Vignette */}
        <div className="absolute top-0 bottom-0 left-0 w-2.5 bg-gradient-to-r from-[#5A2E12]/15 to-transparent pointer-events-none z-10" />
        <div className="absolute top-0 bottom-0 right-0 w-2.5 bg-gradient-to-l from-[#5A2E12]/15 to-transparent pointer-events-none z-10" />

        {/* Inner Decorative Traditional Inked Border */}
        <div className="relative z-10 m-2 sm:m-3 p-4 sm:p-6 border-2 border-[#C29B72]/60 rounded-md bg-[#FAF5E8]/60 shadow-[inset_0_0_16px_rgba(180,140,90,0.08)]">
          {/* Traditional Inked Corner Brackets */}
          <div className="absolute top-1 left-1 w-3 h-3 border-t-2 border-l-2 border-[#8A5229]/75" />
          <div className="absolute top-1 right-1 w-3 h-3 border-t-2 border-r-2 border-[#8A5229]/75" />
          <div className="absolute bottom-1 left-1 w-3 h-3 border-b-2 border-l-2 border-[#8A5229]/75" />
          <div className="absolute bottom-1 right-1 w-3 h-3 border-b-2 border-r-2 border-[#8A5229]/75" />

          {/* Authentic Hand-Pressed Vermilion Artist Hanko Stamp */}
          <div
            className="absolute top-3 right-3 sm:top-4 sm:right-4 w-7 h-7 sm:w-8 sm:h-8 rounded-sm border-2 border-[#B83828] bg-[#B83828]/12 flex items-center justify-center text-[#B83828] select-none pointer-events-none shadow-2xs transform rotate-2"
            title="Studio Hanko Stamp"
          >
            <span className="text-sm sm:text-base font-serif font-bold leading-none select-none">
              {sealText}
            </span>
          </div>

          {/* Actual Section Content */}
          <div className="relative z-10 text-[#3D2E24]">{children}</div>
        </div>
      </div>

      {/* 4. BOTTOM WOODEN SCROLL ROLLER */}
      <div className="relative -mx-2 sm:-mx-4 z-30 flex items-center select-none pointer-events-none">
        <ScrollFinialLeft />

        {/* Master Cylindrical Honey-Oak Rod */}
        <div className="grow h-3.5 sm:h-4.5 bg-gradient-to-b from-[#7E4420] via-[#B87640] via-[#E4A972] via-[#A86532] to-[#5A2E12] relative border-y border-[#48220A] shadow-[0_5px_10px_rgba(50,25,10,0.35)]">
          <div className="absolute top-[1.5px] inset-x-0 h-[2px] bg-white/40 blur-[0.4px]" />
          <div className="absolute bottom-[1px] inset-x-0 h-[1.5px] bg-[#381B08]/40" />
        </div>

        <ScrollFinialRight />
      </div>
    </div>
  );
}
