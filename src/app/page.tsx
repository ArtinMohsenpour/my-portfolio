// src/app/page.tsx
import { sanityFetch } from "@/sanity/lib/live";
import { PORTFOLIO_QUERY } from "@/sanity/lib/queries";
import Navigation from "@/components/Navigation";
import HomeContent from "@/components/HomeContent";

export default async function Page() {
  const { data } = await sanityFetch({ query: PORTFOLIO_QUERY });
  console.log("Fetched data:", data.home);

  if (!data?.home) return null;

  return (
    <main className="relative min-h-screen w-full">
      {data.nav && <Navigation navData={data.nav} />}
      <HomeContent data={data.home} />
    </main>
  );
}