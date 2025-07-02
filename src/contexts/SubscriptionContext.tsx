
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useBlog } from './BlogContext';

interface Subscriber {
  id: string;
  email: string;
  isActive: boolean;
  subscribedAt: string;
}

interface SubscriptionContextType {
  subscribers: Subscriber[];
  isSubscribed: (email: string) => boolean;
  subscribe: (email: string) => Promise<void>;
  unsubscribe: (email: string) => Promise<void>;
  notifySubscribers: (postTitle: string, postId: string) => Promise<void>;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export function SubscriptionProvider({ children }: { children: React.ReactNode }) {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const { posts } = useBlog();
  const [lastPostCount, setLastPostCount] = useState(0);

  // Initialize subscribers from localStorage
  useEffect(() => {
    const savedSubscribers = localStorage.getItem('blog_subscribers');
    if (savedSubscribers) {
      setSubscribers(JSON.parse(savedSubscribers));
    }
  }, []);

  // Save subscribers to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('blog_subscribers', JSON.stringify(subscribers));
  }, [subscribers]);

  // Check for new posts and notify subscribers
  useEffect(() => {
    if (posts.length > lastPostCount && lastPostCount > 0) {
      const newPost = posts[0]; // Assuming posts are sorted by date, latest first
      if (newPost) {
        notifySubscribers(newPost.title, newPost.id);
      }
    }
    setLastPostCount(posts.length);
  }, [posts.length]);

  const isSubscribed = (email: string) => {
    return subscribers.some(sub => sub.email === email && sub.isActive);
  };

  const subscribe = async (email: string) => {
    try {
      if (isSubscribed(email)) {
        toast.error('This email is already subscribed to our newsletter.');
        return;
      }

      const newSubscriber: Subscriber = {
        id: Date.now().toString(),
        email,
        isActive: true,
        subscribedAt: new Date().toISOString()
      };

      setSubscribers(prev => [...prev, newSubscriber]);
      toast.success('Successfully subscribed to our newsletter!');
    } catch (error) {
      console.error('Error subscribing:', error);
      toast.error('Failed to subscribe. Please try again.');
      throw error;
    }
  };

  const unsubscribe = async (email: string) => {
    try {
      setSubscribers(prev => 
        prev.map(sub => 
          sub.email === email 
            ? { ...sub, isActive: false }
            : sub
        )
      );
      toast.success('Successfully unsubscribed from our newsletter.');
    } catch (error) {
      console.error('Error unsubscribing:', error);
      toast.error('Failed to unsubscribe. Please try again.');
      throw error;
    }
  };

  const notifySubscribers = async (postTitle: string, postId: string) => {
    try {
      const activeSubscribers = subscribers.filter(sub => sub.isActive);
      
      if (activeSubscribers.length === 0) {
        return;
      }

      // Simulate email notification (in a real app, this would call an email service)
      console.log(`Sending email notification to ${activeSubscribers.length} subscribers about new post: ${postTitle}`);
      
      // Show a toast to indicate emails were sent
      toast.success(`New post notification sent to ${activeSubscribers.length} subscribers!`);
      
      // In a real application, you would call an email service here
      // For example, using Supabase Edge Functions:
      /*
      await supabase.functions.invoke('send-newsletter', {
        body: {
          subscribers: activeSubscribers.map(sub => sub.email),
          postTitle,
          postId,
          postUrl: `${window.location.origin}/post/${postId}`
        }
      });
      */
    } catch (error) {
      console.error('Error notifying subscribers:', error);
    }
  };

  return (
    <SubscriptionContext.Provider value={{
      subscribers,
      isSubscribed,
      subscribe,
      unsubscribe,
      notifySubscribers
    }}>
      {children}
    </SubscriptionContext.Provider>
  );
}

export const useSubscription = () => {
  const context = useContext(SubscriptionContext);
  if (!context) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  return context;
};
