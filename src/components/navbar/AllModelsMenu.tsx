"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  ChevronRight, 
  Heart, 
  Activity, 
  Zap, 
  Dna, 
  Eye, 
  Layers, 
  Cpu, 
  Stethoscope,
  Globe,
  Star,
  Clock,
  TrendingUp,
  X
} from "lucide-react";
import Link from "next/link";
import gsap from "gsap";

interface ModelCategory {
  id: string;
  title: string;
  icon: React.ReactNode;
  items: {
    name: string;
    description: string;
    thumbnail: string;
    isNew?: boolean;
    isHot?: boolean;
  }[];
}

const categories: ModelCategory[] = [
  {
    id: "anatomy",
    title: "Human Anatomy",
    icon: <Activity className="w-5 h-5" />,
    items: [
      { name: "Full Body", description: "Complete skeletal and muscular system", thumbnail: "/images/models/full-body.jpg" },
      { name: "Skeleton System", description: "Detailed 206 bones visualization", thumbnail: "/images/models/skeleton.jpg" },
      { name: "Muscular System", description: "650+ muscles with real-time contraction", thumbnail: "/images/models/muscles.jpg", isHot: true },
      { name: "Nervous System", description: "Neural pathways and brain mapping", thumbnail: "/images/models/nervous.jpg" },
    ]
  },
  {
    id: "organs",
    title: "Organs",
    icon: <Heart className="w-5 h-5" />,
    items: [
      { name: "Heart", description: "4-chamber 3D interactive heart", thumbnail: "/images/models/heart.jpg", isHot: true },
      { name: "Brain", description: "High-fidelity neural mapping", thumbnail: "/images/models/brain.jpg" },
      { name: "Lungs", description: "Respiratory system visualization", thumbnail: "/images/models/lungs.jpg" },
      { name: "Liver", description: "Detailed hepatic structure", thumbnail: "/images/models/liver.jpg" },
    ]
  },
  {
    id: "medical",
    title: "Medical Models",
    icon: <Dna className="w-5 h-5" />,
    items: [
      { name: "Cell Structure", description: "Microscopic organelle exploration", thumbnail: "/images/models/cell.jpg", isNew: true },
      { name: "DNA Double Helix", description: "Genomic sequence visualization", thumbnail: "/images/models/dna.jpg" },
      { name: "Virus Models", description: "Real-time pathogen simulation", thumbnail: "/images/models/virus.jpg" },
    ]
  },
  {
    id: "advanced",
    title: "Advanced Viz",
    icon: <Cpu className="w-5 h-5" />,
    items: [
      { name: "AR Anatomy", description: "Augmented reality overlays", thumbnail: "/images/models/ar.jpg", isNew: true },
      { name: "Holographic View", description: "Cinematic holographic rendering", thumbnail: "/images/models/hologram.jpg" },
      { name: "Surgical Sim", description: "Interactive procedural training", thumbnail: "/images/models/surgery.jpg" },
    ]
  }
];

