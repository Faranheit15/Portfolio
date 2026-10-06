import { BlogArticle, BlogPostPreview, BlogSource } from '@/types/blog';
import { cache } from 'react';

import { getHashnodeArticles } from './hashnode';
import { getMediumArticles } from './medium';

// Cross-posted articles get small title edits between platforms (e.g.
// "MemeUI (MIUI)" vs "MIUI/HyperOS"), so match on word overlap, not equality.
const DUPLICATE_TITLE_SIMILARITY = 0.7;

export const SOURCE_LABELS: Record<BlogSource, string> = {
  medium: 'Medium',
  hashnode: 'Hashnode',
};

function titleTokens(title: string): Set<string> {
  return new Set(
    title
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, ' ')
      .split(/\s+/)
      .filter(Boolean),
  );
}

function titleSimilarity(a: string, b: string): number {
  const tokensA = titleTokens(a);
  const tokensB = titleTokens(b);
  const shared = [...tokensA].filter((token) => tokensB.has(token)).length;
  const union = new Set([...tokensA, ...tokensB]).size;
  return union === 0 ? 0 : shared / union;
}

/**
 * All articles from every source, newest first. Hashnode is the active
 * platform, so when a post was cross-posted its Hashnode copy wins and the
 * Medium copy is dropped. Cached per request so the page, metadata and
 * related-posts lookups share one fetch.
 */
export const getAllArticles = cache(async (): Promise<BlogArticle[]> => {
  const [hashnode, medium] = await Promise.all([
    getHashnodeArticles(),
    getMediumArticles(),
  ]);

  const mediumOnly = medium.filter(
    (mediumArticle) =>
      !hashnode.some(
        (hashnodeArticle) =>
          titleSimilarity(mediumArticle.title, hashnodeArticle.title) >=
          DUPLICATE_TITLE_SIMILARITY,
      ),
  );

  // Both platforms share the /blog/[slug] namespace; keep slugs unique.
  const usedSlugs = new Set(hashnode.map((article) => article.slug));
  const merged = [
    ...hashnode,
    ...mediumOnly.map((article) =>
      usedSlugs.has(article.slug)
        ? { ...article, slug: `${article.slug}-medium` }
        : article,
    ),
  ];

  return merged.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
});

export async function getArticleBySlug(
  slug: string,
): Promise<BlogArticle | null> {
  const articles = await getAllArticles();
  return articles.find((article) => article.slug === slug) ?? null;
}

/** Map an article to the preview shape BlogCard / BlogList render. */
export function toPostPreview(article: BlogArticle): BlogPostPreview {
  return {
    slug: article.slug,
    frontmatter: {
      title: article.title,
      description: article.description,
      image: article.coverImage,
      tags: article.tags,
      date: article.date,
      isPublished: true,
    },
  };
}

/** All unique tags across articles, sorted alphabetically. */
export function getAllArticleTags(articles: BlogArticle[]): string[] {
  return Array.from(
    new Set(articles.flatMap((article) => article.tags)),
  ).sort();
}

/**
 * Articles sharing at least one tag with the given slug, most shared tags
 * first. Works across platforms since tags are normalized at the source.
 */
export function getRelatedArticles(
  currentSlug: string,
  articles: BlogArticle[],
  max = 3,
): BlogArticle[] {
  const current = articles.find((article) => article.slug === currentSlug);
  if (!current) return [];

  return articles
    .filter((article) => article.slug !== currentSlug)
    .map((article) => ({
      article,
      score: article.tags.filter((tag) => current.tags.includes(tag)).length,
    }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, max)
    .map(({ article }) => article);
}
