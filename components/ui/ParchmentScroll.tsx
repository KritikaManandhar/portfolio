import React from "react";

interface ParchmentScrollProps {
  children: React.ReactNode;
  maxWidth?: string; // e.g. "max-w-3xl", "max-w-4xl", "max-w-5xl"
  className?: string;
  sealText?: string;
}

export default function ParchmentScroll({
  children,
  maxWidth = "max-w-4xl",
  className = "",
  sealText = "吉",
}: ParchmentScrollProps) {
  return (
    <div className={`relative w-full ${maxWidth} mx-auto my-6 ${className}`}>
      {/* 1. TOP HANGING SILK CORD (Traditional Emakimono Hanging Loop) */}
      <div className="flex justify-center -mb-2 pointer-events-none select-none">
        <svg
          viewBox="0 0 180 32"
          className="w-36 sm:w-44 h-7 text-[#7D522F] drop-shadow-xs"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        >
          {/* Braided cord triangular loop with top ring */}
          <path d="M12 30 Q 90 2 168 30" strokeDasharray="5 3" />
          <circle cx="90" cy="5" r="3.5" fill="#C29B72" stroke="#5C381E" strokeWidth="1.5" />
          <path d="M90 8.5 v 10" stroke="#7D522F" strokeWidth="2" />
        </svg>
      </div>

      {/* 2. TOP WOODEN SCROLL ROLLER (Dowel & Carved Finials) */}
      <div className="relative -mx-3 sm:-mx-6 z-30 flex items-center select-none pointer-events-none">
        {/* Left Finial (Turned Wooden Knob with Brass Collar) */}
        <div className="w-5 h-7 sm:w-7 sm:h-9 shrink-0 rounded-l-full bg-gradient-to-r from-[#2B180A] via-[#5C381E] to-[#8C5835] border-y border-l border-[#2B180A] shadow-md flex items-center justify-end">
          <div className="w-1.5 sm:w-2 h-full bg-gradient-to-r from-[#D4AF37] to-[#8C6D23] border-r border-[#4A3510]" />
        </div>

        {/* Master Cylindrical Wooden Rod */}
        <div className="grow h-5 sm:h-6 bg-gradient-to-b from-[#4A2D18] via-[#8C5835] via-[#A66E44] to-[#3B2210] shadow-[0_4px_8px_rgba(20,10,5,0.4)] relative overflow-hidden border-y border-[#3B2210]">
          {/* Wood grain highlight streak */}
          <div className="absolute top-1 inset-x-0 h-1 bg-white/20 blur-[0.5px]" />
          <div className="absolute bottom-0.5 inset-x-0 h-1 bg-black/35" />
        </div>

        {/* Right Finial (Turned Wooden Knob with Brass Collar) */}
        <div className="w-5 h-7 sm:w-7 sm:h-9 shrink-0 rounded-r-full bg-gradient-to-l from-[#2B180A] via-[#5C381E] to-[#8C5835] border-y border-r border-[#2B180A] shadow-md flex items-center justify-start">
          <div className="w-1.5 sm:w-2 h-full bg-gradient-to-l from-[#D4AF37] to-[#8C6D23] border-l border-[#4A3510]" />
        </div>
      </div>

      {/* 3. THE UNROLLED PARCHMENT PAPER BODY */}
      <div className="relative z-20 -mt-2.5 sm:-mt-3 -mb-2.5 sm:-mb-3 bg-[#FAF3E0] shadow-[0_20px_45px_-10px_rgba(35,20,10,0.38),inset_18px_0_24px_-14px_rgba(80,50,20,0.18),inset_-18px_0_24px_-14px_rgba(80,50,20,0.18)]">
        {/* Parchment Paper Gradient Overlays */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, #F5ECD2 0%, #FAF4E6 6%, #F9F2E3 50%, #FAF4E6 94%, #F2E5C4 100%)",
          }}
        />

        {/* Top & Bottom Roll Curl Shadows (Simulating curved unrolled paper roll) */}
        <div className="absolute top-0 inset-x-0 h-6 bg-gradient-to-b from-[#4A2D18]/45 via-[#4A2D18]/15 to-transparent pointer-events-none z-10" />
        <div className="absolute bottom-0 inset-x-0 h-6 bg-gradient-to-t from-[#4A2D18]/45 via-[#4A2D18]/15 to-transparent pointer-events-none z-10" />

        {/* Deckled / Deckle-Edged Lateral Borders */}
        <div className="absolute top-0 bottom-0 left-0 w-2.5 bg-gradient-to-r from-[#4A2D18]/25 to-transparent pointer-events-none z-10" />
        <div className="absolute top-0 bottom-0 right-0 w-2.5 bg-gradient-to-l from-[#4A2D18]/25 to-transparent pointer-events-none z-10" />

        {/* Inner Decorative Inked Border with Traditional Corner Flourishes */}
        <div className="relative z-10 m-2.5 sm:m-4 p-5 sm:p-10 border-2 border-[#C29B72]/70 rounded-xs bg-[#FAF5E8]/60 shadow-[inset_0_0_25px_rgba(180,140,90,0.1)]">
          {/* Subtle Corner Knot Accents */}
          <div className="absolute -top-1.5 -left-1.5 w-3 h-3 border-t-2 border-l-2 border-[#8C5835]" />
          <div className="absolute -top-1.5 -right-1.5 w-3 h-3 border-t-2 border-r-2 border-[#8C5835]" />
          <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 border-b-2 border-l-2 border-[#8C5835]" />
          <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 border-b-2 border-r-2 border-[#8C5835]" />

          {/* Oriental / Ghibli Style Vermilion Artist Hanko Stamp */}
          <div
            className="absolute top-3 right-3 sm:top-5 sm:right-6 w-9 h-9 sm:w-11 sm:h-11 rounded-md border-2 border-[#C0392B] bg-[#C0392B]/10 flex flex-col items-center justify-center text-[#C0392B] select-none pointer-events-none shadow-xs transform rotate-2"
            title="Studio Seal"
          >
            <span className="text-base sm:text-lg font-serif font-bold leading-none">
              {sealText}
            </span>
            <span className="text-[7px] tracking-widest font-mono uppercase font-bold mt-0.5">
              GHIBLI
            </span>
          </div>

          {/* Actual Section Content */}
          <div className="relative z-10 text-[#3D2E24]">{children}</div>
        </div>
      </div>

      {/* 4. BOTTOM WOODEN SCROLL ROLLER (Dowel & Carved Finials) */}
      <div className="relative -mx-3 sm:-mx-6 z-30 flex items-center select-none pointer-events-none">
        {/* Left Finial */}
        <div className="w-5 h-7 sm:w-7 sm:h-9 shrink-0 rounded-l-full bg-gradient-to-r from-[#2B180A] via-[#5C381E] to-[#8C5835] border-y border-l border-[#2B180A] shadow-md flex items-center justify-end">
          <div className="w-1.5 sm:w-2 h-full bg-gradient-to-r from-[#D4AF37] to-[#8C6D23] border-r border-[#4A3510]" />
        </div>

        {/* Master Cylindrical Wooden Rod */}
        <div className="grow h-5 sm:h-6 bg-gradient-to-b from-[#4A2D18] via-[#8C5835] via-[#A66E44] to-[#3B2210] shadow-[0_6px_12px_rgba(20,10,5,0.45)] relative overflow-hidden border-y border-[#3B2210]">
          <div className="absolute top-1 inset-x-0 h-1 bg-white/20 blur-[0.5px]" />
          <div className="absolute bottom-0.5 inset-x-0 h-1 bg-black/35" />
        </div>

        {/* Right Finial */}
        <div className="w-5 h-7 sm:w-7 sm:h-9 shrink-0 rounded-r-full bg-gradient-to-l from-[#2B180A] via-[#5C381E] to-[#8C5835] border-y border-r border-[#2B180A] shadow-md flex items-center justify-start">
          <div className="w-1.5 sm:w-2 h-full bg-gradient-to-l from-[#D4AF37] to-[#8C6D23] border-l border-[#4A3510]" />
        </div>
      </div>
    </div>
  );
}
