// src/components/views/SkillsView.tsx
"use client";

import Image from "next/image";
import { PORTFOLIO_QUERY_RESULT } from "../../../sanity.types";

// Type Extraction
type HomeData = NonNullable<PORTFOLIO_QUERY_RESULT["home"]>;
type PageBuilder = NonNullable<HomeData["pageBuilder"]>;
type Tabs = NonNullable<PageBuilder[number]["tabs"]>;
type TabContent = NonNullable<Tabs[number]["content"]>[number];

export type SkillsBlockData = Extract<TabContent, { _type: "skillsBlock" }>;

export default function SkillsView({ data }: { data: SkillsBlockData }) {
  return (
    // Container: Liquid Glass Tile
    <div
      className="
        group relative flex flex-col items-center justify-center 
        p-6 rounded-2xl min-w-[140px] aspect-square
        transition-all duration-300 ease-out
        
        /* Glass Base */
        bg-white/5 backdrop-blur-md
        border border-white/5
        
        /* Initial Shadow (Subtle) */
        shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1),0_4px_10px_rgba(0,0,0,0.1)]

        /* --- HOVER STATE --- */
        hover:bg-white/10
        hover:border-white/20
        hover:scale-105
        hover:-translate-y-1
        hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.3),0_15px_30px_rgba(0,0,0,0.3)]
      "
    >
      {/* Icon Area */}
      {data.iconUrl ? (
        <div className="relative w-12 h-12 mb-3 transition-transform duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
          <Image
            fill
            src={data.iconUrl}
            alt={data.name || "Skill"}
            className="object-contain"
            sizes="48px"
          />
        </div>
      ) : (
        // Fallback Circle if no icon
        <div className="w-12 h-12 mb-3 rounded-full bg-white/10 flex items-center justify-center text-xl font-bold text-white/40 group-hover:text-white group-hover:bg-white/20 transition-colors">
          {data.name?.charAt(0) || "?"}
        </div>
      )}

      {/* Skill Name */}
      <h4 className="font-bold text-lg text-white/90 group-hover:text-white tracking-tight text-center">
        {data.name}
      </h4>

      {/* Level Badge (Optional - only shows if level exists) */}
      {data.level && (
        <span
          className="
            mt-2 px-2 py-0.5 text-[10px] uppercase tracking-widest font-semibold
            text-white/40 group-hover:text-white/80
            border border-white/5 group-hover:border-white/20 rounded-full
            bg-black/20 transition-colors
          "
        >
          {data.level}
        </span>
      )}

      {/* Shine Effect Overlay */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/0 via-white/0 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </div>
  );
}
