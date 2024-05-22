import React, { createContext, useState, useEffect } from 'react';
import { supabase } from '../db';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    setUser(session?.user ?? null);
    setLoading(false);
    }

    getSession();

    /*setUser(session?.user ?? null);
    setLoading(false);

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => {
      authListener?.unsubscribe();
    };*/
  }, []);

  const value = {
    user,
    loading,
    signInWithGoogle: async () => {
        const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
      });
      console.log('oauth data', data);
    },
    signOut: async () => {
      await supabase.auth.signOut();
      setUser(null);
    },
    signUp: async (email, password) => {
        const { user, error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        return user;
      },
      signInWithPassword: async (email, password) => {
        const { user, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        return user;
      },
      resetPassword: async (email) => {
        const { data, error } = await supabase.auth.api.resetPasswordForEmail(email);
        if (error) throw error;
        return data;
      }
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};