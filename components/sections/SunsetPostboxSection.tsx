"use client";

import React, { useState } from "react";
import { Mailbox, Mail, CheckCircle, AlertCircle } from "lucide-react";
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
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setErrorMessage(null);
    triggerLeafBurst(window.innerWidth / 2, window.innerHeight / 2, true);

    if (chimeEngine) {
      chimeEngine.playPaperRustle();
    }

    setAirplaneFlying(true);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "5054fab6-bdf2-4bc8-bf97-c9d5ac5cad1b",
          name: formData.name,
          email: formData.email,
          subject: formData.subject || `Postcard from ${formData.name}`,
          message: formData.message,
          from_name: "Portfolio Postbox",
        }),
      });

      const data = await response.json();

      if (data.success) {
        setTimeout(() => {
          setIsSubmitting(false);
          setIsSent(true);
          setAirplaneFlying(false);

          if (chimeEngine) {
            chimeEngine.playCelebration();
          }
          triggerLeafBurst(window.innerWidth / 2, window.innerHeight * 0.4, false);
        }, 1200);
      } else {
        setIsSubmitting(false);
        setAirplaneFlying(false);
        setErrorMessage(data.message || "Failed to send letter. Please try again.");
      }
    } catch {
      setIsSubmitting(false);
      setAirplaneFlying(false);
      setErrorMessage("Network error. Please check your connection or email directly.");
    }
  };

  const resetForm = (e: React.MouseEvent) => {
    triggerLeafBurst(e.clientX, e.clientY, true);
    setIsSent(false);
    setErrorMessage(null);
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <section
      id="postbox"
      className="min-h-screen w-full flex items-center justify-center px-4 sm:px-6 pt-14 pb-6 relative z-10"
    >
      <ParchmentScroll maxWidth="max-w-[840px]" sealText="信">
        {/* Section Header Tag */}
        <div className="flex items-center justify-between mb-3 pr-10">
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wider text-[#D0684D] bg-[#D0684D]/15 border border-[#D0684D]/35 flex items-center gap-1.5 shadow-2xs">
            <Mailbox className="w-3.5 h-3.5 text-[#D0684D]" />
            <span>Section 05 • The Sunset Terrace &amp; Postbox</span>
          </span>
          <span className="text-[11px] text-[#5C381E]/70 font-serif italic">
            Direct Contact
          </span>
        </div>

        <h2 className="text-2xl sm:text-[28px] font-serif font-bold text-[#3D2E24] tracking-tight mb-1">
          Send a Postcard from the Terrace
        </h2>
        <p className="text-xs sm:text-[13px] text-[#5C381E]/80 mb-5 font-serif">
          Have an idea, project collaboration, or opportunity? Inscribe your dispatch onto the scroll.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-5">
          {/* Left Column: Direct Info */}
          <div className="md:col-span-2 space-y-3.5">
            <div className="p-4 rounded-lg bg-[#FFFDF7] border border-[#C29B72]/50 shadow-2xs space-y-2">
              <h3 className="font-serif font-bold text-sm text-[#3D2E24] flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#D0684D]" />
                <span>Postal Dispatch</span>
              </h3>
              <p className="text-[11px] text-[#3D2E24]/85 leading-relaxed font-serif">
                Feel free to email directly or reach out through GitHub. Always excited to discuss web development or collaborations.
              </p>

              <div className="pt-1 space-y-1.5 text-[11px]">
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
                  <span className="text-[#3D2E24]/80 font-serif italic">Kathmandu, Nepal</span>
                </div>
              </div>
            </div>

            {/* Postbox Illustration Box */}
            <div className="p-3.5 rounded-lg bg-[#D0684D]/10 border border-[#D0684D]/30 text-center space-y-1.5 shadow-2xs">
              <div className="w-9 h-9 mx-auto rounded-lg bg-[#FFFDF7] border border-[#D0684D]/40 flex items-center justify-center animate-ghibli-float shadow-2xs">
                <Mailbox className="w-5 h-5 text-[#D0684D]" />
              </div>
              <h4 className="text-[11px] font-serif font-bold text-[#3D2E24]">
                Terracotta Mailbox
              </h4>
              <p className="text-[10px] text-[#5C381E]/75 font-serif italic">
                Letters are folded into paper airplanes and launched into the sunset.
              </p>
            </div>
          </div>

          {/* Right Column: Contact Postcard Form */}
          <div className="md:col-span-3">
            {isSent ? (
              <div className="p-6 rounded-lg bg-[#FFFDF7] border border-[#6B8A68]/50 text-center space-y-3 shadow-2xs animate-in fade-in zoom-in-95 duration-300">
                <div className="w-12 h-12 mx-auto rounded-full bg-[#6B8A68]/15 border border-[#6B8A68]/40 flex items-center justify-center text-[#6B8A68] animate-bounce">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <h3 className="font-serif font-bold text-lg text-[#3D2E24]">
                  Your Dispatch Has Taken Flight!
                </h3>
                <p className="text-xs text-[#3D2E24]/85 leading-relaxed max-w-sm mx-auto font-serif">
                  Thank you, <span className="font-bold text-[#D0684D]">{formData.name}</span>. Your message was delivered to my inbox and launched across the evening sky. I will respond to you shortly at <span className="font-mono text-[#6B8A68]">{formData.email}</span>.
                </p>
                <div className="pt-1">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-4 py-2 rounded-md bg-[#6B8A68] hover:bg-[#5A7757] text-[#FFFDF9] text-xs font-serif font-semibold transition-all shadow-xs border border-[#4E6B4B] cursor-pointer"
                  >
                    Send Another Letter
                  </button>
                </div>
              </div>
            ) : (
              <form
                action="https://api.web3forms.com/submit"
                method="POST"
                onSubmit={handleSubmit}
                className="p-4 sm:p-5 rounded-lg bg-[#FFFDF7] border border-[#C29B72]/50 space-y-3 shadow-2xs relative"
              >
                {/* Web3Forms Access Key */}
                <input
                  type="hidden"
                  name="access_key"
                  value="5054fab6-bdf2-4bc8-bf97-c9d5ac5cad1b"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-serif font-semibold text-[#3D2E24] mb-0.5">
                      Your Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Satsuki"
                      className="w-full px-3 py-1.5 rounded-md bg-[#FAF5E8]/60 border border-[#C29B72]/60 text-xs text-[#3D2E24] focus:outline-none focus:border-[#6B8A68] transition-colors font-serif"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-serif font-semibold text-[#3D2E24] mb-0.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@domain.com"
                      className="w-full px-3 py-1.5 rounded-md bg-[#FAF5E8]/60 border border-[#C29B72]/60 text-xs text-[#3D2E24] focus:outline-none focus:border-[#6B8A68] transition-colors font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-serif font-semibold text-[#3D2E24] mb-0.5">
                    Subject / Topic
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Project Inquiry, Internship, or Friendly Greeting"
                    className="w-full px-3 py-1.5 rounded-md bg-[#FAF5E8]/60 border border-[#C29B72]/60 text-xs text-[#3D2E24] focus:outline-none focus:border-[#6B8A68] transition-colors font-serif"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-serif font-semibold text-[#3D2E24] mb-0.5">
                    Your Message
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={3}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Inscribe your dispatch on aged parchment..."
                    className="w-full px-3 py-1.5 rounded-md bg-[#FAF5E8]/60 border border-[#C29B72]/60 text-xs text-[#3D2E24] focus:outline-none focus:border-[#6B8A68] transition-colors resize-none font-serif"
                  />
                </div>

                {errorMessage && (
                  <div className="p-2 rounded-md bg-[#D0684D]/10 border border-[#D0684D]/30 flex items-center gap-1.5 text-[11px] text-[#D0684D] font-serif">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="pt-1">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-2.5 rounded-md bg-[#D0684D] hover:bg-[#B9553C] active:scale-[0.99] text-[#FFFDF9] text-xs font-serif font-semibold transition-all shadow-xs border border-[#9A422D] flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    <span>{isSubmitting ? "Folding & Delivering Paper Plane..." : "Fold & Launch Paper Airplane"}</span>
                    <PaperPlaneVector className="w-3.5 h-3.5 text-white" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Animated Flying Paper Airplane Overlay */}
        {airplaneFlying && (
          <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden flex items-center justify-center">
            <div className="animate-[fly-across_1.8s_cubic-bezier(0.25,1,0.5,1)_forwards] p-2.5 rounded-full bg-[#FFFDF7] border border-[#D0684D]/50 shadow-xl">
              <PaperPlaneVector className="w-10 h-10 text-[#D0684D]" />
            </div>
          </div>
        )}

        {/* Footer Botanical Colophon */}
        <div className="mt-6 pt-3 border-t border-[#C29B72]/40 flex flex-wrap items-center justify-between text-[11px] text-[#5C381E]/70 font-serif italic">
          <span>&copy; {new Date().getFullYear()} Kritika Manandhar</span>
          <span>B.Sc. CSIT • Padmakanya Campus • Tribhuvan University</span>
        </div>
      </ParchmentScroll>
    </section>
  );
}
