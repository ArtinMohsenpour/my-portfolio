import Image from "next/image";
import { PORTFOLIO_QUERY_RESULT } from "../../../sanity.types";

// Extract the specific shape of 'bioBlock' from the Query Result
type HomeData = NonNullable<PORTFOLIO_QUERY_RESULT["home"]>;
type PageBuilder = NonNullable<HomeData["pageBuilder"]>;
type Tabs = NonNullable<PageBuilder[number]["tabs"]>;
type TabContent = NonNullable<Tabs[number]["content"]>[number];

export type BioBlockData = Extract<TabContent, { _type: "bioBlock" }>;

export default function BioView({ data }: { data: BioBlockData }) {
  return (
    <section className="flex flex-col items-center justify-center py-10 gap-6 max-w-4xl mx-auto text-center">
      {/* data.profileImageUrl is now strictly typed as string | null */}
      {data.profileImageUrl && (
        <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-white/10 shadow-2xl">
          <Image
            fill
            src={data.profileImageUrl}
            alt={data.fullName || "Profile"}
            className="object-cover w-full h-full"
          />
        </div>
      )}
      <div>
        <h1 className="text-4xl font-bold tracking-tight">{data.fullName}</h1>
        <p className="text-xl text-white/60 mt-2">{data.jobTitle}</p>
      </div>
    </section>
  );
}
