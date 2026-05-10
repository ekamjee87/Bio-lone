"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading) {
      const publicPaths = ["/", "/login"];
      const isPublicPath = publicPaths.includes(pathname);

      if (!user && !isPublicPath) {
        // Redirect to login if trying to access protected route
        router.push("/login");
      } else if (user && pathname === "/login") {
        // If logged in, don't allow access to login page
        router.push("/dashboard");
      }
    }
  }, [user, loading, pathname, router]);

  if (loading && pathname !== "/") {
    return (
      <div className="min-h-screen w-full bg-[#020205] flex flex-col items-center justify-center relative overflow-hidden">
        {/* Holographic glowing orb background */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[40vw] h-[40vw] bg-biotech-purple/10 rounded-full blur-[100px] animate-pulse"></div>
          <div className="absolute w-[20vw] h-[20vw] bg-cyan-500/10 rounded-full blur-[80px]"></div>
        </div>
        
        {/* Loader Icon */}
        <div className="relative z-10 flex flex-col items-center gap-6">
          <div className="relative">
            <Loader2 className="w-12 h-12 text-cyan-400 animate-spin" />
            <div className="absolute inset-0 blur-md bg-cyan-400/30 rounded-full animate-pulse"></div>
          </div>
          <p className="text-sm tracking-[0.2em] text-cyan-400/80 font-mono uppercase">
            Initializing System...
          </p>
        </div>
      </div>
    );
  }

  // Prevent flashing content while redirecting on protected routes
  const publicPaths = ["/", "/login"];
  if (!user && !publicPaths.includes(pathname)) {
    return null; 
  }

  return <>{children}</>;
}
