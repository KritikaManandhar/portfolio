"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";

interface GhibliScrollCanvasProps {
  scrollProgress: number; // 0.0 to 1.0
  onFrameChange?: (frameIndex: number, totalFrames: number) => void;
}

const TOTAL_FRAMES = 150;

// Deterministic seed for frozen-on-stop particles
const DUST_MOTES = Array.from({ length: 45 }, (_, i) => ({
  x: (i * 137.5) % 100, // percentage 0-100
  y: (i * 93.3) % 100,
  speedY: 0.6 + (i % 5) * 0.25,
  driftX: Math.sin(i * 1.5) * 35,
  size: 1.2 + (i % 4) * 0.8,
  baseAlpha: 0.25 + (i % 3) * 0.15,
}));

const SAKURA_PETALS = Array.from({ length: 24 }, (_, i) => ({
  x: (i * 73.1 + 15) % 100,
  y: (i * 111.7) % 100,
  speedY: 1.1 + (i % 4) * 0.4,
  driftX: Math.cos(i * 2.1) * 60,
  size: 9 + (i % 5) * 2.5,
  rotSpeed: (i % 7) - 3,
  color: i % 2 === 0 ? "#F4ACB7" : "#FFD1DC",
}));

const OLIVE_LEAVES = Array.from({ length: 18 }, (_, i) => ({
  x: (i * 89.3 + 5) % 100,
  y: (i * 123.4) % 100,
  speedY: 0.9 + (i % 3) * 0.35,
  driftX: Math.sin(i * 1.8) * 50,
  size: 14 + (i % 4) * 3,
  rotSpeed: (i % 5) - 2.5,
  color: i % 2 === 0 ? "#7A9A7E" : "#8EA885",
}));

