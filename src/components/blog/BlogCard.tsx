import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { BlogPostPreview } from '@/types/blog';
import { Link } from 'next-view-transitions';
import Image from 'next/image';

import ArrowRight from '../svgs/ArrowRight';
import Calender from '../svgs/Calender';

interface BlogCardProps {
  post: BlogPostPreview;
}

// Deterministic gradient picked from the article title so each card always
// gets the same colours across renders and page loads.
const GRADIENTS = [
  'from-violet-600 via-purple-600 to-indigo-700',
  'from-blue-600 via-cyan-500 to-teal-600',
  'from-emerald-500 via-teal-500 to-cyan-600',
  'from-rose-500 via-pink-500 to-fuchsia-600',
  'from-amber-500 via-orange-500 to-red-600',
  'from-indigo-600 via-blue-500 to-sky-600',
  'from-fuchsia-600 via-violet-500 to-purple-700',
  'from-teal-500 via-emerald-500 to-green-600',
] as const;

function gradientForTitle(title: string): string {
  let hash = 0;
  for (let i = 0; i < title.length; i++) {
    hash = (hash << 5) - hash + title.charCodeAt(i);
    hash |= 0; // convert to 32-bit int
  }
  return GRADIENTS[Math.abs(hash) % GRADIENTS.length];
}

export function BlogCard({ post }: BlogCardProps) {
  const { slug, frontmatter } = post;
  const { title, description, image, tags, date } = frontmatter;

  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const gradient = gradientForTitle(title);

  return (
    <Card className="group h-full w-full overflow-hidden border-gray-100 p-0 shadow-none transition-all dark:border-gray-800">
      <CardHeader className="p-0">
        <div className="relative aspect-video overflow-hidden">
          <Link href={`/blog/${slug}`}>
            {image ? (
              <Image src={image} alt={title} fill className="object-cover" />
            ) : (
              <div
                className={`bg-gradient-to-br ${gradient} flex h-full w-full items-center justify-center`}
              >
                {/* First letter of the title as a subtle visual anchor */}
                <span className="select-none text-7xl font-black text-white/20">
                  {title.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <Link href={`/blog/${slug}`}>
            <h3 className="group-hover:text-primary line-clamp-2 text-xl leading-tight font-semibold">
              {title}
            </h3>
          </Link>
          <p className="text-secondary mt-4 line-clamp-3">{description}</p>
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <div className="flex w-full flex-col space-y-3">
          <div className="flex flex-wrap gap-2">
            {tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
            {tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{tags.length - 3} more
              </Badge>
            )}
          </div>
          <div className="mt-4 flex items-center justify-between gap-2">
            <time
              className="text-secondary flex items-center gap-2 text-sm"
              dateTime={date}
            >
              <Calender className="size-4" /> {formattedDate}
            </time>
            <Link
              href={`/blog/${slug}`}
              className="text-secondary flex items-center justify-end gap-2 underline-offset-4 hover:underline"
            >
              Read More <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
