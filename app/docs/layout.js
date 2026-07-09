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
          marginLeft: '260px', /* Width of sidebar */
          position: "relative", 
          zIndex: 10,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Navbar />
        <div style={{ flex: 1, padding: '20px 60px', width: '100%' }}>
          {children}
        </div>
        <Footer />
      </div>

      <style jsx global>{`
        @media (max-width: 1024px) {
          .main-doc-content {
            margin-left: 0 !important;
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
