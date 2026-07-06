'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Setup scene, camera, renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050505, 0.0015);

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    camera.position.z = 220;
    camera.position.y = 80;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Particle field
    const particleCount = 1400;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const initialY = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      // Create a grid-like wave pattern spread out in X and Z
      const x = (Math.random() - 0.5) * 800;
      const z = (Math.random() - 0.5) * 800;
      
      // Initial Y wave shape
      const y = Math.sin(x * 0.01) * Math.cos(z * 0.01) * 30 + (Math.random() - 0.5) * 15;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      initialY[i] = y;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Custom Canvas Texture for perfectly round glowing particles
    const createCircleTexture = () => {
      const size = 16;
      const canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');
      const grad = ctx.createRadialGradient(size/2, size/2, 0, size/2, size/2, size/2);
      grad.addColorStop(0, 'rgba(57, 255, 20, 1)');
      grad.addColorStop(0.3, 'rgba(57, 255, 20, 0.8)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, size, size);
      return new THREE.CanvasTexture(canvas);
    };

    const material = new THREE.PointsMaterial({
      size: 3.5,
      map: createCircleTexture(),
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Glowing grid lines helper at the bottom
    const gridHelper = new THREE.GridHelper(800, 40, 0x00c853, 0x141414);
    gridHelper.position.y = -50;
    if (gridHelper.material) {
      gridHelper.material.opacity = 0.08;
      gridHelper.material.transparent = true;
    }
    scene.add(gridHelper);

    // Dynamic ambient lights
    const light = new THREE.AmbientLight(0x050505);
    scene.add(light);

    // Mouse tracking
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event) => {
      mouseX = (event.clientX - window.innerWidth / 2) * 0.08;
      mouseY = (event.clientY - window.innerHeight / 2) * 0.05;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let clock = new THREE.Clock();
    let animationFrameId;

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      animationFrameId = requestAnimationFrame(animate);

      // Smooth camera interpolation
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      camera.position.x = targetX;
      camera.position.y = 80 - targetY;
      camera.lookAt(0, 0, 0);

      // Animate wave on particles
      const positionAttr = geometry.attributes.position;
      for (let i = 0; i < particleCount; i++) {
        const x = positionAttr.getX(i);
        const z = positionAttr.getZ(i);

        // Compute new Y based on sine and cosine waves
        const wave = Math.sin(x * 0.01 + elapsedTime * 0.5) * Math.cos(z * 0.015 + elapsedTime * 0.3) * 22;
        positionAttr.setY(i, initialY[i] + wave);
      }
      positionAttr.needsUpdate = true;

      // Slowly rotate the entire grid
      particles.rotation.y = elapsedTime * 0.015;
      gridHelper.rotation.y = elapsedTime * 0.01;

      renderer.render(scene, camera);
    };

    animate();

    // Clean up on unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      
      geometry.dispose();
      material.dispose();
      if (gridHelper.geometry) gridHelper.geometry.dispose();
      if (gridHelper.material) gridHelper.material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 1,
        pointerEvents: 'none',
        opacity: 0.85,
      }}
    />
  );
}
