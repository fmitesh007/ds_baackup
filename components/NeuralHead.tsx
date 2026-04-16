'use client';

import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useRef, useMemo } from "react";

function HeadPoints() {
  const ref = useRef<THREE.Points>(null);

  const geometry = useMemo(() => {
    const geo = new THREE.SphereGeometry(1, 64, 64);
    const pos = geo.attributes.position;

    for (let i = 0; i < pos.count; i++) {
      let x = pos.getX(i);
      let y = pos.getY(i);
      let z = pos.getZ(i);

      y *= 1.2;
      z *= 0.75;

      if (z > 0.15 && Math.abs(x) < 0.15 && y > -0.15) {
        z += 0.15;
      }

      if (y < -0.4) {
        z -= 0.08;
      }

      if (z < -0.25) {
        z -= 0.15;
      }

      pos.setXYZ(i, x, y, z);
    }

    return geo;
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (!ref.current) return;
    const pos = ref.current.geometry.attributes.position;

    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      pos.setZ(i, pos.getZ(i) + Math.sin(t + x * 2 + y * 2) * 0.001);
    }

    pos.needsUpdate = true;
    ref.current.rotation.y = t * 0.12;
  });

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial
        size={0.008}
        color="#4cc9f0"
        transparent
        opacity={0.85}
        sizeAttenuation
      />
    </points>
  );
}

function Connections() {
  const ref = useRef<THREE.LineSegments>(null);

  const geometry = useMemo(() => {
    const points = [];
    for (let i = 0; i < 350; i++) {
      const p1 = new THREE.Vector3(
        (Math.random() - 0.5) * 2.2,
        (Math.random() - 0.5) * 2.8,
        (Math.random() - 0.5) * 2.2
      );
      const p2 = p1.clone().add(
        new THREE.Vector3(
          (Math.random() - 0.5) * 0.18,
          (Math.random() - 0.5) * 0.18,
          (Math.random() - 0.5) * 0.18
        )
      );
      points.push(p1, p2);
    }
    return new THREE.BufferGeometry().setFromPoints(points);
  }, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = clock.getElapsedTime() * 0.08;
  });

  return (
    <lineSegments ref={ref} geometry={geometry}>
      <lineBasicMaterial color="#ffd166" transparent opacity={0.45} />
    </lineSegments>
  );
}

export default function NeuralHead() {
  return (
    <Canvas camera={{ position: [0, 0, 2.8] }} gl={{ antialias: true }}>
      <color attach="background" args={['transparent']} />
      <ambientLight intensity={0.4} />
      <HeadPoints />
      <Connections />
    </Canvas>
  );
}