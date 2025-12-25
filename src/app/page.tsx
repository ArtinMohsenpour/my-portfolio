// src/app/page.tsx
import { sanityFetch } from "@/sanity/lib/live";
import { PORTFOLIO_QUERY } from "@/sanity/lib/queries";
import Navigation from "@/components/Navigation";
import StickyBackground from "@/components/ui/StickyBackground";
import HomeContent from "@/components/HomeContent";

export default async function Page() {
  const { data } = await sanityFetch({ query: PORTFOLIO_QUERY });

  if (!data?.home) return null;

  return (
    <main className="relative min-h-screen">
      <StickyBackground />
      {data.nav && <Navigation navData={data.nav} />}

      {/* Pass the home data to a specialized content component */}
      <HomeContent data={data.home} />
    </main>
  );
}