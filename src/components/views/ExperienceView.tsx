// src/components/views/ExperienceView.tsx
"use client";

import Image from "next/image";
import { PORTFOLIO_QUERY_RESULT } from "../../../sanity.types";

// --- Type Extraction ---
type HomeData = NonNullable<PORTFOLIO_QUERY_RESULT["home"]>;
type PageBuilder = NonNullable<HomeData["pageBuilder"]>;
type TabContent = NonNullable<
  NonNullable<PageBuilder[number]["tabs"]>[number]["content"]
>[number];

export type ExperienceBlockData = Extract<
  TabContent,
  { _type: "experienceBlock" }
>;

export default function ExperienceView({
  data,
}: {
  data: ExperienceBlockData;
}) {
  // Helper to format dates (e.g. "2023-01" -> "Jan 2023")
  const formatDate = (dateString?: string) => {
    if (!dateString) return "Present";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="relative pl-8 border-l border-white/10 pt-4 group ml-6 animate-slide-up max-w-3xl mx-auto">
      {/* Timeline Dot */}
      <div className="absolute  -left-1.25 top-8 w-2.5 h-2.5 rounded-full bg-white/20 group-hover:bg-white group-hover:scale-125 transition-all duration-300 shadow-[0_0_10px_rgba(255,255,255,0.2)]" />

      <div className="flex flex-col sm:flex-row gap-5 items-start">
        {/* Company Logo (LinkedIn Style) */}
        {data.companyLogoUrl ? (
          <div className="relative shrink-0 w-12 h-12 rounded-md overflow-hidden bg-white/5 border border-white/10 mt-1 shadow-sm">
            <Image
              src={data.companyLogoUrl}
              alt={data.companyName || "Company Logo"}
              fill
              className="object-cover"
              sizes="48px"
            />
          </div>
        ) : (
          // Fallback if no logo image is provided
          <div className="relative shrink-0 w-12 h-12 rounded-md bg-white/5 border border-white/10 mt-1 flex items-center justify-center text-xs font-bold text-white/60">
            {data.companyName?.slice(0, 2).toUpperCase()}
          </div>
        )}

        <div className="flex-1 min-w-0">
          {/* Role & Company */}
          <h3 className="text-xl font-bold text-white group-hover:text-blue-200 transition-colors truncate">
            {data.position}
          </h3>
          <div className="text-base text-white/90 mt-0.5 font-medium">
            {data.companyName}
          </div>

          {/* Metadata Row: Date • Location */}
          <div className="text-sm text-white/80 mt-1 flex flex-wrap gap-x-2 items-center">
            <span>
              {formatDate(data.startDate)} –{" "}
              {data.isCurrent ? "Present" : formatDate(data.endDate)}
            </span>
            {data.location && (
              <>
                <span className="w-1 h-1 rounded-full bg-white/20" />
                <span>{data.location}</span>
              </>
            )}
          </div>

          {/* Description (Rich Text Rendering) */}
          {data.description && (
            <div className="mt-4 text-white/70 text-sm leading-relaxed space-y-2">
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

          {/* Skills / Technologies Tags */}
          {data.technologies && data.technologies.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {data.technologies.map((tech, i) => (
                <span
                  key={i}
                  className="px-2.5 py-0.5 text-xs rounded-full bg-white/5 border border-white/10 text-white/50 hover:bg-white/10 hover:text-white/80 transition-colors cursor-default"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
