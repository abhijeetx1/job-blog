
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Code2, Mail, Twitter, Github, Linkedin, Heart, Newspaper } from 'lucide-react';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { SITE_CATEGORIES, getCategoryPath } from '@/config/categories';
import { toast } from 'sonner';

const quickLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
  { name: 'Privacy Policy', path: '/privacy' }
];

const socialLinks = [
  { icon: Twitter, href: 'https://twitter.com/techblog', label: 'Twitter' },
  { icon: Github, href: 'https://github.com/techblog', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com/company/techblog', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:contact@techblog.com', label: 'Email' }
];

export function Footer() {
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const { subscribe, isSubscribed } = useSubscription();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error('Please enter your email address.');
      return;
    }

    if (isSubscribed(email)) {
      toast.error('This email is already subscribed to our newsletter.');
      return;
    }

    setIsSubscribing(true);
    try {
      await subscribe(email);
      setEmail('');
    } catch (error) {
      // Error handling is done in the subscribe function
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <footer className="bg-muted/30 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
               <div className="relative">
              <Newspaper className="h-8 w-8 text-primary transition-transform group-hover:scale-110" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold bg-gradient-to-r from-primary via-blue-600 to-purple-600 bg-clip-text text-transparent">
                Tech Tribune
              </span>
              <span className="text-[10px] text-muted-foreground font-medium tracking-wider uppercase">
                Digital Innovation
              </span>
            </div>

              {/* <Code2 className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold bg-gradient-to-r from-primary via-blue-600 to-purple-600 bg-clip-text text-transparent">
                Tech Tribune
              </span>
             <span className="text-[10px] text-muted-foreground font-medium tracking-wider uppercase">
                Digital Innovation
              </span> */}
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Your ultimate destination for the latest insights, tutorials, and trends in technology. 
              From career advice to cutting-edge programming techniques.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          {/* <div className="space-y-4">
            <h3 className="text-lg font-semibold">Popular Categories</h3>
            <ul className="space-y-2">
              {SITE_CATEGORIES.slice(0, 6).map((category) => (
                <li key={category}>
                  <Link 
                    to={getCategoryPath(category)}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </div> */}

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Stay Updated</h3>
            <p className="text-sm text-muted-foreground">
              Subscribe to our newsletter for the latest tech insights and career tips. Get notified when we publish new posts!
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col space-y-2">
              <input 
                type="email" 
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-3 py-2 text-sm border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                disabled={isSubscribing}
              />
              <button 
                type="submit"
                disabled={isSubscribing}
                className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubscribing ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-muted-foreground/20">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground flex items-center">
              © 2025 TechTribune. Made with <Heart className="h-4 w-4 mx-1 text-red-500" /> by- Cobra Tech .
            </p>
            <div className="flex space-x-6 text-sm text-muted-foreground">
              <Link to="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
              <Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
              <Link to="/cookies" className="hover:text-primary transition-colors">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
