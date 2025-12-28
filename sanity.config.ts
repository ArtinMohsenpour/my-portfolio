"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { dashboardTool } from "@sanity/dashboard";
import { apiVersion, dataset, projectId } from "./src/sanity/env";
import { schema } from "./src/sanity/schemaTypes";
import { StudioLogo } from "./src/components/ui/StudioLogo";
import { WelcomeWidget } from "./src/components/ui/WellcomeWidget";

// FIX: Check your custom variable instead of NODE_ENV
// This allows you to toggle it in .env without running a full build
const showVision = process.env.NEXT_PUBLIC_ENABLE_VISION === "true";

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  schema,

  title: "Artin's Portfolio",
  studio: {
    components: {
      logo: StudioLogo,
    },
  },

  plugins: [
    dashboardTool({
      widgets: [WelcomeWidget()],
    }),

    structureTool({
      structure: (S) =>
        S.list()
          .title("Content Manager")
          .items([
            S.listItem()
              .title("Home Page")
              .child(
                S.document()
                  .schemaType("home")
                  .documentId("home")
                  .title("Home Page Configuration")
              ),

            S.divider(),

            S.documentTypeListItem("navigation").title("Navigation Menu"),

            S.divider(),

            ...S.documentTypeListItems().filter(
              (listItem) =>
                !["home", "navigation", "media.tag"].includes(
                  listItem.getId() as string
                )
            ),
          ]),
    }),

    // FIX: Use the custom flag logic
    ...(showVision ? [visionTool({ defaultApiVersion: apiVersion })] : []),
  ],
});