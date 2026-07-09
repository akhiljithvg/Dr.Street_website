import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export default function DocFooter({ prev, next }) {
  return (
    <div 
      style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginTop: '60px',
        paddingTop: '24px',
        borderTop: '1px solid var(--border-subtle)'
      }}
    >
      <div style={{ flex: 1 }}>
        {prev && (
          <Link href={prev.href} style={{ textDecoration: 'none' }}>
            <div 
              className="doc-nav-card"
              style={{
                display: 'inline-flex',
                flexDirection: 'column',
                gap: '8px',
                padding: '16px 24px',
                borderRadius: '8px',
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid var(--border-subtle)',
                transition: 'all 0.2s ease',
              }}
            >
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <ArrowLeft size={14} /> Previous
              </span>
              <span style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.95rem' }}>
                {prev.title}
              </span>
            </div>
          </Link>
        )}
      </div>

      <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
        {next && (
          <Link href={next.href} style={{ textDecoration: 'none' }}>
            <div 
              className="doc-nav-card"
              style={{
                display: 'inline-flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                gap: '8px',
                padding: '16px 24px',
                borderRadius: '8px',
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid var(--border-subtle)',
                transition: 'all 0.2s ease',
                textAlign: 'right'
              }}
            >
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                Next <ArrowRight size={14} />
              </span>
              <span style={{ color: 'var(--accent-neon)', fontWeight: 600, fontSize: '0.95rem' }}>
                {next.title}
              </span>
            </div>
          </Link>
        )}
      </div>
      
      <style jsx global>{`
        .doc-nav-card:hover {
          background: rgba(255,255,255,0.05) !important;
          border-color: rgba(255,255,255,0.2) !important;
          transform: translateY(-2px);
        }
      `}</style>
    </div>
  );
}
