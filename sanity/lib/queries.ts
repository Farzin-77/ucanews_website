import { groq, type PortableTextBlock } from "next-sanity";
import type { SanityImageSource } from "@sanity/image-url";

export type ArticleCard = {
  _id: string;
  title: string;
  slug: string | null;
  campus: "Khorog" | "Naryn";
  date: string | null;
  excerpt: string | null;
  coverImage: SanityImageSource | null;
  author: string | null;
};

export const articlesQuery = groq`
  *[_type == "article"] | order(date desc) {
    _id,
    title,
    "slug": slug.current,
    campus,
    date,
    excerpt,
    coverImage,
    author
  }
`;

export const articlesByCampusQuery = groq`
  *[_type == "article" && campus == $campus] | order(date desc) {
    _id,
    title,
    "slug": slug.current,
    campus,
    date,
    excerpt,
    coverImage,
    author
  }
`;

export type Article = ArticleCard & {
  body: PortableTextBlock[] | null;
};

export const articleSlugsQuery = groq`
  *[_type == "article" && defined(slug.current)]{
    "slug": slug.current
  }
`;

export const articleBySlugQuery = groq`
  *[_type == "article" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    campus,
    date,
    excerpt,
    coverImage,
    author,
    body
  }
`;
