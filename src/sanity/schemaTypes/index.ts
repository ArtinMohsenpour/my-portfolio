import { type SchemaTypeDefinition } from "sanity";
import { navType } from "./navTypes";
import { homeType } from "./homeType";
import { tabsSection } from "./sections/tabsSection";
import { educationBlock } from "./blocks/educationBlock";
import { projectBlock } from "./blocks/projectBlock";
import { skillsBlock } from "./blocks/skillsBlock";
import { bioBlock } from "./blocks/bioBlock";
import { testimonialBlock } from "./blocks/testimonialBlock";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    navType,
    homeType,
    tabsSection,
    educationBlock,
    projectBlock,
    skillsBlock,
    bioBlock,
    testimonialBlock,
  ],
};