interface AllModelsMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AllModelsMenu({ isOpen, onClose }: AllModelsMenuProps) {
  const [activeCategory, setActiveCategory] = useState(categories[0].id);
  const [searchQuery, setSearchQuery] = useState("");
  const menuRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      gsap.fromTo(
        ".menu-item-card",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.05, ease: "power2.out", delay: 0.2 }
      );
    }
  }, [isOpen, activeCategory]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    
    gsap.to(".mouse-glow", {
      x: e.clientX - left,
      y: e.clientY - top,
      duration: 0.6,
      ease: "power2.out"
    });
  };

  const filteredItems = categories
    .find(c => c.id === activeCategory)
    ?.items.filter(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[55]"
          />

          {/* Mega Menu */}
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-20 left-1/2 -translate-x-1/2 w-[95vw] max-w-6xl glass-panel z-[60] rounded-3xl overflow-hidden border border-white/10 shadow-2xl"
            onMouseMove={handleMouseMove}
          >
            <div ref={containerRef} className="relative flex flex-col md:flex-row h-[80vh] md:h-[70vh]">
              {/* Mouse Follow Glow */}
              <div className="mouse-glow absolute w-[400px] h-[400px] bg-electric-blue/10 blur-[120px] rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 z-0" />

              {/* Sidebar */}
              <div className="w-full md:w-64 border-r border-white/5 bg-black/20 p-6 z-10">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-xl font-bold hologram-text">Library</h2>
                  <button onClick={onClose} className="md:hidden text-white/50 hover:text-white">
                    <X size={20} />
                  </button>
                </div>

                <div className="space-y-2">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                        activeCategory === cat.id
                          ? "bg-electric-blue/10 text-electric-blue border border-electric-blue/20"
                          : "text-white/60 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      {cat.icon}
                      <span className="font-medium">{cat.title}</span>
                      {activeCategory === cat.id && (
                        <motion.div layoutId="active-indicator" className="ml-auto">
                          <ChevronRight size={16} />
                        </motion.div>
                      )}
                    </button>
                  ))}
                </div>

                <div className="mt-auto pt-8 space-y-4">
                  <div className="text-[10px] uppercase tracking-widest text-white/30 font-bold px-4">Insights</div>
                  <div className="space-y-1">
                    <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-white/50 hover:text-electric-blue transition-colors">
                      <TrendingUp size={14} /> Trending
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-white/50 hover:text-electric-blue transition-colors">
                      <Star size={14} /> Recommended
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-white/50 hover:text-electric-blue transition-colors">
                      <Clock size={14} /> Recent
                    </button>
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className="flex-1 flex flex-col min-w-0 z-10 bg-black/10">
                {/* Search Bar */}
                <div className="p-6 border-b border-white/5">
                  <div className="relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-electric-blue transition-colors" size={18} />
                    <input
                      type="text"
                      placeholder="Search anatomical structures, medical models, simulations..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-electric-blue/50 focus:bg-white/10 transition-all placeholder:text-white/20"
                    />
                  </div>
                </div>

                {/* Grid */}
                <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredItems.map((item, idx) => (
                      <motion.div
                        key={item.name}
                        className="menu-item-card group relative glass-card rounded-2xl p-4 cursor-pointer overflow-hidden"
                        whileHover={{ y: -5, scale: 1.02 }}
                      >
                        {/* Neon Glow on Hover */}
                        <div className="absolute inset-0 bg-gradient-to-br from-electric-blue/5 to-biotech-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        
                        <div className="relative aspect-video rounded-xl bg-white/5 mb-4 overflow-hidden border border-white/10">
                          {/* Mock Thumbnail / Animation Placeholder */}
                          <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:scale-110 transition-transform duration-700">
                             <Layers className="w-8 h-8 text-white/10" />
                          </div>
                          {item.isNew && (
                            <span className="absolute top-2 right-2 px-2 py-0.5 bg-electric-blue text-black text-[10px] font-bold rounded-full">NEW</span>
                          )}
                          {item.isHot && (
                            <span className="absolute top-2 right-2 px-2 py-0.5 bg-biotech-purple text-white text-[10px] font-bold rounded-full">HOT</span>
                          )}
                        </div>

                        <h3 className="text-white font-semibold mb-1 group-hover:text-electric-blue transition-colors">{item.name}</h3>
                        <p className="text-white/40 text-xs line-clamp-2 mb-4">{item.description}</p>
                        
                        <div className="flex items-center justify-between">
                          <button className="text-[10px] font-bold uppercase tracking-wider text-electric-blue flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all">
                            Explore Model <ChevronRight size={12} />
                          </button>
                          <div className="flex gap-1">
                            <div className="w-1.5 h-1.5 rounded-full bg-white/10 group-hover:bg-electric-blue/40 transition-colors" />
                            <div className="w-1.5 h-1.5 rounded-full bg-white/10 group-hover:bg-electric-blue/40 transition-colors delay-75" />
                            <div className="w-1.5 h-1.5 rounded-full bg-white/10 group-hover:bg-electric-blue/40 transition-colors delay-150" />
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {filteredItems.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-full text-white/30 space-y-4">
                      <Search size={48} className="opacity-20" />
                      <p>No models found matching your search.</p>
                    </div>
                  )}
                </div>

                {/* Footer Info */}
                <div className="p-4 bg-white/5 border-t border-white/5 flex items-center justify-between text-[10px] text-white/30 uppercase tracking-[0.2em] font-bold">
                  <div className="flex gap-6">
                    <span>Total Models: 2,450+</span>
                    <span>Active Users: 12.8k</span>
                  </div>
                  <div className="flex items-center gap-2 text-electric-blue/60">
                    <Activity size={12} /> System Status: Operational
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
