'use client';

import { useEffect, useState, useRef } from 'react';
import { FaGithub } from 'react-icons/fa';
import Logo from './Logo';
import SteeringGame from './SteeringGame';

export default function Hero() {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const robotRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const xFrac = e.clientX / window.innerWidth - 0.5;
      const yFrac = e.clientY / window.innerHeight - 0.5;
      setCoords({ x: xFrac, y: yFrac });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    if (robotRef.current) {
      // Apply mouse parallax transform dynamically
      robotRef.current.style.transform = `translateY(-50%) translate(${coords.x * -25}px, ${coords.y * -20}px)`;
    }
  }, [coords]);

  const handleExploreClick = (e) => {
    e.preventDefault();
    const target = document.querySelector('#about');
    if (target) {
      const offset = 80;
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY - offset,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section
      id="hero"
      style={{
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        zIndex: 5,
      }}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          zIndex: 10,
          paddingTop: '20px',
        }}
      >
        {/* Main Logo */}
        <div style={{ marginBottom: '40px' }}>
          <Logo scale={2} />
        </div>

        {/* Subtitle */}
        <p
          style={{
            fontSize: '1.25rem',
            lineHeight: 1.6,
            color: 'var(--text-secondary)',
            marginBottom: '40px',
            maxWidth: '620px',
            fontWeight: 400,
          }}
        >
          A complete, hands-on ROS 2 robotics project for learning autonomous navigation, computer vision, and embedded systems. Designed for step-by-step learning.
        </p>

        {/* Buttons */}
        <div
          className="hero-buttons"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '18px',
            flexWrap: 'wrap',
          }}
        >
          <a
            href="https://github.com/akhiljithvg/Dr.street.git"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            <FaGithub size={18} /> View GitHub
          </a>
        </div>
      </div>

      {/* Interactive Steering Mini-Game */}
      <div
        className="hero-graphic-wrapper"
        style={{
          position: 'absolute',
          right: '5%',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '400px',
          height: '420px',
          zIndex: 12,
        }}
      >
        <SteeringGame />
      </div>




    </section>
  );
}
