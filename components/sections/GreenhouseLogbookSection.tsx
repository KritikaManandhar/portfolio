"use client";

import React, { useState, useRef, useCallback } from "react";
import {
  Flower2,
  Sprout,
  RotateCcw,
  Trash2,
  Sparkles,
  Download,
  GraduationCap,
  X,
  Shuffle,
} from "lucide-react";
import { triggerLeafBurst } from "@/components/particles/LeafParticleBurst";
import { chimeEngine } from "@/components/audio/ChimeEngine";
import { GithubIcon } from "@/components/ui/VectorIcons";
import ParchmentScroll from "@/components/ui/ParchmentScroll";

interface StampedItem {
  id: string;
  typeId: string;
  xPercent: number; // 0 to 100
  yPercent: number; // 0 to 100
  rotation: number;
  scale: number;
  color: string;
  category: "botanical" | "wax_seal";
  label: string;
  character?: string;
}

interface SpecimenOption {
  id: string;
  name: string;
  category: "botanical" | "wax_seal";
  character?: string;
  defaultColor: string;
}

const SPECIMEN_OPTIONS: SpecimenOption[] = [
  // Botanicals
  { id: "sakura", name: "Sakura Blossom", category: "botanical", defaultColor: "#E07A5F" },
  { id: "ginkgo", name: "Ginkgo Biloba", category: "botanical", defaultColor: "#C29B72" },
  { id: "clover", name: "Four-Leaf Clover", category: "botanical", defaultColor: "#6B8A68" },
  { id: "fern", name: "Forest Fern", category: "botanical", defaultColor: "#4A6B48" },
  { id: "lavender", name: "Wild Lavender", category: "botanical", defaultColor: "#8C5835" },
  { id: "mushroom", name: "Woodland Fungi", category: "botanical", defaultColor: "#D0684D" },
  // Artisan Wax Seals & Emblems
  { id: "seal_monogram", name: "Studio Monogram (KM)", category: "wax_seal", character: "KM", defaultColor: "#C0392B" },
  { id: "seal_star", name: "Wishing Star", category: "wax_seal", character: "★", defaultColor: "#B8860B" },
  { id: "seal_sprout", name: "Botanical Sprout", category: "wax_seal", character: "🌱", defaultColor: "#4A6B48" },
  { id: "seal_quill", name: "Journal Quill", category: "wax_seal", character: "✒", defaultColor: "#3D2817" },
  { id: "seal_heart", name: "Warm Heart", category: "wax_seal", character: "♥", defaultColor: "#C0392B" },
];

const INK_PALETTE = [
  { name: "Vermilion Red", color: "#C0392B" },
  { name: "Forest Sage", color: "#4A6B48" },
  { name: "Terracotta Rust", color: "#C2593F" },
  { name: "Walnut Ink", color: "#3D2817" },
  { name: "Antique Gold", color: "#B8860B" },
];

const PAPER_TINTS = [
  { id: "parchment", name: "Rice Parchment", bg: "#FAF4E6", border: "#C29B72" },
  { id: "sakura", name: "Sakura Mist", bg: "#FFF0F3", border: "#EAA6B1" },
  { id: "moss", name: "Spring Moss", bg: "#F2F7F0", border: "#8BA888" },
  { id: "lavender", name: "Twilight Mist", bg: "#F6F3F9", border: "#B3A2C7" },
];

const TASSEL_COLORS = [
  { name: "Vermilion Red", color: "#B83828" },
  { name: "Forest Sage", color: "#4A6B48" },
  { name: "Golden Brass", color: "#C29B72" },
];

