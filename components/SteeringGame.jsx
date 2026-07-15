'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

// ─────────────── Constants ───────────────────────────────────────────────────
const TRACK_LEN    = 200;     // number of segments
const SEG_LEN      = 40;      // world units per segment (short = fast-feeling)
const ROAD_HALF    = 1.0;     // half-road width in world units (player X clamped to ±1)
const CAM_H        = 0.45;    // camera height in world units
const CAM_D        = 1.2;     // camera depth (FOV control)
const DRAW_DIST    = 180;     // segments to draw
const HORIZON_Y    = 0.42;    // horizon as fraction of canvas height
const MAX_SPEED    = 700;     // world units per second
const OBS_INTERVAL = 10;      // spawn one obstacle every N segments (varied)

// ─────────────── Build track ─────────────────────────────────────────────────
function buildTrack() {
  const segs = [];
  const add = (n, curve = 0, hill = 0) => {
    for (let i = 0; i < n; i++) segs.push({ curve, hill });
  };
  add(15); add(20, 0.6); add(15); add(20, -0.5); add(10, 0, 0.3);
  add(15); add(20, 0.4, 0.2); add(15); add(20, -0.6); add(10, 0, -0.2);
  add(15); add(20, 0.8); add(10); add(20, -0.4, 0.15); add(10);
  while (segs.length < TRACK_LEN) segs.push({ curve: 0, hill: 0 });
  return segs;
}
const TRACK = buildTrack();

// ─────────────── Spawn obstacles at fixed world-Z intervals ─────────────────
function buildObstacles() {
  const obs = [];
  for (let i = 8; i < TRACK_LEN; i += OBS_INTERVAL) {
    const jitter = Math.floor(Math.random() * 5) - 2;
    const seg    = Math.min(TRACK_LEN - 1, Math.max(4, i + jitter));
    // -1 = left lane, 0 = center, 1 = right lane  (not all three at once)
    const lane   = [-0.55, 0, 0.55][Math.floor(Math.random() * 3)];
    obs.push({ wz: seg * SEG_LEN, lane, hit: false });
  }
  return obs;
}

