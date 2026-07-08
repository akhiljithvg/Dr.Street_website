'use client';

import { Camera, Eye, Cpu, Brain, Zap, Move } from 'lucide-react';

export default function Architecture() {
  const steps = [
    {
      icon: <Camera size={26} />,
      title: 'Sensors & Perception',
      desc: 'Cameras, IMU, ultrasonic sensors, and wheel encoders capture raw environment data.',
    },
    {
      icon: <Eye size={26} />,
      title: 'Computer Vision Pipeline',
      desc: 'OpenCV processes image feeds for lane tracking, visual odometry, and obstacle mapping.',
    },
    {
      icon: <Cpu size={26} />,
      title: 'AI Processing Unit',
      desc: 'TensorFlow/PyTorch models infer depth maps and segment objects in real-time.',
    },
    {
      icon: <Brain size={26} />,
      title: 'Decision Engine',
      desc: 'Behavior trees evaluate state parameters to plan localized routes and avoid collisions.',
    },
    {
      icon: <Zap size={26} />,
      title: 'Motor Controller',
      desc: 'Generates precise pulse-width modulation (PWM) commands with PID feedback loops.',
    },
    {
      icon: <Move size={26} />,
      title: 'Robot Movement',
      desc: 'Differential drive execution translates commands into smooth physical trajectories.',
    },
  ];

  return (
    <section id="architecture" style={{ background: '#050505' }}>
      <div className="section-header">
        {/* <span className="section-label">// System Design</span> */}
        <h2 className="section-title">
          System <span>Architecture</span>
        </h2>
        <p className="section-desc">
          A complete signal chain showing the processing flow from raw sensors to physical movement.
        </p>
      </div>

      <div
        style={{
          position: 'relative',
          maxWidth: '850px',
          margin: '0 auto',
          padding: '20px 0',
        }}
      >
        {/* The Connector line down the middle for desktop */}
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '40px',
            bottom: '40px',
            width: '2px',
            background: 'linear-gradient(to bottom, rgba(57, 255, 20, 0.05), rgba(57, 255, 20, 0.4) 30%, rgba(57, 255, 20, 0.4) 70%, rgba(57, 255, 20, 0.05))',
            transform: 'translateX(-50%)',
            zIndex: 1,
          }}
          className="arch-back-line"
        />

        {/* Dynamic sliding glow pulse */}
        <div
          style={{
            position: 'absolute',
            left: '50%',
            width: '6px',
            height: '30px',
            background: 'linear-gradient(to bottom, transparent, var(--accent-neon), transparent)',
            boxShadow: '0 0 15px var(--accent-neon)',
            transform: 'translateX(-50%)',
            zIndex: 2,
            animation: 'pulseMove 6s linear infinite',
          }}
          className="arch-glow-pulse"
        />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '50px' }}>
          {steps.map((step, idx) => {
            const isLeft = idx % 2 === 0;

            return (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '100%',
                  position: 'relative',
                  zIndex: 3,
                }}
                className={`arch-step-row ${isLeft ? 'left-row' : 'right-row'}`}
              >
                {/* Desktop Left Side Card */}
                {isLeft ? (
                  <div
                    style={{
                      width: '43%',
                      textAlign: 'right',
                    }}
                    className="arch-card-wrap"
                  >
                    <div
                      className="glassmorphism subtle-border"
                      style={{
                        padding: '24px',
                        borderRadius: '16px',
                        display: 'inline-block',
                      }}
                    >
                      <h3 style={{ fontSize: '1.2rem', color: '#fff', marginBottom: '8px' }}>{step.title}</h3>
                      <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div style={{ width: '43%' }} className="arch-empty-space" />
                )}

                {/* Central Connector Circle */}
                <div
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    background: '#0a0a0a',
                    border: '2px solid var(--accent-neon)',
                    color: 'var(--accent-neon)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 0 20px rgba(57, 255, 20, 0.25)',
                    zIndex: 10,
                  }}
                  className="arch-icon-circle"
                >
                  {step.icon}
                </div>

                {/* Desktop Right Side Card */}
                {!isLeft ? (
                  <div
                    style={{
                      width: '43%',
                      textAlign: 'left',
                    }}
                    className="arch-card-wrap"
                  >
                    <div
                      className="glassmorphism subtle-border"
                      style={{
                        padding: '24px',
                        borderRadius: '16px',
                        display: 'inline-block',
                      }}
                    >
                      <h3 style={{ fontSize: '1.2rem', color: '#fff', marginBottom: '8px' }}>{step.title}</h3>
                      <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div style={{ width: '43%' }} className="arch-empty-space" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      <style jsx global>{`
        @keyframes pulseMove {
          0% { top: 0px; opacity: 0; }
          5% { opacity: 1; }
          95% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }

        @media (max-width: 768px) {
          .arch-back-line {
            left: 28px !important;
            transform: none !important;
          }
          .arch-glow-pulse {
            left: 28px !important;
            transform: none !important;
          }
          .arch-step-row {
            flex-direction: row-reverse !important;
            justify-content: flex-end !important;
            gap: 20px !important;
          }
          .arch-card-wrap {
            width: calc(100% - 80px) !important;
            text-align: left !important;
          }
          .arch-card-wrap > div {
            display: block !important;
          }
          .arch-empty-space {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}
