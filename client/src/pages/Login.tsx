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
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md glass-card border-0">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-inter font-bold text-premium">
            Welcome Back
          </CardTitle>
          <p className="text-premium-secondary">Sign in to your account</p>
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
                className="glass focus-visible:ring-2 focus-visible:ring-primary text-premium placeholder:text-premium-muted border-0"
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
                className="glass focus-visible:ring-2 focus-visible:ring-primary text-premium placeholder:text-premium-muted border-0"
                data-testid="input-login-password"
              />
            </div>
            <Button 
              type="submit" 
              className="w-full btn-premium border-0"
              disabled={isLoading}
              data-testid="button-login-submit"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-premium-secondary">
              Don't have an account?{" "}
              <Link to="/register" className="text-premium-purple hover:text-premium-purple-light font-medium">
                Sign up
              </Link>
            </p>
          </div>
          
          {/* Social Login */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/20"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-premium-bg text-premium-muted">Or continue with</span>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <Button variant="outline" className="w-full glass border-white/20 text-premium hover:bg-white/10" data-testid="button-google-auth">
                <i className="fab fa-google text-red-400 mr-2"></i>
                Google
              </Button>
              <Button variant="outline" className="w-full glass border-white/20 text-premium hover:bg-white/10" data-testid="button-github-auth">
                <i className="fab fa-github text-premium mr-2"></i>
                GitHub
              </Button>
            </div>
          </div>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 glass rounded-lg">
            <h4 className="text-sm font-medium text-premium mb-2">Demo Credentials:</h4>
            <p className="text-xs text-premium-secondary font-mono">
              Email: sarah@example.com<br />
              Password: password
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}