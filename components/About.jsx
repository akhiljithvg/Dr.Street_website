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
    <section id="about" style={{ background: '#050505', position: 'relative' }}>
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

          <h4 style={{ fontSize: '1.1rem', marginBottom: '15px', color: '#fff', fontWeight: 600 }}>What You'll Learn</h4>
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
          {/* Prerequisites Box */}
          <div
            className="glassmorphism subtle-border"
            style={{
              padding: '35px',
              borderRadius: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
            }}
          >
            <h3 style={{ fontSize: '1.4rem', color: '#fff', fontWeight: 600, borderBottom: '1px solid rgba(255, 255, 255, 0.06)', paddingBottom: '12px' }}>
              🔧 Prerequisites & Requirements
            </h3>

            {/* Hardware reqs */}
            <div>
              <h5 style={{ color: 'var(--accent-emerald)', fontWeight: 600, fontSize: '0.88rem', textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '0.05em' }}>
                Hardware Requirements
              </h5>
              <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', fontSize: '0.88rem', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <li><strong>Processor</strong>: Raspberry Pi 4 (4GB/8GB LPDDR4 recommended)</li>
                <li><strong>Visual Input</strong>: USB webcam (standard Linux V4L2 compatible)</li>
                <li><strong>Controller</strong>: ESP32 development board (UART co-processor)</li>
                <li><strong>Mechanical</strong>: Dual motor driver chip (L298N/L293D) & DC geared motors</li>
                <li><strong>Power</strong>: Dual isolated rails (Pi power bank + motor battery pack)</li>
              </ul>
            </div>

            {/* Software reqs */}
            <div>
              <h5 style={{ color: 'var(--accent-emerald)', fontWeight: 600, fontSize: '0.88rem', textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '0.05em' }}>
                Software Requirements
              </h5>
              <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', fontSize: '0.88rem', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <li><strong>Operating System</strong>: Ubuntu Server 24.04 LTS (Noble Numbat)</li>
                <li><strong>SDK Framework</strong>: ROS 2 Jazzy Jalisco (desktop or base installation)</li>
                <li><strong>Languages</strong>: Python 3.10+ and C++17 (Arduino CLI support)</li>
                <li><strong>Libraries</strong>: OpenCV Python (`cv2`), `numpy`, and `pyserial`</li>
              </ul>
            </div>

            {/* Network reqs */}
            <div>
              <h5 style={{ color: 'var(--accent-emerald)', fontWeight: 600, fontSize: '0.88rem', textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '0.05em' }}>
                Network Requirements
              </h5>
              <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', fontSize: '0.88rem', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <li>Internet access for system provisioning and ROS package installs</li>
                <li>SSH credentials configured on the Pi for remote terminal scripting</li>
              </ul>
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
              🦆
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
