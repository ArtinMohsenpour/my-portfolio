// src/components/views/SkillsView.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { PORTFOLIO_QUERY_RESULT } from "../../../sanity.types";

// Type Extraction
type HomeData = NonNullable<PORTFOLIO_QUERY_RESULT["home"]>;
type PageBuilder = NonNullable<HomeData["pageBuilder"]>;
type Tabs = NonNullable<PageBuilder[number]["tabs"]>;
type TabContent = NonNullable<Tabs[number]["content"]>[number];

export type SkillsBlockData = Extract<TabContent, { _type: "skillsBlock" }>;

export default function SkillsView({ data }: { data: SkillsBlockData }) {
  const [isHovered, setIsHovered] = useState(false);

  // --- Dynamic Style Logic ---
  // We only apply these styles if isHovered is true AND data.color exists.
  // Otherwise, we return an empty object, allowing the default CSS classes to take over.
  const hoverStyle =
    isHovered && data.color
      ? ({
          backgroundColor: `${data.color}15`, // 15 = ~8% opacity
          borderColor: `${data.color}50`, // 50 = ~30% opacity
          boxShadow: `0 4px 20px -5px ${data.color}30`, // Colored Glow
        } as React.CSSProperties)
      : {};

  return (
    <div
      // 1. Event Handlers for Hover State
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      // 2. Base Classes (The "Original Design")
      className="
        group flex items-center gap-4 p-3 rounded-lg w-full
        transition-all duration-300 ease-out
        border border-white/5 
        bg-white/5 backdrop-blur-sm
        animate-slide-up
      "
      // 3. Dynamic Inline Styles (Applied ONLY on hover)
      style={hoverStyle}
    >
      {/* Icon Container */}
      <div
        className="
          relative shrink-0 w-10 h-10 rounded-lg flex items-center justify-center 
          overflow-hidden border border-white/5 
          bg-white/5 
          group-hover:scale-110 transition-transform duration-300
        "
        // Optional: Tint the icon box slightly on hover too if you want
        style={
          isHovered && data.color ? { borderColor: `${data.color}50` } : {}
        }
      >
        {data.iconUrl ? (
          <div className="relative w-6 h-6">
            <Image
              fill
              src={data.iconUrl}
              alt={data.name || "Skill"}
              className="object-contain opacity-80 group-hover:opacity-100 transition-opacity"
              sizes="24px"
            />
          </div>
        ) : (
          <span className="text-xs font-bold text-white/30 group-hover:text-white">
            {data.name?.charAt(0) || "?"}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1">
        <h4 className="text-sm font-bold text-white/90 group-hover:text-white transition-colors">
          {data.name}
        </h4>

        {data.level && (
          <div className="flex items-center gap-2 mt-1">
            {/* Progress Bar Track */}
            <div className="h-1 w-16 bg-white/10 rounded-full overflow-hidden">
              {/* Progress Bar Fill */}
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width:
                    data.level === "expert"
                      ? "100%"
                      : data.level === "proficient"
                        ? "70%"
                        : "40%",
                  // Use the color if available, otherwise fallback to blue
                  backgroundColor: data.color || "#60a5fa",
                }}
              />
            </div>

            <span className="text-[9px] uppercase tracking-wider text-white/60 group-hover:text-white/70 transition-colors">
              {data.level}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}