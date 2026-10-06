import { ArticleContent } from '@/components/blog/ArticleContent';
import { BlogList } from '@/components/blog/BlogList';
import Container from '@/components/common/Container';
import FontSizeControls from '@/components/common/FontSizeControls';
import ArrowLeft from '@/components/svgs/ArrowLeft';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { siteConfig } from '@/config/Meta';
import {
  getAllArticles,
  getArticleBySlug,
  getRelatedArticles,
  toPostPreview,
} from '@/lib/articles';
import { Metadata } from 'next';
import { Link } from 'next-view-transitions';
import { notFound } from 'next/navigation';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Pre-generate pages for every Medium and Hashnode article at build time
export async function generateStaticParams() {
  const articles = await getAllArticles();
  return articles.map((article) => ({ slug: article.slug }));
}

// Generate metadata for each blog post
export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return { title: 'Post Not Found' };
  }

  const { description } = article;

  return {
    metadataBase: new URL(siteConfig.url),
    title: article.title,
    description,
    openGraph: {
      title: article.title,
      description,
      images: article.coverImage ? [article.coverImage] : [],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description,
      images: article.coverImage ? [article.coverImage] : [],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const allArticles = await getAllArticles();
  const relatedArticles = getRelatedArticles(slug, allArticles, 3);
  const relatedPosts = relatedArticles.map(toPostPreview);

  return (
    <>
      <Container className="py-16">
        <div className="space-y-12">
          {/* Back Button */}
          <div>
            <Button variant="ghost" asChild className="group">
              <Link href="/blog" className="flex items-center space-x-2">
                <ArrowLeft className="size-4" />
                <span>Back to Blog</span>
              </Link>
            </Button>
          </div>

          {/* Blog Content */}
          <ArticleContent article={article} />

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div className="space-y-6">
              <Separator />
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold">Related Posts</h2>
                <BlogList posts={relatedPosts} />
              </div>
            </div>
          )}

          {/* Back to Blog CTA */}
          <div className="text-center">
            <Separator className="mb-8" />
            <Button asChild size="lg">
              <Link href="/blog">View All Blogs</Link>
            </Button>
          </div>
        </div>
      </Container>
      <FontSizeControls />
    </>
  );
}
