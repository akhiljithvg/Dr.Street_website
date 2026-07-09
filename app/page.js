'use client';
import ThreeBackground from "@/components/ThreeBackground";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
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
    <main style={{ position: "relative", width: "100%", overflowX: "hidden", display: 'flex' }}>
      <ThreeBackground />
      
      <Sidebar />
      
      <div 
        className="main-doc-content"
        style={{ 
          flex: 1, 
          marginLeft: '260px', /* Width of sidebar */
          position: "relative", 
          zIndex: 10,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Navbar />
        <div style={{ flex: 1, padding: '20px 0' }}>
          <Hero />
          <About />
          <Features />
          <Architecture />
          <Hardware />
          <Software />
          <Capabilities />
          <Gallery />
        </div>
        <Footer />
      </div>

      <style jsx global>{`
        @media (max-width: 1024px) {
          .main-doc-content {
            marginLeft: 0 !important;
          }
          .docs-sidebar {
            transform: translateX(-100%);
            transition: transform 0.3s ease;
          }
          .docs-sidebar.open {
            transform: translateX(0);
          }
        }
      `}</style>
    </main>
  );
}
