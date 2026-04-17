"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

export default function TechMatrix() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const isDark = resolvedTheme === "dark";
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const chars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン{}[]<>/\\|;:ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()+=~-_.:;<>?/\\|".split("");
    const fontSize = 14;
    const columns = Math.floor(width / fontSize);
    const drops: number[] = [];
    const speeds: number[] = [];

    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100;
      speeds[i] = 2 + Math.random() * 8;
    }

    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;
    let scrollY = 0;
    let targetScrollY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX - width / 2) / width;
      targetMouseY = (e.clientY - height / 2) / height;
    };

    const handleScroll = () => {
      targetScrollY = window.scrollY * 0.5;
    };

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    let time = 0;

    const draw = () => {
      animationRef.current = requestAnimationFrame(draw);
      time += 16;

      mouseX += (targetMouseX - mouseX) * 0.1;
      mouseY += (targetMouseY - mouseY) * 0.1;
      scrollY += (targetScrollY - scrollY) * 0.1;

      ctx.fillStyle = isDark ? "rgba(10, 10, 15, 0.05)" : "rgba(248, 250, 252, 0.08)";
      ctx.fillRect(0, 0, width, height);

      ctx.font = `${fontSize}px "SF Mono", "Fira Code", "Courier New", monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = (drops[i] + scrollY) % (height + 100);

        const centerDist = Math.sqrt(Math.pow(i / columns - 0.5, 2) + Math.pow((drops[i] % height) / height - 0.5, 2));
        const mouseInfluence = 1 - Math.min(1, Math.sqrt(Math.pow(mouseX * 3, 2) + Math.pow(mouseY * 3, 2)));

        const hue = (time * 0.02 + i * 2 + drops[i]) % 360;
        const sat = 70 + Math.sin(time * 0.001 + i * 0.1) * 30;
        const light = 50 + Math.sin(time * 0.002 + drops[i] * 0.01) * 20;
        
        const alpha = 0.6 + Math.sin(time * 0.003 + i * 0.2) * 0.3;
        
        ctx.fillStyle = isDark 
          ? `hsla(${hue}, ${sat}%, ${light}%, ${alpha})`
          : `hsla(${hue}, ${sat * 0.5}%, ${light * 0.5}%, ${alpha * 0.7})`;

        const glow = Math.sin(time * 0.005 + i * 0.1) * 0.5 + 0.5;
        ctx.shadowBlur = 10 * glow;
        ctx.shadowColor = ctx.fillStyle as string;

        ctx.fillText(char, x, y);

        if (Math.random() < 0.02) {
          ctx.fillStyle = isDark ? "rgba(255, 255, 255, 0.8)" : "rgba(0, 0, 0, 0.6)";
          ctx.fillText(chars[Math.floor(Math.random() * 10)], x, y);
        }

        drops[i] += speeds[i];

        if (drops[i] > height + 100) {
          if (Math.random() > 0.95) {
            drops[i] = -50 - Math.random() * 100;
            speeds[i] = 2 + Math.random() * 8;
          }
        }
      }

      ctx.shadowBlur = 0;

      const gradX = width / 2 + mouseX * width * 0.3;
      const gradY = height / 2 + mouseY * height * 0.3;
      const gradient = ctx.createRadialGradient(gradX, gradY, 0, gradX, gradY, Math.max(width, height) * 0.6);
      gradient.addColorStop(0, isDark ? "rgba(99, 102, 241, 0.1)" : "rgba(99, 102, 241, 0.05)");
      gradient.addColorStop(0.5, isDark ? "rgba(6, 182, 212, 0.05)" : "rgba(6, 182, 212, 0.03)");
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

    };

    draw();

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [resolvedTheme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-[-1]"
    />
  );
}
