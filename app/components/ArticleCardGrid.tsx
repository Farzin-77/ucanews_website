import Link from "next/link";
import { formatArticleDate } from "@/lib/format-date";
import { urlFor } from "@/sanity/lib/image";
import type { ArticleCard } from "@/sanity/lib/queries";

function articleImageUrl(article: ArticleCard) {
  if (!article.coverImage) {
    return "https://placehold.co/600x400";
  }

  return urlFor(article.coverImage).width(600).height(400).url();
}

export function ArticleCardGrid({
  articles,
  emptyMessage,
  label = "Latest stories",
}: {
  articles: ArticleCard[];
  emptyMessage: string;
  label?: string;
}) {
  if (articles.length === 0) {
    return <p className="text-neutral-600">{emptyMessage}</p>;
  }

  return (
    <section
      aria-label={label}
      className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
    >
      {articles.map((article) => {
        const card = (
          <>
            <img
              src={articleImageUrl(article)}
              alt=""
              className="h-48 w-full object-cover"
            />
            <div className="p-5">
              <span className="inline-block rounded-sm bg-red-700 px-2 py-0.5 text-xs font-semibold tracking-wide text-white">
                {article.campus}
              </span>
              <h2 className="mt-3 text-xl font-bold leading-snug text-neutral-900 transition-colors group-hover:text-red-700">
                {article.title}
              </h2>
              {article.excerpt ? (
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                  {article.excerpt}
                </p>
              ) : null}
              {article.date ? (
                <time
                  dateTime={article.date}
                  className="mt-4 block text-xs text-neutral-500"
                >
                  {formatArticleDate(article.date)}
                </time>
              ) : null}
            </div>
          </>
        );

        const cardClassName =
          "group overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-sm transition hover:border-red-600 hover:shadow-md";

        if (!article.slug) {
          return (
            <article key={article._id} className={cardClassName}>
              {card}
            </article>
          );
        }

        return (
          <article key={article._id} className="h-full">
            <Link
              href={`/articles/${article.slug}`}
              className={`block h-full ${cardClassName}`}
            >
              {card}
            </Link>
          </article>
        );
      })}
    </section>
  );
}
