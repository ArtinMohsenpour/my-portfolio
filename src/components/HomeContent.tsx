// src/components/HomeContent.tsx
import { PORTFOLIO_QUERY_RESULT } from "../../sanity.types";

type HomeData = NonNullable<PORTFOLIO_QUERY_RESULT["home"]>;

export default function HomeContent({ data }: { data: HomeData }) {
  return (
    <>
      {/* Page Builder Sections */}
      {data.pageBuilder?.map((section) => {
        // Add other section types here (e.g., GridSection, Marquee, etc.)
        return null;
      })}
    </>
  );
}
