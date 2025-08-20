import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { HomeIcon } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-gray-300">404</h1>
        </div>
        <h2 className="text-3xl font-charter font-bold text-dark-text mb-4">
          Page not found
        </h2>
        <p className="text-xl text-gray-text mb-8 max-w-md mx-auto">
          Sorry, we couldn't find the page you're looking for. It might have been moved, deleted, or you entered the wrong URL.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild className="bg-medium-green hover:bg-green-700">
            <Link to="/" data-testid="button-go-home">
              <HomeIcon className="w-4 h-4 mr-2" />
              Go Home
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/create" data-testid="button-write-article">
              Write an Article
            </Link>
          </Button>
        </div>
        
        {/* Fun illustration */}
        <div className="mt-12">
          <div className="text-6xl text-gray-300 mb-4">📝</div>
          <p className="text-gray-500">
            Maybe it's time to write something new?
          </p>
        </div>
      </div>
    </div>
  );
}