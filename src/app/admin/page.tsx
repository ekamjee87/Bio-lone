"use client";

import { motion } from "framer-motion";
import { Users, Activity, Database, Cpu } from "lucide-react";
import Link from "next/link";

const stats = [
  { label: "Active Neural Connections", value: "14,209", icon: Users, change: "+12.5%", positive: true },
  { label: "AI Tokens Processed", value: "2.4M", icon: Cpu, change: "+45.2%", positive: true },
  { label: "3D Models Loaded", value: "842", icon: Database, change: "+3.1%", positive: true },
  { label: "System Health", value: "99.9%", icon: Activity, change: "Stable", positive: true },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-biotech-purple/20 to-electric-blue/10 border border-white/5 p-8"
      >
        <div className="absolute right-0 top-0 w-64 h-64 bg-electric-blue/10 blur-[100px] rounded-full"></div>
        <h1 className="text-3xl font-bold text-white mb-2">Welcome to the Nexus</h1>
        <p className="text-neutral-400 max-w-xl">
          You have successfully authenticated into the BIO CLONE administrative network. All systems are operating within optimal parameters.
        </p>
        
        <Link href="/admin/builder">
          <button className="mt-6 px-6 py-3 bg-electric-blue text-black font-semibold rounded-lg hover:bg-white transition-colors flex items-center gap-2">
            Launch Live UI Builder
          </button>
        </Link>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-6 rounded-xl bg-white/5 border border-white/5 flex flex-col gap-4 hover:border-white/10 transition-colors"
          >
            <div className="flex justify-between items-start">
              <div className="w-10 h-10 rounded-lg bg-black/50 border border-white/5 flex items-center justify-center">
                <stat.icon size={20} className="text-electric-blue" />
              </div>
              <span className={`text-xs font-semibold px-2 py-1 rounded-full ${stat.positive ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                {stat.change}
              </span>
            </div>
            <div>
              <p className="text-sm text-neutral-500 mb-1">{stat.label}</p>
              <h3 className="text-2xl font-bold text-white">{stat.value}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Placeholder for charts/logs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 p-6 rounded-xl bg-white/5 border border-white/5 h-96 flex items-center justify-center">
          <p className="text-neutral-500 font-mono text-sm">[ Real-time Traffic Visualization Module Loading... ]</p>
        </div>
        <div className="p-6 rounded-xl bg-white/5 border border-white/5 h-96 flex items-center justify-center">
          <p className="text-neutral-500 font-mono text-sm">[ Security Logs Loading... ]</p>
        </div>
      </div>
    </div>
  );
}
