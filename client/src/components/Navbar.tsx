import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon, MenuIcon, XIcon, PenIcon } from "lucide-react";
import { mockAuthState, logoutUser } from "@/data/mockData";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // In a real app, you would navigate to search results
      console.log("Searching for:", searchQuery);
    }
  };

  const handleLogout = () => {
    logoutUser();
    window.location.reload(); // Simple way to update UI state
  };

  return (
    <header className="sticky top-0 bg-white border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-dark-text" data-testid="link-home">
              Blogify
            </Link>
          </div>
          
          {/* Search Bar - Desktop */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="relative w-full">
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-full focus-visible:ring-2 focus-visible:ring-medium-green focus-visible:border-transparent"
                data-testid="input-search"
              />
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            </form>
          </div>
          
          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center space-x-6">
            {mockAuthState.isLoggedIn ? (
              // Logged in navigation
              <>
                <Link 
                  to="/create" 
                  className={`flex items-center space-x-2 text-gray-600 hover:text-dark-text transition-colors ${location.pathname === '/create' ? 'text-dark-text font-medium' : ''}`}
                  data-testid="link-write"
                >
                  <PenIcon className="w-4 h-4" />
                  <span>Write</span>
                </Link>
                <Link 
                  to="/profile" 
                  className="flex items-center space-x-2 text-gray-600 hover:text-dark-text transition-colors"
                  data-testid="link-profile"
                >
                  <img 
                    src={mockAuthState.currentUser?.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&w=32&h=32&fit=crop&crop=face"}
                    alt="Profile"
                    className="w-8 h-8 rounded-full"
                  />
                  <span>{mockAuthState.currentUser?.name}</span>
                </Link>
                <Button 
                  variant="ghost"
                  onClick={handleLogout}
                  data-testid="button-logout"
                >
                  Logout
                </Button>
              </>
            ) : (
              // Not logged in navigation
              <>
                <Link 
                  to="/login" 
                  className="text-gray-600 hover:text-dark-text transition-colors"
                  data-testid="link-sign-in"
                >
                  Sign In
                </Link>
                <Button 
                  asChild 
                  className="bg-medium-green text-white hover:bg-green-700 transition-colors rounded-full"
                >
                  <Link to="/register" data-testid="button-get-started">
                    Get started
                  </Link>
                </Button>
              </>
            )}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {isMenuOpen ? <XIcon className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="space-y-4">
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="relative">
                <Input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-full focus-visible:ring-2 focus-visible:ring-medium-green"
                  data-testid="input-search-mobile"
                />
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              </form>
              
              {/* Mobile Navigation Links */}
              <div className="space-y-2">
                {mockAuthState.isLoggedIn ? (
                  <>
                    <Link 
                      to="/create" 
                      className="flex items-center space-x-2 py-2 text-gray-600 hover:text-dark-text transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                      data-testid="link-write-mobile"
                    >
                      <PenIcon className="w-4 h-4" />
                      <span>Write</span>
                    </Link>
                    <Link 
                      to="/profile" 
                      className="flex items-center space-x-2 py-2 text-gray-600 hover:text-dark-text transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                      data-testid="link-profile-mobile"
                    >
                      <img 
                        src={mockAuthState.currentUser?.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&w=24&h=24&fit=crop&crop=face"}
                        alt="Profile"
                        className="w-6 h-6 rounded-full"
                      />
                      <span>Profile</span>
                    </Link>
                    <Button 
                      variant="ghost"
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                      className="w-full justify-start"
                      data-testid="button-logout-mobile"
                    >
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Link 
                      to="/login" 
                      className="block py-2 text-gray-600 hover:text-dark-text transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                      data-testid="link-sign-in-mobile"
                    >
                      Sign In
                    </Link>
                    <Button 
                      asChild 
                      className="w-full bg-medium-green text-white hover:bg-green-700 transition-colors rounded-full mt-4"
                    >
                      <Link 
                        to="/register" 
                        onClick={() => setIsMenuOpen(false)}
                        data-testid="button-get-started-mobile"
                      >
                        Get started
                      </Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}