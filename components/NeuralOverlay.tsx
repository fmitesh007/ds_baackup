'use client';

import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useRef, useMemo } from "react";

function FloatingPoints() {
  const ref = useRef<THREE.Points>(null);

  const geometry = useMemo(() => {
    const count = 150;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 2.5;
      const y = (Math.random() - 0.5) * 2.5;
      const z = Math.random() * 0.5;
      
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      
      const colorChoice = Math.random();
      if (colorChoice < 0.5) {
        colors[i * 3] = 0;
        colors[i * 3 + 1] = 1;
        colors[i * 3 + 2] = 1;
      } else if (colorChoice < 0.8) {
        colors[i * 3] = 0.5;
        colors[i * 3 + 1] = 0.8;
        colors[i * 3 + 2] = 1;
      } else {
        colors[i * 3] = 1;
        colors[i * 3 + 1] = 0.8;
        colors[i * 3 + 2] = 0;
      }
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    return geo;
  }, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.rotation.y = t * 0.1;
    
    const positions = ref.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < positions.length / 3; i++) {
      const i3 = i * 3;
      positions[i3 + 1] += Math.sin(t + i) * 0.002;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial size={0.015} vertexColors transparent opacity={0.8} sizeAttenuation />
    </points>
  );
}

function SignalLines() {
  const ref = useRef<THREE.LineSegments>(null);

  const geometry = useMemo(() => {
    const points: THREE.Vector3[] = [];
    for (let i = 0; i < 20; i++) {
      const startX = -1 + Math.random() * 0.3;
      const startY = -1.2 + (i / 20) * 2.4;
      const endX = 1 + Math.random() * 0.2;
      const endY = startY + (Math.random() - 0.5) * 0.3;
      
      points.push(new THREE.Vector3(startX, startY, 0.2));
      points.push(new THREE.Vector3(endX, endY, 0.2));
    }
    return new THREE.BufferGeometry().setFromPoints(points);
  }, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    (ref.current.material as THREE.LineBasicMaterial).opacity = 0.3 + Math.sin(t * 3) * 0.2;
  });

  return (
    <lineSegments ref={ref} geometry={geometry}>
      <lineBasicMaterial color="#00ffff" transparent opacity={0.4} />
    </lineSegments>
  );
}

export default function NeuralOverlay() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <img 
        src="/neural-bg.png" 
        alt="Neural Background"
        className="w-full h-full object-cover opacity-40"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent" />
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 0, 2.5], fov: 50 }} gl={{ antialias: true }}>
          <color attach="background" args={['transparent']} />
          <FloatingPoints />
          <SignalLines />
        </Canvas>
      </div>
    </div>
  );
}