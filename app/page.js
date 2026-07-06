import CustomCursor from "@/components/CustomCursor";
import ThreeBackground from "@/components/ThreeBackground";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Features from "@/components/Features";
import Architecture from "@/components/Architecture";
import Hardware from "@/components/Hardware";
import Software from "@/components/Software";
import Capabilities from "@/components/Capabilities";
import Gallery from "@/components/Gallery";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main style={{ position: "relative", width: "100%", overflowX: "hidden" }}>
      <CustomCursor />
      <ThreeBackground />
      <Navbar />
      
      <div style={{ position: "relative", zIndex: 10 }}>
        <Hero />
        <About />
        <Features />
        <Architecture />
        <Hardware />
        <Software />
        <Capabilities />
        <Gallery />
        
        <Footer />
      </div>
    </main>
  );
}
