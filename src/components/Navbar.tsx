"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Menu, Search, User, LogOut, ChevronRight, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import AllModelsMenu from "./navbar/AllModelsMenu";

interface NavbarProps {
  theme?: 'light' | 'dark';
}

export default function Navbar({ theme = 'dark' }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const router = useRouter();

  const isLight = theme === 'light';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleAuthClick = async () => {
    if (user) {
      await logout();
      router.push("/login");
    } else {
      router.push("/login");
    }
  };

  const navItems = [
    { name: "Platform", href: "#platform" },
    { name: "Anatomy", href: "#anatomy" },
    { name: "All Models", isMega: true },
    { name: "AI Tutor", href: "#aitutor" },
    { name: "Research", href: "#research" },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 flex items-center justify-between px-6 py-3 md:px-12 ${
          scrolled || isMenuOpen
            ? "bg-black/90 backdrop-blur-md border-b border-white/10 shadow-lg" 
            : isLight ? "bg-white/10 backdrop-blur-sm" : "bg-transparent"
        }`}
      >
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative w-8 h-8 rounded-full hologram-border flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-biotech-purple/20 blur-xl"></div>
              <span className="font-bold text-white tracking-tighter text-sm relative z-10">BC</span>
            </div>
            <span className={`font-bold text-xl tracking-widest ${isLight ? 'text-[#2a134d]' : 'hologram-text'}`}>BIO CLONE</span>
          </Link>
          <nav className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => (
              item.isMega ? (
                <div key={item.name} className="relative group/mega">
                  <button
                    onMouseEnter={() => setIsMenuOpen(true)}
                    onClick={() => router.push("/models")}
                    className={`text-sm transition-all duration-300 relative group flex items-center gap-1 ${
                      isLight ? 'text-black' : 'text-neutral-400 hover:text-white'
                    } ${isMenuOpen ? 'text-electric-blue' : ''}`}
                  >
                    {item.name}
                    <motion.div
                      animate={{ rotate: isMenuOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronRight size={14} className="rotate-90" />
                    </motion.div>
                    <div className={`absolute -bottom-1 left-0 h-[1px] bg-electric-blue transition-all duration-300 ${isMenuOpen ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                  </button>
                </div>
              ) : (
                <Link
                  key={item.name}
                  href={item.href!}
                  className={`text-sm transition-all duration-300 relative group ${
                    isLight ? 'text-black hover:text-[#7b2cbf]' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {item.name}
                  <div className="absolute -bottom-1 left-0 w-0 h-[1px] bg-electric-blue group-hover:w-full transition-all duration-300" />
                </Link>
              )
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex relative group">
             <Search size={18} className={`absolute left-3 top-1/2 -translate-y-1/2 ${isLight ? 'text-black/40' : 'text-neutral-500'}`} />
             <input 
              type="text" 
              placeholder="Quick search..."
              className={`pl-10 pr-4 py-1.5 rounded-full text-xs border transition-all ${
                isLight 
                  ? "bg-black/5 border-black/10 focus:bg-white" 
                  : "bg-white/5 border-white/10 focus:bg-white/10 focus:border-electric-blue/50"
              }`}
             />
          </div>
          
          <button 
            onClick={handleAuthClick}
            className={`hidden md:flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              isLight 
                ? "bg-[#2a134d] text-white hover:bg-[#7b2cbf]" 
                : "glass-card hover:border-electric-blue"
            }`}
          >
            {user ? (
              <>
                <LogOut size={16} />
                <span>Sign Out</span>
              </>
            ) : (
              <>
                <User size={16} />
                <span>Sign In</span>
              </>
            )}
          </button>
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className={`lg:hidden ${isLight ? 'text-black' : 'text-white'}`}
          >
            <Menu size={24} />
          </button>
        </div>
      </motion.header>

      {/* Desktop Mega Menu */}
      <AllModelsMenu 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)} 
      />

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-[70]"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 w-[85%] max-w-sm glass-panel z-[80] p-8 flex flex-col"
            >
              <div className="flex items-center justify-between mb-12">
                <span className="font-bold text-xl tracking-widest hologram-text">MENU</span>
                <button onClick={() => setIsMobileMenuOpen(false)} className="text-white/50 hover:text-white">
                  <X size={24} />
                </button>
              </div>

              <nav className="flex flex-col gap-6">
                {navItems.map((item) => (
                  <div key={item.name}>
                    {item.isMega ? (
                      <div className="space-y-4">
                        <button className="text-2xl font-medium text-white flex items-center justify-between w-full group">
                          {item.name}
                          <ChevronRight size={20} className="text-electric-blue" />
                        </button>
                        <div className="pl-4 border-l border-white/10 space-y-3">
                          <Link href="#anatomy" className="block text-white/50 hover:text-electric-blue transition-colors">Human Anatomy</Link>
                          <Link href="#organs" className="block text-white/50 hover:text-electric-blue transition-colors">Organs</Link>
                          <Link href="#medical" className="block text-white/50 hover:text-electric-blue transition-colors">Medical Models</Link>
                          <Link href="#advanced" className="block text-white/50 hover:text-electric-blue transition-colors">Advanced Viz</Link>
                        </div>
                      </div>
                    ) : (
                      <Link
                        href={item.href!}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-2xl font-medium text-white/70 hover:text-white transition-colors block"
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}
              </nav>

              <div className="mt-auto pt-8 border-t border-white/10">
                <button 
                  onClick={handleAuthClick}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-electric-blue text-black font-bold transition-transform active:scale-95"
                >
                  {user ? "SIGN OUT" : "SIGN IN"}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
