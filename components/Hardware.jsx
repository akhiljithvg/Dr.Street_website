'use client';

import { useState } from 'react';
import { Clipboard, Check, AlertTriangle, AlertCircle, ShieldAlert } from 'lucide-react';

function CodeBlock({ code, language = 'cpp' }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{
      background: '#060606',
      borderRadius: '10px',
      border: '1px solid rgba(255,255,255,0.06)',
      overflow: 'hidden',
      marginTop: '15px',
      fontFamily: "'Courier New', Courier, monospace",
      position: 'relative'
    }}>
      <div style={{
        background: '#0d0d0d',
        padding: '10px 16px',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        fontSize: '0.72rem',
        color: '#666',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <span>{language}</span>
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
      <pre style={{
        padding: '18px',
        margin: 0,
        overflowX: 'auto',
        fontSize: '0.82rem',
        color: '#a0a0a0',
        lineHeight: 1.5
      }}><code>{code}</code></pre>
    </div>
  );
}

export default function Hardware() {
  const [activeTab, setActiveTab] = useState('optionA');

  const firmwareCode = `// ESP32 Differential Drive Motor Controller Firmware
#include <Arduino.h>

// Define motor pins on ESP32
const int LEFT_F = 12; 
const int LEFT_B = 13;
const int RIGHT_F = 14; 
const int RIGHT_B = 15;

// PWM configuration
const int freq = 5000;
const int res = 8; // 8-bit resolution (0-255)

void setup() {
  Serial.begin(115200);

  // Initialize LEDC PWM channels 0-3
  ledcSetup(0, freq, res);
  ledcSetup(1, freq, res);
  ledcSetup(2, freq, res);
  ledcSetup(3, freq, res);

  // Attach GPIO pins to PWM channels
  ledcAttachPin(LEFT_F, 0);
  ledcAttachPin(LEFT_B, 1);
  ledcAttachPin(RIGHT_F, 2);
  ledcAttachPin(RIGHT_B, 3);
}

void loop() {
  if (Serial.available() > 0) {
    // Read command packet: e.g. "120,-150\\n"
    String data = Serial.readStringUntil('\\n');
    int commaIndex = data.indexOf(',');
    
    if (commaIndex > 0) {
      int left = data.substring(0, commaIndex).toInt();
      int right = data.substring(commaIndex + 1).toInt();
      
      // Drive Left Motor (Channel 0/1)
      ledcWrite(0, (left > 0) ? left : 0);
      ledcWrite(1, (left < 0) ? abs(left) : 0);
      
      // Drive Right Motor (Channel 2/3)
      ledcWrite(2, (right > 0) ? right : 0);
      ledcWrite(3, (right < 0) ? abs(right) : 0);
    }
  }
}`;

  return (
    <section id="hardware" style={{ background: '#090909' }}>
      <div className="section-header">
        <h2 className="section-title">
          Assembly & <span>Wiring</span>
        </h2>
        <p className="section-desc">
          How to wire and assemble the physical systems of the Dr.Street autonomous robot. Two primary configurations are supported.
        </p>
      </div>

      {/* Tabs Selector */}
      <div 
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '12px',
          margin: '25px 0',
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
          paddingBottom: '15px'
        }}
      >
        <button
          onClick={() => setActiveTab('optionA')}
          style={{
            background: activeTab === 'optionA' ? 'var(--accent-neon)' : 'rgba(255, 255, 255, 0.02)',
            color: activeTab === 'optionA' ? '#000' : 'var(--text-secondary)',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '0.88rem',
            fontWeight: 600,
            transition: 'all 0.25s'
          }}
        >
          Option A: ESP32 Co-Processor (Recommended)
        </button>
        <button
          onClick={() => setActiveTab('optionB')}
          style={{
            background: activeTab === 'optionB' ? 'var(--accent-neon)' : 'rgba(255, 255, 255, 0.02)',
            color: activeTab === 'optionB' ? '#000' : 'var(--text-secondary)',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '0.88rem',
            fontWeight: 600,
            transition: 'all 0.25s'
          }}
        >
          Option B: Direct Raspberry Pi Control
        </button>
      </div>

      {/* Tab Panels */}
      {activeTab === 'optionA' ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          <div>
            <h3 style={{ color: '#fff', fontSize: '1.25rem', marginBottom: '10px', fontWeight: 600 }}>ESP32 Serial Configuration</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.5 }}>
              This architecture offloads real-time PWM actuation to the ESP32. The Raspberry Pi runs high-level ROS 2 vision nodes and sends simple comma-separated motor commands over serial UART lines (TX/RX) at 115200 baud.
            </p>
          </div>

          {/* Option A Wiring Table */}
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem', textAlign: 'left', color: 'var(--text-secondary)' }} className="glassmorphism subtle-border">
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.08)', background: 'rgba(255, 255, 255, 0.01)' }}>
                  <th style={{ padding: '12px 16px', color: '#fff', fontWeight: 600 }}>Source Device</th>
                  <th style={{ padding: '12px 16px', color: '#fff', fontWeight: 600 }}>Source Pin</th>
                  <th style={{ padding: '12px 16px', color: '#fff', fontWeight: 600 }}>Target Device</th>
                  <th style={{ padding: '12px 16px', color: '#fff', fontWeight: 600 }}>Target Pin</th>
                  <th style={{ padding: '12px 16px', color: '#fff', fontWeight: 600 }}>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.04)' }}>
                  <td style={{ padding: '12px 16px' }}><strong>Raspberry Pi</strong></td>
                  <td style={{ padding: '12px 16px' }}>GPIO 14 (TXD)</td>
                  <td style={{ padding: '12px 16px' }}><strong>ESP32</strong></td>
                  <td style={{ padding: '12px 16px' }}>RX0 (GPIO 3)</td>
                  <td style={{ padding: '12px 16px' }}>Serial communication command link</td>
                </tr>
                <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.04)' }}>
                  <td style={{ padding: '12px 16px' }}><strong>Raspberry Pi</strong></td>
                  <td style={{ padding: '12px 16px' }}>GPIO 15 (RXD)</td>
                  <td style={{ padding: '12px 16px' }}><strong>ESP32</strong></td>
                  <td style={{ padding: '12px 16px' }}>TX0 (GPIO 1)</td>
                  <td style={{ padding: '12px 16px' }}>Serial communication feedback link</td>
                </tr>
                <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.04)' }}>
                  <td style={{ padding: '12px 16px' }}><strong>Raspberry Pi</strong></td>
                  <td style={{ padding: '12px 16px' }}>GND</td>
                  <td style={{ padding: '12px 16px' }}><strong>ESP32</strong></td>
                  <td style={{ padding: '12px 16px' }}>GND</td>
                  <td style={{ padding: '12px 16px' }}>Reference ground (Critical)</td>
                </tr>
                <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.04)' }}>
                  <td style={{ padding: '12px 16px' }}><strong>ESP32</strong></td>
                  <td style={{ padding: '12px 16px' }}>GPIO 14 (OUT)</td>
                  <td style={{ padding: '12px 16px' }}><strong>Motor Driver</strong></td>
                  <td style={{ padding: '12px 16px' }}>IN1</td>
                  <td style={{ padding: '12px 16px' }}>Right motor forward PWM trigger</td>
                </tr>
                <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.04)' }}>
                  <td style={{ padding: '12px 16px' }}><strong>ESP32</strong></td>
                  <td style={{ padding: '12px 16px' }}>GPIO 15 (OUT)</td>
                  <td style={{ padding: '12px 16px' }}><strong>Motor Driver</strong></td>
                  <td style={{ padding: '12px 16px' }}>IN2</td>
                  <td style={{ padding: '12px 16px' }}>Right motor reverse PWM trigger</td>
                </tr>
                <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.04)' }}>
                  <td style={{ padding: '12px 16px' }}><strong>ESP32</strong></td>
                  <td style={{ padding: '12px 16px' }}>GPIO 12 (OUT)</td>
                  <td style={{ padding: '12px 16px' }}><strong>Motor Driver</strong></td>
                  <td style={{ padding: '12px 16px' }}>IN3</td>
                  <td style={{ padding: '12px 16px' }}>Left motor forward PWM trigger</td>
                </tr>
                <tr>
                  <td style={{ padding: '12px 16px' }}><strong>ESP32</strong></td>
                  <td style={{ padding: '12px 16px' }}>GPIO 13 (OUT)</td>
                  <td style={{ padding: '12px 16px' }}><strong>Motor Driver</strong></td>
                  <td style={{ padding: '12px 16px' }}>IN4</td>
                  <td style={{ padding: '12px 16px' }}>Left motor reverse PWM trigger</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Warning Boxes */}
          <div 
            style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
              gap: '20px' 
            }}
          >
            <div style={{ border: '1px solid rgba(255, 59, 48, 0.2)', background: 'rgba(255, 59, 48, 0.03)', borderRadius: '12px', padding: '20px', display: 'flex', gap: '15px' }}>
              <AlertTriangle style={{ color: '#ff3b30', flexShrink: 0 }} size={24} />
              <div>
                <h5 style={{ color: '#ff3b30', fontWeight: 600, fontSize: '0.9rem', marginBottom: '4px' }}>Common Ground Reference</h5>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                  Ensure a common ground cable connects the Raspberry Pi GND, ESP32 GND, and Motor Driver GND. Without a shared ground reference, serial packets will be corrupted and motors will run erratically.
                </p>
              </div>
            </div>
            <div style={{ border: '1px solid rgba(255, 204, 0, 0.2)', background: 'rgba(255, 204, 0, 0.03)', borderRadius: '12px', padding: '20px', display: 'flex', gap: '15px' }}>
              <AlertCircle style={{ color: '#ffcc00', flexShrink: 0 }} size={24} />
              <div>
                <h5 style={{ color: '#ffcc00', fontWeight: 600, fontSize: '0.9rem', marginBottom: '4px' }}>USB Programming Conflict</h5>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                  Pins 1 (TX0) and 3 (RX0) are shared with the ESP32 onboard USB programmer. You must temporarily disconnect the TX/RX links to the Raspberry Pi when uploading code from your computer.
                </p>
              </div>
            </div>
          </div>

          {/* Firmware Code Block */}
          <div>
            <h4 style={{ color: '#fff', fontSize: '1.1rem', fontWeight: 600 }}>ESP32 Actuation Firmware</h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginTop: '4px' }}>
              Upload this C++ program to the ESP32 via Arduino IDE. It listens for `left_speed,right_speed\n` commands at 115200 baud.
            </p>
            <CodeBlock code={firmwareCode} />
          </div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '35px' }}>
          <div>
            <h3 style={{ color: '#fff', fontSize: '1.25rem', marginBottom: '10px', fontWeight: 600 }}>Direct GPIO Configuration</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.5 }}>
              For simpler builds without an intermediate co-processor, you can connect the motor driver (L298N) directly to the Raspberry Pi's GPIO pins. The `dr_street_motor` ROS 2 package is preconfigured to actuate via this wiring.
            </p>
          </div>

          {/* Option B Wiring Table */}
          <div style={{ overflowX: 'auto', maxWidth: '600px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem', textAlign: 'left', color: 'var(--text-secondary)' }} className="glassmorphism subtle-border">
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.08)', background: 'rgba(255, 255, 255, 0.01)' }}>
                  <th style={{ padding: '12px 16px', color: '#fff', fontWeight: 600 }}>Raspberry Pi Pin (BCM)</th>
                  <th style={{ padding: '12px 16px', color: '#fff', fontWeight: 600 }}>Motor Driver Pin</th>
                  <th style={{ padding: '12px 16px', color: '#fff', fontWeight: 600 }}>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.04)' }}>
                  <td style={{ padding: '12px 16px' }}><strong>GPIO 20</strong></td>
                  <td style={{ padding: '12px 16px' }}>IN1 (Right Motor Forward)</td>
                  <td style={{ padding: '12px 16px' }}>Actuates right motor forward rotation</td>
                </tr>
                <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.04)' }}>
                  <td style={{ padding: '12px 16px' }}><strong>GPIO 21</strong></td>
                  <td style={{ padding: '12px 16px' }}>IN2 (Right Motor Reverse)</td>
                  <td style={{ padding: '12px 16px' }}>Actuates right motor backward rotation</td>
                </tr>
                <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.04)' }}>
                  <td style={{ padding: '12px 16px' }}><strong>GPIO 16</strong></td>
                  <td style={{ padding: '12px 16px' }}>IN3 (Left Motor Forward)</td>
                  <td style={{ padding: '12px 16px' }}>Actuates left motor forward rotation</td>
                </tr>
                <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.04)' }}>
                  <td style={{ padding: '12px 16px' }}><strong>GPIO 12</strong></td>
                  <td style={{ padding: '12px 16px' }}>IN4 (Left Motor Reverse)</td>
                  <td style={{ padding: '12px 16px' }}>Actuates left motor backward rotation</td>
                </tr>
                <tr>
                  <td style={{ padding: '12px 16px' }}><strong>GND</strong></td>
                  <td style={{ padding: '12px 16px' }}>GND</td>
                  <td style={{ padding: '12px 16px' }}>Common logic reference ground</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Safety Section */}
      <div 
        className="glassmorphism subtle-border"
        style={{
          marginTop: '40px',
          padding: '30px',
          borderRadius: '24px',
          border: '1px solid rgba(0, 200, 83, 0.1)',
          background: 'radial-gradient(circle at 10% 20%, rgba(57, 255, 20, 0.01) 0%, transparent 60%)'
        }}
      >
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center', marginBottom: '15px' }}>
          <ShieldAlert style={{ color: 'var(--accent-neon)' }} size={26} />
          <h3 style={{ color: '#fff', fontSize: '1.3rem', fontWeight: 600 }}>Power Distribution & Safety Guidelines</h3>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
          <p>
            1. <strong>Dual Power Rail Isolation</strong>: DC motors draw high spikes of current when starting or changing directions, generating inductive back-EMF noise. To prevent logic resets on the Raspberry Pi or ESP32, power the computing board with a dedicated power bank (5V/3A) and the motor driver using a separate battery pack (e.g. 7.4V Li-ion or 11.1V LiPo).
          </p>
          <p>
            2. <strong>Logic Level Verification</strong>: The Raspberry Pi and ESP32 operate on 3.3V logic signals. Standard H-bridge drivers (like the L298N) have logic thresholds that trigger reliably on 3.3V, but double check your specific driver specs before powering on.
          </p>
          <p>
            3. <strong>Emergency Mechanical Cutoff</strong>: Always install a physical power toggle switch directly on the positive (+) motor power line. This lets you immediately cut power to the drive wheels if the autonomy code behaves unexpectedly during testing.
          </p>
        </div>
      </div>
    </section>
  );
}
