'use client';

import { useEffect, useState, useRef } from 'react';

function Counter({ target, suffix = '', duration = 1800 }) {
  const [count, setCount] = useState(0);
  const elementRef = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let startTimestamp = null;
          
          const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            
            if (progress < 1) {
              window.requestAnimationFrame(step);
            } else {
              setCount(target);
            }
          };
          window.requestAnimationFrame(step);
        }
      },
      { threshold: 0.2 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [target, duration]);

  return <span ref={elementRef}>{count}{suffix}</span>;
}

export default function About() {
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 15;
      const y = (e.clientY / window.innerHeight - 0.5) * 15;
      setMouseOffset({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const chips = [
    'Autonomous Navigation',
    'Computer Vision',
    'SLAM Mapping',
    'Sensor Fusion',
    'AI Perception',
    'Localization',
    'Real-Time Control',
    'Modular Design',
  ];

  return (
    <section id="about" style={{ background: '#050505', position: 'relative' }}>
      <div className="section-header">
        <span className="section-label">// About the Project</span>
        <h2 className="section-title">
          Redefining What <span>Robots</span> Can Do
        </h2>
        <p className="section-desc">
          Dr. Street is a next-generation autonomous robotics platform built to push the boundaries of intelligent navigation, perception, and real-time decision-making.
        </p>
      </div>

      <div
        className="about-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '60px',
          alignItems: 'center',
          marginTop: '40px',
        }}
      >
        {/* Visual Animation Box */}
        <div
          className="about-visual"
          style={{
            position: 'relative',
            height: '400px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'radial-gradient(circle, rgba(57, 255, 20, 0.03) 0%, transparent 65%)',
            border: '1px solid rgba(255,255,255,0.02)',
            borderRadius: '24px',
            overflow: 'hidden',
          }}
        >
          {/* Parallax Rings */}
          <div
            className="about-ring"
            style={{
              position: 'absolute',
              width: '280px',
              height: '280px',
              borderRadius: '50%',
              border: '1px dashed rgba(57, 255, 20, 0.25)',
              transform: `rotate(0deg) translate(${mouseOffset.x * 0.4}px, ${mouseOffset.y * 0.4}px)`,
              animation: 'spin 20s linear infinite',
            }}
          />
          <div
            className="about-ring"
            style={{
              position: 'absolute',
              width: '220px',
              height: '220px',
              borderRadius: '50%',
              border: '2px solid rgba(0, 200, 83, 0.1)',
              borderTopColor: 'var(--accent-neon)',
              transform: `rotate(120deg) translate(${mouseOffset.x * 0.7}px, ${mouseOffset.y * 0.7}px)`,
              animation: 'spin 12s linear infinite reverse',
            }}
          />
          <div
            className="about-ring"
            style={{
              position: 'absolute',
              width: '160px',
              height: '160px',
              borderRadius: '50%',
              border: '1px dotted rgba(57, 255, 20, 0.3)',
              transform: `rotate(240deg) translate(${mouseOffset.x * 1.1}px, ${mouseOffset.y * 1.1}px)`,
              animation: 'spin 8s linear infinite',
            }}
          />
          
          {/* Animated Core */}
          <div
            style={{
              position: 'relative',
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'rgba(5, 5, 5, 0.9)',
              border: '2px solid var(--accent-neon)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2.2rem',
              boxShadow: '0 0 30px rgba(57, 255, 20, 0.3)',
              zIndex: 5,
              animation: 'float 3s ease-in-out infinite',
            }}
          >
            🤖
          </div>
        </div>

        {/* Text and stats */}
        <div className="about-text">
          <h3
            style={{
              fontSize: '2rem',
              marginBottom: '20px',
              fontFamily: "'Outfit', sans-serif",
            }}
          >
            Built for the <span>Future</span> of Autonomy
          </h3>
          <p
            style={{
              color: 'var(--text-secondary)',
              lineHeight: 1.6,
              marginBottom: '20px',
              fontSize: '1.05rem',
            }}
          >
            Dr. Street combines cutting-edge AI perception algorithms with robust mechanical engineering. By fusing depth data with camera streams, it maps environments in real-time, plans dynamic avoidance paths, and localizes with sub-centimeter reliability.
          </p>
          <p
            style={{
              color: 'var(--text-secondary)',
              lineHeight: 1.6,
              marginBottom: '30px',
              fontSize: '1.05rem',
            }}
          >
            Designed modularly from the ground up, the platform handles core pipeline processing entirely onboard, making it an excellent development platform for advanced autonomy.
          </p>

          {/* Chips */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '10px',
              marginBottom: '40px',
            }}
          >
            {chips.map((chip) => (
              <span
                key={chip}
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  color: '#fff',
                  padding: '6px 14px',
                  borderRadius: '20px',
                  fontSize: '0.82rem',
                  fontWeight: 500,
                  transition: 'all 0.3s',
                }}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = 'var(--accent-neon)';
                  e.target.style.color = 'var(--accent-neon)';
                  e.target.style.background = 'rgba(57, 255, 20, 0.03)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.06)';
                  e.target.style.color = '#fff';
                  e.target.style.background = 'rgba(255, 255, 255, 0.03)';
                }}
              >
                {chip}
              </span>
            ))}
          </div>

          {/* Counters Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '20px',
              borderTop: '1px solid rgba(255, 255, 255, 0.06)',
              paddingTop: '28px',
            }}
          >
            <div>
              <div
                style={{
                  fontSize: '2.5rem',
                  fontWeight: 800,
                  color: 'var(--accent-neon)',
                  fontFamily: "'Outfit', sans-serif",
                }}
              >
                <Counter target={12} />
              </div>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Core Features</span>
            </div>
            <div>
              <div
                style={{
                  fontSize: '2.5rem',
                  fontWeight: 800,
                  color: 'var(--accent-neon)',
                  fontFamily: "'Outfit', sans-serif",
                }}
              >
                <Counter target={8} />
              </div>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Onboard Sensors</span>
            </div>
            <div>
              <div
                style={{
                  fontSize: '2.5rem',
                  fontWeight: 800,
                  color: 'var(--accent-neon)',
                  fontFamily: "'Outfit', sans-serif",
                }}
              >
                <Counter target={100} suffix="%" />
              </div>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Open Source</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
      `}</style>
    </section>
  );
}
