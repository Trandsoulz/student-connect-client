import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authService, User, SignupData, SigninData } from '../api/authService';
import { toast } from 'sonner';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signin: (data: SigninData) => Promise<boolean>;
  signup: (data: SignupData) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for stored user on mount
  useEffect(() => {
    const storedUser = authService.getStoredUser();
    if (storedUser) {
      setUser(storedUser);
    }
    setIsLoading(false);
  }, []);

  const signin = async (data: SigninData): Promise<boolean> => {
    try {
      setIsLoading(true);
      const response = await authService.signin(data);
      
      if (response.success) {
        setUser(response.data.user);
        toast.success('Login successful!');
        return true;
      }
      
      toast.error(response.message || 'Login failed');
      return false;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Login failed. Please try again.';
      toast.error(message);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (data: SignupData): Promise<boolean> => {
    try {
      setIsLoading(true);
      const response = await authService.signup(data);
      
      if (response.success) {
        setUser(response.data.user);
        toast.success('Registration successful!');
        return true;
      }
      
      toast.error(response.message || 'Registration failed');
      return false;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Registration failed. Please try again.';
      toast.error(message);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    toast.success('Logged out successfully');
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isLoading, signin, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
