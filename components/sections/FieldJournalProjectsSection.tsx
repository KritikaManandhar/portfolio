"use client";

import React, { useState } from "react";
import {
  Palette,
  ShoppingBag,
  Lock,
  Search,
  X,
  Sparkles,
} from "lucide-react";
import { triggerLeafBurst } from "@/components/particles/LeafParticleBurst";
import { chimeEngine } from "@/components/audio/ChimeEngine";
import { GithubIcon } from "@/components/ui/VectorIcons";

interface ProjectDetails {
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  githubUrl: string;
  fieldNotes: string[];
  watercolorTheme: string;
  stampType: "ecommerce" | "auth";
}

const PROJECTS: ProjectDetails[] = [
  {
    title: "E-Commerce Website",
    subtitle: "Dynamic Storefront & Inventory Catalog",
    description:
      "A complete online retail application featuring real-time product discovery, interactive shopping cart management, persistent user wishlist, and secure session authentication integrated with a relational MySQL database.",
    tags: ["PHP", "MySQL", "HTML5", "CSS3", "JavaScript"],
    githubUrl: "https://github.com/KritikaManandhar/E-commerce-website",
    fieldNotes: [
      "Relational product categorization with dynamic price filtering.",
      "Session-based cart persistence and order quantity calculations.",
      "Password hashing and SQL injection mitigation on user auth routes.",
      "Responsive storefront grid styled for mobile & desktop screens.",
    ],
    watercolorTheme: "from-[#F3C68F]/30 via-[#FAF6F0] to-[#E07A5F]/20",
    stampType: "ecommerce",
  },
  {
    title: "Registration & Login System",
    subtitle: "Student Portal & Input Validation Engine",
    description:
      "A structured student onboarding form and authentication portal featuring comprehensive client/server-side validation, error handling, session cookies, and clean responsive layout design for optimized usability.",
    tags: ["PHP", "MySQL", "HTML", "CSS", "Session Auth"],
    githubUrl: "https://github.com/KritikaManandhar/Website",
    fieldNotes: [
      "Rigorous form input sanitization and regex pattern checks.",
      "Clear feedback alerts for existing user collision and credential errors.",
      "Session lifecycle management with secure logout redirection.",
      "Semantic HTML forms designed with accessibility best practices.",
    ],
    watercolorTheme: "from-[#7A9A7E]/30 via-[#FAF6F0] to-[#B8D4C8]/20",
    stampType: "auth",
  },
];

