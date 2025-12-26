import Image from "next/image";
import { PORTFOLIO_QUERY_RESULT } from "../../../sanity.types";

// Type Extraction
type HomeData = NonNullable<PORTFOLIO_QUERY_RESULT["home"]>;
type TabContent = NonNullable<
  NonNullable<
    NonNullable<HomeData["pageBuilder"]>[number]["tabs"]
  >[number]["content"]
>[number];
export type SkillsBlockData = Extract<TabContent, { _type: "skillsBlock" }>;

export default function SkillsView({ data }: { data: SkillsBlockData }) {
  return (
    <div className="flex flex-col items-center p-4 bg-white/5 rounded-xl border border-white/10 hover:border-white/20 transition-all min-w-30">
      {data.iconUrl && (
        <Image
          fill
          src={data.iconUrl}
          alt={data.name || "Skill"}
          className="w-12 h-12 mb-3 opacity-80"
        />
      )}
      <h4 className="font-bold text-lg">{data.name}</h4>
      <span className="text-xs uppercase tracking-widest text-white/40 mt-1">
        {data.level}
      </span>
    </div>
  );
}
