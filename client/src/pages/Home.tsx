import { useState, useEffect } from "react";
import BlogCard from "@/components/BlogCard";
import { Skeleton } from "@/components/ui/skeleton";
import { getBlogsWithAuthors, getFeaturedBlogs, BlogWithAuthor } from "@/data/mockData";

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
    <div className="bg-white">
      {/* Hero Section */}
      <section className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
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
          ) : heroBlog ? (
            <div className="lg:flex lg:items-center lg:space-x-12">
              <div className="lg:w-1/2">
                <h1 className="text-4xl lg:text-5xl font-charter font-bold text-dark-text leading-tight mb-6">
                  {heroBlog.title}
                </h1>
                <p className="text-xl text-gray-text mb-8 leading-relaxed">
                  {heroBlog.excerpt}
                </p>
                <div className="flex items-center space-x-4 mb-6">
                  <img 
                    src={heroBlog.author.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&w=50&h=50&fit=crop&crop=face"} 
                    alt={heroBlog.author.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-medium text-dark-text">{heroBlog.author.name}</div>
                    <div className="text-sm text-gray-text">
                      {new Date(heroBlog.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} · {heroBlog.readTime}
                    </div>
                  </div>
                </div>
                <a 
                  href={`/blog/${heroBlog.id}`}
                  className="inline-block bg-medium-green text-white px-6 py-3 rounded-full hover:bg-green-700 transition-colors"
                  data-testid="button-read-hero-article"
                >
                  Read Article
                </a>
              </div>
              <div className="lg:w-1/2 mt-8 lg:mt-0">
                <img 
                  src={heroBlog.coverImage || "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&w=600&h=400&fit=crop"} 
                  alt={heroBlog.title}
                  className="rounded-xl shadow-lg w-full h-auto"
                />
              </div>
            </div>
          ) : (
            <div className="text-center py-16">
              <h1 className="text-4xl font-charter font-bold text-dark-text mb-4">
                Welcome to Blogify
              </h1>
              <p className="text-xl text-gray-text mb-8">
                Write. Share. Inspire.
              </p>
              <p className="text-lg text-gray-text">
                Discover and share amazing stories from our community of writers
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Featured Articles Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-charter font-bold text-dark-text mb-12">Featured Articles</h2>
          
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
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-charter font-bold text-dark-text">Recent Articles</h2>
            <a href="#" className="text-medium-green hover:text-green-700 font-medium" data-testid="link-view-all">
              View all
            </a>
          </div>
          
          {isLoading ? (
            <div className="grid lg:grid-cols-2 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg p-6 shadow-sm space-y-4">
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
                <article key={blog.id} className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
                  <a href={`/blog/${blog.id}`} className="block">
                    <div className="flex space-x-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <img 
                            src={blog.author.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&w=24&h=24&fit=crop&crop=face"} 
                            alt={blog.author.name}
                            className="w-6 h-6 rounded-full object-cover"
                          />
                          <span className="text-sm text-gray-text">{blog.author.name}</span>
                          <span className="text-sm text-gray-400">·</span>
                          <span className="text-sm text-gray-text">
                            {new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </span>
                        </div>
                        <h3 className="text-lg font-charter font-semibold text-dark-text mb-2 group-hover:text-medium-green transition-colors">
                          {blog.title}
                        </h3>
                        <p className="text-gray-text text-sm mb-3 line-clamp-2">
                          {blog.excerpt}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-400">{blog.readTime}</span>
                          <button className="text-gray-400 hover:text-medium-green transition-colors" data-testid={`button-bookmark-${blog.id}`}>
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