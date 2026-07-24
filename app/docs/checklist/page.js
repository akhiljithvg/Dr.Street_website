'use client';
import Checklist from "@/components/Checklist";
import DocFooter from "@/components/DocFooter";

export default function ChecklistPage() {
  return (
    <div className="doc-page-container">
      <Checklist />
      
      <DocFooter 
        prev={{ title: "Introduction", href: "/docs/intro" }} 
        next={{ title: "Assembly & Wiring", href: "/docs/hardware" }} 
      />
    </div>
  );
}
