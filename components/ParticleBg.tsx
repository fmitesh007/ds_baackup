"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";

export default function ParticleBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const isDark = resolvedTheme === "dark";
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const particleCount = 80;
    const connectionDistance = 150;
    const mouseRadius = 200;
    const particleRadius = 2;

    const particles: Particle[] = [];

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      baseVx: number;
      baseVy: number;
      radius: number;
      color: string;
      pulsePhase: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.baseVx = this.vx;
        this.baseVy = this.vy;
        this.radius = particleRadius + Math.random() * 2;
        this.pulsePhase = Math.random() * Math.PI * 2;

        const colors = isDark
          ? ["#8b5cf6", "#06b6d4", "#ec4899", "#3b82f6", "#10b981"]
          : ["#7c3aed", "#0891b2", "#db2777", "#2563eb", "#059669"];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update(mouseX: number, mouseY: number) {
        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouseRadius) {
          const force = (mouseRadius - dist) / mouseRadius;
          const angle = Math.atan2(dy, dx);
          this.vx -= Math.cos(angle) * force * 0.3;
          this.vy -= Math.sin(angle) * force * 0.3;
        }

        this.vx += (this.baseVx - this.vx) * 0.02;
        this.vy += (this.baseVy - this.vy) * 0.02;

        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;

        this.pulsePhase += 0.02;
      }

      draw(ctx: CanvasRenderingContext2D) {
        const pulse = Math.sin(this.pulsePhase) * 0.3 + 0.7;
        const alpha = isDark ? 0.8 * pulse : 0.6 * pulse;
        
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius * pulse, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = alpha;
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }

    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = mouseX;
    let targetMouseY = mouseY;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) {
        targetMouseX = e.touches[0].clientX;
        targetMouseY = e.touches[0].clientY;
      }
    };

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("resize", handleResize);

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    let animationId: number;

    const animate = () => {
      animationId = requestAnimationFrame(animate);

      mouseX += (targetMouseX - mouseX) * 0.1;
      mouseY += (targetMouseY - mouseY) * 0.1;

      ctx.fillStyle = isDark ? "rgba(10, 10, 15, 0.1)" : "rgba(255, 255, 255, 0.1)";
      ctx.fillRect(0, 0, width, height);

      particles.forEach((p) => {
        p.update(mouseX, mouseY);
        p.draw(ctx);
      });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            const alpha = (1 - dist / connectionDistance) * (isDark ? 0.3 : 0.15);
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = isDark ? "#4f46e5" : "#6366f1";
            ctx.globalAlpha = alpha;
            ctx.lineWidth = 1;
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }

        const dx = particles[i].x - mouseX;
        const dy = particles[i].y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouseRadius) {
          const alpha = (1 - dist / mouseRadius) * (isDark ? 0.5 : 0.25);
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mouseX, mouseY);
          ctx.strokeStyle = "#06b6d4";
          ctx.globalAlpha = alpha;
          ctx.lineWidth = 1;
          ctx.stroke();
          ctx.globalAlpha = 1;
        }
      }

      ctx.beginPath();
      ctx.arc(mouseX, mouseY, 8, 0, Math.PI * 2);
      const gradient = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 20);
      gradient.addColorStop(0, isDark ? "rgba(99, 102, 241, 0.4)" : "rgba(99, 102, 241, 0.3)");
      gradient.addColorStop(1, "rgba(99, 102, 241, 0)");
      ctx.fillStyle = gradient;
      ctx.fill();
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("resize", handleResize);
    };
  }, [mounted, resolvedTheme]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-[-1]"
    >
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}
