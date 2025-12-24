import { groq } from "next-sanity";

export const PORTFOLIO_QUERY = groq`{
  "nav": *[_type == "navigation"][0] {
    ...,
    items[] {
      ...,
      "fileUrl": file.asset->url
    }
  },
  "home": *[_type == "home"][0] {
    ...,
    pageBuilder[] {
      ...,
      tabs[] {
        ...,
        content[] {
          ...,
          _type == "projectBlock" => { ..., "imageUrl": image.asset->url },
          _type == "skillsBlock" => { ..., "iconUrl": icon.asset->url },
          _type == "bioBlock" => { ..., "profileImageUrl": profileImage.asset->url },
          _type == "testimonialBlock" => { ..., "authorImageUrl": authorImage.asset->url }
        }
      }
    }
  }
}`;
