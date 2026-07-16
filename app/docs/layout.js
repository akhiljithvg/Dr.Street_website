'use client';
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function DocsLayout({ children }) {
  return (
    <main style={{ position: "relative", width: "100%", overflowX: "hidden", display: 'flex', background: 'var(--background)' }}>
      <Sidebar />
      
      <div 
        className="main-doc-content"
        style={{ 
          flex: 1, 
          position: "relative", 
          zIndex: 10,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          minWidth: 0
        }}
      >
        <Navbar />
        <div style={{ flex: 1, padding: '20px clamp(15px, 5vw, 60px)', width: '100%', minWidth: 0 }}>
          {children}
        </div>
        <Footer />
      </div>

    </main>
  );
}
