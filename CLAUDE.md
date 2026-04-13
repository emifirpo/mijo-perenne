@AGENTS.md

# Sandro Grand — Sitio Web de Mijo Perenne

## Proyecto

Sitio web de **Sandro Grand**, productor ganadero y proveedor de semilla de mijo perenne (*Panicum coloratum*) en Jacinto Arauz, La Pampa. Objetivo único: generar contacto directo de productores interesados en semilla o asesoramiento.

**URL local:** `http://localhost:3000`
**Comando dev:** `npm run dev`
**Comando build:** `npm run build` *(ver nota de entorno abajo)*

---

## Stack

| Herramienta | Versión | Notas |
|---|---|---|
| Next.js | 16.2.3 | App Router · Turbopack · SSG |
| React | 19.2.4 | |
| Tailwind CSS | v4 | Variables en `@theme` en `globals.css` |
| Framer Motion | 12+ | Animaciones scroll-triggered |
| React Hook Form + Zod | latest | Formulario de contacto |
| Resend | 6+ | Email (desactivado, ver API route) |
| TypeScript | 5 | Strict |

**Tipografías (next/font/google):**
- `Cormorant Garamond` → `var(--font-cormorant)` / clase `font-serif` — títulos, impacto editorial
- `DM Sans` → `var(--font-dm-sans)` / clase `font-sans` — cuerpo, etiquetas, UI

---

## Estructura de archivos

```
app/
  layout.tsx          # Metadatos, fuentes, globals.css
  page.tsx            # Ensambla todos los componentes en orden
  globals.css         # @theme con variables CSS + clases utilitarias
  api/
    contact/
      route.ts        # POST /api/contact — validación Zod, integración Resend (comentada)


## Sistema de diseño

### Paleta — light-first (Exergy3-inspired)

**Fondos de secciones claras:**
```css
--color-base:      #F5EDD8   /* crema cálido — fondo de página */
--color-surface:   #FFFFFF   /* tarjetas blancas */
--color-surface-2: #F8F3E4   /* tarjeta tintada suave */
--color-surface-3: #F0E8CC   /* más tintada */
--color-border:    rgba(0,0,0,0.08)
```

**Secciones oscuras** (Hero, Stats, Ciclo, Contacto, Footer):
```css
--color-dark:   #005F02   /* verde pasto profundo */
--color-dark-2: #096B04
--color-dark-3: #127714
--color-dark-border: rgba(255,255,255,0.08)
```

**Texto en fondos claros:**
```css
--color-text-primary:   #005F02
--color-text-secondary: rgba(0,95,2,0.62)
--color-text-muted:     rgba(0,95,2,0.38)
```

**Texto en fondos oscuros:**
```css
--color-text-on-dark:           #F0E8C4
--color-text-on-dark-secondary: rgba(240,232,196,0.6)
--color-text-on-dark-muted:     rgba(240,232,196,0.3)
```

**Acento:**
```css
--color-dorado:       #B3A86A   /* tan/caqui cálido — único color de acento */
--color-dorado-claro: #C5BC82
--color-dorado-dim:   rgba(179,168,106,0.1)
--color-border-gold:  rgba(179,168,106,0.3)
```

### Regla crítica de color

Cada componente declara su propio fondo. Las secciones claras usan `var(--color-text-primary)` etc. Las secciones oscuras usan **valores hardcodeados** como `#F0E8C4` o `var(--color-text-on-dark)`. No mezclar.

### Tipografía

```
Títulos:  font-serif (Cormorant Garamond 600/700) — clamp() para responsive
Cuerpo:   font-sans (DM Sans 400/500/600)
Tags:     clase .tag-label — 0.65rem, uppercase, tracking-wide, color dorado
```

**Tamaños de título:** siempre con `clamp(min, vw, max)`. Ejemplo: `clamp(2.4rem, 5.5vw, 4.2rem)`.

### Radios y espaciado

```css
--radius-card: 12px   /* tarjetas */
--radius-sm:   6px    /* inputs */
```

Padding de secciones: `py-24 md:py-36` en light, `py-24 md:py-32` en dark.
Contenedor: `max-w-7xl mx-auto px-5 md:px-10`.

### Clases utilitarias (globals.css)

- `.tag-label` — etiqueta de sección en dorado uppercase
- `.divider` — línea divisoria para fondos claros
- `.divider-dark` — línea divisoria para fondos oscuros
- `.animate-marquee` — loop horizontal infinito (pausa en hover desktop)
- `.animate-ping-gold` — ping animado para el dot de "disponible"
- `.scroll-line` — animación de la línea vertical del hero

---

## Patrones de componente

### Animaciones (Framer Motion)

Todos los componentes usan este patrón:
```tsx
const ref = useRef<HTMLElement>(null);
const isInView = useInView(ref, { once: true, margin: "-60px" });

// En el elemento:
initial={{ opacity: 0, y: 20 }}
animate={isInView ? { opacity: 1, y: 0 } : {}}
transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
```

