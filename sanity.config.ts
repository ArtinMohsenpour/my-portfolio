"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { presentationTool } from "sanity/presentation"; // Import the tool
import { apiVersion, dataset, projectId } from "./src/sanity/env";
import { schema } from "./src/sanity/schemaTypes";

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  schema,
  plugins: [
    structureTool(),
    visionTool({ defaultApiVersion: apiVersion }),
    // Add the Presentation Tool
    presentationTool({
      previewUrl: {
        previewMode: {
          enable: "/api/draft-mode/enable", // The route to enable Draft Mode
        },
      },
    }),
  ],
});