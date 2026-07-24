'use client';

import { useState, useEffect } from 'react';
import { 
  Search, 
  RotateCcw, 
  Cpu, 
  Eye, 
  Zap, 
  Cable, 
  Layers, 
  ListTodo, 
  Info,
  Check
} from 'lucide-react';

const CATEGORIES = [
  { id: 'all', name: 'All Components', icon: <ListTodo size={16} /> },
  { id: 'computing', name: 'Computing', icon: <Cpu size={16} /> },
  { id: 'actuation', name: 'Chassis & Motors', icon: <Layers size={16} /> },
  { id: 'perception', name: 'Sensing & Optics', icon: <Eye size={16} /> },
  { id: 'power', name: 'Power & Safety', icon: <Zap size={16} /> },
  { id: 'wiring', name: 'Wiring & Tools', icon: <Cable size={16} /> },
];

const INITIAL_ITEMS = [
  {
    id: 'rpi',
    category: 'computing',
    name: 'Raspberry Pi 4B',
    qty: 1,
    desc: 'Main computing processor. Runs ROS 2 nodes, computer vision algorithms, and high-level control loops.',
    spec: 'Broadcom BCM2711, Quad core Cortex-A72',
    tip: 'Make sure you have a suitable heatsink or fan installed.',
    image: '/components/rpi_4b.png'
  },
  {
    id: 'esp32',
    category: 'computing',
    name: 'ESP32',
    qty: 1,
    desc: 'Low-latency microcontroller to handle real-time motor PWM command actuation and timing.',
    spec: 'ESP32-WROOM-32 Development Board',
    tip: 'Unplug the RX/TX pins when flashing to prevent conflicts.',
    image: '/components/esp32.png'
  },
  {
    id: 'l298n',
    category: 'actuation',
    name: 'L298N',
    qty: 1,
    desc: 'Dual H-bridge controller that translates low-power logic into high-power motor outputs.',
    spec: 'Dual-channel, supports 5V-35V peak current drive.',
    tip: 'Ensure the onboard 5V regulator jumper is kept intact.',
    image: '/components/l298n.png'
  },
  {
    id: 'hw688',
    category: 'power',
    name: 'HW 688 [Buck Converter]',
    qty: 1,
    desc: 'Step-down DC-DC converter module for stabilizing logic level voltages.',
    spec: 'Adjustable output buck converter',
    tip: 'Always tune the output voltage with a multimeter before connecting it to the Pi.',
    image: '/components/hw_688.png'
  },
  {
    id: 'hp_camera',
    category: 'perception',
    name: 'HP USB Camera',
    qty: 1,
    desc: 'Real-time video feed intake for OpenCV-based lane detection/road perception.',
    spec: 'High framerate USB webcam',
    tip: 'Calibrate the camera tilt angle to capture 30cm to 60cm in front.',
    image: '/components/hp_usb_camera.png'
  },
  {
    id: 'lipo',
    category: 'power',
    name: '11.1V Lipo Battery 2200 mAh + XT60 connector',
    qty: 1,
    desc: 'Dedicated high-discharge motor driver voltage supply.',
    spec: '3-Cell (3S) LiPo, 2200mAh',
    tip: 'Always use a balance charger for multi-cell Lithium batteries.',
    image: '/components/lipo_battery.png'
  },
  {
    id: 'motors',
    category: 'actuation',
    name: 'BO Motors x4 + [wheels 65mm] + clamps x4',
    qty: 4,
    desc: 'Differential drive propulsion. Converts motor shaft rotation to chassis movement.',
    spec: 'Yellow BO gear motors with 65mm rubber wheels and mounting clamps.',
    tip: 'Attach small 0.1μF ceramic capacitors across terminals to suppress RF noise.',
    image: '/components/bo_motors.png'
  },
  {
    id: 'cable',
    category: 'wiring',
    name: 'USB to C-Type Cable',
    qty: 1,
    desc: 'High-quality data and power cable for microcontroller communication.',
    spec: 'USB-A to USB-C',
    tip: 'Ensure the cable supports data transfer, not just charging.',
    image: '/components/usb_c_cable.png'
  },
  {
    id: 'sdcard',
    category: 'computing',
    name: 'Micro SD card + card reader',
    qty: 1,
    desc: 'Storage media to host the Ubuntu OS and ROS 2 workspace installation.',
    spec: '32GB+ Class 10 / U3 card and USB reader',
    tip: 'Keep a backup image of your SD card configured so you can easily restore it.',
    image: '/components/sd_card.png'
  },
  {
    id: 'chassis',
    category: 'actuation',
    name: 'Acrylic chassis 11x20 cm',
    qty: 1,
    desc: 'Base plate frame holding all electronic and mechanical components.',
    spec: '11x20 cm clear or black acrylic',
    tip: 'Do not overtighten screws on acrylic to prevent cracking.',
    image: '/components/acrylic_chassis.png'
  },
  {
    id: 'hardware',
    category: 'wiring',
    name: 'Standoffs [M3x40mm] + screws [M3x15mm + M3x25mm] + nuts [M3] + camera screw [1/4"-20 UNC]',
    qty: 1,
    desc: 'Assorted mechanical mounting hardware for securing all electronics.',
    spec: 'Brass or nylon M3 standoffs and standard 1/4 inch camera mount.',
    tip: 'Use nylon standoffs near the Raspberry Pi GPIO pins to prevent accidental shorts.',
    image: '/components/standoffs_screws.png'
  },
  {
    id: 'jumper',
    category: 'wiring',
    name: 'Jumper wires',
    qty: 1,
    desc: 'Assorted patch cables to wire up microcontroller connections.',
    spec: 'Male-to-Male, Female-to-Female, Male-to-Female',
    tip: 'Use standard color-coding (Red for VCC, Black for GND) to simplify debugging.',
    image: '/components/jumper_wires.png'
  },
  {
    id: 'switch',
    category: 'power',
    name: 'Switch',
    qty: 1,
    desc: 'Physical power cutoff switch. Wired in series on the battery pack.',
    spec: 'Electronic toggle or rocker switch',
    tip: 'Mount this switch in a highly accessible spot for quick emergency shutdown.',
    image: '/components/switch.png'
  },
  {
    id: 'screwdriver',
    category: 'wiring',
    name: 'Screw driver',
    qty: 1,
    desc: 'Precision tool for assembling standoffs, motor clamps, and electronic terminals.',
    spec: 'Cross-head precision screwdriver',
    tip: 'A magnetic tip helps immensely when working with tiny M3 nuts and screws.',
    image: '/components/screwdriver.png'
  }
];

