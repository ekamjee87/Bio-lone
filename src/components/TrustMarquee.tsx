"use client";

import { motion } from "framer-motion";

const partners = [
  "STANFORD MED", "MIT AI LAB", "HARVARD BIOSCIENCE", 
  "NEURALINK", "CRISPR THERAPEUTICS", "JOHNS HOPKINS",
  "NVIDIA INCEPTION", "GOOGLE HEALTH"
];

export default function TrustMarquee() {
  return (
    <section className="w-full py-24 border-y border-white/5 bg-black/50 overflow-hidden flex flex-col items-center justify-center relative">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-32 bg-biotech-purple/10 blur-[100px] pointer-events-none"></div>
      
      <p className="text-neutral-500 tracking-[0.2em] text-sm font-semibold mb-12 uppercase">
        Trusted by Global Leaders in Science & Technology
      </p>
      
      <div className="relative w-full overflow-hidden flex whitespace-nowrap mask-edges">
        {/* We use two sets of elements for a seamless marquee loop */}
        <div className="flex gap-16 md:gap-32 px-8 animate-marquee w-max">
          {partners.map((partner, idx) => (
            <div key={`p1-${idx}`} className="text-2xl md:text-4xl font-bold text-neutral-800 hover:text-white transition-colors duration-500 cursor-default">
              {partner}
            </div>
          ))}
        </div>
        <div className="flex gap-16 md:gap-32 px-8 animate-marquee w-max" aria-hidden="true">
          {partners.map((partner, idx) => (
            <div key={`p2-${idx}`} className="text-2xl md:text-4xl font-bold text-neutral-800 hover:text-white transition-colors duration-500 cursor-default">
              {partner}
            </div>
          ))}
        </div>
      </div>
      
      <style jsx>{`
        .mask-edges {
          mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
        }
      `}</style>
    </section>
  );
}
