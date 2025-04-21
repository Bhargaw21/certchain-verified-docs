
import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User, AuthContextType } from '@/types';

interface Profile {
  id: string;
  name: string | null;
  email: string | null;
  role: 'admin' | 'user';
}

// Create and export the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Fetch user profile from "profiles" table
  const fetchProfile = async (userId: string) => {
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle();
    if (error || !profile) return null;
    return profile as Profile;
  };

  useEffect(() => {
    // Listen to authentication state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        fetchProfile(session.user.id).then((profile) => {
          if (profile) {
            setUser({
              id: profile.id,
              name: profile.name ?? 'User',
              email: profile.email ?? session.user.email ?? '',
              role: profile.role
            });
          }
        });
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    // Initial session setup
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        fetchProfile(session.user.id).then((profile) => {
          if (profile) {
            setUser({
              id: profile.id,
              name: profile.name ?? 'User',
              email: profile.email ?? session.user.email ?? '',
              role: profile.role
            });
          }
        });
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Login method using Supabase
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setIsLoading(false);
    if (error) throw new Error(error.message ?? 'Login failed');
  };

  // Logout method using Supabase
  const logout = async () => {
    setIsLoading(true);
    await supabase.auth.signOut();
    setUser(null);
    setIsLoading(false);
  };

  // Register method using Supabase (sign-up and create profile)
  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name } }
    });
    setIsLoading(false);
    if (error) throw new Error(error.message ?? 'Registration failed');
    // Wait for email confirmation, then login
    if (data.user) {
      // Optionally force email confirmation here
      return;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        register
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
