import { defineField, defineType } from "sanity";

export const testimonialBlock = defineType({
  name: "testimonialBlock",
  title: "Testimonial",
  type: "object",
  fields: [
    defineField({
      name: "author",
      title: "Author Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "role",
      title: "Role / Company",
      type: "string",
      placeholder: "e.g. CEO at TechCorp",
    }),
    defineField({
      name: "quote",
      title: "Testimonial Quote",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "authorImage",
      title: "Author Image",
      type: "image",
      options: { hotspot: true },
    }),
  ],
});
