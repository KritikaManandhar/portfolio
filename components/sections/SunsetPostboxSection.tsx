"use client";

import React, { useState } from "react";
import { Mailbox, Mail, Send, CheckCircle } from "lucide-react";
import { triggerLeafBurst } from "@/components/particles/LeafParticleBurst";
import { chimeEngine } from "@/components/audio/ChimeEngine";
import { PaperPlaneVector } from "@/components/ui/VectorIcons";

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
      <div className="max-w-4xl w-full ghibli-card p-6 sm:p-10 relative">
        <div className="washi-tape washi-tape-top-left" />
        <div className="washi-tape washi-tape-top-right" />

        {/* Section Header Tag */}
        <div className="flex items-center justify-between mb-4">
          <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wider text-[#E07A5F] bg-[#E07A5F]/15 border border-[#E07A5F]/30 flex items-center gap-1.5">
            <Mailbox className="w-3.5 h-3.5 text-[#E07A5F]" />
            <span>Section 05 • The Sunset Terrace &amp; Postbox</span>
          </span>
          <span className="text-xs text-[#3D352E]/60 font-mono">
            Direct Contact
          </span>
        </div>

        <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#3D352E] tracking-tight mb-2">
          Send a Postcard from the Terrace
        </h2>
        <p className="text-xs sm:text-sm text-[#3D352E]/75 mb-8">
          Have an idea, project collaboration, or opportunity? Drop a note into the terracotta postbox.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Left Column: Direct Info */}
          <div className="md:col-span-2 space-y-5">
            <div className="p-5 rounded-2xl bg-[#FAF6F0] border border-[#E07A5F]/20 space-y-3">
              <h3 className="font-serif font-bold text-base text-[#3D352E] flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#E07A5F]" />
                <span>Postal Dispatch</span>
              </h3>
              <p className="text-xs text-[#3D352E]/80 leading-relaxed">
                Feel free to email directly or reach out through GitHub. Always excited to discuss web development, software engineering, or student collaborations.
              </p>

              <div className="pt-2 space-y-2 text-xs">
                <div>
                  <span className="font-semibold text-[#7A9A7E]">Email: </span>
                  <a
                    href="mailto:kri.mdhr@gmail.com"
                    className="text-[#E07A5F] hover:underline font-mono"
                  >
                    kri.mdhr@gmail.com
                  </a>
                </div>
                <div>
                  <span className="font-semibold text-[#7A9A7E]">GitHub: </span>
                  <a
                    href="https://github.com/KritikaManandhar"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#E07A5F] hover:underline font-mono"
                  >
                    KritikaManandhar
                  </a>
                </div>
                <div>
                  <span className="font-semibold text-[#7A9A7E]">Studio: </span>
                  <span className="text-[#3D352E]/80">Mhepi, Kathmandu, Nepal</span>
                </div>
              </div>
            </div>

            {/* Postbox Illustration Box */}
            <div className="p-5 rounded-2xl bg-[#E07A5F]/10 border border-[#E07A5F]/30 text-center space-y-2">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-white/80 border border-[#E07A5F]/30 flex items-center justify-center animate-ghibli-float shadow-2xs">
                <Mailbox className="w-6 h-6 text-[#E07A5F]" />
              </div>
              <h4 className="text-xs font-bold text-[#3D352E]">
                Terracotta Mailbox
              </h4>
              <p className="text-[11px] text-[#3D352E]/70">
                Letters are folded into paper airplanes and launched into the sunset sky.
              </p>
            </div>
          </div>

          {/* Right Column: Contact Postcard Form */}
          <div className="md:col-span-3">
            {isSent ? (
              <div className="p-8 rounded-2xl bg-[#FAF6F0] border border-[#7A9A7E]/40 text-center space-y-4 shadow-sm animate-in fade-in zoom-in-95 duration-300">
                <div className="w-16 h-16 mx-auto rounded-full bg-[#7A9A7E]/15 border border-[#7A9A7E]/30 flex items-center justify-center text-[#7A9A7E] animate-bounce">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="font-serif font-bold text-xl text-[#3D352E]">
                  Your Postcard Has Taken Flight!
                </h3>
                <p className="text-xs sm:text-sm text-[#3D352E]/80 leading-relaxed max-w-sm mx-auto">
                  Thank you, <span className="font-bold text-[#E07A5F]">{formData.name}</span>. Your message was launched across the evening sky. I will respond to you shortly at <span className="font-mono text-[#7A9A7E]">{formData.email}</span>.
                </p>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-5 py-2.5 rounded-xl bg-[#7A9A7E] hover:bg-[#68886C] text-white text-xs font-semibold transition-all shadow-xs cursor-pointer"
                  >
                    Send Another Letter
                  </button>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="p-6 rounded-2xl bg-[#FAF6F0] border border-[#D8C7B0] space-y-4 shadow-xs relative"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#3D352E] mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Satsuki"
                      className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#D8C7B0] text-xs text-[#3D352E] focus:outline-none focus:border-[#7A9A7E] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#3D352E] mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@domain.com"
                      className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#D8C7B0] text-xs text-[#3D352E] focus:outline-none focus:border-[#7A9A7E] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#3D352E] mb-1">
                    Subject / Topic
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Project Inquiry, Internship, or Friendly Greeting"
                    className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#D8C7B0] text-xs text-[#3D352E] focus:outline-none focus:border-[#7A9A7E] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#3D352E] mb-1">
                    Your Message
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Write your note here on warm linen paper..."
                    className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#D8C7B0] text-xs text-[#3D352E] focus:outline-none focus:border-[#7A9A7E] transition-colors resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 rounded-xl bg-[#E07A5F] hover:bg-[#D46B50] active:scale-[0.99] text-white text-xs sm:text-sm font-semibold transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
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
            <div className="animate-[fly-across_1.8s_cubic-bezier(0.25,1,0.5,1)_forwards] p-3 rounded-full bg-white/90 border border-[#E07A5F]/40 shadow-xl">
              <PaperPlaneVector className="w-12 h-12 text-[#E07A5F]" />
            </div>
          </div>
        )}

        {/* Footer Botanical Colophon */}
        <div className="mt-10 pt-4 border-t border-[#7A9A7E]/20 flex flex-wrap items-center justify-between text-xs text-[#3D352E]/65 font-mono">
          <span>&copy; {new Date().getFullYear()} Kritika Manandhar</span>
          <span>B.Sc. CSIT • Padmakanya Campus • Tribhuvan University</span>
        </div>
      </div>
    </section>
  );
}
