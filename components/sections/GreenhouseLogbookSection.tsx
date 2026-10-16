"use client";

import React from "react";
import { Sprout, GraduationCap, Scroll, MapPin } from "lucide-react";
import { triggerLeafBurst } from "@/components/particles/LeafParticleBurst";
import { GithubIcon } from "@/components/ui/VectorIcons";
import ParchmentScroll from "@/components/ui/ParchmentScroll";

export default function GreenhouseLogbookSection() {
  const specimenLogs = [
    {
      genus: "Academic Genus",
      specimen: "B.Sc. Computer Science & Information Technology",
      institution: "Padmakanya Multiple Campus, Tribhuvan University",
      tenure: "2022 – 2026",
      location: "Mhepi, Kathmandu, Nepal",
      icon: <GraduationCap className="w-5 h-5 text-[#6B8A68]" />,
      color: "border-[#6B8A68]/40 bg-[#FFFDF7]",
    },
    {
      genus: "Practical Cultivation",
      specimen: "Professional Web Design Training",
      institution: "Broadway Infosys Nepal",
      tenure: "Core Certificate & Practicum",
      location: "Kathmandu, Nepal",
      icon: <Scroll className="w-5 h-5 text-[#D0684D]" />,
      color: "border-[#D0684D]/40 bg-[#FFFDF7]",
    },
    {
      genus: "Open Source Habitat",
      specimen: "GitHub Developer Guild",
      institution: "github.com/KritikaManandhar",
      tenure: "Active Repositories & Practicum",
      location: "Version Control Ecosystem",
      icon: <GithubIcon className="w-5 h-5 text-[#8C5835]" />,
      color: "border-[#C29B72]/50 bg-[#FFFDF7]",
    },
  ];

  return (
    <section
      id="greenhouse"
      className="min-h-screen w-full flex items-center justify-center px-4 sm:px-6 py-20 relative z-10"
    >
      <ParchmentScroll maxWidth="max-w-4xl" sealText="学">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-4 pr-12">
          <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wider text-[#6B8A68] bg-[#6B8A68]/15 border border-[#6B8A68]/35 flex items-center gap-1.5 shadow-2xs">
            <Sprout className="w-3.5 h-3.5 text-[#6B8A68]" />
            <span>Section 04 • The Glass Greenhouse Logbook</span>
          </span>
          <span className="text-xs text-[#5C381E]/70 font-serif italic">
            Education &amp; Guild
          </span>
        </div>

        <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#3D2E24] tracking-tight mb-2">
          Conservatory Specimen Logbook
        </h2>
        <p className="text-xs sm:text-sm text-[#5C381E]/80 mb-8 font-serif">
          Academic foundation, vocational coursework, and developer milestones cataloged like pressed foliage in an unrolled conservatory scroll.
        </p>

        {/* Specimen Logs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
          {specimenLogs.map((log) => (
            <div
              key={log.specimen}
              onClick={(e) => triggerLeafBurst(e.clientX, e.clientY, true)}
              className={`p-5 rounded-xl border ${log.color} shadow-2xs relative cursor-pointer hover:border-[#6B8A68] transition-all`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 rounded-lg bg-[#FAF5E8] border border-[#C29B72]/40 shadow-2xs">
                  {log.icon}
                </div>
                <span className="text-[10px] font-mono text-[#5C381E]/70 uppercase">
                  {log.tenure}
                </span>
              </div>
              <p className="text-[10px] font-serif uppercase tracking-wider text-[#6B8A68] font-bold mb-1">
                {log.genus}
              </p>
              <h3 className="font-serif font-bold text-sm text-[#3D2E24] leading-snug mb-2">
                {log.specimen}
              </h3>
              <p className="text-xs text-[#3D2E24]/85 mb-2 font-serif">
                {log.institution}
              </p>
              <p className="text-[11px] text-[#5C381E]/70 flex items-center gap-1.5 font-serif italic">
                <MapPin className="w-3 h-3 text-[#6B8A68]" />
                <span>{log.location}</span>
              </p>
            </div>
          ))}
        </div>

        {/* GitHub Guild Banner */}
        <div className="p-6 rounded-xl bg-[#FFFDF7] border border-[#C29B72]/50 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <GithubIcon className="w-5 h-5 text-[#3D2E24]" />
              <h4 className="font-serif font-bold text-base text-[#3D2E24]">
                KritikaManandhar on GitHub
              </h4>
            </div>
            <p className="text-xs text-[#5C381E]/80 font-serif">
              Explore active repositories, source code implementations, and project branches.
            </p>
          </div>

          <a
            href="https://github.com/KritikaManandhar"
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => triggerLeafBurst(e.clientX, e.clientY, true)}
            className="px-5 py-2.5 rounded-lg bg-[#6B8A68] hover:bg-[#5A7757] text-[#FFFDF9] text-xs sm:text-sm font-semibold transition-all shadow-xs border border-[#4E6B4B] flex items-center gap-2 whitespace-nowrap self-stretch sm:self-auto justify-center"
          >
            <GithubIcon className="w-4 h-4" />
            <span>Visit GitHub Profile &rarr;</span>
          </a>
        </div>
      </ParchmentScroll>
    </section>
  );
}
