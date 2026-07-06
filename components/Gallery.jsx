'use client';

import { useState, useEffect } from 'react';
import { Image as ImageIcon, Cpu, Eye, Navigation, Map, Shield, HelpCircle, X } from 'lucide-react';

export default function Gallery() {
  const [filter, setFilter] = useState('all');
  const [activeItem, setActiveItem] = useState(null);

  const galleryItems = [
    {
      id: 1,
      category: 'hardware',
      icon: '🤖',
      title: 'Robot Chassis Assembly',
      desc: 'Precision assembly of the structural acrylic chassis with dual driving DC motors.',
      bg: 'linear-gradient(135deg, #0a1a0a, #0e2a0e)',
    },
    {
      id: 2,
      category: 'software',
      icon: '👁️',
      title: 'Computer Vision Feed',
      desc: 'Onboard segmentation processing showing lane detections and obstacle tags overlays.',
      bg: 'linear-gradient(135deg, #0a0a1a, #0e0e2a)',
    },
    {
      id: 3,
      category: 'demo',
      icon: '🧭',
      title: 'Autonomous Navigation Run',
      desc: 'The robot executing a complex slalom run avoiding dynamic obstacles in real-time.',
      bg: 'linear-gradient(135deg, #1a0a0a, #2a0e0e)',
    },
    {
      id: 4,
      category: 'software',
      icon: '🗺️',
      title: 'SLAM Mapping Visualizer',
      desc: 'Real-time rendering of the 2D occupancy grid built onboard using ultrasonic distances.',
      bg: 'linear-gradient(135deg, #0a1a1a, #0e2a2a)',
    },
    {
      id: 5,
      category: 'hardware',
      icon: '📡',
      title: 'Sensor Array Setup',
      desc: 'Mounting IMU sensors and front-facing ultrasonic matrices onto the bumper plate.',
      bg: 'linear-gradient(135deg, #1a1a0a, #2a2a0e)',
    },
    {
      id: 6,
      category: 'lab',
      icon: '🔬',
      title: 'Development Lab Setup',
      desc: 'Dual-screen testing and debugging console running real-time plots of motor velocity.',
      bg: 'linear-gradient(135deg, #0e0e0e, #1a0a1a)',
    },
  ];

  // Close lightbox on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveItem(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const filteredItems = filter === 'all'
    ? galleryItems
    : galleryItems.filter((item) => item.category === filter);

  return (
    <section id="gallery" style={{ background: '#050505' }}>
      <div className="section-header">
        <span className="section-label">// Media</span>
        <h2 className="section-title">
          Project <span>Gallery</span>
        </h2>
        <p className="section-desc">
          Visual documentation of Dr. Street in development, benchmarking, and autonomous action.
        </p>
      </div>

      {/* Tabs */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '12px',
          flexWrap: 'wrap',
          marginBottom: '40px',
        }}
      >
        {['all', 'hardware', 'software', 'demo', 'lab'].map((category) => (
          <button
            key={category}
            onClick={() => setFilter(category)}
            style={{
              background: filter === category ? 'var(--accent-neon)' : 'rgba(255, 255, 255, 0.03)',
              border: filter === category ? '1px solid var(--accent-neon)' : '1px solid rgba(255, 255, 255, 0.06)',
              color: filter === category ? '#000' : 'var(--text-secondary)',
              padding: '8px 20px',
              borderRadius: '20px',
              fontFamily: "'Outfit', sans-serif",
              fontSize: '0.88rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
            }}
            onMouseEnter={(e) => {
              if (filter !== category) {
                e.target.style.borderColor = 'var(--accent-neon)';
                e.target.style.color = 'var(--accent-neon)';
              }
            }}
            onMouseLeave={(e) => {
              if (filter !== category) {
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.06)';
                e.target.style.color = 'var(--text-secondary)';
              }
            }}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '24px',
        }}
      >
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setActiveItem(item)}
            className="gallery-item subtle-border"
            style={{
              position: 'relative',
              borderRadius: '20px',
              height: '240px',
              background: item.bg,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              cursor: 'pointer',
            }}
          >
            {/* Visual content */}
            <span style={{ fontSize: '3.5rem', marginBottom: '8px', zIndex: 2 }}>{item.icon}</span>
            <span
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: '1rem',
                fontWeight: 700,
                color: '#fff',
                textAlign: 'center',
                lineHeight: 1.3,
                zIndex: 2,
              }}
            >
              {item.title}
            </span>

            {/* Sub-label Category tag */}
            <span
              style={{
                fontSize: '0.72rem',
                color: 'var(--accent-neon)',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                marginTop: '6px',
                zIndex: 2,
                background: 'rgba(57, 255, 20, 0.08)',
                padding: '3px 10px',
                borderRadius: '12px',
                border: '1px solid rgba(57, 255, 20, 0.15)',
              }}
            >
              {item.category}
            </span>

            {/* Hover overlay details */}
            <div
              className="gallery-overlay"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'rgba(5, 5, 5, 0.9)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '24px',
                opacity: 0,
                transition: 'opacity 0.3s ease',
                zIndex: 5,
              }}
            >
              <p
                style={{
                  color: 'var(--accent-neon)',
                  fontWeight: 600,
                  fontSize: '1.05rem',
                  textAlign: 'center',
                }}
              >
                🔍 Click to Inspect Details
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal overlay */}
      {activeItem && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100vh',
            background: 'rgba(5, 5, 5, 0.95)',
            backdropFilter: 'blur(20px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 99999,
          }}
          onClick={() => setActiveItem(null)}
        >
          <div
            style={{
              position: 'relative',
              background: '#0e0e0e',
              border: '1px solid var(--border-neon)',
              borderRadius: '24px',
              width: '90%',
              maxWidth: '500px',
              padding: '40px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              boxShadow: '0 0 45px rgba(57, 255, 20, 0.25)',
            }}
            onClick={(e) => e.stopPropagation()} // Prevent clicking box from closing modal
          >
            {/* Close button */}
            <button
              onClick={() => setActiveItem(null)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'none',
                border: 'none',
                color: '#fff',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => (e.target.style.color = 'var(--accent-neon)')}
              onMouseLeave={(e) => (e.target.style.color = '#fff')}
            >
              <X size={24} />
            </button>

            {/* Modal graphic display */}
            <div
              style={{
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                background: activeItem.bg,
                border: '2px solid var(--accent-neon)',
                boxShadow: '0 0 25px rgba(57, 255, 20, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '4.5rem',
                marginBottom: '28px',
              }}
            >
              {activeItem.icon}
            </div>

            {/* Category tag */}
            <span
              style={{
                fontSize: '0.75rem',
                color: 'var(--accent-neon)',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                fontWeight: 700,
                marginBottom: '10px',
              }}
            >
              Category: {activeItem.category}
            </span>

            {/* Text details */}
            <h3
              style={{
                fontSize: '1.8rem',
                fontWeight: 800,
                color: '#fff',
                marginBottom: '14px',
                fontFamily: "'Outfit', sans-serif",
              }}
            >
              {activeItem.title}
            </h3>
            <p
              style={{
                fontSize: '1rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.6,
              }}
            >
              {activeItem.desc}
            </p>
          </div>
        </div>
      )}

      <style jsx global>{`
        .gallery-item:hover .gallery-overlay {
          opacity: 1;
        }
      `}</style>
    </section>
  );
}
