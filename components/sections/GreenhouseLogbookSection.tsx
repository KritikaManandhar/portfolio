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
      specimen: "B.Sc. Computer Science & IT",
      institution: "Padmakanya Multiple Campus, TU",
      tenure: "2022 – 2026",
      location: "Mhepi, Kathmandu, Nepal",
      icon: <GraduationCap className="w-4 h-4 text-[#6B8A68]" />,
      color: "border-[#6B8A68]/40 bg-[#FFFDF7]",
    },
    {
      genus: "Practical Cultivation",
      specimen: "Web Design Training",
      institution: "Broadway Infosys Nepal",
      tenure: "Core Certificate",
      location: "Kathmandu, Nepal",
      icon: <Scroll className="w-4 h-4 text-[#D0684D]" />,
      color: "border-[#D0684D]/40 bg-[#FFFDF7]",
    },
    {
      genus: "Open Source Habitat",
      specimen: "GitHub Developer Guild",
      institution: "github.com/KritikaManandhar",
      tenure: "Active Practicum",
      location: "Version Control",
      icon: <GithubIcon className="w-4 h-4 text-[#8C5835]" />,
      color: "border-[#C29B72]/50 bg-[#FFFDF7]",
    },
  ];

  return (
    <section
      id="greenhouse"
      className="min-h-screen w-full flex items-center justify-center px-4 sm:px-6 pt-14 pb-6 relative z-10"
    >
      <ParchmentScroll maxWidth="max-w-[700px]" sealText="学">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-3 pr-10">
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wider text-[#6B8A68] bg-[#6B8A68]/15 border border-[#6B8A68]/35 flex items-center gap-1.5 shadow-2xs">
            <Sprout className="w-3 h-3 text-[#6B8A68]" />
            <span>Section 04 • The Glass Greenhouse Logbook</span>
          </span>
          <span className="text-[11px] text-[#5C381E]/70 font-serif italic">
            Education &amp; Guild
          </span>
        </div>

        <h2 className="text-2xl sm:text-[28px] font-serif font-bold text-[#3D2E24] tracking-tight mb-1">
          Conservatory Specimen Logbook
        </h2>
        <p className="text-xs sm:text-[13px] text-[#5C381E]/80 mb-5 font-serif">
          Academic foundation, vocational coursework, and developer milestones cataloged like pressed foliage.
        </p>

        {/* Specimen Logs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mb-5">
          {specimenLogs.map((log) => (
            <div
              key={log.specimen}
              onClick={(e) => triggerLeafBurst(e.clientX, e.clientY, true)}
              className={`p-3.5 sm:p-4 rounded-lg border ${log.color} shadow-2xs relative cursor-pointer hover:border-[#6B8A68] transition-all`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="p-1.5 rounded-md bg-[#FAF5E8] border border-[#C29B72]/40 shadow-2xs">
                  {log.icon}
                </div>
                <span className="text-[9px] font-mono text-[#5C381E]/70 uppercase">
                  {log.tenure}
                </span>
              </div>
              <p className="text-[9px] font-serif uppercase tracking-wider text-[#6B8A68] font-bold mb-0.5">
                {log.genus}
              </p>
              <h3 className="font-serif font-bold text-xs sm:text-[13px] text-[#3D2E24] leading-snug mb-1">
                {log.specimen}
              </h3>
              <p className="text-[11px] text-[#3D2E24]/85 mb-1.5 font-serif">
                {log.institution}
              </p>
              <p className="text-[10px] text-[#5C381E]/70 flex items-center gap-1 font-serif italic">
                <MapPin className="w-2.5 h-2.5 text-[#6B8A68]" />
                <span>{log.location}</span>
              </p>
            </div>
          ))}
        </div>

        {/* GitHub Guild Banner */}
        <div className="p-4 sm:p-5 rounded-lg bg-[#FFFDF7] border border-[#C29B72]/50 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <GithubIcon className="w-4 h-4 text-[#3D2E24]" />
              <h4 className="font-serif font-bold text-sm text-[#3D2E24]">
                KritikaManandhar on GitHub
              </h4>
            </div>
            <p className="text-[11px] text-[#5C381E]/80 font-serif">
              Explore active repositories, source code implementations, and project branches.
            </p>
          </div>

          <a
            href="https://github.com/KritikaManandhar"
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => triggerLeafBurst(e.clientX, e.clientY, true)}
            className="px-4 py-2 rounded-md bg-[#6B8A68] hover:bg-[#5A7757] text-[#FFFDF9] text-xs font-semibold transition-all shadow-xs border border-[#4E6B4B] flex items-center gap-1.5 whitespace-nowrap self-stretch sm:self-auto justify-center"
          >
            <GithubIcon className="w-3.5 h-3.5" />
            <span>GitHub Profile &rarr;</span>
          </a>
        </div>
      </ParchmentScroll>
    </section>
  );
}
