import { BlogArticle } from '@/types/blog';
import { XMLParser } from 'fast-xml-parser';

import {
  decodeEntities,
  slugFromUrl,
  stripHtml,
  toExcerpt,
  uniqueTags,
} from './blog-utils';

// Hashnode retired free GraphQL API access in May 2026, so we read the
// publication's public RSS feed directly (no rss2json, which caps at 10 items).
const HASHNODE_BLOG_URL = (
  process.env.HASHNODE_BLOG_URL || 'https://faaaaraaaan.hashnode.dev'
).replace(/\/$/, '');
const HASHNODE_RSS_URL = `${HASHNODE_BLOG_URL}/rss.xml`;

interface HashnodeRssItem {
  title: string;
  link: string;
  description?: string; // auto-generated brief: first ~200 chars, cut mid-word
  category?: string[];
  pubDate: string;
  enclosure?: { '@_url'?: string };
  'content:encoded'?: string;
}

const parser = new XMLParser({
  ignoreAttributes: false,
  parseTagValue: false, // keep titles like "2026" as strings
  isArray: (name) => name === 'item' || name === 'category',
});

/**
 * The RSS feed only carries the auto-generated brief. The post page's meta
 * description is the SEO subtitle when one was written, or a sentence-trimmed
 * excerpt otherwise — better than the brief either way. Returns null when the
 * page can't be fetched or has no description.
 */
async function getMetaDescription(url: string): Promise<string | null> {
  try {
    const response = await fetch(url, { next: { revalidate: 3600 } });
    if (!response.ok) return null;

    const html = await response.text();
    const match =
      html.match(/<meta\s+name="description"\s+content="([^"]*)"/i) ??
      html.match(/<meta\s+property="og:description"\s+content="([^"]*)"/i);
    const description = match ? decodeEntities(match[1]).trim() : '';
    return description || null;
  } catch {
    return null;
  }
}

async function toBlogArticle(item: HashnodeRssItem): Promise<BlogArticle> {
  const contentHtml = item['content:encoded'] ?? '';
  const metaDescription = await getMetaDescription(item.link);
  const fallbackDescription = stripHtml(item.description || contentHtml);

  return {
    slug: slugFromUrl(item.link),
    title: decodeEntities(item.title).trim(),
    description: toExcerpt(metaDescription ?? fallbackDescription),
    // Only the RSS enclosure is a real cover. og:image always exists but is
    // Hashnode's generated social card with the title baked in, so posts
    // without a cover fall back to the gradient card like Medium posts do.
    coverImage: item.enclosure?.['@_url'] ?? '',
    tags: uniqueTags(item.category ?? []),
    date: new Date(item.pubDate).toISOString(),
    contentHtml,
    link: item.link,
    source: 'hashnode',
  };
}

/** Fetch all articles from the Hashnode RSS feed. Never throws — returns [] on any error. */
export async function getHashnodeArticles(): Promise<BlogArticle[]> {
  try {
    const response = await fetch(HASHNODE_RSS_URL, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      console.error(`Failed to fetch Hashnode RSS: HTTP ${response.status}`);
      return [];
    }

    const feed = parser.parse(await response.text());
    const items: HashnodeRssItem[] = feed?.rss?.channel?.item ?? [];

    return await Promise.all(
      items.filter((item) => item.title && item.link).map(toBlogArticle),
    );
  } catch (error) {
    console.error('Error fetching Hashnode articles:', error);
    return [];
  }
}
