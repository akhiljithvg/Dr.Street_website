'use client';
import Hero from "@/components/Hero";
import About from "@/components/About";
import DocFooter from "@/components/DocFooter";

export default function IntroPage() {
  return (
    <div className="doc-page-container">
      <Hero />
      <div style={{ marginTop: '40px' }}>
        <About />
      </div>
      
      <DocFooter 
        prev={null} 
        next={{ title: "Kit Components Checklist", href: "/docs/checklist" }} 
      />
    </div>
  );
}
