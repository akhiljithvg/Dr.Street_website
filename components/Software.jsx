'use client';

import {
  Layers,
  Sparkles,
  Eye,
  Globe,
  Brain,
  Sliders,
} from 'lucide-react';

export default function Software() {
  const steps = [
    {
      num: '01',
      icon: <Layers size={22} />,
      title: 'Sensor Data Acquisition',
      desc: 'Onboard drivers retrieve parallel streams from camera lenses, gyroscopes, distance sensors, and optical wheel encoders at synchronized polling intervals.',
    },
    {
      num: '02',
      icon: <Sparkles size={22} />,
      title: 'Data Preprocessing',
      desc: 'Raw streams are cleaned, synchronized, and calibrated. Image frames undergo distortion correction and color space conversion to optimize downstream tasks.',
    },
    {
      num: '03',
      icon: <Eye size={22} />,
      title: 'Computer Vision Analysis',
      desc: 'The CV pipeline processes frames using Canny edge filters and Hough line transforms for lane navigation, alongside YOLO models for dynamic object tags.',
    },
    {
      num: '04',
      icon: <Globe size={22} />,
      title: 'SLAM & Localization',
      desc: 'Simultaneous Mapping builds 2D grid occupancy networks while Extended Kalman Filters fuse IMU and odometry for consistent coordinate estimation.',
    },
    {
      num: '05',
      icon: <Brain size={22} />,
      title: 'AI Decision Making',
      desc: 'The behaviors decision engine evaluates localization parameters against dynamic obstacle paths, selecting optimal paths based on trained models.',
    },
    {
      num: '06',
      icon: <Sliders size={22} />,
      title: 'Motor Control Execution',
      desc: 'PID nodes calculate velocity vectors and convert them into PWM duty cycles, using encoder feedbacks to maintain steady speed and heading direction.',
    },
  ];

  return (
    <section id="software" style={{ background: '#050505' }}>
      <div className="section-header">
        <span className="section-label">// Processing Pipeline</span>
        <h2 className="section-title">
          Software <span>Workflow</span>
        </h2>
        <p className="section-desc">
          A layered pipeline that converts raw environment data streams into exact mechanical outputs.
        </p>
      </div>

      <div
        style={{
          position: 'relative',
          maxWidth: '800px',
          margin: '40px auto 0 auto',
        }}
      >
        {/* Timeline connector thread */}
        <div
          style={{
            position: 'absolute',
            top: '20px',
            bottom: '20px',
            left: '30px',
            width: '2px',
            background: 'linear-gradient(to bottom, var(--accent-neon), var(--accent-emerald))',
          }}
          className="sw-line-thread"
        />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="sw-step-container"
              style={{
                display: 'flex',
                gap: '30px',
                position: 'relative',
                zIndex: 3,
              }}
            >
              {/* Stepper Dot */}
              <div
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: '#0a0a0a',
                  border: '1px solid var(--border-neon)',
                  color: 'var(--accent-neon)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0 15px rgba(57, 255, 20, 0.1)',
                  flexShrink: 0,
                  transition: 'all 0.3s',
                }}
                className="sw-step-dot"
              >
                {step.icon}
              </div>

              {/* Step Content */}
              <div
                className="glassmorphism subtle-border"
                style={{
                  padding: '28px',
                  borderRadius: '20px',
                  flexGrow: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: '0.82rem',
                      color: 'var(--accent-neon)',
                      fontWeight: 700,
                      letterSpacing: '0.05em',
                    }}
                  >
                    STEP {step.num}
                  </span>
                </div>
                <h3 style={{ fontSize: '1.25rem', color: '#fff', fontWeight: 600 }}>{step.title}</h3>
                <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        .sw-step-container:hover .sw-step-dot {
          background: var(--accent-neon);
          color: #000;
          box-shadow: 0 0 20px var(--accent-neon);
          transform: scale(1.05);
        }
      `}</style>
    </section>
  );
}
