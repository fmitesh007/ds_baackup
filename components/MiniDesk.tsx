'use client';

import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text, Environment } from '@react-three/drei';
import { useTheme } from 'next-themes';
import * as THREE from 'three';

function CodeStream({ isDark }: { isDark: boolean }) {
  const ref = useRef<THREE.Mesh>(null);
  const speed = useMemo(() => 0.5 + Math.random() * 1.5, []);
  const offset = useMemo(() => Math.random() * Math.PI * 2, []);
  const startY = useMemo(() => -3 + Math.random() * 2, []);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.position.y = startY + ((state.clock.elapsedTime * speed + offset) % 8) - 2;
  });

  return (
    <mesh ref={ref}>
      <boxGeometry args={[0.02, 0.4 + Math.random() * 0.3, 0.02]} />
      <meshBasicMaterial 
        color={isDark ? '#22d3ee' : '#6366f1'} 
        transparent 
        opacity={0.6 + Math.random() * 0.4} 
      />
    </mesh>
  );
}

function FloatingParticles({ isDark }: { isDark: boolean }) {
  const count = 30;
  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 4,
      ],
      scale: 0.02 + Math.random() * 0.04,
      speed: 0.3 + Math.random() * 0.7,
      offset: Math.random() * Math.PI * 2,
    }));
  }, []);

  const refs = useRef<THREE.Mesh[]>([]);

  useFrame((state) => {
    particles.forEach((p, i) => {
      if (refs.current[i]) {
        refs.current[i].position.y += Math.sin(state.clock.elapsedTime * p.speed + p.offset) * 0.002;
        refs.current[i].position.x += Math.cos(state.clock.elapsedTime * p.speed * 0.5 + p.offset) * 0.001;
      }
    });
  });

  return (
    <group>
      {particles.map((p, i) => (
        <mesh
          key={i}
          ref={(el) => { if (el) refs.current[i] = el; }}
          position={p.position as [number, number, number]}
        >
          <sphereGeometry args={[p.scale, 8, 8]} />
          <meshBasicMaterial 
            color={isDark ? '#818cf8' : '#8b5cf6'} 
            transparent 
            opacity={0.8} 
          />
        </mesh>
      ))}
    </group>
  );
}

function Monitor({ isDark }: { isDark: boolean }) {
  const screenRef = useRef<THREE.Mesh>(null);
  const codeLines = useMemo(() => {
    const chars = '01{}[]<>/\\|;:ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*';
    return Array.from({ length: 12 }, () => 
      Array.from({ length: 20 }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
    );
  }, []);

  const scrollOffset = useRef(0);

  useFrame((state) => {
    scrollOffset.current = (state.clock.elapsedTime * 0.5) % 1;
  });

  return (
    <group position={[0, 0.8, 0]}>
      <mesh position={[0, 0, -0.05]}>
        <boxGeometry args={[1.6, 1, 0.1]} />
        <meshStandardMaterial color={isDark ? '#0f172a' : '#1e293b'} />
      </mesh>
      <mesh position={[0, 0, 0.01]}>
        <planeGeometry args={[1.4, 0.85]} />
        <meshBasicMaterial 
          color={isDark ? '#0a0a1a' : '#e2e8f0'} 
          transparent
          opacity={0.95}
        />
      </mesh>
      <Text
        position={[0, 0.3, 0.02]}
        fontSize={0.045}
        color={isDark ? '#22d3ee' : '#6366f1'}
        anchorX="left"
        anchorY="top"
        maxWidth={1.3}
      >
        {codeLines.slice(0, 10).join('\n')}
      </Text>
      <mesh position={[0, -0.65, -0.05]}>
        <boxGeometry args={[0.1, 0.3, 0.1]} />
        <meshStandardMaterial color={isDark ? '#1e293b' : '#94a3b8'} />
      </mesh>
      <mesh position={[0, -0.85, 0]}>
        <boxGeometry args={[0.6, 0.05, 0.4]} />
        <meshStandardMaterial color={isDark ? '#1e293b' : '#94a3b8'} />
      </mesh>
      <pointLight 
        position={[0, 0, 0.3]} 
        color={isDark ? '#22d3ee' : '#6366f1'} 
        intensity={0.5} 
        distance={2}
      />
    </group>
  );
}

function Desk() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  
  return (
    <group>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[3, 0.1, 1.5]} />
        <meshStandardMaterial color={isDark ? '#1e293b' : '#cbd5e1'} />
      </mesh>
      <mesh position={[-1.3, -0.4, 0]}>
        <boxGeometry args={[0.15, 0.8, 1.3]} />
        <meshStandardMaterial color={isDark ? '#0f172a' : '#94a3b8'} />
      </mesh>
      <mesh position={[1.3, -0.4, 0]}>
        <boxGeometry args={[0.15, 0.8, 1.3]} />
        <meshStandardMaterial color={isDark ? '#0f172a' : '#94a3b8'} />
      </mesh>
    </group>
  );
}

function Scene() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  const groupRef = useRef<THREE.Group>(null);
  const { mouse } = useThree();

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.rotation.y = Math.sin(t * 0.1) * 0.1 + mouse.x * 0.1;
    groupRef.current.rotation.x = Math.cos(t * 0.1) * 0.05 + mouse.y * 0.05;
  });

  return (
    <>
      <ambientLight intensity={isDark ? 0.3 : 0.8} />
      <directionalLight position={[5, 5, 5]} intensity={isDark ? 0.5 : 1} />
      <pointLight position={[-3, 2, 2]} color="#818cf8" intensity={0.3} />
      
      <group ref={groupRef}>
        <Desk />
        <Monitor isDark={isDark} />
        <FloatingParticles isDark={isDark} />
        {Array.from({ length: 15 }, (_, i) => (
          <CodeStream key={i} isDark={isDark} />
        ))}
      </group>
      
      <Environment preset={isDark ? 'night' : 'city'} />
    </>
  );
}

export default function MiniDesk() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Canvas
      camera={{ position: [4, 3, 4], fov: 45 }}
      style={{ width: '100%', height: '100%' }}
    >
      <Scene />
    </Canvas>
  );
}
