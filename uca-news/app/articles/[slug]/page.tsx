import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleBody } from "@/app/components/ArticleBody";
import { SiteFooter } from "@/app/components/SiteFooter";
import { SiteHeader } from "@/app/components/SiteHeader";
import { formatArticleDate } from "@/lib/format-date";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import {
  articleBySlugQuery,
  articleSlugsQuery,
  type Article,
} from "@/sanity/lib/queries";

export const revalidate = 60;

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const articles = await client.fetch<{ slug: string }[]>(articleSlugsQuery);
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await client.fetch<Article | null>(articleBySlugQuery, { slug });

  if (!article) {
    return { title: "Article not found | UCA News" };
  }

  return {
    title: `${article.title} | UCA News`,
    description: article.excerpt ?? undefined,
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = await client.fetch<Article | null>(articleBySlugQuery, { slug });

  if (!article) {
    notFound();
  }

  const coverImageUrl = article.coverImage
    ? urlFor(article.coverImage).width(1600).height(900).fit("crop").url()
    : null;

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader currentPath="/articles" />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-8 sm:px-6">
        <a
          href="/"
          className="inline-flex text-sm font-medium text-red-700 transition-colors hover:text-red-800"
        >
          ← Back to Home
        </a>
        <article className="mt-8">
          {coverImageUrl ? (
            <img
              src={coverImageUrl}
              alt=""
              className="mb-8 aspect-[16/9] w-full rounded-lg object-cover"
            />
          ) : null}
          <h1 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl sm:leading-tight">
            {article.title}
          </h1>
          {article.campus ? (
            <span className="mt-4 inline-block rounded-sm bg-red-700 px-2 py-0.5 text-xs font-semibold tracking-wide text-white">
              {article.campus}
            </span>
          ) : null}
          <div className="mt-4 space-y-1 text-sm text-neutral-500">
            {article.date ? (
              <time dateTime={article.date}>{formatArticleDate(article.date)}</time>
            ) : null}
            {article.author ? <p>By {article.author}</p> : null}
          </div>
          {article.body && article.body.length > 0 ? (
            <div className="mt-8">
              <ArticleBody value={article.body} />
            </div>
          ) : null}
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}
