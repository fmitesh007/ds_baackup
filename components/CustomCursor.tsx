'use client';

import { useRef, useEffect, useState } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024 && window.matchMedia('(pointer: fine)').matches);
    };
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;

    const cursor = cursorRef.current;
    const container = trailRef.current;
    if (!cursor || !container) return;

    let mouseX = 0, mouseY = 0;
    const coords = { x: mouseX, y: mouseY };
    const trailElements = container.children;
    const trailCount = trailElements.length;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.transform = `translate(${mouseX - 12}px, ${mouseY - 12}px)`;
    };

    document.addEventListener('mousemove', handleMouseMove);

    let frame = 0;
    function animate() {
      const ease = 0.15;
      coords.x += (mouseX - coords.x) * ease;
      coords.y += (mouseY - coords.y) * ease;

      for (let i = 0; i < trailCount; i++) {
        const element = trailElements[i] as HTMLElement;
        const lag = i * 0.08;
        const x = coords.x + Math.sin(frame * 0.05 + i * 0.5) * (15 - i * 0.5);
        const y = coords.y + Math.cos(frame * 0.05 + i * 0.5) * (10 - i * 0.4);
        
        const scale = 1 - i / trailCount * 0.7;
        const opacity = (1 - i / trailCount) * 0.8;
        
        element.style.transform = `translate(${x - 10}px, ${y - 20}px) scale(${scale})`;
        element.style.opacity = String(opacity);
      }

      frame++;
      requestAnimationFrame(animate);
    }

    animate();

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isDesktop]);

  if (!isDesktop) return null;

  return (
    <>
      <div 
        ref={trailRef}
        className="fixed inset-0 pointer-events-none z-[9999]"
        style={{ mixBlendMode: 'screen' }}
      >
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-5 h-10 rounded-full"
            style={{
              background: `linear-gradient(180deg, 
                rgba(99, 102, 241, ${0.9 - i * 0.04}) 0%, 
                rgba(6, 182, 212, ${0.7 - i * 0.03}) 50%,
                rgba(217, 70, 239, ${0.5 - i * 0.02}) 100%)`,
              filter: `blur(${Math.max(1, 6 - i * 0.3)}px)`,
            }}
          />
        ))}
      </div>
      <div
        ref={cursorRef}
        className="fixed w-6 h-6 rounded-full pointer-events-none z-[9999]"
        style={{
          border: '2px solid rgba(99, 102, 241, 1)',
          boxShadow: '0 0 20px rgba(99, 102, 241, 0.8), 0 0 40px rgba(6, 182, 212, 0.4)',
          background: 'transparent',
        }}
      />
    </>
  );
}