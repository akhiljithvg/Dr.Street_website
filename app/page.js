'use client';
import dynamic from 'next/dynamic';
import Logo from "@/components/Logo";
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const ThreeDemo = dynamic(() => import('@/components/3'), {
  ssr: false,
});

export default function Home() {
  return (
    <main style={{ position: "relative", width: "100%", height: "100vh", overflow: "hidden", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
        <ThreeDemo />
      </div>
      
      <div 
        style={{ 
          position: "relative", 
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          background: 'rgba(0, 0, 0, 0.4)',
          padding: '60px 80px',
          borderRadius: '24px',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.05)',
          boxShadow: '0 30px 60px rgba(0,0,0,0.5)'
        }}
      >
        <div style={{ marginBottom: '30px' }}>
          <Logo scale={1.8} />
        </div>
        
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '20px', letterSpacing: '0.02em' }}>
          Welcome to Dr.Street
        </h1>
        
        <p style={{ color: 'var(--text-secondary)', maxWidth: '500px', lineHeight: 1.6, marginBottom: '40px', fontSize: '1.1rem' }}>
          The complete operation manual and documentation for assembling, programming, and operating your autonomous robot.
        </p>

        <Link href="/docs/intro" style={{ textDecoration: 'none' }}>
          <button className="btn-primary" style={{ padding: '16px 32px', fontSize: '1.1rem' }}>
            Let's Get Started <ArrowRight size={20} />
          </button>
        </Link>
      </div>
    </main>
  );
}
