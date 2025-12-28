// src/components/Navigation.tsx
"use client";

import { useState } from "react";
import { LiquidButton } from "./ui/LiquidButton";
import { Download } from "lucide-react";
import { PORTFOLIO_QUERY_RESULT } from "../../sanity.types";
import ContactModal from "./ui/ContactModal";

interface NavigationProps {
  navData: PORTFOLIO_QUERY_RESULT["nav"] | null;
}

export default function Navigation({ navData }: NavigationProps) {
  const [isContactOpen, setIsContactOpen] = useState(false);

  // State to store the contact info from the clicked button
  const [activeContactData, setActiveContactData] = useState<{
    email?: string;
    socialLinks?: Array<{ platform?: string; url?: string }>;
  } | null>(null);

  const items = navData?.items || [];

  if (items.length === 0) return null;

  // Helper to handle opening the modal with specific data
  const handleContactClick = (item: NonNullable<typeof items>[number]) => {
    setActiveContactData({
      // Sanity fields might be undefined, so we pass them as-is
      // The Modal will handle fallbacks
      email: item.contactEmail,
      socialLinks: item.socialLinks,
    });
    setIsContactOpen(true);
  };

  return (
    <>
      <nav className="fixed top-0 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-3 p-3 md:p-8 rounded-full">
        {items.map((item) => {
          const key = item._key || item.title;

          // 1. Contact Action
          if (item.actionType === "contact") {
            return (
              <LiquidButton key={key} onClick={() => handleContactClick(item)}>
                {item.title}
              </LiquidButton>
            );
          }

          // 2. Download Action
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

          // 3. External/Internal Link
          return (
            <LiquidButton key={key} href={item.url || "#"}>
              {item.title}
            </LiquidButton>
          );
        })}
      </nav>

      {/* The Modal lives outside the loop.
         We map the Sanity data structure to the Modal's expected props.
      */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        // Pass the CMS data (with fallbacks handled in the modal or here)
        email={activeContactData?.email}
        socialLinks={activeContactData?.socialLinks?.map((link) => ({
          platform: link.platform || "Web",
          url: link.url || "#",
        }))}
      />
    </>
  );
}