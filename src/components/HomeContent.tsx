"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PORTFOLIO_QUERY_RESULT } from "../../sanity.types";

// Import Components
import TabsSection from "./sections/TabsSection";
import BioView from "./views/BioView";
import ProjectView from "./views/ProjectView";
import SkillsView from "./views/SkillsView";
import EducationView from "./views/EducationView";
import TestimonialView from "./views/TestimonialView";
import ExperienceView from "./views/ExperienceView";

type HomeData = NonNullable<PORTFOLIO_QUERY_RESULT["home"]>;

export default function HomeContent({ data }: { data: HomeData }) {
  // 1. Find the Tabs Section from the Page Builder
  const tabsSection = data.pageBuilder?.find(
    (section) => section._type === "tabsSection"
  );
  const tabs = tabsSection?.tabs || [];

  // 2. Initialize State (Default to first tab)
  const [activeTabKey, setActiveTabKey] = useState<string | null>(
    tabs.length > 0 ? tabs[0]._key : null
  );

  // 3. Get Active Content
  const activeTabContent =
    tabs.find((t) => t._key === activeTabKey)?.content || [];

  return (
    <div className="mx-auto px-4  flex flex-col items-center mt-14 ">
      {/* TABS BUTTONS ONLY */}
      {tabs.length > 0 && (
        <TabsSection
          tabs={tabs}
          activeTabKey={activeTabKey}
          onTabChange={setActiveTabKey}
        />
      )}

      {/* CONTENT AREA */}
      <div className="fixed top-12.5 bottom-0 left-0 right-0 no-scrollbar mx-auto px-2 sm:px-0 w-full max-w-5xl overflow-hidden z-0 pb-26">
        <div className="relative w-full h-full overflow-y-auto no-scrollbar mx-auto max-w-5xl mt-24 mb-64">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTabKey}
              initial={{ opacity: 0, y: 10, filter: "blur(5px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -10, filter: "blur(5px)" }}
              transition={{ duration: 0.3 }}
              className="w-full flex flex-col gap-6 mb-32"
            >
              {/* Map over the content array and render the correct VIEW component */}
              {activeTabContent.map((block) => {
                switch (block._type) {
                  case "bioBlock":
                    return <BioView key={block._key} data={block} />;

                  case "projectBlock":
                    return <ProjectView key={block._key} data={block} />;

                  case "educationBlock":
                    return <EducationView key={block._key} data={block} />;

                  case "experienceBlock":
                    return <ExperienceView key={block._key} data={block} />;

                  case "skillsBlock":
                    return (
                      // Optional: You might want a grid wrapper if there are many skills
                      <div className="inline-block m-2" key={block._key}>
                        <SkillsView data={block} />
                      </div>
                    );

                  case "testimonialBlock":
                    return <TestimonialView key={block._key} data={block} />;

                  default:
                    return null;
                }
              })}

              {activeTabContent.length === 0 && (
                <div className="text-center text-white/30 py-12">
                  No content found for this section.
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
