'use client';

import { useState, useEffect } from 'react';
import Logo from './Logo';

export default function Sidebar() {
  const [activeSection, setActiveSection] = useState('hero');

  const navLinks = [
    { name: 'Introduction', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Features', href: '#features' },
    { name: 'Architecture', href: '#architecture' },
    { name: 'Hardware', href: '#hardware' },
    { name: 'Software', href: '#software' },
    { name: 'Capabilities', href: '#capabilities' },
    { name: 'Gallery', href: '#gallery' },
  ];

  // Intersection Observer for scroll spy
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -70% 0px' }
    );

    navLinks.forEach((link) => {
      const section = document.querySelector(link.href);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const handleLinkClick = (e, id) => {
    e.preventDefault();
    const target = document.querySelector(id);
    if (target) {
      // Small offset for smooth scrolling, considering the section padding
      const targetPos = target.getBoundingClientRect().top + window.scrollY - 20;
      window.scrollTo({
        top: targetPos,
        behavior: 'smooth',
      });
      // Optionally update active section immediately for snappier UI
      setActiveSection(id.replace('#', ''));
    }
  };

  return (
    <aside
      className="docs-sidebar"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '260px',
        height: '100vh',
        background: 'var(--surface)',
        borderRight: '1px solid var(--border-subtle)',
        padding: '30px 0',
        overflowY: 'auto',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div style={{ padding: '0 30px', marginBottom: '40px' }}>
        <a href="#hero" onClick={(e) => handleLinkClick(e, '#hero')} style={{ textDecoration: 'none' }}>
          <Logo scale={0.5} />
        </a>
      </div>

      <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px', padding: '0 16px' }}>
        {navLinks.map((link) => {
          const isActive = activeSection === link.href.replace('#', '');
          return (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              style={{
                padding: '8px 16px',
                borderRadius: '6px',
                fontSize: '0.9rem',
                fontWeight: isActive ? 600 : 500,
                color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                background: isActive ? 'rgba(255, 255, 255, 0.05)' : 'transparent',
                textDecoration: 'none',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                if (!isActive) e.target.style.color = 'var(--text-primary)';
              }}
              onMouseLeave={(e) => {
                if (!isActive) e.target.style.color = 'var(--text-secondary)';
              }}
            >
              {link.name}
            </a>
          );
        })}
      </nav>

      <div style={{ padding: '30px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
        v1.0.0 Documentation
      </div>
    </aside>
  );
}
