
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CalendarIcon, Clock, ArrowLeft, Github, Linkedin, Mail } from 'lucide-react';
import blogsData from '@/data/blogs.json';

const BlogPost = () => {
  const { slug } = useParams();
  const blog = blogsData.find(b => b.slug === slug);

  if (!blog) {
    return (
      <Layout>
        <div className="pt-24 pb-16 text-center">
          <h1 className="text-4xl font-serif font-bold text-primary mb-4">
            Blog Post Not Found
          </h1>
          <p className="text-muted-foreground mb-8">
            The blog post you're looking for doesn't exist.
          </p>
          <Button asChild>
            <Link to="/blogs">Back to Blogs</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const relatedBlogs = blogsData
    .filter(b => b.id !== blog.id && b.tags.some(tag => blog.tags.includes(tag)))
    .slice(0, 3);

  return (
    <Layout>
      {/* Blog Header */}
      <article className="pt-24">
        <div className="container-custom max-w-4xl">
          {/* Back Button */}
          <div className="mb-8">
            <Button asChild variant="ghost" size="sm">
              <Link to="/blogs">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Link>
            </Button>
          </div>

          {/* Blog Meta */}
          <div className="space-y-6 mb-12">
            <div className="flex flex-wrap gap-2">
              {blog.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>

            <h1 className="text-4xl sm:text-5xl font-serif font-bold text-primary leading-tight">
              {blog.title}
            </h1>

            <div className="flex items-center gap-6 text-muted-foreground">
              <div className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4" />
                <span>{formatDate(blog.publishedAt)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{blog.readTime}</span>
              </div>
            </div>

            <p className="text-xl text-muted-foreground leading-relaxed">
              {blog.excerpt}
            </p>
          </div>

          {/* Featured Image */}
          <div className="aspect-video bg-gradient-to-br from-primary/10 to-claude-accent/10 rounded-xl mb-12 flex items-center justify-center">
            <span className="text-4xl font-serif font-bold text-primary/50">
              {blog.title.split(' ')[0]}
            </span>
          </div>
        </div>

        {/* Blog Content */}
        <div className="container-custom max-w-3xl">
          <div className="prose prose-lg max-w-none">
            {/* This would normally be MDX content */}
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p>
                This is a placeholder for the blog content. In a real implementation, 
                this would be rendered from MDX files stored in the content directory.
              </p>
              
              <h2 className="text-2xl font-serif font-bold text-primary mt-12 mb-6">
                Introduction
              </h2>
              
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod 
                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
                quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              
              <h2 className="text-2xl font-serif font-bold text-primary mt-12 mb-6">
                Key Concepts
              </h2>
              
              <p>
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore 
                eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
              
              <div className="bg-claude-warm-gray p-6 rounded-lg my-8">
                <p className="text-primary font-medium mb-2">💡 Pro Tip</p>
                <p className="mb-0">
                  This would be a highlighted section with important information or code examples.
                </p>
              </div>
              
              <h2 className="text-2xl font-serif font-bold text-primary mt-12 mb-6">
                Conclusion
              </h2>
              
              <p>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium 
                doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore 
                veritatis et quasi architecto beatae vitae dicta sunt explicabo.
              </p>
            </div>
          </div>
        </div>

        {/* Author Section */}
        <div className="container-custom max-w-3xl mt-16">
          <Card className="border-0 shadow-lg bg-claude-warm-gray">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-claude-accent p-1 flex-shrink-0">
                  <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                    <span className="text-xl font-serif font-bold text-primary">FM</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold text-primary">Faran Mohammad</h3>
                    <p className="text-claude-accent">Fullstack Frontend Developer</p>
                  </div>
                  
                  <p className="text-muted-foreground">
                    Passionate about creating intelligent, scalable web solutions with modern 
                    technologies and AI integration. Always excited to share knowledge and 
                    learn from the community.
                  </p>
                  
                  <div className="flex gap-4">
                    {[
                      { icon: Github, href: 'https://github.com/Faranheit15' },
                      { icon: Linkedin, href: 'https://www.linkedin.com/in/faran-mohammad/' },
                      { icon: Mail, href: 'mailto:ffaranm15@gmail.com' }
                    ].map((social, index) => (
                      <a
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-background hover:bg-accent transition-colors"
                      >
                        <social.icon className="h-4 w-4 text-muted-foreground hover:text-primary transition-colors" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Related Articles */}
        {relatedBlogs.length > 0 && (
          <div className="container-custom max-w-4xl mt-16 pb-20">
            <h2 className="text-3xl font-serif font-bold text-primary mb-8 text-center">
              Related Articles
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedBlogs.map((relatedBlog) => (
                <Card key={relatedBlog.id} className="border-0 shadow-lg hover-glow transition-all duration-300">
                  <CardContent className="p-6 space-y-4">
                    <div className="aspect-video bg-gradient-to-br from-primary/10 to-claude-accent/10 rounded-lg flex items-center justify-center">
                      <span className="text-lg font-serif font-bold text-primary/50">
                        {relatedBlog.title.split(' ')[0]}
                      </span>
                    </div>
                    <h3 className="font-semibold text-primary hover:text-claude-accent transition-colors">
                      <Link to={`/blogs/${relatedBlog.slug}`}>
                        {relatedBlog.title}
                      </Link>
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {relatedBlog.excerpt}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </article>
    </Layout>
  );
};

export default BlogPost;
