'use client';

import { Camera, Eye, Cpu, Brain, Zap, Move } from 'lucide-react';

export default function Architecture() {
  const steps = [
    {
      icon: <Camera size={26} />,
      title: '1. Camera Driver Node (/usb_cam)',
      desc: 'Retrieves raw image frames from the USB camera at 30 FPS and publishes raw image matrices to the /image_raw topic.',
    },
    {
      icon: <Eye size={26} />,
      title: '2. Perception Node (/lane_detector)',
      desc: 'Subscribes to /image_raw, converts frames to HSV space, filters red marking masks, and publishes lane error offsets to /lane_error.',
    },
    {
      icon: <Cpu size={26} />,
      title: '3. Marker Scanner Node (/aruco_detector)',
      desc: 'Subscribes to /image_raw, scans for DICT_4X4_50 marker symbols, and publishes proximity/junction data to /aruco_data.',
    },
    {
      icon: <Brain size={26} />,
      title: '4. Control Decision Node (/mission_control)',
      desc: 'Fuses lane error and ArUco marker detections, applies PD logic calculations, and publishes linear/angular values to /cmd_vel.',
    },
    {
      icon: <Zap size={26} />,
      title: '5. Actuator Bridge Node (/motor_bridge)',
      desc: 'Subscribes to /cmd_vel, formats translation values into differential left/right duties, and writes serial packets to /dev/ttyS0.',
    },
    {
      icon: <Move size={26} />,
      title: '6. Embedded ESP32 Co-Processor',
      desc: 'Decodes serial strings, applies hardware PWM duty cycles to the dual H-Bridge pins, and actuates physical DC geared motors.',
    },
  ];

  const parameters = [
    { name: 'BASE_SPEED', type: 'Integer', default: '130', desc: 'Reference duty cycle speed (0 to 255) for straight line segments.' },
    { name: 'STEER_GAIN', type: 'Float', default: '0.7', desc: 'Proportional gain coefficient (Kp) mapping position error to offset.' },
    { name: 'STEER_D', type: 'Float', default: '0.3', desc: 'Derivative gain coefficient (Kd) checking velocity of lane offsets.' },
    { name: 'LANE_HSV_MIN', type: 'Array', default: '[0, 100, 100]', desc: 'Lower boundary parameters for OpenCV red lane masking filters.' },
    { name: 'LANE_HSV_MAX', type: 'Array', default: '[10, 255, 255]', desc: 'Upper boundary parameters for OpenCV red lane masking filters.' },
    { name: 'ARUCO_TRIGGER_AREA', type: 'Integer', default: '1200', desc: 'Marker bounding pixel area size triggering stopping sequences.' },
  ];

  return (
    <section id="architecture" style={{ background: '#050505' }}>
      <div className="section-header">
        <h2 className="section-title">
          System <span>Architecture</span>
        </h2>
        <p className="section-desc">
          The processing pipeline from raw sensory feeds down to the hardware actuator signals.
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
                      <h3 style={{ fontSize: '1.15rem', color: '#fff', marginBottom: '8px' }}>{step.title}</h3>
                      <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
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
                      <h3 style={{ fontSize: '1.15rem', color: '#fff', marginBottom: '8px' }}>{step.title}</h3>
                      <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
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

      {/* Tunable Parameters section */}
      <div 
        style={{ 
          maxWidth: '850px', 
          margin: '60px auto 0 auto', 
          paddingBottom: '30px' 
        }}
      >
        <h3 style={{ color: '#fff', fontSize: '1.3rem', marginBottom: '15px', fontWeight: 600 }}>🛠️ Key Tunable Parameters</h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginBottom: '20px', lineHeight: 1.5 }}>
          Modify these values inside the perception configuration files to adapt the robot behavior for different track conditions and lighting environments.
        </p>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem', textAlign: 'left', color: 'var(--text-secondary)' }} className="glassmorphism subtle-border">
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.08)', background: 'rgba(255, 255, 255, 0.01)' }}>
                <th style={{ padding: '12px 16px', color: '#fff', fontWeight: 600 }}>Parameter Name</th>
                <th style={{ padding: '12px 16px', color: '#fff', fontWeight: 600 }}>Type</th>
                <th style={{ padding: '12px 16px', color: '#fff', fontWeight: 600 }}>Default Value</th>
                <th style={{ padding: '12px 16px', color: '#fff', fontWeight: 600 }}>Purpose</th>
              </tr>
            </thead>
            <tbody>
              {parameters.map((p, idx) => (
                <tr key={idx} style={{ borderBottom: idx === parameters.length - 1 ? 'none' : '1px solid rgba(255, 255, 255, 0.04)' }}>
                  <td style={{ padding: '12px 16px', fontFamily: "'Courier New', Courier, monospace", color: 'var(--accent-neon)' }}><strong>{p.name}</strong></td>
                  <td style={{ padding: '12px 16px' }}>{p.type}</td>
                  <td style={{ padding: '12px 16px', fontFamily: "'Courier New', Courier, monospace", color: '#fff' }}>{p.default}</td>
                  <td style={{ padding: '12px 16px', lineHeight: 1.4 }}>{p.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
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