export default function FieldJournalProjectsSection() {
  const [activeProject, setActiveProject] = useState<ProjectDetails | null>(null);

  const openFieldNotes = (e: React.MouseEvent, p: ProjectDetails) => {
    triggerLeafBurst(e.clientX, e.clientY, true);
    if (chimeEngine) {
      chimeEngine.playPaperRustle();
    }
    setActiveProject(p);
  };

  const closeFieldNotes = (e: React.MouseEvent) => {
    triggerLeafBurst(e.clientX, e.clientY, false);
    setActiveProject(null);
  };

  return (
    <section
      id="projects"
      className="min-h-screen w-full flex items-center justify-center px-4 sm:px-6 py-20 relative z-10"
    >
      <div className="max-w-5xl w-full ghibli-card p-6 sm:p-10 relative">
        <div className="washi-tape washi-tape-top-left" />
        <div className="washi-tape washi-tape-top-right" />

        {/* Section Tag */}
        <div className="flex items-center justify-between mb-4">
          <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wider text-[#7A9A7E] bg-[#7A9A7E]/15 border border-[#7A9A7E]/30 flex items-center gap-1.5">
            <Palette className="w-3.5 h-3.5 text-[#7A9A7E]" />
            <span>Section 03 • The Field Journal Postcards</span>
          </span>
          <span className="text-xs text-[#3D352E]/60 font-mono">
            Featured Projects
          </span>
        </div>

        <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#3D352E] tracking-tight mb-2">
          Handcrafted Project Postcards
        </h2>
        <p className="text-xs sm:text-sm text-[#3D352E]/75 mb-8">
          Full-stack software applications pinned into the artist journal with washi tape and wax field stamps.
        </p>

        {/* 2 Postcard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PROJECTS.map((proj) => (
            <div
              key={proj.title}
              className={`p-6 rounded-2xl bg-gradient-to-br ${proj.watercolorTheme} border border-[#7A9A7E]/30 shadow-sm relative flex flex-col justify-between group hover:border-[#E07A5F]/60 transition-all`}
            >
              {/* Postcard Stamp Accent */}
              <div className="washi-tape top-[-8px] right-[24px] w-[56px] rotate-[-2deg]" />

              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 rounded-xl bg-white/80 border border-[#D8C7B0]/60 shadow-2xs">
                    {proj.stampType === "ecommerce" ? (
                      <ShoppingBag className="w-5 h-5 text-[#E07A5F]" />
                    ) : (
                      <Lock className="w-5 h-5 text-[#7A9A7E]" />
                    )}
                  </div>
                  <span className="text-[10px] uppercase font-mono tracking-wider px-2.5 py-0.5 rounded-full bg-white/70 border border-[#7A9A7E]/30 text-[#3D352E]">
                    Botanical Note
                  </span>
                </div>

                <h3 className="font-serif font-bold text-lg sm:text-xl text-[#3D352E] mb-1 group-hover:text-[#E07A5F] transition-colors">
                  {proj.title}
                </h3>
                <p className="text-xs font-medium text-[#7A9A7E] mb-3">
                  {proj.subtitle}
                </p>

                <p className="text-xs sm:text-sm text-[#3D352E]/80 leading-relaxed mb-6 font-sans">
                  {proj.description}
                </p>

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {proj.tags.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded-md text-[11px] font-mono bg-white/80 border border-[#D8C7B0] text-[#3D352E]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-[#7A9A7E]/20">
                <button
                  type="button"
                  onClick={(e) => openFieldNotes(e, proj)}
                  className="text-xs font-semibold text-[#7A9A7E] hover:text-[#5E7D62] transition-colors flex items-center gap-1.5 cursor-pointer underline underline-offset-4"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>Inspect Field Notes</span>
                </button>

                <a
                  href={proj.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => triggerLeafBurst(e.clientX, e.clientY, true)}
                  className="px-3.5 py-1.5 rounded-xl bg-[#3D352E] hover:bg-[#2A241F] text-white text-xs font-medium transition-all shadow-xs flex items-center gap-2"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>View Repository &rarr;</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Modal: Field Notes Sheet */}
        {activeProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
            <div className="max-w-lg w-full ghibli-card p-6 sm:p-8 relative bg-[#FAF6F0] shadow-2xl animate-in fade-in zoom-in-95 duration-200">
              <div className="washi-tape washi-tape-top-left" />
              <div className="washi-tape washi-tape-top-right" />

              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono uppercase text-[#7A9A7E] tracking-wider">
                  Field Journal Entry
                </span>
                <button
                  type="button"
                  onClick={closeFieldNotes}
                  className="p-1 rounded-md text-[#3D352E]/60 hover:text-[#E07A5F] hover:bg-black/5 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <h3 className="font-serif font-bold text-xl text-[#3D352E] mb-1">
                {activeProject.title}
              </h3>
              <p className="text-xs text-[#7A9A7E] mb-4">
                Architecture &amp; Implementation Details
              </p>

              <div className="space-y-2 mb-6">
                {activeProject.fieldNotes.map((note, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 p-2.5 rounded-lg bg-white/70 border border-[#D8C7B0]/60 text-xs text-[#3D352E]"
                  >
                    <Sparkles className="w-3 h-3 text-[#E07A5F] mt-0.5 shrink-0" />
                    <span className="leading-relaxed">{note}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-[#D8C7B0]/60">
                <button
                  type="button"
                  onClick={closeFieldNotes}
                  className="px-4 py-2 rounded-xl bg-[#F3ECE1] hover:bg-[#EAE1D3] text-xs font-semibold text-[#3D352E] transition-all cursor-pointer"
                >
                  Close Note
                </button>
                <a
                  href={activeProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => triggerLeafBurst(e.clientX, e.clientY, true)}
                  className="px-4 py-2 rounded-xl bg-[#7A9A7E] hover:bg-[#68886C] text-xs font-semibold text-white transition-all shadow-xs flex items-center gap-2"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>Open on GitHub</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
