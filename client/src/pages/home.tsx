import { useQuery } from "@tanstack/react-query";
import { type ArticleWithAuthor } from "@shared/schema";
import ArticleCard from "@/components/article-card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const { data: featuredArticles, isLoading: featuredLoading } = useQuery<ArticleWithAuthor[]>({
    queryKey: ["/api/articles", { featured: true, limit: 3 }],
  });

  const { data: recentArticles, isLoading: recentLoading } = useQuery<ArticleWithAuthor[]>({
    queryKey: ["/api/articles", { limit: 6 }],
  });

  const heroArticle = featuredArticles?.[0];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {featuredLoading ? (
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
          ) : heroArticle ? (
            <div className="lg:flex lg:items-center lg:space-x-12">
              <div className="lg:w-1/2">
                <h1 className="text-4xl lg:text-5xl font-charter font-bold text-dark-text leading-tight mb-6">
                  {heroArticle.title}
                </h1>
                <p className="text-xl text-gray-text mb-8 leading-relaxed">
                  {heroArticle.excerpt}
                </p>
                <div className="flex items-center space-x-4 mb-6">
                  <img 
                    src={heroArticle.author.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&w=50&h=50&fit=crop&crop=face"} 
                    alt={heroArticle.author.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-medium text-dark-text">{heroArticle.author.name}</div>
                    <div className="text-sm text-gray-text">
                      {new Date(heroArticle.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} · {heroArticle.readTime}
                    </div>
                  </div>
                </div>
                <a 
                  href={`/article/${heroArticle.id}`}
                  className="inline-block bg-medium-green text-white px-6 py-3 rounded-full hover:bg-green-700 transition-colors"
                  data-testid="button-read-hero-article"
                >
                  Read Article
                </a>
              </div>
              <div className="lg:w-1/2 mt-8 lg:mt-0">
                <img 
                  src={heroArticle.coverImage || "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&w=600&h=400&fit=crop"} 
                  alt={heroArticle.title}
                  className="rounded-xl shadow-lg w-full h-auto"
                />
              </div>
            </div>
          ) : (
            <div className="text-center py-16">
              <h1 className="text-4xl font-charter font-bold text-dark-text mb-4">
                Welcome to BlogMedium
              </h1>
              <p className="text-xl text-gray-text">
                Discover and share amazing stories
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Featured Articles Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-charter font-bold text-dark-text mb-12">Featured Articles</h2>
          
          {featuredLoading ? (
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
              {featuredArticles?.slice(1).map((article) => (
                <ArticleCard key={article.id} article={article} />
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
          
          {recentLoading ? (
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
              {recentArticles?.map((article) => (
                <article key={article.id} className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
                  <a href={`/article/${article.id}`} className="block">
                    <div className="flex space-x-4">
                      <div className="flex-1">
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
                        <h3 className="text-lg font-charter font-semibold text-dark-text mb-2 group-hover:text-medium-green transition-colors">
                          {article.title}
                        </h3>
                        <p className="text-gray-text text-sm mb-3 line-clamp-2">
                          {article.excerpt}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-400">{article.readTime}</span>
                          <button className="text-gray-400 hover:text-medium-green transition-colors" data-testid={`button-bookmark-${article.id}`}>
                            <i className="far fa-bookmark text-sm"></i>
                          </button>
                        </div>
                      </div>
                      {article.coverImage && (
                        <img 
                          src={article.coverImage} 
                          alt={article.title}
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
