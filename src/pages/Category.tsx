
import { useParams } from 'react-router-dom';
import { Header } from '@/components/Header';
import { BlogCard } from '@/components/BlogCard';
import { useBlog } from '@/contexts/BlogContext';

export default function Category() {
  const { category } = useParams<{ category: string }>();
  const { getPostsByCategory } = useBlog();

  const decodedCategory = decodeURIComponent(category || '');
  const posts = getPostsByCategory(decodedCategory);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{decodedCategory}</h1>
          <p className="text-muted-foreground">
            {posts.length} article{posts.length !== 1 ? 's' : ''} in this category
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No articles found in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
