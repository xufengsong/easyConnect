import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import axiosInstance from "../axiosInstance";
import { Bot, HeartHandshake } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const { login, loginWithGoogle } = useAuth();
  const { toast } = useToast();

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupConfirmPassword, setSignupConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!username) {
      newErrors.username = 'Name is required';
    }

    if (!signupEmail) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(signupEmail)) {
      newErrors.signupEmail = 'Please enter a valid email';
    }

    if (!signupPassword) {
      newErrors.signupPassword = 'Password is required';
    } else if (signupPassword.length < 6) {
      newErrors.signupPassword = 'Password must be at least 6 characters';
    }

    if (!signupConfirmPassword) {
      newErrors.signupConfirmPassword = 'Please confirm your password';
    } else if (signupPassword !== signupConfirmPassword) {
      newErrors.signupConfirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login({ email, password });
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    if (signupPassword !== signupConfirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    const formData = ({
      username: username,
      email: signupEmail,
      password1: signupPassword,
      password2: signupConfirmPassword
    })

    setIsLoading(true);

    try {
      await axiosInstance.post('/api/register/', formData);

      console.log("Success!!!!");
      toast({
        title: "Account Created Successfully!",
        description: "Welcome to Uppercut. Let's set up your profile."
      });
      navigate("/", { state: { email } });

    } catch (error) {
      toast({
        title: "Registration Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
      console.error('There was an error sending the request!', error);

    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      await loginWithGoogle();
      navigate("/");
    } catch (error: any) {
      toast({
        title: "Google Login Failed",
        description: error.message || "Could not sign in with Google",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 font-sans">
      <div className="w-full max-w-lg space-y-8">
        
        {/* Header Section */}
        <div className="text-center space-y-4">
          <div className="w-24 h-24 rounded-full bg-teal-light border-4 border-teal mx-auto flex items-center justify-center shadow-soft mb-6">
            <Bot className="w-12 h-12 text-teal" />
          </div>
          <h1 className="text-accessible-2xl font-bold text-foreground tracking-tight">
            Welcome Back
          </h1>
          <p className="text-accessible-base text-muted-foreground">
            Sign in to chat with your companion
          </p>
        </div>

        <Card className="border-none shadow-soft-lg bg-card/50 backdrop-blur-sm rounded-3xl overflow-hidden">
          <CardHeader className="space-y-1 p-2 bg-secondary/50">
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 h-16 p-1 bg-transparent gap-2">
                <TabsTrigger 
                  value="login" 
                  className="h-full rounded-2xl text-accessible-base data-[state=active]:bg-white data-[state=active]:text-teal data-[state=active]:shadow-sm transition-all"
                >
                  Sign In
                </TabsTrigger>
                <TabsTrigger 
                  value="signup" 
                  className="h-full rounded-2xl text-accessible-base data-[state=active]:bg-white data-[state=active]:text-teal data-[state=active]:shadow-sm transition-all"
                >
                  Sign Up
                </TabsTrigger>
              </TabsList>

              <div className="p-6 sm:p-8 bg-card">
                {/* Login Tab */}
                <TabsContent value="login" className="space-y-6 mt-2">
                  <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-3">
                      <Label htmlFor="login-email" className="text-accessible-sm font-medium ml-1">
                        Email Address
                      </Label>
                      <Input
                        id="login-email"
                        type="email"
                        placeholder="arthur.hayes@example.com"
                        className="h-14 px-4 rounded-2xl text-accessible-base bg-secondary/30 border-transparent focus:border-teal focus:ring-teal/20 transition-all"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="login-password" className="text-accessible-sm font-medium ml-1">
                        Password
                      </Label>
                      <Input
                        id="login-password"
                        type="password"
                        placeholder="password123"
                        className="h-14 px-4 rounded-2xl text-accessible-base bg-secondary/30 border-transparent focus:border-teal focus:ring-teal/20 transition-all"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full h-14 text-accessible-lg font-semibold rounded-2xl bg-teal hover:bg-teal/90 shadow-glow-teal transition-all duration-300 mt-4" 
                      disabled={isLoading}
                    >
                      {isLoading ? "Signing in..." : "Sign In"}
                    </Button>
                  </form>

                  <div className="relative my-8">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t border-border" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-card px-4 text-muted-foreground text-accessible-sm">
                        Or continue with
                      </span>
                    </div>
                  </div>

                  <Button
                    type="button"
                    variant="outline"
                    className="w-full h-14 rounded-2xl border-2 hover:bg-secondary/50 text-accessible-base"
                    onClick={handleGoogleLogin}
                    disabled={isLoading}
                  >
                    <svg className="w-6 h-6 mr-3" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="currentColor"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Google
                  </Button>
                </TabsContent>

                {/* Signup Tab */}
                <TabsContent value="signup" className="space-y-6 mt-2">
                  <form onSubmit={handleSignup} className="space-y-6">
                    <div className="space-y-3">
                      <Label htmlFor="user-name" className="text-accessible-sm font-medium ml-1">
                        Full Name
                      </Label>
                      <Input
                        id="user-name"
                        type="text"
                        className="h-14 px-4 rounded-2xl text-accessible-base bg-secondary/30 border-transparent focus:border-teal focus:ring-teal/20 transition-all"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="signup-email" className="text-accessible-sm font-medium ml-1">
                        Email Address
                      </Label>
                      <Input
                        id="signup-email"
                        type="email"
                        className="h-14 px-4 rounded-2xl text-accessible-base bg-secondary/30 border-transparent focus:border-teal focus:ring-teal/20 transition-all"
                        value={signupEmail}
                        onChange={(e) => setSignupEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="signup-password" className="text-accessible-sm font-medium ml-1">
                        Password
                      </Label>
                      <Input
                        id="signup-password"
                        type="password"
                        className="h-14 px-4 rounded-2xl text-accessible-base bg-secondary/30 border-transparent focus:border-teal focus:ring-teal/20 transition-all"
                        value={signupPassword}
                        onChange={(e) => setSignupPassword(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="signup-confirm-password" className="text-accessible-sm font-medium ml-1">
                        Confirm Password
                      </Label>
                      <Input
                        id="signup-confirm-password"
                        type="password"
                        className="h-14 px-4 rounded-2xl text-accessible-base bg-secondary/30 border-transparent focus:border-teal focus:ring-teal/20 transition-all"
                        value={signupConfirmPassword}
                        onChange={(e) => setSignupConfirmPassword(e.target.value)}
                        required
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full h-14 text-accessible-lg font-semibold rounded-2xl bg-teal hover:bg-teal/90 shadow-glow-teal transition-all duration-300 mt-4" 
                      disabled={isLoading}
                    >
                      {isLoading ? "Creating account..." : "Create Account"}
                    </Button>
                  </form>
                </TabsContent>
              </div>
            </Tabs>
          </CardHeader>
        </Card>

        <p className="text-center text-accessible-sm text-muted-foreground px-4 leading-relaxed">
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
};

export default Login;