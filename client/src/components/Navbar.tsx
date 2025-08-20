
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { mockAuthState } from "@/data/mockData";
import SearchModal from "./SearchModal";

export default function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      <nav className="bg-[#F7F4ED] border-b border-black/10 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <h1 className="text-2xl font-['GT_Super'] font-normal text-black">Medium</h1>
            </Link>

            {/* Right side */}
            {mockAuthState.isLoggedIn ? (
              <div className="flex items-center space-x-4">
                <Button 
                  variant="ghost"
                  className="text-gray-600 hover:text-black transition-colors"
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
                  className="text-gray-600 hover:text-black transition-colors"
                >
                  <Link to="/create" data-testid="link-create">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                    Write
                  </Link>
                </Button>
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    {mockAuthState.currentUser?.name?.charAt(0) || 'U'}
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Button 
                  asChild 
                  variant="ghost"
                  className="text-gray-600 hover:text-black transition-colors"
                >
                  <Link to="/login" data-testid="link-sign-in">
                    Sign In
                  </Link>
                </Button>
                <Button 
                  asChild 
                  className="bg-black text-white hover:bg-gray-800 rounded-full px-6"
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
