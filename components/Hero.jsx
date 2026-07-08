'use client';

import { useEffect, useState, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import Logo from './Logo';

export default function Hero() {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const robotRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const xFrac = e.clientX / window.innerWidth - 0.5;
      const yFrac = e.clientY / window.innerHeight - 0.5;
      setCoords({ x: xFrac, y: yFrac });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    if (robotRef.current) {
      // Apply mouse parallax transform dynamically
      robotRef.current.style.transform = `translateY(-50%) translate(${coords.x * -25}px, ${coords.y * -20}px)`;
    }
  }, [coords]);

  const handleExploreClick = (e) => {
    e.preventDefault();
    const target = document.querySelector('#about');
    if (target) {
      const offset = 80;
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY - offset,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        padding: '0 8%',
        background: 'radial-gradient(circle at 10% 20%, rgba(57, 255, 20, 0.03) 0%, transparent 60%)',
        zIndex: 5,
        overflow: 'hidden',
      }}
    >
      {/* High-tech overlay grid */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: 'linear-gradient(rgba(57, 255, 20, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(57, 255, 20, 0.02) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* Futuristic Glow backdrops */}
      <div
        style={{
          position: 'absolute',
          top: '30%',
          left: '10%',
          width: '450px',
          height: '450px',
          background: 'radial-gradient(circle, rgba(57, 255, 20, 0.04) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 1,
          filter: 'blur(40px)',
        }}
      />

      <div
        style={{
          position: 'relative',
          maxWidth: '800px',
          zIndex: 10,
          paddingTop: '80px',
        }}
      >
        {/* Badge */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid var(--border-subtle)',
            color: 'var(--text-primary)',
            padding: '6px 16px',
            borderRadius: '4px',
            fontSize: '0.75rem',
            fontWeight: 600,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            marginBottom: '30px',
            backdropFilter: 'blur(10px)',
          }}
        >
          Autonomous Robotics Platform
        </div>

        {/* Main Logo */}
        <div style={{ marginBottom: '40px' }}>
          <Logo scale={2} />
        </div>

        {/* Subtitle */}
        <p
          style={{
            fontSize: '1.25rem',
            lineHeight: 1.6,
            color: 'var(--text-secondary)',
            marginBottom: '40px',
            maxWidth: '620px',
            fontWeight: 400,
          }}
        >
          An intelligent autonomous robotics platform designed for navigation, computer vision,
          AI perception, autonomous decision-making, and real-time robotic interaction.
        </p>

        {/* Buttons */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '18px',
            flexWrap: 'wrap',
          }}
        >
          <a href="#about" onClick={handleExploreClick} className="btn-primary">
            Explore Project <ArrowRight size={18} />
          </a>
          <a
            href="https://github.com/akhiljithvg/Dr.Street"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            <FaGithub size={18} /> View GitHub
          </a>
        </div>
      </div>

      {/* Abstract Tech Graphic (Replacing Robot) */}
      <div
        ref={robotRef}
        className="hero-graphic-wrapper"
        style={{
          position: 'absolute',
          right: '5%',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '450px',
          height: '450px',
          zIndex: 8,
          pointerEvents: 'none',
          transition: 'transform 0.15s cubic-bezier(0.25, 0.8, 0.25, 1)',
          opacity: 0.7,
        }}
      >
        <svg
          style={{ width: '100%', height: '100%' }}
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="100" cy="100" r="90" stroke="rgba(255,255,255,0.05)" strokeWidth="1" strokeDasharray="4 4" />
          <circle cx="100" cy="100" r="65" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
          <circle cx="100" cy="100" r="40" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="2 6" />
          <path d="M10 100 L190 100" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
          <path d="M100 10 L100 190" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
          <path d="M36 36 L164 164" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
          <path d="M36 164 L164 36" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
          
          <rect x="95" y="95" width="10" height="10" fill="var(--text-primary)" />
          <circle cx="165" cy="100" r="3" fill="var(--accent-emerald)" />
          <circle cx="100" cy="35" r="3" fill="var(--accent-emerald)" />
        </svg>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: 'absolute',
          bottom: '40px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          zIndex: 10,
          color: 'var(--text-secondary)',
          fontSize: '0.75rem',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          fontWeight: 500,
        }}
      >
        <span>Scroll</span>
        <div
          style={{
            width: '2px',
            height: '45px',
            background: 'linear-gradient(to bottom, var(--accent-neon), transparent)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '30%',
              background: 'var(--text-secondary)',
              animation: 'scrollDown 2.2s cubic-bezier(0.25, 0.8, 0.25, 1) infinite',
            }}
          />
        </div>
      </div>

      {/* Scrolldown keyframes and responsiveness */}
      <style jsx>{`
        @keyframes scrollDown {
          0% { transform: translateY(-100%); }
          80% { transform: translateY(350%); }
          100% { transform: translateY(350%); }
        }
        @media (max-width: 1024px) {
          .hero-robot-wrapper {
            display: none !important;
          }
          h1 {
            font-size: 3.8rem !important;
          }
        }
      `}</style>
    </section>
  );
}
