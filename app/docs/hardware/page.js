'use client';
import Hardware from "@/components/Hardware";
import DocFooter from "@/components/DocFooter";

export default function HardwarePage() {
  return (
    <div className="doc-page-container">
      <Hardware />
      
      <DocFooter 
        prev={{ title: "Introduction", href: "/docs/intro" }} 
        next={{ title: "Software & ROS 2", href: "/docs/software" }} 
      />
    </div>
  );
}
