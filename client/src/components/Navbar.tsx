import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SearchIcon, BellIcon, PenIcon, UserIcon, BookOpenIcon, BarChart3Icon, SettingsIcon, LogOutIcon, ChevronDownIcon } from "lucide-react";
import { mockAuthState, logoutUser } from "@/data/mockData";
import SearchModal from "./SearchModal";

export default function Navbar() {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();


  const handleLogout = () => {
    logoutUser();
    setIsUserMenuOpen(false);
    window.location.reload();
  };

  return (
    <header className="sticky top-0 bg-premium-bg/95 backdrop-blur-md border-b border-white/10 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 text-2xl font-bold text-premium" data-testid="link-home">
            <svg className="w-8 h-8 text-premium-purple" viewBox="0 0 24 24" fill="currentColor">
              <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
            </svg>
            <span className="font-inter">ScribeSpace</span>
          </Link>
          
          {/* Center Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center space-x-1 text-premium-secondary hover:text-premium transition-colors"
              data-testid="button-search"
            >
              <SearchIcon className="w-5 h-5" />
            </button>
            
            {mockAuthState.isLoggedIn && (
              <>
                <Link 
                  to="/create" 
                  className="flex items-center space-x-2 text-premium-secondary hover:text-premium transition-colors"
                  data-testid="link-write"
                >
                  <PenIcon className="w-5 h-5" />
                  <span>Write</span>
                </Link>
                
                <button className="flex items-center space-x-1 text-premium-secondary hover:text-premium transition-colors">
                  <BellIcon className="w-5 h-5" />
                </button>
              </>
            )}
          </nav>
          
          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {mockAuthState.isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 p-1 rounded-full hover:bg-white/10 transition-colors"
                  data-testid="button-user-menu"
                >
                  <img 
                    src={mockAuthState.currentUser?.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&w=32&h=32&fit=crop&crop=face"}
                    alt="Profile"
                    className="w-8 h-8 rounded-full"
                  />
                  <ChevronDownIcon className="w-4 h-4 text-premium-secondary" />
                </button>
                
                {/* User Dropdown Menu */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-64 glass-card rounded-lg shadow-xl py-2 z-50">
                    <div className="px-4 py-3 border-b border-white/10">
                      <div className="flex items-center space-x-3">
                        <img 
                          src={mockAuthState.currentUser?.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&w=40&h=40&fit=crop&crop=face"}
                          alt="Profile"
                          className="w-10 h-10 rounded-full"
                        />
                        <div>
                          <div className="font-medium text-premium">{mockAuthState.currentUser?.name}</div>
                          <div className="text-sm text-premium-secondary">@{mockAuthState.currentUser?.username}</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="py-2">
                      <Link
                        to="/create"
                        className="flex items-center space-x-3 px-4 py-2 text-premium-secondary hover:text-premium hover:bg-white/5 transition-colors"
                        onClick={() => setIsUserMenuOpen(false)}
                        data-testid="menu-write"
                      >
                        <PenIcon className="w-4 h-4" />
                        <span>Write</span>
                      </Link>
                      
                      <Link
                        to="/profile"
                        className="flex items-center space-x-3 px-4 py-2 text-premium-secondary hover:text-premium hover:bg-white/5 transition-colors"
                        onClick={() => setIsUserMenuOpen(false)}
                        data-testid="menu-profile"
                      >
                        <UserIcon className="w-4 h-4" />
                        <span>Profile</span>
                      </Link>
                      
                      <button
                        className="flex items-center space-x-3 px-4 py-2 text-premium-secondary hover:text-premium hover:bg-white/5 transition-colors w-full"
                        data-testid="menu-library"
                      >
                        <BookOpenIcon className="w-4 h-4" />
                        <span>Library</span>
                      </button>
                      
                      <button
                        className="flex items-center space-x-3 px-4 py-2 text-premium-secondary hover:text-premium hover:bg-white/5 transition-colors w-full"
                        data-testid="menu-stories"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V5H19V19ZM17 12H7V10H17V12ZM13 16H7V14H13V16ZM17 8H7V6H17V8Z"/>
                        </svg>
                        <span>Stories</span>
                      </button>
                      
                      <button
                        className="flex items-center space-x-3 px-4 py-2 text-premium-secondary hover:text-premium hover:bg-white/5 transition-colors w-full"
                        data-testid="menu-stats"
                      >
                        <BarChart3Icon className="w-4 h-4" />
                        <span>Stats</span>
                      </button>
                    </div>
                    
                    <div className="border-t border-white/10 py-2">
                      <button
                        className="flex items-center space-x-3 px-4 py-2 text-premium-secondary hover:text-premium hover:bg-white/5 transition-colors w-full"
                        data-testid="menu-settings"
                      >
                        <SettingsIcon className="w-4 h-4" />
                        <span>Settings</span>
                      </button>
                      
                      <button
                        className="flex items-center space-x-3 px-4 py-2 text-premium-secondary hover:text-premium hover:bg-white/5 transition-colors w-full"
                        data-testid="menu-help"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/>
                        </svg>
                        <span>Help</span>
                      </button>
                    </div>
                    
                    <div className="border-t border-white/10 py-2">
                      <div className="px-4 py-2">
                        <div className="flex items-center space-x-2 text-premium-purple">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"/>
                          </svg>
                          <span className="text-sm font-medium">Become a ScribeSpace member</span>
                        </div>
                      </div>
                      
                      <button
                        onClick={handleLogout}
                        className="flex items-center space-x-3 px-4 py-2 text-premium-secondary hover:text-premium hover:bg-white/5 transition-colors w-full"
                        data-testid="menu-logout"
                      >
                        <LogOutIcon className="w-4 h-4" />
                        <span>Sign out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2 sm:space-x-4">
                <Button 
                  asChild 
                  variant="ghost"
                  size="sm"
                  className="text-premium-secondary hover:text-premium hover:bg-white/10 transition-colors rounded-full px-3 sm:px-4 text-sm"
                >
                  <Link 
                    to="/login" 
                    data-testid="link-sign-in"
                  >
                    Sign In
                  </Link>
                </Button>
                <Button 
                  asChild 
                  size="sm"
                  className="btn-premium rounded-full px-4 sm:px-6 text-sm"
                >
                  <Link to="/register" data-testid="button-get-started">
                    Get started
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Click outside to close dropdown */}
      {isUserMenuOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsUserMenuOpen(false)}
        />
      )}
      
      {/* Search Modal */}
      <SearchModal 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
      />
    </header>
  );
}