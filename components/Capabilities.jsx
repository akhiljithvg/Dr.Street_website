'use client';

import { useEffect, useState, useRef } from 'react';

export default function Capabilities() {
  const [animate, setAnimate] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setAnimate(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const capabilities = [
    { name: 'Autonomous Navigation', val: '92%', targetWidth: '92%' },
    { name: 'Object Detection', val: '88%', targetWidth: '88%' },
    { name: 'Lane Following', val: '95%', targetWidth: '95%' },
    { name: 'SLAM Mapping', val: '85%', targetWidth: '85%' },
    { name: 'Localization', val: '90%', targetWidth: '90%' },
    { name: 'Obstacle Avoidance', val: '96%', targetWidth: '96%' },
    { name: 'AI Processing', val: '82%', targetWidth: '82%' },
    { name: 'Remote Control', val: '99%', targetWidth: '99%' },
  ];

  return (
    <section id="capabilities" ref={sectionRef} style={{ background: '#090909' }}>
      <div className="section-header">
        {/* <span className="section-label">// Performance</span> */}
        <h2 className="section-title">
          Robot <span>Capabilities</span>
        </h2>
        <p className="section-desc">
          Measured performance metrics across all major operational domains.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: '30px',
          maxWidth: '1000px',
          margin: '0 auto',
        }}
      >
        {capabilities.map((cap, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '0.95rem',
                fontWeight: 600,
                color: '#fff',
              }}
            >
              <span>{cap.name}</span>
              <span style={{ color: 'var(--accent-neon)' }}>{cap.val}</span>
            </div>

            {/* Progress track */}
            <div
              style={{
                width: '100%',
                height: '6px',
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '10px',
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              {/* Progress bar fill */}
              <div
                style={{
                  height: '100%',
                  background: 'linear-gradient(90deg, var(--accent-emerald), var(--accent-neon))',
                  borderRadius: '10px',
                  width: animate ? cap.targetWidth : '0%',
                  transition: 'width 1.5s cubic-bezier(0.25, 0.8, 0.25, 1)',
                  boxShadow: '0 0 10px rgba(57, 255, 20, 0.2)',
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
