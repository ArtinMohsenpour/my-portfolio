import Image from "next/image";
import { PORTFOLIO_QUERY_RESULT } from "../../../sanity.types";

// Type Extraction
type HomeData = NonNullable<PORTFOLIO_QUERY_RESULT["home"]>;
type TabContent = NonNullable<
  NonNullable<
    NonNullable<HomeData["pageBuilder"]>[number]["tabs"]
  >[number]["content"]
>[number];
export type TestimonialBlockData = Extract<
  TabContent,
  { _type: "testimonialBlock" }
>;

export default function TestimonialView({
  data,
}: {
  data: TestimonialBlockData;
}) {
  return (
    <div className="p-8 bg-linear-to-br from-white/5 to-transparent rounded-2xl border border-white/10 relative">
      <span className="absolute top-4 left-4 text-6xl text-white/5 font-serif"></span>
      <p className="relative z-10 text-lg italic text-white/80 mb-6 text-center">
        {data.quote}
      </p>
      <div className="flex items-center justify-center gap-4">
        {data.authorImageUrl && (
          <Image
            fill
            src={data.authorImageUrl}
            alt={data.author || "Author"}
            className="w-12 h-12 rounded-full border border-white/20"
          />
        )}
        <div className="text-left">
          <div className="font-bold">{data.author}</div>
          <div className="text-xs text-white/50">{data.role}</div>
        </div>
      </div>
    </div>
  );
}
