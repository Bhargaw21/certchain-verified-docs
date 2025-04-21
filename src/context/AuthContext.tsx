
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthContextType } from '@/types';

// Create a context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demonstration
const MOCK_USERS = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@ecertify.com',
    password: 'admin123',
    role: 'admin' as const,
  },
  {
    id: '2',
    name: 'Regular User',
    email: 'user@ecertify.com',
    password: 'user123',
    role: 'user' as const,
  },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem('ecertify-user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = MOCK_USERS.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      const { password, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('ecertify-user', JSON.stringify(userWithoutPassword));
    } else {
      throw new Error('Invalid credentials');
    }
    
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('ecertify-user');
  };

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user already exists
    if (MOCK_USERS.some(u => u.email === email)) {
      throw new Error('User already exists');
    }
    
    // In a real app, we would add the user to the database
    // For now, we'll just simulate a successful registration
    
    setIsLoading(false);
    // Auto login after registration
    await login(email, password);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
