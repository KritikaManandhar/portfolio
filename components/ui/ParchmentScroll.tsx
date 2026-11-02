"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Sparkles, ChevronDown } from "lucide-react";
import { chimeEngine } from "@/components/audio/ChimeEngine";

export type ScrollWoodVariant = "default" | "sage" | "amber" | "indigo";

export interface ParchmentScrollProps {
  children: React.ReactNode;
  maxWidth?: string; // e.g. "max-w-2xl", "max-w-[760px]"
  className?: string;
  isFolding?: boolean; // When true, folds the scroll inward into the origami plane
  scrollAnimated?: boolean; // When true, enables scroll-driven growing and opening
  unrollProgress?: number; // Optional 0.0 to 1.0 progress value override
  sealLabel?: string; // Optional label displayed on the rolled seal when closed
  contentPadding?: string; // Custom padding for inner sheet (e.g. for compact world view)
  woodVariant?: ScrollWoodVariant; // Custom aesthetic theme for distinct physical scrolls
  onUnroll?: () => void;
}

const FINIAL_PALETTES = {
  default: {
    woodStops: [
      { offset: "0%", color: "#482310" },
      { offset: "16%", color: "#8A4820" },
      { offset: "38%", color: "#D88D4E" },
      { offset: "65%", color: "#783A16" },
      { offset: "100%", color: "#2E1306" },
    ],
    brassStops: [
      { offset: "0%", color: "#806222" },
      { offset: "28%", color: "#F4D680" },
      { offset: "60%", color: "#C89E3E" },
      { offset: "100%", color: "#523B10" },
    ],
    outline: "#361708",
    collarStroke: "#4A340C",
    sheenStroke: "#F5CA7B",
    creaseStroke: "#381806",
  },
  sage: {
    woodStops: [
      { offset: "0%", color: "#1F3320" },
      { offset: "16%", color: "#3B5A3C" },
      { offset: "38%", color: "#6B8A68" },
      { offset: "65%", color: "#2E4730" },
      { offset: "100%", color: "#142416" },
    ],
    brassStops: [
      { offset: "0%", color: "#4A5E3F" },
      { offset: "28%", color: "#A7BD9D" },
      { offset: "60%", color: "#738C67" },
      { offset: "100%", color: "#2E3B27" },
    ],
    outline: "#162818",
    collarStroke: "#273822",
    sheenStroke: "#B8D4AD",
    creaseStroke: "#1E301F",
  },
  amber: {
    woodStops: [
      { offset: "0%", color: "#4A1E12" },
      { offset: "16%", color: "#9E4424" },
      { offset: "38%", color: "#E07A4A" },
      { offset: "65%", color: "#8B3518" },
      { offset: "100%", color: "#331208" },
    ],
    brassStops: [
      { offset: "0%", color: "#8A5E1E" },
      { offset: "28%", color: "#FBD36E" },
      { offset: "60%", color: "#D99B26" },
      { offset: "100%", color: "#5E3D0D" },
    ],
    outline: "#381308",
    collarStroke: "#4E320A",
    sheenStroke: "#FEDB8B",
    creaseStroke: "#3A160A",
  },
  indigo: {
    woodStops: [
      { offset: "0%", color: "#381730" },
      { offset: "16%", color: "#6E2E5E" },
      { offset: "38%", color: "#B05896" },
      { offset: "65%", color: "#5A224C" },
      { offset: "100%", color: "#250D20" },
    ],
    brassStops: [
      { offset: "0%", color: "#8F6E28" },
      { offset: "28%", color: "#FFE58A" },
      { offset: "60%", color: "#DDB54A" },
      { offset: "100%", color: "#634812" },
    ],
    outline: "#2A0E24",
    collarStroke: "#4F390D",
    sheenStroke: "#FFEA9F",
    creaseStroke: "#2F1129",
  },
};

