"use client";

import { useRef, useEffect } from "react";
import * as THREE from "three";

/* ── Constantes de cámara ────────────────────────────────────────────
   SCENE_TOP  = unidades de mundo visibles encima del suelo (plantas)
   SCENE_BOT  = unidades de mundo visibles debajo del suelo (raíces)
   3m de profundidad = 7 unidades de mundo
   ground line (y=0) queda al 40% desde arriba ──────────────────── */
const SCENE_TOP = 5.6;
const SCENE_BOT = -8.4;
const SCENE_H   = SCENE_TOP - SCENE_BOT; // 14
const M         = 7 / 3;                 // unidades por metro de profundidad

/* Porcentajes para overlays HTML (no cambian con resize) */
const groundPct = (SCENE_TOP / SCENE_H) * 100;               // 40 %
const mPct = (m: number) => ((SCENE_TOP + m * M) / SCENE_H) * 100;

export default function SolucionViz() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    let animId: number;
    let frame = 0;

    const getSize = () => ({ W: el.clientWidth || 480, H: el.clientHeight || 520 });
    const { W, H } = getSize();
    const aspect = W / H;
    const halfW  = (SCENE_H / 2) * aspect;

    /* ── Escena ─────────────────────────────────────────────────── */
    const scene  = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(
      -halfW, halfW, SCENE_TOP, SCENE_BOT, 0.1, 100
    );
    camera.position.set(0, 0, 10);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(W, H);
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);

    /* ── Helpers ─────────────────────────────────────────────────── */
    const v = (x: number, y: number) => new THREE.Vector3(x, y, 0);

    function addSegs(
      pairs: [THREE.Vector3, THREE.Vector3][],
      mat: THREE.LineBasicMaterial
    ) {
      const pos: number[] = [];
      pairs.forEach(([a, b]) => pos.push(a.x, a.y, 0, b.x, b.y, 0));
      const geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
      scene.add(new THREE.LineSegments(geo, mat));
    }

    /* ── Materiales ─────────────────────────────────────────────── */
    const mGround   = new THREE.LineBasicMaterial({ color: 0xB3A86A });
    const mPlant    = new THREE.LineBasicMaterial({ color: 0xD4C87A, transparent: true, opacity: 0.92 });
    const mRoot1    = new THREE.LineBasicMaterial({ color: 0xB3A86A, transparent: true, opacity: 0.68 });
    const mRoot2    = new THREE.LineBasicMaterial({ color: 0xB3A86A, transparent: true, opacity: 0.42 });
    const mRoot3    = new THREE.LineBasicMaterial({ color: 0xB3A86A, transparent: true, opacity: 0.22 });
    const mDepth    = new THREE.LineBasicMaterial({ color: 0xB3A86A, transparent: true, opacity: 0.10 });
    const mSoil     = new THREE.LineBasicMaterial({ color: 0xB3A86A, transparent: true, opacity: 0.06 });

    /* ── Líneas de profundidad (muy anchas para sobrevivir resize) ─ */
    addSegs(
      [1, 2, 3].map(m => [v(-60, -m * M), v(60, -m * M)] as [THREE.Vector3, THREE.Vector3]),
      mDepth
    );

    /* ── Línea de suelo ─────────────────────────────────────────── */
    addSegs([[v(-60, 0), v(60, 0)]], mGround);

    /* ── Plantas (5 tallos) ─────────────────────────────────────── */
    const PX = [-3.4, -1.7, 0, 1.7, 3.4];
    const plantPairs: [THREE.Vector3, THREE.Vector3][] = [];

    PX.forEach((px, i) => {
      const seed = i * 2.618;
      const h    = 4.1 + Math.sin(seed) * 0.32;
      const lean = Math.sin(seed * 1.7) * 0.13;
      const tx   = px + lean;

      // Tallo principal
      plantPairs.push([v(px, 0), v(tx, h)]);

      // Hojas
      const leaves: [number, number, number][] = [
        [0.27, -0.58, 0.18],
        [0.50,  0.50, 0.13],
        [0.69, -0.34, 0.10],
      ];
      leaves.forEach(([t, dx, dh]) => {
        plantPairs.push([
          v(px + lean * t, h * t),
          v(px + lean * t + dx, h * t + h * dh),
        ]);
      });

      // Panícula
      const pb = h * 0.88;
      [[-0.21, 0.39], [0.18, 0.34], [0, 0.46], [-0.12, 0.29], [0.14, 0.26]].forEach(([dx, dy]) => {
        plantPairs.push([v(tx, pb), v(tx + dx, h + dy)]);
      });
    });
    addSegs(plantPairs, mPlant);

    /* ── Sistema radicular ───────────────────────────────────────── */
    const r1: [THREE.Vector3, THREE.Vector3][] = [];
    const r2: [THREE.Vector3, THREE.Vector3][] = [];
    const r3: [THREE.Vector3, THREE.Vector3][] = [];

    PX.forEach((px, i) => {
      const s    = i * 3.14;
      const lean = Math.sin(s) * 0.10;

      // Raíz principal (0 → 3m = -7 unidades)
      r1.push([v(px, 0), v(px + lean, -7.0)]);

      // Laterales primarias ~1m
      const y1 = -M;
      r1.push([v(px + lean * 0.33, y1), v(px - 0.88 + Math.sin(s) * 0.28, y1 - 0.95)]);
      r1.push([v(px + lean * 0.33, y1), v(px + 0.80 + Math.cos(s * 1.3) * 0.22, y1 - 0.72)]);

      // Secundarias ~1.5m
      const y15 = -M * 1.5;
      r2.push([v(px + lean * 0.50, y15), v(px - 0.62 + Math.sin(s * 2) * 0.18, y15 - 0.76)]);
      r2.push([v(px + lean * 0.50, y15), v(px + 0.57 + Math.cos(s * 2.3) * 0.18, y15 - 0.58)]);

      // ~2m
      const y2 = -M * 2;
      r2.push([v(px + lean * 0.67, y2), v(px - 0.44 + Math.sin(s * 0.7) * 0.14, y2 - 0.66)]);
      r2.push([v(px + lean * 0.67, y2), v(px + 0.40 + Math.cos(s * 1.1) * 0.14, y2 - 0.48)]);

      // Finas ~2.7m
      const y3 = -M * 2.7;
      r3.push([v(px + lean * 0.85, y3), v(px - 0.24, y3 - 0.44)]);
      r3.push([v(px + lean * 0.85, y3), v(px + 0.21, y3 - 0.37)]);
      r3.push([v(px + lean * 0.85, y3), v(px + 0.05, y3 - 0.54)]);
    });

    // Conexiones laterales entre plantas (red subterránea)
    for (let i = 0; i < PX.length - 1; i++) {
      r2.push([v(PX[i] + 0.3, -M * 1.8), v(PX[i + 1] - 0.3, -M * 1.6)]);
      r3.push([v(PX[i] + 0.15, -M * 2.5), v(PX[i + 1] - 0.15, -M * 2.3)]);
    }

    addSegs(r1, mRoot1);
    addSegs(r2, mRoot2);
    addSegs(r3, mRoot3);

    /* ── Partículas de suelo ────────────────────────────────────── */
    const RNG = (n: number) => ((Math.sin(n * 127.1 + 311.7) * 43758.5453) % 1 + 1) % 1 * 2 - 1;
    const particles: [THREE.Vector3, THREE.Vector3][] = [];
    for (let i = 0; i < 130; i++) {
      const px = RNG(i * 1.1) * 6.5;
      const py = RNG(i * 2.3) * 3.8 - 4.2;
      const s  = 0.035 + Math.abs(RNG(i * 3.7)) * 0.045;
      particles.push([v(px - s, py), v(px + s, py)]);
    }
    addSegs(particles, mSoil);

    /* ── Loop de render — throttleado a ~30fps ───────────────────── */
    let running = true;

    function animate() {
      animId = requestAnimationFrame(animate);
      frame++;
      if (frame % 2 !== 0 || !running) return;
      renderer.render(scene, camera);
    }
    animate();

    /* ── Pause cuando fuera de viewport ─────────────────────────── */
    const io = new IntersectionObserver(
      ([entry]) => { running = entry.isIntersecting; },
      { threshold: 0.05 }
    );
    io.observe(el);

    /* ── Resize ──────────────────────────────────────────────────── */
    const ro = new ResizeObserver(() => {
      const { W: nW, H: nH } = getSize();
      if (!nW || !nH) return;
      const asp = nW / nH;
      const hw  = (SCENE_H / 2) * asp;
      const cam = camera as THREE.OrthographicCamera;
      cam.left  = -hw;
      cam.right =  hw;
      cam.updateProjectionMatrix();
      renderer.setSize(nW, nH);
    });
    ro.observe(el);

    return () => {
      cancelAnimationFrame(animId);
      io.disconnect();
      ro.disconnect();
      renderer.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, []);

  /* ── Estilos comunes para labels ─────────────────────────────── */
  const labelBase: React.CSSProperties = {
    position: "absolute",
    fontFamily: "var(--font-dm-sans)",
    color: "#B3A86A",
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    pointerEvents: "none",
    userSelect: "none",
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        minHeight: 420,
        background: "#07160A",
        borderRadius: 16,
        overflow: "hidden",
      }}
    >
      {/* Canvas Three.js */}
      <div ref={mountRef} style={{ position: "absolute", inset: 0 }} />

      {/* Título superior */}
      <div style={{ ...labelBase, top: 14, left: 0, right: 0, textAlign: "center",
        fontSize: "0.48rem", opacity: 0.4 }}>
        Panicum coloratum · Sección transversal
      </div>

      {/* "NIVEL DEL SUELO" sobre la línea */}
      <div style={{ ...labelBase, top: `${groundPct}%`, left: "50%",
        transform: "translate(-50%, -200%)", fontSize: "0.48rem", opacity: 0.55,
        whiteSpace: "nowrap", color: "#C5BC82" }}>
        Nivel del suelo
      </div>

      {/* Marcadores de profundidad — izquierda */}
      {[1, 2, 3].map(m => (
        <div key={m} style={{ ...labelBase, top: `${mPct(m)}%`, left: "5%",
          transform: "translateY(-50%)", fontSize: "0.58rem", opacity: 0.38 }}>
          {m}m
        </div>
      ))}

      {/* Etiqueta vertical "Sobre el suelo" */}
      <div style={{ ...labelBase, top: `${groundPct * 0.38}%`, right: "4%",
        fontSize: "0.46rem", opacity: 0.42, color: "#D4C87A",
        writingMode: "vertical-rl", transform: "rotate(180deg)" }}>
        Sobre el suelo
      </div>

      {/* Etiqueta vertical "Bajo el suelo" */}
      <div style={{ ...labelBase, top: `${groundPct + (100 - groundPct) * 0.30}%`, right: "4%",
        fontSize: "0.46rem", opacity: 0.35,
        writingMode: "vertical-rl", transform: "rotate(180deg)" }}>
        Bajo el suelo
      </div>

      {/* Stat inferior */}
      <div style={{ position: "absolute", bottom: 14, left: 0, right: 0,
        textAlign: "center", fontFamily: "var(--font-dm-sans)",
        color: "#D4C87A", fontSize: "0.7rem", fontWeight: 600,
        letterSpacing: "0.05em", opacity: 0.72, pointerEvents: "none",
        userSelect: "none" }}>
        Sistema radicular · hasta 3m · rebrote sin costo
      </div>
    </div>
  );
}
