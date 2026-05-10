"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useScroll, useTransform } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 26;
const START_FRAME = 1;

export default function AnatomyScrollSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Framer motion for text overlays based on scroll progress of this container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const textOpacity1 = useTransform(scrollYProgress, [0, 0.1, 0.25, 0.35], [0, 1, 1, 0]);
  const textOpacity2 = useTransform(scrollYProgress, [0.4, 0.5, 0.65, 0.75], [0, 1, 1, 0]);
  const textOpacity3 = useTransform(scrollYProgress, [0.8, 0.9, 1, 1], [0, 1, 1, 1]);

  useEffect(() => {
    // Preload images
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = START_FRAME; i <= FRAME_COUNT; i++) {
      const img = new Image();
      // Format number to be 3 digits (001, 002, etc.)
      const num = i.toString().padStart(3, "0");
      img.src = `/anatomy-sequence/ezgif-frame-${num}.jpg`;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === FRAME_COUNT) {
          setImages(loadedImages);
          setImagesLoaded(true);
        }
      };
      loadedImages.push(img);
    }
  }, []);

  useEffect(() => {
    if (!imagesLoaded || !canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    if (!context) return;

    // Set canvas dimensions
    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      renderFrame(0); // Render first frame immediately
    };

    window.addEventListener("resize", updateCanvasSize);
    updateCanvasSize();

    // Helper to draw image cover the canvas
    function renderFrame(index: number) {
      if (!context || !canvas || !images[index]) return;
      const img = images[index];

      const canvasRatio = canvas.width / canvas.height;
      const imgRatio = img.width / img.height;
      
      let drawWidth, drawHeight, offsetX, offsetY;

      if (canvasRatio > imgRatio) {
        drawWidth = canvas.width;
        drawHeight = canvas.width / imgRatio;
        offsetX = 0;
        offsetY = (canvas.height - drawHeight) / 2;
      } else {
        drawWidth = canvas.height * imgRatio;
        drawHeight = canvas.height;
        offsetX = (canvas.width - drawWidth) / 2;
        offsetY = 0;
      }

      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    }

    // GSAP Scroll animation object
    const animObj = { frame: 0 };

    const scrollTrigger = gsap.to(animObj, {
      frame: FRAME_COUNT - 1,
      snap: "frame",
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5, // Smooth scrubbing
      },
      onUpdate: () => renderFrame(Math.round(animObj.frame)),
    });

    return () => {
      window.removeEventListener("resize", updateCanvasSize);
      scrollTrigger.kill();
    };
  }, [imagesLoaded, images]);

  return (
    <section ref={containerRef} className="relative h-[400vh] w-full bg-black">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        
        {/* Canvas Background */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover z-0"
        />

        {/* Ambient Overlay for depth */}
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/60 via-transparent to-black/80 pointer-events-none" />

        {/* Cinematic Typography Overlays */}
        <div className="relative z-20 w-full max-w-7xl px-6 sm:px-12 pointer-events-none">
          
          {/* First Reveal */}
          <motion.div 
            style={{ opacity: textOpacity1 }}
            className="absolute top-1/2 left-6 sm:left-12 -translate-y-1/2"
          >
            <h2 className="text-4xl md:text-7xl font-light text-white tracking-tight leading-tight mix-blend-screen drop-shadow-[0_0_15px_rgba(100,200,255,0.5)]">
              Explore <br />
              <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
                Human Intelligence
              </span>
            </h2>
            <p className="mt-4 text-lg md:text-xl text-gray-300 max-w-md font-mono">
              Immersive AI-powered anatomy visualization and futuristic medical learning.
            </p>
          </motion.div>

          {/* Second Reveal */}
          <motion.div 
            style={{ opacity: textOpacity2 }}
            className="absolute top-1/2 right-6 sm:right-12 -translate-y-1/2 text-right"
          >
            <h2 className="text-4xl md:text-7xl font-light text-white tracking-tight leading-tight mix-blend-screen drop-shadow-[0_0_15px_rgba(200,100,255,0.5)]">
              Neural <br />
              <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-l from-purple-400 to-pink-600">
                Symphony
              </span>
            </h2>
            <p className="mt-4 text-lg md:text-xl text-gray-300 max-w-md ml-auto font-mono">
              Real-time neural mapping and biometric feedback integration.
            </p>
          </motion.div>

          {/* Third Reveal - CTA */}
          <motion.div 
            style={{ opacity: textOpacity3 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-auto"
          >
            <h2 className="text-5xl md:text-8xl font-medium text-white tracking-tighter mb-8 drop-shadow-[0_0_30px_rgba(0,255,255,0.4)]">
              System Active
            </h2>
            <button className="group relative px-8 py-4 bg-transparent border border-cyan-500/50 rounded-full overflow-hidden transition-all duration-300 hover:border-cyan-400">
              <div className="absolute inset-0 bg-cyan-500/10 group-hover:bg-cyan-500/20 transition-all duration-300 backdrop-blur-sm" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_center,rgba(0,255,255,0.4)_0%,transparent_70%)]" />
              <span className="relative z-10 text-cyan-300 font-mono tracking-widest uppercase text-sm group-hover:text-cyan-100 transition-colors duration-300 shadow-[0_0_10px_rgba(0,255,255,0.5)]">
                Enter The Experience
              </span>
            </button>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
