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
import ParchmentScroll from "@/components/ui/ParchmentScroll";

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
    watercolorTheme: "bg-[#FFFDF7] border-[#C29B72]/50",
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
    watercolorTheme: "bg-[#FFFDF7] border-[#C29B72]/50",
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
      <ParchmentScroll maxWidth="max-w-5xl" sealText="工">
        {/* Section Tag */}
        <div className="flex items-center justify-between mb-4 pr-12">
          <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wider text-[#6B8A68] bg-[#6B8A68]/15 border border-[#6B8A68]/35 flex items-center gap-1.5 shadow-2xs">
            <Palette className="w-3.5 h-3.5 text-[#6B8A68]" />
            <span>Section 03 • The Field Journal Manuscripts</span>
          </span>
          <span className="text-xs text-[#5C381E]/70 font-serif italic">
            Featured Projects
          </span>
        </div>

        <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#3D2E24] tracking-tight mb-2">
          Handcrafted Project Folios
        </h2>
        <p className="text-xs sm:text-sm text-[#5C381E]/80 mb-8 font-serif">
          Full-stack software applications inscribed into the artist scroll with wax stamps and field notes.
        </p>

        {/* 2 Postcard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PROJECTS.map((proj) => (
            <div
              key={proj.title}
              className={`p-6 rounded-xl ${proj.watercolorTheme} border shadow-2xs relative flex flex-col justify-between group hover:border-[#D0684D] transition-all`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 rounded-lg bg-[#FAF5E8] border border-[#C29B72]/50 shadow-2xs">
                    {proj.stampType === "ecommerce" ? (
                      <ShoppingBag className="w-5 h-5 text-[#D0684D]" />
                    ) : (
                      <Lock className="w-5 h-5 text-[#6B8A68]" />
                    )}
                  </div>
                  <span className="text-[10px] uppercase font-mono tracking-wider px-2.5 py-0.5 rounded-full bg-[#FAF5E8] border border-[#C29B72]/50 text-[#5C381E]">
                    Botanical Note
                  </span>
                </div>

                <h3 className="font-serif font-bold text-lg sm:text-xl text-[#3D2E24] mb-1 group-hover:text-[#D0684D] transition-colors">
                  {proj.title}
                </h3>
                <p className="text-xs font-serif italic text-[#6B8A68] mb-3">
                  {proj.subtitle}
                </p>

                <p className="text-xs sm:text-sm text-[#3D2E24]/85 leading-relaxed mb-6 font-serif">
                  {proj.description}
                </p>

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {proj.tags.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded-md text-[11px] font-mono bg-[#FAF5E8] border border-[#C29B72]/50 text-[#3D2E24]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-[#C29B72]/30">
                <button
                  type="button"
                  onClick={(e) => openFieldNotes(e, proj)}
                  className="text-xs font-serif font-semibold text-[#6B8A68] hover:text-[#4E6B4B] transition-colors flex items-center gap-1.5 cursor-pointer underline underline-offset-4"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>Inspect Field Notes</span>
                </button>

                <a
                  href={proj.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => triggerLeafBurst(e.clientX, e.clientY, true)}
                  className="px-3.5 py-1.5 rounded-lg bg-[#3D2E24] hover:bg-[#2A1E16] text-[#FAF6EE] text-xs font-medium transition-all shadow-xs flex items-center gap-2 border border-[#2B180A]"
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
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-xs">
            <div className="max-w-lg w-full bg-[#FAF5E8] p-6 sm:p-8 relative rounded-xl border-2 border-[#C29B72] shadow-2xl animate-in fade-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-serif uppercase text-[#6B8A68] tracking-wider font-semibold">
                  Field Journal Entry
                </span>
                <button
                  type="button"
                  onClick={closeFieldNotes}
                  className="p-1 rounded-md text-[#5C381E]/60 hover:text-[#D0684D] hover:bg-black/5 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <h3 className="font-serif font-bold text-xl text-[#3D2E24] mb-1">
                {activeProject.title}
              </h3>
              <p className="text-xs font-serif italic text-[#6B8A68] mb-4">
                Architecture &amp; Implementation Details
              </p>

              <div className="space-y-2 mb-6">
                {activeProject.fieldNotes.map((note, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 p-2.5 rounded-lg bg-[#FFFDF7] border border-[#C29B72]/50 text-xs text-[#3D2E24] font-serif"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#D0684D] mt-0.5 shrink-0" />
                    <span className="leading-relaxed">{note}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-[#C29B72]/40">
                <button
                  type="button"
                  onClick={closeFieldNotes}
                  className="px-4 py-2 rounded-lg bg-[#FAF3E0] hover:bg-[#F2E5C4] border border-[#C29B72]/70 text-xs font-serif font-semibold text-[#3D2E24] transition-all cursor-pointer"
                >
                  Close Note
                </button>
                <a
                  href={activeProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => triggerLeafBurst(e.clientX, e.clientY, true)}
                  className="px-4 py-2 rounded-lg bg-[#6B8A68] hover:bg-[#5A7757] text-xs font-semibold text-[#FFFDF9] transition-all shadow-xs flex items-center gap-2 border border-[#4E6B4B]"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>Open on GitHub</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </ParchmentScroll>
    </section>
  );
}
