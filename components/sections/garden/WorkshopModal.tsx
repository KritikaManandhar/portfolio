"use client";

import React, { useState } from "react";
import {
  X,
  Hammer,
  ShoppingBag,
  Lock,
  Home,
  CheckCircle2,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import { GithubIcon } from "@/components/ui/VectorIcons";
import { GARDEN_PROJECTS, GardenProject } from "./GardenData";

interface WorkshopModalProps {
  onClose: () => void;
  onProjectInspected: (projectId: string) => void;
  inspectedProjects: string[];
}

export default function WorkshopModal({
  onClose,
  onProjectInspected,
  inspectedProjects,
}: WorkshopModalProps) {
  const [activeProjectIndex, setActiveProjectIndex] = useState<number>(0);
  const currentProject = GARDEN_PROJECTS[activeProjectIndex] || GARDEN_PROJECTS[0];

  const handleSelectProject = (idx: number) => {
    setActiveProjectIndex(idx);
    onProjectInspected(GARDEN_PROJECTS[idx].id);
  };

  const renderProjectIcon = (type: string, color: string) => {
    switch (type) {
      case "shopping-bag":
        return <ShoppingBag className="w-4 h-4" style={{ color }} />;
      case "lock":
        return <Lock className="w-4 h-4" style={{ color }} />;
      case "home":
        return <Home className="w-4 h-4" style={{ color }} />;
      default:
        return <Hammer className="w-4 h-4" style={{ color }} />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/55 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#FAF4E6] rounded-2xl border-2 border-[#D0684D] shadow-[0_24px_60px_rgba(30,15,5,0.35)] flex flex-col overflow-hidden">
        {/* Header Ribbon */}
        <div className="px-5 py-4 border-b border-[#B99A60]/40 bg-gradient-to-r from-[#F5EBD5] via-[#FAF4E6] to-[#F5EBD5] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#D0684D]/20 border border-[#D0684D]/40 flex items-center justify-center text-[#D0684D]">
              <Hammer className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base sm:text-lg text-[#3D2E24] leading-tight">
                The Artisan Inventor&apos;s Workshop
              </h3>
              <p className="text-[11px] font-serif text-[#49372C]/75 italic">
                Handcrafted Full-Stack Blueprints • Verified Repositories
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg border border-[#B99A60]/50 hover:bg-[#F6EBD5] text-[#49372C] transition-colors cursor-pointer"
            title="Return to Garden"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Project Blueprint Tabs */}
        <div className="px-5 py-2.5 bg-[#FAF4E6] border-b border-[#B99A60]/30 flex items-center gap-2 overflow-x-auto scrollbar-none">
          {GARDEN_PROJECTS.map((proj, idx) => {
            const isActive = activeProjectIndex === idx;
            const isInspected = inspectedProjects.includes(proj.id);
            return (
              <button
                key={proj.id}
                type="button"
                onClick={() => handleSelectProject(idx)}
                className={`px-3 py-1.5 rounded-full text-xs font-serif transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                  isActive
                    ? "bg-[#D0684D] text-white font-semibold shadow-2xs scale-102"
                    : "bg-[#FFFDF7] border border-[#B99A60]/35 text-[#49372C]/80 hover:bg-[#FAF4E6]"
                }`}
              >
                <span className="text-[10px] font-mono opacity-80">
                  {proj.chapterNumber}
                </span>
                <span>{proj.title.split("&")[0].trim()}</span>
                {isInspected && (
                  <span className="text-[9px] font-mono opacity-90">✓</span>
                )}
              </button>
            );
          })}
        </div>

        {/* Blueprint Sheet Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 flex-1">
          {/* Project Title Banner */}
          <div className="p-4 sm:p-5 rounded-xl bg-[#FFFDF7] border border-[#B99A60]/45 shadow-xs">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <span
                className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold border flex items-center gap-1.5"
                style={{
                  backgroundColor: `${currentProject.accentColor}15`,
                  borderColor: `${currentProject.accentColor}40`,
                  color: currentProject.accentColor,
                }}
              >
                {renderProjectIcon(currentProject.iconType, currentProject.accentColor)}
                <span>Blueprint Folio {currentProject.chapterNumber} • {currentProject.badgeLabel}</span>
              </span>

              <a
                href={currentProject.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1 rounded-md bg-[#3D2E24] hover:bg-[#2A1E16] text-white text-[11px] font-medium transition-all shadow-xs flex items-center gap-1.5 border border-[#2B180A]"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>GitHub Repository &rarr;</span>
              </a>
            </div>

            <h4 className="font-serif font-bold text-xl sm:text-2xl text-[#3D2E24] tracking-tight">
              {currentProject.title}
            </h4>
            <p className="text-xs font-serif italic text-[#6B8A68] mt-0.5 mb-2.5">
              {currentProject.subtitle}
            </p>

            <p className="text-xs sm:text-[13px] font-serif text-[#49372C]/90 leading-relaxed">
              {currentProject.description}
            </p>
          </div>

          {/* Purpose & Problem Solved */}
          <div className="p-4 rounded-xl bg-[#FFFDF7] border border-[#B99A60]/45 shadow-xs">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#D0684D] font-bold block mb-1">
              ✦ Architectural Purpose
            </span>
            <p className="text-xs font-serif text-[#3D2E24] leading-relaxed">
              {currentProject.purpose}
            </p>
          </div>

          {/* Real Technologies Used */}
          <div className="p-4 rounded-xl bg-[#FFFDF7] border border-[#B99A60]/45 shadow-xs">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#B99A60] font-bold block mb-2">
              Technologies &amp; Tools Used
            </span>
            <div className="flex flex-wrap gap-1.5">
              {currentProject.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-md text-[10px] font-mono bg-[#FAF4E6] border border-[#B99A60]/40 text-[#3D2E24]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Field Architecture Highlights */}
          <div className="p-4 rounded-xl bg-[#FFFDF7] border border-[#B99A60]/45 shadow-xs space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#6B8A68] font-bold block">
              ✦ Implementation Specs &amp; Engineering Highlights
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {currentProject.highlights.map((note, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2 p-2 rounded-lg bg-[#FAF4E6] border border-[#B99A60]/30 text-xs font-serif text-[#3D2E24]"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#6B8A68] mt-0.5 shrink-0" />
                  <span className="leading-snug">{note}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-[#B99A60]/30 bg-[#FAF4E6] flex items-center justify-between">
          <span className="text-[11px] font-serif italic text-[#49372C]/65">
            Project {activeProjectIndex + 1} of {GARDEN_PROJECTS.length} in Workshop
          </span>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-[#D0684D] hover:bg-[#B8573D] text-white text-xs font-serif font-semibold shadow-xs transition-colors cursor-pointer"
          >
            Return to Garden
          </button>
        </div>
      </div>
    </div>
  );
}