Delays escalonados para grids: `delay: 0.1 + i * 0.1`.
Duración máxima: 700ms. Respetar `prefers-reduced-motion` (ya manejado en globals.css).

### CTA pills (patrón consistente)

```tsx
<a
  href="#contacto"
  className="inline-flex items-center gap-2 font-sans font-medium"
  style={{
    background: "#182A1A",          // o var(--color-dorado)
    borderRadius: "9999px",
    padding: "12px 22px 12px 12px",
    fontSize: "0.9375rem",
    color: "#F0EBE1",
    minHeight: "52px",              // touch target mínimo
    transition: "opacity 0.25s",
  }}
>
  <span style={{ width: "28px", height: "28px", borderRadius: "50%", background: "var(--color-dorado)", ... }}>
    <svg>→</svg>
  </span>
  Texto del CTA
</a>
```

### Hover handlers

Siempre con cast explícito:
```tsx
onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.85")}
```

---

## Nav — comportamiento dark/light

El Nav detecta si el scroll superó el viewport del hero:
```tsx
setScrolled(window.scrollY > window.innerHeight - 80);
```

- **`scrolled = false`** (sobre hero): fondo transparente, texto `#F0EBE1`, CTA dorado
- **`scrolled = true`** (sobre contenido): fondo `rgba(255,255,255,0.92)`, texto `#182A1A`, CTA `#182A1A`

---

## API de contacto

`app/api/contact/route.ts`

- Valida con Zod: `nombre`, `zona`, `contacto` (tel o email), `mensaje` (opcional)
- Integración **Resend desactivada** (comentada). Para activar:
  1. Crear `.env.local` con `RESEND_API_KEY=...`
  2. Descomentar el bloque `resend.emails.send()`
  3. Reemplazar `from` y `to` con los emails reales de Sandro

---

## Datos del negocio (usar en copy)

```
Productor:    Sandro Grand
Cultivo:      Mijo perenne — Panicum coloratum
Ubicación:    Jacinto Arauz, La Pampa (límite con Buenos Aires)
Coordenadas:  -38.12° S · -63.56° O
Fundación:    Est. 2007
Superficie:   200 hectáreas en producción permanente
Rendimiento:  3.500 kg/ha MS promedio
Proteína:     12-15%
Siembra:      3-5 kg/ha · profundidad 1-2 cm
Implantación: agosto-septiembre
Cosecha:      diciembre
Rebrote:      septiembre (sin costo, sin laboreo)
Tolerancia:   -18°C · raíces hasta 3m · resistente a sequías
Respaldo:     INTA Guatraché · FAO 2023 · La Nación Campo
WA:           https://wa.me/5492954000000
```

---

## Reglas de diseño (no negociables)

1. **Nunca verde lima, nunca azul agro genérico.** El único acento es `--color-dorado` (#C49A2A).
2. **Touch targets mínimo 48px** — `minHeight: "52px"` en todos los botones/links.
3. **Hero siempre 100dvh** — nunca `100vh` (bug iOS con barra del browser).
4. **Imágenes/paneles visuales siempre full-bleed o con bleeding intencional.**
5. **`suppressHydrationWarning` en `<body>`** — extensiones del browser inyectan atributos.
6. **Todos los componentes con interactividad deben tener `"use client"`** — incluido Footer.
7. **Nunca Lorem ipsum** — el placeholder copy tiene personalidad de campo real.

---

## Entorno de desarrollo — issues conocidos

### Build (`npm run build`) falla con EPERM

El directorio `.next` está en un volumen FUSE montado (máquina del usuario) y no puede ser eliminado por el agente. **El build falla por razones de filesystem, no por errores de código.**

Verificación de código sin build:
```bash
npx tsc --noEmit   # type check — debe terminar sin output (0 errores)
npm run dev        # servidor en http://localhost:3000
```

El servidor de desarrollo **sí funciona correctamente** con `npm run dev`.

### lightningcss native binary

Al correr el build por primera vez en un entorno ARM64, puede fallar buscando `../lightningcss.linux-arm64-gnu.node`. Fix:
```bash
cp node_modules/lightningcss-linux-arm64-gnu/lightningcss.linux-arm64-gnu.node \
   node_modules/lightningcss/lightningcss.linux-arm64-gnu.node
```

### Hydration warning en dev

`cz-shortcut-listen="true"` inyectado por extensión del browser en `<body>`. Ya resuelto con `suppressHydrationWarning` en `layout.tsx`. No es un error del código.

---

## Checklist antes de hacer cambios

- [ ] ¿El componente necesita `"use client"`? (cualquier hook, evento, animación → sí)
- [ ] ¿Los textos sobre fondo oscuro usan `--color-text-on-dark*` o valores `#F0EBE1`?
- [ ] ¿Los textos sobre fondo claro usan `--color-text-primary*`?
- [ ] ¿Los botones tienen `minHeight: "52px"`?
- [ ] ¿Se usa `clamp()` en todos los tamaños de fuente de títulos?
- [ ] ¿Funciona en 375px (mobile) sin que nada se rompa?
- [ ] `npx tsc --noEmit` pasa sin errores
