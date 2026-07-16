'use client';
import dynamic from 'next/dynamic';
import Logo from "@/components/Logo";
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { IoMdArrowDroprightCircle } from "react-icons/io";

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
          padding: '40px 48px',
          maxWidth: '560px',
          width: '90%'
        }}
      >
        {/* Feathered / Masked Blur Background */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: -1,
            background: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(12px)',
            /*WebkitMaskImage: 'linear-gradient(to right, transparent, black 100%, black 100%, transparent), linear-gradient(to bottom, transparent, black 100%, black 100%, transparent)',
            WebkitMaskComposite: 'source-in',
            maskImage: 'linear-gradient(to right, transparent, black 100%, black 100%, transparent), linear-gradient(to bottom, transparent, black 100%, black 100%, transparent)',*/
            maskComposite: 'intersect',
            pointerEvents: 'none',
            borderRadius: '10px'
          }}
        />
        <div style={{ marginBottom: '10px' }}>
          <Logo scale={1.90} />
        </div>

        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: 800,
          marginBottom: '16px',
          letterSpacing: '0.02em',
          color: '#ffffff'
        }}>
          {/* Welcome to Dr.Street */}
        </h1>

        <p style={{
          color: 'var(--text-secondary)',
          maxWidth: '460px',
          lineHeight: 1.6,
          marginBottom: '32px',
          fontSize: '1.05rem'
        }}>
          The complete operation manual and documentation for assembling, programming, and operating your autonomous robot.
        </p>

        <Link
          href="/docs/intro"
          style={{ textDecoration: "none", color: "yellow" }}
        >
          <button
            style={{
              padding: "14px 28px",
              fontSize: "1.05rem",
              backgroundColor: "rgba(24, 116, 24, 1)",
              color: "white",
              borderRadius: "10px",
              border: "none",
              cursor: "pointer",
              transition: "all 0.3s ease",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
            }}
          >
            <span>Let's Get Started</span>
            <IoMdArrowDroprightCircle size={25} />
          </button>
        </Link>
      </div>
    </main>
  );
}
