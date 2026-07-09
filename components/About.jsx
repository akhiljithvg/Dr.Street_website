'use client';

import { useEffect, useState, useRef } from 'react';
import { Camera, Cpu, Settings, Compass } from 'lucide-react';

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
            The Dr.Street project is an autonomous mobile robot platform that implements a full closed-loop control system. Using a standard USB camera feed, it extracts red lane markings with OpenCV color-mask filters, scans for ArUco markers to make turn selections at junctions, and transmits parsed speed commands over serial UART to an ESP32 microcontroller driving a dual H-bridge motor controller.
          </p>
          <p
            style={{
              color: 'var(--text-secondary)',
              lineHeight: 1.6,
              marginBottom: '30px',
              fontSize: '0.98rem',
            }}
          >
            By working through this codebase, developers learn two key robotics approaches: a direct **Standalone Python script** for rapid prototyping, and a modular **ROS 2 architecture** for professional production-grade design.
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

        {/* Right Side: Prerequisites & Hardware Animation */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          {/* Key Features Box */}
          <div
            className="glassmorphism subtle-border"
            style={{
              padding: '35px',
              borderRadius: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '28px',
            }}
          >
            <h3 style={{ fontSize: '1.4rem', color: '#fff', fontWeight: 600, borderBottom: '1px solid rgba(255, 255, 255, 0.06)', paddingBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              🚀 Key Features & Tech Stack
            </h3>

            {/* Feature 1 */}
            <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              <div style={{ background: 'rgba(0, 128, 0, 0.1)', padding: '10px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Camera size={22} color="var(--accent-neon)" />
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', flexWrap: 'wrap' }}>
                  <h5 style={{ color: '#fff', fontWeight: 600, fontSize: '0.98rem', margin: 0 }}>Autonomous Lane Tracking</h5>
                  <span style={{ fontSize: '0.7rem', background: 'rgba(255,255,255,0.06)', color: 'var(--text-secondary)', padding: '2px 8px', borderRadius: '4px', fontWeight: 500 }}>OpenCV</span>
                  <span style={{ fontSize: '0.7rem', background: 'rgba(255,255,255,0.06)', color: 'var(--text-secondary)', padding: '2px 8px', borderRadius: '4px', fontWeight: 500 }}>Python</span>
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: '1.5' }}>
                  Real-time lane boundary detection and centerline extraction utilizing custom OpenCV color-mask filters.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              <div style={{ background: 'rgba(0, 128, 0, 0.1)', padding: '10px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Settings size={22} color="var(--accent-neon)" />
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', flexWrap: 'wrap' }}>
                  <h5 style={{ color: '#fff', fontWeight: 600, fontSize: '0.98rem', margin: 0 }}>PD Control Algorithm</h5>
                  <span style={{ fontSize: '0.7rem', background: 'rgba(255,255,255,0.06)', color: 'var(--text-secondary)', padding: '2px 8px', borderRadius: '4px', fontWeight: 500 }}>Control Loop</span>
                  <span style={{ fontSize: '0.7rem', background: 'rgba(255,255,255,0.06)', color: 'var(--text-secondary)', padding: '2px 8px', borderRadius: '4px', fontWeight: 500 }}>NumPy</span>
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: '1.5' }}>
                  Proportional-Derivative feedback steering loop adjustments for smooth, stable, and accurate road centering.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              <div style={{ background: 'rgba(0, 128, 0, 0.1)', padding: '10px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Compass size={22} color="var(--accent-neon)" />
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', flexWrap: 'wrap' }}>
                  <h5 style={{ color: '#fff', fontWeight: 600, fontSize: '0.98rem', margin: 0 }}>ArUco Marker Navigation</h5>
                  <span style={{ fontSize: '0.7rem', background: 'rgba(255,255,255,0.06)', color: 'var(--text-secondary)', padding: '2px 8px', borderRadius: '4px', fontWeight: 500 }}>Aruco</span>
                  <span style={{ fontSize: '0.7rem', background: 'rgba(255,255,255,0.06)', color: 'var(--text-secondary)', padding: '2px 8px', borderRadius: '4px', fontWeight: 500 }}>ROS 2</span>
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: '1.5' }}>
                  Computer vision landmark marker parsing enabling intelligent routing and turning choices at junctions.
                </p>
              </div>
            </div>

            {/* Feature 4 */}
            <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              <div style={{ background: 'rgba(0, 128, 0, 0.1)', padding: '10px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Cpu size={22} color="var(--accent-neon)" />
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', flexWrap: 'wrap' }}>
                  <h5 style={{ color: '#fff', fontWeight: 600, fontSize: '0.98rem', margin: 0 }}>Serial Hardware Interface</h5>
                  <span style={{ fontSize: '0.7rem', background: 'rgba(255,255,255,0.06)', color: 'var(--text-secondary)', padding: '2px 8px', borderRadius: '4px', fontWeight: 500 }}>ESP32</span>
                  <span style={{ fontSize: '0.7rem', background: 'rgba(255,255,255,0.06)', color: 'var(--text-secondary)', padding: '2px 8px', borderRadius: '4px', fontWeight: 500 }}>C++ / UART</span>
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: '1.5' }}>
                  Microcontroller motor actuation over UART communication co-processing speed commands.
                </p>
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
      `}</style>
    </section>
  );
}
