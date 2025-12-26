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
    // Tile Container:
    // 1. aspect-[4/3]: Keeps uniform shape.
    // 2. border-r & border-b: Creates the grid lines.
    <div className="group relative w-full aspect-[4/3] overflow-hidden bg-neutral-900 border-r border-b border-white/5  animate-holograph md:mt-8">
      {/* --- 1. Background Image --- */}
      {data.imageUrl ? (
        <Image
          src={data.imageUrl}
          alt={data.title || "Project"}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110 group-hover:rotate-1 "
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-white/5">
          <span className="text-white/20 font-mono text-xs">No Preview</span>
        </div>
      )}

      {/* --- 2. The Glass Overlay --- */}
      <div className="absolute bottom-0 left-0 md:inset-0 flex flex-col items-center justify-center py-4 md:p-4 text-center transition-all duration-300 md:opacity-0 md:group-hover:opacity-100 bg-gray-900/90 md:bg-black/60 backdrop-blur-[2px] w-full ">
        <div className="md:translate-y-4 md:group-hover:translate-y-0 transition-transform duration-300 ease-out flex flex-col items-center gap-2">
          {/* Title */}
          <h3 className="text-lg font-bold text-white tracking-tight drop-shadow-md leading-tight">
            {data.title}
          </h3>

          {/* Description */}
          {data.description && (
            <p className="text-[11px] hidden md:block md:text-gray-300 line-clamp-3 leading-relaxed max-w-[90%]">
              {data.description}
            </p>
          )}

          {/* Tech Pills */}
          {data.tech && (
            <div className="flex flex-wrap justify-center gap-1 my-1">
              {data.tech.slice(0, 6).map((tech, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 text-[9px] uppercase tracking-wider font-medium md:text-white/80 bg-white/10 rounded-full border border-white/10"
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
