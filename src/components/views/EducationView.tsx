// src/components/views/EducationView.tsx
"use client";

import { PORTFOLIO_QUERY_RESULT } from "../../../sanity.types";

// --- Type Extraction ---
type HomeData = NonNullable<PORTFOLIO_QUERY_RESULT["home"]>;
type PageBuilder = NonNullable<HomeData["pageBuilder"]>;
type TabContent = NonNullable<
  NonNullable<PageBuilder[number]["tabs"]>[number]["content"]
>[number];

export type EducationBlockData = Extract<
  TabContent,
  { _type: "educationBlock" }
>;

export default function EducationView({ data }: { data: EducationBlockData }) {
  // Helper to format dates
  const formatDate = (dateString?: string) => {
    if (!dateString) return "Present";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  return (
    // Container with Timeline Border & Slide Animation
    <div className="relative pl-8 border-l border-white/10 pt-4 group max-w-3xl mx-auto">
      {/* Timeline Dot */}
      <div className="absolute -left-1.25 top-9 w-2.5 h-2.5 rounded-full bg-white/20 group-hover:bg-blue-300 group-hover:scale-125 transition-all duration-300 shadow-[0_0_10px_rgba(255,255,255,0.2)]" />

      <div className="flex-1 min-w-0 md:bg-transparent md:border-none mobile-glass-only group-hover:bg-black/40 group-hover:backdrop-blur-[3px] animate-slide-up text-white/70 group-hover:text-white  px-3 py-2 rounded-md group-hover:shadow-sm transition-colors duration-100">
        {/* University Name */}
        <h3 className="text-xl font-bold text-white group-hover:text-blue-200 transition-colors">
          {data.university}
        </h3>

        {/* Degree */}
        <div className="text-lg text-white/90 font-medium">{data.degree}</div>

        {/* Date Range */}
        <div className="text-sm text-white/70 flex items-center gap-2 mt-0.5">
          <span>
            {formatDate(data.startDate)} –{" "}
            {data.endDate ? formatDate(data.endDate) : "Present"}
          </span>
        </div>

        {/* Description (Rich Text) */}
        {data.description && (
          <div className="mt-4 text-white/80 text-sm leading-relaxed space-y-2">
            {data.description.map((block) => {
              if (block._type === "block" && block.children) {
                return (
                  <p key={block._key}>
                    {block.children.map((child) => child.text).join("")}
                  </p>
                );
              }
              return null;
            })}
          </div>
        )}
      </div>
    </div>
  );
}
