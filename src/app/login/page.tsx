"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Image from "next/image";
import { Eye, EyeOff, Loader2, Sparkles } from "lucide-react";
import { auth } from "@/lib/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

export default function LoginPage() {
  const { signInWithGoogle, loading: authLoading } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, formData.email, formData.password);
      } else {
        await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        // Note: You can also save the firstName and lastName to Firestore here if needed
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An error occurred during authentication.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setError("");
      setLoading(true);
      await signInWithGoogle();
    } catch (err: any) {
      setError(err.message || "Failed to sign in with Google.");
      setLoading(false);
    }
  };

  if (authLoading) return null; // AuthGuard handles the initial loading state

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-[#020205] overflow-hidden">
      {/* Left Panel: Immersive Visuals */}
      <div className="relative hidden lg:flex lg:w-1/2 flex-col justify-between p-12 overflow-hidden border-r border-white/5">
        {/* Cinematic Background Gradients */}
        <div className="absolute inset-0 bg-gradient-to-br from-biotech-purple/20 via-[#020205] to-[#020205] z-0" />
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.15),transparent_50%)] z-0" />
        
        {/* Content */}
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-16">
            <span className="text-3xl font-light tracking-widest text-white">BIO CLONE</span>
            <span className="text-3xl font-bold tracking-widest text-cyan-400">AI</span>
            <Sparkles className="w-6 h-6 text-cyan-400" />
          </div>
          
          <h1 className="text-4xl xl:text-5xl font-light leading-tight text-white mb-6 max-w-xl">
            The most complete, scientifically accurate, virtual human body ever assembled.
          </h1>
          
          <p className="text-lg text-gray-400 font-light max-w-md">
            Anatomy, health conditions, and treatments - all visualized in interactive 3D.
          </p>
        </div>

        {/* 3D Anatomy Visual Representation (Placeholder for the actual models shown in Image 1) */}
        <div className="absolute bottom-[-10%] right-[-10%] w-[120%] h-[80%] z-0 pointer-events-none opacity-80 mix-blend-screen bg-[url('https://images.unsplash.com/photo-1530213786676-4c4c64391e6b?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center [mask-image:linear-gradient(to_top,transparent_10%,black_100%)] filter grayscale sepia-[0.3] hue-rotate-[220deg] contrast-150" />
      </div>

      {/* Right Panel: Authentication Form */}
      <div className="relative w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 z-10 bg-[#0a0a0f] lg:bg-transparent">
        {/* Subtle glow behind the form */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-biotech-purple/10 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="w-full max-w-md relative z-10 p-8 sm:p-10 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-light text-white mb-2">
              {isLogin ? "Welcome back" : "Create a free account"}
            </h2>
            <p className="text-gray-400 text-sm">
              Enter the future of interactive anatomy
            </p>
          </div>

          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-100 text-gray-900 font-medium py-3 px-4 rounded-xl transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed mb-6"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Sign in with Google
          </button>

          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-white/10"></div>
            <span className="px-4 text-xs text-gray-500 uppercase tracking-widest">or</span>
            <div className="flex-1 border-t border-white/10"></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="flex gap-4">
                <div className="flex-1 space-y-1">
                  <label className="text-xs text-gray-400 uppercase tracking-wider">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-biotech-purple/50 focus:ring-1 focus:ring-biotech-purple/50 transition-all"
                    placeholder="John"
                    required={!isLogin}
                  />
                </div>
                <div className="flex-1 space-y-1">
                  <label className="text-xs text-gray-400 uppercase tracking-wider">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-biotech-purple/50 focus:ring-1 focus:ring-biotech-purple/50 transition-all"
                    placeholder="Doe"
                    required={!isLogin}
                  />
                </div>
              </div>
            )}

            <div className="space-y-1">
              <label className="text-xs text-gray-400 uppercase tracking-wider">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-biotech-purple/50 focus:ring-1 focus:ring-biotech-purple/50 transition-all"
                placeholder="you@example.com"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-gray-400 uppercase tracking-wider">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-biotech-purple/50 focus:ring-1 focus:ring-biotech-purple/50 transition-all pr-12"
                  placeholder="At least 8 characters"
                  required
                  minLength={8}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-lg p-3">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-biotech-purple to-cyan-600 hover:from-biotech-purple/90 hover:to-cyan-600/90 text-white font-medium py-3 px-4 rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] flex items-center justify-center mt-6"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : isLogin ? (
                "Sign In"
              ) : (
                "Sign up with email"
              )}
            </button>
          </form>

          <div className="mt-8 text-center space-y-4">
            {!isLogin && (
              <p className="text-xs text-gray-500">
                By signing up, you agree to our{" "}
                <a href="#" className="underline hover:text-gray-300">Terms of Service</a> and{" "}
                <a href="#" className="underline hover:text-gray-300">Privacy Policy</a>.
              </p>
            )}
            
            <p className="text-sm text-gray-400">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                type="button"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError("");
                }}
                className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
              >
                {isLogin ? "Create one" : "Sign in"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
