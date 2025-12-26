import { PORTFOLIO_QUERY_RESULT } from "../../../sanity.types";

// Type Extraction
type HomeData = NonNullable<PORTFOLIO_QUERY_RESULT["home"]>;
type TabContent = NonNullable<
  NonNullable<
    NonNullable<HomeData["pageBuilder"]>[number]["tabs"]
  >[number]["content"]
>[number];
export type EducationBlockData = Extract<
  TabContent,
  { _type: "educationBlock" }
>;

export default function EducationView({ data }: { data: EducationBlockData }) {
  return (
    <div className="relative pl-8 border-l border-white/10 py-2">
      <div className="-left-1.25 absolute top-3 w-2.5 h-2.5 rounded-full bg-white/20" />
      <h3 className="text-xl font-bold">{data.university}</h3>
      <p className="text-lg text-white/80">{data.degree}</p>
      <p className="text-sm text-white/40 mt-1">
        {data.startDate} — {data.endDate || "Present"}
      </p>
    </div>
  );
}
