import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { registerUser } from "@/data/mockData";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    bio: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password mismatch",
        description: "Passwords don't match. Please try again.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    try {
      const newUser = registerUser({
        name: formData.name,
        username: formData.username,
        email: formData.email,
        bio: formData.bio || undefined,
      });

      toast({
        title: "Welcome to ScribeSpace!",
        description: "Your account has been created successfully.",
      });
      
      navigate("/login");
    } catch (error) {
      toast({
        title: "Registration failed",
        description: "Please check your information and try again.",
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
            Join Our Community
          </CardTitle>
          <p className="text-premium-secondary">Create your account to start writing</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                name="name"
                placeholder="Full name"
                value={formData.name}
                onChange={handleChange}
                required
                className="glass focus-visible:ring-2 focus-visible:ring-primary text-premium placeholder:text-premium-muted border-0"
                data-testid="input-register-name"
              />
            </div>
            <div>
              <Input
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                required
                className="glass focus-visible:ring-2 focus-visible:ring-primary text-premium placeholder:text-premium-muted border-0"
                data-testid="input-register-username"
              />
            </div>
            <div>
              <Input
                name="email"
                type="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
                required
                className="glass focus-visible:ring-2 focus-visible:ring-primary text-premium placeholder:text-premium-muted border-0"
                data-testid="input-register-email"
              />
            </div>
            <div>
              <Input
                name="password"
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="glass focus-visible:ring-2 focus-visible:ring-primary text-premium placeholder:text-premium-muted border-0"
                data-testid="input-register-password"
              />
            </div>
            <div>
              <Input
                name="confirmPassword"
                type="password"
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="glass focus-visible:ring-2 focus-visible:ring-primary text-premium placeholder:text-premium-muted border-0"
                data-testid="input-register-confirm-password"
              />
            </div>
            <div>
              <Input
                name="bio"
                placeholder="Bio (optional)"
                value={formData.bio}
                onChange={handleChange}
                className="glass focus-visible:ring-2 focus-visible:ring-primary text-premium placeholder:text-premium-muted border-0"
                data-testid="input-register-bio"
              />
            </div>
            <Button 
              type="submit" 
              className="w-full btn-premium border-0"
              disabled={isLoading}
              data-testid="button-register-submit"
            >
              {isLoading ? "Creating account..." : "Sign Up"}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-premium-secondary">
              Already have an account?{" "}
              <Link to="/login" className="text-premium-purple hover:text-premium-purple-light font-medium">
                Sign in
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
        </CardContent>
      </Card>
    </div>
  );
}