export default function GhibliScrollCanvas({
  scrollProgress,
  onFrameChange,
}: GhibliScrollCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const keyframeImagesRef = useRef<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState<boolean>(false);
  const [loadedCount, setLoadedCount] = useState<number>(0);

  // Smooth lerped progress state
  const currentProgressRef = useRef<number>(0);
  const targetProgressRef = useRef<number>(0);

  useEffect(() => {
    targetProgressRef.current = Math.max(0, Math.min(1, scrollProgress));
  }, [scrollProgress]);

  // Preload Keyframe Images
  useEffect(() => {
    let isMounted = true;
    const candidates = [
      ["/frame-1.png", "/frames/frame-1.png"],
      ["/frame-2.png", "/frames/frame-2.png"],
      ["/frame-3.png", "/frames/frame-3.png"],
      ["/frame-4.png", "/frames/frame-4.png"],
      ["/frame-5.png", "/frames/frame-5.png"],
    ];

    const loadedImgs: HTMLImageElement[] = [];
    let count = 0;

    candidates.forEach((paths, index) => {
      const img = new Image();
      let pathIdx = 0;

      const tryNextPath = () => {
        pathIdx++;
        if (pathIdx < paths.length) {
          img.src = paths[pathIdx];
        }
      };

      img.onload = () => {
        if (!isMounted) return;
        loadedImgs[index] = img;
        count++;
        setLoadedCount(count);
        if (count >= 5) {
          keyframeImagesRef.current = loadedImgs;
          setImagesLoaded(true);
        }
      };

      img.onerror = () => {
        tryNextPath();
      };

      img.src = paths[0];
    });

    return () => {
      isMounted = false;
    };
  }, []);

  // Helper to draw cover-fit image with pan & zoom
  const drawCoverImage = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      img: HTMLImageElement,
      w: number,
      h: number,
      alpha: number,
      panX: number,
      panY: number,
      zoom: number
    ) => {
      if (alpha <= 0.001) return;

      const imgRatio = img.width / img.height;
      const canvasRatio = w / h;
      let dw: number, dh: number, dx: number, dy: number;

      if (canvasRatio > imgRatio) {
        dw = w;
        dh = w / imgRatio;
        dx = 0;
        dy = (h - dh) / 2;
      } else {
        dh = h;
        dw = h * imgRatio;
        dy = 0;
        dx = (w - dw) / 2;
      }

      ctx.save();
      ctx.globalAlpha = Math.max(0, Math.min(1, alpha));
      ctx.translate(w / 2, h / 2);
      ctx.scale(zoom, zoom);
      ctx.translate(-w / 2 + panX, -h / 2 + panY);
      ctx.drawImage(img, dx, dy, dw, dh);
      ctx.restore();
    },
    []
  );

  // Procedural Studio Ghibli Fallback Renderer
  const renderProceduralGhibli = useCallback(
    (ctx: CanvasRenderingContext2D, w: number, h: number, p: number) => {
      // 5 Sections:
      // 0.00-0.20: Sunlit Desk
      // 0.20-0.40: Botanist Shelf
      // 0.40-0.60: Field Journal Table
      // 0.60-0.80: Glass Greenhouse
      // 0.80-1.00: Sunset Terrace & Postbox

      // Base Background Gradient shifting with journey
      const grad = ctx.createLinearGradient(0, 0, 0, h);
      if (p < 0.25) {
        // Morning Golden Sky
        grad.addColorStop(0, "#C7E3E1");
        grad.addColorStop(0.45, "#E8F0E4");
        grad.addColorStop(1, "#FAF3E0");
      } else if (p < 0.5) {
        // Warm Oak Study
        grad.addColorStop(0, "#E2D9C8");
        grad.addColorStop(0.5, "#D8C7B0");
        grad.addColorStop(1, "#C2AF94");
      } else if (p < 0.75) {
        // Lush Greenhouse Emerald
        grad.addColorStop(0, "#B8D4C8");
        grad.addColorStop(0.45, "#9EBFAD");
        grad.addColorStop(1, "#7D9D8B");
      } else {
        // Twilight Sunset Glow (Ghibli Magic Hour)
        grad.addColorStop(0, "#4A4E69");
        grad.addColorStop(0.35, "#9A8C98");
        grad.addColorStop(0.65, "#F4ACB7");
        grad.addColorStop(0.85, "#E07A5F");
        grad.addColorStop(1, "#F3C68F");
      }
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // Section 1: The Sunlit Desk (p: 0.0 -> 0.2)
      if (p < 0.25) {
        const localP = p / 0.25;
        // Window frame
        const winW = w * 0.42;
        const winH = h * 0.55;
        const winX = w * 0.48 - localP * 60;
        const winY = h * 0.12;

        ctx.fillStyle = "#A8C5C8";
        ctx.fillRect(winX, winY, winW, winH);

        // Window Sill & Wooden Frame
        ctx.strokeStyle = "#8C6D53";
        ctx.lineWidth = 14;
        ctx.strokeRect(winX, winY, winW, winH);
        ctx.beginPath();
        ctx.moveTo(winX + winW / 2, winY);
        ctx.lineTo(winX + winW / 2, winY + winH);
        ctx.moveTo(winX, winY + winH * 0.4);
        ctx.lineTo(winX + winW, winY + winH * 0.4);
        ctx.stroke();

        // Fluffy Ghibli Clouds outside window
        ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
        ctx.beginPath();
        ctx.arc(winX + winW * 0.35, winY + winH * 0.3, 38, 0, Math.PI * 2);
        ctx.arc(winX + winW * 0.52, winY + winH * 0.26, 48, 0, Math.PI * 2);
        ctx.arc(winX + winW * 0.68, winY + winH * 0.32, 34, 0, Math.PI * 2);
        ctx.fill();

        // Golden Sunbeams
        const beamGrad = ctx.createLinearGradient(winX, winY, winX - 200, h * 0.85);
        beamGrad.addColorStop(0, "rgba(255, 248, 220, 0.45)");
        beamGrad.addColorStop(1, "rgba(255, 248, 220, 0.0)");
        ctx.fillStyle = beamGrad;
        ctx.beginPath();
        ctx.moveTo(winX + 20, winY + 20);
        ctx.lineTo(winX + winW - 20, winY + 20);
        ctx.lineTo(winX + winW + 80, h * 0.85);
        ctx.lineTo(winX - 120, h * 0.85);
        ctx.closePath();
        ctx.fill();

        // Oak Desk Surface
        ctx.fillStyle = "#A27B5C";
        ctx.fillRect(0, h * 0.72, w, h * 0.28);
        ctx.fillStyle = "#876445";
        ctx.fillRect(0, h * 0.72, w, 8);

        // Steaming Matcha Mug on desk
        const mugX = w * 0.32 - localP * 40;
        const mugY = h * 0.76;
        ctx.fillStyle = "#6F8A74"; // matcha ceramic green
        ctx.beginPath();
        ctx.roundRect(mugX, mugY, 44, 48, [4, 4, 12, 12]);
        ctx.fill();
        // Mug handle
        ctx.strokeStyle = "#5A735E";
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.arc(mugX + 46, mugY + 24, 12, -Math.PI / 2, Math.PI / 2);
        ctx.stroke();

        // Sleepy Calico Cat sleeping curled on desk
        const catX = w * 0.64;
        const catY = h * 0.77;
        ctx.fillStyle = "#F5EBE0";
        ctx.beginPath();
        ctx.ellipse(catX, catY, 48, 28, 0, 0, Math.PI * 2);
        ctx.fill();
        // Calico Ginger & Dark Patches
        ctx.fillStyle = "#D47A43";
        ctx.beginPath();
        ctx.arc(catX - 12, catY - 8, 16, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#3D352E";
        ctx.beginPath();
        ctx.arc(catX + 16, catY - 6, 12, 0, Math.PI * 2);
        ctx.fill();
        // Cat Head & Ears
        ctx.fillStyle = "#F5EBE0";
        ctx.beginPath();
        ctx.arc(catX - 34, catY + 4, 18, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#D47A43";
        ctx.beginPath();
        ctx.moveTo(catX - 44, catY - 8);
        ctx.lineTo(catX - 38, catY - 2);
        ctx.lineTo(catX - 48, catY + 2);
        ctx.fill();
      }

      // Section 2: Botanist Bookshelf (p: 0.20 -> 0.40)
      if (p >= 0.15 && p <= 0.45) {
        const localP = (p - 0.15) / 0.3;
        const alpha = Math.sin(localP * Math.PI);
        ctx.save();
        ctx.globalAlpha = Math.max(0, Math.min(1, alpha));

        // Oak Shelves
        const shelfY1 = h * 0.35;
        const shelfY2 = h * 0.68;
        ctx.fillStyle = "#6F4E37";
        ctx.fillRect(w * 0.1, shelfY1, w * 0.8, 16);
        ctx.fillRect(w * 0.1, shelfY2, w * 0.8, 16);

        // Books on shelf
        const bookColors = ["#7A9A7E", "#E07A5F", "#4A5568", "#D4A373", "#606C38", "#BC6C25"];
        bookColors.forEach((color, i) => {
          ctx.fillStyle = color;
          ctx.fillRect(w * 0.14 + i * 36, shelfY1 - 70 - (i % 3) * 12, 28, 70 + (i % 3) * 12);
          // Gold title embossing
          ctx.fillStyle = "rgba(255, 230, 160, 0.6)";
          ctx.fillRect(w * 0.14 + i * 36 + 6, shelfY1 - 55, 4, 30);
        });

        // Brass Globe on top shelf
        const globeX = w * 0.72;
        const globeY = shelfY1 - 54;
        ctx.strokeStyle = "#C59B27";
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.arc(globeX, globeY, 34, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fillStyle = "#709775";
        ctx.beginPath();
        ctx.arc(globeX, globeY, 30, 0, Math.PI * 2);
        ctx.fill();
        // Stand
        ctx.strokeRect(globeX - 8, shelfY1 - 16, 16, 16);

        // Terracotta Potted Plant with trailing ivy
        const potX = w * 0.22;
        const potY = shelfY2 - 38;
        ctx.fillStyle = "#C86D51";
        ctx.beginPath();
        ctx.moveTo(potX - 18, potY);
        ctx.lineTo(potX + 18, potY);
        ctx.lineTo(potX + 12, potY + 38);
        ctx.lineTo(potX - 12, potY + 38);
        ctx.closePath();
        ctx.fill();

        // Ivy Vines cascading down
        ctx.fillStyle = "#5E7D62";
        for (let j = 0; j < 8; j++) {
          ctx.beginPath();
          ctx.ellipse(potX - 8 + (j % 3) * 10, potY + 38 + j * 9, 8, 5, 0.3, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }

      // Section 3: Field Journal Drafting Table (p: 0.40 -> 0.60)
      if (p >= 0.38 && p <= 0.65) {
        const localP = (p - 0.38) / 0.27;
        const alpha = Math.sin(localP * Math.PI);
        ctx.save();
        ctx.globalAlpha = Math.max(0, Math.min(1, alpha));

        // Tilted drafting board
        const boardX = w * 0.25;
        const boardY = h * 0.28;
        const boardW = w * 0.52;
        const boardH = h * 0.52;

        ctx.fillStyle = "#C49A6C";
        ctx.fillRect(boardX, boardY, boardW, boardH);

        // Open field journal pages
        ctx.fillStyle = "#FDFBF7";
        ctx.fillRect(boardX + 24, boardY + 24, boardW - 48, boardH - 48);
        // Center spine shadow
        ctx.fillStyle = "rgba(100, 80, 60, 0.15)";
        ctx.fillRect(boardX + boardW / 2 - 8, boardY + 24, 16, boardH - 48);

        // Pinned watercolor sketches & floral specimen illustrations
        ctx.fillStyle = "rgba(244, 172, 183, 0.7)";
        ctx.beginPath();
        ctx.arc(boardX + boardW * 0.3, boardY + boardH * 0.4, 28, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "rgba(122, 154, 126, 0.7)";
        ctx.beginPath();
        ctx.ellipse(boardX + boardW * 0.3, boardY + boardH * 0.55, 14, 34, 0.4, 0, Math.PI * 2);
        ctx.fill();

        // Washi tape accent on postcard
        ctx.fillStyle = "rgba(224, 122, 95, 0.55)";
        ctx.fillRect(boardX + boardW * 0.65, boardY + 40, 48, 14);

        ctx.restore();
      }

      // Section 4: The Glass Greenhouse / Conservatory (p: 0.60 -> 0.80)
      if (p >= 0.58 && p <= 0.85) {
        const localP = (p - 0.58) / 0.27;
        const alpha = Math.sin(localP * Math.PI);
        ctx.save();
        ctx.globalAlpha = Math.max(0, Math.min(1, alpha));

        // Glass conservatory arches & mullions
        ctx.strokeStyle = "rgba(255, 255, 255, 0.45)";
        ctx.lineWidth = 10;
        ctx.beginPath();
        ctx.moveTo(w * 0.15, h);
        ctx.lineTo(w * 0.15, h * 0.4);
        ctx.quadraticCurveTo(w * 0.5, h * 0.08, w * 0.85, h * 0.4);
        ctx.lineTo(w * 0.85, h);
        ctx.stroke();

        // Hanging Boston Ferns
        const fernColors = ["#4A7C59", "#68B0AB", "#3A6351", "#8FC0A9"];
        [0.28, 0.5, 0.72].forEach((ratio, idx) => {
          const fx = w * ratio;
          const fy = h * 0.32;
          ctx.strokeStyle = "#8A7968";
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.moveTo(fx, 0);
          ctx.lineTo(fx, fy);
          ctx.stroke();

          // Planter
          ctx.fillStyle = "#C86D51";
          ctx.beginPath();
          ctx.arc(fx, fy + 12, 18, 0, Math.PI);
          ctx.fill();

          // Lush hanging fronds
          ctx.fillStyle = fernColors[idx % fernColors.length];
          for (let k = 0; k < 12; k++) {
            const angle = (k / 12) * Math.PI;
            ctx.beginPath();
            ctx.ellipse(fx + Math.cos(angle) * 32, fy + 24 + Math.sin(angle) * 22, 16, 6, angle, 0, Math.PI * 2);
            ctx.fill();
          }
        });

        ctx.restore();
      }

      // Section 5: The Sunset Terrace & Paper Airplane (p: 0.78 -> 1.0)
      if (p >= 0.75) {
        const localP = (p - 0.75) / 0.25;

        // Glowing sunset sun orb
        const sunX = w * 0.72;
        const sunY = h * 0.38 + localP * 40;
        const sunGrad = ctx.createRadialGradient(sunX, sunY, 10, sunX, sunY, 110);
        sunGrad.addColorStop(0, "rgba(255, 240, 180, 0.95)");
        sunGrad.addColorStop(0.4, "rgba(255, 175, 120, 0.65)");
        sunGrad.addColorStop(1, "rgba(255, 140, 100, 0.0)");
        ctx.fillStyle = sunGrad;
        ctx.beginPath();
        ctx.arc(sunX, sunY, 110, 0, Math.PI * 2);
        ctx.fill();

        // Rolling silhouette hills in distance
        ctx.fillStyle = "#3D2B3D";
        ctx.beginPath();
        ctx.moveTo(0, h * 0.76);
        ctx.quadraticCurveTo(w * 0.3, h * 0.65, w * 0.65, h * 0.78);
        ctx.quadraticCurveTo(w * 0.85, h * 0.72, w, h * 0.82);
        ctx.lineTo(w, h);
        ctx.lineTo(0, h);
        ctx.closePath();
        ctx.fill();

        // Stone Balustrade
        ctx.fillStyle = "#2D1E2F";
        ctx.fillRect(0, h * 0.86, w, h * 0.14);
        for (let b = 0; b < 16; b++) {
          ctx.fillRect(w * 0.05 + b * (w * 0.06), h * 0.83, 14, h * 0.06);
        }

        // Terracotta Postbox on terrace
        const pbX = w * 0.2;
        const pbY = h * 0.72;
        ctx.fillStyle = "#E07A5F";
        ctx.beginPath();
        ctx.roundRect(pbX, pbY, 44, 60, [18, 18, 4, 4]);
        ctx.fill();
        ctx.fillStyle = "#3D352E";
        ctx.fillRect(pbX + 8, pbY + 16, 28, 4); // letter slot

        // Gliding Paper Airplane soaring into sunset
        const planeX = w * (0.3 + localP * 0.55);
        const planeY = h * (0.65 - localP * 0.35 + Math.sin(localP * 4) * 0.04);
        ctx.save();
        ctx.translate(planeX, planeY);
        ctx.rotate(-0.35 + Math.sin(localP * 3) * 0.1);

        // Airplane flight dash trail
        ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
        ctx.setLineDash([6, 6]);
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(-120, 45);
        ctx.quadraticCurveTo(-60, 20, 0, 0);
        ctx.stroke();
        ctx.setLineDash([]);

        // Paper Plane SVG-like fold
        ctx.fillStyle = "#FFFFFF";
        ctx.beginPath();
        ctx.moveTo(28, 0);
        ctx.lineTo(-24, -14);
        ctx.lineTo(-12, 0);
        ctx.closePath();
        ctx.fill();
        ctx.fillStyle = "#E8E8E8";
        ctx.beginPath();
        ctx.moveTo(28, 0);
        ctx.lineTo(-24, 14);
        ctx.lineTo(-12, 0);
        ctx.closePath();
        ctx.fill();
        ctx.fillStyle = "#D6D6D6";
        ctx.beginPath();
        ctx.moveTo(28, 0);
        ctx.lineTo(-12, 0);
        ctx.lineTo(-16, 6);
        ctx.closePath();
        ctx.fill();

        ctx.restore();
      }
    },
    []
  );

  // Main Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let animId: number;

    const render = () => {
      // Smooth lerp (0.08 factor for cozy film scrubbing)
      const diff = targetProgressRef.current - currentProgressRef.current;
      currentProgressRef.current += diff * 0.08;

      const p = currentProgressRef.current;
      const w = canvas.width;
      const h = canvas.height;

      // Update frame counter for navbar (1 to 150)
      const currentFrame = Math.min(
        TOTAL_FRAMES,
        Math.max(1, Math.round(p * (TOTAL_FRAMES - 1)) + 1)
      );
      if (onFrameChange) {
        onFrameChange(currentFrame, TOTAL_FRAMES);
      }

      // Check if Keyframe images are ready
      const keyframes = keyframeImagesRef.current;
      const hasKeyframes = keyframes.length === 5 && keyframes.every((img) => img && img.complete);

      if (hasKeyframes) {
        // Mode 2: 5-Section Continuous Cross-Dissolve with 2.5D Pan & Zoom
        // 5 Sections = 4 transitions
        const scaledP = p * 4; // 0 to 4
        const activeIdx = Math.min(3, Math.floor(scaledP));
        const nextIdx = Math.min(4, activeIdx + 1);
        const sectionProgress = scaledP - activeIdx; // 0.0 to 1.0

        // Pan and Zoom calculations
        const zoom1 = 1.0 + sectionProgress * 0.12;
        const panX1 = (sectionProgress - 0.5) * 35;
        const panY1 = (sectionProgress - 0.5) * 20;

        const zoom2 = 1.12 - (1.0 - sectionProgress) * 0.12;
        const panX2 = (sectionProgress - 1.0) * 35;
        const panY2 = (sectionProgress - 1.0) * 20;

        // Draw Base Frame
        ctx.clearRect(0, 0, w, h);
        drawCoverImage(ctx, keyframes[activeIdx], w, h, 1.0, panX1, panY1, zoom1);

        // Blend Next Frame if transitioning
        if (sectionProgress > 0.005 && activeIdx !== nextIdx) {
          drawCoverImage(
            ctx,
            keyframes[nextIdx],
            w,
            h,
            sectionProgress,
            panX2,
            panY2,
            zoom2
          );
        }
      } else {
        // Mode 3: Procedural Hand-Painted Studio Ghibli Canvas
        renderProceduralGhibli(ctx, w, h, p);
      }

      // RENDER AMBIENT SCROLL-LINKED PARTICLES (Strictly advance with scroll progress)
      // 1. Golden Dust Motes
      DUST_MOTES.forEach((mote) => {
        const moteY = ((mote.y + p * 180 * mote.speedY) % 100) * (h / 100);
        const moteX =
          ((mote.x + Math.sin(p * 8 + mote.driftX) * 8 + 100) % 100) * (w / 100);
        ctx.fillStyle = `rgba(255, 238, 180, ${mote.baseAlpha})`;
        ctx.beginPath();
        ctx.arc(moteX, moteY, mote.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // 2. Drifting Olive Leaves
      OLIVE_LEAVES.forEach((leaf) => {
        const leafY = ((leaf.y + p * 220 * leaf.speedY) % 100) * (h / 100);
        const leafX =
          ((leaf.x + Math.sin(p * 5 + leaf.driftX) * 12 + 100) % 100) * (w / 100);
        const rot = (p * 360 * leaf.rotSpeed * Math.PI) / 180;

        ctx.save();
        ctx.translate(leafX, leafY);
        ctx.rotate(rot);
        ctx.fillStyle = leaf.color;
        ctx.globalAlpha = 0.85;
        ctx.beginPath();
        ctx.ellipse(0, 0, leaf.size, leaf.size * 0.45, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // 3. Floating Sakura Blossom Petals
      SAKURA_PETALS.forEach((petal) => {
        const petalY = ((petal.y + p * 260 * petal.speedY) % 100) * (h / 100);
        const petalX =
          ((petal.x + Math.cos(p * 6 + petal.driftX) * 14 + 100) % 100) * (w / 100);
        const rot = (p * 480 * petal.rotSpeed * Math.PI) / 180;

        ctx.save();
        ctx.translate(petalX, petalY);
        ctx.rotate(rot);
        ctx.fillStyle = petal.color;
        ctx.globalAlpha = 0.8;
        ctx.beginPath();
        ctx.arc(0, 0, petal.size * 0.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [drawCoverImage, onFrameChange, renderProceduralGhibli]);

  // Resize canvas to match display size exactly
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="fixed inset-0 w-screen h-screen z-0 pointer-events-none overflow-hidden">
      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover block"
        style={{ width: "100vw", height: "100vh" }}
      />
    </div>
  );
}
