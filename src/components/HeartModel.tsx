"use client";

import { Suspense } from "react";
import Spline from "@splinetool/react-spline";

function SplineLoader() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="relative w-32 h-32">
        <div className="absolute inset-0 rounded-full border-2 border-electric-blue/20 animate-ping"></div>
        <div className="absolute inset-4 rounded-full border-b-2 border-electric-blue animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center text-[10px] font-mono text-electric-blue animate-pulse">
          INITIALIZING_3D
        </div>
      </div>
    </div>
  );
}

export default function HeartModel() {
  return (
    <div className="w-full h-full relative group">
      <Suspense fallback={<SplineLoader />}>
        <div className="w-full h-full scale-[0.8] md:scale-[0.9] transition-transform duration-1000 group-hover:scale-[0.95]">
          <Spline 
            scene="https://prod.spline.design/zHni4eRbUrBuFTUx/scene.splinecode" 
          />
        </div>
      </Suspense>
      
      {/* Decorative Gradient Overlay to blend Spline edges */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_40%,rgba(10,10,10,0.4)_100%)]"></div>
    </div>
  );
}
