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
        password: formData.password,
        bio: formData.bio || undefined,
      });

      toast({
        title: "Welcome to Blogify!",
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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-charter font-bold text-dark-text">
            Join Our Community
          </CardTitle>
          <p className="text-gray-text">Create your account to start writing</p>
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
                className="focus-visible:ring-2 focus-visible:ring-medium-green"
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
                className="focus-visible:ring-2 focus-visible:ring-medium-green"
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
                className="focus-visible:ring-2 focus-visible:ring-medium-green"
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
                className="focus-visible:ring-2 focus-visible:ring-medium-green"
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
                className="focus-visible:ring-2 focus-visible:ring-medium-green"
                data-testid="input-register-confirm-password"
              />
            </div>
            <div>
              <Input
                name="bio"
                placeholder="Bio (optional)"
                value={formData.bio}
                onChange={handleChange}
                className="focus-visible:ring-2 focus-visible:ring-medium-green"
                data-testid="input-register-bio"
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-medium-green hover:bg-green-700"
              disabled={isLoading}
              data-testid="button-register-submit"
            >
              {isLoading ? "Creating account..." : "Sign Up"}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-gray-text">
              Already have an account?{" "}
              <Link to="/login" className="text-medium-green hover:text-green-700 font-medium">
                Sign in
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
        </CardContent>
      </Card>
    </div>
  );
}