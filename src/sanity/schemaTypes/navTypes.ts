import { defineField, defineType } from "sanity";

export const navType = defineType({
  name: "navigation",
  title: "Navigation",
  type: "document",
  preview: {
    select: {
      firstItemTitle: "items.0.title",
      firstItemAction: "items.0.actionType",
    },
    prepare({ firstItemTitle, firstItemAction }) {
      const actionLabels: Record<string, string> = {
        link: "🔗 Link",
        external: "🌐 External",
        download: "📁 Download",
        contact: "✉️ Contact Modal",
      };

      return {
        title: `${firstItemTitle}`,
        subtitle: ` ${actionLabels[firstItemAction] || "No Action Set"}`,
      };
    },
  },
  fields: [
    defineField({
      name: "items",
      title: "Nav Buttons",
      type: "array",
      of: [
        {
          type: "object",
          name: "navItem",
          fields: [
            defineField({
              name: "title",
              type: "string",
              title: "Button Text",
            }),
            defineField({
              name: "actionType",
              title: "Action Type",
              type: "string",
              options: {
                list: [
                  { title: "Internal Link / Anchor (#)", value: "link" },
                  { title: "External URL", value: "external" },
                  { title: "Download File (Resume)", value: "download" },
                  { title: "Open Contact Modal", value: "contact" },
                ],
                layout: "radio",
              },
              initialValue: "link",
            }),

            // --- NEW: Contact Email (Only for Contact) ---
            defineField({
              name: "contactEmail",
              title: "Contact Email Address",
              type: "string",
              description: "The email address to display in the modal.",
              hidden: ({ parent }) => parent?.actionType !== "contact",
              validation: (Rule) => Rule.email(),
            }),

            // --- NEW: Social Links (Only for Contact) ---
            defineField({
              name: "socialLinks",
              title: "Social Media Links",
              type: "array",
              description: "Add social icons to the contact modal.",
              hidden: ({ parent }) => parent?.actionType !== "contact",
              of: [
                {
                  type: "object",
                  fields: [
                    defineField({
                      name: "platform",
                      title: "Platform Name",
                      type: "string",
                      placeholder: "e.g. GitHub, LinkedIn, Twitter",
                    }),
                    defineField({
                      name: "url",
                      title: "Profile URL",
                      type: "url",
                    }),
                  ],
                  preview: {
                    select: {
                      title: "platform",
                      subtitle: "url",
                    },
                  },
                },
              ],
            }),
            // ---------------------------------------------

            defineField({
              name: "url",
              type: "string",
              title: "URL / Anchor",
              hidden: ({ parent }) =>
                parent?.actionType === "contact" ||
                parent?.actionType === "download",
            }),
            defineField({
              name: "file",
              title: "File Upload",
              type: "file",
              hidden: ({ parent }) => parent?.actionType !== "download",
            }),
            defineField({
              name: "isDropdown",
              type: "boolean",
              title: "Enable Dropdown?",
            }),
            defineField({
              name: "dropdownItems",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    { name: "label", type: "string" },
                    { name: "url", type: "string" },
                  ],
                },
              ],
              hidden: ({ parent }) => !parent?.isDropdown,
            }),
          ],
          preview: {
            select: {
              title: "title",
              action: "actionType",
            },
            prepare({ title, action }) {
              const actionLabels: Record<string, string> = {
                link: "🔗 Link",
                external: "🌐 External",
                download: "📁 Download",
                contact: "✉️ Contact Modal",
              };
              return {
                title: title || "New Button",
                subtitle: actionLabels[action] || "No Action Set",
              };
            },
          },
        },
      ],
    }),
  ],
});