"use client";

import React from "react";
import { motion } from "framer-motion";

const CinematicBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-50 overflow-hidden bg-[#020205] pointer-events-none">
      {/* Base Cinematic Foundation */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(15,5,30,0.4)_0%,transparent_100%)]" />

      {/* Atmospheric Glow Layers */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] rounded-full bg-[radial-gradient(circle,rgba(123,44,191,0.15)_0%,transparent_70%)] blur-[120px]"
      />

      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2],
          x: [0, -40, 0],
          y: [0, 60, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute -bottom-[20%] -right-[10%] w-[80%] h-[80%] rounded-full bg-[radial-gradient(circle,rgba(0,240,255,0.1)_0%,transparent_70%)] blur-[120px]"
      />

      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.1, 0.3, 0.1],
          x: [0, 30, 0],
          y: [0, 40, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute top-[20%] right-[10%] w-[60%] h-[60%] rounded-full bg-[radial-gradient(circle,rgba(199,125,255,0.12)_0%,transparent_70%)] blur-[100px]"
      />

      {/* Plasma/Neural Energy Pulses */}
      <div className="absolute inset-0 opacity-30 mix-blend-screen">
        <motion.div
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 60,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[conic-gradient(from_0deg,transparent,rgba(157,78,221,0.05),transparent,rgba(0,240,255,0.05),transparent)]"
        />
      </div>

      {/* Volumetric Light Leaks */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_0%_0%,rgba(224,170,255,0.08)_0%,transparent_40%)]" />
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_100%_100%,rgba(0,229,255,0.08)_0%,transparent_40%)]" />
      </div>

      {/* Cinematic Grain/Noise for Texture */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      
      {/* Subtle Fog Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#020205] via-transparent to-transparent opacity-80" />
    </div>
  );
};

export default CinematicBackground;
