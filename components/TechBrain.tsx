"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

export default function TechBrain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();
  const animationRef = useRef<number>(0);

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

    const chars = "01アイウエオカキクケコ{}[]<>/\\|;:ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*+=~-_".split("");
    const fontSize = 12;
    const columns = Math.floor(width / fontSize);
    const drops: number[] = [];
    const speeds: number[] = [];

    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100;
      speeds[i] = 3 + Math.random() * 12;
    }

    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = (e.clientX - rect.left - width / 2) / width;
      mouseY = (e.clientY - rect.top - height / 2) / height;
    };

    canvas.addEventListener("mousemove", handleMouseMove);

    let time = 0;

    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);
      time += 16;

      const bgColor = isDark ? "rgba(10, 10, 21, 0.15)" : "rgba(248, 250, 252, 0.12)";
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, width, height);

      ctx.font = `${fontSize}px "SF Mono", "Fira Code", monospace`;

      for (let i = 0; i < columns; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] % (height + 100);

        const distToCenter = Math.sqrt(
          Math.pow((i / columns - 0.5), 2) + 
          Math.pow((y / height - 0.5), 2)
        );
        
        const mouseDist = Math.sqrt(Math.pow(mouseX * 2, 2) + Math.pow(mouseY * 2, 2));
        const speedBoost = 1 + (1 - mouseDist) * 2;

        const hue = (time * 0.03 + i * 3 + drops[i] * 0.5) % 360;
        const saturation = 80 + Math.sin(time * 0.002 + i * 0.1) * 20;
        const lightness = isDark ? 55 + Math.sin(time * 0.003 + i * 0.2) * 15 : 35;
        const alpha = isDark ? 0.8 : 0.6;

        ctx.fillStyle = isDark 
          ? `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha})`
          : `hsla(${hue}, ${saturation * 0.6}%, ${lightness * 0.8}%, ${alpha * 0.7})`;

        ctx.shadowBlur = 8 + Math.sin(time * 0.005 + i * 0.1) * 4;
        ctx.shadowColor = ctx.fillStyle as string;

        ctx.fillText(char, x, y);

        if (Math.random() < 0.03) {
          ctx.fillStyle = isDark ? "rgba(255,255,255,0.9)" : "rgba(0,0,0,0.5)";
          ctx.fillText(chars[Math.floor(Math.random() * 10)], x, y);
        }

        drops[i] += speeds[i] * speedBoost;

        if (drops[i] > height + 50 && Math.random() > 0.92) {
          drops[i] = -20 - Math.random() * 50;
          speeds[i] = 3 + Math.random() * 12;
        }
      }

      ctx.shadowBlur = 0;

      const centerX = width / 2 + mouseX * 80;
      const centerY = height / 2 + mouseY * 80;
      const pulseSize = 150 + Math.sin(time * 0.003) * 30;
      
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, pulseSize);
      gradient.addColorStop(0, isDark ? "rgba(99, 102, 241, 0.25)" : "rgba(99, 102, 241, 0.15)");
      gradient.addColorStop(0.4, isDark ? "rgba(6, 182, 212, 0.15)" : "rgba(6, 182, 212, 0.08)");
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      for (let i = 0; i < 20; i++) {
        const nodeX = width / 2 + Math.cos(time * 0.001 + i * 0.5) * 80;
        const nodeY = height / 2 + Math.sin(time * 0.0012 + i * 0.7) * 80;
        
        ctx.beginPath();
        ctx.arc(nodeX, nodeY, 3, 0, Math.PI * 2);
        ctx.fillStyle = isDark ? "rgba(255, 255, 255, 0.8)" : "rgba(99, 102, 241, 0.6)";
        ctx.shadowBlur = 15;
        ctx.shadowColor = isDark ? "#8b5cf6" : "#6366f1";
        ctx.fill();
        ctx.shadowBlur = 0;

        for (let j = i + 1; j < 20; j++) {
          const otherX = width / 2 + Math.cos(time * 0.001 + j * 0.5) * 80;
          const otherY = height / 2 + Math.sin(time * 0.0012 + j * 0.7) * 80;
          const dist = Math.sqrt(Math.pow(nodeX - otherX, 2) + Math.pow(nodeY - otherY, 2));
          
          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(nodeX, nodeY);
            ctx.lineTo(otherX, otherY);
            ctx.strokeStyle = isDark ? `rgba(139, 92, 246, ${0.4 - dist / 400})` : `rgba(99, 102, 241, ${0.3 - dist / 500})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
    };

    animate();

    return () => {
      cancelAnimationFrame(animationRef.current);
      canvas.removeEventListener("mousemove", handleMouseMove);
    };
  }, [resolvedTheme]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
    />
  );
}
