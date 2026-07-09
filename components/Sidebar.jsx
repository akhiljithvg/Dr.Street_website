'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ChevronDown, ChevronRight } from 'lucide-react';
import Logo from './Logo';

export default function Sidebar() {
  const pathname = usePathname();
  
  // Track which accordion categories are expanded
  const [expanded, setExpanded] = useState({
    getting_started: true,
    hardware: true,
    software: true,
    troubleshooting: true
  });

  const docChapters = [
    {
      id: 'getting_started',
      title: 'Getting Started',
      links: [
        { name: 'Introduction', href: '/docs/intro' },
      ],
    },
    {
      id: 'hardware',
      title: 'Hardware Assembly',
      links: [
        { name: 'Assembly & Wiring', href: '/docs/hardware' },
      ],
    },
    {
      id: 'software',
      title: 'Software Setup & ROS 2',
      links: [
        { name: 'System & Architecture', href: '/docs/software' },
      ],
    },
    {
      id: 'troubleshooting',
      title: 'Troubleshooting Guides',
      links: [
        { name: 'Diagnostics & Gallery', href: '/docs/troubleshooting' },
      ],
    },
  ];

  const toggleCategory = (id) => {
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
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
        <Link href="/" style={{ textDecoration: 'none' }}>
          <Logo scale={0.8} />
        </Link>
      </div>

      {/* Chapters & Navigation links */}
      <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px', padding: '0 16px' }}>
        {docChapters.map((chapter) => (
          <div key={chapter.id} style={{ display: 'flex', flexDirection: 'column' }}>
            
            {/* Category Header (Accordion Toggle) */}
            <button
              onClick={() => toggleCategory(chapter.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: 'transparent',
                border: 'none',
                width: '100%',
                padding: '10px 12px',
                cursor: 'pointer',
                textAlign: 'left',
                color: 'var(--text-primary)',
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.88rem',
                fontWeight: 600,
                borderRadius: '6px',
                transition: 'background 0.2s ease',
              }}
              className="sidebar-category-btn"
            >
              {chapter.title}
              {expanded[chapter.id] ? (
                <ChevronDown size={16} color="var(--text-muted)" />
              ) : (
                <ChevronRight size={16} color="var(--text-muted)" />
              )}
            </button>

            {/* Nested Links */}
            {expanded[chapter.id] && (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                  marginTop: '4px',
                  marginBottom: '8px'
                }}
              >
                {chapter.links.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      className={`sidebar-doc-link ${isActive ? 'active' : ''}`}
                      style={{
                        display: 'block',
                        padding: '8px 12px 8px 32px', // Indented under the category
                        fontSize: '0.85rem',
                        fontWeight: isActive ? 600 : 400,
                        color: isActive ? 'var(--accent-neon)' : 'var(--text-secondary)',
                        textDecoration: 'none',
                        background: isActive ? 'rgba(0, 128, 0, 0.05)' : 'transparent',
                        borderRadius: '6px',
                      }}
                    >
                      {link.name}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* Footer info */}
      <div style={{ padding: '28px', marginTop: 'auto', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
        v1.0.0 Documentation
      </div>

      <style jsx global>{`
        .sidebar-category-btn:hover {
          background: rgba(255, 255, 255, 0.03) !important;
        }
        .sidebar-doc-link {
          transition: all 0.2s ease;
        }
        .sidebar-doc-link:hover:not(.active) {
          color: var(--text-primary) !important;
          background: rgba(255, 255, 255, 0.03) !important;
        }
      `}</style>
    </aside>
  );
}
