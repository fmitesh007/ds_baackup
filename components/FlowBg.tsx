"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import gsap from "gsap";
import * as THREE from "three";

type Props = {
  zIndex?: number;
};

const VERT_BLOOM_EXTRACT = `
varying vec2 vUv;
void main(){
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const FRAG_BLOOM_EXTRACT = `
precision mediump float;
uniform sampler2D tDiffuse;
uniform float threshold;
varying vec2 vUv;
void main(){
  vec4 color = texture2D(tDiffuse, vUv);
  float brightness = dot(color.rgb, vec3(0.2126, 0.7152, 0.0722));
  if(brightness > threshold){
    gl_FragColor = color;
  } else {
    gl_FragColor = vec4(0.0);
  }
}
`;

const FRAG_BLUR = `
precision mediump float;
uniform sampler2D tDiffuse;
uniform vec2 direction;
uniform vec2 resolution;
varying vec2 vUv;
void main(){
  vec2 texelSize = 1.0 / resolution;
  vec4 result = vec4(0.0);
  float weights[5];
  weights[0] = 0.227027;
  weights[1] = 0.1945946;
  weights[2] = 0.1216216;
  weights[3] = 0.054054;
  weights[4] = 0.016216;
  result += texture2D(tDiffuse, vUv) * weights[0];
  for(int i = 1; i < 5; i++){
    result += texture2D(tDiffuse, vUv + direction * texelSize * float(i) * 4.0) * weights[i];
    result += texture2D(tDiffuse, vUv - direction * texelSize * float(i) * 4.0) * weights[i];
  }
  gl_FragColor = result;
}
`;

const FRAG_COMPOSITE = `
precision mediump float;
uniform sampler2D tScene;
uniform sampler2D tBloom;
uniform float bloomStrength;
varying vec2 vUv;
void main(){
  vec4 scene = texture2D(tScene, vUv);
  vec4 bloom = texture2D(tBloom, vUv);
  gl_FragColor = scene + bloom * bloomStrength;
}
`;

export default function FlowBg({ zIndex = -1 }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const isDark = resolvedTheme === "dark";

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    renderer.domElement.style.position = "fixed";
    renderer.domElement.style.left = "0";
    renderer.domElement.style.top = "0";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.zIndex = String(zIndex);
    renderer.domElement.style.pointerEvents = "none";

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 50;

    const baseColor = isDark ? new THREE.Color(0x0a0a15) : new THREE.Color(0xfffbf5);
    scene.background = baseColor;

    const blobMeshes: THREE.Mesh[] = [];

    const blobConfigs = [
      { color: isDark ? 0x3b2070 : 0x7c3aed, size: 12, x: -15, y: 5, z: -20, speed: 0.15 },
      { color: isDark ? 0x1a4080 : 0x06b6d4, size: 11, x: 12, y: -8, z: -15, speed: 0.12 },
      { color: isDark ? 0x804040 : 0xf97316, size: 12, x: 5, y: 10, z: -25, speed: 0.18 },
      { color: isDark ? 0xffffff : 0xffffff, size: 5, x: 20, y: -15, z: -10, speed: 0.25 },
    ];

    blobConfigs.forEach((config) => {
      const geometry = new THREE.PlaneGeometry(config.size, config.size * 0.6);
      const material = new THREE.MeshBasicMaterial({
        color: config.color,
        transparent: true,
        opacity: isDark ? 0.9 : 0.95,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(config.x, config.y, config.z);
      (mesh as any).speed = config.speed;
      (mesh as any).baseX = config.x;
      (mesh as any).baseY = config.y;
      scene.add(mesh);
      blobMeshes.push(mesh);
    });

    const particleGroups: THREE.Points[] = [];
    const layerConfigs = [
      { count: 200, spread: 80, speed: 0.02, size: 1.2, opacity: 0.4 },
      { count: 150, spread: 60, speed: 0.05, size: 0.8, opacity: 0.6 },
      { count: 100, spread: 40, speed: 0.08, size: 0.5, opacity: 0.8 },
    ];

    layerConfigs.forEach((config) => {
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(config.count * 3);
      const colors = new Float32Array(config.count * 3);

      for (let i = 0; i < config.count; i++) {
        positions[i * 3] = (Math.random() - 0.5) * config.spread * 2;
        positions[i * 3 + 1] = (Math.random() - 0.5) * config.spread * 2;
        positions[i * 3 + 2] = (Math.random() - 0.5) * config.spread;

        const hue = isDark ? 0.6 + Math.random() * 0.2 : 0.55 + Math.random() * 0.25;
        const color = new THREE.Color().setHSL(hue, isDark ? 0.8 : 0.7, isDark ? 0.6 : 0.5);
        colors[i * 3] = color.r;
        colors[i * 3 + 1] = color.g;
        colors[i * 3 + 2] = color.b;
      }

      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

      const material = new THREE.PointsMaterial({
        size: config.size,
        vertexColors: true,
        transparent: true,
        opacity: config.opacity,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        sizeAttenuation: true,
      });

      const points = new THREE.Points(geometry, material);
      (points as any).speed = config.speed;
      scene.add(points);
      particleGroups.push(points);
    });

    const composerScene = new THREE.Scene();
    const composerCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const composerGeometry = new THREE.PlaneGeometry(2, 2);

    const createShaderMaterial = (fs: string, uniforms: Record<string, any>) => {
      return new THREE.ShaderMaterial({
        vertexShader: VERT_BLOOM_EXTRACT,
        fragmentShader: fs,
        uniforms,
        depthTest: false,
        depthWrite: false,
      });
    };

    const bloomStrength = isDark ? 1.2 : 2.0;
    const rtParams = {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      format: THREE.RGBAFormat,
    };
    const renderTargetA = new THREE.WebGLRenderTarget(window.innerWidth / 4, window.innerHeight / 4, rtParams);
    const renderTargetB = new THREE.WebGLRenderTarget(window.innerWidth / 4, window.innerHeight / 4, rtParams);

    const blurExtractMaterial = createShaderMaterial(FRAG_BLOOM_EXTRACT, {
      tDiffuse: { value: null },
      threshold: { value: isDark ? 0.15 : 0.05 },
    });

    const blurMaterialH = createShaderMaterial(FRAG_BLUR, {
      tDiffuse: { value: null },
      direction: { value: new THREE.Vector2(1, 0) },
      resolution: { value: new THREE.Vector2(window.innerWidth / 4, window.innerHeight / 4) },
    });

    const blurMaterialV = createShaderMaterial(FRAG_BLUR, {
      tDiffuse: { value: null },
      direction: { value: new THREE.Vector2(0, 1) },
      resolution: { value: new THREE.Vector2(window.innerWidth / 4, window.innerHeight / 4) },
    });

    const compositeMaterial = createShaderMaterial(FRAG_COMPOSITE, {
      tScene: { value: null },
      tBloom: { value: null },
      bloomStrength: { value: bloomStrength },
    });

    const fullscreenQuad = new THREE.Mesh(composerGeometry, blurExtractMaterial);
    composerScene.add(fullscreenQuad);

    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches?.[0]) {
        mouse.targetX = (e.touches[0].clientX / window.innerWidth - 0.5) * 2;
        mouse.targetY = (e.touches[0].clientY / window.innerHeight - 0.5) * 2;
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);

      renderTargetA.setSize(window.innerWidth / 4, window.innerHeight / 4);
      renderTargetB.setSize(window.innerWidth / 4, window.innerHeight / 4);
      blurMaterialH.uniforms.resolution.value.set(window.innerWidth / 4, window.innerHeight / 4);
      blurMaterialV.uniforms.resolution.value.set(window.innerWidth / 4, window.innerHeight / 4);
    };
    window.addEventListener("resize", handleResize);

    let time = 0;
    const animIdRef = { current: 0 };

    const animate = () => {
      animIdRef.current = requestAnimationFrame(animate);
      time += 0.016;

      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      camera.position.x = mouse.x * 8;
      camera.position.y = -mouse.y * 5;
      camera.lookAt(0, 0, 0);

      blobMeshes.forEach((mesh) => {
        const speed = (mesh as any).speed;
        const baseX = (mesh as any).baseX;
        const baseY = (mesh as any).baseY;
        mesh.position.x = baseX + Math.sin(time * speed) * 3;
        mesh.position.y = baseY + Math.cos(time * speed * 0.7) * 2;
        mesh.rotation.z = Math.sin(time * speed * 0.5) * 0.1;
      });

      particleGroups.forEach((points) => {
        const speed = (points as any).speed;
        points.rotation.z += speed * 0.01;
        points.rotation.x += speed * 0.005;
      });

      renderer.setRenderTarget(renderTargetA);
      renderer.render(scene, camera);

      fullscreenQuad.material = blurExtractMaterial;
      blurExtractMaterial.uniforms.tDiffuse.value = renderTargetA.texture;
      renderer.setRenderTarget(renderTargetB);
      renderer.render(composerScene, composerCamera);

      for (let i = 0; i < 4; i++) {
        fullscreenQuad.material = blurMaterialH;
        blurMaterialH.uniforms.tDiffuse.value = renderTargetB.texture;
        renderer.setRenderTarget(renderTargetA);
        renderer.render(composerScene, composerCamera);

        fullscreenQuad.material = blurMaterialV;
        blurMaterialV.uniforms.tDiffuse.value = renderTargetA.texture;
        renderer.setRenderTarget(renderTargetB);
        renderer.render(composerScene, composerCamera);
      }

      fullscreenQuad.material = compositeMaterial;
      compositeMaterial.uniforms.tScene.value = renderTargetA.texture;
      compositeMaterial.uniforms.tBloom.value = renderTargetB.texture;
      renderer.setRenderTarget(null);
      renderer.render(composerScene, composerCamera);
    };

    animate();

    const updateMode = (dark: boolean) => {
      const bgColor = dark ? new THREE.Color(0x0a0a15) : new THREE.Color(0xfffbf5);
      scene.background = bgColor;

      const colors = dark ? [0x3b2070, 0x1a4080, 0x804040, 0xffffff] : [0x7c3aed, 0x06b6d4, 0xf97316, 0xffffff];
      blobMeshes.forEach((mesh, i) => {
        (mesh.material as THREE.MeshBasicMaterial).color.setHex(colors[i]);
        (mesh.material as THREE.MeshBasicMaterial).opacity = dark ? 0.9 : 0.95;
      });

      particleGroups.forEach((points) => {
        const positions = points.geometry.attributes.position.array as Float32Array;
        const colors = points.geometry.attributes.color.array as Float32Array;
        const count = positions.length / 3;
        for (let i = 0; i < count; i++) {
          const hue = dark ? 0.6 + Math.random() * 0.2 : 0.55 + Math.random() * 0.25;
          const color = new THREE.Color().setHSL(hue, dark ? 0.8 : 0.7, dark ? 0.6 : 0.5);
          colors[i * 3] = color.r;
          colors[i * 3 + 1] = color.g;
          colors[i * 3 + 2] = color.b;
        }
        points.geometry.attributes.color.needsUpdate = true;
      });
    };

    (window as Window & { __flowBgToggleMode?: (to: "day" | "night") => void }).__flowBgToggleMode = (to: "day" | "night") => {
      gsap.to({}, {
        duration: 0.9,
        onStart: () => updateMode(to === "night"),
        ease: "power2.out"
      });
    };

    return () => {
      cancelAnimationFrame(animIdRef.current);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("resize", handleResize);
      delete (window as Window & { __flowBgToggleMode?: (to: "day" | "night") => void }).__flowBgToggleMode;

      blobMeshes.forEach(m => m.geometry.dispose());
      blobMeshes.forEach(m => (m.material as THREE.Material).dispose());
      particleGroups.forEach(p => p.geometry.dispose());
      particleGroups.forEach(p => (p.material as THREE.Material).dispose());

      renderTargetA.dispose();
      renderTargetB.dispose();
      blurExtractMaterial.dispose();
      blurMaterialH.dispose();
      blurMaterialV.dispose();
      compositeMaterial.dispose();

      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, [zIndex, resolvedTheme]);

  return <div ref={containerRef} style={{ display: "block" }} />;
}
