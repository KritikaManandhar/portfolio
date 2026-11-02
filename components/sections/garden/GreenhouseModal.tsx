"use client";

import React, { useState } from "react";
import {
  X,
  Sprout,
  ExternalLink,
  Sparkles,
  BookOpen,
  ArrowRight,
  Code,
  Layers,
  Database,
  Cpu,
  Layout,
  Palette,
  Server,
  Zap,
} from "lucide-react";
import { SKILL_PLANTS, SkillPlant } from "./GardenData";

interface GreenhouseModalProps {
  onClose: () => void;
  onPlantInspected: (plantId: string) => void;
  inspectedPlants: string[];
}

export default function GreenhouseModal({
  onClose,
  onPlantInspected,
  inspectedPlants,
}: GreenhouseModalProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedPlant, setSelectedPlant] = useState<SkillPlant>(SKILL_PLANTS[0]);

  const filteredPlants =
    selectedCategory === "all"
      ? SKILL_PLANTS
      : SKILL_PLANTS.filter((p) => p.category === selectedCategory);

  const handleSelectPlant = (plant: SkillPlant) => {
    setSelectedPlant(plant);
    onPlantInspected(plant.id);
  };

  const renderIcon = (type: string, color: string) => {
    switch (type) {
      case "code":
        return <Code className="w-4 h-4" style={{ color }} />;
      case "server":
        return <Server className="w-4 h-4" style={{ color }} />;
      case "database":
        return <Database className="w-4 h-4" style={{ color }} />;
      case "cpu":
        return <Cpu className="w-4 h-4" style={{ color }} />;
      case "layout":
        return <Layout className="w-4 h-4" style={{ color }} />;
      case "palette":
        return <Palette className="w-4 h-4" style={{ color }} />;
      case "zap":
        return <Zap className="w-4 h-4" style={{ color }} />;
      default:
        return <Sprout className="w-4 h-4" style={{ color }} />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/55 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#FAF4E6] rounded-2xl border-2 border-[#B99A60] shadow-[0_24px_60px_rgba(30,15,5,0.35)] flex flex-col overflow-hidden">
        {/* Header Ribbon */}
        <div className="px-5 py-4 border-b border-[#B99A60]/40 bg-gradient-to-r from-[#F5EBD5] via-[#FAF4E6] to-[#F5EBD5] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#627D5B]/20 border border-[#627D5B]/40 flex items-center justify-center text-[#627D5B]">
              <Sprout className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base sm:text-lg text-[#344C39] leading-tight">
                The Greenhouse Conservatory
              </h3>
              <p className="text-[11px] font-serif text-[#49372C]/75 italic">
                Interactive Specimen Shelves • {inspectedPlants.length}/{SKILL_PLANTS.length} botanical skills examined
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

        {/* Category Filters */}
        <div className="px-5 py-2.5 bg-[#FAF4E6] border-b border-[#B99A60]/30 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
          {[
            { id: "all", label: "All Plants" },
            { id: "languages", label: "Languages" },
            { id: "frontend", label: "Frontend" },
            { id: "backend", label: "Backend & APIs" },
            { id: "databases", label: "Databases & ORM" },
            { id: "tools", label: "Design Tools" },
          ].map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1 rounded-full text-xs font-serif transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? "bg-[#627D5B] text-white font-semibold shadow-2xs"
                    : "text-[#49372C]/80 hover:bg-[#F0E4CE]"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Modal Main Content: 2 Columns on desktop (Plant Shelves Left, Herbarium Card Right) */}
        <div className="grid grid-cols-1 md:grid-cols-12 flex-1 overflow-y-auto">
          {/* Left: Plant Specimen Pots Grid (6 cols) */}
          <div className="md:col-span-6 p-4 sm:p-5 border-b md:border-b-0 md:border-r border-[#B99A60]/30 space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#B99A60] font-bold block mb-2">
              Select a potted specimen to examine:
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {filteredPlants.map((plant) => {
                const isSelected = selectedPlant.id === plant.id;
                const isInspected = inspectedPlants.includes(plant.id);
                return (
                  <button
                    key={plant.id}
                    type="button"
                    onClick={() => handleSelectPlant(plant)}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-start gap-2.5 relative active:scale-98 ${
                      isSelected
                        ? "bg-[#F4E9D4] border-[#627D5B] ring-2 ring-[#627D5B]/30 shadow-xs"
                        : "bg-[#FFFDF7] border-[#B99A60]/35 hover:bg-[#FAF4E6] hover:border-[#627D5B]/60"
                    }`}
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border"
                      style={{
                        backgroundColor: `${plant.accentColor}15`,
                        borderColor: `${plant.accentColor}40`,
                      }}
                    >
                      {renderIcon(plant.iconType, plant.accentColor)}
                    </div>

                    <div className="overflow-hidden">
                      <div className="flex items-center gap-1.5">
                        <span className="font-serif font-bold text-xs text-[#344C39] truncate block">
                          {plant.name}
                        </span>
                        {isInspected && (
                          <span className="text-[9px] text-[#627D5B] font-mono shrink-0">
                            ✓
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] font-serif italic text-[#49372C]/70 truncate block">
                        {plant.botanicalGenus}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Botanical Specimen Examination Folio (6 cols) */}
          <div className="md:col-span-6 p-5 sm:p-6 bg-[#FAF4E6] flex flex-col justify-between">
            <div className="space-y-4">
              {/* Herbarium Header */}
              <div className="p-4 rounded-xl bg-[#FFFDF7] border border-[#B99A60]/45 shadow-xs">
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-[#627D5B]/15 text-[#344C39] border border-[#627D5B]/30">
                    {selectedPlant.categoryLabel}
                  </span>
                  <span
                    className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full font-semibold border ${
                      selectedPlant.status === "Core Craft"
                        ? "bg-[#627D5B]/20 text-[#2D4F38] border-[#627D5B]/40"
                        : selectedPlant.status === "Actively Building"
                        ? "bg-[#D0684D]/20 text-[#8F3E29] border-[#D0684D]/40"
                        : "bg-[#4B6E82]/20 text-[#234559] border-[#4B6E82]/40"
                    }`}
                  >
                    {selectedPlant.status === "Core Craft"
                      ? "✦ Used in Projects"
                      : selectedPlant.status === "Actively Building"
                      ? "🌱 Currently Learning"
                      : "🎓 Academic Foundation"}
                  </span>
                </div>

                <h4 className="font-serif font-bold text-xl text-[#344C39] tracking-tight">
                  {selectedPlant.name}
                </h4>
                <p className="text-xs font-serif italic text-[#B99A60] mb-2">
                  Genus: {selectedPlant.botanicalGenus}
                </p>

                <p className="text-xs font-serif text-[#49372C]/90 leading-relaxed">
                  {selectedPlant.description}
                </p>
              </div>

              {/* Cultivation & Real-World Practice */}
              <div className="p-4 rounded-xl bg-[#FFFDF7] border border-[#B99A60]/45 shadow-xs space-y-1.5">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#627D5B] font-bold block">
                  ✦ Greenhouse Cultivation Notes
                </span>
                <p className="text-xs font-serif text-[#3D2E24] leading-relaxed">
                  {selectedPlant.practiceNotes}
                </p>

                {selectedPlant.relatedProject && (
                  <div className="pt-2 border-t border-[#B99A60]/30 mt-2 flex items-center justify-between text-xs font-serif">
                    <span className="text-[#49372C]/70">Demonstrated In:</span>
                    <span className="font-semibold text-[#627D5B]">
                      {selectedPlant.relatedProject}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-[#B99A60]/30 flex items-center justify-between mt-4">
              {selectedPlant.docUrl ? (
                <a
                  href={selectedPlant.docUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-serif font-medium text-[#627D5B] hover:text-[#344C39] hover:underline"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Technical Reference</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              ) : (
                <span className="text-[11px] font-serif italic text-[#49372C]/60">
                  CSIT Coursework Core
                </span>
              )}

              <button
                type="button"
                onClick={onClose}
                className="px-4 py-1.5 rounded-lg bg-[#627D5B] hover:bg-[#4E6B47] text-white text-xs font-serif font-semibold shadow-xs transition-colors cursor-pointer"
              >
                Return to Garden
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
