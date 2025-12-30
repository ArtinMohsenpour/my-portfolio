"use client";

import Image from "next/image";
import { PORTFOLIO_QUERY_RESULT } from "../../../sanity.types";
import { LiquidButton } from "../ui/LiquidButton";

// --- Types ---
type HomeData = NonNullable<PORTFOLIO_QUERY_RESULT["home"]>;
type PageBuilder = NonNullable<HomeData["pageBuilder"]>;
type Tabs = NonNullable<PageBuilder[number]["tabs"]>;
type TabContent = NonNullable<Tabs[number]["content"]>[number];

export type ProjectBlockData = Extract<TabContent, { _type: "projectBlock" }>;

export default function ProjectView({ data }: { data: ProjectBlockData }) {
  return (
    <div className="group glass-card relative w-full flex flex-col md:block md:aspect-4/3    md:overflow-hidden mb-3 md:mb-0 pt-1 mt-2 sm:p-0 sm:m-0 rounded-b-lg sm:rounded-b-none">
      {/* --- 1. Background Image --- */}
      {/* Mobile: Aspect Video (16:9) | Desktop: Absolute Fill */}
      <div className="relative w-full  aspect-video md:aspect-auto md:absolute md:inset-0 md:h-full animate-holograph">
        {data.imageUrl ? (
          <Image
            src={data.imageUrl}
            alt={data.title || "Project"}
            fill
            className="object-cover px-1 md:p-0 "
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-white/5">
            <span className="text-white/20 font-mono text-xs">No Preview</span>
          </div>
        )}
      </div>

      {/* ==============================
           MOBILE VIEW (Glassy Card)
      ============================== */}
      <div className="md:hidden relative z-10 ">
        {/* The Glassy Card Container */}
        <div className=" bg-black/20 p-5 flex flex-col items-center gap-4 relative animate-holograph rounded-b-lg">
          {/* Title: Positioned on the top border line */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-neutral-900/90 border border-white/10 px-4 py-1 rounded-full shadow-lg whitespace-nowrap z-20">
            <h3 className="text-sm font-bold text-white tracking-wide">
              {data.title}
            </h3>
          </div>

          {/* Tech Pills (Mobile) */}
          {data.tech && (
            <div className="flex flex-wrap justify-center gap-1.5 pt-1">
              {data.tech.slice(0, 5).map((tech, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 text-[10px] uppercase tracking-wider font-medium text-white/80 bg-white/5 rounded-full border border-white/10"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}

          {/* Button (Mobile) */}
          {data.link && (
            <div>
              <LiquidButton
                href={data.link}
                className="px-5! py-1! text-xs! min-h-8! bg-white/5!"
              >
                View Project
              </LiquidButton>
            </div>
          )}
        </div>
      </div>

      {/* ==============================
           DESKTOP VIEW (Original Overlay)
      ============================== */}
      <div className="hidden md:flex absolute inset-0 flex-col items-center justify-center p-4 text-center transition-all duration-300 opacity-0 group-hover:opacity-100 bg-black/60 backdrop-blur-md z-120">
        <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300 ease-out flex flex-col items-center gap-2">
          {/* Title */}
          <h3 className="text-lg font-bold text-white tracking-tight leading-tight">
            {data.title}
          </h3>

          {/* Description (Desktop Only) */}
          {data.description && (
            <p className="text-[11px] text-gray-300 line-clamp-3 leading-relaxed max-w-[90%]">
              {data.description}
            </p>
          )}

          {/* Tech Pills */}
          {data.tech && (
            <div className="flex flex-wrap justify-center gap-1 my-1">
              {data.tech.slice(0, 6).map((tech, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 text-[9px] uppercase tracking-wider font-medium text-white/80 bg-white/10 rounded-full border border-white/10"
                >
                  {tech}
                </span>
              ))}
              {data.tech.length > 6 && (
                <span className="px-1.5 py-0.5 text-[9px] text-white/50">
                  +
                </span>
              )}
            </div>
          )}

          {/* Button */}
          {data.link && (
            <div className="mt-1">
              <LiquidButton
                href={data.link}
                className="px-3! py-1! text-[10px]! min-h-7!"
              >
                View
              </LiquidButton>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
