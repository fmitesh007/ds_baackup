"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

const codeSnippets = [
  "function solve() {",
  "  return neural_net",
  "  .predict(data)",
  "  .optimize()",
  "}",
  " ",
  "const brain = new AI({",
  "  consciousness: true,",
  "  creativity: 0.99,",
  "  speed: '∞'",
  "});",
  " ",
  "brain.think().then(",
  "  breakthrough => wow",
  ");",
];

export default function NeuralBrain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();
  const animationRef = useRef<number>(0);
  const codeRef = useRef<{ y: number; speed: number; opacity: number }[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const isDark = resolvedTheme === "dark";
    let width = 600;
    let height = 600;

    const resize = () => {
      width = 600;
      height = 600;
      canvas.width = width;
      canvas.height = height;
    };
    resize();
    window.addEventListener("resize", resize);

    class Particle {
      x: number;
      y: number;
      targetX: number;
      targetY: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
      connections: number[] = [];

      constructor() {
        const angle = Math.random() * Math.PI * 2;
        const dist = Math.random() * 80;
        this.x = width / 2 + Math.cos(angle) * dist;
        this.y = height / 2 + Math.sin(angle) * dist;
        this.targetX = this.x;
        this.targetY = this.y;
        this.vx = 0;
        this.vy = 0;

        const colors = isDark
          ? ["#8b5cf6", "#06b6d4", "#ec4899", "#3b82f6", "#10b981"]
          : ["#7c3aed", "#0891b2", "#db2777", "#2563eb", "#059669"];
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.radius = 2 + Math.random() * 3;
      }

      update(particles: Particle[], centerX: number, centerY: number, time: number) {
        const angle = (time * 0.001 + particles.indexOf(this) * 0.1) % (Math.PI * 2);
        const dist = 60 + Math.sin(time * 0.002 + particles.indexOf(this)) * 40;
        
        this.targetX = centerX + Math.cos(angle) * dist;
        this.targetY = centerY + Math.sin(angle) * dist;

        this.vx += (this.targetX - this.x) * 0.02;
        this.vy += (this.targetY - this.y) * 0.02;
        this.vx *= 0.95;
        this.vy *= 0.95;

        this.x += this.vx;
        this.y += this.vy;

        this.connections = [];
        particles.forEach((p, i) => {
          if (p === this) return;
          const dx = p.x - this.x;
          const dy = p.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 80) {
            this.connections.push(i);
          }
        });
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 15;
        ctx.shadowColor = this.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    const particles: Particle[] = [];
    for (let i = 0; i < 40; i++) {
      particles.push(new Particle());
    }

    codeRef.current = codeSnippets.map((_, i) => ({
      y: i * 20,
      speed: 0.3 + Math.random() * 0.3,
      opacity: 0.3 + Math.random() * 0.4,
    }));

    let time = 0;

    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);
      time += 16;

      const centerX = width / 2;
      const centerY = height / 2;

      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.update(particles, centerX, centerY, time);
      });

      particles.forEach((p) => {
        p.connections.forEach((i) => {
          const p2 = particles[i];
          const dx = p2.x - p.x;
          const dy = p2.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const alpha = (1 - dist / 80) * 0.3;

          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = isDark ? `rgba(99, 102, 241, ${alpha})` : `rgba(99, 102, 241, ${alpha * 0.6})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        });
      });

      particles.forEach((p) => p.draw(ctx));

      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 120);
      const pulseSize = 100 + Math.sin(time * 0.003) * 20;
      gradient.addColorStop(0, isDark ? "rgba(139, 92, 246, 0.15)" : "rgba(124, 58, 237, 0.1)");
      gradient.addColorStop(0.5, isDark ? "rgba(6, 182, 212, 0.08)" : "rgba(8, 145, 178, 0.05)");
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.beginPath();
      ctx.arc(centerX, centerY, pulseSize, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      const codeX = width - 140;
      codeRef.current.forEach((code, i) => {
        code.y += code.speed;
        if (code.y > height + 20) {
          code.y = -codeSnippets.length * 20;
        }

        const distanceToCenter = Math.abs(code.y + 10 - centerY);
        const fadeAlpha = Math.max(0, 1 - distanceToCenter / 200);

        ctx.font = "11px 'SF Mono', 'Fira Code', monospace";
        ctx.fillStyle = isDark
          ? `rgba(148, 163, 184, ${code.opacity * fadeAlpha})`
          : `rgba(71, 85, 105, ${code.opacity * fadeAlpha})`;
        ctx.fillText(codeSnippets[i], codeX, code.y);
      });

      ctx.beginPath();
      ctx.arc(centerX - 30, centerY - 20, 25, 0, Math.PI * 2);
      const bulbGradient = ctx.createRadialGradient(centerX - 30, centerY - 20, 0, centerX - 30, centerY - 20, 25);
      bulbGradient.addColorStop(0, isDark ? "rgba(251, 191, 36, 0.9)" : "rgba(245, 158, 11, 0.8)");
      bulbGradient.addColorStop(0.5, isDark ? "rgba(251, 191, 36, 0.3)" : "rgba(245, 158, 11, 0.2)");
      bulbGradient.addColorStop(1, "rgba(251, 191, 36, 0)");
      ctx.fillStyle = bulbGradient;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(centerX - 30, centerY - 20, 8, 0, Math.PI * 2);
      ctx.fillStyle = isDark ? "#fbbf24" : "#f59e0b";
      ctx.shadowBlur = 20;
      ctx.shadowColor = "#fbbf24";
      ctx.fill();
      ctx.shadowBlur = 0;

      const filamentPhase = Math.sin(time * 0.01) * 0.3 + 0.7;
      ctx.beginPath();
      ctx.moveTo(centerX - 34, centerY - 17);
      ctx.quadraticCurveTo(centerX - 30, centerY - 22, centerX - 26, centerY - 17);
      ctx.quadraticCurveTo(centerX - 30, centerY - 12, centerX - 34, centerY - 17);
      ctx.strokeStyle = `rgba(255, 255, 255, ${filamentPhase})`;
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(centerX - 32, centerY - 10);
      ctx.lineTo(centerX - 28, centerY - 10);
      ctx.strokeStyle = isDark ? "#71717a" : "#a1a1aa";
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(centerX - 31, centerY - 6);
      ctx.lineTo(centerX - 29, centerY - 6);
      ctx.strokeStyle = isDark ? "#71717a" : "#a1a1aa";
      ctx.lineWidth = 2;
      ctx.stroke();
    };

    animate();

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [resolvedTheme]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
    />
  );
}
