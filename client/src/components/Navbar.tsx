
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { mockAuthState } from "@/data/mockData";
import SearchModal from "./SearchModal";

export default function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      <nav className="glass-nav backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3">
              <svg className="w-8 h-8 text-premium-purple" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
              </svg>
              <h1 className="text-2xl font-inter font-bold text-premium">ScribeSpace</h1>
            </Link>

            {/* Right side */}
            {mockAuthState.isLoggedIn ? (
              <div className="flex items-center space-x-2 sm:space-x-4">
                <Button 
                  variant="ghost"
                  className="text-premium-secondary hover:text-premium transition-colors p-2"
                  onClick={() => setIsSearchOpen(true)}
                  data-testid="button-search"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m21 21-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </Button>
                <Button 
                  asChild 
                  variant="ghost"
                  className="text-premium-secondary hover:text-premium transition-colors hidden sm:flex"
                >
                  <Link to="/create" data-testid="link-create">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                    Write
                  </Link>
                </Button>
                <Button 
                  asChild 
                  variant="ghost"
                  className="text-premium-secondary hover:text-premium transition-colors sm:hidden p-2"
                >
                  <Link to="/create" data-testid="link-create-mobile">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </Link>
                </Button>
                <div className="w-8 h-8 bg-premium-purple rounded-full flex items-center justify-center">
                  <span className="text-premium-bg text-sm font-medium">
                    {mockAuthState.currentUser?.name?.charAt(0) || 'U'}
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-2 sm:space-x-4">
                <Button 
                  asChild 
                  variant="ghost"
                  className="text-premium-secondary hover:text-premium transition-colors hidden sm:flex"
                >
                  <Link to="/login" data-testid="link-sign-in">
                    Sign In
                  </Link>
                </Button>
                <Button 
                  asChild 
                  className="btn-premium rounded-full px-3 sm:px-6 text-premium-bg text-sm sm:text-base"
                >
                  <Link to="/register" data-testid="link-get-started">
                    Get started
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </nav>

      <SearchModal 
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
}
