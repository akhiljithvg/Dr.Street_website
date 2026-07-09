'use client';

import { useState } from 'react';
import { 
  Clipboard, 
  Check, 
  Terminal, 
  Settings, 
  Download, 
  PlayCircle,
  FileCode,
  FolderOpen
} from 'lucide-react';

function TerminalBlock({ code }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{
      background: '#060606',
      borderRadius: '8px',
      border: '1px solid rgba(255,255,255,0.06)',
      overflow: 'hidden',
      marginTop: '10px',
      fontFamily: "'Courier New', Courier, monospace",
      position: 'relative'
    }}>
      <div style={{
        background: '#0d0d0d',
        padding: '6px 12px',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        fontSize: '0.72rem',
        color: '#555',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <span>bash</span>
        <button 
          onClick={handleCopy}
          style={{
            background: 'transparent',
            border: 'none',
            color: copied ? 'var(--accent-neon)' : '#555',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            fontSize: '0.72rem',
            transition: 'color 0.2s'
          }}
        >
          {copied ? <Check size={11} /> : <Clipboard size={11} />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <pre style={{
        padding: '12px 16px',
        margin: 0,
        overflowX: 'auto',
        fontSize: '0.8rem',
        color: '#999',
        lineHeight: 1.4
      }}><code>{code}</code></pre>
    </div>
  );
}

export default function Software() {
  const steps = [
    {
      num: '01',
      icon: <FileCode size={22} />,
      title: 'Run Standalone Python Script',
      desc: 'Test your camera feed, OpenCV filters, and serial connections directly without ROS dependencies using the standalone prototyping script.',
      code: 'cd /home/pi/ak_ws/src/dr_street\npython3 followlaneesp.py'
    },
    {
      num: '02',
      icon: <Settings size={22} />,
      title: 'Configure ROS 2 Keyrings & Repositories',
      desc: 'Add the official ROS 2 Jazzy GPG security keys and configure your apt source list to access the ROS 2 packages.',
      code: 'sudo curl -sSL https://repo.ros2.org/ros.key -o /usr/share/keyrings/ros-archive-keyring.gpg\n\necho "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/ros-archive-keyring.gpg] http://repo.ros2.org/ubuntu $(. /etc/os-release && echo $UBUNTU_CODENAME) main" | sudo tee /etc/apt/sources.list.d/ros2.list > /dev/null\n\nsudo apt update'
    },
    {
      num: '03',
      icon: <Download size={22} />,
      title: 'Install ROS 2 Jazzy & Build Extension',
      desc: 'Install the core ROS 2 Jazzy desktop libraries along with colcon build extensions required to compile packages.',
      code: 'sudo apt install -y ros-jazzy-desktop python3-colcon-common-extensions'
    },
    {
      num: '04',
      icon: <Terminal size={22} />,
      title: 'Source Shell Environments',
      desc: 'Source the ROS 2 environment setup file to map global terminals, and add the configuration to your user profile for auto-sourcing.',
      code: 'source /opt/ros/jazzy/setup.bash\necho "source /opt/ros/jazzy/setup.bash" >> ~/.bashrc'
    },
    {
      num: '05',
      icon: <FolderOpen size={22} />,
      title: 'Build the Workspace Packages',
      desc: 'Navigate to your ROS 2 workspace root folder, run colcon build to compile the perception and bringup packages, and source the local install.',
      code: 'cd /home/pi/ak_ws\ncolcon build --packages-select dr_street_perception dr_street_bringup dr_street_motor dr_street_safety\n\nsource install/setup.bash'
    },
    {
      num: '06',
      icon: <PlayCircle size={22} />,
      title: 'Launch the Robot Systems',
      desc: 'Run the master launch configuration script to spin up the lane perception, safety nodes, and motor communications in a unified environment.',
      code: 'ros2 launch dr_street_bringup bringup.launch.py'
    }
  ];

  return (
    <section id="software" style={{ background: '#050505' }}>
      <div className="section-header">
        <h2 className="section-title">
          Software <span>Setup & Execution</span>
        </h2>
        <p className="section-desc">
          Follow this structured timeline to configure your Linux environment, install ROS 2 Jazzy, build packages, and launch autonomous scripts.
        </p>
      </div>

      <div
        style={{
          position: 'relative',
          maxWidth: '850px',
          margin: '40px auto 0 auto',
        }}
      >
        {/* Timeline connector thread */}
        <div
          style={{
            position: 'absolute',
            top: '20px',
            bottom: '20px',
            left: '30px',
            width: '2px',
            background: 'linear-gradient(to bottom, var(--accent-neon), var(--accent-emerald))',
          }}
          className="sw-line-thread"
        />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="sw-step-container"
              style={{
                display: 'flex',
                gap: '30px',
                position: 'relative',
                zIndex: 3,
              }}
            >
              {/* Stepper Dot */}
              <div
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: '#0a0a0a',
                  border: '1px solid var(--border-neon)',
                  color: 'var(--accent-neon)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0 15px rgba(57, 255, 20, 0.1)',
                  flexShrink: 0,
                  transition: 'all 0.3s',
                }}
                className="sw-step-dot"
              >
                {step.icon}
              </div>

              {/* Step Content */}
              <div
                className="glassmorphism subtle-border"
                style={{
                  padding: '28px',
                  borderRadius: '20px',
                  flexGrow: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: '0.82rem',
                      color: 'var(--accent-neon)',
                      fontWeight: 700,
                      letterSpacing: '0.05em',
                    }}
                  >
                    STEP {step.num}
                  </span>
                </div>
                <h3 style={{ fontSize: '1.2rem', color: '#fff', fontWeight: 600 }}>{step.title}</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  {step.desc}
                </p>

                {/* Copiable terminal block */}
                <TerminalBlock code={step.code} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        .sw-step-container:hover .sw-step-dot {
          background: var(--accent-neon);
          color: #000;
          box-shadow: 0 0 20px var(--accent-neon);
          transform: scale(1.05);
        }
      `}</style>
    </section>
  );
}
