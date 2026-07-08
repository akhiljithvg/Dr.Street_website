'use client';

import {
  Cpu,
  Camera,
  Activity,
  Workflow,
  Battery,
  RotateCw,
  Eye,
  Disc,
  Wifi,
} from 'lucide-react';

export default function Hardware() {
  const hardwareList = [
    {
      icon: <Cpu size={32} />,
      title: 'Raspberry Pi 4B',
      desc: 'Onboard primary computing unit executing path planning, vision code, and decision nodes.',
      spec: '4GB LPDDR4 · Quad-Core 1.5GHz',
    },
    {
      icon: <Camera size={32} />,
      title: 'Camera Module v2',
      desc: 'Wide-angle lens feed for lane tracking, computer vision segmentation, and telemetry.',
      spec: '8 Megapixel · 1080p @ 30 FPS',
    },
    {
      icon: <Activity size={32} />,
      title: 'L298N Motor Driver',
      desc: 'H-bridge motor driver adjusting PWM pulses for precise speed control and direction switching.',
      spec: 'Dual-Channel H-Bridge · 2A Max',
    },
    {
      icon: <Workflow size={32} />,
      title: 'DC Geared Motors',
      desc: 'High-torque driving system equipped with encoders to feed speed telemetry back into PID loops.',
      spec: '12V DC · Geared ratio 1:30',
    },
    {
      icon: <Battery size={32} />,
      title: 'Power Source (LiPo)',
      desc: 'High-density power distribution supplying isolated lines to computing and mechanical systems.',
      spec: '3S LiPo · 11.1V · 5000mAh',
    },
    {
      icon: <RotateCw size={32} />,
      title: 'MPU-6050 IMU',
      desc: 'Six-axis gyro and accelerometer monitoring tilt, roll, and rotational velocity.',
      spec: '6-Degrees of Freedom · I2C interface',
    },
    {
      icon: <Eye size={32} />,
      title: 'HC-SR04 Sensors',
      desc: 'Proximity detection arrays reading distance fields to alert dynamic collision checks.',
      spec: 'Range 2cm - 400cm · 15° Angle',
    },
    {
      icon: <Disc size={32} />,
      title: 'Wheel Encoders',
      desc: 'Quadrature optical discs delivering telemetry feedback for high-resolution positioning.',
      spec: '512 Pulses Per Revolution',
    },
    {
      icon: <Wifi size={32} />,
      title: 'Wi-Fi Connection',
      desc: 'High-speed wireless pipeline stream for remote dashboards, console ssh, and live telemetry.',
      spec: 'Dual-Band 2.4/5GHz · 802.11ac',
    },
  ];

  return (
    <section id="hardware" style={{ background: '#090909' }}>
      <div className="section-header">
        {/* <span className="section-label">// Components</span> */}
        <h2 className="section-title">
          Hardware <span>Platform</span>
        </h2>
        <p className="section-desc">
          Precision-selected components forming the physical foundation of Dr. Street's capabilities.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '24px',
          marginTop: '20px',
        }}
      >
        {hardwareList.map((h, i) => (
          <div
            key={i}
            className="hw-card glassmorphism subtle-border"
            style={{
              padding: '30px',
              borderRadius: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              transition: 'all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)',
            }}
          >
            {/* Header Icon */}
            <div
              style={{
                color: 'var(--accent-neon)',
                transition: 'transform 0.3s ease',
              }}
              className="hw-icon"
            >
              {h.icon}
            </div>

            {/* Title & Description */}
            <h3 style={{ fontSize: '1.25rem', color: '#fff', fontWeight: 600 }}>{h.title}</h3>
            <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.5, flexGrow: 1 }}>
              {h.desc}
            </p>

            {/* Spec Divider / Badge */}
            <div
              style={{
                borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                paddingTop: '14px',
                fontSize: '0.8rem',
                color: 'var(--accent-emerald)',
                fontWeight: 600,
                fontFamily: "'Outfit', sans-serif",
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              {h.spec}
            </div>
          </div>
        ))}
      </div>

      <style jsx global>{`
        .hw-card:hover {
          transform: translateY(-4px);
          border-color: var(--accent-neon) !important;
          box-shadow: 0 12px 25px rgba(57, 255, 20, 0.06), inset 0 0 10px rgba(57, 255, 20, 0.01) !important;
          background: rgba(18, 18, 18, 0.7) !important;
        }
        .hw-card:hover .hw-icon {
          transform: scale(1.1);
        }
      `}</style>
    </section>
  );
}
