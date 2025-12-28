// src/components/sections/TabsSection.tsx
"use client";

import { motion } from "framer-motion";
import { PORTFOLIO_QUERY_RESULT } from "../../../sanity.types";

// --- Types ---
type HomeData = NonNullable<PORTFOLIO_QUERY_RESULT["home"]>;
type PageBuilder = NonNullable<HomeData["pageBuilder"]>;
export type TabsList = NonNullable<PageBuilder[number]["tabs"]>;

interface TabsSectionProps {
  tabs: TabsList;
  activeTabKey: string | null;
  onTabChange: (key: string) => void;
}

// --- Animation Physics ---
const liquidSpring = {
  type: "spring" as const,
  stiffness: 250,
  damping: 25,
  mass: 0.5,
};

export default function TabsSection({
  tabs,
  activeTabKey,
  onTabChange,
}: TabsSectionProps) {
  return (
    <div className="fixed w-full flex justify-center py-5 md:py-12 z-50">
      <nav
        className="relative flex flex-wrap justify-center gap-2 md:rounded-full bg-neutral/10 backdrop-blur-md md:bg-black/5 md:backdrop-blur-[1px] border border-white/10 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)]"
        role="tablist"
      >
        {tabs.map((tab) => {
          const isActive = activeTabKey === tab._key;

          return (
            <div
              key={tab._key}
              onClick={() => onTabChange(tab._key)}
              role="tab"
              aria-selected={isActive}
              className={`relative px-6 py-2.5 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 hover:cursor-pointer ${isActive ? "text-white text-shadow-sm" : "text-white/70 hover:text-white"}`}
              style={{
                WebkitTapHighlightColor: "transparent",
              }}
            >
              {/* --- The "Liquid" Active Background --- */}
              {isActive && (
                <motion.div
                  layoutId="activeTabFluid"
                  transition={liquidSpring}
                  className="absolute inset-0 z-[-1]"
                >
                  {/* Container for the Glass Effect */}
                  <div className="h-full w-full rounded-lg md:rounded-full bg-linear-to-b from-white/20 to-white/5 backdrop-blur-md border border-white/20 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.4),inset_0_-1px_0_0_rgba(0,0,0,0.2),0_4px_10px_rgba(0,0,0,0.1)]" />
                </motion.div>
              )}

              {/* --- Label Content --- */}
              <span className="relative z-10 block subpixel-antialiased mix-blend-plus-lighter">
                {tab.tabLabel || "Untitled"}
              </span>
            </div>
          );
        })}
      </nav>
    </div>
  );
}