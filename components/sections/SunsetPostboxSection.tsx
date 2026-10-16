"use client";

import React, { useState } from "react";
import { Mailbox, Mail, CheckCircle } from "lucide-react";
import { triggerLeafBurst } from "@/components/particles/LeafParticleBurst";
import { chimeEngine } from "@/components/audio/ChimeEngine";
import { PaperPlaneVector } from "@/components/ui/VectorIcons";
import ParchmentScroll from "@/components/ui/ParchmentScroll";

export default function SunsetPostboxSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSent, setIsSent] = useState<boolean>(false);
  const [airplaneFlying, setAirplaneFlying] = useState<boolean>(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    triggerLeafBurst(window.innerWidth / 2, window.innerHeight / 2, true);

    if (chimeEngine) {
      chimeEngine.playPaperRustle();
    }

    // Trigger airplane launch animation
    setAirplaneFlying(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
      setAirplaneFlying(false);

      if (chimeEngine) {
        chimeEngine.playCelebration();
      }
      triggerLeafBurst(window.innerWidth / 2, window.innerHeight * 0.4, false);
    }, 1800);
  };

  const resetForm = (e: React.MouseEvent) => {
    triggerLeafBurst(e.clientX, e.clientY, true);
    setIsSent(false);
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <section
      id="postbox"
      className="min-h-screen w-full flex items-center justify-center px-4 sm:px-6 py-20 relative z-10"
    >
      <ParchmentScroll maxWidth="max-w-4xl" sealText="信">
        {/* Section Header Tag */}
        <div className="flex items-center justify-between mb-4 pr-12">
          <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wider text-[#D0684D] bg-[#D0684D]/15 border border-[#D0684D]/35 flex items-center gap-1.5 shadow-2xs">
            <Mailbox className="w-3.5 h-3.5 text-[#D0684D]" />
            <span>Section 05 • The Sunset Terrace &amp; Postbox</span>
          </span>
          <span className="text-xs text-[#5C381E]/70 font-serif italic">
            Direct Contact
          </span>
        </div>

        <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#3D2E24] tracking-tight mb-2">
          Send a Postcard from the Terrace
        </h2>
        <p className="text-xs sm:text-sm text-[#5C381E]/80 mb-8 font-serif">
          Have an idea, project collaboration, or opportunity? Inscribe your dispatch onto the scroll.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Left Column: Direct Info */}
          <div className="md:col-span-2 space-y-5">
            <div className="p-5 rounded-xl bg-[#FFFDF7] border border-[#C29B72]/50 shadow-2xs space-y-3">
              <h3 className="font-serif font-bold text-base text-[#3D2E24] flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#D0684D]" />
                <span>Postal Dispatch</span>
              </h3>
              <p className="text-xs text-[#3D2E24]/85 leading-relaxed font-serif">
                Feel free to email directly or reach out through GitHub. Always excited to discuss web development, software engineering, or student collaborations.
              </p>

              <div className="pt-2 space-y-2 text-xs">
                <div>
                  <span className="font-serif font-semibold text-[#6B8A68]">Email: </span>
                  <a
                    href="mailto:kri.mdhr@gmail.com"
                    className="text-[#D0684D] hover:underline font-mono"
                  >
                    kri.mdhr@gmail.com
                  </a>
                </div>
                <div>
                  <span className="font-serif font-semibold text-[#6B8A68]">GitHub: </span>
                  <a
                    href="https://github.com/KritikaManandhar"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#D0684D] hover:underline font-mono"
                  >
                    KritikaManandhar
                  </a>
                </div>
                <div>
                  <span className="font-serif font-semibold text-[#6B8A68]">Studio: </span>
                  <span className="text-[#3D2E24]/80 font-serif italic">Mhepi, Kathmandu, Nepal</span>
                </div>
              </div>
            </div>

            {/* Postbox Illustration Box */}
            <div className="p-5 rounded-xl bg-[#D0684D]/10 border border-[#D0684D]/30 text-center space-y-2 shadow-2xs">
              <div className="w-12 h-12 mx-auto rounded-xl bg-[#FFFDF7] border border-[#D0684D]/40 flex items-center justify-center animate-ghibli-float shadow-2xs">
                <Mailbox className="w-6 h-6 text-[#D0684D]" />
              </div>
              <h4 className="text-xs font-serif font-bold text-[#3D2E24]">
                Terracotta Mailbox
              </h4>
              <p className="text-[11px] text-[#5C381E]/75 font-serif italic">
                Letters are folded into paper airplanes and launched into the sunset sky.
              </p>
            </div>
          </div>

          {/* Right Column: Contact Postcard Form */}
          <div className="md:col-span-3">
            {isSent ? (
              <div className="p-8 rounded-xl bg-[#FFFDF7] border border-[#6B8A68]/50 text-center space-y-4 shadow-2xs animate-in fade-in zoom-in-95 duration-300">
                <div className="w-16 h-16 mx-auto rounded-full bg-[#6B8A68]/15 border border-[#6B8A68]/40 flex items-center justify-center text-[#6B8A68] animate-bounce">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="font-serif font-bold text-xl text-[#3D2E24]">
                  Your Dispatch Has Taken Flight!
                </h3>
                <p className="text-xs sm:text-sm text-[#3D2E24]/85 leading-relaxed max-w-sm mx-auto font-serif">
                  Thank you, <span className="font-bold text-[#D0684D]">{formData.name}</span>. Your message was launched across the evening sky. I will respond to you shortly at <span className="font-mono text-[#6B8A68]">{formData.email}</span>.
                </p>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-5 py-2.5 rounded-lg bg-[#6B8A68] hover:bg-[#5A7757] text-[#FFFDF9] text-xs font-serif font-semibold transition-all shadow-xs border border-[#4E6B4B] cursor-pointer"
                  >
                    Send Another Letter
                  </button>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="p-6 rounded-xl bg-[#FFFDF7] border border-[#C29B72]/50 space-y-4 shadow-2xs relative"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-serif font-semibold text-[#3D2E24] mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Satsuki"
                      className="w-full px-3.5 py-2 rounded-lg bg-[#FAF5E8]/60 border border-[#C29B72]/60 text-xs text-[#3D2E24] focus:outline-none focus:border-[#6B8A68] transition-colors font-serif"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-serif font-semibold text-[#3D2E24] mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@domain.com"
                      className="w-full px-3.5 py-2 rounded-lg bg-[#FAF5E8]/60 border border-[#C29B72]/60 text-xs text-[#3D2E24] focus:outline-none focus:border-[#6B8A68] transition-colors font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-serif font-semibold text-[#3D2E24] mb-1">
                    Subject / Topic
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Project Inquiry, Internship, or Friendly Greeting"
                    className="w-full px-3.5 py-2 rounded-lg bg-[#FAF5E8]/60 border border-[#C29B72]/60 text-xs text-[#3D2E24] focus:outline-none focus:border-[#6B8A68] transition-colors font-serif"
                  />
                </div>

                <div>
                  <label className="block text-xs font-serif font-semibold text-[#3D2E24] mb-1">
                    Your Message
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Inscribe your dispatch on aged parchment..."
                    className="w-full px-3.5 py-2 rounded-lg bg-[#FAF5E8]/60 border border-[#C29B72]/60 text-xs text-[#3D2E24] focus:outline-none focus:border-[#6B8A68] transition-colors resize-none font-serif"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 rounded-lg bg-[#D0684D] hover:bg-[#B9553C] active:scale-[0.99] text-[#FFFDF9] text-xs sm:text-sm font-serif font-semibold transition-all shadow-xs border border-[#9A422D] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <span>{isSubmitting ? "Folding Paper Plane..." : "Fold & Launch Paper Airplane"}</span>
                    <PaperPlaneVector className="w-4 h-4 text-white" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Animated Flying Paper Airplane Overlay */}
        {airplaneFlying && (
          <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden flex items-center justify-center">
            <div className="animate-[fly-across_1.8s_cubic-bezier(0.25,1,0.5,1)_forwards] p-3 rounded-full bg-[#FFFDF7] border border-[#D0684D]/50 shadow-xl">
              <PaperPlaneVector className="w-12 h-12 text-[#D0684D]" />
            </div>
          </div>
        )}

        {/* Footer Botanical Colophon */}
        <div className="mt-10 pt-4 border-t border-[#C29B72]/40 flex flex-wrap items-center justify-between text-xs text-[#5C381E]/70 font-serif italic">
          <span>&copy; {new Date().getFullYear()} Kritika Manandhar</span>
          <span>B.Sc. CSIT • Padmakanya Campus • Tribhuvan University</span>
        </div>
      </ParchmentScroll>
    </section>
  );
}
