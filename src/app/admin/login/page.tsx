"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Shield, Lock, Fingerprint, ChevronLeft, AlertCircle } from "lucide-react";
import Link from "next/link";
import { loginAdmin } from "@/app/actions/adminAuth";

export default function AdminLoginPage() {
  const [adminId, setAdminId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("adminId", adminId);
    formData.append("password", password);

    const res = await loginAdmin(formData);
    
    if (res.success) {
      router.push("/admin");
    } else {
      setError(res.error || "Authentication failed.");
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-black relative overflow-hidden">
      <Link href="/" className="absolute top-8 left-8 z-50 flex items-center gap-2 text-neutral-400 hover:text-white transition-colors">
        <ChevronLeft size={20} />
        <span className="text-sm font-medium">Back to OS</span>
      </Link>

      {/* Cyberpunk Grid Background */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(rgba(0, 240, 255, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 240, 255, 0.2) 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,240,255,0.05),transparent_70%)]"></div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-md p-8 glass-card rounded-3xl border border-electric-blue/20"
      >
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 rounded-full hologram-border flex items-center justify-center bg-black">
            <Shield className="text-electric-blue" size={32} />
          </div>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold tracking-widest text-white mb-2">SYSTEM OVERRIDE</h1>
          <p className="text-neutral-500 text-sm uppercase tracking-widest">Admin Authentication</p>
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

        <form onSubmit={handleAdminLogin} className="space-y-6">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-neutral-500 group-focus-within:text-electric-blue transition-colors">
              <Fingerprint size={18} />
            </div>
            <input 
              type="text" 
              required
              value={adminId}
              onChange={(e) => setAdminId(e.target.value)}
              placeholder="Admin ID" 
              className="w-full bg-black/50 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-electric-blue focus:bg-black transition-all placeholder:text-neutral-600 font-mono"
            />
          </div>

          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-neutral-500 group-focus-within:text-electric-blue transition-colors">
              <Lock size={18} />
            </div>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Authorization Key" 
              className="w-full bg-black/50 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-electric-blue focus:bg-black transition-all placeholder:text-neutral-600 font-mono"
            />
          </div>

          <button 
            disabled={loading}
            type="submit" 
            className="w-full relative group overflow-hidden rounded-xl bg-electric-blue/10 border border-electric-blue/30 text-electric-blue font-bold tracking-widest uppercase py-4 transition-all hover:bg-electric-blue hover:text-black hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] disabled:opacity-50"
          >
            <span className="relative z-10 flex items-center justify-center gap-2 transition-colors duration-300">
              {loading ? "Authenticating..." : "Initialize Access"}
            </span>
          </button>
        </form>
      </motion.div>
    </main>
  );
}
