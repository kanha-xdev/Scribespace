import { useState } from "react";
import { SearchIcon, XIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log("Searching for:", searchQuery);
      // In a real app, perform search and show results
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center pt-20">
      <div className="w-full max-w-2xl mx-4">
        <div className="glass-card rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-premium">Search ScribeSpace</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-premium-secondary hover:text-premium"
            >
              <XIcon className="w-5 h-5" />
            </Button>
          </div>
          
          <form onSubmit={handleSearch} className="relative mb-6">
            <Input
              type="text"
              placeholder="Search articles, authors, topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 glass border-0 rounded-full focus-visible:ring-2 focus-visible:ring-primary text-premium placeholder:text-premium-muted text-lg"
              autoFocus
            />
            <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-premium-muted w-5 h-5" />
          </form>
          
          <div className="space-y-3">
            <div className="text-sm text-premium-secondary">Popular searches</div>
            <div className="flex flex-wrap gap-2">
              {["React", "JavaScript", "Design", "AI", "Web Development", "Tutorial"].map((tag) => (
                <button
                  key={tag}
                  className="px-3 py-1 bg-white/5 rounded-full text-sm text-premium-secondary hover:text-premium hover:bg-white/10 transition-colors"
                  onClick={() => setSearchQuery(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Click outside to close */}
      <div 
        className="absolute inset-0 -z-10"
        onClick={onClose}
      />
    </div>
  );
}