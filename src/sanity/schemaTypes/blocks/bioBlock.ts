import { defineField, defineType } from "sanity";

export const bioBlock = defineType({
  name: "bioBlock",
  title: "Bio / About Me",
  type: "object",
  fields: [
    defineField({
      name: "profileImage",
      title: "Profile Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "fullName",
      title: "Full Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "jobTitle",
      title: "Work Title (Subtitle)",
      type: "string",
      description: "e.g. Senior Full Stack Developer",
    }),
    defineField({
      name: "description",
      title: "Biography Description",
      type: "array",
      of: [{ type: "block" }], // Enables Rich Text for links and formatting
    }),
    defineField({
      name: "socialLinks",
      title: "Social Links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "platform",
              type: "string",
              title: "Platform (e.g. GitHub)",
            },
            { name: "url", type: "url", title: "URL" },
            {
              name: "color",
              type: "string",
              title: "Accent Color (Hex)",
              description: "Used for the liquid glow effect (e.g. #00f2fe)",
              initialValue: "#ffffff",
            },
          ],
        },
      ],
    }),
  ],
});
