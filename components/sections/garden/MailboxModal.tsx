"use client";

import React, { useState } from "react";
import { X, Mail, Copy, Check, Send, MapPin, GraduationCap, Sparkles } from "lucide-react";
import { GithubIcon } from "@/components/ui/VectorIcons";

interface MailboxModalProps {
  onClose: () => void;
  onMailboxOpened: () => void;
}

export default function MailboxModal({ onClose, onMailboxOpened }: MailboxModalProps) {
  const [copied, setCopied] = useState<boolean>(false);
  const emailAddress = "kri.mdhr@gmail.com";

  React.useEffect(() => {
    onMailboxOpened();
  }, [onMailboxOpened]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  const handleJumpToPostbox = (e: React.MouseEvent) => {
    e.preventDefault();
    onClose();
    const postbox = document.getElementById("postbox");
    if (postbox) {
      postbox.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/55 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#FAF4E6] rounded-2xl border-2 border-[#C94736] shadow-[0_24px_60px_rgba(30,15,5,0.35)] flex flex-col overflow-hidden">
        {/* Header Ribbon */}
        <div className="px-5 py-4 border-b border-[#B99A60]/40 bg-gradient-to-r from-[#F5EBD5] via-[#FAF4E6] to-[#F5EBD5] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#C94736]/20 border border-[#C94736]/40 flex items-center justify-center text-[#C94736]">
              <Mail className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base sm:text-lg text-[#3D2E24] leading-tight">
                The Garden Mailbox
              </h3>
              <p className="text-[11px] font-serif text-[#49372C]/75 italic">
                Developer Inquiries, Coffee Chats &amp; Collaboration
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

        {/* Content Body */}
        <div className="p-5 sm:p-6 space-y-4">
          {/* Welcome Letter Note */}
          <div className="p-4 rounded-xl bg-[#FFFDF7] border border-[#B99A60]/45 shadow-xs space-y-2">
            <div className="flex items-center gap-1.5 text-[#C94736] text-[10px] font-mono uppercase font-bold">
              <Sparkles className="w-3 h-3" />
              <span>A Letter Waiting in the Cedar Postbox</span>
            </div>
            <p className="text-xs sm:text-[13px] font-serif text-[#3D2E24] leading-relaxed">
              Hello traveler! Whether you have an exciting software engineering role, want to collaborate on full-stack web applications, or simply want to chat about mindful design and Ghibli worlds, my inbox is always open.
            </p>
          </div>

          {/* Direct Email Address Action */}
          <div className="p-4 rounded-xl bg-[#FFFDF7] border border-[#B99A60]/45 shadow-xs space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#B99A60] font-bold block">
              Direct Electronic Mail
            </span>
            <div className="flex items-center justify-between gap-2 p-2.5 rounded-lg bg-[#FAF4E6] border border-[#B99A60]/40">
              <a
                href={`mailto:${emailAddress}`}
                className="font-mono text-xs text-[#3D2E24] hover:text-[#C94736] font-semibold truncate select-all transition-colors underline decoration-dotted decoration-[#B99A60]"
                title="Send email directly"
              >
                {emailAddress}
              </a>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="px-2.5 py-1 rounded-md bg-[#627D5B] hover:bg-[#4E6B47] text-white text-[11px] font-serif font-medium flex items-center gap-1 shrink-0 transition-colors shadow-2xs"
              >
                {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? "Copied!" : "Copy"}</span>
              </button>
            </div>
          </div>

          {/* Social & Academic Coordinates */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-serif">
            {/* GitHub Profile */}
            <a
              href="https://github.com/KritikaManandhar"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl bg-[#FFFDF7] hover:bg-[#FAF4E6] border border-[#B99A60]/40 shadow-xs flex items-center gap-2.5 transition-all text-[#3D2E24]"
            >
              <div className="w-7 h-7 rounded-full bg-[#3D2E24] text-white flex items-center justify-center shrink-0">
                <GithubIcon className="w-3.5 h-3.5" />
              </div>
              <div className="overflow-hidden">
                <span className="font-bold block truncate">GitHub Profile</span>
                <span className="text-[10px] text-[#49372C]/70 truncate block">
                  @KritikaManandhar
                </span>
              </div>
            </a>

            {/* Location & Academic Base */}
            <div className="p-3 rounded-xl bg-[#FFFDF7] border border-[#B99A60]/40 shadow-xs flex items-center gap-2.5 text-[#3D2E24]">
              <div className="w-7 h-7 rounded-full bg-[#627D5B]/15 text-[#627D5B] flex items-center justify-center shrink-0 border border-[#627D5B]/30">
                <MapPin className="w-3.5 h-3.5" />
              </div>
              <div className="overflow-hidden">
                <span className="font-bold block truncate">Kathmandu, Nepal</span>
                <span className="text-[10px] text-[#49372C]/70 truncate block">
                  Padmakanya Campus, TU
                </span>
              </div>
            </div>
          </div>

          {/* Launch Origami Airplane Postcard Shortcut */}
          <div className="p-3.5 rounded-xl bg-gradient-to-r from-[#FAF0E6] to-[#FAF5E8] border border-[#C94736]/40 flex items-center justify-between gap-3">
            <div>
              <h5 className="font-serif font-bold text-xs text-[#3D2E24]">
                Send an Origami Paper Airplane
              </h5>
              <p className="text-[10px] font-serif text-[#49372C]/75">
                Fold your message into a 3D airplane and fly it into the sunset.
              </p>
            </div>
            <button
              type="button"
              onClick={handleJumpToPostbox}
              className="px-3 py-1.5 rounded-lg bg-[#C94736] hover:bg-[#B33C2D] text-white text-xs font-serif font-semibold shadow-xs flex items-center gap-1.5 shrink-0 transition-transform active:scale-95 cursor-pointer"
            >
              <Send className="w-3 h-3" />
              <span>Compose &rarr;</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-[#B99A60]/30 bg-[#FAF4E6] flex items-center justify-end">
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
  );
}