export default function Checklist() {
  const [items, setItems] = useState(INITIAL_ITEMS);
  const [checkedIds, setCheckedIds] = useState({});
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [hydrated, setHydrated] = useState(false);

  // Load checklist state from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('dr_street_checklist_state');
      if (saved) {
        setCheckedIds(JSON.parse(saved));
      }
    } catch (e) {
      console.warn('localStorage not available', e);
    }
    setHydrated(true);
  }, []);

  // Sync to localStorage
  const toggleCheck = (id) => {
    setCheckedIds((prev) => {
      const nextChecked = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem('dr_street_checklist_state', JSON.stringify(nextChecked));
      } catch (e) {
        console.warn('localStorage not available', e);
      }
      return nextChecked;
    });
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to clear all progress?')) {
      setCheckedIds({});
      try {
        localStorage.removeItem('dr_street_checklist_state');
      } catch (e) {
        console.warn('localStorage not available', e);
      }
    }
  };

  const filteredItems = items.filter(item => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.spec.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const totalCount = items.length;
  const checkedCount = hydrated ? items.filter(i => checkedIds[i.id]).length : 0;
  const progressPercent = totalCount > 0 ? Math.round((checkedCount / totalCount) * 100) : 0;

  return (
    <section id="checklist" style={{ background: '#090909', padding: '40px 0' }}>
      <div className="section-header">
        <h2 className="section-title">
          Kit Components <span>Checklist</span>
        </h2>
        <p className="section-desc">
          Verify and check off your parts before starting the hardware assembly process. Your progress is saved automatically.
        </p>
      </div>

      {/* Progress Card */}
      <div 
        className="glassmorphism subtle-border"
        style={{
          padding: '24px 30px',
          borderRadius: '16px',
          marginBottom: '35px',
          display: 'flex',
          flexDirection: 'column',
          gap: '15px'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <h3 style={{ color: '#fff', fontSize: '1.2rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ListTodo size={20} color="var(--accent-neon)" /> Assembly Readiness Progress
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '4px' }}>
              {checkedCount} of {totalCount} components verified and marked
            </p>
          </div>
          
          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={handleReset}
              style={{
                background: 'rgba(255, 255, 255, 0.02)',
                color: 'var(--text-secondary)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                padding: '8px 14px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '0.8rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(255, 59, 48, 0.3)'; e.currentTarget.style.color = '#ff3b30'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
            >
              <RotateCcw size={14} />
              Reset Checklist
            </button>
          </div>
        </div>

        {/* Progress Bar Track */}
        <div style={{ background: 'rgba(255, 255, 255, 0.05)', borderRadius: '10px', height: '10px', width: '100%', overflow: 'hidden' }}>
          <div 
            style={{ 
              background: 'linear-gradient(90deg, var(--accent-emerald), var(--accent-neon))', 
              height: '100%', 
              width: `${progressPercent}%`, 
              transition: 'width 0.5s ease-out',
              borderRadius: '10px',
              boxShadow: '0 0 10px rgba(0, 128, 0, 0.5)'
            }} 
          />
        </div>
        <span style={{ fontSize: '0.8rem', color: 'var(--accent-neon)', fontWeight: 700, alignSelf: 'flex-end' }}>
          {progressPercent}% Complete
        </span>
      </div>

      {/* Filter and Search Bar */}
      <div 
        style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '20px', 
          marginBottom: '30px'
        }}
      >
        <div 
          style={{
            display: 'flex',
            position: 'relative',
            alignItems: 'center',
            maxWidth: '450px',
            width: '100%'
          }}
        >
          <Search size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '16px' }} />
          <input
            type="text"
            placeholder="Search kit parts by name or keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              background: 'var(--surface)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '8px',
              padding: '12px 16px 12px 45px',
              color: '#fff',
              fontSize: '0.9rem',
              transition: 'all 0.25s'
            }}
            onFocus={(e) => e.target.style.borderColor = 'var(--accent-neon)'}
            onBlur={(e) => e.target.style.borderColor = 'var(--border-subtle)'}
          />
        </div>

        {/* Category Tabs */}
        <div 
          style={{
            display: 'flex',
            gap: '8px',
            overflowX: 'auto',
            paddingBottom: '8px',
            scrollbarWidth: 'thin'
          }}
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: activeCategory === cat.id ? 'var(--accent-neon)' : 'var(--surface)',
                color: activeCategory === cat.id ? '#000' : 'var(--text-secondary)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                padding: '8px 16px',
                borderRadius: '20px',
                cursor: 'pointer',
                fontSize: '0.85rem',
                fontWeight: 600,
                whiteSpace: 'nowrap',
                transition: 'all 0.25s'
              }}
              onMouseEnter={(e) => {
                if (activeCategory !== cat.id) {
                  e.currentTarget.style.borderColor = 'var(--border-hover)';
                  e.currentTarget.style.color = '#fff';
                }
              }}
              onMouseLeave={(e) => {
                if (activeCategory !== cat.id) {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)';
                  e.currentTarget.style.color = 'var(--text-secondary)';
                }
              }}
            >
              {cat.icon}
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of items */}
      {filteredItems.length === 0 ? (
        <div style={{ padding: '60px 20px', textAlign: 'center', color: 'var(--text-secondary)' }}>
          <p>No components match your current filter and search criteria.</p>
        </div>
      ) : (
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '16px'
          }}>
          {filteredItems.map((item) => {
            const isChecked = hydrated && !!checkedIds[item.id];
            return (
              <div 
                key={item.id}
                className="subtle-border"
                onClick={() => toggleCheck(item.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleCheck(item.id);
                  }
                }}
                style={{
                  borderRadius: '12px',
                  background: isChecked ? 'rgba(0, 128, 0, 0.03)' : 'var(--surface)',
                  padding: '16px',
                  cursor: 'pointer',
                  border: isChecked ? '1px solid rgba(57, 255, 20, 0.3)' : '1px solid var(--border-subtle)',
                  transition: 'all 0.25s',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                  userSelect: 'none'
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {/* Image Display Header */}
                  <div style={{ width: '100%', height: '100px', borderRadius: '8px', overflow: 'hidden', background: '#000', position: 'relative', border: '1px solid rgba(255,255,255,0.05)' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: isChecked ? 0.6 : 0.9, filter: isChecked ? 'grayscale(100%)' : 'none', transition: 'all 0.3s' }} onError={(e) => { e.currentTarget.src = 'https://placehold.co/400x200/0a0a0a/008000?text=Render+Pending' }} />
                    <div style={{ position: 'absolute', top: '10px', left: '10px', background: 'rgba(0,0,0,0.8)', padding: '4px 8px', borderRadius: '4px', fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      {item.category}
                    </div>
                    {/* Interactive Check Indicator */}
                    <div 
                      style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        width: '24px',
                        height: '24px',
                        borderRadius: '6px',
                        border: isChecked ? '1px solid var(--accent-neon)' : '1px solid var(--border-hover)',
                        background: isChecked ? 'var(--accent-neon)' : 'rgba(0,0,0,0.5)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.2s',
                        zIndex: 2
                      }}
                    >
                      <div 
                        style={{ 
                          position: 'absolute', 
                          opacity: 0, 
                          width: '100%', 
                          height: '100%', 
                          cursor: 'pointer' 
                        }} 
                      />
                      {isChecked && <Check size={14} color="#000" strokeWidth={3} />}
                    </div>
                  </div>

                  <div>
                    <h4 style={{ color: '#fff', fontSize: '0.95rem', fontWeight: 600, marginTop: '2px' }}>
                      {item.name}
                    </h4>
                  </div>
                </div>

                <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', lineHeight: 1.4, flexGrow: 1 }}>
                  {item.desc}
                </p>

                {/* Specs Info Badge */}
                <div style={{ display: 'flex', gap: '10px', fontSize: '0.72rem', color: '#888', background: 'rgba(255, 255, 255, 0.02)', padding: '6px 10px', borderRadius: '6px' }}>
                  <span style={{ fontWeight: 600, color: 'var(--accent-neon)' }}>QTY: {item.qty}</span>
                  <span style={{ borderLeft: '1px solid rgba(255, 255, 255, 0.1)', paddingLeft: '10px' }}>{item.spec}</span>
                </div>

                {/* Protip Accordion */}
                <div style={{ marginTop: '2px', borderTop: '1px solid rgba(255,255,255,0.03)', paddingTop: '8px', display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                  <Info size={14} color="var(--text-muted)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontStyle: 'italic', lineHeight: 1.3 }}>
                    <strong>Pro Tip:</strong> {item.tip}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
