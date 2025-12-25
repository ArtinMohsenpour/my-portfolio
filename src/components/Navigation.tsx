// src/components/Navigation.tsx
"use client";

import { LiquidButton } from "./ui/LiquidButton";
import { Download } from "lucide-react"; // Import the icon
import { PORTFOLIO_QUERY_RESULT } from "../../sanity.types";

interface NavigationProps {
  navData: PORTFOLIO_QUERY_RESULT["nav"] | null;
}

export default function Navigation({ navData }: NavigationProps) {
  const items = navData?.items || [];
  console.log("Navigation items:", items);

  if (items.length === 0) return null;

  return (
    <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-100 flex items-center gap-3 p-2 rounded-full">
      {items.map((item) => {
        const key = item._key || item.title;

        // Contact Action Case
        if (item.actionType === "contact") {
          return (
            <LiquidButton key={key} onClick={() => console.log("Open Modal")}>
              {item.title}
            </LiquidButton>
          );
        }

        // Download Link Case
        if (item.actionType === "download") {
          return (
            <LiquidButton key={key} href={item.fileUrl ?? undefined} download>
              <span className="flex items-center gap-2">
                {item.title}
                <Download size={16} className="opacity-80" />
              </span>
            </LiquidButton>
          );
        }

        // Standard Link Case
        return (
          <LiquidButton key={key} href={item.url || "#"}>
            {item.title}
          </LiquidButton>
        );
      })}
    </nav>
  );
}