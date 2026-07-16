'use client';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer style={{ 
      padding: '60px 8%', 
      borderTop: '1px solid var(--border-subtle)', 
      background: 'rgba(5, 5, 5, 0.8)',
      textAlign: 'center',
      backdropFilter: 'blur(10px)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <Logo scale={0.8} />
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
        <a href="https://github.com/akhiljithvg/Dr.street.git" target="_blank" rel="noreferrer" style={{
          color: 'var(--text-primary)', textDecoration: 'none', transition: 'color 0.3s'
        }} onMouseEnter={(e) => e.target.style.color = 'var(--accent-neon)'} onMouseLeave={(e) => e.target.style.color = 'var(--text-primary)'}>
          GitHub Repository
        </a>
      </div>
      <p style={{ marginTop: '40px', fontSize: '0.8rem', color: '#555' }}>
        © {new Date().getFullYear()} Dr.Street. All rights reserved.
      </p>
    </footer>
  );
}
