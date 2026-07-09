'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { SiOpencv, SiPython, SiRos, SiArduino } from 'react-icons/si';

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
    'Linux Fundamentals',
    'Python & OpenCV',
    'ROS 2 Framework',
    'Embedded Systems',
    'Control Systems (PD)',
    'ArUco Marker Processing',
    'Git Project Workflow',
    'Real-Time Serial Protocol',
  ];

  return (
    <section id="about" style={{ position: 'relative' }}>
      <div className="section-header">
        <h2 className="section-title">
          Project <span>Overview</span>
        </h2>
        <p className="section-desc">
          Dr.Street is a hands-on ROS 2 project designed to teach the fundamentals of computer vision, autonomous navigation, and embedded hardware interfaces.
        </p>
      </div>

      <div
        className="about-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '50px',
          alignItems: 'start',
          marginTop: '40px',
        }}
      >
        {/* Left Side: Overview & Learnings */}
        <div className="about-text">
          <h3
            style={{
              fontSize: '1.75rem',
              marginBottom: '20px',
              fontFamily: "'Outfit', sans-serif",
            }}
          >
            What is <span>Dr.Street?</span>
          </h3>
          <p
            style={{
              color: 'var(--text-secondary)',
              lineHeight: 1.6,
              marginBottom: '20px',
              fontSize: '0.98rem',
            }}
          >
            Dr. Street is an advanced autonomous mobile robot (AMR) platform meticulously engineered to bridge the gap between academic robotics theory and industrial deployment.
          </p>
          <p
            style={{
              color: 'var(--text-secondary)',
              lineHeight: 1.6,
              marginBottom: '30px',
              fontSize: '0.98rem',
            }}
          >
            Designed as a high-fidelity environment for mastering ROS 2 orchestration and real-time edge AI, Dr. Street provides researchers, engineers, and developers with the robust foundation required to pioneer the next generation of autonomous systems.
          </p>

          <h4 style={{ fontSize: '1.1rem', marginBottom: '15px', color: '#fff', fontWeight: 600 }}>Technologies Used</h4>
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
                  fontSize: '2.2rem',
                  fontWeight: 800,
                  color: 'var(--accent-neon)',
                  fontFamily: "'Outfit', sans-serif",
                }}
              >
                <Counter target={5} />
              </div>
              <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>ROS 2 Packages</span>
            </div>
            <div>
              <div
                style={{
                  fontSize: '2.2rem',
                  fontWeight: 800,
                  color: 'var(--accent-neon)',
                  fontFamily: "'Outfit', sans-serif",
                }}
              >
                <Counter target={2} />
              </div>
              <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>Control Architectures</span>
            </div>
            <div>
              <div
                style={{
                  fontSize: '2.2rem',
                  fontWeight: 800,
                  color: 'var(--accent-neon)',
                  fontFamily: "'Outfit', sans-serif",
                }}
              >
                <Counter target={100} suffix="%" />
              </div>
              <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>Open Source</span>
            </div>
          </div>
        </div>

        {/* Right Side: Key Features & Hardware Animation */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          {/* Key Features Sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '15px'
            }}>
              {/* Feature 1 */}
              <div className="glassmorphism subtle-border feature-card" style={{ padding: '16px', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '10px', transition: 'transform 0.3s ease, box-shadow 0.3s ease' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(92, 62, 232, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <SiOpencv size={18} color="#5C3EE8" />
                </div>
                <div>
                  <h5 style={{ color: '#fff', fontWeight: 600, fontSize: '0.88rem', marginBottom: '4px' }}>Lane Tracking</h5>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', lineHeight: '1.4', margin: 0 }}>
                    Real-time boundary detection using OpenCV color masks.
                  </p>
                </div>
              </div>
              
              {/* Feature 2 */}
              <div className="glassmorphism subtle-border feature-card" style={{ padding: '16px', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '10px', transition: 'transform 0.3s ease, box-shadow 0.3s ease' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(55, 118, 171, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <SiPython size={18} color="#3776AB" />
                </div>
                <div>
                  <h5 style={{ color: '#fff', fontWeight: 600, fontSize: '0.88rem', marginBottom: '4px' }}>PD Control</h5>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', lineHeight: '1.4', margin: 0 }}>
                    Closed-loop steering feedback loop for stable road centering.
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="glassmorphism subtle-border feature-card" style={{ padding: '16px', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '10px', transition: 'transform 0.3s ease, box-shadow 0.3s ease' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(255, 255, 255, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <SiRos size={18} color="#ffffff" />
                </div>
                <div>
                  <h5 style={{ color: '#fff', fontWeight: 600, fontSize: '0.88rem', marginBottom: '4px' }}>ArUco Nav</h5>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', lineHeight: '1.4', margin: 0 }}>
                    Fiducial marker detection enabling routing choices at junctions.
                  </p>
                </div>
              </div>

              {/* Feature 4 */}
              <div className="glassmorphism subtle-border feature-card" style={{ padding: '16px', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '10px', transition: 'transform 0.3s ease, box-shadow 0.3s ease' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(0, 151, 157, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <SiArduino size={18} color="#00979D" />
                </div>
                <div>
                  <h5 style={{ color: '#fff', fontWeight: 600, fontSize: '0.88rem', marginBottom: '4px' }}>ESP32 Link</h5>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', lineHeight: '1.4', margin: 0 }}>
                    Motor speed actuation co-processing over UART protocol.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Mini Visual Core */}
          <div
            className="about-visual"
            style={{
              position: 'relative',
              height: '180px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'radial-gradient(circle, rgba(57, 255, 20, 0.02) 0%, transparent 65%)',
              border: '1px solid rgba(255,255,255,0.01)',
              borderRadius: '24px',
              overflow: 'hidden',
            }}
          >
            <div
              className="about-ring"
              style={{
                position: 'absolute',
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                border: '1px dashed rgba(57, 255, 20, 0.15)',
                transform: `rotate(0deg) translate(${mouseOffset.x * 0.4}px, ${mouseOffset.y * 0.4}px)`,
                animation: 'spin 20s linear infinite',
              }}
            />
            <div
              style={{
                position: 'relative',
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                background: 'rgba(5, 5, 5, 0.9)',
                border: '2px solid var(--accent-neon)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.4rem',
                boxShadow: '0 0 20px rgba(57, 255, 20, 0.2)',
                zIndex: 5,
                animation: 'float 3s ease-in-out infinite',
              }}
            >
              🤖
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
        .feature-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
          border-color: rgba(57, 255, 20, 0.4);
        }
      `}</style>
    </section>
  );
}
