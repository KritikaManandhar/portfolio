import React from "react";

interface ParchmentScrollProps {
  children: React.ReactNode;
  maxWidth?: string; // e.g. "max-w-2xl", "max-w-3xl", "max-w-[780px]"
  className?: string;
  sealText?: string;
}

export default function ParchmentScroll({
  children,
  maxWidth = "max-w-[760px]",
  className = "",
  sealText = "吉",
}: ParchmentScrollProps) {
  return (
    <div className={`relative w-full ${maxWidth} mx-auto my-2 sm:my-4 ${className}`}>
      {/* 1. BRAIDED SILK HANGING CORD (Artisanal Hanging Loop) */}
      <div className="flex justify-center -mb-3 sm:-mb-4 pointer-events-none select-none relative z-30">
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

      {/* 2. TOP WOODEN SCROLL ROLLER (Authentic User-Provided Watercolor Scroll Asset) */}
      <div className="relative w-full select-none pointer-events-none z-20">
        <img
          src="/scroll-top.png"
          alt="Ancient Parchment Top Roller"
          className="w-full h-auto block drop-shadow-[0_4px_10px_rgba(40,20,10,0.35)]"
          draggable={false}
        />
      </div>

      {/* 3. THE UNROLLED PARCHMENT SHEET (Authentic Rice Paper Watercolor Texture) */}
      <div
        className="relative w-full z-10 -my-[2px]"
        style={{
          backgroundImage: "url('/scroll-middle.png')",
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="px-[16%] sm:px-[17%] py-2 sm:py-3.5 relative">
          {/* Authentic Hand-Pressed Vermilion Artist Hanko Stamp */}
          {sealText && (
            <div
              className="absolute top-2 right-[17%] sm:top-3 sm:right-[18%] w-6 h-6 sm:w-7 sm:h-7 rounded-xs border-[1.5px] border-[#B83828] bg-[#B83828]/12 flex items-center justify-center text-[#B83828] select-none pointer-events-none shadow-2xs transform rotate-2 z-20"
              title="Studio Hanko Stamp"
            >
              <span className="text-xs sm:text-sm font-serif font-bold leading-none select-none">
                {sealText}
              </span>
            </div>
          )}

          {/* Actual Section Content */}
          <div className="relative z-10 text-[#3D2E24]">{children}</div>
        </div>
      </div>

      {/* 4. BOTTOM WOODEN SCROLL ROLLER (Authentic User-Provided Watercolor Scroll Asset) */}
      <div className="relative w-full select-none pointer-events-none z-20">
        <img
          src="/scroll-bottom.png"
          alt="Ancient Parchment Bottom Roller"
          className="w-full h-auto block drop-shadow-[0_8px_16px_rgba(40,20,10,0.4)]"
          draggable={false}
        />
      </div>
    </div>
  );
}

