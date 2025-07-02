
-- Create a profiles table for user information
CREATE TABLE public.profiles (
  id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  username TEXT,
  full_name TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  PRIMARY KEY (id)
);

-- Create a posts table for blog posts
CREATE TABLE public.posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  category TEXT NOT NULL,
  author_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  published_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  image_url TEXT,
  tags TEXT[] DEFAULT '{}',
  views INTEGER DEFAULT 0,
  likes INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create a user_likes table to track which users liked which posts
CREATE TABLE public.user_likes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  post_id UUID REFERENCES public.posts(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id, post_id)
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_likes ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles table
CREATE POLICY "Public profiles are viewable by everyone" 
  ON public.profiles FOR SELECT 
  USING (true);

CREATE POLICY "Users can insert their own profile" 
  ON public.profiles FOR INSERT 
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
  ON public.profiles FOR UPDATE 
  USING (auth.uid() = id);

-- Create policies for posts table
CREATE POLICY "Posts are viewable by everyone" 
  ON public.posts FOR SELECT 
  USING (true);

CREATE POLICY "Only admins can insert posts" 
  ON public.posts FOR INSERT 
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Only admins can update posts" 
  ON public.posts FOR UPDATE 
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Only admins can delete posts" 
  ON public.posts FOR DELETE 
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Create policies for user_likes table
CREATE POLICY "Users can view their own likes" 
  ON public.user_likes FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own likes" 
  ON public.user_likes FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own likes" 
  ON public.user_likes FOR DELETE 
  USING (auth.uid() = user_id);

-- Function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (id, username, full_name, avatar_url)
  VALUES (
    new.id,
    new.raw_user_meta_data ->> 'username',
    new.raw_user_meta_data ->> 'full_name',
    new.raw_user_meta_data ->> 'avatar_url'
  );
  RETURN new;
END;
$$;

-- Trigger to automatically create profile on user signup
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insert some sample posts
INSERT INTO public.posts (title, content, excerpt, category, image_url, tags) VALUES
(
  'The Future of AI and Machine Learning',
  E'Artificial Intelligence and Machine Learning are revolutionizing the way we interact with technology. In this comprehensive guide, we explore the latest trends and developments in AI.\n\n## Key Developments in AI\n\nThe field of artificial intelligence has seen remarkable progress in recent years. From natural language processing to computer vision, AI systems are becoming increasingly sophisticated.\n\n### Machine Learning Algorithms\n\nModern machine learning algorithms are capable of processing vast amounts of data and making predictions with unprecedented accuracy. Deep learning, in particular, has shown remarkable results in various domains.\n\n### Applications in Industry\n\nAI is being applied across numerous industries:\n- Healthcare: Diagnostic imaging and drug discovery\n- Finance: Fraud detection and algorithmic trading\n- Transportation: Autonomous vehicles and traffic optimization\n- Entertainment: Content recommendation and generation\n\n## The Road Ahead\n\nAs we look to the future, AI will continue to evolve and integrate into our daily lives. The key is to ensure that this technology is developed responsibly and ethically.',
  'Exploring the latest trends and developments in artificial intelligence and machine learning.',
  'AI & ML',
  'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop',
  ARRAY['AI', 'Machine Learning', 'Technology']
),
(
  'Modern Web Development with React',
  E'React has become one of the most popular JavaScript libraries for building user interfaces. Let''s explore the modern React ecosystem and best practices.\n\n## React Ecosystem\n\nThe React ecosystem is vast and continuously evolving. Here are some key components:\n\n### Core Concepts\n- Components and JSX\n- State management with hooks\n- Context API for global state\n- Effect hooks for side effects\n\n### Popular Libraries\n- **React Router**: For client-side routing\n- **Styled Components**: For component-level styling\n- **React Query**: For server state management\n- **React Hook Form**: For form handling\n\n## Best Practices\n\n1. **Component Structure**: Keep components small and focused\n2. **State Management**: Use local state when possible, lift state up when needed\n3. **Performance**: Optimize re-renders with useMemo and useCallback\n4. **Testing**: Write comprehensive tests for your components\n\n## Building Modern Applications\n\nModern React applications leverage tools like:\n- Vite for fast development\n- TypeScript for type safety\n- ESLint and Prettier for code quality\n- Storybook for component development',
  'A comprehensive guide to modern React development and best practices.',
  'Web Development',
  'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop',
  ARRAY['React', 'JavaScript', 'Frontend']
),
(
  'Cybersecurity in 2024: Emerging Threats',
  E'As technology advances, so do the threats we face in cyberspace. This article examines the cybersecurity landscape in 2024 and how to protect yourself.\n\n## Current Threat Landscape\n\nThe cybersecurity threat landscape is constantly evolving. Here are the key threats to watch in 2024:\n\n### AI-Powered Attacks\nCybercriminals are leveraging AI to create more sophisticated attacks:\n- Deepfake technology for social engineering\n- AI-generated phishing emails\n- Automated vulnerability discovery\n\n### Cloud Security Challenges\nAs more businesses move to the cloud, new security challenges emerge:\n- Misconfigured cloud services\n- Identity and access management\n- Data sovereignty concerns\n\n### IoT Vulnerabilities\nThe Internet of Things presents unique security challenges:\n- Weak default passwords\n- Lack of security updates\n- Device proliferation\n\n## Protection Strategies\n\n### For Organizations\n1. **Zero Trust Architecture**: Never trust, always verify\n2. **Employee Training**: Regular security awareness programs\n3. **Incident Response**: Prepared response plans\n4. **Regular Audits**: Continuous security assessments\n\n### For Individuals\n1. **Strong Passwords**: Use unique, complex passwords\n2. **Two-Factor Authentication**: Enable 2FA wherever possible\n3. **Software Updates**: Keep all software up to date\n4. **Backup Strategy**: Regular, secure backups',
  'An in-depth look at cybersecurity threats and protection strategies for 2024.',
  'Cybersecurity',
  'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=400&fit=crop',
  ARRAY['Cybersecurity', 'Privacy', 'Technology']
);
