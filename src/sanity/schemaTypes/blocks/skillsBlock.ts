import { defineField, defineType } from "sanity";

export const skillsBlock = defineType({
  name: "skillsBlock",
  title: "Skill Item",
  type: "object",
  fields: [
    defineField({
      name: "name",
      type: "string",
      title: "Skill Name",
      placeholder: "e.g. Next.js, Docker, or Problem Solving",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      type: "string",
      title: "Category",
      options: {
        list: [
          { title: "Frontend", value: "frontend" },
          { title: "Backend", value: "backend" },
          { title: "DevOps & Cloud", value: "devops" },
          { title: "Soft Skills", value: "soft" },
        ],
        layout: "radio",
      },
      initialValue: "frontend",
    }),
    defineField({
      name: "level",
      type: "string",
      title: "Proficiency Level",
      options: {
        list: [
          { title: "Expert (Advanced)", value: "expert" },
          { title: "Proficient (Intermediate)", value: "proficient" },
          { title: "Learning (Beginner)", value: "learning" },
        ],
      },
      // Hide this field if it's a Soft Skill (usually we don't rank soft skills)
      hidden: ({ parent }) => parent?.category === "soft",
    }),
    defineField({
      name: "icon",
      type: "image",
      title: "Skill Icon",
      options: { hotspot: true },
    }),
    defineField({
      name: "color",
      type: "string",
      title: "Accent Color (Hex)",
      description: "Used for the liquid glow effect (e.g. #00f2fe)",
      initialValue: "#ffffff",
    }),
  ],
});
