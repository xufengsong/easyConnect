import axiosInstance from "@/axiosInstance";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
// import useTokenStore from "@/state_management";

export interface User {
  username: string;
  email: string;
  bio?: string;
  avatar?: string;
  bookmarks: string[];
  recordings: number;
  likes: number;
}

interface AuthContextType {
  user: User | null;
  login: (credentials: { email: string, password: string }) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkUserSession = async () => {
      try {
        // 2. USE AXIOS: Switched from fetch to axiosInstance. It automatically includes credentials.
        const response = await axiosInstance.get('/api/user_profile_view/');
        // For axios, the response data is in the `data` property.
        setUser(response.data);
      } catch (error) {
        // Axios automatically throws an error for non-2xx responses (like 401),
        // so we just need to catch it.
        console.error("No active session found.", error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkUserSession();
  }, []);

  // Before making the login request, fetch CSRF token
  const fetchCSRFToken = async () => {
    try {
      await axiosInstance.get('/api/get-csrf-token/');
    } catch (error) {
      console.error('Error fetching CSRF token:', error);
    }
  };

  const login = async (credentials: { email: string, password: string }) => {
    setIsLoading(true);
    // setError(null);
    
    try {

      await fetchCSRFToken();
      // 3. USE AXIOS FOR LOGIN: Switched from fetch. Axios handles JSON stringifying automatically.
      await axiosInstance.post('/api/login/', credentials);

      // THE FIX: Wait for a very short moment to ensure the browser
      // has processed and saved the sessionid cookie from the previous request.
      // await new Promise(resolve => setTimeout(resolve, 100)); // 50ms delay

      // 4. USE AXIOS FOR PROFILE: Since login was successful, fetch the user's profile.
      const profileResponse = await axiosInstance.get('/api/user_profile_view/');
      setUser(profileResponse.data);
      // useTokenStore.getState().setCsrfToken(profileResponse.data.csrfToken);

      toast({ title: "Welcome back!" });
      navigate('/app');

    } catch (error: any) {
      // 5. IMPROVED ERROR HANDLING: Axios provides detailed error objects.
      const errorMessage = error.response?.data?.error || 'Invalid credentials or server error.';
      toast({ title: "Login Failed", description: errorMessage, variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    setIsLoading(true);
    // setError(null);
    
    try {
      // Mock Google login
      await new Promise(resolve => setTimeout(resolve, 1000));
      const mockUser: User = {
        username: 'Google User',
        email: 'google@example.com',
        bio: 'Signed up with Google',
        avatar: '',
        bookmarks: [],
        recordings: 8,
        likes: 23
      };
      setUser(mockUser);
    } catch (err) {
      setError('Google login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
      try {
        // Wait for the server to confirm the logout.
        await axiosInstance.post('/api/logout/');

        // --- The Fix ---
        // This code now only runs if the above request is successful.
        setUser(null);
        setError(null);
        toast({ title: "You have been successfully logged out." });
        navigate('/login', { replace: true }); // Use navigate for a clean redirect.

      } catch (error) {
        // This block runs only if the logout request fails.
        console.error("Logout failed", error);
        toast({ 
          title: "Logout Failed", 
          description: "There was a problem logging out. Please try again.",
          variant: "destructive" 
        });
      }
    };

  const updateProfile = (updates: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...updates });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        loginWithGoogle,
        logout,
        updateProfile,
        error,
        isAuthenticated: !!user,
        isLoading,
        // error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
