import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

export default function Footer() {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      toast({
        title: "Subscribed!",
        description: "Thank you for subscribing to our newsletter.",
      });
      setEmail("");
    }
  };

  return (
    <footer className="glass border-t border-white/10 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="text-2xl font-bold font-inter text-gradient mb-4">Blogify</div>
            <p className="text-premium-secondary mb-6">
              Write. Share. Inspire. A platform for sharing knowledge, stories, and ideas. Join our community of writers and readers.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="text-premium-muted hover:text-premium-purple transition-colors"
                data-testid="link-twitter"
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a 
                href="#" 
                className="text-premium-muted hover:text-premium-purple transition-colors"
                data-testid="link-facebook"
              >
                <i className="fab fa-facebook"></i>
              </a>
              <a 
                href="#" 
                className="text-premium-muted hover:text-premium-purple transition-colors"
                data-testid="link-linkedin"
              >
                <i className="fab fa-linkedin"></i>
              </a>
              <a 
                href="#" 
                className="text-premium-muted hover:text-premium-purple transition-colors"
                data-testid="link-github"
              >
                <i className="fab fa-github"></i>
              </a>
            </div>
          </div>
          
          {/* Platform Links */}
          <div>
            <h4 className="font-semibold mb-4 text-premium">Platform</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/create" className="text-gray-400 hover:text-white transition-colors" data-testid="link-footer-write">
                  Write
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors" data-testid="link-footer-read">
                  Read
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors" data-testid="link-footer-membership">
                  Membership
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors" data-testid="link-footer-mobile-apps">
                  Mobile Apps
                </a>
              </li>
            </ul>
          </div>
          
          {/* Support Links */}
          <div>
            <h4 className="font-semibold mb-4 text-premium">Support</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors" data-testid="link-footer-help">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors" data-testid="link-footer-contact">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors" data-testid="link-footer-privacy">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors" data-testid="link-footer-terms">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Newsletter */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="mb-4 md:mb-0">
              <h4 className="font-semibold mb-2">Stay Updated</h4>
              <p className="text-gray-400">Get the latest stories and insights delivered to your inbox.</p>
            </div>
            <form onSubmit={handleSubscribe} className="flex max-w-md w-full md:w-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-2 bg-gray-800 border border-gray-600 rounded-l-lg focus-visible:ring-2 focus-visible:ring-medium-green focus-visible:border-transparent text-white placeholder:text-gray-400"
                data-testid="input-newsletter-email"
              />
              <Button 
                type="submit"
                className="bg-medium-green px-6 py-2 rounded-r-lg hover:bg-green-700 transition-colors rounded-l-none"
                data-testid="button-newsletter-subscribe"
              >
                Subscribe
              </Button>
            </form>
          </div>
          <div className="mt-8 text-center text-gray-400">
            <p>&copy; 2024 Blogify. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}