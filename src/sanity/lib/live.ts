// src/sanity/lib/live.ts
import { defineLive } from "next-sanity/live";
import { client } from "./client";

// The token is required to fetch drafts
const token = process.env.SANITY_API_READ_TOKEN;

export const { sanityFetch, SanityLive } = defineLive({
  client,
  serverToken: token,
  browserToken: token,
});
