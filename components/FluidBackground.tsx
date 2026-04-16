'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export default function FluidBackground() {
  const ref = useRef(null);

  useGSAP(() => {
    gsap.utils.toArray<HTMLElement>('.blob').forEach((blob) => {
      gsap.to(blob, {
        x: '10%',
        y: '10%',
        scale: 1.1,
        duration: 20,
        repeat: -1,
        yoyo: true,
        ease: 'ease-in-out',
      });
    });
  }, { scope: ref });

  return (
    <div ref={ref} className="fixed top-0 left-0 right-0 bottom-0 z-[-1] overflow-hidden bg-[#F8FAFC]">
      <div className="blob absolute bg-[#6366f1] w-[600px] h-[600px] -top-48 -left-24 rounded-full opacity-25" style={{ filter: 'blur(120px)' }} />
      <div className="blob absolute bg-[#06b6d4] w-[700px] h-[700px] top-1/2 -right-48 rounded-full opacity-25" style={{ filter: 'blur(120px)', transform: 'translateY(-50%)' }} />
      <div className="blob absolute bg-[#d946ef] w-[500px] h-[500px] bottom-0 left-1/4 rounded-full opacity-25" style={{ filter: 'blur(120px)' }} />
    </div>
  );
}