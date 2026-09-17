import type { Metadata } from "next";
import { ArticleCardGrid } from "@/app/components/ArticleCardGrid";
import { SiteFooter } from "@/app/components/SiteFooter";
import { SiteHeader } from "@/app/components/SiteHeader";
import { client } from "@/sanity/lib/client";
import {
  articlesByCampusQuery,
  type ArticleCard,
} from "@/sanity/lib/queries";

type Campus = "Khorog" | "Naryn";

export async function CampusNewsPage({ campus }: { campus: Campus }) {
  const articles = await client.fetch<ArticleCard[]>(articlesByCampusQuery, {
    campus,
  });

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader currentPath={`/${campus.toLowerCase()}`} />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6">
        <h1 className="mb-8 text-3xl font-bold tracking-tight text-neutral-900">
          {campus} Campus News
        </h1>
        <ArticleCardGrid
          articles={articles}
          label={`${campus} campus news`}
          emptyMessage="No articles yet for this campus — check back soon."
        />
      </main>
      <SiteFooter />
    </div>
  );
}

export function campusMetadata(campus: Campus): Metadata {
  return {
    title: `${campus} Campus News | UCA News`,
    description: `Student news from the UCA ${campus} campus.`,
  };
}
