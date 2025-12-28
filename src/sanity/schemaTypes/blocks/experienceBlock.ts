import { defineField, defineType } from "sanity";

export const experienceBlock = defineType({
  name: "experienceBlock",
  title: "Work Experience",
  type: "object",
  fields: [
    defineField({
      name: "companyName",
      title: "Company Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "position",
      title: "Position / Job Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "companyLogo",
      title: "Company Logo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      description: "e.g. San Francisco, CA or Remote",
    }),
    defineField({
      name: "startDate",
      title: "Start Date",
      type: "date",
      options: { dateFormat: "YYYY-MM" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "endDate",
      title: "End Date",
      type: "date",
      options: { dateFormat: "YYYY-MM" },
      description: "Leave blank if this is your current position",
    }),
    defineField({
      name: "isCurrent",
      title: "I currently work here",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "description",
      title: "Responsibilities / Achievements",
      type: "array",
      of: [{ type: "block" }], // Rich Text
    }),
    defineField({
      name: "technologies",
      title: "Technologies Used",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
    }),
  ],
  preview: {
    select: {
      title: "companyName",
      subtitle: "position",
      media: "companyLogo",
    },
  },
});
