// src/app/page.tsx
import { sanityFetch } from "@/sanity/lib/live";
import { PORTFOLIO_QUERY } from "@/sanity/lib/queries";
import Navigation from "@/components/Navigation";
import StickyBackground from "@/components/ui/StickyBackground"; // Import here
import { Navigation as NavType, Home as HomeType } from "../../sanity.types";

export default async function Page() {
  const response = await sanityFetch({ query: PORTFOLIO_QUERY });
  const data = response.data as { nav: NavType; home: HomeType };

  if (!data?.home) return null;

  return (
    <main className="relative min-h-screen">
      {/* Background is at the bottom of the stack (-z-50) */}
      <StickyBackground />

      {/* Navigation is at the top (z-100) */}
      {data.nav && <Navigation navData={data.nav} />}

      <section className="relative z-10 h-screen flex flex-col items-center justify-center px-6">
        <h1 className="text-7xl md:text-9xl font-bold tracking-tighter text-white">
          {data.home.heroTitle}
        </h1>
      </section>
    </main>
  );
}
