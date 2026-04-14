"use client";

import { useRef, useEffect } from "react";
import * as THREE from "three";

interface Props {
  progress: number;
}

export default function CampoWireframe({ progress }: Props) {
  const mountRef = useRef<HTMLDivElement>(null);
  const threeRef = useRef<{
    renderer: THREE.WebGLRenderer;
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    group: THREE.Group;
    animId: number;
    baseRotation: number;
    running: boolean;
  } | null>(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el || threeRef.current) return;

    const W = el.clientWidth || 480;
    const H = el.clientHeight || 480;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(52, W / H, 0.1, 200);
    // Más cerca para llenar el espacio grande, ligeramente elevada
    camera.position.set(0, 8, 13);
    camera.lookAt(0, 1.2, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
    // pixelRatio = 1 siempre: wireframes no necesitan retina, ahorra ~4× fillrate en pantallas retina
    renderer.setPixelRatio(1);
    renderer.setSize(W, H);
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);

    const group = new THREE.Group();
    // Escala reducida para que el campo entre holgadamente en cualquier aspect ratio
    group.scale.set(0.72, 0.72, 0.72);
    scene.add(group);

    // ── Materiales ──────────────────────────────────────────────────────────
    const matGrid    = new THREE.LineBasicMaterial({ color: 0xB3A86A, transparent: true, opacity: 0.13 });
    const matPlant   = new THREE.LineBasicMaterial({ color: 0xC5BC82, transparent: true, opacity: 0.75 });
    const matStubble = new THREE.LineBasicMaterial({ color: 0xB3A86A, transparent: true, opacity: 0.38 });
    const matDivider = new THREE.LineBasicMaterial({ color: 0xD4C47A, transparent: true, opacity: 1.0 });

    // ── Helpers ─────────────────────────────────────────────────────────────
    const v = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z);

    function buildSegs(pairs: [THREE.Vector3, THREE.Vector3][]): THREE.BufferGeometry {
      const pos: number[] = [];
      for (const [a, b] of pairs) pos.push(a.x, a.y, a.z, b.x, b.y, b.z);
      const geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
      return geo;
    }

    // ── Grilla de suelo ──────────────────────────────────────────────────────
    const gridPairs: [THREE.Vector3, THREE.Vector3][] = [];
    const GH = 8, GD = 18;
    for (let i = 0; i <= GD; i++) {
      const t = -GH + i * (GH * 2 / GD);
      gridPairs.push([v(t, 0, -GH), v(t, 0, GH)]);
      gridPairs.push([v(-GH, 0, t), v(GH, 0, t)]);
    }
    group.add(new THREE.LineSegments(buildSegs(gridPairs), matGrid));

    // ── Planta de mijo (tallo + hojas + panícula) ────────────────────────────
    function mijoPlant(px: number, pz: number, h: number, seed: number): [THREE.Vector3, THREE.Vector3][] {
      const s: [THREE.Vector3, THREE.Vector3][] = [];
      const dx = Math.sin(seed * 3.7) * 0.06;
      const dz = Math.cos(seed * 2.1) * 0.06;
      s.push([v(px, 0, pz), v(px + dx, h, pz + dz)]);
      s.push([v(px, h * 0.26, pz), v(px - 0.28, h * 0.50, pz + 0.08)]);
      s.push([v(px + dx * 0.4, h * 0.50, pz), v(px + 0.22, h * 0.70, pz - 0.07)]);
      s.push([v(px + dx * 0.7, h * 0.72, pz), v(px - 0.11, h * 0.83, pz + 0.05)]);
      // Panícula
      const tx = px + dx, ty = h, tz = pz + dz;
      s.push([v(tx, ty * 0.88, tz), v(tx - 0.14, ty + 0.26, tz + 0.04)]);
      s.push([v(tx, ty * 0.88, tz), v(tx + 0.10, ty + 0.23, tz - 0.05)]);
      s.push([v(tx, ty * 0.88, tz), v(tx - 0.04, ty + 0.29, tz - 0.07)]);
      s.push([v(tx, ty * 0.92, tz), v(tx + 0.08, ty + 0.19, tz + 0.07)]);
      return s;
    }

    // ── Rastrojo post-cosecha ────────────────────────────────────────────────
    function stubble(px: number, pz: number, h: number, seed: number): [THREE.Vector3, THREE.Vector3][] {
      const dx = Math.sin(seed * 4.1) * 0.04;
      return [
        [v(px, 0, pz), v(px + dx, h, pz + dx * 0.5)],
        [v(px + dx * 0.5, h * 0.55, pz), v(px + 0.07, h * 0.90, pz + 0.04)],
      ];
    }

    // ── Geometría de plantas: 7 cols × 8 filas (reducido para perf) ─────────
    const plantPairs: [THREE.Vector3, THREE.Vector3][] = [];
    for (let c = 0; c < 7; c++) {
      for (let r = 0; r < 8; r++) {
        const seed = c * 17.3 + r * 7.9;
        const px = -6.6 + c * 0.88 + (r % 2) * 0.2;
        const pz = -3.1 + r * 0.82;
        const h  = 1.75 + Math.sin(seed) * 0.26;
        plantPairs.push(...mijoPlant(px, pz, h, seed));
      }
    }
    group.add(new THREE.LineSegments(buildSegs(plantPairs), matPlant));

    // ── Geometría de rastrojo: 7 cols × 8 filas ──────────────────────────────
    const stubblePairs: [THREE.Vector3, THREE.Vector3][] = [];
    for (let c = 0; c < 7; c++) {
      for (let r = 0; r < 8; r++) {
        const seed = c * 11.7 + r * 13.3;
        const px = 0.5 + c * 0.88 + (r % 2) * 0.14;
        const pz = -3.1 + r * 0.82;
        const h  = 0.18 + Math.abs(Math.sin(seed)) * 0.08;
        stubblePairs.push(...stubble(px, pz, h, seed));
      }
    }
    group.add(new THREE.LineSegments(buildSegs(stubblePairs), matStubble));

    // ── Línea divisoria cosecha ──────────────────────────────────────────────
    const divGeo = new THREE.BufferGeometry().setFromPoints([v(0, 0.02, -4.4), v(0, 0.02, 4.4)]);
    group.add(new THREE.Line(divGeo, matDivider));

    // ── Rotación inicial ─────────────────────────────────────────────────────
    group.rotation.y = -0.45;

    // ── Render loop — throttleado a ~30fps, pausa cuando off-screen ──────────
    let autoT = 0;
    let frame = 0;
    let animId = 0;

    function render() {
      animId = requestAnimationFrame(render);
      frame++;
      // Saltar frames impares → 30fps efectivos en lugar de 60fps
      if (frame % 2 !== 0) return;
      if (!threeRef.current?.running) return;

      autoT += 0.009;
      group.rotation.y = (threeRef.current?.baseRotation ?? -0.45) + Math.sin(autoT) * 0.05;
      renderer.render(scene, camera);
    }
    animId = requestAnimationFrame(render);

    // ── Pausar cuando el canvas no es visible (IntersectionObserver) ─────────
    const io = new IntersectionObserver(
      ([entry]) => {
        if (threeRef.current) threeRef.current.running = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );
    io.observe(el);

    // ── Resize observer ───────────────────────────────────────────────────────
    const ro = new ResizeObserver(() => {
      const W = el.clientWidth;
      const H = el.clientHeight;
      if (!W || !H) return;
      camera.aspect = W / H;
      camera.updateProjectionMatrix();
      renderer.setSize(W, H);
    });
    ro.observe(el);

    threeRef.current = { renderer, scene, camera, group, animId, baseRotation: -0.45, running: true };

    return () => {
      cancelAnimationFrame(animId);
      io.disconnect();
      ro.disconnect();
      renderer.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
      threeRef.current = null;
    };
  }, []);

  // ── Actualizar rotación base desde scroll ────────────────────────────────
  useEffect(() => {
    if (!threeRef.current) return;
    threeRef.current.baseRotation = -0.45 + progress * 1.3;
  }, [progress]);

  return (
    <div
      ref={mountRef}
      style={{ width: "100%", height: "100%", position: "absolute", inset: 0 }}
    />
  );
}
