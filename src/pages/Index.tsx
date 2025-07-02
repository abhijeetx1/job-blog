
import { useState, useMemo } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { BlogCard } from '@/components/BlogCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, TrendingUp, Clock, Star, Loader2, X } from 'lucide-react';
import { useBlog } from '@/contexts/BlogContext';
import { useAuth } from '@/contexts/AuthContext';
import { SITE_CATEGORIES } from '@/config/categories';
import { Link } from 'react-router-dom';

export default function Index() {
  const { posts, loading } = useBlog();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'latest' | 'popular' | 'trending'>('latest');

  // Enhanced search with real-time filtering using useMemo for performance
  const filteredAndSortedPosts = useMemo(() => {
    let filtered = posts;

    // Apply search filter if search term exists
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      filtered = posts.filter(post => {
        const titleMatch = post.title.toLowerCase().includes(searchLower);
        const excerptMatch = post.excerpt.toLowerCase().includes(searchLower);
        const contentMatch = post.content.toLowerCase().includes(searchLower);
        const categoryMatch = post.category.toLowerCase().includes(searchLower);
        const authorMatch = post.author.toLowerCase().includes(searchLower);
        const tagMatch = post.tags.some(tag => tag.toLowerCase().includes(searchLower));
        
        return titleMatch || excerptMatch || contentMatch || categoryMatch || authorMatch || tagMatch;
      });
    }

    // Apply category filter
    if (selectedCategory) {
      filtered = filtered.filter(post => post.category === selectedCategory);
    }

    // Apply sorting
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'popular':
          return b.views - a.views;
        case 'trending':
          return b.likes - a.likes;
        case 'latest':
        default:
          return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
      }
    });

    return sorted;
  }, [posts, searchTerm, selectedCategory, sortBy]);

  const featuredPost = posts.length > 0 ? posts.reduce((prev, current) => 
    prev.views > current.views ? prev : current
  ) : null;

  const clearSearch = () => {
    setSearchTerm('');
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory(null);
    setSortBy('latest');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Loading posts...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5252090930676115"
     crossorigin="anonymous"></script>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary/20 via-primary/10 to-background py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Welcome to <span className="text-4xl font-bold bg-gradient-to-r from-primary via-blue-600 to-purple-600 bg-clip-text text-transparent">
                Tech Tribune
              </span> 
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Discover the latest insights, tutorials, and trends in technology. 

              Daily updates, in-depth tutorials, and the latest 
              trends in software, AI, startups, career, jobs and everything tech.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search articles instantly..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-10"
                />
                {searchTerm && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearSearch}
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                )}
              </div>
              {!user && (
                <Button asChild>
                  <Link to="/auth">Get Started</Link>
                </Button>
              )}
            </div>

            <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5252090930676115"
     crossorigin="anonymous"></script>
            
            {/* Real-time search results indicator */}
            {searchTerm && (
              <div className="mt-4">
                <Badge variant="secondary">
                  {filteredAndSortedPosts.length} result{filteredAndSortedPosts.length !== 1 ? 's' : ''} found for "{searchTerm}"
                </Badge>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Featured Post - only show if no search is active */}
      {!searchTerm && featuredPost && (
        <section className="py-12 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="flex items-center space-x-2 mb-6">
              <Star className="h-5 w-5 text-yellow-500" />
              <h2 className="text-2xl font-bold">Featured Article</h2>
            </div>


            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <img 
                  src={featuredPost.imageUrl} 
                  alt={featuredPost.title}
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
              <div>
                <Badge className="mb-2">{featuredPost.category}</Badge>
                <h3 className="text-2xl font-bold mb-4">{featuredPost.title}</h3>
                <p className="text-muted-foreground mb-4">{featuredPost.excerpt}</p>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-4">
                  <span>By {featuredPost.author}</span>
                  <span>{featuredPost.views.toLocaleString()} views</span>
                  <span>{featuredPost.likes} likes</span>
                </div>
                <Button asChild>
                  <Link to={`/post/${featuredPost.id}`}>Read More</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}

        


      {/* Categories & Filters */}
      <section className="py-8 border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedCategory === null ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(null)}
              >
                All Categories
              </Button>
              {SITE_CATEGORIES.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">Sort by:</span>
              <Button
                variant={sortBy === 'latest' ? "default" : "outline"}
                size="sm"
                onClick={() => setSortBy('latest')}
              >
                <Clock className="h-4 w-4 mr-1" />
                Latest
              </Button>
              <Button
                variant={sortBy === 'popular' ? "default" : "outline"}
                size="sm"
                onClick={() => setSortBy('popular')}
              >
                <TrendingUp className="h-4 w-4 mr-1" />
                Popular
              </Button>
              <Button
                variant={sortBy === 'trending' ? "default" : "outline"}
                size="sm"
                onClick={() => setSortBy('trending')}
              >
                <Star className="h-4 w-4 mr-1" />
                Trending
              </Button>
              
              {/* Clear filters button */}
              {(searchTerm || selectedCategory || sortBy !== 'latest') && (
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  <X className="h-4 w-4 mr-1" />
                  Clear
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-12 flex-1">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">
              {searchTerm 
                ? `Search Results for "${searchTerm}"` 
                : selectedCategory 
                  ? `${selectedCategory} Articles` 
                  : 'Latest Articles'
              }
            </h2>
            <span className="text-muted-foreground">
              {filteredAndSortedPosts.length} article{filteredAndSortedPosts.length !== 1 ? 's' : ''}
            </span>
          </div>

          {filteredAndSortedPosts.length === 0 ? (
            <div className="text-center py-12">
              {searchTerm ? (
                <div>
                  <Search className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-xl font-semibold mb-2">No articles found</h3>
                  <p className="text-muted-foreground text-lg mb-4">
                    No articles match your search for "{searchTerm}". Try different keywords or browse categories.
                  </p>
                  <Button onClick={clearSearch}>Clear Search</Button>
                </div>
              ) : (
                <p className="text-muted-foreground text-lg">No articles found matching your criteria.</p>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAndSortedPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
