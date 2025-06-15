
import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import BlogCard from '@/components/BlogCard';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import blogsData from '@/data/blogs.json';

const Blogs = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('all');

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const allTags = Array.from(
    new Set(blogsData.flatMap(blog => blog.tags))
  );

  const featuredBlogs = blogsData.filter(blog => blog.featured);
  const regularBlogs = blogsData.filter(blog => !blog.featured);

  const filteredBlogs = regularBlogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = selectedTag === 'all' || blog.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-background via-claude-cream to-claude-warm-gray">
        <div className="container-custom">
          <div className={`text-center space-y-6 transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-primary">
              Blog
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Thoughts on web development, AI, and the future of technology. 
              Sharing insights from my journey as a fullstack developer.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-12 bg-claude-warm-gray border-b border-border">
        <div className="container-custom space-y-6">
          {/* Search */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-background"
            />
          </div>

          {/* Tag Filters */}
          <div className="flex flex-wrap justify-center gap-3">
            <Button
              variant={selectedTag === 'all' ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedTag('all')}
              className="capitalize hover-lift transition-all duration-200"
            >
              All
            </Button>
            {allTags.map((tag) => (
              <Button
                key={tag}
                variant={selectedTag === tag ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedTag(tag)}
                className="capitalize hover-lift transition-all duration-200"
              >
                {tag}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      {featuredBlogs.length > 0 && (
        <section className="py-20">
          <div className="container-custom">
            <div className="space-y-12">
              <div className="text-center space-y-4">
                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-primary">
                  Featured Articles
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                  Hand-picked articles that showcase key insights and learnings
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                {featuredBlogs.map((blog, index) => (
                  <div
                    key={blog.id}
                    className={`transition-all duration-500 delay-${index * 200}`}
                  >
                    <BlogCard blog={blog} featured={true} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* All Articles */}
      <section className={`py-20 ${featuredBlogs.length > 0 ? 'bg-claude-warm-gray' : ''}`}>
        <div className="container-custom">
          <div className="space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-primary">
                {featuredBlogs.length > 0 ? 'All Articles' : 'Latest Articles'}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                {filteredBlogs.length} article{filteredBlogs.length !== 1 ? 's' : ''} found
              </p>
            </div>

            {filteredBlogs.length > 0 ? (
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredBlogs.map((blog, index) => (
                  <div
                    key={blog.id}
                    className={`transition-all duration-500 delay-${index * 100}`}
                  >
                    <BlogCard blog={blog} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">
                  No articles found matching your search criteria.
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedTag('all');
                  }}
                  className="mt-4"
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container-custom text-center space-y-8">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold">
            Stay Updated
          </h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Get notified when I publish new articles about web development, AI, and technology.
          </p>
          <div className="max-w-md mx-auto flex gap-3">
            <Input 
              placeholder="Enter your email"
              className="bg-background text-foreground"
            />
            <Button variant="secondary" className="hover-lift">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Blogs;
