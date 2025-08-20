import { useState, useEffect } from "react";
import BlogCard from "@/components/BlogCard";
import { Skeleton } from "@/components/ui/skeleton";
import { getBlogsWithAuthors, getFeaturedBlogs, BlogWithAuthor, mockAuthState } from "@/data/mockData";

export default function Home() {
  const [featuredBlogs, setFeaturedBlogs] = useState<BlogWithAuthor[]>([]);
  const [recentBlogs, setRecentBlogs] = useState<BlogWithAuthor[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setFeaturedBlogs(getFeaturedBlogs());
      setRecentBlogs(getBlogsWithAuthors().slice(0, 6));
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const heroBlog = featuredBlogs[0];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 parallax">
          <div className="absolute top-10 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
          {isLoading ? (
            <div className="lg:flex lg:items-center lg:space-x-12">
              <div className="lg:w-1/2">
                <Skeleton className="h-12 w-3/4 mb-6" />
                <Skeleton className="h-6 w-full mb-4" />
                <Skeleton className="h-6 w-2/3 mb-8" />
                <div className="flex items-center space-x-4 mb-6">
                  <Skeleton className="w-12 h-12 rounded-full" />
                  <div>
                    <Skeleton className="h-4 w-24 mb-2" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                </div>
                <Skeleton className="h-12 w-32" />
              </div>
              <div className="lg:w-1/2 mt-8 lg:mt-0">
                <Skeleton className="w-full h-80 rounded-xl" />
              </div>
            </div>
          ) : mockAuthState.isLoggedIn ? (
            <div className="text-center relative z-10">
              <div className="flex items-center justify-center space-x-4 mb-8">
                <svg className="w-12 h-12 text-premium-purple" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"/>
                </svg>
                <h1 className="text-4xl lg:text-6xl font-inter font-bold text-premium">
                  Welcome back, {mockAuthState.currentUser?.name?.split(' ')[0]}!
                </h1>
                <svg className="w-12 h-12 text-premium-purple" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 11H7l3-3 3 3h-2v8h-2v-8zm1-1V6h2v4h2l-3 3-3-3h2z"/>
                </svg>
              </div>
              <p className="text-xl text-premium-secondary mb-8">
                ✍️ Ready to share your next story?
              </p>
              <div className="flex items-center justify-center space-x-4">
                <a 
                  href="/create"
                  className="inline-flex items-center space-x-2 btn-premium px-8 py-4 rounded-full text-premium-bg font-medium"
                  data-testid="button-start-writing"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                  </svg>
                  <span>Start Writing</span>
                </a>
                <a 
                  href="/profile"
                  className="inline-flex items-center space-x-2 glass-card px-6 py-4 rounded-full text-premium font-medium hover:bg-white/10 transition-colors"
                  data-testid="button-view-drafts"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                  <span>My Articles</span>
                </a>
              </div>
            </div>
          ) : heroBlog ? (
            <div className="lg:flex lg:items-center lg:space-x-12">
              <div className="lg:w-1/2">
                <h1 className="text-4xl lg:text-6xl font-inter font-bold text-premium leading-tight mb-6">
                  {heroBlog.title}
                </h1>
                <p className="text-xl text-premium-secondary mb-8 leading-relaxed">
                  {heroBlog.excerpt}
                </p>
                <div className="flex items-center space-x-4 mb-6">
                  <img 
                    src={heroBlog.author.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&w=50&h=50&fit=crop&crop=face"} 
                    alt={heroBlog.author.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-medium text-premium">{heroBlog.author.name}</div>
                    <div className="text-sm text-premium-secondary">
                      {new Date(heroBlog.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} · {heroBlog.readTime}
                    </div>
                  </div>
                </div>
                <a 
                  href={`/blog/${heroBlog.id}`}
                  className="inline-block btn-premium px-8 py-4 rounded-full text-premium-bg font-medium"
                  data-testid="button-read-hero-article"
                >
                  Read Article
                </a>
              </div>
              <div className="lg:w-1/2 mt-8 lg:mt-0">
                <img 
                  src={heroBlog.coverImage || "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&w=600&h=400&fit=crop"} 
                  alt={heroBlog.title}
                  className="curved-xl shadow-2xl w-full h-auto animate-float"
                />
              </div>
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="flex items-center justify-center space-x-4 mb-6">
                <svg className="w-16 h-16 text-premium-purple" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"/>
                </svg>
                <h1 className="text-5xl lg:text-7xl font-inter font-bold text-gradient">
                  ScribeSpace
                </h1>
                <svg className="w-16 h-16 text-premium-purple" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
                </svg>
              </div>
              <p className="text-2xl text-premium-purple mb-4">
                ✨ Your Words Matter
              </p>
              <p className="text-lg text-premium-secondary mb-8">
                Join our creative community
              </p>
              <div className="flex items-center justify-center space-x-4">
                <a 
                  href="/register"
                  className="inline-flex items-center space-x-2 btn-premium px-8 py-4 rounded-full text-premium-bg font-medium"
                  data-testid="button-join-community"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/>
                  </svg>
                  <span>Join Community</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Featured Articles Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-3 mb-12">
            <svg className="w-8 h-8 text-premium-purple" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"/>
            </svg>
            <h2 className="text-3xl font-inter font-bold text-premium">Featured Articles</h2>
          </div>
          
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="w-full h-48 rounded-lg" />
                  <div className="flex items-center space-x-3">
                    <Skeleton className="w-6 h-6 rounded-full" />
                    <Skeleton className="h-3 w-20" />
                    <Skeleton className="h-3 w-12" />
                  </div>
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {featuredBlogs.slice(1).map((blog) => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Recent Articles List */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center space-x-3">
              <svg className="w-7 h-7 text-premium-purple" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V5H19V19ZM17 12H7V10H17V12ZM13 16H7V14H13V16ZM17 8H7V6H17V8Z"/>
              </svg>
              <h2 className="text-3xl font-inter font-bold text-premium">Recent Articles</h2>
            </div>
            <a href="#" className="text-premium-purple hover:text-premium-purple-light font-medium" data-testid="link-view-all">
              View all
            </a>
          </div>
          
          {isLoading ? (
            <div className="grid lg:grid-cols-2 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="glass-card p-6 space-y-4">
                  <div className="flex items-center space-x-3">
                    <Skeleton className="w-6 h-6 rounded-full" />
                    <Skeleton className="h-3 w-20" />
                    <Skeleton className="h-3 w-12" />
                  </div>
                  <Skeleton className="h-5 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid lg:grid-cols-2 gap-8">
              {recentBlogs.map((blog) => (
                <article key={blog.id} className="glass-card p-6 cursor-pointer group">
                  <a href={`/blog/${blog.id}`} className="block">
                    <div className="flex space-x-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <img 
                            src={blog.author.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&w=24&h=24&fit=crop&crop=face"} 
                            alt={blog.author.name}
                            className="w-6 h-6 rounded-full object-cover"
                          />
                          <span className="text-sm text-premium-secondary">{blog.author.name}</span>
                          <span className="text-sm text-premium-muted">·</span>
                          <span className="text-sm text-premium-secondary">
                            {new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </span>
                        </div>
                        <h3 className="text-lg font-charter font-semibold text-premium mb-2 group-hover:text-premium-purple transition-colors">
                          {blog.title}
                        </h3>
                        <p className="text-premium-secondary text-sm mb-3 line-clamp-2">
                          {blog.excerpt}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-premium-muted">{blog.readTime}</span>
                          <button className="text-premium-muted hover:text-premium-purple transition-colors" data-testid={`button-bookmark-${blog.id}`}>
                            <i className="far fa-bookmark text-sm"></i>
                          </button>
                        </div>
                      </div>
                      {blog.coverImage && (
                        <img 
                          src={blog.coverImage} 
                          alt={blog.title}
                          className="w-20 h-16 object-cover rounded flex-shrink-0"
                        />
                      )}
                    </div>
                  </a>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}