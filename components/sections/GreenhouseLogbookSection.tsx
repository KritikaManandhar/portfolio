"use client";

import React from "react";
import { Sprout, GraduationCap, Scroll, MapPin } from "lucide-react";
import { triggerLeafBurst } from "@/components/particles/LeafParticleBurst";
import { GithubIcon } from "@/components/ui/VectorIcons";

export default function GreenhouseLogbookSection() {
  const specimenLogs = [
    {
      genus: "Academic Genus",
      specimen: "B.Sc. Computer Science & Information Technology",
      institution: "Padmakanya Multiple Campus, Tribhuvan University",
      tenure: "2022 – 2026",
      location: "Mhepi, Kathmandu, Nepal",
      icon: <GraduationCap className="w-6 h-6 text-[#7A9A7E]" />,
      color: "border-[#7A9A7E]/40 bg-[#7A9A7E]/10",
    },
    {
      genus: "Practical Cultivation",
      specimen: "Professional Web Design Training",
      institution: "Broadway Infosys Nepal",
      tenure: "Core Certificate & Practicum",
      location: "Kathmandu, Nepal",
      icon: <Scroll className="w-6 h-6 text-[#E07A5F]" />,
      color: "border-[#E07A5F]/40 bg-[#E07A5F]/10",
    },
    {
      genus: "Open Source Habitat",
      specimen: "GitHub Developer Guild",
      institution: "github.com/KritikaManandhar",
      tenure: "Active Repositories & Practicum",
      location: "Version Control Ecosystem",
      icon: <GithubIcon className="w-6 h-6 text-[#7A9A7E]" />,
      color: "border-[#F3C68F]/60 bg-[#F3C68F]/20",
    },
  ];

  return (
    <section
      id="greenhouse"
      className="min-h-screen w-full flex items-center justify-center px-4 sm:px-6 py-20 relative z-10"
    >
      <div className="max-w-4xl w-full ghibli-card p-6 sm:p-10 relative">
        <div className="washi-tape washi-tape-top-left" />
        <div className="washi-tape washi-tape-top-right" />

        {/* Section Header */}
        <div className="flex items-center justify-between mb-4">
          <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wider text-[#7A9A7E] bg-[#7A9A7E]/15 border border-[#7A9A7E]/30 flex items-center gap-1.5">
            <Sprout className="w-3.5 h-3.5 text-[#7A9A7E]" />
            <span>Section 04 • The Glass Greenhouse Logbook</span>
          </span>
          <span className="text-xs text-[#3D352E]/60 font-mono">
            Education &amp; Guild
          </span>
        </div>

        <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#3D352E] tracking-tight mb-2">
          Conservatory Specimen Logbook
        </h2>
        <p className="text-xs sm:text-sm text-[#3D352E]/75 mb-8">
          Academic foundation, vocational coursework, and developer milestones cataloged like pressed foliage in a glass greenhouse.
        </p>

        {/* Specimen Logs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
          {specimenLogs.map((log) => (
            <div
              key={log.specimen}
              onClick={(e) => triggerLeafBurst(e.clientX, e.clientY, true)}
              className={`p-5 rounded-2xl border ${log.color} shadow-xs relative cursor-pointer hover:scale-[1.02] transition-transform`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 rounded-xl bg-white/70 shadow-2xs">
                  {log.icon}
                </div>
                <span className="text-[10px] font-mono text-[#3D352E]/60 uppercase">
                  {log.tenure}
                </span>
              </div>
              <p className="text-[10px] font-mono uppercase tracking-wider text-[#7A9A7E] mb-1">
                {log.genus}
              </p>
              <h3 className="font-serif font-bold text-sm text-[#3D352E] leading-snug mb-2">
                {log.specimen}
              </h3>
              <p className="text-xs text-[#3D352E]/80 mb-2">
                {log.institution}
              </p>
              <p className="text-[11px] text-[#3D352E]/60 flex items-center gap-1.5">
                <MapPin className="w-3 h-3 text-[#7A9A7E]" />
                <span>{log.location}</span>
              </p>
            </div>
          ))}
        </div>

        {/* GitHub Guild Banner */}
        <div className="p-6 rounded-2xl bg-[#FAF6F0] border border-[#7A9A7E]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <GithubIcon className="w-5 h-5 text-[#3D352E]" />
              <h4 className="font-serif font-bold text-base text-[#3D352E]">
                KritikaManandhar on GitHub
              </h4>
            </div>
            <p className="text-xs text-[#3D352E]/75">
              Explore active repositories, source code implementations, and project branches.
            </p>
          </div>

          <a
            href="https://github.com/KritikaManandhar"
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => triggerLeafBurst(e.clientX, e.clientY, true)}
            className="px-5 py-2.5 rounded-xl bg-[#7A9A7E] hover:bg-[#68886C] text-white text-xs sm:text-sm font-semibold transition-all shadow-sm flex items-center gap-2 whitespace-nowrap self-stretch sm:self-auto justify-center"
          >
            <GithubIcon className="w-4 h-4" />
            <span>Visit GitHub Profile &rarr;</span>
          </a>
        </div>
      </div>
    </section>
  );
}
