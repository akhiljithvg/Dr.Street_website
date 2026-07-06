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

  const handleLinkClick = (e, id) => {
    e.preventDefault();
    setMenuOpen(false);
    const target = document.querySelector(id);
    if (target) {
      const navbarHeight = 80;
      const targetPos = target.getBoundingClientRect().top + window.scrollY - navbarHeight;
      window.scrollTo({
        top: targetPos,
        behavior: 'smooth',
      });
    }
  };

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Features', href: '#features' },
    { name: 'Architecture', href: '#architecture' },
    { name: 'Hardware', href: '#hardware' },
    { name: 'Software', href: '#software' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Timeline', href: '#timeline' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      {/* Scroll Progress Bar */}
      <div id="scroll-progress" style={{ width: `${scrollProgress}%` }} />

      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '80px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 8%',
          zIndex: 1000,
          transition: 'all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)',
          background: scrolled ? 'rgba(5, 5, 5, 0.75)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--border-subtle)' : '1px solid transparent',
        }}
      >
        {/* Logo */}
        <a
          href="#hero"
          onClick={(e) => handleLinkClick(e, '#hero')}
          style={{ textDecoration: 'none' }}
        >
          <Logo scale={0.65} />
        </a>

        {/* Desktop Links */}
        <ul
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '30px',
            listStyle: 'none',
          }}
          className="desktop-menu"
        >
          {navLinks.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                style={{
                  fontSize: '0.88rem',
                  fontWeight: 500,
                  color: 'var(--text-secondary)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                }}
                onMouseEnter={(e) => (e.target.style.color = 'var(--accent-neon)')}
                onMouseLeave={(e) => (e.target.style.color = 'var(--text-secondary)')}
              >
                {link.name}
              </a>
            </li>
          ))}
          <li>
            <a
              href="https://github.com/akhiljithvg/dr-street"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
              style={{ padding: '8px 16px', fontSize: '0.82rem' }}
            >
              <FaGithub size={14} /> GitHub ↗
            </a>
          </li>
        </ul>

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
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </div>
      </nav>

      {/* Mobile Drawer Menu Overlay */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          width: '100%',
          maxWidth: '320px',
          height: '100vh',
          background: 'rgba(5, 5, 5, 0.95)',
          backdropFilter: 'blur(20px)',
          borderLeft: '1px solid var(--border-subtle)',
          zIndex: 9999,
          padding: '100px 40px 40px 40px',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
          transition: 'transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)',
          transform: menuOpen ? 'translateX(0)' : 'translateX(100%)',
        }}
      >
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            onClick={(e) => handleLinkClick(e, link.href)}
            style={{
              fontSize: '1.2rem',
              fontWeight: 600,
              color: 'var(--text-primary)',
              letterSpacing: '0.05em',
            }}
            onMouseEnter={(e) => (e.target.style.color = 'var(--accent-neon)')}
            onMouseLeave={(e) => (e.target.style.color = 'var(--text-primary)')}
          >
            {link.name}
          </a>
        ))}
        <a
          href="https://github.com/akhiljithvg/dr-street"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary"
          style={{ marginTop: '20px', justifyContent: 'center' }}
        >
          <FaGithub size={18} /> View on GitHub
        </a>
      </div>

      {/* Global CSS overrides for desktop/mobile hamburger */}
      <style jsx global>{`
        @media (max-width: 1024px) {
          .desktop-menu {
            display: none !important;
          }
          .mobile-hamburger {
            display: block !important;
          }
        }
      `}</style>
    </>
  );
}
