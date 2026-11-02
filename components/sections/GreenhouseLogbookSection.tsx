"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  Sparkles,
  Sprout,
  BookOpen,
  Hammer,
  Mail,
  Award,
  GraduationCap,
  X,
  Compass,
  Home,
  Check,
} from "lucide-react";
import { triggerLeafBurst } from "@/components/particles/LeafParticleBurst";
import { chimeEngine } from "@/components/audio/ChimeEngine";
import { GithubIcon } from "@/components/ui/VectorIcons";
import ParchmentScroll from "@/components/ui/ParchmentScroll";
import LittleWorldScene, { WorldLandmarkId } from "./world/LittleWorldScene";
import CottageModal from "./world/CottageModal";
import GreenhouseModal from "./garden/GreenhouseModal";
import LibraryModal from "./garden/LibraryModal";
import WorkshopModal from "./garden/WorkshopModal";
import MailboxModal from "./garden/MailboxModal";
import PondModal from "./garden/PondModal";
import BadgeDrawer from "./garden/BadgeDrawer";
import { GARDEN_BADGES } from "./garden/GardenData";

const STORAGE_KEY = "little_world_state_v1";

interface SavedWorldState {
  visitedLandmarks: string[];
  inspectedPlants: string[];
  readChapters: string[];
  inspectedProjects: string[];
  discoveredEggs: string[];
  mailboxOpened: boolean;
  earnedBadgeIds: string[];
}

