import { BlogPostPreview } from '@/types/blog';

const MEDIUM_USERNAME = process.env.MEDIUM_USERNAME || 'Faranheit';
const RSS2JSON_URL = `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@${MEDIUM_USERNAME}`;

export interface MediumArticle {
  title: string;
  link: string;
  pubDate: string;
  author: string;
  thumbnail: string;
  description: string; // raw HTML excerpt from Medium
  categories: string[]; // tags
  guid: string;
  content: string; // full HTML content
}

interface Rss2JsonResponse {
  status: string;
  feed: {
    title: string;
    link: string;
    author: string;
    description: string;
    image: string;
  };
  items: MediumArticle[];
}

/**
 * Extract the slug from a Medium article URL.
 * Handles: https://medium.com/@user/slug-abc123?source=...
 *          https://user.medium.com/slug-abc123
 */
export function extractSlug(url: string): string {
  try {
    const urlObj = new URL(url);
    const segments = urlObj.pathname.split('/').filter(Boolean);
    return segments[segments.length - 1] || url;
  } catch {
    const withoutQuery = url.split('?')[0];
    const segments = withoutQuery.split('/').filter(Boolean);
    return segments[segments.length - 1] || url;
  }
}

/** Strip all HTML tags and collapse whitespace — used for plain-text excerpts. */
export function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
}

/**
 * Convert a MediumArticle to the BlogPostPreview shape so existing
 * BlogCard / BlogList components work without modification.
 */
export function toPostPreview(article: MediumArticle): BlogPostPreview {
  return {
    slug: extractSlug(article.link),
    frontmatter: {
      title: article.title,
      description: stripHtml(article.description).substring(0, 200),
      image: '', // intentionally blank — BlogCard renders a gradient instead
      tags: article.categories,
      date: article.pubDate,
      isPublished: true,
    },
  };
}

/** Collect all unique tags from a list of articles, sorted alphabetically. */
export function getAllMediumTags(articles: MediumArticle[]): string[] {
  const tagsSet = new Set<string>();
  articles.forEach((article) => {
    article.categories.forEach((tag) => tagsSet.add(tag.toLowerCase()));
  });
  return Array.from(tagsSet).sort();
}

/**
 * Return articles that share at least one category with the given slug,
 * sorted by number of shared categories descending.
 */
export function getRelatedMediumArticles(
  currentSlug: string,
  articles: MediumArticle[],
  max = 3,
): MediumArticle[] {
  const current = articles.find((a) => extractSlug(a.link) === currentSlug);
  if (!current) return [];

  const currentTags = current.categories.map((t) => t.toLowerCase());

  return articles
    .filter((a) => extractSlug(a.link) !== currentSlug)
    .map((a) => ({
      article: a,
      score: a.categories.filter((t) => currentTags.includes(t.toLowerCase()))
        .length,
    }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, max)
    .map(({ article }) => article);
}

/** Fetch all articles from the Medium RSS feed via rss2json. Never throws — returns [] on any error. */
export async function getMediumArticles(): Promise<MediumArticle[]> {
  try {
    const response = await fetch(RSS2JSON_URL, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      console.error(`Failed to fetch Medium RSS: HTTP ${response.status}`);
      return [];
    }

    const data: Rss2JsonResponse = await response.json();

    if (data.status !== 'ok' || !Array.isArray(data.items)) {
      console.error('rss2json returned unexpected response:', data.status);
      return [];
    }

    return data.items;
  } catch (error) {
    console.error('Error fetching Medium articles:', error);
    return [];
  }
}

/** Find a single article by its slug. Returns null if not found or on error. */
export async function getMediumArticleBySlug(
  slug: string,
): Promise<MediumArticle | null> {
  const articles = await getMediumArticles();
  return articles.find((a) => extractSlug(a.link) === slug) ?? null;
}