const VARIANT_CYLINDER_STYLES = {
  default: {
    topGrad:
      "linear-gradient(180deg, #A87648 0%, #D8A976 12%, #FBF2DE 32%, #EED5AA 55%, #D4A874 74%, #8D5428 92%, #522D13 100%)",
    bottomGrad:
      "linear-gradient(180deg, #7A421C 0%, #C89966 14%, #FBF2DE 38%, #EED2A2 62%, #C28D56 80%, #7E451E 94%, #42200A 100%)",
    borderTopBottom: "border-[#8A5228]/85",
    creaseColor: "bg-[#6E3C18]/60",
    bottomCreaseColor: "bg-[#5E2F10]/50",
    cordColor: "#9E6536",
    cordBeadOuter: "#E4BA68",
    cordBeadInner: "#FAF3E0",
    cordKnots: "#6E4018",
    sheetBorder: "border-[#C2986E]/75",
    sheetWash:
      "linear-gradient(180deg, #F4E7CA 0%, #FAF5E8 4%, #F8F1DF 48%, #F7EEDA 52%, #FAF5E8 96%, #EDE0BE 100%)",
    sealBorder: "border-[#B99A60]/85",
    sealText: "text-[#5C381E]",
    sealIcon: "text-[#B99A60]",
  },
  sage: {
    topGrad:
      "linear-gradient(180deg, #4A6349 0%, #769675 12%, #F5F7EE 32%, #DCE5D8 55%, #7A9B79 74%, #3B533A 92%, #1C2B1B 100%)",
    bottomGrad:
      "linear-gradient(180deg, #3A5239 0%, #688867 14%, #F5F7EE 38%, #D5E0D1 62%, #638362 80%, #30462F 94%, #182517 100%)",
    borderTopBottom: "border-[#4A6349]/85",
    creaseColor: "bg-[#2D422C]/60",
    bottomCreaseColor: "bg-[#253825]/50",
    cordColor: "#567A54",
    cordBeadOuter: "#A3BFA0",
    cordBeadInner: "#F3F7F2",
    cordKnots: "#2E472D",
    sheetBorder: "border-[#6B8A68]/70",
    sheetWash:
      "linear-gradient(180deg, #EFF5EC 0%, #FAFBF7 4%, #F3F7F0 48%, #F0F5ED 52%, #FAFBF7 96%, #E3EBE0 100%)",
    sealBorder: "border-[#6B8A68]/85",
    sealText: "text-[#2D452B]",
    sealIcon: "text-[#6B8A68]",
  },
  amber: {
    topGrad:
      "linear-gradient(180deg, #B25A38 0%, #E28864 12%, #FFF4ED 32%, #FAD9C8 55%, #DC7752 74%, #943A1C 92%, #551E0C 100%)",
    bottomGrad:
      "linear-gradient(180deg, #8C371B 0%, #D46A42 14%, #FFF4ED 38%, #F5CEBA 62%, #C75B34 80%, #7D2D13 94%, #461506 100%)",
    borderTopBottom: "border-[#9E4424]/85",
    creaseColor: "bg-[#662612]/60",
    bottomCreaseColor: "bg-[#551E0C]/50",
    cordColor: "#B25032",
    cordBeadOuter: "#F39E79",
    cordBeadInner: "#FFF6F0",
    cordKnots: "#6B2713",
    sheetBorder: "border-[#D0684D]/70",
    sheetWash:
      "linear-gradient(180deg, #FBF0E8 0%, #FFF9F5 4%, #FAF2EB 48%, #F8EFE6 52%, #FFF9F5 96%, #F5E3D6 100%)",
    sealBorder: "border-[#D0684D]/85",
    sealText: "text-[#6B2713]",
    sealIcon: "text-[#D0684D]",
  },
  indigo: {
    topGrad:
      "linear-gradient(180deg, #7A3D68 0%, #B2659B 12%, #FDF4FA 32%, #F5D3EA 55%, #A85690 74%, #632B52 92%, #38122D 100%)",
    bottomGrad:
      "linear-gradient(180deg, #5D244D 0%, #9E4D85 14%, #FDF4FA 38%, #ECC3DF 62%, #94417B 80%, #541D44 94%, #2E0B24 100%)",
    borderTopBottom: "border-[#7A3D68]/85",
    creaseColor: "bg-[#4A1A3E]/60",
    bottomCreaseColor: "bg-[#3D1432]/50",
    cordColor: "#8A3D72",
    cordBeadOuter: "#E297C9",
    cordBeadInner: "#FDF4FA",
    cordKnots: "#4F1B41",
    sheetBorder: "border-[#945280]/70",
    sheetWash:
      "linear-gradient(180deg, #F9EFF5 0%, #FCF8FA 4%, #F7EEF4 48%, #F5EAF2 52%, #FCF8FA 96%, #F1DFEC 100%)",
    sealBorder: "border-[#945280]/85",
    sealText: "text-[#541D44]",
    sealIcon: "text-[#945280]",
  },
};

