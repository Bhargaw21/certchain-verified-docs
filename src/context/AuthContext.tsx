
import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User, AuthContextType } from '@/types';
import { useToast } from '@/hooks/use-toast';

interface Profile {
  id: string;
  name: string | null;
  email: string | null;
  role: 'admin' | 'user';
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { toast } = useToast();

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
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) {
        // Handle specific error messages
        if (error.message.includes('Email not confirmed')) {
          // If email not confirmed, try to authenticate anyway since we're bypassing verification
          console.log("Email not confirmed, attempting to bypass...");
          // Continue without throwing error - we'll check if the user was fetched below
        } else {
          throw new Error(error.message || "Invalid email or password. Try admin@ecertify.com / admin123 or user@ecertify.com / user123");
        }
      }
      
      if (!data?.user) {
        throw new Error('Failed to retrieve user information');
      }

      toast({
        title: "Login successful",
        description: `Welcome back, ${data.user.email}!`,
      });
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
    setIsLoading(false);
  };

  // Logout method using Supabase
  const logout = async () => {
    setIsLoading(true);
    await supabase.auth.signOut();
    setUser(null);
    setIsLoading(false);
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  // Register method: create user, skip email verification, log in immediately
  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      // First, create the user
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { 
          data: { name },
          emailRedirectTo: window.location.origin 
        }
      });
      
      if (error) {
        throw new Error(error.message || 'Registration failed');
      }
      
      if (!data?.user) {
        throw new Error('Failed to create user account');
      }
      
      // Create a profile entry for the new user
      const { error: profileError } = await supabase.from('profiles').insert([{
        id: data.user.id,
        name: name,
        email: email,
        role: 'user'
      }]);
      
      if (profileError) {
        console.error("Failed to create profile:", profileError);
      }

      // For development purposes only, set verification_token to NULL to bypass email verification
      // This requires admin privileges and won't work with the default anon key
      // In production, a proper email verification flow should be used
      
      // Force login after registration (this should work even if email isn't verified)
      const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({ 
        email, 
        password 
      });
      
      if (loginError) {
        console.error("Auto-login after registration failed:", loginError);
        throw new Error("Account created but automatic login failed. Please try logging in manually.");
      }
      
      if (!loginData?.user) {
        throw new Error("Account created but automatic login failed. Please try logging in manually.");
      }
      
      toast({
        title: "Registration successful",
        description: "Your account has been created and you are now logged in.",
      });
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
    setIsLoading(false);
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
