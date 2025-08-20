import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import BlogCard from "@/components/BlogCard";
import { mockAuthState, getBlogsByAuthor, BlogWithAuthor } from "@/data/mockData";

export default function Profile() {
  const [userBlogs, setUserBlogs] = useState<BlogWithAuthor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Redirect if not logged in
  if (!mockAuthState.isLoggedIn || !mockAuthState.currentUser) {
    navigate("/login");
    return null;
  }

  const user = mockAuthState.currentUser;

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      const blogs = getBlogsByAuthor(user.id);
      setUserBlogs(blogs);
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [user.id]);

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
          <Button 
            onClick={() => navigate("/create")}
            className="bg-medium-green hover:bg-green-700"
            data-testid="button-write-article"
          >
            Write Article
          </Button>
          <Button variant="outline" data-testid="button-edit-profile">
            Edit Profile
          </Button>
        </div>
      </div>

      {/* User Stats */}
      <div className="grid grid-cols-3 gap-8 text-center mb-12 py-8 border-y border-gray-200">
        <div>
          <div className="text-2xl font-bold text-dark-text">{userBlogs.length}</div>
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
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-charter font-bold text-dark-text">Your Articles</h2>
          <Button 
            variant="outline"
            onClick={() => navigate("/create")}
            data-testid="button-create-new"
          >
            Create New
          </Button>
        </div>
        
        {isLoading ? (
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
        ) : userBlogs && userBlogs.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-8">
            {userBlogs.map((blog) => (
              <div key={blog.id} className="relative">
                <BlogCard blog={blog} />
                <div className="absolute top-4 right-4 flex space-x-2">
                  {!blog.published && (
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                      Draft
                    </span>
                  )}
                  {blog.featured && (
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      Featured
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="mb-4">
              <i className="fas fa-pen-nib text-6xl text-gray-300"></i>
            </div>
            <h3 className="text-xl font-semibold text-dark-text mb-2">No articles yet</h3>
            <p className="text-gray-text text-lg mb-6">Start sharing your thoughts with the world!</p>
            <Button 
              onClick={() => navigate("/create")}
              className="bg-medium-green hover:bg-green-700"
              data-testid="button-write-first-article"
            >
              Write Your First Article
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}