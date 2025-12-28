import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Portfolio Manager")
    .items([
      // 1. Navigation Singleton
      S.listItem()
        .title("Site Navigation")
        .id("navigation")
        .child(S.document().schemaType("navigation").documentId("navigation")),
      S.divider(),
      // 2. Home Page Singleton
      S.listItem()
        .title("Home Page Content")
        .id("home")
        .child(S.document().schemaType("home").documentId("home")),
      // 3. Keep the rest (if you add regular document types later)
      ...S.documentTypeListItems().filter(
        (item) => item.getId() !== "home" && item.getId() !== "navigation"
      ),
    ]);
