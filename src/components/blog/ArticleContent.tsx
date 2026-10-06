import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { SOURCE_LABELS } from '@/lib/articles';
import { BlogArticle } from '@/types/blog';
import { Link } from 'next-view-transitions';
import Image from 'next/image';
import sanitizeHtml from 'sanitize-html';

import Calender from '../svgs/Calender';
import Website from '../svgs/Website';

interface ArticleContentProps {
  article: BlogArticle;
}

const SANITIZE_OPTIONS: sanitizeHtml.IOptions = {
  allowedTags: [
    'p',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'a',
    'img',
    'ul',
    'ol',
    'li',
    'blockquote',
    'pre',
    'code',
    'em',
    'strong',
    'b',
    'i',
    'u',
    's',
    'figure',
    'figcaption',
    'br',
    'hr',
    'table',
    'thead',
    'tbody',
    'tr',
    'th',
    'td',
    'div',
    'span',
  ],
  allowedAttributes: {
    a: ['href', 'target', 'rel'],
    img: ['src', 'alt', 'width', 'height'],
    code: ['class'],
    pre: ['class'],
    td: ['colspan', 'rowspan'],
    th: ['colspan', 'rowspan'],
  },
  transformTags: {
    a: (_tagName, attribs) => ({
      tagName: 'a',
      attribs: { ...attribs, target: '_blank', rel: 'noopener noreferrer' },
    }),
  },
};

export function ArticleContent({ article }: ArticleContentProps) {
  const {
    title,
    contentHtml,
    description,
    coverImage,
    tags,
    date,
    link,
    source,
  } = article;

  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const sanitizedContent = sanitizeHtml(contentHtml, SANITIZE_OPTIONS);

  return (
    <article className="mx-auto max-w-4xl">
      {/* Hero Section */}
      <header className="mb-8 space-y-6">
        {/* Medium bodies already open with their cover figure; only posts
            whose cover lives outside the body (Hashnode) render a hero. */}
        {coverImage && (
          <div className="relative aspect-video overflow-hidden rounded-lg">
            <Image
              src={coverImage}
              alt={title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>

          <h1 className="text-4xl leading-tight font-bold lg:text-5xl">
            {title}
          </h1>

          <p className="text-muted-foreground text-xl">{description}</p>

          <div className="text-muted-foreground flex items-center gap-2 text-sm">
            <Calender className="size-6" />
            <time dateTime={date}>{formattedDate}</time>
          </div>
        </div>

        <Separator />
      </header>

      {/* Content */}
      <div
        className="prose prose-neutral dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: sanitizedContent }}
      />

      {/* Read on the source platform */}
      <div className="mt-12 border-t pt-8">
        <Button asChild variant="outline">
          <Link
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2"
          >
            <Website className="size-4" />
            Read original on {SOURCE_LABELS[source]}
          </Link>
        </Button>
      </div>
    </article>
  );
}