export default function GreenhouseLogbookSection() {
  const sectionRef = React.useRef<HTMLElement | null>(null);
  const [unrollProgress, setUnrollProgress] = useState<number>(0);

  // Navigation & Active Modal State
  const [activeLandmark, setActiveLandmark] = useState<WorldLandmarkId | null>(null);
  const [isBadgeDrawerOpen, setIsBadgeDrawerOpen] = useState<boolean>(false);
  const [showCredentials, setShowCredentials] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Exploration Progress
  const [visitedLandmarks, setVisitedLandmarks] = useState<string[]>([]);
  const [inspectedPlants, setInspectedPlants] = useState<string[]>([]);
  const [readChapters, setReadChapters] = useState<string[]>([]);
  const [inspectedProjects, setInspectedProjects] = useState<string[]>([]);
  const [discoveredEggs, setDiscoveredEggs] = useState<string[]>([]);
  const [mailboxOpened, setMailboxOpened] = useState<boolean>(false);
  const [earnedBadgeIds, setEarnedBadgeIds] = useState<string[]>([]);

  // Scroll-driven unroll tracking through Section 4's pinned track
  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const totalDistance = rect.height - window.innerHeight;
      if (totalDistance <= 0) {
        setUnrollProgress(1.0);
        return;
      }

      const scrolledIntoSection = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolledIntoSection / totalDistance));

      // As you scroll through the first 25% of Section 4:
      // unroll goes from 0.0 to 1.0!
      // Once >= 0.25, unroll stays 1.0 (fully open, stable, interactive)!
      const unroll = Math.max(0, Math.min(1, progress / 0.25));
      setUnrollProgress(unroll);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Load persistent progress from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed: SavedWorldState = JSON.parse(saved);
        if (parsed.visitedLandmarks) setVisitedLandmarks(parsed.visitedLandmarks);
        if (parsed.inspectedPlants) setInspectedPlants(parsed.inspectedPlants);
        if (parsed.readChapters) setReadChapters(parsed.readChapters);
        if (parsed.inspectedProjects) setInspectedProjects(parsed.inspectedProjects);
        if (parsed.discoveredEggs) setDiscoveredEggs(parsed.discoveredEggs);
        if (parsed.mailboxOpened) setMailboxOpened(parsed.mailboxOpened);
        if (parsed.earnedBadgeIds) setEarnedBadgeIds(parsed.earnedBadgeIds);
      }
    } catch {
      // localStorage unavailable or parsing error
    }
  }, []);

  // Save progress to localStorage
  const saveProgress = useCallback(
    (nextState: Partial<SavedWorldState>) => {
      try {
        const current: SavedWorldState = {
          visitedLandmarks,
          inspectedPlants,
          readChapters,
          inspectedProjects,
          discoveredEggs,
          mailboxOpened,
          earnedBadgeIds,
          ...nextState,
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
      } catch {
        // storage quota exceeded or disabled
      }
    },
    [
      visitedLandmarks,
      inspectedPlants,
      readChapters,
      inspectedProjects,
      discoveredEggs,
      mailboxOpened,
      earnedBadgeIds,
    ]
  );

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    const timer = setTimeout(() => {
      setToastMessage(null);
    }, 3200);
    return () => clearTimeout(timer);
  }, []);

  const awardBadge = useCallback(
    (badgeId: string) => {
      if (!earnedBadgeIds.includes(badgeId)) {
        const badge = GARDEN_BADGES.find((b) => b.id === badgeId);
        const nextBadges = [...earnedBadgeIds, badgeId];
        setEarnedBadgeIds(nextBadges);
        saveProgress({ earnedBadgeIds: nextBadges });

        if (chimeEngine) chimeEngine.playCelebration();
        triggerLeafBurst(window.innerWidth / 2, window.innerHeight / 2, true);

        if (badge) {
          showToast(`✦ New Badge Earned: ${badge.name}!`);
        }
      }
    },
    [earnedBadgeIds, saveProgress, showToast]
  );

  // Check exploration milestones for badge awards
  useEffect(() => {
    const allKeyLandmarks = ["cottage", "greenhouse", "library", "workshop", "mailbox", "pond"];
    if (allKeyLandmarks.every((dest) => visitedLandmarks.includes(dest))) {
      awardBadge("badge-explorer");
    }
  }, [visitedLandmarks, awardBadge]);

  useEffect(() => {
    if (inspectedPlants.length >= 4) {
      awardBadge("badge-botanist");
    }
  }, [inspectedPlants, awardBadge]);

  useEffect(() => {
    if (inspectedProjects.length >= 1) {
      awardBadge("badge-inventor");
    }
  }, [inspectedProjects, awardBadge]);

  useEffect(() => {
    if (discoveredEggs.length >= 1) {
      awardBadge("badge-secret");
    }
  }, [discoveredEggs, awardBadge]);

  useEffect(() => {
    if (mailboxOpened) {
      awardBadge("badge-messenger");
    }
  }, [mailboxOpened, awardBadge]);

  // Handle selecting a landmark
  const handleSelectLandmark = (id: WorldLandmarkId, e?: React.MouseEvent) => {
    if (e) triggerLeafBurst(e.clientX, e.clientY, true);
    if (chimeEngine) chimeEngine.playBreezeChord();

    setActiveLandmark(id);

    if (!visitedLandmarks.includes(id)) {
      const nextVisited = [...visitedLandmarks, id];
      setVisitedLandmarks(nextVisited);
      saveProgress({ visitedLandmarks: nextVisited });
    }
  };

  const handlePlantInspected = (plantId: string) => {
    if (!inspectedPlants.includes(plantId)) {
      const nextPlants = [...inspectedPlants, plantId];
      setInspectedPlants(nextPlants);
      saveProgress({ inspectedPlants: nextPlants });
    }
  };

  const handleChapterRead = (chapId: string) => {
    if (!readChapters.includes(chapId)) {
      const nextChapters = [...readChapters, chapId];
      setReadChapters(nextChapters);
      saveProgress({ readChapters: nextChapters });
    }
  };

  const handleProjectInspected = (projId: string) => {
    if (!inspectedProjects.includes(projId)) {
      const nextProjects = [...inspectedProjects, projId];
      setInspectedProjects(nextProjects);
      saveProgress({ inspectedProjects: nextProjects });
    }
  };

  const handleEggDiscovered = (eggId: string) => {
    if (!discoveredEggs.includes(eggId)) {
      const nextEggs = [...discoveredEggs, eggId];
      setDiscoveredEggs(nextEggs);
      saveProgress({ discoveredEggs: nextEggs });
    }
  };

  const handleMailboxOpened = () => {
    if (!mailboxOpened) {
      setMailboxOpened(true);
      saveProgress({ mailboxOpened: true });
    }
  };

  const handleResetProgress = () => {
    setVisitedLandmarks([]);
    setInspectedPlants([]);
    setReadChapters([]);
    setInspectedProjects([]);
    setDiscoveredEggs([]);
    setMailboxOpened(false);
    setEarnedBadgeIds([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    setIsBadgeDrawerOpen(false);
    showToast("World exploration reset");
  };

  return (
    <section
      id="greenhouse"
      ref={sectionRef}
      className="relative min-h-[220vh] w-full"
    >
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center px-2 sm:px-4 py-1.5 sm:py-2.5 z-10">
        <ParchmentScroll
          maxWidth="max-w-[min(1040px,95vw)]"
          scrollAnimated
          unrollProgress={unrollProgress}
          contentPadding="px-3 sm:px-5 md:px-6 py-2 sm:py-3"
          sealLabel="Section 04 • The Little World Folio"
          onUnroll={() => {
            const section = sectionRef.current;
            if (section) {
              const totalDistance = section.offsetHeight - window.innerHeight;
              window.scrollTo({
                top: section.offsetTop + 0.3 * totalDistance,
                behavior: "smooth",
              });
            }
          }}
        >
        {/* Compact Storybook Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-1.5 mb-1.5">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-semibold tracking-wider text-[#627D5B] bg-[#627D5B]/15 border border-[#627D5B]/35 flex items-center gap-1 shadow-2xs">
              <Compass className="w-3 h-3 text-[#627D5B]" />
              <span>Section 04 • The Little World</span>
            </span>
            <span className="text-[11px] sm:text-xs font-serif font-bold text-[#344C39] hidden sm:inline">
              Interactive Storybook Diorama
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {/* World Logbook Badge Counter Button */}
            <button
              type="button"
              onClick={() => setIsBadgeDrawerOpen(true)}
              className="px-2.5 py-0.5 rounded-md bg-[#FFF9EF] hover:bg-[#F6EBD5] border border-[#B99A60]/60 text-[10px] sm:text-[11px] font-serif font-semibold text-[#49372C] flex items-center gap-1 shadow-2xs cursor-pointer transition-all active:scale-95"
            >
              <Award className="w-3 h-3 text-[#B99A60]" />
              <span>
                Logbook ({earnedBadgeIds.length}/{GARDEN_BADGES.length})
              </span>
            </button>

            {/* Scholar Credentials Modal Trigger */}
            <button
              type="button"
              onClick={() => setShowCredentials(true)}
              className="px-2.5 py-0.5 rounded-md bg-[#FFF9EF] hover:bg-[#F6EBD5] border border-[#B99A60]/60 text-[10px] sm:text-[11px] font-serif font-semibold text-[#49372C] flex items-center gap-1 shadow-2xs cursor-pointer transition-all active:scale-95"
            >
              <GraduationCap className="w-3 h-3 text-[#627D5B]" />
              <span className="hidden sm:inline">Scholar Credentials</span>
              <span className="sm:hidden">Credentials</span>
            </button>
          </div>
        </div>

        {/* ========================================================= */}
        {/* THE MAIN ILLUSTRATED MINIATURE WORLD DIORAMA SCENE        */}
        {/* ========================================================= */}
        <LittleWorldScene
          activeLandmark={activeLandmark}
          onSelectLandmark={handleSelectLandmark}
          visitedLandmarks={visitedLandmarks}
        />

        {/* Compact Bottom Explorer Bar */}
        <div className="mt-1.5 pt-1 border-t border-[#B99A60]/30 flex items-center justify-between text-[10px] sm:text-[11px] font-serif text-[#49372C]/80">
          <div className="flex items-center gap-1.5">
            <span className="text-[9px] sm:text-[10px] font-mono uppercase text-[#B99A60] font-bold">
              ✦ Explorer:
            </span>
            <span>
              {visitedLandmarks.length >= 6
                ? "All 6 landmarks explored! Check your logbook."
                : `${visitedLandmarks.length}/6 landmarks explored. Click any building.`}
            </span>
          </div>

          <button
            type="button"
            onClick={() => setIsBadgeDrawerOpen(true)}
            className="text-[#627D5B] hover:text-[#344C39] font-semibold underline underline-offset-2 cursor-pointer"
          >
            Achievements ({earnedBadgeIds.length}/5) &rarr;
          </button>
        </div>

        {/* ========================================================= */}
        {/* LANDMARK MODAL INSPECTION PANELS                          */}
        {/* ========================================================= */}

        {/* 1. The Cozy Cottage (Welcome & Hearth) */}
        {activeLandmark === "cottage" && (
          <CottageModal
            onClose={() => setActiveLandmark(null)}
            onNavigateDestination={(id) => handleSelectLandmark(id)}
          />
        )}

        {/* 2. The Greenhouse (Skills Explorer) */}
        {activeLandmark === "greenhouse" && (
          <GreenhouseModal
            onClose={() => setActiveLandmark(null)}
            onPlantInspected={handlePlantInspected}
            inspectedPlants={inspectedPlants}
          />
        )}

        {/* 3. The Little Library (Learning Journey) */}
        {activeLandmark === "library" && (
          <LibraryModal
            onClose={() => setActiveLandmark(null)}
            onChapterRead={handleChapterRead}
            readChapters={readChapters}
          />
        )}

        {/* 4. The Workshop (Project Discovery) */}
        {activeLandmark === "workshop" && (
          <WorkshopModal
            onClose={() => setActiveLandmark(null)}
            onProjectInspected={handleProjectInspected}
            inspectedProjects={inspectedProjects}
          />
        )}

        {/* 5. The Mailbox (Contact) */}
        {activeLandmark === "mailbox" && (
          <MailboxModal
            onClose={() => setActiveLandmark(null)}
            onMailboxOpened={handleMailboxOpened}
          />
        )}

        {/* 6. The Hidden Pond (Easter Eggs & Secrets) */}
        {activeLandmark === "pond" && (
          <PondModal
            onClose={() => setActiveLandmark(null)}
            onEggDiscovered={handleEggDiscovered}
            discoveredEggs={discoveredEggs}
          />
        )}

        {/* Badge & Quest Drawer */}
        <BadgeDrawer
          isOpen={isBadgeDrawerOpen}
          onClose={() => setIsBadgeDrawerOpen(false)}
          earnedBadgeIds={earnedBadgeIds}
          onResetProgress={handleResetProgress}
        />

        {/* Toast Notification Alert */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 px-4 py-2 rounded-lg bg-[#344C39] text-[#FFF9EF] font-serif text-xs shadow-xl border border-[#B99A60] flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
            <Sparkles className="w-3.5 h-3.5 text-[#E4BA68]" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Scholar & Developer Credentials Modal */}
        {showCredentials && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-xs animate-in fade-in duration-150">
            <div className="max-w-md w-full bg-[#FAF5E8] p-5 sm:p-6 relative rounded-lg border-2 border-[#B99A60] shadow-2xl animate-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between mb-3 border-b border-[#B99A60]/40 pb-2">
                <div className="flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-[#627D5B]" />
                  <span className="font-serif font-bold text-sm text-[#344C39]">
                    Scholar &amp; Developer Guild Credentials
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowCredentials(false)}
                  className="p-1 rounded-md text-[#49372C]/60 hover:text-[#C94736] hover:bg-black/5 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3 mb-4">
                {/* Degree */}
                <div className="p-3 rounded-md bg-[#FFFDF7] border border-[#B99A60]/40">
                  <span className="text-[9px] font-mono uppercase text-[#627D5B] font-bold">
                    Academic Genus
                  </span>
                  <h4 className="font-serif font-bold text-xs sm:text-sm text-[#344C39]">
                    B.Sc. Computer Science &amp; IT
                  </h4>
                  <p className="text-[11px] text-[#49372C]/85 font-serif">
                    Padmakanya Multiple Campus, Tribhuvan University (2022 – 2026)
                  </p>
                  <p className="text-[10px] text-[#49372C]/60 italic mt-0.5">
                    Kathmandu, Nepal • Core algorithms, OOP, database design, and systems engineering.
                  </p>
                </div>

                {/* Vocational Diploma */}
                <div className="p-3 rounded-md bg-[#FFFDF7] border border-[#B99A60]/40">
                  <span className="text-[9px] font-mono uppercase text-[#C94736] font-bold">
                    Practical Cultivation
                  </span>
                  <h4 className="font-serif font-bold text-xs sm:text-sm text-[#344C39]">
                    Web Design Accredited Training
                  </h4>
                  <p className="text-[11px] text-[#49372C]/85 font-serif">
                    Broadway Infosys Nepal (Accredited Professional Diploma)
                  </p>
                  <p className="text-[10px] text-[#49372C]/60 italic mt-0.5">
                    Modern responsive frontend architecture, Figma prototyping, and web standards.
                  </p>
                </div>

                {/* GitHub Guild */}
                <div className="p-3 rounded-md bg-[#FFFDF7] border border-[#B99A60]/40 flex items-center justify-between gap-2">
                  <div>
                    <span className="text-[9px] font-mono uppercase text-[#B99A60] font-bold">
                      Open Source Guild
                    </span>
                    <h4 className="font-serif font-bold text-xs sm:text-sm text-[#344C39]">
                      github.com/KritikaManandhar
                    </h4>
                  </div>
                  <a
                    href="https://github.com/KritikaManandhar"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-1 rounded-md bg-[#627D5B] hover:bg-[#526D4B] text-white text-[11px] font-serif font-semibold shadow-2xs flex items-center gap-1"
                  >
                    <GithubIcon className="w-3 h-3" />
                    <span>Profile &rarr;</span>
                  </a>
                </div>
              </div>

              <div className="text-right pt-2 border-t border-[#B99A60]/40">
                <button
                  type="button"
                  onClick={() => setShowCredentials(false)}
                  className="px-3.5 py-1 rounded-md bg-[#FAF4E6] hover:bg-[#F6EBD5] border border-[#B99A60]/70 text-xs font-serif font-semibold text-[#344C39] cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            </div>
          </div>
        )}
      </ParchmentScroll>
      </div>
    </section>
  );
}
