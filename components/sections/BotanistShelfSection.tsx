"use client";

import React, { useState } from "react";
import {
  Sprout,
  Droplets,
  Sparkles,
  Code,
  Database,
  Palette,
  Leaf,
  Flower2,
} from "lucide-react";
import { triggerLeafBurst } from "@/components/particles/LeafParticleBurst";
import { chimeEngine } from "@/components/audio/ChimeEngine";
import ParchmentScroll from "@/components/ui/ParchmentScroll";

export default function BotanistShelfSection() {
  const [bloomed, setBloomed] = useState<boolean>(false);

  const handleWaterCan = (e: React.MouseEvent) => {
    triggerLeafBurst(e.clientX, e.clientY, true);
    setBloomed(true);
    if (chimeEngine) {
      chimeEngine.playBreezeChord();
    }
    setTimeout(() => setBloomed(false), 3500);
  };

  const programmingSkills = ["JavaScript", "PHP", "C", "C++", "Java"];
  const webSkills = ["HTML5", "CSS3", "MySQL", "SQL Server"];
  const designSkills = ["Figma", "Canva", "Web Design (Broadway Infosys)"];

  return (
    <section
      id="skills"
      className="min-h-screen w-full flex items-center justify-center px-4 sm:px-6 pt-14 pb-6 relative z-10"
    >
      <ParchmentScroll maxWidth="max-w-[700px]" sealText="草">
        {/* Header Tag */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3 pr-10">
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wider text-[#6B8A68] bg-[#6B8A68]/15 border border-[#6B8A68]/35 flex items-center gap-1.5 shadow-2xs">
            <Sprout className="w-3 h-3 text-[#6B8A68]" />
            <span>Section 02 • Botanist Field Guide</span>
          </span>

          {/* Interactive Watering Can */}
          <button
            type="button"
            onClick={handleWaterCan}
            className="px-3 py-1 rounded-md bg-[#FFFDF7] hover:bg-[#F5ECD2] border border-[#C29B72]/70 text-[11px] font-serif font-semibold text-[#3D2E24] flex items-center gap-1.5 shadow-2xs transition-all active:scale-95 cursor-pointer"
            title="Click to nurture the plant specimens"
          >
            <Droplets className="w-3 h-3 text-[#6B8A68]" />
            <span>{bloomed ? "Vibrant & Blooming!" : "Water Plants"}</span>
            {bloomed && <Sparkles className="w-2.5 h-2.5 text-[#D0684D]" />}
          </button>
        </div>

        <h2 className="text-2xl sm:text-[28px] font-serif font-bold text-[#3D2E24] tracking-tight mb-1">
          Botanical Skills &amp; Field Guide
        </h2>
        <p className="text-xs sm:text-[13px] text-[#5C381E]/80 mb-5 font-serif">
          Cultivated programming languages, database architectures, and UI craft cataloged like pressed herbarium specimens.
        </p>

        {/* 3 Field Guide Specimen Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          {/* Card 1: Programming */}
          <div className="p-3.5 sm:p-4 rounded-lg bg-[#FFFDF7] border border-[#C29B72]/45 shadow-2xs relative">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1 rounded-md bg-[#6B8A68]/15 border border-[#6B8A68]/30">
                <Code className="w-3.5 h-3.5 text-[#6B8A68]" />
              </div>
              <h3 className="font-serif font-bold text-xs sm:text-[13px] text-[#3D2E24]">
                Programming
              </h3>
            </div>
            <p className="text-[10px] text-[#5C381E]/70 mb-3 leading-relaxed font-sans">
              Foundational logic, OOP, and data algorithms.
            </p>
            <div className="flex flex-wrap gap-1">
              {programmingSkills.map((skill) => (
                <span
                  key={skill}
                  onClick={(e) => triggerLeafBurst(e.clientX, e.clientY, true)}
                  className={`px-2 py-0.5 rounded-sm text-[11px] font-serif cursor-pointer transition-all border flex items-center gap-1 shadow-2xs ${
                    bloomed
                      ? "bg-[#D0684D]/15 border-[#D0684D] text-[#3D2E24] scale-105"
                      : "bg-[#FAF5E8] border-[#C29B72]/60 text-[#3D2E24] hover:border-[#6B8A68]"
                  }`}
                >
                  {bloomed ? (
                    <Flower2 className="w-2.5 h-2.5 text-[#D0684D]" />
                  ) : (
                    <Leaf className="w-2.5 h-2.5 text-[#6B8A68]" />
                  )}
                  <span>{skill}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Card 2: Web & Databases */}
          <div className="p-3.5 sm:p-4 rounded-lg bg-[#FFFDF7] border border-[#C29B72]/45 shadow-2xs relative">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1 rounded-md bg-[#D0684D]/15 border border-[#D0684D]/30">
                <Database className="w-3.5 h-3.5 text-[#D0684D]" />
              </div>
              <h3 className="font-serif font-bold text-xs sm:text-[13px] text-[#3D2E24]">
                Web &amp; Databases
              </h3>
            </div>
            <p className="text-[10px] text-[#5C381E]/70 mb-3 leading-relaxed font-sans">
              Relational schemas and responsive UI frontends.
            </p>
            <div className="flex flex-wrap gap-1">
              {webSkills.map((skill) => (
                <span
                  key={skill}
                  onClick={(e) => triggerLeafBurst(e.clientX, e.clientY, true)}
                  className={`px-2 py-0.5 rounded-sm text-[11px] font-serif cursor-pointer transition-all border flex items-center gap-1 shadow-2xs ${
                    bloomed
                      ? "bg-[#D0684D]/15 border-[#D0684D] text-[#3D2E24] scale-105"
                      : "bg-[#FAF5E8] border-[#C29B72]/60 text-[#3D2E24] hover:border-[#D0684D]"
                  }`}
                >
                  {bloomed ? (
                    <Sparkles className="w-2.5 h-2.5 text-[#D0684D]" />
                  ) : (
                    <Leaf className="w-2.5 h-2.5 text-[#6B8A68]" />
                  )}
                  <span>{skill}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Card 3: Design & Training */}
          <div className="p-3.5 sm:p-4 rounded-lg bg-[#FFFDF7] border border-[#C29B72]/45 shadow-2xs relative">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1 rounded-md bg-[#C29B72]/20 border border-[#C29B72]/40">
                <Palette className="w-3.5 h-3.5 text-[#8C5835]" />
              </div>
              <h3 className="font-serif font-bold text-xs sm:text-[13px] text-[#3D2E24]">
                Design &amp; Training
              </h3>
            </div>
            <p className="text-[10px] text-[#5C381E]/70 mb-3 leading-relaxed font-sans">
              Prototyping and structured web design training.
            </p>
            <div className="flex flex-wrap gap-1">
              {designSkills.map((skill) => (
                <span
                  key={skill}
                  onClick={(e) => triggerLeafBurst(e.clientX, e.clientY, true)}
                  className={`px-2 py-0.5 rounded-sm text-[11px] font-serif cursor-pointer transition-all border flex items-center gap-1 shadow-2xs ${
                    bloomed
                      ? "bg-[#6B8A68]/15 border-[#6B8A68] text-[#3D2E24] scale-105"
                      : "bg-[#FAF5E8] border-[#C29B72]/60 text-[#3D2E24] hover:border-[#8C5835]"
                  }`}
                >
                  {bloomed ? (
                    <Flower2 className="w-2.5 h-2.5 text-[#6B8A68]" />
                  ) : (
                    <Leaf className="w-2.5 h-2.5 text-[#6B8A68]" />
                  )}
                  <span>{skill}</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Botanical Log Footer Note */}
        <div className="mt-5 pt-3 border-t border-[#C29B72]/40 flex flex-wrap items-center justify-between text-[11px] text-[#5C381E]/70 font-serif italic">
          <span>Field Observation: Broadway Infosys Certified Web Design</span>
          <span>Habitat: Padmakanya CSIT Lab</span>
        </div>
      </ParchmentScroll>
    </section>
  );
}
