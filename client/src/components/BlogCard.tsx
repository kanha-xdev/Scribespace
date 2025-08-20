import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookmarkIcon, Heart } from "lucide-react";
import { BlogWithAuthor } from "@/data/mockData";

interface BlogCardProps {
  blog: BlogWithAuthor;
}

export default function BlogCard({ blog }: BlogCardProps) {
  return (
    <article className="group cursor-pointer">
      <Link to={`/blog/${blog.id}`} className="block">
        <div className="mb-4">
          <img 
            src={blog.coverImage || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&w=400&h=200&fit=crop"}
            alt={blog.title}
            className="w-full h-48 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
          />
        </div>
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
        <h3 className="text-xl font-charter font-semibold text-dark-text mb-2 group-hover:text-medium-green transition-colors">
          {blog.title}
        </h3>
        <p className="text-gray-text text-base mb-4 line-clamp-3">
          {blog.excerpt}
        </p>
      </Link>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-400">{blog.readTime}</span>
          {blog.tags && blog.tags.length > 0 && (
            <div className="flex space-x-2">
              {blog.tags.slice(0, 2).map((tag, index) => (
                <span 
                  key={index}
                  className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-gray-400 hover:text-red-500 transition-colors p-0 h-auto"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              // Handle like functionality
            }}
            data-testid={`button-like-${blog.id}`}
          >
            <Heart className="w-4 h-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-gray-400 hover:text-medium-green transition-colors p-0 h-auto"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              // Handle bookmark functionality
            }}
            data-testid={`button-bookmark-${blog.id}`}
          >
            <BookmarkIcon className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </article>
  );
}