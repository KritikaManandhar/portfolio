"use client";

import React from "react";
import { Sparkles, Home, BookOpen, Compass, Mail, Hammer } from "lucide-react";

export type GardenDestinationId = "greenhouse" | "library" | "workshop" | "mailbox" | "pond";

interface GardenSceneSvgProps {
  activeDestination: GardenDestinationId | null;
  onSelectDestination: (id: GardenDestinationId) => void;
  visitedDestinations: string[];
}

export default function GardenSceneSvg({
  activeDestination,
  onSelectDestination,
  visitedDestinations,
}: GardenSceneSvgProps) {
  return (
    <div className="relative w-full aspect-[16/10] max-h-[640px] min-h-[380px] sm:min-h-[460px] rounded-2xl overflow-hidden select-none border-2 border-[#B99A60]/50 shadow-[0_20px_50px_rgba(40,20,10,0.18)] bg-gradient-to-b from-[#E6F0E4] via-[#FAF4E6] to-[#E9DCBF]">
      {/* 1. Atmospheric Ambient Sky & Distant Mountain Ridges */}
      <svg
        viewBox="0 0 1000 625"
        className="w-full h-full object-cover pointer-events-none"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Sky Gradient */}
          <linearGradient id="skyGrad" x1="500" y1="0" x2="500" y2="300" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#DFEFE6" />
            <stop offset="60%" stopColor="#F5EFE0" />
            <stop offset="100%" stopColor="#FAF4E6" />
          </linearGradient>

          {/* Distant Misty Forest Hills */}
          <linearGradient id="distantHillGrad" x1="0" y1="120" x2="1000" y2="280" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#B4CDAE" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#8EA886" stopOpacity="0.35" />
          </linearGradient>

          {/* Lush Garden Meadow Hill */}
          <linearGradient id="meadowGrad" x1="500" y1="200" x2="500" y2="625" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#8EA886" />
            <stop offset="30%" stopColor="#7A9872" />
            <stop offset="70%" stopColor="#67855E" />
            <stop offset="100%" stopColor="#4E6B47" />
          </linearGradient>

          {/* Sunlit Ground Clearing */}
          <radialGradient id="sunClearing" cx="500" cy="380" r="450" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#F9F1DC" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#E2D6B8" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#67855E" stopOpacity="0" />
          </radialGradient>

          {/* Cobblestone Path Pattern */}
          <linearGradient id="pathGrad" x1="0" y1="0" x2="1000" y2="600" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#D9C9A8" />
            <stop offset="50%" stopColor="#CBB892" />
            <stop offset="100%" stopColor="#B8A47E" />
          </linearGradient>

          {/* Pond Shimmer Water Gradient */}
          <linearGradient id="pondWaterGrad" x1="720" y1="360" x2="940" y2="520" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#7AA4A8" />
            <stop offset="40%" stopColor="#58858A" />
            <stop offset="100%" stopColor="#3C666B" />
          </linearGradient>
        </defs>

        {/* Sky Fill */}
        <rect width="1000" height="625" fill="url(#skyGrad)" />

        {/* Distant Mountain Silhouettes & Clouds */}
        <path d="M 0 160 Q 240 110 460 150 Q 720 90 1000 140 L 1000 280 L 0 280 Z" fill="url(#distantHillGrad)" />
        <path d="M 120 180 Q 320 130 600 170 Q 820 140 1000 175 L 1000 320 L 0 320 Z" fill="#9FBCA0" opacity="0.4" />

        {/* Main Rolling Garden Meadow Base */}
        <path
          d="M 0 240 Q 250 200 500 220 Q 750 190 1000 230 L 1000 625 L 0 625 Z"
          fill="url(#meadowGrad)"
        />
        <rect width="1000" height="625" fill="url(#sunClearing)" />

        {/* Winding Cobblestone Paths connecting all 5 destinations */}
        {/* Main Trunk Path from bottom center leading to destinations */}
        <path
          d="M 500 625 
             C 490 540 470 480 430 430
             C 380 370 290 360 210 320"
          stroke="url(#pathGrad)"
          strokeWidth="38"
          strokeLinecap="round"
          opacity="0.85"
        />
        {/* Path to Greenhouse (top left-center) */}
        <path
          d="M 430 430
             C 410 380 350 310 330 250"
          stroke="url(#pathGrad)"
          strokeWidth="32"
          strokeLinecap="round"
          opacity="0.85"
        />
        {/* Path to Library (top right-center) */}
        <path
          d="M 430 430
             C 480 390 580 340 680 270"
          stroke="url(#pathGrad)"
          strokeWidth="32"
          strokeLinecap="round"
          opacity="0.85"
        />
        {/* Path to Hidden Pond (mid right) */}
        <path
          d="M 490 540
             C 560 520 660 480 750 460"
          stroke="url(#pathGrad)"
          strokeWidth="28"
          strokeLinecap="round"
          opacity="0.85"
        />

        {/* Stepping stone texture dashes on the paths */}
        <path
          d="M 495 590 L 505 590 M 485 550 L 495 550 M 460 500 L 470 500 M 420 440 L 430 440 M 360 350 L 370 350 M 325 270 L 335 270 M 550 380 L 560 380 M 640 310 L 650 310 M 620 510 L 630 510 M 710 470 L 720 470"
          stroke="#9E8D68"
          strokeWidth="4"
          strokeLinecap="round"
          opacity="0.75"
        />

        {/* THE SECLUDED POND (Bottom Right 720-960) */}
        <ellipse cx="820" cy="450" rx="125" ry="65" fill="url(#pondWaterGrad)" />
        <ellipse cx="820" cy="450" rx="125" ry="65" stroke="#8A6E48" strokeWidth="6" opacity="0.75" />

        {/* Pond Water Ripple Waves */}
        <path
          d="M 760 440 C 780 435 810 435 830 440"
          stroke="#A8D4D8"
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity="0.75"
        />
        <path
          d="M 790 465 C 820 460 850 460 870 465"
          stroke="#A8D4D8"
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity="0.75"
        />

        {/* Water Lily Pads */}
        <ellipse cx="760" cy="460" rx="14" ry="7" fill="#4E7852" />
        <ellipse cx="850" cy="435" rx="16" ry="8" fill="#4E7852" />
        <circle cx="854" cy="433" r="3" fill="#FFF0F5" />
        <ellipse cx="800" cy="480" rx="12" ry="6" fill="#3D6341" />

        {/* Lush Surrounding Trees & Decorative Flora */}
        {/* Left Edge Pine / Cedar Trees */}
        <path d="M 40 320 C 10 260 50 180 80 200 C 120 180 150 240 120 320 Z" fill="#3B5A39" opacity="0.85" />
        <path d="M 0 380 C -20 320 20 250 40 270 C 80 250 90 320 60 390 Z" fill="#2E4A2D" opacity="0.9" />

        {/* Right Edge Willow & Sakura Foliage */}
        <path d="M 920 310 C 880 240 930 180 970 190 C 1010 180 1020 250 990 330 Z" fill="#4A6E48" opacity="0.8" />
        <path d="M 940 350 C 910 320 950 280 970 290 C 1000 280 1010 330 980 370 Z" fill="#E8B0BA" opacity="0.65" />

        {/* Decorative Wildflowers on the lawn */}
        {/* Clover & daisy specks */}
        <circle cx="280" cy="450" r="3" fill="#FFF9EF" />
        <circle cx="340" cy="480" r="3.5" fill="#E4BA68" />
        <circle cx="390" cy="530" r="3" fill="#C94736" />
        <circle cx="620" cy="560" r="3.5" fill="#FFF9EF" />
        <circle cx="460" cy="380" r="3" fill="#C94736" />
        <circle cx="560" cy="440" r="3" fill="#FFF9EF" />
        <circle cx="680" cy="360" r="3.5" fill="#E4BA68" />
      </svg>

      {/* ============================================================== */}
      {/* 2. THE 5 INTERACTIVE GARDEN DESTINATION HOTSPOTS & MINIATURES */}
      {/* ============================================================== */}

      {/* -------------------------------------------------------------- */}
      {/* DESTINATION 1: THE GREENHOUSE (Top Left-Center: ~27% x, 24% y) */}
      {/* -------------------------------------------------------------- */}
      <button
        type="button"
        onClick={() => onSelectDestination("greenhouse")}
        className="group absolute top-[16%] left-[23%] sm:left-[25%] -translate-x-1/2 cursor-pointer transition-all duration-300 focus:outline-none"
        title="Explore The Greenhouse • Skills"
        aria-label="The Greenhouse, Skills"
      >
        <div className="relative flex flex-col items-center">
          {/* Active / Visited Indicator Ring */}
          <div
            className={`absolute -inset-3 rounded-2xl transition-all duration-300 ${
              activeDestination === "greenhouse"
                ? "bg-[#627D5B]/25 ring-2 ring-[#627D5B] scale-105"
                : "group-hover:bg-[#627D5B]/15 group-hover:scale-102"
            }`}
          />

          {/* The Victorian Glass Conservatory Building Illustration */}
          <div className="relative w-28 sm:w-36 md:w-40 drop-shadow-[0_12px_24px_rgba(40,20,10,0.3)] transition-transform duration-300 group-hover:-translate-y-1">
            <svg viewBox="0 0 160 130" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Stone Foundation Base */}
              <rect x="20" y="88" width="120" height="32" rx="3" fill="#8C7355" stroke="#52402B" strokeWidth="2" />
              <line x1="20" y1="98" x2="140" y2="98" stroke="#52402B" strokeWidth="1.5" />
              <line x1="20" y1="108" x2="140" y2="108" stroke="#52402B" strokeWidth="1.5" />

              {/* Interior Warm Plant Glow */}
              <rect x="26" y="45" width="108" height="43" fill="#D4EAD1" fillOpacity="0.75" />
              <ellipse cx="80" cy="50" rx="35" ry="25" fill="#FFEAA7" fillOpacity="0.45" />

              {/* Arched Victorian Glass Windows & Iron Framework */}
              <rect x="25" y="42" width="110" height="46" rx="2" fill="none" stroke="#364935" strokeWidth="3" />
              <line x1="52" y1="42" x2="52" y2="88" stroke="#364935" strokeWidth="2" />
              <line x1="80" y1="42" x2="80" y2="88" stroke="#364935" strokeWidth="2.5" />
              <line x1="108" y1="42" x2="108" y2="88" stroke="#364935" strokeWidth="2" />

              {/* Arched Glass Roof Dome */}
              <path
                d="M 22 44 C 22 15 50 8 80 8 C 110 8 138 15 138 44 Z"
                fill="#BCE0B8"
                fillOpacity="0.65"
                stroke="#364935"
                strokeWidth="3"
              />
              <path d="M 52 42 C 52 24 64 12 80 10" stroke="#364935" strokeWidth="2" fill="none" />
              <path d="M 108 42 C 108 24 96 12 80 10" stroke="#364935" strokeWidth="2" fill="none" />
              <line x1="80" y1="8" x2="80" y2="42" stroke="#364935" strokeWidth="2.5" />

              {/* Top Weather Vane / Sprout Finial */}
              <line x1="80" y1="8" x2="80" y2="1" stroke="#B99A60" strokeWidth="2" />
              <circle cx="80" cy="1" r="2.5" fill="#E4BA68" />

              {/* Potted Botanical Silhouettes inside */}
              <circle cx="40" cy="72" r="7" fill="#4A7545" />
              <circle cx="65" cy="68" r="9" fill="#385F34" />
              <circle cx="95" cy="70" r="8" fill="#4E824A" />
              <circle cx="120" cy="74" r="6" fill="#629A5D" />

              {/* Wooden Entry Doorway */}
              <rect x="70" y="65" width="20" height="23" rx="2" fill="#755234" stroke="#422C18" strokeWidth="1.5" />
              <circle cx="74" cy="77" r="1.5" fill="#E4BA68" />
            </svg>
          </div>

          {/* Destination Callout Badge */}
          <div className="mt-1 px-2.5 py-0.5 rounded-full bg-[#FAF5E8]/95 border border-[#627D5B]/70 shadow-xs flex items-center gap-1.5 transition-transform group-hover:scale-105">
            <span className="w-2 h-2 rounded-full bg-[#627D5B] animate-pulse" />
            <span className="font-serif font-bold text-[11px] text-[#344C39]">The Greenhouse</span>
            <span className="text-[9px] font-mono text-[#627D5B] bg-[#627D5B]/15 px-1.5 py-0.2 rounded-sm hidden sm:inline">
              Skills
            </span>
            {visitedDestinations.includes("greenhouse") && (
              <span className="text-[10px] text-[#B99A60]">✦</span>
            )}
          </div>
        </div>
      </button>

      {/* -------------------------------------------------------------- */}
      {/* DESTINATION 2: THE LITTLE LIBRARY (Top Right: ~72% x, 22% y) */}
      {/* -------------------------------------------------------------- */}
      <button
        type="button"
        onClick={() => onSelectDestination("library")}
        className="group absolute top-[14%] right-[10%] sm:right-[14%] translate-x-1/2 cursor-pointer transition-all duration-300 focus:outline-none"
        title="Explore The Little Library • Learning Journey"
        aria-label="The Little Library, Learning Journey"
      >
        <div className="relative flex flex-col items-center">
          <div
            className={`absolute -inset-3 rounded-2xl transition-all duration-300 ${
              activeDestination === "library"
                ? "bg-[#8C5835]/25 ring-2 ring-[#8C5835] scale-105"
                : "group-hover:bg-[#8C5835]/15 group-hover:scale-102"
            }`}
          />

          {/* Cottage Library Illustration */}
          <div className="relative w-28 sm:w-34 md:w-38 drop-shadow-[0_12px_24px_rgba(40,20,10,0.3)] transition-transform duration-300 group-hover:-translate-y-1">
            <svg viewBox="0 0 150 130" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Stone Cottage Foundation & Wall */}
              <rect x="25" y="55" width="100" height="60" rx="3" fill="#E8D5B5" stroke="#5C4530" strokeWidth="2.5" />
              
              {/* Half-Timber Wood Tudor Framing */}
              <line x1="25" y1="85" x2="125" y2="85" stroke="#5C4530" strokeWidth="2.5" />
              <line x1="55" y1="55" x2="55" y2="115" stroke="#5C4530" strokeWidth="2" />
              <line x1="95" y1="55" x2="95" y2="115" stroke="#5C4530" strokeWidth="2" />

              {/* Stone Chimney with Rising Smoke */}
              <rect x="105" y="15" width="16" height="40" fill="#78614E" stroke="#423428" strokeWidth="2" />
              {/* Soft Smoke Curls */}
              <path
                d="M 113 14 C 111 8 116 4 113 0"
                stroke="#FAF4E6"
                strokeWidth="2.5"
                strokeLinecap="round"
                opacity="0.75"
              />

              {/* Steep Gabled Shingle Roof */}
              <polygon points="15,55 75,18 135,55" fill="#8A482A" stroke="#522512" strokeWidth="3" />
              <line x1="75" y1="18" x2="75" y2="55" stroke="#522512" strokeWidth="2" />
              <path d="M 25 45 Q 75 25 125 45" stroke="#AB603E" strokeWidth="2" fill="none" />

              {/* Warm Glowing Leaded Windows with Bookshelves inside */}
              <rect x="33" y="62" width="16" height="18" rx="2" fill="#FFEAA7" stroke="#5C4530" strokeWidth="2" />
              <line x1="41" y1="62" x2="41" y2="80" stroke="#5C4530" strokeWidth="1" />
              <line x1="33" y1="71" x2="49" y2="71" stroke="#5C4530" strokeWidth="1" />

              <rect x="101" y="62" width="16" height="18" rx="2" fill="#FFEAA7" stroke="#5C4530" strokeWidth="2" />
              <line x1="109" y1="62" x2="109" y2="80" stroke="#5C4530" strokeWidth="1" />
              <line x1="101" y1="71" x2="117" y2="71" stroke="#5C4530" strokeWidth="1" />

              {/* Wooden Arched Front Door */}
              <path d="M 64 115 L 64 88 C 64 80 86 80 86 88 L 86 115 Z" fill="#6B3E1F" stroke="#3B200E" strokeWidth="2" />
              <circle cx="68" cy="100" r="1.5" fill="#E4BA68" />

              {/* Outdoor Stack of Books & Lantern near step */}
              <rect x="94" y="105" width="14" height="4" fill="#C94736" rx="1" />
              <rect x="93" y="101" width="15" height="4" fill="#4B82AF" rx="1" />
              <rect x="95" y="97" width="12" height="4" fill="#B99A60" rx="1" />
            </svg>
          </div>

          <div className="mt-1 px-2.5 py-0.5 rounded-full bg-[#FAF5E8]/95 border border-[#8C5835]/70 shadow-xs flex items-center gap-1.5 transition-transform group-hover:scale-105">
            <BookOpen className="w-3 h-3 text-[#8C5835]" />
            <span className="font-serif font-bold text-[11px] text-[#3D2E24]">The Library</span>
            <span className="text-[9px] font-mono text-[#8C5835] bg-[#8C5835]/15 px-1.5 py-0.2 rounded-sm hidden sm:inline">
              Journey
            </span>
            {visitedDestinations.includes("library") && (
              <span className="text-[10px] text-[#B99A60]">✦</span>
            )}
          </div>
        </div>
      </button>

      {/* -------------------------------------------------------------- */}
      {/* DESTINATION 3: THE WORKSHOP (Mid-Left: ~16% x, 48% y)        */}
      {/* -------------------------------------------------------------- */}
      <button
        type="button"
        onClick={() => onSelectDestination("workshop")}
        className="group absolute top-[44%] left-[16%] sm:left-[18%] -translate-x-1/2 cursor-pointer transition-all duration-300 focus:outline-none"
        title="Explore The Workshop • Projects"
        aria-label="The Workshop, Projects"
      >
        <div className="relative flex flex-col items-center">
          <div
            className={`absolute -inset-3 rounded-2xl transition-all duration-300 ${
              activeDestination === "workshop"
                ? "bg-[#D0684D]/25 ring-2 ring-[#D0684D] scale-105"
                : "group-hover:bg-[#D0684D]/15 group-hover:scale-102"
            }`}
          />

          {/* Artisan Inventor's Workshop Illustration */}
          <div className="relative w-28 sm:w-34 md:w-38 drop-shadow-[0_12px_24px_rgba(40,20,10,0.3)] transition-transform duration-300 group-hover:-translate-y-1">
            <svg viewBox="0 0 150 130" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Stone Carpenter Base */}
              <rect x="20" y="58" width="105" height="58" rx="3" fill="#C4B094" stroke="#4A3B2C" strokeWidth="2.5" />

              {/* Wooden Planks */}
              <line x1="20" y1="78" x2="125" y2="78" stroke="#4A3B2C" strokeWidth="1.5" />
              <line x1="20" y1="96" x2="125" y2="96" stroke="#4A3B2C" strokeWidth="1.5" />

              {/* Workshop Awning / Gambrel Roof */}
              <polygon points="12,58 72,22 132,58" fill="#5A6D55" stroke="#32402F" strokeWidth="3" />
              <line x1="72" y1="22" x2="72" y2="58" stroke="#32402F" strokeWidth="2" />

              {/* Brass Gear Cog on Wall */}
              <circle cx="42" cy="42" r="10" fill="#B99A60" stroke="#6E5629" strokeWidth="2" />
              <circle cx="42" cy="42" r="4" fill="#5A6D55" />
              <line x1="42" y1="30" x2="42" y2="54" stroke="#6E5629" strokeWidth="2" />
              <line x1="30" y1="42" x2="54" y2="42" stroke="#6E5629" strokeWidth="2" />

              {/* Open Carpenter Workbench with Blueprints */}
              <rect x="68" y="72" width="46" height="28" rx="2" fill="#8F623F" stroke="#452D19" strokeWidth="2" />
              {/* Rolled Blueprint */}
              <rect x="74" y="76" width="30" height="12" rx="1" fill="#4B82AF" stroke="#2D587B" strokeWidth="1" />
              <line x1="78" y1="80" x2="100" y2="80" stroke="#FAF4E6" strokeWidth="1" />
              <line x1="78" y1="84" x2="94" y2="84" stroke="#FAF4E6" strokeWidth="1" />

              {/* Hanging Workshop Lantern */}
              <line x1="112" y1="58" x2="112" y2="67" stroke="#B99A60" strokeWidth="1.5" />
              <rect x="108" y="67" width="8" height="10" rx="1" fill="#FEEAA7" stroke="#6E5629" strokeWidth="1.5" />
            </svg>
          </div>

          <div className="mt-1 px-2.5 py-0.5 rounded-full bg-[#FAF5E8]/95 border border-[#D0684D]/70 shadow-xs flex items-center gap-1.5 transition-transform group-hover:scale-105">
            <Hammer className="w-3 h-3 text-[#D0684D]" />
            <span className="font-serif font-bold text-[11px] text-[#3D2E24]">The Workshop</span>
            <span className="text-[9px] font-mono text-[#D0684D] bg-[#D0684D]/15 px-1.5 py-0.2 rounded-sm hidden sm:inline">
              Projects
            </span>
            {visitedDestinations.includes("workshop") && (
              <span className="text-[10px] text-[#B99A60]">✦</span>
            )}
          </div>
        </div>
      </button>

      {/* -------------------------------------------------------------- */}
      {/* DESTINATION 4: THE HIDDEN POND (Mid-Right: ~82% x, 65% y)     */}
      {/* -------------------------------------------------------------- */}
      <button
        type="button"
        onClick={() => onSelectDestination("pond")}
        className="group absolute top-[58%] right-[12%] sm:right-[15%] translate-x-1/2 cursor-pointer transition-all duration-300 focus:outline-none"
        title="Explore The Hidden Pond • Secrets & Badges"
        aria-label="The Hidden Pond, Secrets and Badges"
      >
        <div className="relative flex flex-col items-center">
          <div
            className={`absolute -inset-3 rounded-2xl transition-all duration-300 ${
              activeDestination === "pond"
                ? "bg-[#3C666B]/25 ring-2 ring-[#3C666B] scale-105"
                : "group-hover:bg-[#3C666B]/15 group-hover:scale-102"
            }`}
          />

          {/* Pond Shore Creature & Glowing Mushrooms Illustration */}
          <div className="relative w-24 sm:w-28 md:w-32 drop-shadow-[0_12px_20px_rgba(40,20,10,0.25)] transition-transform duration-300 group-hover:-translate-y-1">
            <svg viewBox="0 0 120 90" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Stepping River Rock */}
              <ellipse cx="60" cy="55" rx="35" ry="18" fill="#9E8F7A" stroke="#574C3D" strokeWidth="2" />
              <ellipse cx="58" cy="52" rx="28" ry="12" fill="#BDB09D" opacity="0.6" />

              {/* Sleepy Calico Garden Sprite / Familiar */}
              <g transform="translate(48, 38)">
                {/* Curled Body */}
                <ellipse cx="14" cy="12" rx="14" ry="10" fill="#E89B5F" stroke="#7A4518" strokeWidth="1.5" />
                <ellipse cx="10" cy="10" rx="8" ry="6" fill="#FAF5E8" />
                <circle cx="20" cy="10" r="4" fill="#3D2E24" />
                {/* Ears */}
                <polygon points="4,4 1,0 8,1" fill="#D0684D" />
                <polygon points="20,4 23,0 16,1" fill="#3D2E24" />
                {/* Sleepy Eyes */}
                <path d="M 12 10 Q 14 12 16 10" stroke="#3D2E24" strokeWidth="1.2" strokeLinecap="round" />
                {/* Tail curled */}
                <path d="M 2 14 C -2 16 0 20 4 19" stroke="#7A4518" strokeWidth="2" strokeLinecap="round" />
              </g>

              {/* Bioluminescent Emerald Mushrooms */}
              <g transform="translate(14, 30)">
                <path d="M 10 16 L 10 24 M 16 18 L 16 26" stroke="#4E824A" strokeWidth="2" />
                <ellipse cx="10" cy="15" rx="6" ry="4" fill="#5EEAD4" stroke="#134E4A" strokeWidth="1.5" />
                <ellipse cx="16" cy="17" rx="5" ry="3.5" fill="#34D399" stroke="#065F46" strokeWidth="1.5" />
                <circle cx="10" cy="14" r="1" fill="#FFF" />
                <circle cx="16" cy="16" r="0.8" fill="#FFF" />
              </g>

              {/* Water Lily Blossom */}
              <circle cx="95" cy="58" r="4" fill="#FFF0F5" stroke="#C94736" strokeWidth="1" />
              <circle cx="95" cy="58" r="1.5" fill="#E4BA68" />
            </svg>
          </div>

          <div className="mt-1 px-2.5 py-0.5 rounded-full bg-[#FAF5E8]/95 border border-[#3C666B]/70 shadow-xs flex items-center gap-1.5 transition-transform group-hover:scale-105">
            <Sparkles className="w-3 h-3 text-[#3C666B]" />
            <span className="font-serif font-bold text-[11px] text-[#3D2E24]">The Pond</span>
            <span className="text-[9px] font-mono text-[#3C666B] bg-[#3C666B]/15 px-1.5 py-0.2 rounded-sm hidden sm:inline">
              Secrets
            </span>
            {visitedDestinations.includes("pond") && (
              <span className="text-[10px] text-[#B99A60]">✦</span>
            )}
          </div>
        </div>
      </button>

      {/* -------------------------------------------------------------- */}
      {/* DESTINATION 5: THE MAILBOX (Bottom Center: ~50% x, 75% y)     */}
      {/* -------------------------------------------------------------- */}
      <button
        type="button"
        onClick={() => onSelectDestination("mailbox")}
        className="group absolute top-[68%] sm:top-[70%] left-1/2 -translate-x-1/2 cursor-pointer transition-all duration-300 focus:outline-none"
        title="Check The Garden Mailbox • Contact"
        aria-label="The Mailbox, Contact"
      >
        <div className="relative flex flex-col items-center">
          <div
            className={`absolute -inset-3 rounded-2xl transition-all duration-300 ${
              activeDestination === "mailbox"
                ? "bg-[#C94736]/25 ring-2 ring-[#C94736] scale-105"
                : "group-hover:bg-[#C94736]/15 group-hover:scale-102"
            }`}
          />

          {/* Handcrafted Wooden Postbox Illustration */}
          <div className="relative w-22 sm:w-26 md:w-28 drop-shadow-[0_12px_20px_rgba(40,20,10,0.25)] transition-transform duration-300 group-hover:-translate-y-1">
            <svg viewBox="0 0 100 110" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Wooden Cedar Post */}
              <rect x="45" y="45" width="10" height="60" fill="#755234" stroke="#452C16" strokeWidth="2" rx="1" />
              <line x1="50" y1="50" x2="50" y2="100" stroke="#452C16" strokeWidth="1" />

              {/* Wooden Mailbox Body */}
              <rect x="25" y="15" width="50" height="34" rx="4" fill="#C94736" stroke="#691F16" strokeWidth="2.5" />
              <path d="M 25 15 C 25 6 75 6 75 15 Z" fill="#E05B48" stroke="#691F16" strokeWidth="2.5" />

              {/* Mailbox Door & Slit */}
              <rect x="32" y="24" width="36" height="18" rx="2" fill="#FAF4E6" stroke="#691F16" strokeWidth="1.5" />
              <line x1="36" y1="30" x2="64" y2="30" stroke="#691F16" strokeWidth="2" strokeLinecap="round" />

              {/* Brass Raised Flag */}
              <line x1="75" y1="28" x2="88" y2="28" stroke="#B99A60" strokeWidth="2" />
              <polygon points="88,28 88,18 78,23" fill="#E4BA68" stroke="#7A5E2E" strokeWidth="1" />

              {/* Wild Daisies around post base */}
              <circle cx="36" cy="100" r="3" fill="#FFF9EF" />
              <circle cx="36" cy="100" r="1" fill="#E4BA68" />
              <circle cx="62" cy="102" r="3.5" fill="#FFF9EF" />
              <circle cx="62" cy="102" r="1.2" fill="#E4BA68" />
            </svg>
          </div>

          <div className="mt-0.5 px-2.5 py-0.5 rounded-full bg-[#FAF5E8]/95 border border-[#C94736]/70 shadow-xs flex items-center gap-1.5 transition-transform group-hover:scale-105">
            <Mail className="w-3 h-3 text-[#C94736]" />
            <span className="font-serif font-bold text-[11px] text-[#3D2E24]">The Mailbox</span>
            <span className="text-[9px] font-mono text-[#C94736] bg-[#C94736]/15 px-1.5 py-0.2 rounded-sm hidden sm:inline">
              Contact
            </span>
            {visitedDestinations.includes("mailbox") && (
              <span className="text-[10px] text-[#B99A60]">✦</span>
            )}
          </div>
        </div>
      </button>

      {/* Floating Gentle Instruction Pill (Top Center) */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 pointer-events-none select-none z-10 hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF5E8]/90 backdrop-blur-xs border border-[#B99A60]/40 shadow-xs text-[11px] font-serif text-[#49372C]/85">
        <Sparkles className="w-3 h-3 text-[#B99A60]" />
        <span>Click any building or landmark to wander inside the garden</span>
      </div>
    </div>
  );
}
