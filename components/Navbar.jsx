'use client';

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import Logo from './Logo';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Toggle sticky state
      setScrolled(window.scrollY > 60);

      // Update scroll progress bar
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [menuOpen]);

  const toggleSidebar = () => {
    const sidebar = document.querySelector('.docs-sidebar');
    if (sidebar) {
      sidebar.classList.toggle('open');
    }
  };

  return (
    <>
      {/* Scroll Progress Bar */}
      <div id="scroll-progress" style={{ width: `${scrollProgress}%` }} />

      <nav
        className="docs-navbar"
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          height: '80px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 40px',
          zIndex: 900,
          transition: 'all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)',
          background: scrolled ? 'rgba(5, 5, 5, 0.75)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--border-subtle)' : '1px solid transparent',
        }}
      >
        {/* Logo for mobile only (hidden on desktop) */}
        <a
          href="#hero"
          className="mobile-logo-nav"
          style={{ textDecoration: 'none', display: 'none' }}
        >
          <Logo scale={0.5} />
        </a>

        {/* Desktop Links (Pushed to the right since Logo is in sidebar) */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '30px',
            marginLeft: 'auto',
          }}
          className="desktop-menu"
        >
          <a
            href="https://github.com/akhiljithvg/duckie.git"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
            style={{ padding: '8px 16px', fontSize: '0.82rem' }}
          >
            <FaGithub size={14} /> GitHub ↗
          </a>
        </div>
        {/* Mobile Hamburger Button */}
        <div
          className="mobile-hamburger"
          style={{
            display: 'none',
            color: '#fff',
            cursor: 'pointer',
            position: 'relative',
            zIndex: 10000,
          }}
          onClick={toggleSidebar}
        >
          <Menu size={26} />
        </div>
      </nav>

      {/* Global CSS overrides */}
      <style jsx global>{`
        .docs-navbar {
          width: calc(100% - 260px);
          left: 260px;
        }

        @media (max-width: 1024px) {
          .docs-navbar {
            width: 100% !important;
            left: 0 !important;
            padding: 0 20px !important;
          }
          .desktop-menu {
            display: none !important;
          }
          .mobile-hamburger {
            display: block !important;
          }
          .mobile-logo-nav {
            display: block !important;
          }
        }
      `}</style>
    </>
  );
}
