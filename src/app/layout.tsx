import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CinematicBackground from "@/components/CinematicBackground";
import { AuthProvider } from "@/contexts/AuthContext";
import AuthGuard from "@/components/auth/AuthGuard";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BIO CLONE | Next-Gen Biotechnology OS",
  description: "Advanced AI-powered biotechnology, immersive anatomy visualization, and next-generation medical education ecosystem.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[#020205] text-white selection:bg-biotech-purple selection:text-white">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
