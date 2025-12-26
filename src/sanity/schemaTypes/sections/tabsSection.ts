import { defineField, defineType } from "sanity";

export const tabsSection = defineType({
  name: "tabsSection",
  title: "Interactive Filter Tabs",
  type: "object",
  preview: {
    prepare() {
      return {
        title: "Interactive Tabs Section",
      };
    },
  },
  fields: [
    defineField({
      name: "tabs",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "tabLabel", type: "string", title: "Tab Name (e.g. Bio)" },
            {
              name: "content",
              type: "array",
              of: [
                { type: "projectBlock" },
                { type: "educationBlock" },
                { type: "skillsBlock" },
                { type: "bioBlock" },
                { type: "testimonialBlock" },
                { type: "experienceBlock" },
              ],
            },
          ],
          // 2. INDIVIDUAL TAB PREVIEW
          preview: {
            select: {
              title: "tabLabel",
              content: "content",
            },
            prepare({ title, content }) {
              const count = content?.length || 0;
              return {
                title: title || "Untitled Tab",
                subtitle: `${count} item${count === 1 ? "" : "s"} in this section`,
              };
            },
          },
        },
      ],
    }),
  ],
});