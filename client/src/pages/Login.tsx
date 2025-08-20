import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { loginUser } from "@/data/mockData";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const user = loginUser(email, password);
    
    if (user) {
      toast({
        title: "Welcome back!",
        description: "You have been logged in successfully.",
      });
      navigate("/");
    } else {
      toast({
        title: "Login failed",
        description: "Invalid email or password.",
        variant: "destructive",
      });
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-charter font-bold text-dark-text">
            Welcome Back
          </CardTitle>
          <p className="text-gray-text">Sign in to your account</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="focus-visible:ring-2 focus-visible:ring-medium-green"
                data-testid="input-login-email"
              />
            </div>
            <div>
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="focus-visible:ring-2 focus-visible:ring-medium-green"
                data-testid="input-login-password"
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-medium-green hover:bg-green-700"
              disabled={isLoading}
              data-testid="button-login-submit"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-gray-text">
              Don't have an account?{" "}
              <Link to="/register" className="text-medium-green hover:text-green-700 font-medium">
                Sign up
              </Link>
            </p>
          </div>
          
          {/* Social Login */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <Button variant="outline" className="w-full" data-testid="button-google-auth">
                <i className="fab fa-google text-red-500 mr-2"></i>
                Google
              </Button>
              <Button variant="outline" className="w-full" data-testid="button-github-auth">
                <i className="fab fa-github text-gray-900 mr-2"></i>
                GitHub
              </Button>
            </div>
          </div>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="text-sm font-medium text-blue-900 mb-2">Demo Credentials:</h4>
            <p className="text-xs text-blue-700">
              Email: sarah@example.com<br />
              Password: password
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}