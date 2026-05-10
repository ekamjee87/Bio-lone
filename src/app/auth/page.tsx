"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Fingerprint, Mail, Lock, ChevronLeft, AlertCircle } from "lucide-react";
import dynamic from "next/dynamic";
import { auth, googleProvider } from "@/lib/firebase";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signInWithPopup 
} from "firebase/auth";

const HeartModel = dynamic(() => import("@/components/HeartModel"), { ssr: false });

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        router.push("/admin"); // Or dashboard
      } else {
        if (password !== confirmPassword) {
          throw new Error("Passwords do not match");
        }
        await createUserWithEmailAndPassword(auth, email, password);
        router.push("/admin"); // Or dashboard
      }
    } catch (err: any) {
      setError(err.message || "An error occurred during authentication.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setError(null);
    try {
      await signInWithPopup(auth, googleProvider);
      router.push("/admin");
    } catch (err: any) {
      setError(err.message || "Failed to authenticate with Google.");
    }
  };

  return (
    <main className="flex min-h-screen bg-transparent overflow-hidden relative">
      <Link href="/" className="absolute top-8 left-8 z-50 flex items-center gap-2 text-neutral-400 hover:text-white transition-colors">
        <ChevronLeft size={20} />
        <span className="text-sm font-medium">Back to OS</span>
      </Link>

      {/* LEFT SIDE: Visuals */}
      <div className="hidden lg:flex w-1/2 relative flex-col items-center justify-center border-r border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,240,255,0.1),transparent_70%)]"></div>
        <div className="absolute top-1/4 w-[400px] h-[400px] bg-biotech-purple/20 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="relative w-full h-[60vh] z-10 opacity-70 mix-blend-screen pointer-events-none">
          <HeartModel />
        </div>
        <div className="absolute bottom-20 left-20 z-20">
          <h2 className="text-4xl font-bold tracking-tighter mb-4 text-white">
            Access the <br/><span className="hologram-text">Neural Network</span>
          </h2>
          <p className="text-neutral-400 max-w-sm">
            Authenticate to unlock personalized AI tutoring, 3D anatomical saves, and your secure research environment.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE: Auth Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center relative px-6 py-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[500px] bg-electric-blue/5 blur-[150px] rounded-full pointer-events-none"></div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md relative z-10"
        >
          <div className="mb-10 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-6">
              <div className="w-10 h-10 rounded-full hologram-border flex items-center justify-center">
                <div className="absolute inset-0 bg-biotech-purple/20 blur-xl"></div>
                <span className="font-bold text-white tracking-tighter text-sm relative z-10">BC</span>
              </div>
              <span className="font-bold text-2xl tracking-widest hologram-text">BIO CLONE</span>
            </div>
            <h1 className="text-3xl font-bold text-white tracking-tight mb-2">
              {isLogin ? "Welcome Back" : "Initialize Identity"}
            </h1>
            <p className="text-neutral-400 text-sm">
              {isLogin ? "Enter your credentials to access the ecosystem." : "Create your biometric-linked profile."}
            </p>
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }} 
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl flex items-start gap-3 mb-6 text-sm"
            >
              <AlertCircle size={18} className="mt-0.5 shrink-0" />
              <p>{error}</p>
            </motion.div>
          )}

          <form onSubmit={handleAuth} className="space-y-4">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-neutral-500 group-focus-within:text-electric-blue transition-colors">
                <Mail size={18} />
              </div>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Email Address" 
                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-electric-blue/50 focus:bg-white/10 transition-all placeholder:text-neutral-600"
              />
            </div>

            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-neutral-500 group-focus-within:text-electric-blue transition-colors">
                <Lock size={18} />
              </div>
              <input 
                type={showPassword ? "text" : "password"} 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Password" 
                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-12 text-white focus:outline-none focus:border-electric-blue/50 focus:bg-white/10 transition-all placeholder:text-neutral-600"
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-neutral-500 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <AnimatePresence mode="wait">
              {!isLogin && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="relative group overflow-hidden"
                >
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-neutral-500 group-focus-within:text-electric-blue transition-colors">
                    <Lock size={18} />
                  </div>
                  <input 
                    type={showPassword ? "text" : "password"} 
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required={!isLogin}
                    placeholder="Confirm Password" 
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-electric-blue/50 focus:bg-white/10 transition-all placeholder:text-neutral-600 mt-4"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {isLogin && (
              <div className="flex justify-end pt-2">
                <button type="button" className="text-xs text-neutral-500 hover:text-electric-blue transition-colors">
                  Forgot Password?
                </button>
              </div>
            )}

            <button 
              disabled={loading}
              type="submit" 
              className="w-full relative group overflow-hidden rounded-xl bg-white text-black font-bold py-4 mt-2 transition-transform active:scale-[0.98] disabled:opacity-70"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-biotech-purple to-electric-blue opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative z-10 flex items-center justify-center gap-2 group-hover:text-white transition-colors duration-300">
                <Fingerprint size={18} />
                {loading ? "Authenticating..." : isLogin ? "Authenticate" : "Create Profile"}
              </span>
            </button>
          </form>

          <div className="mt-8 flex items-center justify-between text-sm text-neutral-500">
            <div className="h-px bg-white/10 flex-1"></div>
            <span className="px-4">Or continue with</span>
            <div className="h-px bg-white/10 flex-1"></div>
          </div>

          <button 
            onClick={handleGoogleAuth}
            disabled={loading}
            type="button"
            className="w-full mt-8 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl py-4 flex items-center justify-center gap-3 text-sm font-medium text-white transition-all disabled:opacity-70"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25C22.56 11.47 22.49 10.72 22.36 10H12V14.26H17.92C17.66 15.63 16.88 16.78 15.71 17.56V20.31H19.28C21.36 18.39 22.56 15.58 22.56 12.25Z" fill="#4285F4"/>
              <path d="M12 23C14.97 23 17.46 22.02 19.28 20.31L15.71 17.56C14.73 18.22 13.48 18.61 12 18.61C9.13999 18.61 6.72999 16.68 5.86999 14.09H2.20999V16.93C4.01999 20.53 7.71999 23 12 23Z" fill="#34A853"/>
              <path d="M5.87 14.09C5.65 13.43 5.52 12.73 5.52 12C5.52 11.27 5.65 10.57 5.87 9.91V7.07H2.21C1.47 8.55 1.05 10.22 1.05 12C1.05 13.78 1.47 15.45 2.21 16.93L5.87 14.09Z" fill="#FBBC05"/>
              <path d="M12 5.38C13.62 5.38 15.06 5.94 16.2 7.03L19.35 3.88C17.45 2.11 14.97 1 12 1C7.71999 1 4.01999 3.47 2.20999 7.07L5.86999 9.91C6.72999 7.32 9.13999 5.38 12 5.38Z" fill="#EA4335"/>
            </svg>
            Neural Sync (Google)
          </button>

          <div className="mt-8 text-center text-sm">
            <span className="text-neutral-500">
              {isLogin ? "Don't have an identity profile?" : "Already initialized?"}
            </span>
            <button 
              onClick={() => {
                setIsLogin(!isLogin);
                setError(null);
              }}
              className="ml-2 text-white font-medium hover:text-electric-blue transition-colors"
            >
              {isLogin ? "Sign Up" : "Log In"}
            </button>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
