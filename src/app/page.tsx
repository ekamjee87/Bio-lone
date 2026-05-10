import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AlternatingSections from "@/components/AlternatingSections";
import Features from "@/components/Features";
import TrustMarquee from "@/components/TrustMarquee";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-transparent">
      <Navbar />
      <Hero />
      <TrustMarquee />
      <Features />
      <AlternatingSections />
      <Footer />
    </main>
  );
}
