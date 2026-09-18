import { ArticleCardGrid } from "@/app/components/ArticleCardGrid";
import { SiteFooter } from "@/app/components/SiteFooter";
import { SiteHeader } from "@/app/components/SiteHeader";
import { client } from "@/sanity/lib/client";
import { articlesQuery, type ArticleCard } from "@/sanity/lib/queries";

export const revalidate = 60;

export default async function Home() {
  const articles = await client.fetch<ArticleCard[]>(articlesQuery);

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader currentPath="/" />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6">
        <h1 className="mb-8 text-3xl font-bold tracking-tight text-neutral-900">
          Latest Stories
        </h1>
        <ArticleCardGrid
          articles={articles}
          emptyMessage="No stories yet. Publish an article in Studio to see it here."
        />
      </main>
      <SiteFooter />
    </div>
  );
}
