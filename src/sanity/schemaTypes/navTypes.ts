import { defineField, defineType } from "sanity";

export const navType = defineType({
  name: "navigation",
  title: "Navigation",
  type: "document",
  // --- ADD THIS PREVIEW BLOCK TO THE DOCUMENT LEVEL ---
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
  // ----------------------------------------------------
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
