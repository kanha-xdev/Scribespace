import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { type ArticleWithAuthor } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { BookmarkIcon, ShareIcon, MoreHorizontalIcon } from "lucide-react";

export default function Article() {
  const { id } = useParams<{ id: string }>();
  
  const { data: article, isLoading, error } = useQuery<ArticleWithAuthor>({
    queryKey: ["/api/articles", id],
  });

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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

  if (error || !article) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-2xl font-bold text-dark-text mb-4">Article not found</h1>
        <p className="text-gray-text">The article you're looking for doesn't exist.</p>
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Article Header */}
      <header className="mb-8">
        <h1 className="text-4xl lg:text-5xl font-charter font-bold text-dark-text leading-tight mb-4">
          {article.title}
        </h1>
        {article.subtitle && (
          <p className="text-xl text-gray-text mb-8 leading-relaxed">
            {article.subtitle}
          </p>
        )}
        
        {/* Author Info */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <img 
              src={article.author.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&w=50&h=50&fit=crop&crop=face"}
              alt={article.author.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <div className="font-medium text-dark-text">{article.author.name}</div>
              <div className="text-sm text-gray-text">
                {new Date(article.createdAt).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })} · {article.readTime}
              </div>
            </div>
          </div>
          
          {/* Article Actions */}
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" data-testid="button-bookmark-article">
              <BookmarkIcon className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" data-testid="button-share-article">
              <ShareIcon className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" data-testid="button-more-options">
              <MoreHorizontalIcon className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Cover Image */}
      {article.coverImage && (
        <div className="mb-8">
          <img 
            src={article.coverImage}
            alt={article.title}
            className="w-full h-auto rounded-xl shadow-lg"
          />
        </div>
      )}

      {/* Article Content */}
      <div className="prose prose-lg max-w-none">
        <div className="text-lg leading-relaxed text-dark-text whitespace-pre-wrap">
          {article.content}
        </div>
      </div>

      {/* Author Bio */}
      <div className="mt-16 p-6 bg-gray-50 rounded-xl">
        <div className="flex items-start space-x-4">
          <img 
            src={article.author.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&w=60&h=60&fit=crop&crop=face"}
            alt={article.author.name}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div className="flex-1">
            <h3 className="text-xl font-charter font-semibold text-dark-text mb-2">
              {article.author.name}
            </h3>
            {article.author.bio && (
              <p className="text-gray-text mb-4">{article.author.bio}</p>
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
