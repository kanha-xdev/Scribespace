import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { BookmarkIcon, ShareIcon, MoreHorizontalIcon, ArrowLeftIcon } from "lucide-react";
import { getBlogById, BlogWithAuthor } from "@/data/mockData";

export default function BlogDetail() {
  const { id } = useParams<{ id: string }>();
  const [blog, setBlog] = useState<BlogWithAuthor | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (id) {
      // Simulate loading
      const timer = setTimeout(() => {
        const foundBlog = getBlogById(id);
        if (foundBlog) {
          setBlog(foundBlog);
        } else {
          setError(true);
        }
        setIsLoading(false);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [id]);

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link to="/" className="inline-flex items-center text-medium-green hover:text-green-700 mb-8">
          <ArrowLeftIcon className="w-4 h-4 mr-2" />
          Back to Home
        </Link>
        <Skeleton className="h-8 w-3/4 mb-4" />
        <Skeleton className="h-6 w-1/2 mb-8" />
        <div className="flex items-center space-x-4 mb-8">
          <Skeleton className="w-12 h-12 rounded-full" />
          <div>
            <Skeleton className="h-4 w-24 mb-2" />
            <Skeleton className="h-3 w-20" />
          </div>
        </div>
        <Skeleton className="w-full h-80 mb-8" />
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-4 w-full mb-4" />
        ))}
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <Link to="/" className="inline-flex items-center text-medium-green hover:text-green-700 mb-8">
          <ArrowLeftIcon className="w-4 h-4 mr-2" />
          Back to Home
        </Link>
        <h1 className="text-2xl font-bold text-dark-text mb-4">Article not found</h1>
        <p className="text-gray-text">The article you're looking for doesn't exist.</p>
      </div>
    );
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: blog.title,
        text: blog.excerpt,
        url: window.location.href,
      });
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <Link to="/" className="inline-flex items-center text-medium-green hover:text-green-700 mb-8">
        <ArrowLeftIcon className="w-4 h-4 mr-2" />
        Back to Home
      </Link>

      {/* Article Header */}
      <header className="mb-8">
        <h1 className="text-4xl lg:text-5xl font-charter font-bold text-dark-text leading-tight mb-4">
          {blog.title}
        </h1>
        {blog.subtitle && (
          <p className="text-xl text-gray-text mb-8 leading-relaxed">
            {blog.subtitle}
          </p>
        )}
        
        {/* Author Info */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <img 
              src={blog.author.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&w=50&h=50&fit=crop&crop=face"}
              alt={blog.author.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <div className="font-medium text-dark-text">{blog.author.name}</div>
              <div className="text-sm text-gray-text">
                {new Date(blog.createdAt).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })} · {blog.readTime}
              </div>
            </div>
          </div>
          
          {/* Article Actions */}
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" data-testid="button-bookmark-article">
              <BookmarkIcon className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={handleShare} data-testid="button-share-article">
              <ShareIcon className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" data-testid="button-more-options">
              <MoreHorizontalIcon className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Cover Image */}
      {blog.coverImage && (
        <div className="mb-8">
          <img 
            src={blog.coverImage}
            alt={blog.title}
            className="w-full h-auto rounded-xl shadow-lg"
          />
        </div>
      )}

      {/* Article Content */}
      <div className="prose prose-lg max-w-none">
        <div className="text-lg leading-relaxed text-dark-text whitespace-pre-wrap">
          {blog.content}
        </div>
      </div>

      {/* Tags */}
      {blog.tags && blog.tags.length > 0 && (
        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex flex-wrap gap-2">
            {blog.tags.map((tag, index) => (
              <span 
                key={index}
                className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 transition-colors cursor-pointer"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Author Bio */}
      <div className="mt-16 p-6 bg-gray-50 rounded-xl">
        <div className="flex items-start space-x-4">
          <img 
            src={blog.author.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&w=60&h=60&fit=crop&crop=face"}
            alt={blog.author.name}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div className="flex-1">
            <h3 className="text-xl font-charter font-semibold text-dark-text mb-2">
              {blog.author.name}
            </h3>
            {blog.author.bio && (
              <p className="text-gray-text mb-4">{blog.author.bio}</p>
            )}
            <Button variant="outline" size="sm" data-testid="button-follow-author">
              Follow
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}