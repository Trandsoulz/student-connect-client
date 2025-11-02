import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card } from './ui/card';
import { useAuth } from '../contexts/AuthContext';

interface LoginPageProps {
  onNavigate?: (page: string) => void;
}

export function LoginPage({ onNavigate }: LoginPageProps) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signin, isLoading, user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      return;
    }

    const success = await signin({ email, password });
    
    if (success) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1E88E5] via-[#42A5F5] to-[#0097A7] flex items-center justify-center p-6">
      <Card className="w-full max-w-md p-8 shadow-2xl">
        <div className="text-center mb-8">
          <div className="inline-flex h-16 w-16 rounded-2xl bg-gradient-to-br from-[#1E88E5] to-[#0097A7] items-center justify-center mb-4">
            <span className="text-white">SC</span>
          </div>
          <h1 className="text-[#0D47A1] mb-2">Welcome Back</h1>
          <p className="text-muted-foreground">Login to your StudentConnect account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="your.email@university.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-input-background border-border focus:border-[#1E88E5] focus:ring-[#1E88E5]"
            />
          </div>

                    <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-input-background border-border focus:border-[#1E88E5] focus:ring-[#1E88E5]"
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-[#1E88E5] to-[#42A5F5] hover:from-[#1565C0] hover:to-[#1E88E5]"
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-muted-foreground">
            Don't have an account?{' '}
            <button
              type="button"
              onClick={() => navigate('/register')}
              className="text-[#1E88E5] hover:text-[#1565C0]"
            >
              Register here
            </button>
          </p>
        </div>

        <div className="mt-6 pt-6 border-t border-border">
          <p className="text-center text-muted-foreground">
            Demo accounts:
          </p>
          <div className="mt-2 space-y-1">
            <p className="text-center text-[#1565C0]">Student: student@university.edu</p>
            <p className="text-center text-[#1565C0]">Admin: admin@university.edu</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
