export interface BlogFrontmatter {
  title: string;
  description: string;
  image: string;
  tags: string[];
  date: string;
  isPublished: boolean;
}

export interface BlogPost {
  slug: string;
  frontmatter: BlogFrontmatter;
  content: string;
}

export interface BlogPostPreview {
  slug: string;
  frontmatter: BlogFrontmatter;
}

export type BlogSource = 'medium' | 'hashnode';

/**
 * Platform-agnostic shape for an externally hosted article. Every blog source
 * normalizes into this so listing, detail, tags and related posts don't care
 * where a post came from.
 */
export interface BlogArticle {
  slug: string;
  title: string;
  /** Plain text, already trimmed to a card-friendly length. */
  description: string;
  /** Real cover image URL, or '' when the post has none. */
  coverImage: string;
  /** Lowercase kebab-case, so tags merge across platforms. */
  tags: string[];
  /** ISO 8601. */
  date: string;
  /** Full post body as unsanitized HTML. */
  contentHtml: string;
  /** Canonical URL on the source platform. */
  link: string;
  source: BlogSource;
}
