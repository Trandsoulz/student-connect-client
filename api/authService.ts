import apiClient from './client';

export interface User {
  id: string;
  fullname: string;
  email: string;
  role: 'admin' | 'student';
  isActive: boolean;
  createdAt: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    token: string;
  };
}

export interface SignupData {
  fullname: string;
  email: string;
  password: string;
  role?: 'admin' | 'student';
}

export interface SigninData {
  email: string;
  password: string;
}

// Auth API Service
export const authService = {
  // Signup
  signup: async (data: SignupData): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/api/auth/signup', data);
    
    // Save token and user to localStorage
    if (response.data.success) {
      localStorage.setItem('token', response.data.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.data.user));
    }
    
    return response.data;
  },

  // Signin
  signin: async (data: SigninData): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/api/auth/signin', data);
    
    // Save token and user to localStorage
    if (response.data.success) {
      localStorage.setItem('token', response.data.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.data.user));
    }
    
    return response.data;
  },

  // Get current user
  getMe: async (): Promise<{ success: boolean; data: { user: User } }> => {
    const response = await apiClient.get('/api/auth/me');
    return response.data;
  },

  // Logout
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  // Get stored user
  getStoredUser: (): User | null => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  // Get stored token
  getStoredToken: (): string | null => {
    return localStorage.getItem('token');
  },

  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('token');
  },
};
