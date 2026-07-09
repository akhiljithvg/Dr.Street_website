'use client';

import { useState, useEffect } from 'react';
import Logo from './Logo';

export default function Sidebar() {
  const [activeSection, setActiveSection] = useState('hero');

  const docChapters = [
    {
      title: 'Getting Started',
      links: [
        { name: 'Introduction', href: '#hero' },
        { name: 'Project Overview', href: '#about' },
        { name: 'Ubuntu Server Setup', href: '#ubuntu-setup' },
      ],
    },
    {
      title: 'Hardware Guide',
      links: [
        { name: 'Assembly & Wiring', href: '#hardware' },
      ],
    },
    {
      title: 'Software & ROS 2',
      links: [
        { name: 'System Setup & Build', href: '#software' },
        { name: 'Core Control Algorithms', href: '#capabilities' },
      ],
    },
    {
      title: 'System Design',
      links: [
        { name: 'Architecture & Parameters', href: '#architecture' },
      ],
    },
    {
      title: 'Troubleshooting & Media',
      links: [
        { name: 'Troubleshooting & Gallery', href: '#gallery' },
      ],
    },
  ];

  const allLinks = docChapters.flatMap((chapter) => chapter.links);

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

    allLinks.forEach((link) => {
      const section = document.querySelector(link.href);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const handleLinkClick = (e, id) => {
    e.preventDefault();
    const target = document.querySelector(id);
    if (target) {
      const targetPos = target.getBoundingClientRect().top + window.scrollY - 20;
      window.scrollTo({
        top: targetPos,
        behavior: 'smooth',
      });
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
        padding: '35px 0',
        overflowY: 'auto',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Sidebar Header Logo */}
      <div style={{ padding: '0 28px', marginBottom: '35px' }}>
        <a href="#hero" onClick={(e) => handleLinkClick(e, '#hero')} style={{ textDecoration: 'none' }}>
          <Logo scale={0.5} />
        </a>
      </div>

      {/* Chapters & Navigation links */}
      <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '28px', padding: '0 20px' }}>
        {docChapters.map((chapter) => (
          <div key={chapter.title} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {/* Chapter Title */}
            <h4
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: '0.72rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: 'rgba(255, 255, 255, 0.3)',
                padding: '0 8px',
                margin: 0,
              }}
            >
              {chapter.title}
            </h4>

            {/* Nested Links with continuous left border track */}
            <div
              style={{
                borderLeft: '1px solid rgba(255, 255, 255, 0.08)',
                marginLeft: '8px',
                display: 'flex',
                flexDirection: 'column',
                gap: '2px',
              }}
            >
              {chapter.links.map((link) => {
                const isActive = activeSection === link.href.replace('#', '');
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className={`sidebar-doc-link ${isActive ? 'active' : ''}`}
                    style={{
                      display: 'block',
                      padding: '7px 16px',
                      marginLeft: '-1px',
                      borderLeft: isActive ? '2px solid var(--accent-neon)' : '2px solid transparent',
                      paddingLeft: isActive ? '15px' : '16px',
                      fontSize: '0.85rem',
                      fontWeight: isActive ? 600 : 400,
                      color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                      textDecoration: 'none',
                      background: isActive ? 'rgba(0, 128, 0, 0.04)' : 'transparent',
                      borderRadius: '0 4px 4px 0',
                    }}
                  >
                    {link.name}
                  </a>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer info */}
      <div style={{ padding: '0 28px', marginTop: 'auto', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
        v1.0.0 Documentation
      </div>

      <style jsx global>{`
        .sidebar-doc-link {
          transition: all 0.2s ease;
        }
        .sidebar-doc-link:hover:not(.active) {
          color: var(--text-primary) !important;
          border-left-color: rgba(255, 255, 255, 0.15) !important;
          background: rgba(255, 255, 255, 0.01) !important;
        }
      `}</style>
    </aside>
  );
}
