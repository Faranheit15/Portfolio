import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { MediumArticle, stripHtml } from '@/lib/medium';
import sanitizeHtml from 'sanitize-html';
import Image from 'next/image';
import { Link } from 'next-view-transitions';

import Calender from '../svgs/Calender';
import Website from '../svgs/Website';

interface MediumBlogContentProps {
  article: MediumArticle;
}

const SANITIZE_OPTIONS: sanitizeHtml.IOptions = {
  allowedTags: [
    'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    'a', 'img',
    'ul', 'ol', 'li',
    'blockquote', 'pre', 'code',
    'em', 'strong', 'b', 'i', 'u', 's',
    'figure', 'figcaption',
    'br', 'hr',
    'table', 'thead', 'tbody', 'tr', 'th', 'td',
    'div', 'span',
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

export function MediumBlogContent({ article }: MediumBlogContentProps) {
  const { title, content, description, thumbnail, categories, pubDate, link } =
    article;

  const formattedDate = new Date(pubDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const sanitizedContent = sanitizeHtml(content, SANITIZE_OPTIONS);
  const plainDescription = stripHtml(description).substring(0, 200);

  return (
    <article className="mx-auto max-w-4xl">
      {/* Hero Section */}
      <header className="mb-8 space-y-6">
        {thumbnail && (
          <div className="relative aspect-video overflow-hidden rounded-lg">
            <Image
              src={thumbnail}
              alt={title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {categories.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>

          <h1 className="text-4xl leading-tight font-bold lg:text-5xl">
            {title}
          </h1>

          <p className="text-muted-foreground text-xl">{plainDescription}</p>

          <div className="text-muted-foreground flex items-center gap-2 text-sm">
            <Calender className="size-6" />
            <time dateTime={new Date(pubDate).toISOString()}>{formattedDate}</time>
          </div>
        </div>

        <Separator />
      </header>

      {/* Content */}
      <div
        className="prose prose-neutral dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: sanitizedContent }}
      />

      {/* Read on Medium */}
      <div className="mt-12 border-t pt-8">
        <Button asChild variant="outline">
          <Link
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2"
          >
            <Website className="size-4" />
            Read original on Medium
          </Link>
        </Button>
      </div>
    </article>
  );
}
