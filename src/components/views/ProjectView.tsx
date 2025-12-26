import { LiquidButton } from "../ui/LiquidButton";
import { PORTFOLIO_QUERY_RESULT } from "../../../sanity.types";
import Image from "next/image";

// Type Extraction
type HomeData = NonNullable<PORTFOLIO_QUERY_RESULT["home"]>;
type TabContent = NonNullable<
  NonNullable<
    NonNullable<HomeData["pageBuilder"]>[number]["tabs"]
  >[number]["content"]
>[number];
export type ProjectBlockData = Extract<TabContent, { _type: "projectBlock" }>;

export default function ProjectView({ data }: { data: ProjectBlockData }) {
  return (
    <div className="group relative rounded-2xl overflow-hidden hover:bg-white/10 transition-colors duration-300 ">
      <div className="grid md:grid-cols-2 gap-6 p-6">
        {data.imageUrl && (
          <div className="relative aspect-video rounded-xl overflow-hidden bg-black/50">
            <Image
              fill
              src={data.imageUrl}
              alt={data.title || "Project"}
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        )}
        <div className="flex flex-col justify-center gap-4">
          <h3 className="text-2xl font-bold">{data.title}</h3>
          <p className="text-white/70 leading-relaxed">{data.description}</p>

          {data.tech && (
            <div className="flex flex-wrap gap-2">
              {data.tech.map((tech, i) => (
                <span
                  key={i}
                  className="px-3 py-1 text-xs rounded-full bg-white/5 border border-white/5 text-white/50"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}

          {data.link && (
            <div className="mt-2">
              <LiquidButton href={data.link}>View Project</LiquidButton>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
