'use client';
import Gallery from "@/components/Gallery";
import DocFooter from "@/components/DocFooter";

export default function TroubleshootingPage() {
  return (
    <div className="doc-page-container">
      <Gallery />
      
      <DocFooter 
        prev={{ title: "Software & ROS 2", href: "/docs/software" }} 
        next={null} 
      />
    </div>
  );
}
