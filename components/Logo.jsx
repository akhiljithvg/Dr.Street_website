export default function Logo({ scale = 1 }) {
  
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: `${15 * scale}px` }}>
      {/* Steering Wheel Icon */}
      <svg 
        width={50 * scale} 
        height={50 * scale} 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        style={{ flexShrink: 0 }}
      >
        {/* Dark grey full ring base */}
        <circle cx="50" cy="50" r="40" stroke="#1A1A1A" strokeWidth="12" />
        
        {/* Neon green accents on the ring (top left and top right arcs) */}
        <path d="M 12 38 A 40 40 0 0 1 20 20" stroke="#008000" strokeWidth="12" strokeLinecap="butt" fill="none" />
        <path d="M 88 38 A 40 40 0 0 0 80 20" stroke="#008000" strokeWidth="12" strokeLinecap="butt" fill="none" />

        {/* Center circle */}
        <circle cx="50" cy="50" r="12" fill="#1A1A1A" stroke="#008000" strokeWidth="2" />

        {/* Left spoke */}
        <path d="M 15 55 Q 35 55 38 50" stroke="#1A1A1A" strokeWidth="10" strokeLinecap="round" fill="none" />
        
        {/* Right spoke */}
        <path d="M 85 55 Q 65 55 62 50" stroke="#1A1A1A" strokeWidth="10" strokeLinecap="round" fill="none" />
        
        {/* Bottom spoke */}
        <path d="M 50 62 L 50 85" stroke="#1A1A1A" strokeWidth="12" fill="none" />
      </svg>

      {/* Text Part */}
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <h1 style={{
          fontFamily: "'Outfit', sans-serif",
          fontWeight: 900,
          fontSize: `${2.2 * scale}rem`,
          color: '#fff',
          letterSpacing: '0.02em',
          lineHeight: 1,
          margin: 0,
        }}>
          DR. STREET
        </h1>
        <span style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: `${0.7 * scale}rem`,
          fontWeight: 600,
          color: '#008000',
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          marginTop: `${2 * scale}px`,
        }}>
          Autonomous Robot
        </span>
      </div>
    </div>
  );
}
