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
      className="min-h-screen w-full flex items-center justify-center px-4 sm:px-6 py-20 relative z-10"
    >
      <div className="max-w-4xl w-full ghibli-card p-6 sm:p-10 relative">
        <div className="washi-tape washi-tape-top-left" />
        <div className="washi-tape washi-tape-top-right" />

        {/* Header Tag */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wider text-[#7A9A7E] bg-[#7A9A7E]/15 border border-[#7A9A7E]/30 flex items-center gap-1.5">
            <Sprout className="w-3.5 h-3.5 text-[#7A9A7E]" />
            <span>Section 02 • Botanist Field Guide</span>
          </span>

          {/* Interactive Watering Can */}
          <button
            type="button"
            onClick={handleWaterCan}
            className="px-3.5 py-1.5 rounded-full bg-[#FAF6F0] hover:bg-[#F3ECE1] border border-[#7A9A7E]/30 text-xs font-semibold text-[#3D352E] flex items-center gap-2 shadow-xs transition-all active:scale-95 cursor-pointer"
            title="Click to nurture the plant specimens"
          >
            <Droplets className="w-3.5 h-3.5 text-[#7A9A7E]" />
            <span>{bloomed ? "Vibrant & Blooming!" : "Water Plants"}</span>
            {bloomed && <Sparkles className="w-3 h-3 text-[#E07A5F]" />}
          </button>
        </div>

        <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#3D352E] tracking-tight mb-2">
          Botanical Skills &amp; Field Guide
        </h2>
        <p className="text-xs sm:text-sm text-[#3D352E]/75 mb-8">
          Cultivated programming languages, database architectures, and UI craft cataloged like pressed herbarium specimens.
        </p>

        {/* 3 Field Guide Specimen Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Programming */}
          <div className="p-5 rounded-2xl bg-[#FAF6F0]/90 border border-[#7A9A7E]/25 shadow-xs relative">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-1.5 rounded-lg bg-[#7A9A7E]/10">
                <Code className="w-4 h-4 text-[#7A9A7E]" />
              </div>
              <h3 className="font-serif font-bold text-sm text-[#3D352E]">
                Herbarium Programming
              </h3>
            </div>
            <p className="text-[11px] text-[#3D352E]/65 mb-4 leading-relaxed">
              Foundational logic, object-oriented concepts, and algorithms.
            </p>
            <div className="flex flex-wrap gap-2">
              {programmingSkills.map((skill) => (
                <span
                  key={skill}
                  onClick={(e) => triggerLeafBurst(e.clientX, e.clientY, true)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium cursor-pointer transition-all border flex items-center gap-1.5 ${
                    bloomed
                      ? "bg-[#F4ACB7]/30 border-[#F4ACB7] text-[#3D352E] scale-105"
                      : "bg-[#F3ECE1] border-[#D8C7B0] text-[#3D352E] hover:border-[#7A9A7E]"
                  }`}
                >
                  {bloomed ? (
                    <Flower2 className="w-3 h-3 text-[#E07A5F]" />
                  ) : (
                    <Leaf className="w-3 h-3 text-[#7A9A7E]" />
                  )}
                  <span>{skill}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Card 2: Web & Databases */}
          <div className="p-5 rounded-2xl bg-[#FAF6F0]/90 border border-[#E07A5F]/25 shadow-xs relative">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-1.5 rounded-lg bg-[#E07A5F]/10">
                <Database className="w-4 h-4 text-[#E07A5F]" />
              </div>
              <h3 className="font-serif font-bold text-sm text-[#3D352E]">
                Web &amp; Databases
              </h3>
            </div>
            <p className="text-[11px] text-[#3D352E]/65 mb-4 leading-relaxed">
              Relational schemas, queries, and responsive front-end structures.
            </p>
            <div className="flex flex-wrap gap-2">
              {webSkills.map((skill) => (
                <span
                  key={skill}
                  onClick={(e) => triggerLeafBurst(e.clientX, e.clientY, true)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium cursor-pointer transition-all border flex items-center gap-1.5 ${
                    bloomed
                      ? "bg-[#F3C68F]/40 border-[#E07A5F] text-[#3D352E] scale-105"
                      : "bg-[#F3ECE1] border-[#D8C7B0] text-[#3D352E] hover:border-[#E07A5F]"
                  }`}
                >
                  {bloomed ? (
                    <Sparkles className="w-3 h-3 text-[#E07A5F]" />
                  ) : (
                    <Leaf className="w-3 h-3 text-[#7A9A7E]" />
                  )}
                  <span>{skill}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Card 3: Design & Training */}
          <div className="p-5 rounded-2xl bg-[#FAF6F0]/90 border border-[#F4ACB7]/40 shadow-xs relative">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-1.5 rounded-lg bg-[#F4ACB7]/20">
                <Palette className="w-4 h-4 text-[#E07A5F]" />
              </div>
              <h3 className="font-serif font-bold text-sm text-[#3D352E]">
                Design &amp; Training
              </h3>
            </div>
            <p className="text-[11px] text-[#3D352E]/65 mb-4 leading-relaxed">
              Prototyping, visual aesthetics, and structured web development training.
            </p>
            <div className="flex flex-wrap gap-2">
              {designSkills.map((skill) => (
                <span
                  key={skill}
                  onClick={(e) => triggerLeafBurst(e.clientX, e.clientY, true)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium cursor-pointer transition-all border flex items-center gap-1.5 ${
                    bloomed
                      ? "bg-[#7A9A7E]/30 border-[#7A9A7E] text-[#3D352E] scale-105"
                      : "bg-[#F3ECE1] border-[#D8C7B0] text-[#3D352E] hover:border-[#F4ACB7]"
                  }`}
                >
                  {bloomed ? (
                    <Flower2 className="w-3 h-3 text-[#7A9A7E]" />
                  ) : (
                    <Leaf className="w-3 h-3 text-[#7A9A7E]" />
                  )}
                  <span>{skill}</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Botanical Log Footer Note */}
        <div className="mt-8 pt-4 border-t border-[#7A9A7E]/20 flex flex-wrap items-center justify-between text-xs text-[#3D352E]/70 font-mono">
          <span>Field Observation: Broadway Infosys Certified Web Design</span>
          <span>Habitat: Padmakanya CSIT Lab</span>
        </div>
      </div>
    </section>
  );
}
