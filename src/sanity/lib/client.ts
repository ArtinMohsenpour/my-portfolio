import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  // Enable stega for Visual Editing
  stega: {
    studioUrl: process.env.NEXT_PUBLIC_SANITY_STUDIO_URL || "/studio",
  },
});
