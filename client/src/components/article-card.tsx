import { type ArticleWithAuthor } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { BookmarkIcon } from "lucide-react";

interface ArticleCardProps {
  article: ArticleWithAuthor;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <article className="group cursor-pointer">
      <a href={`/article/${article.id}`} className="block">
        <div className="mb-4">
          <img 
            src={article.coverImage || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&w=400&h=200&fit=crop"}
            alt={article.title}
            className="w-full h-48 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="flex items-center space-x-3 mb-3">
          <img 
            src={article.author.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&w=24&h=24&fit=crop&crop=face"}
            alt={article.author.name}
            className="w-6 h-6 rounded-full object-cover"
          />
          <span className="text-sm text-gray-text">{article.author.name}</span>
          <span className="text-sm text-gray-400">·</span>
          <span className="text-sm text-gray-text">
            {new Date(article.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </span>
        </div>
        <h3 className="text-xl font-charter font-semibold text-dark-text mb-2 group-hover:text-medium-green transition-colors">
          {article.title}
        </h3>
        <p className="text-gray-text text-base mb-4 line-clamp-3">
          {article.excerpt}
        </p>
      </a>
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-400">{article.readTime}</span>
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-gray-400 hover:text-medium-green transition-colors p-0 h-auto"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            // Handle bookmark functionality
          }}
          data-testid={`button-bookmark-${article.id}`}
        >
          <BookmarkIcon className="w-4 h-4" />
        </Button>
      </div>
    </article>
  );
}
