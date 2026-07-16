'use client';

import dynamic from 'next/dynamic';

const ThreeDemo = dynamic(() => import('@/components/3'), {
  ssr: false,
});

export default function PreviewPage() {
  return (
    <main style={{ width: '100vw', height: '100vh', overflow: 'hidden', margin: 0, padding: 0, position: 'relative' }}>
      <div style={{ position: 'absolute', top: 20, left: 20, zIndex: 1000, color: '#00ff44', background: '#000', padding: '10px 20px', border: '1px solid #00ff44', fontFamily: 'monospace' }}>
        PREVIEW DIAGNOSTIC ACTIVE: PAGE RENDER SUCCESSFUL
      </div>
      <ThreeDemo />
    </main>
  );
}
