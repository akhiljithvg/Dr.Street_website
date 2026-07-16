'use client';

import { useState } from 'react';
import { Clipboard, Check, Terminal, Cpu } from 'lucide-react';

function TerminalBlock({ code }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div 
      style={{
        background: '#060606',
        borderRadius: '10px',
        border: '1px solid rgba(255,255,255,0.06)',
        overflow: 'hidden',
        marginTop: '12px',
        fontFamily: "'Courier New', Courier, monospace",
        position: 'relative',
        minWidth: 0
      }}
    >
      <div 
        style={{
          background: '#0d0d0d',
          padding: '8px 16px',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
          fontSize: '0.72rem',
          color: '#666',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <span>bash</span>
        <button 
          onClick={handleCopy}
          style={{
            background: 'transparent',
            border: 'none',
            color: copied ? 'var(--accent-neon)' : '#666',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            fontSize: '0.72rem',
            transition: 'color 0.2s'
          }}
        >
          {copied ? <Check size={12} /> : <Clipboard size={12} />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <pre 
        style={{
          padding: '16px',
          margin: 0,
          overflowX: 'auto',
          fontSize: '0.82rem',
          color: '#a0a0a0',
          lineHeight: 1.45
        }}
      ><code>{code}</code></pre>
    </div>
  );
}

export default function Features() {
  const steps = [
    {
      num: '1.1',
      title: 'Initial System Update',
      desc: 'Connect to the Pi via SSH or local console and update the package list and system binaries to ensure safety and dependency compatibility.',
      code: 'sudo apt update && sudo apt upgrade -y'
    },
    {
      num: '1.2',
      title: 'Install Essential Development Tools',
      desc: 'Install the base compilers, Cmake toolchain, Git, curl/wget, and text editors required to compile ROS packages and edit configurations.',
      code: 'sudo apt install -y build-essential cmake git wget curl python3 python3-pip python3-dev vim nano'
    },
    {
      num: '1.3',
      title: 'Install Python Core Dependencies',
      desc: 'Upgrade python pip manager and install core libraries required for lane detection algorithms (OpenCV), math matrices (NumPy), and ESP32 board communication.',
      code: 'python3 -m pip install --upgrade pip\npython3 -m pip install --user opencv-python numpy pyserial'
    },
    {
      num: '1.4',
      title: 'Verify System Configuration',
      desc: 'Check compiled versions of primary tools to confirm that path routing and dependency setup is correct.',
      code: 'python3 --version\npip3 --version\ngit --version\ngcc --version'
    },
    {
      num: '1.5',
      title: 'Configure Git Credentials',
      desc: 'Configure Git version control credentials on the robot local server so you can commit and push project branches directly from the workspace.',
      code: 'git config --global user.name "Your Name"\ngit config --global user.email "your.email@university.edu"'
    }
  ];

  return (
    <section id="ubuntu-setup" style={{ background: '#090909' }}>
      <div className="section-header">
        <h2 className="section-title">
          Ubuntu Server <span>Setup</span>
        </h2>
        <p className="section-desc">
          Step-by-step instructions for provisioning a fresh Ubuntu 24.04 LTS installation on the robot's primary compute system.
        </p>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '30px',
          marginTop: '30px',
          maxWidth: '850px',
          margin: '30px auto 0 auto'
        }}
      >
        {steps.map((s, idx) => (
          <div 
            key={idx}
            className="setup-card glassmorphism subtle-border"
            style={{
              padding: '28px',
              borderRadius: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              transition: 'border-color 0.3s',
              minWidth: 0
            }}
          >
            {/* Header row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span 
                style={{ 
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: '0.78rem',
                  color: 'var(--accent-neon)',
                  fontWeight: 800,
                  letterSpacing: '0.05em',
                  background: 'rgba(57, 255, 20, 0.05)',
                  padding: '4px 10px',
                  borderRadius: '4px',
                  border: '1px solid rgba(57, 255, 20, 0.15)'
                }}
              >
                PART {s.num}
              </span>
              <h3 style={{ fontSize: '1.15rem', color: '#fff', fontWeight: 600 }}>{s.title}</h3>
            </div>

            {/* Description */}
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              {s.desc}
            </p>

            {/* Terminal execution block */}
            <TerminalBlock code={s.code} />
          </div>
        ))}
      </div>

    </section>
  );
}
