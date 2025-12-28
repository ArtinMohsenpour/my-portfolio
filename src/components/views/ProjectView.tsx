// src/components/views/ProjectView.tsx
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
    // Tile Container
    <div className="group relative w-full aspect-4/3 overflow-hidden bg-neutral-900 border-r border-b border-white/5 animate-holograph ">
      {/* --- 1. Background Image --- */}
      {data.imageUrl ? (
        <Image
          src={data.imageUrl}
          alt={data.title || "Project"}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110 group-hover:rotate-1"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-white/5">
          <span className="text-white/20 font-mono text-xs">No Preview</span>
        </div>
      )}

      {/* ==============================
          MOBILE VIEW (Split Layout)
      ============================== */}

      {/* Mobile Top: Title Only */}
      <div className="absolute top-0 left-0 w-full p-4 pt-3 pb-8 bg-gradient-to-b  md:hidden z-10 pointer-events-none">
        <h3 className="text-base font-bold text-white tracking-tight drop-shadow-md leading-tight text-center w-fit bg-gray-900/80 px-2 py-1 rounded-md mx-auto">
          {data.title}
        </h3>
      </div>

      {/* Mobile Bottom: Content (Tech + Button) */}
      <div className="absolute bottom-0 left-0 w-full p-3 pt-8 pb-3 bg-gradient-to-t from-gray-900 via-gray-800/90 to-transparent md:hidden z-10 flex flex-col items-center gap-2">
        {/* Tech Pills (Mobile) */}
        {data.tech && (
          <div className="flex flex-wrap justify-center gap-1">
            {data.tech.slice(0, 4).map((tech, i) => (
              <span
                key={i}
                className="px-2 py-0.5 text-[9px] uppercase tracking-wider font-medium text-white/90 bg-white/10 rounded-full border border-white/10 backdrop-blur-sm"
              >
                {tech}
              </span>
            ))}
            {data.tech.length > 4 && (
              <span className="px-1.5 py-0.5 text-[9px] text-white/50">+</span>
            )}
          </div>
        )}

        {/* Button (Mobile) */}
        {data.link && (
          <div className="mt-0.5">
            <LiquidButton
              href={data.link}
              className="px-3! py-1! text-[10px]! min-h-7! bg-white/10! border-white/10!"
            >
              View
            </LiquidButton>
          </div>
        )}
      </div>

      {/* ==============================
          DESKTOP VIEW (Unified Overlay)
      ============================== */}

      <div className="hidden md:flex absolute inset-0 flex-col items-center justify-center p-4 text-center transition-all duration-300 opacity-0 group-hover:opacity-100 bg-black/60 backdrop-blur-md">
        <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300 ease-out flex flex-col items-center gap-2">
          {/* Title */}
          <h3 className="text-lg font-bold text-white tracking-tight drop-shadow-md leading-tight">
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