// src/components/views/TestimonialView.tsx
"use client";

import Image from "next/image";
import { Quote } from "lucide-react";
import { PORTFOLIO_QUERY_RESULT } from "../../../sanity.types";

// --- Type Extraction ---
type HomeData = NonNullable<PORTFOLIO_QUERY_RESULT["home"]>;
type PageBuilder = NonNullable<HomeData["pageBuilder"]>;
type TabContent = NonNullable<
  NonNullable<PageBuilder[number]["tabs"]>[number]["content"]
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
    <div className="group relative h-full max-w-3xl mx-auto flex flex-col ">
      <div className="relative mb-5 mx-auto w-full p-5 m-5 rounded-2xl border border-white/5 glass-card animate-slide-left bg-black/20  transition-colors duration-200 shadow-lg">
        {/* 1. Header: Minimal Quote Icon & Line */}
        <div className="flex items-center gap-3 mb-6 opacity-40 group-hover:opacity-100 transition-opacity duration-500">
          <Quote size={18} className="fill-white text-transparent" />
          <div className="h-px w-8 bg-white/30" />
        </div>

        {/* 2. The Quote text (Clean & Readable) */}
        <blockquote className="flex-1 mb-8">
          <p className="text-base md:text-lg font-light text-white/90 leading-relaxed tracking-wide">
            &quot;{data.quote}&quot;
          </p>
        </blockquote>

        {/* 3. Author Info (Compact & Sleek) */}
        <div className="flex items-center gap-3 pt-6 border-t border-white/5 group-hover:border-white/10 transition-colors">
          {/* Avatar */}
          <div className="relative shrink-0 w-10 h-10 rounded-full overflow-hidden bg-neutral-800 ring-1 ring-white/10 group-hover:ring-white/30 transition-all">
            {data.authorImageUrl ? (
              <Image
                fill
                src={data.authorImageUrl}
                alt={data.author || "Author"}
                className="object-cover"
                sizes="40px"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-xs font-bold text-white/40">
                {data.author?.charAt(0)}
              </div>
            )}
          </div>

          {/* Text Details */}
          <div className="flex flex-col justify-center">
            <cite className="not-italic font-medium text-sm text-white group-hover:text-blue-100 transition-colors">
              {data.author}
            </cite>
            <span className="text-[10px] uppercase tracking-widest text-white/40 group-hover:text-white/60 transition-colors">
              {data.role}
            </span>
          </div>
        </div>

        {/* Subtle Glow on Hover */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/0 via-white/0 to-white/5 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-700" />
      </div>
    </div>
  );
}
