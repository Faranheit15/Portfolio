import { BlogArticle } from '@/types/blog';

import {
  decodeEntities,
  slugFromUrl,
  stripHtml,
  toExcerpt,
  uniqueTags,
} from './blog-utils';

const MEDIUM_USERNAME = process.env.MEDIUM_USERNAME || 'Faranheit';
const RSS2JSON_URL = `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@${MEDIUM_USERNAME}`;

interface MediumArticle {
  title: string;
  link: string;
  pubDate: string; // "YYYY-MM-DD HH:mm:ss", UTC without a zone marker
  author: string;
  thumbnail: string;
  description: string; // raw HTML excerpt from Medium
  categories: string[]; // tags
  guid: string;
  content: string; // full HTML content
}

interface Rss2JsonResponse {
  status: string;
  items: MediumArticle[];
}

/** rss2json emits UTC timestamps without a zone; parse them as UTC, not local time. */
function toIsoDate(pubDate: string): string {
  const date = new Date(`${pubDate.replace(' ', 'T')}Z`);
  return Number.isNaN(date.getTime())
    ? new Date(pubDate).toISOString()
    : date.toISOString();
}

function toBlogArticle(article: MediumArticle): BlogArticle {
  return {
    slug: slugFromUrl(article.link),
    title: decodeEntities(article.title),
    description: toExcerpt(stripHtml(article.description)),
    // rss2json returns no thumbnail for Medium posts; the cover is the first
    // figure in the body, so cards use the gradient.
    coverImage: '',
    tags: uniqueTags(article.categories),
    date: toIsoDate(article.pubDate),
    contentHtml: article.content,
    link: article.link.split('?')[0],
    source: 'medium',
  };
}

/** Fetch all articles from the Medium RSS feed via rss2json. Never throws — returns [] on any error. */
export async function getMediumArticles(): Promise<BlogArticle[]> {
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

    return data.items.map(toBlogArticle);
  } catch (error) {
    console.error('Error fetching Medium articles:', error);
    return [];
  }
}
