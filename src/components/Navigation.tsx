// src/components/Navigation.tsx
"use client";

import { LiquidButton } from "./ui/LiquidButton";
import Link from "next/link";
import { Navigation as NavigationTypes } from "../../sanity.types"; // Path to your generated types

interface NavigationProps {
  // We use the specific result type from your GROQ query
  navData: NavigationTypes | null;
}

export default function Navigation({ navData }: NavigationProps) {
  // Type-safe access to items
  const items = navData?.items || [];

  if (items.length === 0) return null;

  return (
    <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-100 flex items-center gap-3 p-2 rounded-full bg-black/20 backdrop-blur-2xl border border-white/5 shadow-2xl">
      {items.map((item) => {
        // Now TypeScript knows exactly what item.actionType can be
        const key = item._key || item.title;

        if (item.actionType === "download") {
          return (
            <LiquidButton key={key} href={item.url ?? undefined} download>
              {item.title}
            </LiquidButton>
          );
        }

        if (item.actionType === "contact") {
          return (
            <LiquidButton key={key} onClick={() => console.log("Open Modal")}>
              {item.title}
            </LiquidButton>
          );
        }

        return (
          <Link key={key} href={item.url || "#"} passHref legacyBehavior>
            <LiquidButton>{item.title}</LiquidButton>
          </Link>
        );
      })}
    </nav>
  );
}
