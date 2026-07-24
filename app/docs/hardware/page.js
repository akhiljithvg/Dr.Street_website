'use client';
import Hardware from "@/components/Hardware";
import DocFooter from "@/components/DocFooter";

export default function HardwarePage() {
  return (
    <div className="doc-page-container">
      <Hardware />
      
      <DocFooter 
        prev={{ title: "Kit Components Checklist", href: "/docs/checklist" }} 
        next={{ title: "Software & ROS 2", href: "/docs/software" }} 
      />
    </div>
  );
}
