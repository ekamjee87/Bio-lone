"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Footer() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.8, 1], [0.2, 1, 1]);

  const containerVariants: any = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.2 }
    }
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <motion.footer 
      ref={containerRef}
      style={{ y, opacity }}
      className="w-full bg-[#0B041C] py-24 relative z-20 overflow-hidden"
    >
      {/* Background ambient light */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-40 bg-electric-blue/20 blur-[120px] pointer-events-none"></div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, margin: "-50px" }}
        className="container mx-auto px-6 flex flex-col items-center text-center gap-16 relative z-10"
      >
        
        <motion.div variants={itemVariants} className="flex flex-col items-center gap-6">
          <h3 className="text-3xl md:text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-neutral-500">
            Initialize your spatial journey
          </h3>
          <p className="text-neutral-400 text-lg max-w-xl">
            Join the elite network of institutions powering the future of medical intelligence and anatomical visualization.
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-6 w-full max-w-xl justify-center">
          <button className="hologram-border w-full sm:w-auto px-10 py-5 bg-biotech-purple/20 text-white font-semibold text-xs tracking-[0.2em] hover:bg-biotech-purple/40 transition-colors uppercase relative overflow-hidden group">
            <span className="relative z-10">Access Platform</span>
            <div className="absolute inset-0 bg-electric-blue/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
          </button>
          
          <div className="hidden sm:block h-10 w-px bg-white/20"></div>

          <button className="w-full sm:w-auto px-10 py-5 border border-white/20 text-white font-semibold text-xs tracking-[0.2em] hover:bg-white/10 transition-colors uppercase relative group">
            <span className="relative z-10">Enterprise Contact</span>
            <div className="absolute inset-0 bg-white/5 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-right duration-500"></div>
          </button>
        </motion.div>

        <motion.div variants={itemVariants} className="w-full flex justify-between items-end mt-16 border-t border-white/10 pt-12">
          <div className="flex gap-4">
            <span className="text-neutral-600 text-xs tracking-widest hover:text-white transition-colors cursor-pointer">SYSTEM</span>
            <span className="text-neutral-600 text-xs tracking-widest hover:text-white transition-colors cursor-pointer">NEURAL LOGS</span>
            <span className="text-neutral-600 text-xs tracking-widest hover:text-white transition-colors cursor-pointer">PROTOCOL</span>
          </div>
          
          <div className="flex items-center gap-3 opacity-60 hover:opacity-100 transition-opacity cursor-pointer group">
            <div className="w-8 h-8 rounded-full border border-white/50 flex items-center justify-center bg-white/5 group-hover:border-electric-blue group-hover:bg-electric-blue/10 transition-colors">
              <span className="text-xs font-mono text-white group-hover:text-electric-blue transition-colors">OS</span>
            </div>
            <span className="font-serif text-2xl font-bold tracking-tight text-white group-hover:text-electric-blue transition-colors">BIO-CLONE</span>
          </div>
        </motion.div>
      </motion.div>
    </motion.footer>
  );
}
