// src/components/views/BioView.tsx
import Image from "next/image";
import Link from "next/link";
import { PortableText } from "next-sanity";
import { Github, Linkedin, Twitter, Globe, Mail } from "lucide-react";
import { PORTFOLIO_QUERY_RESULT } from "../../../sanity.types";

// --- Types ---
type HomeData = NonNullable<PORTFOLIO_QUERY_RESULT["home"]>;
type PageBuilder = NonNullable<HomeData["pageBuilder"]>;
type Tabs = NonNullable<PageBuilder[number]["tabs"]>;
type TabContent = NonNullable<Tabs[number]["content"]>[number];

export type BioBlockData = Extract<TabContent, { _type: "bioBlock" }>;

// Helper to map social platforms to icons
const getSocialIcon = (platform?: string) => {
  const p = platform?.toLowerCase() || "";
  if (p.includes("github")) return <Github className="w-5 h-5" />;
  if (p.includes("linkedin")) return <Linkedin className="w-5 h-5" />;
  if (p.includes("twitter") || p.includes("x"))
    return <Twitter className="w-5 h-5" />;
  if (p.includes("mail") || p.includes("email"))
    return <Mail className="w-5 h-5" />;
  return <Globe className="w-5 h-5" />;
};

export default function BioView({ data }: { data: BioBlockData }) {
  return (
    <section className="w-full max-w-6xl mx-auto   md:pb-20 pt-2">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start ">
        {/* --- LEFT COLUMN: CONTENT (Span 7/12) --- */}
        <div className="lg:col-span-7 flex flex-col justify-center p-6 md:p-10 rounded-lg md:rounded-3xl overflow-hidden glass-card bg-black/15 animate-holograph">
          {/* Subtle internal shine effect */}
          <div className="absolute top-0 left-0 w-full h-1/2 pointer-events-none" />

          {/* Header Info */}
          <div className="relative z-10">
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white drop-shadow-sm">
              {data.fullName}
            </h1>
            <h2 className="text-base md:text-2xl text-white/60 font-medium mt-2 tracking-wide">
              {data.jobTitle}
            </h2>
          </div>

          {/* Description (Portable Text) */}
          {data.description && (
            <div className="relative z-10 mt-6 text-white/90 leading-relaxed text-sm md:text-justify space-y-4 font-light">
              <PortableText value={data.description} />
            </div>
          )}

          {/* Social Links */}
          {data.socialLinks && data.socialLinks.length > 0 && (
            <div className="relative z-10 mt-8 flex flex-wrap gap-3">
              {data.socialLinks.map((link) => (
                <Link
                  key={link._key}
                  href={link.url || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/30 transition-all duration-300 backdrop-blur-sm text-sm font-medium text-white/80 hover:text-white hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                  style={{ color: link.color }}
                >
                  <span className="group-hover:scale-110 transition-transform duration-300">
                    {getSocialIcon(link.platform)}
                  </span>
                  <span>{link.platform}</span>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* --- RIGHT COLUMN: IMAGE (Span 5/12) --- */}
        <div className="lg:col-span-5 aspect-square lg:aspect-auto lg:h-full max-h-100 flex items-center justify-center animate-holograph">
          {data.profileImageUrl ? (
            <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border border-white/5">
              <Image
                src={data.profileImageUrl}
                alt={data.fullName || "Profile"}
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                sizes="(max-width: 768px) 100vw, 40vw"
                priority
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-60" />
            </div>
          ) : (
            <div className="flex items-center justify-center w-full h-full bg-white/5 text-white/20">
              <span className="text-lg">No Image Available</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