export default function GreenhouseLogbookSection() {
  const bookmarkRef = useRef<HTMLDivElement | null>(null);

  // Studio State
  const [activeCategory, setActiveCategory] = useState<"botanical" | "wax_seal">("botanical");
  const [selectedSpecimenId, setSelectedSpecimenId] = useState<string>("sakura");
  const [activeInkColor, setActiveInkColor] = useState<string>("#C0392B");
  const [activePaper, setActivePaper] = useState(PAPER_TINTS[0]);
  const [activeTassel, setActiveTassel] = useState(TASSEL_COLORS[0]);
  const [customInscription, setCustomInscription] = useState<string>("To quiet dreams & starry skies");
  const [showCredentials, setShowCredentials] = useState<boolean>(false);

  // Initial starter arrangement
  const [stampedItems, setStampedItems] = useState<StampedItem[]>([
    {
      id: "item-1",
      typeId: "ginkgo",
      xPercent: 52,
      yPercent: 32,
      rotation: -14,
      scale: 1.15,
      color: "#C29B72",
      category: "botanical",
      label: "Ginkgo Biloba",
    },
    {
      id: "item-2",
      typeId: "sakura",
      xPercent: 48,
      yPercent: 54,
      rotation: 18,
      scale: 1.05,
      color: "#E07A5F",
      category: "botanical",
      label: "Sakura Blossom",
    },
    {
      id: "item-3",
      typeId: "seal_monogram",
      xPercent: 50,
      yPercent: 78,
      rotation: 3,
      scale: 1.0,
      color: "#C0392B",
      category: "wax_seal",
      label: "Studio Monogram (KM)",
      character: "KM",
    },
  ]);

  const activeSpecimen = SPECIMEN_OPTIONS.find((s) => s.id === selectedSpecimenId) || SPECIMEN_OPTIONS[0];

  // Stamp click handler on bookmark
  const handleBookmarkClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const bookmark = bookmarkRef.current;
    if (!bookmark) return;

    const rect = bookmark.getBoundingClientRect();
    const x = Math.max(12, Math.min(rect.width - 12, e.clientX - rect.left));
    const y = Math.max(48, Math.min(rect.height - 48, e.clientY - rect.top));

    const xPercent = (x / rect.width) * 100;
    const yPercent = (y / rect.height) * 100;

    triggerLeafBurst(e.clientX, e.clientY, activeCategory === "botanical");
    if (chimeEngine) {
      chimeEngine.playPaperRustle();
    }

    const newItem: StampedItem = {
      id: `stamp-${Date.now()}-${Math.random()}`,
      typeId: activeSpecimen.id,
      xPercent,
      yPercent,
      rotation: Math.round((Math.random() - 0.5) * 32),
      scale: parseFloat((0.92 + Math.random() * 0.22).toFixed(2)),
      color: activeInkColor,
      category: activeSpecimen.category,
      label: activeSpecimen.name,
      character: activeSpecimen.character,
    };

    setStampedItems((prev) => [...prev, newItem]);
  };

  const handleUndo = (e: React.MouseEvent) => {
    triggerLeafBurst(e.clientX, e.clientY, false);
    if (chimeEngine) {
      chimeEngine.playPaperRustle();
    }
    setStampedItems((prev) => prev.slice(0, -1));
  };

  const handleClear = (e: React.MouseEvent) => {
    triggerLeafBurst(e.clientX, e.clientY, false);
    if (chimeEngine) {
      chimeEngine.playPaperRustle();
    }
    setStampedItems([]);
  };

  const handleRandomize = (e: React.MouseEvent) => {
    triggerLeafBurst(e.clientX, e.clientY, true);
    if (chimeEngine) {
      chimeEngine.playBreezeChord();
    }

    const randomItems: StampedItem[] = [
      {
        id: `auto-1`,
        typeId: "fern",
        xPercent: 38 + Math.random() * 24,
        yPercent: 22 + Math.random() * 10,
        rotation: Math.round((Math.random() - 0.5) * 30),
        scale: 1.1,
        color: "#4A6B48",
        category: "botanical",
        label: "Forest Fern",
      },
      {
        id: `auto-2`,
        typeId: "sakura",
        xPercent: 40 + Math.random() * 20,
        yPercent: 42 + Math.random() * 12,
        rotation: Math.round((Math.random() - 0.5) * 30),
        scale: 1.05,
        color: "#C2593F",
        category: "botanical",
        label: "Sakura Blossom",
      },
      {
        id: `auto-3`,
        typeId: "clover",
        xPercent: 44 + Math.random() * 15,
        yPercent: 62 + Math.random() * 10,
        rotation: Math.round((Math.random() - 0.5) * 30),
        scale: 1.0,
        color: "#4A6B48",
        category: "botanical",
        label: "Four-Leaf Clover",
      },
      {
        id: `auto-4`,
        typeId: "seal_star",
        xPercent: 50,
        yPercent: 82,
        rotation: 2,
        scale: 1.05,
        color: "#C0392B",
        category: "wax_seal",
        label: "Wishing Star",
        character: "★",
      },
    ];

    setStampedItems(randomItems);
  };

  // Canvas PNG Export Keepsake
  const handleDownloadKeepsake = useCallback(() => {
    if (chimeEngine) {
      chimeEngine.playCelebration();
    }
    triggerLeafBurst(window.innerWidth / 2, window.innerHeight / 2, true);

    const canvas = document.createElement("canvas");
    canvas.width = 640;
    canvas.height = 1440;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // 1. Draw Bookmark Paper Body
    const bx = 80;
    const by = 180;
    const bw = 480;
    const bh = 1180;
    const cornerRadius = 14;

    // Draw Tassel Cord & Hanging Loop
    ctx.strokeStyle = activeTassel.color;
    ctx.lineWidth = 6;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(320, by);
    ctx.quadraticCurveTo(320, 60, 310, 40);
    ctx.quadraticCurveTo(320, 20, 330, 40);
    ctx.quadraticCurveTo(320, 60, 320, by);
    ctx.stroke();

    // Hanging Tassel Fringe
    ctx.fillStyle = activeTassel.color;
    ctx.beginPath();
    ctx.arc(320, 70, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillRect(315, 75, 10, 45);

    // Bookmark Paper
    ctx.save();
    ctx.fillStyle = activePaper.bg;
    ctx.shadowColor = "rgba(45, 25, 12, 0.28)";
    ctx.shadowBlur = 28;
    ctx.shadowOffsetY = 12;
    ctx.beginPath();
    ctx.roundRect(bx, by, bw, bh, cornerRadius);
    ctx.fill();
    ctx.restore();

    // Bookmark Inked Border
    ctx.strokeStyle = activePaper.border;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.roundRect(bx + 16, by + 16, bw - 32, bh - 32, 8);
    ctx.stroke();

    // Top Brass Eyelet Grommet
    ctx.fillStyle = "#C29B72";
    ctx.beginPath();
    ctx.arc(320, by + 34, 11, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = activePaper.bg;
    ctx.beginPath();
    ctx.arc(320, by + 34, 5, 0, Math.PI * 2);
    ctx.fill();

    // Draw Each Stamped Item
    stampedItems.forEach((item) => {
      const itemX = bx + (item.xPercent / 100) * bw;
      const itemY = by + (item.yPercent / 100) * bh;

      ctx.save();
      ctx.translate(itemX, itemY);
      ctx.rotate((item.rotation * Math.PI) / 180);
      ctx.scale(item.scale * 1.5, item.scale * 1.5);
      ctx.fillStyle = item.color;
      ctx.strokeStyle = item.color;

      if (item.category === "wax_seal") {
        // Artisan Circular Wax Seal
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.arc(0, 0, 18, 0, Math.PI * 2);
        ctx.stroke();
        // Inner delicate ring
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(0, 0, 14, 0, Math.PI * 2);
        ctx.stroke();

        ctx.font = item.character && item.character.length > 1 ? "bold 13px sans-serif" : "bold 18px serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(item.character || "KM", 0, 1);
      } else {
        // Botanical Specimens
        if (item.typeId === "sakura") {
          for (let p = 0; p < 5; p++) {
            ctx.save();
            ctx.rotate((p * 72 * Math.PI) / 180);
            ctx.beginPath();
            ctx.ellipse(0, -14, 7, 12, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
          }
          ctx.beginPath();
          ctx.arc(0, 0, 4, 0, Math.PI * 2);
          ctx.fill();
        } else if (item.typeId === "ginkgo") {
          ctx.beginPath();
          ctx.moveTo(0, 16);
          ctx.quadraticCurveTo(0, 4, 0, 0);
          ctx.lineWidth = 2;
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(-18, -14);
          ctx.quadraticCurveTo(0, -22, 18, -14);
          ctx.quadraticCurveTo(12, 2, 0, 4);
          ctx.quadraticCurveTo(-12, 2, -18, -14);
          ctx.fill();
        } else if (item.typeId === "clover") {
          for (let c = 0; c < 4; c++) {
            ctx.save();
            ctx.rotate((c * 90 * Math.PI) / 180);
            ctx.beginPath();
            ctx.arc(-5, -10, 6, 0, Math.PI * 2);
            ctx.arc(5, -10, 6, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
          }
          ctx.beginPath();
          ctx.arc(0, 0, 3, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Fern / Leaf Sprig fallback
          for (let l = -3; l <= 3; l++) {
            ctx.beginPath();
            ctx.ellipse(l * 4, l * 4, 4, 10, Math.PI / 4, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
      ctx.restore();
    });

    // Inscription Calligraphy
    if (customInscription.trim()) {
      ctx.fillStyle = "#3D2E24";
      ctx.font = "italic 20px Georgia, serif";
      ctx.textAlign = "center";
      ctx.fillText(`“${customInscription}”`, 320, by + bh - 72);
    }

    // Artist Watermark Seal
    ctx.fillStyle = "#8C5835";
    ctx.font = "12px monospace";
    ctx.textAlign = "center";
    ctx.fillText("STUDIO GHIBLI JOURNAL • KRITIKA MANANDHAR", 320, by + bh - 36);

    // Trigger PNG Download
    const dataUrl = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = `ghibli-pressed-flower-bookmark-${Date.now()}.png`;
    link.href = dataUrl;
    link.click();
  }, [activePaper, activeTassel, stampedItems, customInscription]);

  return (
    <section
      id="greenhouse"
      className="min-h-screen w-full flex items-center justify-center px-4 sm:px-6 py-20 relative z-10"
    >
      <ParchmentScroll maxWidth="max-w-5xl">
        {/* Section Header */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3 pr-10">
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wider text-[#6B8A68] bg-[#6B8A68]/15 border border-[#6B8A68]/35 flex items-center gap-1.5 shadow-2xs">
            <Flower2 className="w-3.5 h-3.5 text-[#6B8A68]" />
            <span>Section 04 • The Greenhouse Pressed-Flower Studio</span>
          </span>

          <button
            type="button"
            onClick={() => setShowCredentials(true)}
            className="px-2.5 py-1 rounded-md bg-[#FFFDF7] hover:bg-[#F5ECD2] border border-[#C29B72]/60 text-[11px] font-serif font-semibold text-[#5C381E] flex items-center gap-1.5 shadow-2xs cursor-pointer transition-all active:scale-95"
          >
            <GraduationCap className="w-3.5 h-3.5 text-[#6B8A68]" />
            <span>Scholar Credentials</span>
          </button>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#3D2E24] tracking-tight mb-1">
            Pressed-Flower Bookmark &amp; Wax Seal Studio
          </h2>
          <p className="text-xs sm:text-[13px] text-[#5C381E]/80 font-serif leading-relaxed">
            Pick dried herbarium botanicals, stamp artisan wax seals, and design your personal Ghibli bookmark to take home.
          </p>
        </div>

        {/* Studio Workspace: 2-Column Crafting Studio */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Panel: Palette, Specimen Trays & Customizer (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {/* Category Selector Tabs */}
            <div className="flex items-center gap-2 border-b border-[#C29B72]/40 pb-2">
              <button
                type="button"
                onClick={() => setActiveCategory("botanical")}
                className={`px-3 py-1 rounded-full text-xs font-serif transition-all flex items-center gap-1.5 border cursor-pointer ${
                  activeCategory === "botanical"
                    ? "bg-[#6B8A68] text-white border-[#536E50] shadow-xs font-medium"
                    : "bg-[#FAF5E8] text-[#5C381E]/80 border-[#C29B72]/50 hover:bg-[#F3ECE1]"
                }`}
              >
                <Sprout className="w-3.5 h-3.5" />
                <span>Pressed Botanicals</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveCategory("wax_seal")}
                className={`px-3 py-1 rounded-full text-xs font-serif transition-all flex items-center gap-1.5 border cursor-pointer ${
                  activeCategory === "wax_seal"
                    ? "bg-[#C0392B] text-white border-[#9E2A1D] shadow-xs font-medium"
                    : "bg-[#FAF5E8] text-[#5C381E]/80 border-[#C29B72]/50 hover:bg-[#F3ECE1]"
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Artisan Wax Seals</span>
              </button>
            </div>

            {/* Specimen / Stamp Selection Grid */}
            <div className="p-3 rounded-xl bg-[#FFFDF7] border border-[#C29B72]/45 shadow-2xs">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#C29B72] block mb-2 font-bold">
                {activeCategory === "botanical" ? "Select Dried Botanical Specimen" : "Select Artisan Wax Seal"}
              </span>

              <div className="grid grid-cols-3 sm:grid-cols-3 gap-2">
                {SPECIMEN_OPTIONS.filter((s) => s.category === activeCategory).map((specimen) => {
                  const isSelected = selectedSpecimenId === specimen.id;
                  return (
                    <button
                      key={specimen.id}
                      type="button"
                      onClick={() => {
                        setSelectedSpecimenId(specimen.id);
                        setActiveInkColor(specimen.defaultColor);
                        if (chimeEngine) chimeEngine.playPaperRustle();
                      }}
                      className={`p-2 rounded-lg border text-left transition-all flex flex-col items-center justify-center gap-1.5 cursor-pointer select-none active:scale-95 ${
                        isSelected
                          ? "bg-[#FAF5E8] border-[#6B8A68] ring-2 ring-[#6B8A68]/30 shadow-xs"
                          : "bg-white border-[#C29B72]/35 hover:border-[#6B8A68]/60 hover:bg-[#FAF8F2]"
                      }`}
                    >
                      {specimen.category === "wax_seal" ? (
                        <div className="w-8 h-8 rounded-full border-2 border-[#C0392B] bg-[#C0392B]/10 flex items-center justify-center font-bold text-[#C0392B] font-serif text-xs">
                          {specimen.character}
                        </div>
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-[#6B8A68]/15 border border-[#6B8A68]/30 flex items-center justify-center text-[#6B8A68]">
                          {specimen.id === "sakura" && <Flower2 className="w-4 h-4 text-[#D0684D]" />}
                          {specimen.id === "ginkgo" && <span className="text-sm">🌿</span>}
                          {specimen.id === "clover" && <span className="text-sm">🍀</span>}
                          {specimen.id === "fern" && <span className="text-sm">🍃</span>}
                          {specimen.id === "lavender" && <span className="text-sm">🌾</span>}
                          {specimen.id === "mushroom" && <span className="text-sm">🍄</span>}
                        </div>
                      )}
                      <span className="text-[11px] font-serif text-[#3D2E24] text-center leading-tight">
                        {specimen.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Ink & Paper Customizer Controls */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Ink Palette */}
              <div className="p-3 rounded-xl bg-[#FFFDF7] border border-[#C29B72]/45 shadow-2xs">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#C29B72] block mb-2 font-bold">
                  Ink Pigment
                </span>
                <div className="flex items-center gap-2">
                  {INK_PALETTE.map((ink) => (
                    <button
                      key={ink.name}
                      type="button"
                      onClick={() => setActiveInkColor(ink.color)}
                      className={`w-7 h-7 rounded-full border-2 transition-transform cursor-pointer relative ${
                        activeInkColor === ink.color ? "scale-115 border-[#3D2E24] shadow-xs" : "border-white/80 hover:scale-105"
                      }`}
                      style={{ backgroundColor: ink.color }}
                      title={ink.name}
                    />
                  ))}
                </div>
              </div>

              {/* Paper Tints */}
              <div className="p-3 rounded-xl bg-[#FFFDF7] border border-[#C29B72]/45 shadow-2xs">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#C29B72] block mb-2 font-bold">
                  Paper Texture Tint
                </span>
                <div className="flex items-center gap-2">
                  {PAPER_TINTS.map((tint) => (
                    <button
                      key={tint.id}
                      type="button"
                      onClick={() => setActivePaper(tint)}
                      className={`w-7 h-7 rounded-md border transition-transform cursor-pointer ${
                        activePaper.id === tint.id ? "scale-115 border-[#3D2E24] shadow-xs ring-2 ring-[#C29B72]/50" : "border-[#C29B72]/50 hover:scale-105"
                      }`}
                      style={{ backgroundColor: tint.bg }}
                      title={tint.name}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Inscription & Tassel */}
            <div className="p-3 rounded-xl bg-[#FFFDF7] border border-[#C29B72]/45 shadow-2xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#C29B72] font-bold">
                  Custom Calligraphy Inscription
                </span>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-mono text-[#5C381E]/70">Silk Tassel:</span>
                  {TASSEL_COLORS.map((tassel) => (
                    <button
                      key={tassel.name}
                      type="button"
                      onClick={() => setActiveTassel(tassel)}
                      className={`w-4 h-4 rounded-full border cursor-pointer ${
                        activeTassel.name === tassel.name ? "ring-2 ring-[#3D2E24]" : ""
                      }`}
                      style={{ backgroundColor: tassel.color }}
                      title={tassel.name}
                    />
                  ))}
                </div>
              </div>

              <input
                type="text"
                maxLength={45}
                value={customInscription}
                onChange={(e) => setCustomInscription(e.target.value)}
                placeholder="Type your name or quiet motto..."
                className="w-full px-3 py-1.5 text-xs font-serif italic text-[#3D2E24] bg-[#FAF5E8] border border-[#C29B72]/50 rounded-md focus:outline-none focus:border-[#6B8A68]"
              />
            </div>

            {/* Action Buttons: Undo, Randomize, Clear, Download */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#C29B72]/40">
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handleUndo}
                  disabled={stampedItems.length === 0}
                  className="px-2.5 py-1 rounded-md border border-[#C29B72]/50 bg-[#FAF5E8] hover:bg-[#F3ECE1] text-[11px] font-serif text-[#5C381E] disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1 cursor-pointer transition-all active:scale-95 shadow-2xs"
                  title="Undo last stamp"
                >
                  <RotateCcw className="w-3 h-3 text-[#5C381E]" />
                  <span>Undo</span>
                </button>

                <button
                  type="button"
                  onClick={handleRandomize}
                  className="px-2.5 py-1 rounded-md border border-[#C29B72]/50 bg-[#FAF5E8] hover:bg-[#F3ECE1] text-[11px] font-serif text-[#5C381E] flex items-center gap-1 cursor-pointer transition-all active:scale-95 shadow-2xs"
                  title="Surprise me with artistic arrangement"
                >
                  <Shuffle className="w-3 h-3 text-[#6B8A68]" />
                  <span>Surprise Me</span>
                </button>

                <button
                  type="button"
                  onClick={handleClear}
                  disabled={stampedItems.length === 0}
                  className="px-2.5 py-1 rounded-md border border-[#C29B72]/50 bg-[#FAF5E8] hover:bg-[#F3ECE1] text-[11px] font-serif text-[#D0684D] disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1 cursor-pointer transition-all active:scale-95 shadow-2xs"
                  title="Clear bookmark"
                >
                  <Trash2 className="w-3 h-3 text-[#D0684D]" />
                  <span>Clear</span>
                </button>
              </div>

              {/* Download PNG Keepsake Button */}
              <button
                type="button"
                onClick={handleDownloadKeepsake}
                className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-[#6B8A68] to-[#557852] hover:from-[#5C7859] hover:to-[#4A6847] text-white text-xs font-serif font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer active:scale-95"
              >
                <Download className="w-3.5 h-3.5 text-white" />
                <span>Keep Bookmark (.PNG)</span>
              </button>
            </div>
          </div>

          {/* Right Panel: The Interactive Bookmark Craft Table (5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <span className="text-[11px] font-serif italic text-[#5C381E]/75 mb-2 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#D0684D]" />
              <span>Tap on the bookmark to stamp your botanicals</span>
            </span>

            {/* The Bookmark Canvas Container */}
            <div className="relative pt-8 pb-3 select-none flex flex-col items-center">
              {/* Hanging Silk Cord & Tassel */}
              <div className="absolute top-0 z-20 flex flex-col items-center pointer-events-none">
                <div
                  className="w-1 h-8 rounded-full shadow-2xs"
                  style={{ backgroundColor: activeTassel.color }}
                />
                <div
                  className="w-4 h-4 rounded-full border-2 border-white/60 shadow-xs -mt-1"
                  style={{ backgroundColor: activeTassel.color }}
                />
                <div
                  className="w-2.5 h-6 rounded-b-md shadow-2xs -mt-0.5 opacity-90"
                  style={{ backgroundColor: activeTassel.color }}
                />
              </div>

              {/* Interactive Bookmark Surface */}
              <div
                ref={bookmarkRef}
                onClick={handleBookmarkClick}
                className="w-[200px] sm:w-[220px] h-[440px] sm:h-[460px] rounded-lg relative overflow-hidden shadow-[0_16px_36px_rgba(45,25,10,0.22),0_2px_8px_rgba(0,0,0,0.06)] border cursor-crosshair transition-colors duration-300 group"
                style={{
                  backgroundColor: activePaper.bg,
                  borderColor: activePaper.border,
                }}
                title="Click to stamp here!"
              >
                {/* Subtle paper grain border */}
                <div
                  className="absolute inset-2 border rounded-sm pointer-events-none"
                  style={{ borderColor: `${activePaper.border}70` }}
                />

                {/* Top Brass Eyelet Grommet */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#C29B72] border border-[#8C5835] flex items-center justify-center shadow-2xs pointer-events-none">
                  <div
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: activePaper.bg }}
                  />
                </div>

                {/* Placed Stamped Items */}
                {stampedItems.map((item) => (
                  <div
                    key={item.id}
                    className="absolute pointer-events-none transform -translate-x-1/2 -translate-y-1/2 select-none animate-in fade-in zoom-in-75 duration-200"
                    style={{
                      left: `${item.xPercent}%`,
                      top: `${item.yPercent}%`,
                      transform: `translate(-50%, -50%) rotate(${item.rotation}deg) scale(${item.scale})`,
                      color: item.color,
                    }}
                  >
                    {item.category === "wax_seal" ? (
                      <div
                        className="w-8 h-8 rounded-full border-2 flex items-center justify-center font-serif font-bold text-xs select-none shadow-2xs"
                        style={{
                          borderColor: item.color,
                          backgroundColor: `${item.color}15`,
                          color: item.color,
                        }}
                      >
                        {item.character || "KM"}
                      </div>
                    ) : (
                      <div className="select-none drop-shadow-[0_1px_2px_rgba(0,0,0,0.15)]">
                        {item.typeId === "sakura" && (
                          <Flower2
                            className="w-6 h-6"
                            style={{ color: item.color }}
                          />
                        )}
                        {item.typeId === "ginkgo" && (
                          <span className="text-xl leading-none">🌿</span>
                        )}
                        {item.typeId === "clover" && (
                          <span className="text-xl leading-none">🍀</span>
                        )}
                        {item.typeId === "fern" && (
                          <span className="text-xl leading-none">🍃</span>
                        )}
                        {item.typeId === "lavender" && (
                          <span className="text-xl leading-none">🌾</span>
                        )}
                        {item.typeId === "mushroom" && (
                          <span className="text-xl leading-none">🍄</span>
                        )}
                      </div>
                    )}
                  </div>
                ))}

                {/* User Inscription Calligraphy (Bottom) */}
                {customInscription.trim() && (
                  <div className="absolute bottom-8 inset-x-3 text-center pointer-events-none">
                    <p className="font-serif italic text-[11px] text-[#3D2E24]/85 leading-tight px-1 break-words">
                      “{customInscription}”
                    </p>
                  </div>
                )}

                {/* Studio Ghibli micro mark */}
                <div className="absolute bottom-2 inset-x-2 text-center pointer-events-none opacity-60">
                  <span className="text-[7px] font-mono tracking-widest text-[#5C381E] uppercase">
                    Studio Ghibli • Kritika
                  </span>
                </div>
              </div>

              {/* Status bar */}
              <div className="mt-2 text-center text-[10px] font-mono text-[#5C381E]/70">
                <span>{stampedItems.length} specimens stamped</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scholar & Developer Credentials Modal */}
        {showCredentials && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-xs">
            <div className="max-w-md w-full bg-[#FAF5E8] p-5 sm:p-6 relative rounded-lg border-2 border-[#C29B72] shadow-2xl animate-in fade-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between mb-3 border-b border-[#C29B72]/40 pb-2">
                <div className="flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-[#6B8A68]" />
                  <span className="font-serif font-bold text-sm text-[#3D2E24]">
                    Scholar &amp; Developer Guild Credentials
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowCredentials(false)}
                  className="p-1 rounded-md text-[#5C381E]/60 hover:text-[#D0684D] hover:bg-black/5 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3 mb-4">
                {/* Degree */}
                <div className="p-3 rounded-md bg-[#FFFDF7] border border-[#C29B72]/40">
                  <span className="text-[9px] font-mono uppercase text-[#6B8A68] font-bold">
                    Academic Genus
                  </span>
                  <h4 className="font-serif font-bold text-xs sm:text-sm text-[#3D2E24]">
                    B.Sc. Computer Science &amp; IT
                  </h4>
                  <p className="text-[11px] text-[#5C381E]/80 font-serif">
                    Padmakanya Multiple Campus, Tribhuvan University (2022 – 2026)
                  </p>
                  <p className="text-[10px] text-[#5C381E]/60 italic mt-0.5">
                    Kathmandu, Nepal • Core algorithms, OOP, database design, and systems engineering.
                  </p>
                </div>

                {/* Vocational Diploma */}
                <div className="p-3 rounded-md bg-[#FFFDF7] border border-[#C29B72]/40">
                  <span className="text-[9px] font-mono uppercase text-[#D0684D] font-bold">
                    Practical Cultivation
                  </span>
                  <h4 className="font-serif font-bold text-xs sm:text-sm text-[#3D2E24]">
                    Web Design Accredited Training
                  </h4>
                  <p className="text-[11px] text-[#5C381E]/80 font-serif">
                    Broadway Infosys Nepal (Accredited Professional Diploma)
                  </p>
                  <p className="text-[10px] text-[#5C381E]/60 italic mt-0.5">
                    Modern responsive frontend architecture, Figma prototyping, and web standards.
                  </p>
                </div>

                {/* GitHub Guild */}
                <div className="p-3 rounded-md bg-[#FFFDF7] border border-[#C29B72]/40 flex items-center justify-between gap-2">
                  <div>
                    <span className="text-[9px] font-mono uppercase text-[#8C5835] font-bold">
                      Open Source Guild
                    </span>
                    <h4 className="font-serif font-bold text-xs sm:text-sm text-[#3D2E24]">
                      github.com/KritikaManandhar
                    </h4>
                  </div>
                  <a
                    href="https://github.com/KritikaManandhar"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-1 rounded-md bg-[#6B8A68] hover:bg-[#5A7757] text-white text-[11px] font-serif font-semibold shadow-2xs flex items-center gap-1"
                  >
                    <GithubIcon className="w-3 h-3" />
                    <span>Profile &rarr;</span>
                  </a>
                </div>
              </div>

              <div className="text-right pt-2 border-t border-[#C29B72]/40">
                <button
                  type="button"
                  onClick={() => setShowCredentials(false)}
                  className="px-3.5 py-1 rounded-md bg-[#FAF3E0] hover:bg-[#F2E5C4] border border-[#C29B72]/70 text-xs font-serif font-semibold text-[#3D2E24] cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            </div>
          </div>
        )}
      </ParchmentScroll>
    </section>
  );
}
