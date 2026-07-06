'use client';

import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mx = 0;
    let my = 0;
    let rx = 0;
    let ry = 0;
    let isMoving = false;

    // Center starting point
    mx = window.innerWidth / 2;
    my = window.innerHeight / 2;
    rx = mx;
    ry = my;

    const onMouseMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      isMoving = true;

      // Position the dot instantly
      dot.style.left = `${mx}px`;
      dot.style.top = `${my}px`;
    };

    window.addEventListener('mousemove', onMouseMove);

    // Smooth trailing ring animation loop
    let frameId;
    const animateRing = () => {
      rx += (mx - rx) * 0.15;
      ry += (my - ry) * 0.15;

      ring.style.left = `${rx}px`;
      ring.style.top = `${ry}px`;

      frameId = requestAnimationFrame(animateRing);
    };
    animateRing();

    // Mouse hover handlers
    const onMouseEnter = () => {
      document.body.classList.add('cursor-hover');
    };
    const onMouseLeave = () => {
      document.body.classList.remove('cursor-hover');
    };

    // Attach event listeners to all interactive elements
    const attachListeners = () => {
      const selectors = 'a, button, [role="button"], input, textarea, select, .feature-card, .hw-card, .gallery-item, .faq-q, .contact-link';
      const elements = document.querySelectorAll(selectors);
      elements.forEach((el) => {
        el.addEventListener('mouseenter', onMouseEnter);
        el.addEventListener('mouseleave', onMouseLeave);
      });
    };

    attachListeners();

    // Re-attach listeners when DOM changes (e.g., dynamic gallery filtering)
    const observer = new MutationObserver(attachListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(frameId);
      observer.disconnect();

      const selectors = 'a, button, [role="button"], input, textarea, select, .feature-card, .hw-card, .gallery-item, .faq-q, .contact-link';
      const elements = document.querySelectorAll(selectors);
      elements.forEach((el) => {
        el.removeEventListener('mouseenter', onMouseEnter);
        el.removeEventListener('mouseleave', onMouseLeave);
      });
      document.body.classList.remove('cursor-hover');
    };
  }, []);

  return (
    <>
      <div id="cursor-dot" ref={dotRef} aria-hidden="true" />
      <div id="cursor-ring" ref={ringRef} aria-hidden="true" />
    </>
  );
}
