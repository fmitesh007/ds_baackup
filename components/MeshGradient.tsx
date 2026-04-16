'use client';

import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  precision highp float;
  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uMouse;
  varying vec2 vUv;

  vec3 colors[5];

  // Simplex noise functions
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute(permute(permute(
      i.z + vec4(0.0, i1.z, i2.z, 1.0))
      + i.y + vec4(0.0, i1.y, i2.y, 1.0))
      + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  float fbm(vec3 p) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 1.0;
    for(int i = 0; i < 4; i++) {
      value += amplitude * snoise(p * frequency);
      amplitude *= 0.5;
      frequency *= 2.0;
    }
    return value;
  }

  void main() {
    colors[0] = vec3(0.08, 0.08, 0.12); // Dark base
    colors[1] = vec3(0.2, 0.1, 0.4);    // Deep purple
    colors[2] = vec3(0.1, 0.3, 0.6);    // Electric blue
    colors[3] = vec3(0.5, 0.15, 0.4);   // Magenta
    colors[4] = vec3(0.2, 0.5, 0.7);    // Soft cyan

    vec2 uv = vUv;
    vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);
    
    // Mouse influence (subtle)
    vec2 mouseInfluence = (uMouse - 0.5) * 0.15;
    vec2 distortedUV = uv + mouseInfluence;

    float time = uTime * 0.15;

    // Create multiple flowing blobs using noise
    float blob1 = fbm(vec3(distortedUV * 2.0 + vec2(time * 0.5, time * 0.3), time * 0.2));
    float blob2 = fbm(vec3(distortedUV * 1.5 + vec2(-time * 0.4, time * 0.5), time * 0.3 + 10.0));
    float blob3 = fbm(vec3(distortedUV * 2.5 + vec2(time * 0.3, -time * 0.2), time * 0.25 + 20.0));
    float blob4 = fbm(vec3(distortedUV * 1.8 + vec2(-time * 0.2, -time * 0.4), time * 0.15 + 30.0));
    float blob5 = fbm(vec3(distortedUV * 3.0 + vec2(time * 0.1, time * 0.6), time * 0.1 + 40.0));

    // Smooth color blending
    float t1 = smoothstep(-0.3, 0.5, blob1);
    float t2 = smoothstep(-0.2, 0.6, blob2);
    float t3 = smoothstep(-0.1, 0.7, blob3);
    float t4 = smoothstep(-0.2, 0.5, blob4);
    float t5 = smoothstep(0.0, 0.8, blob5);

    // Mix colors based on blob values
    vec3 finalColor = colors[0];
    finalColor = mix(finalColor, colors[1], t1 * 0.7);
    finalColor = mix(finalColor, colors[2], t2 * 0.6);
    finalColor = mix(finalColor, colors[3], t3 * 0.5);
    finalColor = mix(finalColor, colors[4], t4 * 0.4);
    finalColor = mix(finalColor, colors[1] + colors[2] * 0.5, t5 * 0.3);

    // Add subtle glow/hotspots
    float glow1 = exp(-3.0 * length(uv - vec2(0.3 + sin(time) * 0.1, 0.4 + cos(time * 0.7) * 0.1)));
    float glow2 = exp(-3.0 * length(uv - vec2(0.7 + cos(time * 0.8) * 0.1, 0.6 + sin(time * 0.6) * 0.1)));
    float glow3 = exp(-2.5 * length(uv - vec2(0.5 + sin(time * 0.5) * 0.15, 0.3 + cos(time * 0.9) * 0.1)));

    finalColor += colors[2] * glow1 * 0.15;
    finalColor += colors[3] * glow2 * 0.12;
    finalColor += colors[4] * glow3 * 0.1;

    // Vignette
    vec2 vignetteUV = uv * (1.0 - uv);
    float vignette = vignetteUV.x * vignetteUV.y * 15.0;
    vignette = pow(vignette, 0.25);
    finalColor *= vignette;

    // Subtle noise/grain
    float noise = fract(sin(dot(uv * 1000.0, vec2(12.9898, 78.233))) * 43758.5453);
    finalColor += (noise - 0.5) * 0.015;

    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

interface MeshGradientProps {
  className?: string;
}

export default function MeshGradient({ className = '' }: MeshGradientProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || !containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.z = 1;

    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const uniforms = {
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(width, height) },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) }
    };

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      depthWrite: false,
      depthTest: false
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    let animationId: number;
    let startTime = Date.now();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: 1.0 - (e.clientY - rect.top) / rect.height
      };
    };

    const handleResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      renderer.setSize(w, h);
      uniforms.uResolution.value.set(w, h);
    };

    container.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    const animate = () => {
      uniforms.uTime.value = (Date.now() - startTime) * 0.001;
      
      // Smooth mouse interpolation
      uniforms.uMouse.value.x += (mouseRef.current.x - uniforms.uMouse.value.x) * 0.02;
      uniforms.uMouse.value.y += (mouseRef.current.y - uniforms.uMouse.value.y) * 0.02;

      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      container.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [isMounted]);

  return (
    <div 
      ref={containerRef} 
      className={`absolute inset-0 ${className}`}
      style={{ background: '#0b0b0f' }}
    />
  );
}