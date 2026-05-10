"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";

const HeartModel = dynamic(() => import("./HeartModel"), { ssr: false });

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const yText = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacityText = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const scaleModel = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const yModel = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const blurBg = useTransform(scrollYProgress, [0, 1], ["blur(0px)", "blur(20px)"]);

  const textVariants = {
    hidden: { opacity: 0, y: 50, filter: "blur(10px)" },
    visible: { 
      opacity: 1, 
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  return (
    <section 
      ref={containerRef}
      className="relative w-full h-[120vh] overflow-hidden flex flex-col items-center pt-32"
    >
      {/* Background glow & grid */}
      <motion.div style={{ filter: blurBg }} className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,rgba(123,44,191,0.4),transparent_60%)]"></motion.div>
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(rgba(0, 240, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 240, 255, 0.1) 1px, transparent 1px)', backgroundSize: '60px 60px' }}>
      </div>

      <div className="container mx-auto px-6 relative z-20 flex flex-col items-center text-center">
        <motion.div 
          style={{ y: yText, opacity: opacityText }}
          className="flex flex-col items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 
            variants={textVariants}
            className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4"
          >
            Powering the Future of <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-blue via-biotech-purple to-white">Advanced AI Intelligence</span>
          </motion.h1>
          
          <motion.h2 
            variants={textVariants}
            className="text-2xl md:text-3xl text-neutral-400 font-light mb-8 max-w-3xl hologram-text"
          >
            Universal Operating System for the Synthetic Era
          </motion.h2>
          
          <Link
            href="/login"
            className="hologram-border px-8 py-4 rounded-full font-medium text-sm text-white bg-black/50 backdrop-blur-md hover:bg-electric-blue/20 transition-all uppercase tracking-widest mt-4 group relative overflow-hidden"
          >
            <span className="relative z-10 group-hover:text-electric-blue transition-colors duration-500">Initialize System</span>
            <div className="absolute inset-0 bg-electric-blue/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 ease-out"></div>
          </Link>
        </motion.div>
      </div>

      {/* Floating Spline Model Container */}
      <motion.div 
        style={{ scale: scaleModel, y: yModel }}
        initial={{ opacity: 0, scale: 0.8, filter: "blur(20px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative h-[600px] w-full max-w-5xl flex items-center justify-center -mt-6 z-10"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-electric-blue/10 blur-[150px] rounded-full"></div>
        
        <div className="relative w-full h-full flex items-center justify-center">
           <HeartModel />
        </div>
      </motion.div>
    </section>
  );
}

