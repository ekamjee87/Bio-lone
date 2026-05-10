"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Brain, Heart, Activity, Dna, Database, Microscope } from "lucide-react";

const features = [
  {
    title: "Holographic 3D Anatomy",
    description: "Explore the human body in extreme detail with interactive WebGL models. Isolate systems, view cross-sections, and study in real-time 3D.",
    icon: Heart,
    color: "#00F0FF"
  },
  {
    title: "Neural AI Assistant",
    description: "An advanced, context-aware AI tutor that explains complex medical concepts, generates quizzes, and helps you learn faster.",
    icon: Brain,
    color: "#7B2CBF"
  },
  {
    title: "Genomic Simulation",
    description: "Interact with floating DNA structures and simulate genetic mutations. A living interface powered by real biological data.",
    icon: Dna,
    color: "#00E5FF"
  },
  {
    title: "Clinical Data Engine",
    description: "Access terabytes of medical literature and case studies, indexed and instantly searchable through our advanced LLM architecture.",
    icon: Database,
    color: "#A3A3A3"
  },
  {
    title: "Biotech Research Lab",
    description: "Conduct virtual experiments and visualize biochemical reactions in a safe, hyper-realistic simulated environment.",
    icon: Microscope,
    color: "#7B2CBF"
  },
  {
    title: "Real-time Vitals AI",
    description: "Connect physical sensors to stream and analyze real-time vitals, predicting anomalies before they become critical.",
    icon: Activity,
    color: "#00F0FF"
  }
];

export default function Features() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section ref={ref} className="relative w-full py-32 bg-black overflow-hidden" id="platform">
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,rgba(123,44,191,0.15),transparent_50%)]"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          style={{ y, opacity }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">
            The World's Most <span className="hologram-text">Advanced</span> Medical Engine.
          </h2>
          <p className="text-neutral-400 text-lg md:text-xl">
            A next-generation platform integrating AI, WebGL, and advanced cloud architecture to revolutionize biological understanding.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
          {features.map((feat, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
              key={idx}
              className="glass-card p-8 rounded-3xl flex flex-col gap-6 group hover:-translate-y-2"
            >
              <div 
                className="w-14 h-14 rounded-full flex items-center justify-center bg-black/50 border transition-colors duration-500"
                style={{ borderColor: `${feat.color}40`, color: feat.color }}
              >
                <feat.icon size={28} className="group-hover:scale-110 transition-transform" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-white mb-3 tracking-tight">{feat.title}</h3>
                <p className="text-neutral-400 leading-relaxed">{feat.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
