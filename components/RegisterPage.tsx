import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card } from './ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { toast } from 'sonner';
import { useAuth } from '../contexts/AuthContext';

interface RegisterPageProps {
  onNavigate?: (page: string) => void;
  onRegister?: (name: string, email: string, role: 'student' | 'admin') => void;
}

export function RegisterPage({ onNavigate, onRegister }: RegisterPageProps) {
  const navigate = useNavigate();
  const { signup, isLoading } = useAuth();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student' as 'student' | 'admin',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword) {
      toast.error('Please fill in all fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    const success = await signup({
      fullname: formData.fullName,
      email: formData.email,
      password: formData.password,
      role: formData.role,
    });

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
          <h1 className="text-[#0D47A1] mb-2">Create Account</h1>
          <p className="text-muted-foreground">Join StudentConnect today</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              type="text"
              placeholder="John Doe"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="bg-input-background border-border focus:border-[#1E88E5] focus:ring-[#1E88E5]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="your.email@university.edu"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="bg-input-background border-border focus:border-[#1E88E5] focus:ring-[#1E88E5]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="bg-input-background border-border focus:border-[#1E88E5] focus:ring-[#1E88E5]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              className="bg-input-background border-border focus:border-[#1E88E5] focus:ring-[#1E88E5]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Select
              value={formData.role}
              onValueChange={(value: 'student' | 'admin') =>
                setFormData({ ...formData, role: value })
              }
            >
              <SelectTrigger className="bg-input-background border-border">
                <SelectValue placeholder="Select your role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="student">Student</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-[#1E88E5] to-[#42A5F5] hover:from-[#1565C0] hover:to-[#1E88E5]"
          >
            {isLoading ? 'Registering...' : 'Register'}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-muted-foreground">
            Already have an account?{' '}
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="text-[#1E88E5] hover:text-[#1565C0]"
            >
              Log in
            </button>
          </p>
        </div>
      </Card>
    </div>
  );
}