// Hand-Painted Turned Wooden Finial (Left)
function ScrollFinialLeft({ woodVariant = "default" }: { woodVariant?: ScrollWoodVariant }) {
  const p = FINIAL_PALETTES[woodVariant] || FINIAL_PALETTES.default;
  const gradId = `finialWoodGradL-${woodVariant}`;
  const collarId = `brassCollarGradL-${woodVariant}`;
  const highlightId = `knobHighlightGradL-${woodVariant}`;

  return (
    <svg
      viewBox="0 0 76 56"
      className="w-8 sm:w-11 md:w-13 h-6 sm:h-8 md:h-9 shrink-0 select-none pointer-events-none drop-shadow-[0_3px_6px_rgba(40,18,8,0.35)]"
      fill="none"
    >
      <defs>
        <linearGradient id={gradId} x1="0%" y1="0%" x2="0%" y2="100%">
          {p.woodStops.map((s, i) => (
            <stop key={i} offset={s.offset} stopColor={s.color} />
          ))}
        </linearGradient>

        <linearGradient id={collarId} x1="0%" y1="0%" x2="0%" y2="100%">
          {p.brassStops.map((s, i) => (
            <stop key={i} offset={s.offset} stopColor={s.color} />
          ))}
        </linearGradient>

        <radialGradient id={highlightId} cx="35%" cy="30%" r="65%">
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
        fill={`url(#${gradId})`}
        stroke={p.outline}
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
        fill={`url(#${collarId})`}
        stroke={p.collarStroke}
        strokeWidth="1"
      />

      {/* 3. Flared Collar Disc Concentric Turned Highlights */}
      <path
        d="M 55 4 C 57 18, 57 38, 55 52"
        stroke={p.sheenStroke}
        strokeWidth="1.2"
        fill="none"
        opacity="0.65"
      />
      <path
        d="M 61 7 C 62 19, 62 37, 61 49"
        stroke={p.creaseStroke}
        strokeWidth="1.2"
        fill="none"
        opacity="0.8"
      />

      {/* 4. Spherical 3D Knob Specular Gloss Highlights */}
      <ellipse cx="17" cy="20" rx="8" ry="5" fill={`url(#${highlightId})`} />
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
function ScrollFinialRight({ woodVariant = "default" }: { woodVariant?: ScrollWoodVariant }) {
  return (
    <div className="-scale-x-100 flex items-center">
      <ScrollFinialLeft woodVariant={woodVariant} />
    </div>
  );
}

export default function ParchmentScroll({
  children,
  maxWidth = "max-w-[760px]",
  className = "",
  isFolding = false,
  scrollAnimated = false,
  unrollProgress,
  sealLabel,
  contentPadding = "px-5 sm:px-8 md:px-10 py-5 sm:py-7",
  woodVariant = "default",
  onUnroll,
}: ParchmentScrollProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const [measuredHeight, setMeasuredHeight] = useState<number>(450);
  const [internalProgress, setInternalProgress] = useState<number>(1.0);
  const [isClient, setIsClient] = useState<boolean>(false);
  const hasPlayedRustleRef = useRef<boolean>(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Measure content height with ResizeObserver
  useEffect(() => {
    if (!contentRef.current) return;
    const update = () => {
      if (contentRef.current) {
        const h = contentRef.current.scrollHeight;
        if (h > 0) setMeasuredHeight(h);
      }
    };
    update();
    if (typeof ResizeObserver !== "undefined") {
      const ro = new ResizeObserver(update);
      ro.observe(contentRef.current);
      return () => ro.disconnect();
    }
  }, [children]);

  // Viewport scroll observation when unrollProgress is not provided explicitly
  useEffect(() => {
    if (unrollProgress !== undefined || !scrollAnimated) return;

    const handleScroll = () => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;

      // Start opening when top of element enters bottom of viewport
      // Reach fully open when element top reaches 28% from top of viewport
      const enter = vh;
      const target = vh * 0.28;
      const p = Math.max(0, Math.min(1, (enter - rect.top) / (enter - target)));
      setInternalProgress(p);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [unrollProgress, scrollAnimated]);

  // Compute effective progress
  const targetProgress =
    unrollProgress !== undefined
      ? Math.max(0, Math.min(1, unrollProgress))
      : scrollAnimated
      ? internalProgress
      : 1.0;

  // On initial SSR/server, render fully open for SEO & accessibility
  const effectiveProgress = isClient ? targetProgress : 1.0;
  const isFullyOpen = effectiveProgress >= 0.96;

  // Play gentle rustle sound when unrolling starts
  useEffect(() => {
    if (effectiveProgress > 0.1 && !hasPlayedRustleRef.current) {
      hasPlayedRustleRef.current = true;
      if (chimeEngine) chimeEngine.playPaperRustle();
    } else if (effectiveProgress <= 0.05) {
      hasPlayedRustleRef.current = false;
    }
  }, [effectiveProgress]);

  const handleOpenFolio = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (onUnroll) {
        onUnroll();
      } else if (containerRef.current) {
        containerRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      if (chimeEngine) chimeEngine.playPaperRustle();
    },
    [onUnroll]
  );

  // Focus capture to ensure keyboard accessibility
  const handleFocusCapture = useCallback(() => {
    if (effectiveProgress < 0.9) {
      setInternalProgress(1.0);
    }
  }, [effectiveProgress]);

  // Dimensions & Scale calculation with natural physical easing
  const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
  const easedProgress = easeOutCubic(effectiveProgress);

  const minClosedHeight = 36;
  const currentHeight = Math.round(
    minClosedHeight + easedProgress * (measuredHeight - minClosedHeight)
  );
  // Scale grows from 0.93 to 1.00 as it unrolls
  const currentScale = 0.93 + 0.07 * easedProgress;
  // Content translateY reveals gently
  const contentTranslateY = Math.round((1 - easedProgress) * 18);
  // Content opacity
  const contentOpacity = isFullyOpen
    ? 1
    : Math.max(0, (effectiveProgress - 0.10) / 0.90);

  const styles = VARIANT_CYLINDER_STYLES[woodVariant] || VARIANT_CYLINDER_STYLES.default;

  return (
    <div
      ref={containerRef}
      onFocusCapture={handleFocusCapture}
      className={`relative w-full ${maxWidth} mx-auto my-3 sm:my-5 ${
        isFolding ? "pointer-events-none" : "rotate-0"
      } ${className}`}
      style={{
        transform: isFolding
          ? undefined
          : `scale(${currentScale})`,
        transformOrigin: "top center",
        transition: isFolding
          ? undefined
          : isFullyOpen
          ? "transform 0.2s ease-out"
          : "transform 0.1s ease-out",
      }}
    >
      {/* 1. BRAIDED SILK HANGING CORD (Artisanal Hanging Loop) */}
      <div
        className={`flex justify-center -mb-2 sm:-mb-3 pointer-events-none select-none relative z-30 transition-all duration-300 ease-out ${
          isFolding ? "opacity-0 -translate-y-8" : "opacity-100 translate-y-0"
        }`}
        style={{
          transform: isFolding
            ? undefined
            : `translateY(${(1 - effectiveProgress) * -4}px)`,
        }}
      >
        <svg
          viewBox="0 0 160 28"
          className="w-24 sm:w-32 h-5 sm:h-6 drop-shadow-[0_2px_4px_rgba(60,30,10,0.25)]"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
        >
          <path
            d="M 18 26 C 50 10, 70 3, 80 3 C 90 3, 110 10, 142 26"
            stroke={styles.cordColor}
            strokeWidth="2"
            strokeDasharray="4 2"
          />
          <circle cx="80" cy="4" r="3.5" fill={styles.cordBeadOuter} stroke="#5A3A16" strokeWidth="1.2" />
          <circle cx="80" cy="4" r="1.5" fill={styles.cordBeadInner} />
          <circle cx="26" cy="22" r="2" fill={styles.cordKnots} />
          <circle cx="134" cy="22" r="2" fill={styles.cordKnots} />
        </svg>
      </div>

      {/* 2. TOP WOODEN SCROLL ROLLER */}
      <div
        className={`relative -mx-3 sm:-mx-5 md:-mx-7 z-30 flex items-center select-none pointer-events-none drop-shadow-[0_5px_12px_rgba(40,18,8,0.32)] ${
          isFolding
            ? "transition-all duration-500 ease-out -translate-y-36 rotate-[-18deg] opacity-0 scale-95 pointer-events-none"
            : "translate-y-0 rotate-0 opacity-100 scale-100"
        }`}
      >
        <ScrollFinialLeft woodVariant={woodVariant} />

        {/* Master Rolled Parchment Cylinder */}
        <div className={`grow h-5 sm:h-7 md:h-8 relative overflow-hidden rounded-[2px] border-y ${styles.borderTopBottom} shadow-[inset_0_1px_2px_rgba(255,255,255,0.4)]`}>
          {/* Base Cylindrical Gradient */}
          <div
            className="absolute inset-0"
            style={{
              background: styles.topGrad,
            }}
          />
          {/* Paper Wrap Crease Line */}
          <div className={`absolute top-[68%] inset-x-0 h-[1.5px] ${styles.creaseColor} shadow-[0_1px_1px_rgba(255,255,255,0.35)]`} />
          {/* Cylindrical Top Specular Light Sheen */}
          <div className="absolute top-[2px] inset-x-0 h-[2.5px] bg-white/45 blur-[0.5px]" />
          {/* Fine Paper Striations */}
          <div
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage:
                "repeating-linear-gradient(90deg, transparent, transparent 12px, rgba(90,40,10,0.2) 12px, rgba(90,40,10,0.2) 13px)",
            }}
          />
        </div>

        <ScrollFinialRight woodVariant={woodVariant} />
      </div>

      {/* ROLLED FOLIO SEAL BUTTON (Visible when scroll is rolled or opening) */}
      {effectiveProgress < 0.72 && !isFolding && (
        <div
          className="absolute inset-x-0 top-1/2 -translate-y-1/2 z-35 flex items-center justify-center pointer-events-auto select-none transition-opacity duration-300 px-4"
          style={{ opacity: Math.max(0, 1 - effectiveProgress * 1.5) }}
        >
          <button
            type="button"
            onClick={handleOpenFolio}
            className={`px-3.5 py-1.5 rounded-full bg-[#FAF4E6]/95 hover:bg-[#FFFDF7] border-2 ${styles.sealBorder} shadow-[0_4px_14px_rgba(40,18,8,0.28)] ${styles.sealText} text-xs font-serif font-semibold flex items-center gap-1.5 transition-all cursor-pointer hover:scale-105 active:scale-95`}
            title="Unfurl this scroll folio"
          >
            <Sparkles className={`w-3.5 h-3.5 ${styles.sealIcon}`} />
            <span>{sealLabel || "Scroll or Click to Unfurl Folio"}</span>
            <ChevronDown className={`w-3.5 h-3.5 ${styles.sealIcon} animate-bounce`} />
          </button>
        </div>
      )}

      {/* 3. THE UNROLLED PARCHMENT SHEET */}
      <div
        style={{
          ...(isFolding
            ? {
                animation: "sheet-crumple 0.65s cubic-bezier(0.25, 1, 0.5, 1) forwards",
              }
            : {}),
          height: isFullyOpen ? "auto" : `${currentHeight}px`,
          transition: isFolding
            ? undefined
            : isFullyOpen
            ? "none"
            : "height 0.12s cubic-bezier(0.25, 1, 0.5, 1)",
        }}
        className={`relative z-10 -my-1 sm:-my-1.5 mx-1.5 sm:mx-2.5 md:mx-3.5 rounded-sm bg-[#FAF4E6] shadow-[0_16px_40px_-8px_rgba(35,16,6,0.32),0_4px_14px_rgba(50,22,8,0.12)] border-x-2 ${styles.sheetBorder} ${
          isFullyOpen ? "overflow-visible" : "overflow-hidden"
        }`}
      >
        {/* Multi-Tone Watercolor Rice-Paper Wash */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: styles.sheetWash,
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
            <polygon points="0,0 260,240 110,490 0,500" fill="rgba(55,24,6,0.22)" />
            <polygon points="500,0 240,260 410,500 500,500" fill="rgba(65,30,8,0.25)" />
            <polygon points="120,0 250,250 380,0" fill="rgba(40,16,4,0.18)" />
            <polygon points="250,250 140,500 360,500" fill="rgba(40,16,4,0.2)" />
            <path
              d="M 15 25 L 245 255 L 75 485 M 485 15 L 255 245 L 425 485 M 35 250 L 465 245 M 245 15 L 255 485 M 115 65 L 385 435 M 385 65 L 115 435"
              stroke="#3A1705"
              strokeWidth="3.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.9"
            />
            <path
              d="M 45 125 L 250 250 L 135 375 M 455 125 L 250 250 L 365 375"
              stroke="#7A3D14"
              strokeWidth="2.2"
              strokeLinecap="round"
              opacity="0.85"
            />
            <path
              d="M 18 22 L 242 252 L 78 482 M 482 18 L 252 242 M 35 247 L 465 242 M 118 62 L 382 432"
              stroke="#FFFDF6"
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.95"
            />
          </svg>
        )}

        {/* Inner Content Area with Measurement Ref */}
        <div
          ref={contentRef}
          style={{
            opacity: isFolding ? 0.4 : contentOpacity,
            transform: isFolding
              ? undefined
              : isFullyOpen
              ? "none"
              : `translateY(${contentTranslateY}px)`,
            pointerEvents: isFullyOpen || effectiveProgress > 0.8 ? "auto" : "none",
            transition: isFolding
              ? undefined
              : isFullyOpen
              ? "none"
              : "opacity 0.12s ease-out, transform 0.12s ease-out",
          }}
          className={`relative z-10 ${contentPadding} ${
            isFolding ? "filter blur-[1.5px] scale-95" : ""
          }`}
        >
          {/* Actual Section Content */}
          <div className="relative z-10 text-[#3D2E24]">{children}</div>
        </div>
      </div>

      {/* 4. BOTTOM WOODEN SCROLL ROLLER (Follows parchment bottom down as it unrolls) */}
      <div
        className={`relative -mx-3 sm:-mx-5 md:-mx-7 z-30 flex items-center select-none pointer-events-none drop-shadow-[0_8px_18px_rgba(40,18,8,0.38)] ${
          isFolding
            ? "transition-all duration-500 ease-out translate-y-36 rotate-[18deg] opacity-0 scale-95 pointer-events-none"
            : "opacity-100 scale-100"
        }`}
        style={{
          transform: isFolding
            ? undefined
            : `rotate(${(1 - easedProgress) * 4}deg)`,
          transition: isFolding
            ? undefined
            : isFullyOpen
            ? "none"
            : "transform 0.12s ease-out",
        }}
      >
        <ScrollFinialLeft woodVariant={woodVariant} />

        {/* Master Rolled Parchment Cylinder */}
        <div className={`grow h-5 sm:h-7 md:h-8 relative overflow-hidden rounded-[2px] border-y ${styles.borderTopBottom} shadow-[inset_0_1px_2px_rgba(255,255,255,0.3)]`}>
          {/* Base Bottom Cylinder Rolled Paper Gradient */}
          <div
            className="absolute inset-0"
            style={{
              background: styles.bottomGrad,
            }}
          />
          {/* Paper Hem Wrap Crease */}
          <div className={`absolute top-[28%] inset-x-0 h-[1.5px] ${styles.bottomCreaseColor} shadow-[0_1px_1px_rgba(255,255,255,0.3)]`} />
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

        <ScrollFinialRight woodVariant={woodVariant} />
      </div>
    </div>
  );
}