// ─────────────── Component ───────────────────────────────────────────────────
export default function SteeringGame() {
  const canvasRef = useRef(null);
  const animRef   = useRef(null);

  // game state (all refs — zero re-renders per frame)
  const state      = useRef('start');
  const pos        = useRef(SEG_LEN * 2);   // player world-Z (start 2 segs in)
  const speed      = useRef(0);             // world units / second
  const pX         = useRef(0);             // player X: -1 (left) … +1 (right)
  const steer      = useRef(0);             // -1 … +1
  const wheelDeg   = useRef(0);             // visual wheel rotation
  const score      = useRef(0);
  const keys       = useRef({ left: false, right: false, up: false, down: false });
  const obstacles  = useRef(buildObstacles());

  // drag
  const dragOn     = useRef(false);
  const dragX0     = useRef(0);
  const steer0     = useRef(0);

  // React UI (overlays only)
  const [screen, setScreen]     = useState('start');
  const [finalScore, setFinal]  = useState(0);
  const scoreEl = useRef(null);
  const speedEl = useRef(null);

  // ── restart helper ────────────────────────────────────────────────────────
  const restart = useCallback(() => {
    obstacles.current = buildObstacles();
    state.current   = 'playing';
    pos.current     = SEG_LEN * 2;
    speed.current   = 0;
    pX.current      = 0;
    steer.current   = 0;
    wheelDeg.current = 0;
    score.current   = 0;
    setScreen('playing');
    setFinal(0);
    if (scoreEl.current) scoreEl.current.textContent = '0';
    if (speedEl.current) speedEl.current.style.width = '0%';
  }, []);

  // ── main effect ───────────────────────────────────────────────────────────
  useEffect(() => {
    // keyboard
    const kd = (e) => {
      if (e.key === 'ArrowLeft'  || e.key === 'a' || e.key === 'A') keys.current.left  = true;
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') keys.current.right = true;
      if (e.key === 'ArrowUp'   || e.key === 'w' || e.key === 'W') keys.current.up    = true;
      if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') keys.current.down  = true;
    };
    const ku = (e) => {
      if (e.key === 'ArrowLeft'  || e.key === 'a' || e.key === 'A') keys.current.left  = false;
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') keys.current.right = false;
      if (e.key === 'ArrowUp'   || e.key === 'w' || e.key === 'W') keys.current.up    = false;
      if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') keys.current.down  = false;
    };
    window.addEventListener('keydown', kd);
    window.addEventListener('keyup', ku);

    // canvas size
    const canvas = canvasRef.current;
    const ro = new ResizeObserver(() => {
      canvas.width  = canvas.clientWidth  || 400;
      canvas.height = canvas.clientHeight || 420;
    });
    ro.observe(canvas);
    canvas.width  = canvas.clientWidth  || 400;
    canvas.height = canvas.clientHeight || 420;

    // loop
    let last = performance.now();
    const loop = (now) => {
      animRef.current = requestAnimationFrame(loop);
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      update(dt);
      draw(canvas);
    };
    animRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('keydown', kd);
      window.removeEventListener('keyup', ku);
      ro.disconnect();
    };
  }, []); // eslint-disable-line

  // ── update ────────────────────────────────────────────────────────────────
  const update = (dt) => {
    if (state.current !== 'playing') return;

    // speed
    if (keys.current.up)
      speed.current = Math.min(speed.current + 350 * dt, MAX_SPEED);
    else if (keys.current.down)
      speed.current = Math.max(speed.current - 400 * dt, 40);
    else
      speed.current = Math.min(speed.current + 100 * dt, MAX_SPEED * 0.7); // auto-cruise

    // steer (keyboard)
    if (keys.current.left)  steer.current = Math.max(steer.current - 5 * dt, -1);
    else if (keys.current.right) steer.current = Math.min(steer.current + 5 * dt, 1);
    else steer.current *= Math.pow(0.02, dt); // spring back

    wheelDeg.current += (steer.current * 130 - wheelDeg.current) * 10 * dt;
    wheelDeg.current  = Math.max(-130, Math.min(130, wheelDeg.current));

    // advance player Z
    const totalLen = TRACK_LEN * SEG_LEN;
    pos.current += speed.current * dt;
    pos.current  = pos.current % totalLen;

    // current segment
    const segI = Math.floor(pos.current / SEG_LEN) % TRACK_LEN;
    const seg  = TRACK[segI];

    // lateral: centrifugal + steer
    pX.current -= seg.curve * 0.4 * (speed.current / MAX_SPEED) * dt;
    pX.current += steer.current * 0.025 * (speed.current / MAX_SPEED + 0.2) * 60 * dt;
    pX.current  = Math.max(-1.6, Math.min(1.6, pX.current));

    // off-road slowdown
    if (Math.abs(pX.current) > 1.0)
      speed.current = Math.max(speed.current - 20 * dt, 2);

    // score
    score.current += speed.current * dt * 0.5;
    if (scoreEl.current) scoreEl.current.textContent = Math.floor(score.current);
    if (speedEl.current) speedEl.current.style.width = `${(speed.current / MAX_SPEED) * 100}%`;

    // ── collision ──────────────────────────────────────────────────────────
    for (const obs of obstacles.current) {
      if (obs.hit) continue;
      // relZ: how far AHEAD the obstacle is from the player
      let relZ = obs.wz - pos.current;
      if (relZ < 0) relZ += totalLen; // wrap
      // only check if within 2 segments ahead
      if (relZ < SEG_LEN * 2.5 && relZ > 0) {
        const dx = Math.abs(pX.current - obs.lane);
        if (dx < 0.32) {
          obs.hit = true;
          doGameOver();
          return;
        }
      }
    }
  };

  const doGameOver = () => {
    state.current = 'gameover';
    setFinal(Math.floor(score.current));
    setScreen('gameover');
  };

  // ── draw ──────────────────────────────────────────────────────────────────
  const draw = (canvas) => {
    const ctx  = canvas.getContext('2d');
    const W    = canvas.width;
    const H    = canvas.height;
    const hY   = Math.floor(H * HORIZON_Y); // horizon Y pixel

    // ── sky ──
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, W, hY);

    // retro grid
    ctx.save();
    ctx.strokeStyle = 'rgba(0,255,68,0.07)';
    ctx.lineWidth = 1;
    // horizontal lines converging to horizon
    for (let i = 1; i <= 7; i++) {
      const y = hY * (i / 8);
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
    }
    // vertical lines converging to vanishing point
    for (let i = 0; i <= 10; i++) {
      const x = W * (i / 10);
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(W / 2, hY); ctx.stroke();
    }
    ctx.restore();

    // horizon glow
    ctx.fillStyle = 'rgba(0,255,68,0.22)';
    ctx.fillRect(0, hY - 1, W, 2);

    // ── collect projected segments ──────────────────────────────────────────
    const totalLen  = TRACK_LEN * SEG_LEN;
    const playerZ   = pos.current;
    const startSegI = Math.floor(playerZ / SEG_LEN) % TRACK_LEN;

    // We accumulate curve/hill offsets as we look further down the road
    let camOffX  = -pX.current; // start offset = negative player X (road shifts opposite)
    let camOffY  = 0;
    let curve    = 0;
    let prevX    = W / 2;
    let prevY    = hY;

    // Build visible list
    const segs = [];
    for (let n = 1; n <= DRAW_DIST; n++) {
      const segI = (startSegI + n) % TRACK_LEN;
      const t    = TRACK[segI];

      // Distance of the NEAR edge of this segment from player
      const dz  = n * SEG_LEN;
      const proj = project(W, H, hY, dz, camOffX, camOffY);
      if (!proj || proj.sy > H) { segs.push(null); continue; } // below screen

      segs.push({ segI, t, dz, proj, n });

      // Accumulate curve and hill offsets for next segment
      curve    = curve * 0.97 + t.curve * 0.03;
      camOffX += curve * 0.15;
      camOffY += t.hill * 0.0001;
    }

    // Draw back to front
    for (let i = segs.length - 1; i >= 0; i--) {
      const s = segs[i];
      if (!s) continue;
      const next = segs[i - 1]; // closer segment

      const even = Math.floor(i / 3) % 2 === 0;

      const { sy: y2, sx: x2, sw: w2 } = s.proj;
      const { sy: y1, sx: x1, sw: w1 } = next ? next.proj : { sy: hY, sx: W / 2, sw: 0 };

      // Clamp y to horizon
      const cy1 = Math.max(hY, y1);
      const cy2 = Math.max(hY, y2);
      if (cy2 >= cy1) continue;

      // ── Ground ──
      ctx.fillStyle = even ? '#030803' : '#040a04';
      ctx.fillRect(0, cy2, W, cy1 - cy2);

      // ── Road body ──
      ctx.fillStyle = even ? '#090909' : '#0b0b0b';
      ctx.beginPath();
      ctx.moveTo(x1 - w1, cy1); ctx.lineTo(x1 + w1, cy1);
      ctx.lineTo(x2 + w2, cy2); ctx.lineTo(x2 - w2, cy2);
      ctx.closePath(); ctx.fill();

      // ── Rumble strips ──
      const rw1 = w1 * 0.1, rw2 = w2 * 0.1;
      ctx.fillStyle = even ? '#00ff44' : '#003311';
      ctx.beginPath();
      ctx.moveTo(x1 - w1, cy1);      ctx.lineTo(x1 - w1 + rw1, cy1);
      ctx.lineTo(x2 - w2 + rw2, cy2); ctx.lineTo(x2 - w2, cy2);
      ctx.closePath(); ctx.fill();
      ctx.beginPath();
      ctx.moveTo(x1 + w1 - rw1, cy1); ctx.lineTo(x1 + w1, cy1);
      ctx.lineTo(x2 + w2, cy2);       ctx.lineTo(x2 + w2 - rw2, cy2);
      ctx.closePath(); ctx.fill();

      // ── Centre stripe ──
      if (even) {
        const lw1 = w1 * 0.025, lw2 = w2 * 0.025;
        ctx.fillStyle = '#00ff4499';
        ctx.beginPath();
        ctx.moveTo(x1 - lw1, cy1); ctx.lineTo(x1 + lw1, cy1);
        ctx.lineTo(x2 + lw2, cy2); ctx.lineTo(x2 - lw2, cy2);
        ctx.closePath(); ctx.fill();
      }

      // ── Obstacles on this segment ──────────────────────────────────────
      for (const obs of obstacles.current) {
        if (obs.hit) continue;

        // How far ahead is this obstacle?
        let relZ = obs.wz - playerZ;
        if (relZ < 0) relZ += totalLen;

        // Is it on this segment's depth band?
        if (relZ < (i) * SEG_LEN || relZ >= (i + 1) * SEG_LEN) continue;
        // Skip if behind player
        if (relZ <= 0) continue;

        // Project obstacle position using same perspective
        const obsProj = project(W, H, hY, relZ, -pX.current + obs.lane, 0);
        if (!obsProj || obsProj.sy > H + 5 || obsProj.sy < hY) continue;

        drawObstacle(ctx, obsProj.sx, obsProj.sy, obsProj.sw * 0.22, performance.now());
      }
    }

    // ── Cockpit ──
    drawCockpit(ctx, W, H, hY);
  };

  // ── Obstacle rendering ─────────────────────────────────────────────────────
  const drawObstacle = (ctx, cx, cy, hw, now) => {
    const hh  = hw * 1.6;   // half-height
    const t   = now / 600;
    const g   = 0.55 + 0.45 * Math.sin(t); // glow pulse

    // Dark body
    ctx.fillStyle = '#001a00';
    ctx.fillRect(cx - hw, cy - hh * 2, hw * 2, hh * 2);

    // Bright top face (lit)
    ctx.fillStyle = `rgba(0,255,68,${0.18 * g})`;
    ctx.fillRect(cx - hw, cy - hh * 2, hw * 2, hh * 0.3);

    // Neon outer glow
    ctx.save();
    ctx.shadowColor = '#00ff44';
    ctx.shadowBlur  = 14 * g;
    ctx.strokeStyle = `rgba(0,255,68,${0.7 + 0.3 * g})`;
    ctx.lineWidth   = Math.max(1.5, hw * 0.08);
    ctx.strokeRect(cx - hw, cy - hh * 2, hw * 2, hh * 2);
    ctx.restore();

    // Horizontal neon bands on the body
    const bands = 3;
    for (let b = 0; b < bands; b++) {
      const by = cy - hh * 2 + (hh * 2) * ((b + 1) / (bands + 1));
      ctx.strokeStyle = `rgba(0,255,68,${0.25 * g})`;
      ctx.lineWidth   = Math.max(1, hw * 0.04);
      ctx.beginPath();
      ctx.moveTo(cx - hw, by); ctx.lineTo(cx + hw, by); ctx.stroke();
    }

    // Ground shadow
    ctx.fillStyle = `rgba(0,255,68,0.08)`;
    ctx.beginPath();
    ctx.ellipse(cx, cy, hw * 1.3, hw * 0.25, 0, 0, Math.PI * 2);
    ctx.fill();
  };

  // ── Cockpit overlay ────────────────────────────────────────────────────────
  const drawCockpit = (ctx, W, H, hY) => {
    const t     = performance.now() / 1000;
    const dashY = H * 0.68;
    const dashH = H - dashY;

    // Dashboard fill
    const dg = ctx.createLinearGradient(0, dashY, 0, H);
    dg.addColorStop(0, '#020602');
    dg.addColorStop(0.5, '#010301');
    dg.addColorStop(1, '#000000');
    ctx.fillStyle = dg;
    ctx.fillRect(0, dashY, W, dashH);

    // Top neon edge
    ctx.fillStyle = `rgba(0,255,68,${0.55 + 0.22 * Math.sin(t * 3.5)})`;
    ctx.fillRect(0, dashY, W, 1.5);

    // Subtle glow above dash
    const gg = ctx.createLinearGradient(0, dashY - 30, 0, dashY + 10);
    gg.addColorStop(0, 'rgba(0,255,68,0)');
    gg.addColorStop(1, 'rgba(0,255,68,0.05)');
    ctx.fillStyle = gg;
    ctx.fillRect(0, dashY - 30, W, 40);

    // A-pillars
    ctx.fillStyle = '#010201';
    ctx.beginPath(); ctx.moveTo(0, hY); ctx.lineTo(W * 0.15, dashY); ctx.lineTo(0, H); ctx.closePath(); ctx.fill();
    ctx.beginPath(); ctx.moveTo(W, hY); ctx.lineTo(W * 0.85, dashY); ctx.lineTo(W, H); ctx.closePath(); ctx.fill();

    // Pillar edge lines
    ctx.strokeStyle = 'rgba(0,255,68,0.28)';
    ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(0, hY); ctx.lineTo(W * 0.15, dashY); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(W, hY); ctx.lineTo(W * 0.85, dashY); ctx.stroke();

    // Steering wheel
    const wx = W / 2;
    const wy = dashY + dashH * 0.52;
    const wr = dashH * 0.38;
    drawWheel(ctx, wx, wy, wr, wheelDeg.current, t);

    // Left gauge (speed)
    drawGauge(ctx, W * 0.16, dashY + dashH * 0.42, dashH * 0.28, 'SPD', speed.current / MAX_SPEED, t);
    // Right gauge (score)
    drawGauge(ctx, W * 0.84, dashY + dashH * 0.42, dashH * 0.28, 'SCR', Math.min(score.current / 3000, 1), t);

    // Subtle dash detail lines
    ctx.strokeStyle = 'rgba(0,255,68,0.04)';
    ctx.lineWidth = 1;
    for (let i = 1; i < 4; i++) {
      ctx.beginPath();
      ctx.moveTo(0, dashY + dashH * (i / 4));
      ctx.lineTo(W, dashY + dashH * (i / 4));
      ctx.stroke();
    }
  };

  const drawWheel = (ctx, cx, cy, r, deg, t) => {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(deg * Math.PI / 180);

    // Glow
    ctx.shadowColor = '#00ff44';
    ctx.shadowBlur  = 10 + 5 * Math.sin(t * 2.5);

    // Rim
    ctx.strokeStyle = '#00ff44';
    ctx.lineWidth   = r * 0.08;
    ctx.beginPath(); ctx.arc(0, 0, r, 0, Math.PI * 2); ctx.stroke();

    // Inner ring
    ctx.strokeStyle = 'rgba(0,255,68,0.2)';
    ctx.lineWidth   = r * 0.03;
    ctx.beginPath(); ctx.arc(0, 0, r * 0.85, 0, Math.PI * 2); ctx.stroke();

    // 3 spokes
    ctx.strokeStyle = '#00ff44';
    ctx.lineWidth   = r * 0.07;
    ctx.lineCap     = 'round';
    [90, 210, 330].forEach(a => {
      const rad = a * Math.PI / 180;
      ctx.beginPath();
      ctx.moveTo(Math.cos(rad) * r * 0.18, Math.sin(rad) * r * 0.18);
      ctx.lineTo(Math.cos(rad) * r * 0.88, Math.sin(rad) * r * 0.88);
      ctx.stroke();
    });

    // Hub
    ctx.shadowBlur = 20;
    ctx.fillStyle  = '#00ff44';
    ctx.beginPath(); ctx.arc(0, 0, r * 0.16, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#000';
    ctx.beginPath(); ctx.arc(0, 0, r * 0.09, 0, Math.PI * 2); ctx.fill();

    ctx.restore();

    // Column
    ctx.fillStyle = '#011501';
    ctx.fillRect(cx - r * 0.05, cy + r * 0.1, r * 0.1, r * 0.55);
    ctx.strokeStyle = 'rgba(0,255,68,0.25)';
    ctx.lineWidth   = 1;
    ctx.strokeRect(cx - r * 0.05, cy + r * 0.1, r * 0.1, r * 0.55);
  };

  const drawGauge = (ctx, cx, cy, r, label, val, t) => {
    const s = Math.PI * 0.75;
    const e = s + Math.PI * 1.5 * val;

    // BG ring
    ctx.strokeStyle = 'rgba(0,255,68,0.1)';
    ctx.lineWidth   = r * 0.08;
    ctx.beginPath(); ctx.arc(cx, cy, r, s, s + Math.PI * 1.5); ctx.stroke();

    // Arc
    if (val > 0) {
      ctx.strokeStyle = `rgba(0,255,${Math.floor(68 + 100 * val)},${0.7 + 0.25 * Math.sin(t * 4)})`;
      ctx.lineWidth   = r * 0.09;
      ctx.lineCap     = 'round';
      ctx.shadowColor = '#00ff44';
      ctx.shadowBlur  = 8;
      ctx.beginPath(); ctx.arc(cx, cy, r, s, e); ctx.stroke();
      ctx.shadowBlur  = 0;
    }

    // Ticks
    for (let i = 0; i <= 6; i++) {
      const a = s + (i / 6) * Math.PI * 1.5;
      ctx.strokeStyle = 'rgba(0,255,68,0.3)';
      ctx.lineWidth   = 1;
      ctx.beginPath();
      ctx.moveTo(cx + Math.cos(a) * r * 0.68, cy + Math.sin(a) * r * 0.68);
      ctx.lineTo(cx + Math.cos(a) * r * 0.82, cy + Math.sin(a) * r * 0.82);
      ctx.stroke();
    }

    // Label
    ctx.fillStyle    = 'rgba(0,255,68,0.45)';
    ctx.font         = `bold ${r * 0.28}px monospace`;
    ctx.textAlign    = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(label, cx, cy + r * 0.35);

    // Value number
    ctx.fillStyle = '#00ff44';
    ctx.font      = `bold ${r * 0.42}px monospace`;
    ctx.fillText(Math.floor(val * 100), cx, cy - r * 0.05);
  };

  // ── Perspective projection ─────────────────────────────────────────────────
  // Returns screen x, y and road half-width for a road point at depth dz
  function project(W, H, hY, dz, offsetX, offsetY) {
    if (dz <= 0) return null;
    const scale = CAM_D * H / dz;
    const sx    = W / 2 + offsetX * scale * W * 0.28;
    const sy    = hY    + (CAM_H + offsetY) * scale * H * 0.5;
    const sw    = ROAD_HALF * scale * W * 0.28;
    return { sx, sy, sw, scale };
  }

  // ── Input handlers ─────────────────────────────────────────────────────────
  const onPD = (e) => {
    if (state.current !== 'playing') return;
    dragOn.current  = true;
    dragX0.current  = e.clientX;
    steer0.current  = steer.current;
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onPM = (e) => {
    if (!dragOn.current) return;
    steer.current = Math.max(-1, Math.min(1, steer0.current + (e.clientX - dragX0.current) / 90));
  };
  const onPU = () => { dragOn.current = false; };

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', background: '#000', userSelect: 'none' }}>
      <canvas
        ref={canvasRef}
        style={{ display: 'block', width: '100%', height: '100%', cursor: 'grab', touchAction: 'none' }}
        onPointerDown={onPD}
        onPointerMove={onPM}
        onPointerUp={onPU}
        onPointerCancel={onPU}
      />

      {/* HUD bar */}
      <div style={{
        position: 'absolute', top: 10, left: '50%', transform: 'translateX(-50%)',
        display: 'flex', alignItems: 'center', gap: 14,
        background: 'rgba(0,0,0,0.72)', border: '1px solid rgba(0,255,68,0.22)',
        borderRadius: 3, padding: '5px 16px', pointerEvents: 'none',
        fontFamily: 'monospace', whiteSpace: 'nowrap',
      }}>
        <span style={{ fontSize: 9, color: 'rgba(0,255,68,0.5)', letterSpacing: '0.14em' }}>SCORE</span>
        <span ref={scoreEl} style={{ fontSize: 14, color: '#00ff44', fontWeight: 900, minWidth: 48, textAlign: 'right' }}>0</span>
        <span style={{ width: 1, height: 12, background: 'rgba(0,255,68,0.18)' }} />
        <span style={{ fontSize: 8, color: 'rgba(0,255,68,0.35)', letterSpacing: '0.1em' }}>W/S · A/D · DRAG</span>
      </div>

      {/* Start Screen */}
      {screen === 'start' && (
        <div style={{
          position: 'absolute', inset: 0, zIndex: 50,
          background: 'rgba(0,0,0,0.88)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          gap: 14, fontFamily: 'monospace',
        }}>
          <div style={{ position: 'absolute', inset: 0, background: 'repeating-linear-gradient(0deg,rgba(0,255,68,0.018) 0px,rgba(0,255,68,0.018) 1px,transparent 1px,transparent 4px)', pointerEvents: 'none' }} />
          <div style={{ width: '65%', height: 2, background: 'linear-gradient(90deg,transparent,#00ff44,transparent)' }} />
          <p style={{ margin: 0, fontSize: 28, fontWeight: 900, color: '#00ff44', letterSpacing: 5, textShadow: '0 0 28px #00ff44,0 0 60px #00ff4444' }}>NEON DRIVE</p>
          <p style={{ margin: 0, fontSize: 10, color: 'rgba(0,255,68,0.45)', letterSpacing: 3 }}>A/D or DRAG TO STEER</p>
          <div style={{ width: '65%', height: 1, background: 'rgba(0,255,68,0.18)' }} />
          <button
            onClick={(e) => { e.stopPropagation(); restart(); }}
            onMouseDown={(e) => { e.stopPropagation(); restart(); }}
            onTouchStart={(e) => { e.stopPropagation(); restart(); }}
            style={{
              padding: '10px 30px', fontFamily: 'monospace', fontSize: 12, fontWeight: 700,
              letterSpacing: 3, textTransform: 'uppercase', background: 'transparent',
              border: '2px solid #00ff44', color: '#00ff44', cursor: 'pointer', borderRadius: 2,
              boxShadow: '0 0 18px rgba(0,255,68,0.28)', transition: 'all 0.15s',
              pointerEvents: 'auto', position: 'relative', zIndex: 100
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#00ff44'; e.currentTarget.style.color = '#000'; e.currentTarget.style.boxShadow = '0 0 40px rgba(0,255,68,0.8)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#00ff44'; e.currentTarget.style.boxShadow = '0 0 18px rgba(0,255,68,0.28)'; }}
          >
            START ENGINE
          </button>
          <div style={{ width: '65%', height: 2, background: 'linear-gradient(90deg,transparent,#00ff44,transparent)' }} />
        </div>
      )}

      {/* Game Over */}
      {screen === 'gameover' && (
        <div style={{
          position: 'absolute', inset: 0, zIndex: 50,
          background: 'rgba(0,0,0,0.88)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          gap: 14, fontFamily: 'monospace',
        }}>
          <div style={{ position: 'absolute', inset: 0, background: 'repeating-linear-gradient(0deg,rgba(0,255,68,0.018) 0px,rgba(0,255,68,0.018) 1px,transparent 1px,transparent 4px)', pointerEvents: 'none' }} />
          <div style={{ width: '65%', height: 2, background: 'linear-gradient(90deg,transparent,#00ff44,transparent)' }} />
          <p style={{ margin: 0, fontSize: 28, fontWeight: 900, color: '#00ff44', letterSpacing: 5, textShadow: '0 0 28px #00ff44,0 0 60px #00ff4444' }}>CRASHED</p>
          <p style={{ margin: 0, fontSize: 10, color: 'rgba(0,255,68,0.45)', letterSpacing: 3 }}>FINAL SCORE</p>
          <p style={{ margin: 0, fontSize: 34, fontWeight: 900, color: '#fff', textShadow: '0 0 20px #00ff44' }}>{finalScore}</p>
          <div style={{ width: '65%', height: 1, background: 'rgba(0,255,68,0.18)' }} />
          <button
            onClick={(e) => { e.stopPropagation(); restart(); }}
            onMouseDown={(e) => { e.stopPropagation(); restart(); }}
            onTouchStart={(e) => { e.stopPropagation(); restart(); }}
            style={{
              padding: '10px 30px', fontFamily: 'monospace', fontSize: 12, fontWeight: 700,
              letterSpacing: 3, textTransform: 'uppercase', background: 'transparent',
              border: '2px solid #00ff44', color: '#00ff44', cursor: 'pointer', borderRadius: 2,
              boxShadow: '0 0 18px rgba(0,255,68,0.28)', transition: 'all 0.15s',
              pointerEvents: 'auto', position: 'relative', zIndex: 100
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#00ff44'; e.currentTarget.style.color = '#000'; e.currentTarget.style.boxShadow = '0 0 40px rgba(0,255,68,0.8)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#00ff44'; e.currentTarget.style.boxShadow = '0 0 18px rgba(0,255,68,0.28)'; }}
          >
            PLAY AGAIN
          </button>
          <div style={{ width: '65%', height: 2, background: 'linear-gradient(90deg,transparent,#00ff44,transparent)' }} />
        </div>
      )}
    </div>
  );
}
