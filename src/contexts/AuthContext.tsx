"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { 
  User, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut,
  onAuthStateChanged
} from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signInWithGoogle: async () => {},
  logout: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth || typeof auth.onAuthStateChanged !== "function") {
      console.warn("Firebase Auth is not available. Skipping auth state check.");
      setLoading(false);
      return;
    }

    try {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        setLoading(false);
      });
      return () => unsubscribe();
    } catch (error) {
      console.error("Error in onAuthStateChanged:", error);
      setLoading(false);
    }
  }, []);

  const signInWithGoogle = async () => {
    if (!auth || typeof auth.onAuthStateChanged !== "function") {
      alert("System Error: Authentication service is not configured. Please check environment variables.");
      return;
    }
    try {
      setLoading(true);
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Google Sign-In Error", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    if (!auth || typeof auth.signOut !== "function") return;
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout Error", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signInWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
