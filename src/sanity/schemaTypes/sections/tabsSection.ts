import { defineField, defineType } from "sanity";

export const tabsSection = defineType({
  name: "tabsSection",
  title: "Interactive Filter Tabs",
  type: "object",
  fields: [
    defineField({
      name: "tabs",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "tabLabel", type: "string" },
            {
              name: "content",
              type: "array",
              of: [
                { type: "projectBlock" },
                { type: "educationBlock" },
                { type: "skillsBlock" },
                { type: "bioBlock" },
                { type: "testimonialBlock" },
              ],
            },
          ],
        },
      ],
    }),
  ],
});
