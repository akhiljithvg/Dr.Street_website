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
    { name: 'OpenCV HSV Color Masking', val: '96% Detection Rate', targetWidth: '96%' },
    { name: 'PD Loop Path Optimization', val: '92% Precision', targetWidth: '92%' },
    { name: 'ArUco Marker Junction Detection', val: '95% Recognition', targetWidth: '95%' },
    { name: 'Serial UART Comm (115200 baud)', val: '99% Integrity', targetWidth: '99%' },
    { name: 'Camera Stream Processing (30 FPS)', val: '90% Output Stability', targetWidth: '90%' },
    { name: 'Safety Watchdog Stop Latency', val: '98% Responsiveness', targetWidth: '98%' },
  ];

  return (
    <section id="capabilities" ref={sectionRef} style={{ background: '#090909' }}>
      <div className="section-header">
        <h2 className="section-title">
          Core Control <span>Algorithms</span>
        </h2>
        <p className="section-desc">
          Mathematical models and computer vision pipelines executing onboard the robot.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '50px',
          maxWidth: '1050px',
          margin: '30px auto 0 auto',
          alignItems: 'start',
        }}
      >
        {/* Left Side: Algorithmic Explanations */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '25px', color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.5 }}>
          <div>
            <h4 style={{ color: '#fff', fontSize: '1.1rem', fontWeight: 600, marginBottom: '6px' }}>1. OpenCV HSV Lane Extraction</h4>
            <p>
              Instead of using RGB values which are highly sensitive to lighting changes, the perception script converts incoming frames to the **HSV (Hue, Saturation, Value)** color space. It filters red colors using two custom hue range masks, performs morphological closing to remove noise, finds contours, and computes the center coordinates `(cX, cY)` of the lane.
            </p>
          </div>
          <div>
            <h4 style={{ color: '#fff', fontSize: '1.1rem', fontWeight: 600, marginBottom: '6px' }}>2. PD Steering Feedback Loop</h4>
            <p>
              Steering control is governed by a **Proportional-Derivative (PD) controller** that maps coordinate error offsets into motor commands. The formula reduces oscillation and damps sudden turns:
            </p>
            <div style={{
              background: '#060606',
              padding: '10px 14px',
              borderRadius: '6px',
              fontFamily: "'Courier New', Courier, monospace",
              fontSize: '0.82rem',
              color: 'var(--accent-neon)',
              border: '1px solid rgba(255,255,255,0.05)',
              margin: '8px 0',
              textAlign: 'center'
            }}>
              steering = (STEER_GAIN * error) + (STEER_D * error_derivative)
            </div>
          </div>
          <div>
            <h4 style={{ color: '#fff', fontSize: '1.1rem', fontWeight: 600, marginBottom: '6px' }}>3. ArUco Marker Navigation</h4>
            <p>
              Junction cues are handled by scanning for `DICT_4X4_50` ArUco markers. The robot measures the corner dimensions to estimate proximity distance. Once the marker area passes `ARUCO_TRIGGER_AREA` (pixels), the robot initiates a 1-second safety stop before carrying out turning maneuvers.
            </p>
          </div>
        </div>

        {/* Right Side: Performance stats */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            background: 'rgba(255, 255, 255, 0.01)',
            padding: '30px',
            borderRadius: '24px',
            border: '1px solid rgba(255,255,255,0.03)'
          }}
        >
          <h3 style={{ color: '#fff', fontSize: '1.2rem', fontWeight: 600, marginBottom: '5px' }}>Measured Benchmarks</h3>
          {capabilities.map((cap, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '0.88rem',
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
      </div>
    </section>
  );
}
