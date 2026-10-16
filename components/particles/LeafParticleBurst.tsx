"use client";

import React, { useEffect, useState, useCallback } from "react";
import { chimeEngine } from "@/components/audio/ChimeEngine";

export interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rotation: number;
  vRot: number;
  opacity: number;
  type: "leaf" | "petal" | "sparkle";
  color: string;
}

const LEAF_COLORS = ["#7A9A7E", "#5E7D62", "#A2B997", "#8EA885"];
const PETAL_COLORS = ["#F4ACB7", "#FFCCD5", "#E88C9A", "#F8D7DA"];
const SPARKLE_COLORS = ["#F3C68F", "#E07A5F", "#FFD166", "#FAF0CA"];

export function triggerLeafBurst(x: number, y: number, playAudio: boolean = true) {
  if (typeof window !== "undefined") {
    const event = new CustomEvent("ghibli-particle-burst", {
      detail: { x, y, playAudio },
    });
    window.dispatchEvent(event);
  }
}

export default function LeafParticleBurst() {
  const [particles, setParticles] = useState<Particle[]>([]);

  const spawnBurst = useCallback((x: number, y: number, playAudio: boolean = true) => {
    if (playAudio && chimeEngine) {
      chimeEngine.playChime();
    }

    const count = 12 + Math.floor(Math.random() * 6);
    const newBatch: Particle[] = [];
    const baseId = Date.now() + Math.random();

    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + (Math.random() * 0.5 - 0.25);
      const speed = 2.5 + Math.random() * 4.5;
      const typeRand = Math.random();
      const type: "leaf" | "petal" | "sparkle" =
        typeRand < 0.4 ? "leaf" : typeRand < 0.75 ? "petal" : "sparkle";

      let color = LEAF_COLORS[Math.floor(Math.random() * LEAF_COLORS.length)];
      if (type === "petal") {
        color = PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)];
      } else if (type === "sparkle") {
        color = SPARKLE_COLORS[Math.floor(Math.random() * SPARKLE_COLORS.length)];
      }

      newBatch.push({
        id: baseId + i,
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2.0, // slight initial upward boost
        size: type === "sparkle" ? 8 + Math.random() * 6 : 14 + Math.random() * 10,
        rotation: Math.random() * 360,
        vRot: (Math.random() * 10 - 5),
        opacity: 1,
        type,
        color,
      });
    }

    setParticles((prev) => [...prev.slice(-30), ...newBatch]);
  }, []);

  useEffect(() => {
    const handler = (e: Event) => {
      const customEvent = e as CustomEvent<{ x: number; y: number; playAudio?: boolean }>;
      if (customEvent.detail) {
        spawnBurst(customEvent.detail.x, customEvent.detail.y, customEvent.detail.playAudio ?? true);
      }
    };

    window.addEventListener("ghibli-particle-burst", handler);
    return () => window.removeEventListener("ghibli-particle-burst", handler);
  }, [spawnBurst]);

  // Physics animation loop
  useEffect(() => {
    if (particles.length === 0) return;

    let animId: number;
    const updatePhysics = () => {
      setParticles((prev) =>
        prev
          .map((p) => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            vy: p.vy + 0.12, // gentle gravity
            vx: p.vx * 0.98, // air drag
            rotation: p.rotation + p.vRot,
            opacity: p.opacity - 0.022,
          }))
          .filter((p) => p.opacity > 0)
      );
      animId = requestAnimationFrame(updatePhysics);
    };

    animId = requestAnimationFrame(updatePhysics);
    return () => cancelAnimationFrame(animId);
  }, [particles.length]);

  if (particles.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          style={{
            position: "absolute",
            left: `${p.x}px`,
            top: `${p.y}px`,
            transform: `translate(-50%, -50%) rotate(${p.rotation}deg)`,
            opacity: p.opacity,
            width: `${p.size}px`,
            height: `${p.size}px`,
            willChange: "transform, opacity",
          }}
        >
          {p.type === "leaf" && (
            <svg viewBox="0 0 24 24" fill={p.color} className="w-full h-full drop-shadow-sm">
              <path d="M17 3c-4.5 0-9 4.5-9 9 0 2.5 1 4.5 3 6-2-4-1-8 2-10 2.5-1.5 5-2 4-5zm-5 13c1 1.5 3 2 5 2 3.5 0 5-3.5 5-7 0-1-.2-2-.5-3-1.5 4-5 6.5-9.5 8z" />
            </svg>
          )}
          {p.type === "petal" && (
            <svg viewBox="0 0 24 24" fill={p.color} className="w-full h-full drop-shadow-sm">
              <path d="M12 2C9 5 5 9 5 13a7 7 0 0 0 14 0c0-4-4-8-7-11z" />
            </svg>
          )}
          {p.type === "sparkle" && (
            <svg viewBox="0 0 24 24" fill={p.color} className="w-full h-full drop-shadow">
              <path d="M12 0l2.5 9.5L24 12l-9.5 2.5L12 24l-2.5-9.5L0 12l9.5-2.5z" />
            </svg>
          )}
        </div>
      ))}
    </div>
  );
}
