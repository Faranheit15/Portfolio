
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CalendarIcon, Clock, ArrowRight } from 'lucide-react';

interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  readTime: string;
  tags: string[];
  image: string;
  featured: boolean;
}

interface BlogCardProps {
  blog: Blog;
  featured?: boolean;
}

const BlogCard = ({ blog, featured = false }: BlogCardProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const cardClass = featured 
    ? "group border-0 shadow-xl hover-glow transition-all duration-300 bg-gradient-to-br from-primary/5 to-claude-accent/5"
    : "group border-0 shadow-lg hover-glow transition-all duration-300";

  return (
    <Card className={cardClass}>
      {/* Blog Image */}
      <div className={`${featured ? 'aspect-[16/9]' : 'aspect-video'} bg-gradient-to-br from-primary/10 to-claude-accent/10 relative overflow-hidden`}>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        {blog.featured && (
          <Badge className="absolute top-4 left-4 bg-claude-accent text-white">
            Featured
          </Badge>
        )}
        {/* Placeholder for blog image */}
        <div className="h-full flex items-center justify-center">
          <span className={`${featured ? 'text-3xl' : 'text-xl'} font-serif font-bold text-primary/50`}>
            {blog.title.split(' ')[0]}
          </span>
        </div>
      </div>

      <CardHeader className={`space-y-3 ${featured ? 'p-8' : 'p-6'}`}>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <CalendarIcon className="h-4 w-4" />
            <span>{formatDate(blog.publishedAt)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{blog.readTime}</span>
          </div>
        </div>
        
        <h3 className={`${featured ? 'text-2xl' : 'text-xl'} font-serif font-bold text-primary group-hover:text-claude-accent transition-colors leading-tight`}>
          {blog.title}
        </h3>
        
        <p className="text-muted-foreground leading-relaxed">
          {blog.excerpt}
        </p>
      </CardHeader>

      <CardContent className={`space-y-4 ${featured ? 'px-8' : 'px-6'}`}>
        <div className="flex flex-wrap gap-2">
          {blog.tags.slice(0, 3).map((tag) => (
            <Badge 
              key={tag} 
              variant="outline" 
              className="text-xs hover:bg-accent transition-colors"
            >
              {tag}
            </Badge>
          ))}
          {blog.tags.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{blog.tags.length - 3} more
            </Badge>
          )}
        </div>
      </CardContent>

      <CardFooter className={featured ? 'px-8 pb-8' : 'px-6 pb-6'}>
        <Button 
          asChild
          variant="ghost"
          className="group/button p-0 h-auto font-medium text-primary hover:text-claude-accent"
        >
          <Link to={`/blogs/${blog.slug}`}>
            Read Article
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/button:translate-x-1" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BlogCard;
