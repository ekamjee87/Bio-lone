"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const marqueeItems = [
  "🧬 AI Anatomy Visualization",
  "❤️ Interactive Human Systems",
  "🧠 Neural Intelligence Mapping",
  "⚡ Realtime Medical AI",
  "🔬 Holographic Biotechnology",
  "🌐 Immersive 3D Anatomy"
];

const sections = [
  {
    title: "AI-powered Medical Visualization",
    description: "Use fully digital human anatomical models to understand spatial relationships, disease states, and treatments.",
    image: "/heart_dashboard_1778316783978.png",
    reverse: false,
  },
  {
    title: "Holographic Anatomy Studio",
    description: "Best described as the new 3D lab standard for professional environments, enhanced with spatial computing and real-time feedback.",
    image: "/hologram_workspace_1778316800775.png",
    reverse: true,
  },
  {
    title: "Real-time Organ Exploration",
    description: "Use an advanced neural engine to scan and navigate complex systems with precision.",
    image: "/floating_heart_1778316815820.png",
    reverse: false,
  },
  {
    title: "Enterprise Healthcare Integrations",
    description: "Use an AI-powered data platform to synchronize securely with clinical workflows and enterprise databases.",
    image: "/brain_charts_1778316829888.png",
    reverse: true,
  },
  {
    title: "VR/AR Medical Learning",
    description: "Train the next generation of doctors and researchers in hyper-realistic immersive environments.",
    image: "/vr_doctor_1778316848227.png",
    reverse: false,
  }
];

const SectionItem = ({ section, idx }: { section: typeof sections[0], idx: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Parallax effects
  const imageY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [10, 0, -10]);
  const rotateY = useTransform(scrollYProgress, [0, 0.5, 1], [section.reverse ? -10 : 10, 0, section.reverse ? 10 : -10]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.9]);

  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <div ref={ref}>
      <motion.section
        style={{ opacity }}
        className={`container mx-auto px-6 py-24 flex flex-col gap-12 items-center justify-between ${section.reverse ? "lg:flex-row-reverse" : "lg:flex-row"
          }`}
      >
        {/* Text Content */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-100px" }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          className="w-full lg:w-1/3 flex flex-col gap-6"
        >
          <motion.h2 variants={textVariants} className="text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
            {section.title}
          </motion.h2>
          <motion.p variants={textVariants} className="text-neutral-400 text-lg leading-relaxed">
            {section.description}
          </motion.p>
          <motion.button variants={textVariants} className="hologram-border px-8 py-3 rounded-full font-medium text-sm text-white bg-black/50 backdrop-blur-md hover:bg-electric-blue/20 transition-all w-fit mt-4 relative group overflow-hidden">
            <span className="relative z-10">SEE HOW IT WORKS</span>
            <div className="absolute inset-0 bg-gradient-to-r from-biotech-purple/0 via-electric-blue/30 to-biotech-purple/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
          </motion.button>
        </motion.div>

        {/* Image Content */}
        <motion.div
          style={{ rotateX, rotateY, scale, perspective: 1000 }}
          className="w-full lg:w-3/5 relative rounded-2xl overflow-hidden glass-card border border-white/5 shadow-2xl"
        >
          <div className="aspect-[16/9] w-full relative overflow-hidden group">
            <motion.div style={{ y: imageY, height: "120%", top: "-10%" }} className="absolute w-full left-0 origin-center">
              <Image
                src={section.image}
                alt={section.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B041C] via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500"></div>
            <div className="absolute inset-0 bg-electric-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay"></div>
          </div>
        </motion.div>
      </motion.section>

      {/* Inject Marquee after the second item */}
      {idx === 1 && (
        <div className="py-8 my-12 border-y border-white/5 bg-black/20 backdrop-blur-xl relative overflow-hidden group" style={{ maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)", WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)" }}>
          {/* Background glow effects */}
          <div className="absolute inset-0 bg-gradient-to-r from-biotech-purple/5 via-electric-blue/5 to-biotech-purple/5 opacity-50 mix-blend-screen pointer-events-none"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-full bg-electric-blue/5 blur-[50px] pointer-events-none group-hover:bg-electric-blue/10 transition-colors duration-700"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40%] h-full bg-holographic-violet/10 blur-[40px] pointer-events-none group-hover:bg-holographic-violet/20 transition-colors duration-700"></div>

          {/* Neural Particles / Static overlay */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] mix-blend-overlay pointer-events-none"></div>

          <div className="relative w-full overflow-hidden flex whitespace-nowrap">
            <div className="flex gap-12 md:gap-24 px-6 md:px-12 animate-marquee w-max">
              {marqueeItems.map((item, index) => (
                <div key={`m1-${index}`} className="flex items-center gap-4 group/item cursor-default">
                  <span className="text-lg md:text-xl font-medium tracking-widest text-neutral-400 group-hover/item:text-white transition-all duration-500 relative">
                    {item}
                    <div className="absolute -inset-2 bg-electric-blue/0 group-hover/item:bg-electric-blue/10 blur-md rounded-full transition-all duration-500 -z-10"></div>
                  </span>
                  <span className="text-electric-blue/30 mx-2 hologram-text text-xl group-hover/item:text-electric-blue/80 transition-colors duration-500">
                    •
                  </span>
                </div>
              ))}
            </div>
            <div className="flex gap-12 md:gap-24 px-6 md:px-12 animate-marquee w-max" aria-hidden="true">
              {marqueeItems.map((item, index) => (
                <div key={`m2-${index}`} className="flex items-center gap-4 group/item cursor-default">
                  <span className="text-lg md:text-xl font-medium tracking-widest text-neutral-400 group-hover/item:text-white transition-all duration-500 relative">
                    {item}
                    <div className="absolute -inset-2 bg-electric-blue/0 group-hover/item:bg-electric-blue/10 blur-md rounded-full transition-all duration-500 -z-10"></div>
                  </span>
                  <span className="text-electric-blue/30 mx-2 hologram-text text-xl group-hover/item:text-electric-blue/80 transition-colors duration-500">
                    •
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default function AlternatingSections() {
  return (
    <div className="w-full bg-[#0B041C] relative z-20 pb-32 overflow-hidden">
      {sections.map((section, idx) => (
        <SectionItem key={idx} section={section} idx={idx} />
      ))}
    </div>
  );
}
