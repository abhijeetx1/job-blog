
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  category: string;
  author: string;
  publishedAt: string;
  imageUrl: string;
  tags: string[];
  views: number;
  likes: number;
  isLiked: boolean;
}

interface BlogContextType {
  posts: BlogPost[];
  categories: string[];
  loading: boolean;
  addPost: (post: Omit<BlogPost, 'id' | 'publishedAt' | 'views' | 'likes' | 'isLiked'>) => Promise<void>;
  updatePost: (id: string, post: Partial<BlogPost>) => Promise<void>;
  deletePost: (id: string) => Promise<void>;
  likePost: (id: string) => Promise<void>;
  incrementViews: (id: string) => Promise<void>;
  getPostById: (id: string) => BlogPost | undefined;
  getPostsByCategory: (category: string) => BlogPost[];
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

export function BlogProvider({ children }: { children: React.ReactNode }) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [viewedPosts, setViewedPosts] = useState<Set<string>>(new Set());

  const categories = [...new Set(posts.map(post => post.category))];

  // Initialize auth state
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Fetch posts from Supabase
  const fetchPosts = async () => {
    try {
      const { data: postsData, error } = await supabase
        .from('posts')
        .select(`
          *,
          profiles!posts_author_id_fkey(username, full_name)
        `)
        .order('published_at', { ascending: false });

      if (error) throw error;

      // Check which posts the current user has liked
      let userLikes: string[] = [];
      if (user) {
        const { data: likesData } = await supabase
          .from('user_likes')
          .select('post_id')
          .eq('user_id', user.id);
        
        userLikes = likesData?.map(like => like.post_id) || [];
      }

      const formattedPosts: BlogPost[] = postsData?.map(post => ({
        id: post.id,
        title: post.title,
        content: post.content,
        excerpt: post.excerpt,
        category: post.category,
        author: post.profiles?.full_name || post.profiles?.username || 'Anonymous',
        publishedAt: post.published_at?.split('T')[0] || new Date().toISOString().split('T')[0],
        imageUrl: post.image_url || '',
        tags: post.tags || [],
        views: post.views || 0,
        likes: post.likes || 0,
        isLiked: userLikes.includes(post.id)
      })) || [];

      setPosts(formattedPosts);
    } catch (error) {
      console.error('Error fetching posts:', error);
      toast.error('Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [user]);

  const addPost = async (newPost: Omit<BlogPost, 'id' | 'publishedAt' | 'views' | 'likes' | 'isLiked'>) => {
    try {
      const { error } = await supabase
        .from('posts')
        .insert({
          title: newPost.title,
          content: newPost.content,
          excerpt: newPost.excerpt,
          category: newPost.category,
          image_url: newPost.imageUrl,
          tags: newPost.tags,
          author_id: user?.id
        });

      if (error) throw error;
      
      await fetchPosts(); // Refresh posts
    } catch (error) {
      console.error('Error adding post:', error);
      toast.error('Failed to create post');
      throw error;
    }
  };

  const updatePost = async (id: string, updatedPost: Partial<BlogPost>) => {
    try {
      const updateData: any = {};
      
      if (updatedPost.title) updateData.title = updatedPost.title;
      if (updatedPost.content) updateData.content = updatedPost.content;
      if (updatedPost.excerpt) updateData.excerpt = updatedPost.excerpt;
      if (updatedPost.category) updateData.category = updatedPost.category;
      if (updatedPost.imageUrl) updateData.image_url = updatedPost.imageUrl;
      if (updatedPost.tags) updateData.tags = updatedPost.tags;

      const { error } = await supabase
        .from('posts')
        .update(updateData)
        .eq('id', id);

      if (error) throw error;
      
      await fetchPosts(); // Refresh posts
    } catch (error) {
      console.error('Error updating post:', error);
      toast.error('Failed to update post');
      throw error;
    }
  };

  const deletePost = async (id: string) => {
    try {
      const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      await fetchPosts(); // Refresh posts
    } catch (error) {
      console.error('Error deleting post:', error);
      toast.error('Failed to delete post');
      throw error;
    }
  };

  const likePost = async (id: string) => {
    if (!user) {
      toast.error('Please sign in to like posts');
      return;
    }

    try {
      const post = posts.find(p => p.id === id);
      if (!post) return;

      if (post.isLiked) {
        // Unlike the post
        await supabase
          .from('user_likes')
          .delete()
          .eq('user_id', user.id)
          .eq('post_id', id);

        await supabase
          .from('posts')
          .update({ likes: Math.max(0, post.likes - 1) })
          .eq('id', id);
      } else {
        // Like the post
        await supabase
          .from('user_likes')
          .insert({ user_id: user.id, post_id: id });

        await supabase
          .from('posts')
          .update({ likes: post.likes + 1 })
          .eq('id', id);
      }

      await fetchPosts(); // Refresh posts
    } catch (error) {
      console.error('Error liking post:', error);
      toast.error('Failed to update like');
    }
  };

  const incrementViews = async (id: string) => {
    // Only increment if this post hasn't been viewed in this session
    if (viewedPosts.has(id)) {
      return;
    }

    try {
      const post = posts.find(p => p.id === id);
      if (!post) return;

      const { error } = await supabase
        .from('posts')
        .update({ views: post.views + 1 })
        .eq('id', id);

      if (error) throw error;

      // Mark this post as viewed in this session
      setViewedPosts(prev => new Set([...prev, id]));

      // Update local state immediately for better UX
      setPosts(prev => prev.map(p => 
        p.id === id ? { ...p, views: p.views + 1 } : p
      ));
    } catch (error) {
      console.error('Error incrementing views:', error);
    }
  };

  const getPostById = (id: string) => posts.find(post => post.id === id);
  
  const getPostsByCategory = (category: string) => 
    posts.filter(post => post.category === category);

  return (
    <BlogContext.Provider value={{
      posts,
      categories,
      loading,
      addPost,
      updatePost,
      deletePost,
      likePost,
      incrementViews,
      getPostById,
      getPostsByCategory
    }}>
      {children}
    </BlogContext.Provider>
  );
}

export const useBlog = () => {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error('useBlog must be used within a BlogProvider');
  }
  return context;
};
