import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { type User, type ArticleWithAuthor } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import ArticleCard from "@/components/article-card";

export default function Profile() {
  const { id } = useParams<{ id: string }>();
  
  const { data: user, isLoading: userLoading } = useQuery<Omit<User, 'password'>>({
    queryKey: ["/api/users", id],
  });

  const { data: articles, isLoading: articlesLoading } = useQuery<ArticleWithAuthor[]>({
    queryKey: ["/api/users", id, "articles"],
  });

  if (userLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <Skeleton className="w-24 h-24 rounded-full mx-auto mb-4" />
          <Skeleton className="h-8 w-48 mx-auto mb-2" />
          <Skeleton className="h-4 w-32 mx-auto mb-4" />
          <Skeleton className="h-10 w-24 mx-auto" />
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-2xl font-bold text-dark-text mb-4">User not found</h1>
        <p className="text-gray-text">The user you're looking for doesn't exist.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* User Profile Header */}
      <div className="text-center mb-12">
        <img 
          src={user.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&w=150&h=150&fit=crop&crop=face"}
          alt={user.name}
          className="w-24 h-24 rounded-full object-cover mx-auto mb-4"
        />
        <h1 className="text-3xl font-charter font-bold text-dark-text mb-2">
          {user.name}
        </h1>
        <p className="text-gray-text mb-2">@{user.username}</p>
        {user.bio && (
          <p className="text-gray-text mb-6 max-w-2xl mx-auto">{user.bio}</p>
        )}
        <div className="flex justify-center space-x-4">
          <Button variant="outline" data-testid="button-follow-user">
            Follow
          </Button>
          <Button variant="ghost" data-testid="button-message-user">
            Message
          </Button>
        </div>
      </div>

      {/* User Stats */}
      <div className="grid grid-cols-3 gap-8 text-center mb-12 py-8 border-y border-gray-200">
        <div>
          <div className="text-2xl font-bold text-dark-text">{articles?.length || 0}</div>
          <div className="text-gray-text">Articles</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-dark-text">1.2K</div>
          <div className="text-gray-text">Followers</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-dark-text">340</div>
          <div className="text-gray-text">Following</div>
        </div>
      </div>

      {/* User Articles */}
      <div>
        <h2 className="text-2xl font-charter font-bold text-dark-text mb-8">Articles by {user.name}</h2>
        
        {articlesLoading ? (
          <div className="grid md:grid-cols-2 gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="w-full h-48 rounded-lg" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            ))}
          </div>
        ) : articles && articles.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-8">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-text text-lg">No articles published yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
