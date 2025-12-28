import { defineField, defineType } from "sanity";

export const projectBlock = defineType({
  name: "projectBlock",
  title: "Project Item",
  type: "object",
  fields: [
    defineField({ name: "title", type: "string" }),
    defineField({ name: "description", type: "text" }),
    defineField({ name: "image", type: "image", options: { hotspot: true } }),
    defineField({ name: "link", type: "url", title: "Project Link" }),
    defineField({
      name: "tech",
      title: "Tech Stack",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
  ],
});
