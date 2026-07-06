'use client';

import {
  Navigation,
  Eye,
  Shield,
  Milestone,
  Map,
  MapPin,
  GitMerge,
  Cpu,
  Video,
  LineChart,
  Gamepad2,
  Grid,
} from 'lucide-react';

export default function Features() {
  const featuresList = [
    {
      icon: <Navigation size={28} />,
      title: 'Autonomous Navigation',
      desc: 'Multi-layered path planning with dynamic obstacle avoidance and intelligent route optimization across complex environments.',
      tag: '→ Core System',
    },
    {
      icon: <Eye size={28} />,
      title: 'Computer Vision',
      desc: 'Real-time image processing and deep learning-based visual understanding using onboard camera systems and neural inference.',
      tag: '→ AI Vision',
    },
    {
      icon: <Shield size={28} />,
      title: 'Obstacle Detection',
      desc: 'Multi-sensor fusion combining ultrasonic, camera, and IMU data for 360° situational awareness and collision prevention.',
      tag: '→ Safety Layer',
    },
    {
      icon: <Milestone size={28} />,
      title: 'Lane Following',
      desc: 'Precision edge detection and line-tracking algorithms enabling the robot to follow defined paths with sub-centimeter accuracy.',
      tag: '→ Navigation',
    },
    {
      icon: <Map size={28} />,
      title: 'SLAM Mapping',
      desc: 'Simultaneous Localization and Mapping builds real-time 2D/3D environment maps for autonomous spatial understanding.',
      tag: '→ Spatial AI',
    },
    {
      icon: <MapPin size={28} />,
      title: 'Localization',
      desc: 'High-precision self-localization within mapped environments using probabilistic algorithms and sensor odometry.',
      tag: '→ Positioning',
    },
    {
      icon: <GitMerge size={28} />,
      title: 'Sensor Fusion',
      desc: 'Kalman-filter-based integration of multiple sensor streams for a coherent, high-confidence environmental model.',
      tag: '→ Data Layer',
    },
    {
      icon: <Cpu size={28} />,
      title: 'AI Decision Engine',
      desc: 'Onboard neural processing powers autonomous behavioral planning, context-aware decision-making, and adaptive responses.',
      tag: '→ Intelligence',
    },
    {
      icon: <Video size={28} />,
      title: 'Camera Streaming',
      desc: 'Live HD video streaming over Wi-Fi enables real-time monitoring of the robot\'s perspective from any connected device.',
      tag: '→ Telemetry',
    },
    {
      icon: <LineChart size={28} />,
      title: 'Remote Monitoring',
      desc: 'Full telemetry dashboard showing battery status, sensor readings, velocity, heading, and system health in real-time.',
      tag: '→ Monitoring',
    },
    {
      icon: <Gamepad2 size={28} />,
      title: 'Real-Time Control',
      desc: 'Low-latency wireless control interface for manual override, parameter tuning, and hybrid autonomous-manual operation.',
      tag: '→ Control',
    },
    {
      icon: <Grid size={28} />,
      title: 'Modular Architecture',
      desc: 'Plug-and-play subsystems allow easy hardware upgrades, software modules, and capability expansion without full redesign.',
      tag: '→ Platform',
    },
  ];

  return (
    <section id="features" style={{ background: '#090909' }}>
      <div className="section-header">
        <span className="section-label">// Capabilities</span>
        <h2 className="section-title">
          Engineered <span>Features</span>
        </h2>
        <p className="section-desc">
          Every capability is precision-engineered for real-world autonomous operation.
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
        {featuresList.map((f, i) => (
          <div
            key={i}
            className="feature-card subtle-border"
            style={{
              background: 'rgba(14, 14, 14, 0.55)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.03)',
              borderRadius: '20px',
              padding: '30px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              transition: 'all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Hover visual light strip */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '2px',
                background: 'linear-gradient(90deg, transparent, var(--accent-neon), transparent)',
                transform: 'translateX(-100%)',
                transition: 'transform 0.6s ease',
              }}
              className="glow-bar"
            />

            {/* Icon */}
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '12px',
                background: 'rgba(57, 255, 20, 0.05)',
                border: '1px solid rgba(57, 255, 20, 0.15)',
                color: 'var(--accent-neon)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 15px rgba(57, 255, 20, 0.03)',
                transition: 'all 0.3s',
              }}
              className="feature-icon-box"
            >
              {f.icon}
            </div>

            {/* Content */}
            <h3 style={{ fontSize: '1.25rem', color: '#fff', fontWeight: 600 }}>{f.title}</h3>
            <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.5, flexGrow: 1 }}>
              {f.desc}
            </p>
            <span style={{ fontSize: '0.8rem', color: 'var(--accent-neon)', fontWeight: 600, letterSpacing: '0.05em' }}>
              {f.tag}
            </span>
          </div>
        ))}
      </div>

      <style jsx global>{`
        .feature-card:hover {
          transform: translateY(-5px);
          background: rgba(20, 20, 20, 0.7) !important;
          border-color: var(--accent-neon) !important;
          box-shadow: 0 15px 30px rgba(57, 255, 20, 0.08), inset 0 0 15px rgba(57, 255, 20, 0.02) !important;
        }
        .feature-card:hover .glow-bar {
          transform: translateX(100%);
        }
        .feature-card:hover .feature-icon-box {
          background: var(--accent-neon);
          color: #000;
          box-shadow: 0 0 20px rgba(57, 255, 20, 0.35);
        }
      `}</style>
    </section>
  );
}
