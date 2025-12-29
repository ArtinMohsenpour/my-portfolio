"use client";

// 1. Import useRef and useEffect
import { useState, useRef, useEffect } from "react";
import { PORTFOLIO_QUERY_RESULT } from "../../sanity.types";

// Import Components
import TabsSection from "./sections/TabsSection";
import BioView from "./views/BioView";
import ProjectView from "./views/ProjectView";
import SkillsView from "./views/SkillsView";
import EducationView from "./views/EducationView";
import TestimonialView from "./views/TestimonialView";
import ExperienceView from "./views/ExperienceView";
import { SkillsBlockData } from "./views/SkillsView";

type HomeData = NonNullable<PORTFOLIO_QUERY_RESULT["home"]>;

export default function HomeContent({ data }: { data: HomeData }) {
  const tabsSection = data.pageBuilder?.find(
    (section) => section._type === "tabsSection"
  );
  const tabs = tabsSection?.tabs || [];

  const [activeTabKey, setActiveTabKey] = useState<string | null>(
    tabs.length > 0 ? tabs[0]._key : null
  );

  // 2. Create the Ref for the scrollable container
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // 3. Add Effect: When activeTabKey changes, scroll to top
  useEffect(() => {
    if (scrollContainerRef.current) {
      // "instant" makes it snap to top immediately, which feels snappier for tabs
      scrollContainerRef.current.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [activeTabKey]);

  const activeTabContent =
    tabs.find((t) => t._key === activeTabKey)?.content || [];

  // --- SKILLS LOGIC: Grouping ---
  const skillsList = activeTabContent.filter(
    (b): b is SkillsBlockData => b._type === "skillsBlock"
  );
  const otherContent = activeTabContent.filter(
    (b) => b._type !== "skillsBlock"
  );

  // Group by Category
  const frontendSkills = skillsList.filter((s) => s.category === "frontend");
  const backendSkills = skillsList.filter((s) => s.category === "backend");
  const devopsSkills = skillsList.filter((s) => s.category === "devops");
  const softSkills = skillsList.filter((s) => s.category === "soft");

  return (
    <div className="mx-auto flex flex-row flex-wrap items-center w-full h-fit min-h-screen">
      {/* TABS BUTTONS */}
      {tabs.length > 0 && (
        <TabsSection
          tabs={tabs}
          activeTabKey={activeTabKey}
          onTabChange={setActiveTabKey}
        />
      )}

      {/* CONTENT AREA */}
      <div className="fixed top-12.5 bottom-0 left-0 right-0 no-scrollbar w-full overflow-hidden z-0 pb-26 px-6 md:px-0">
        {/* 4. Attach the ref to the div that has 'overflow-y-auto' */}
        <div
          ref={scrollContainerRef}
          className="relative w-full h-full overflow-y-auto no-scrollbar mx-auto mt-24 mb-64 max-w-7xl md:px-4"
        >
          <div key={activeTabKey} className="w-full flex flex-col gap-6 mb-32">
            {/* 1. RENDER NON-SKILL CONTENT (Bio, Projects, etc.) normally */}
            {otherContent.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 w-full pt-6">
                {otherContent.map((block) => {
                  const isProject = block._type === "projectBlock";
                  const colSpanClass = isProject
                    ? "col-span-1"
                    : "col-span-1 sm:col-span-2 lg:col-span-4 px-4";

                  return (
                    <div key={block._key} className={colSpanClass}>
                      {/* Block Rendering Switch */}
                      {(() => {
                        switch (block._type) {
                          case "bioBlock":
                            return <BioView data={block} />;
                          case "projectBlock":
                            return <ProjectView data={block} />;
                          case "educationBlock":
                            return <EducationView data={block} />;
                          case "experienceBlock":
                            return <ExperienceView data={block} />;
                          case "testimonialBlock":
                            return <TestimonialView data={block} />;
                          default:
                            return null;
                        }
                      })()}
                    </div>
                  );
                })}
              </div>
            )}

            {/* 2. SKILLS (3 Columns, Centered Headers, List Items) */}
            {skillsList.length > 0 && (
              <div className="flex flex-col gap-16 mt-6 pb-20 pt-2 sm:pt-6">
                {/* TOP SECTION: 3 Columns Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
                  {/* Column 1: Frontend (Blue) */}
                  {frontendSkills.length > 0 && (
                    <div className="group flex flex-col items-center">
                      <h3 className="text-xl font-bold text-white/90 group-hover:text-blue-200 transition-colors mb-4">
                        Frontend
                      </h3>

                      {/* Centered Horizontal Line + Dot */}
                      <div className="relative w-full max-w-50 h-px bg-white/10 mb-6">
                        <div className="absolute left-1/2 -translate-x-1/2 -top-[3.5px] w-2.5 h-2.5 rounded-full bg-blue-500/50 group-hover:bg-blue-400 group-hover:scale-125 transition-all duration-300 shadow-[0_0_10px_rgba(59,130,246,0.4)]" />
                      </div>

                      {/* List Items */}
                      <div className="w-fit grid grid-cols-1 gap-2">
                        {frontendSkills.map((skill) => (
                          <SkillsView key={skill._key} data={skill} />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Column 3: DevOps (Green) */}
                  {devopsSkills.length > 0 && (
                    <div className="group flex flex-col items-center">
                      <h3 className="text-xl font-bold text-white/90 group-hover:text-green-200 transition-colors mb-4">
                        DevOps
                      </h3>

                      <div className="relative w-full max-w-50 h-px bg-white/10 mb-6">
                        <div className="absolute left-1/2 -translate-x-1/2 -top-[3.5px] w-2.5 h-2.5 rounded-full bg-green-500/50 group-hover:bg-green-400 group-hover:scale-125 transition-all duration-300 shadow-[0_0_10px_rgba(34,197,94,0.4)]" />
                      </div>

                      <div className="w-fit grid grid-cols-1 gap-2 items-center ">
                        {devopsSkills.map((skill) => (
                          <SkillsView key={skill._key} data={skill} />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Column 2: Backend (Purple) */}
                  {backendSkills.length > 0 && (
                    <div className="group flex flex-col items-center">
                      <h3 className="text-xl font-bold text-white/90 group-hover:text-purple-200 transition-colors mb-4">
                        Backend
                      </h3>

                      <div className="relative w-full max-w-50 h-px bg-white/10 mb-6">
                        <div className="absolute left-1/2 -translate-x-1/2 -top-[3.5px] w-2.5 h-2.5 rounded-full bg-purple-500/50 group-hover:bg-purple-400 group-hover:scale-125 transition-all duration-300 shadow-[0_0_10px_rgba(168,85,247,0.4)]" />
                      </div>

                      <div className="w-fit grid grid-cols-1 gap-2">
                        {backendSkills.map((skill) => (
                          <SkillsView key={skill._key} data={skill} />
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* BOTTOM SECTION: Soft Skills (Pink) */}
                {softSkills.length > 0 && (
                  <div className="group flex flex-col items-center mt-4">
                    <h3 className="text-xl font-bold text-white/90 group-hover:text-pink-200 transition-colors mb-4">
                      Soft Skills & Tools
                    </h3>

                    <div className="relative w-full max-w-50 h-px bg-white/10 mb-6">
                      <div className="absolute left-1/2 -translate-x-1/2 -top-[3.5px] w-2.5 h-2.5 rounded-full bg-pink-500/50 group-hover:bg-pink-400 group-hover:scale-125 transition-all duration-300 shadow-[0_0_10px_rgba(236,72,153,0.4)]" />
                    </div>

                    <div className="w-fit items-center grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                      {softSkills.map((skill) => (
                        <SkillsView key={skill._key} data={skill} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTabContent.length === 0 && (
              <div className="text-center text-white/30 py-12 animate-pulse">
                No content found for this section.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
