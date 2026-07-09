'use client';
import Software from "@/components/Software";
import Capabilities from "@/components/Capabilities";
import Architecture from "@/components/Architecture";
import DocFooter from "@/components/DocFooter";

export default function SoftwarePage() {
  return (
    <div className="doc-page-container">
      <Software />
      
      <div style={{ marginTop: '60px' }}>
        <Capabilities />
      </div>

      <div style={{ marginTop: '60px' }}>
        <Architecture />
      </div>
      
      <DocFooter 
        prev={{ title: "Hardware Assembly", href: "/docs/hardware" }} 
        next={{ title: "Troubleshooting & Gallery", href: "/docs/troubleshooting" }} 
      />
    </div>
  );
}
