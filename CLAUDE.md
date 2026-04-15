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
| Framer Motion | 12+ | Animaciones scroll-triggered + whileHover |
| React Hook Form + Zod | latest | Formulario (API activa, form de Contacto desactivado) |
| Resend | 6+ | Email (desactivado, ver API route) |
| TypeScript | 5 | Strict |

**Tipografías (next/font/google):**
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
      route.ts        # POST /api/contact — Zod + Resend (comentado). Actualmente sin uso.

components/
  Nav.tsx             # Navbar — comportamiento dark/light por scroll
  Hero.tsx            # Sección hero — 100dvh, video loop, CTAs
  Problema.tsx        # Pain points del productor — 3 cards animadas
  Marquee.tsx         # Texto grande en parallax horizontal
  Solucion.tsx        # El cultivo — stats, proceso, tags INTA/FAO
  Stats.tsx           # Contadores animados — 200ha, 17 años, 3500kg/ha
  Ciclo.tsx           # Timeline animado — implantación → cosecha → rebrote
  Sandro.tsx          # Quién es Sandro — carrusel de fotos + pull quote
  Oferta.tsx          # Dos cards: Semilla / Asesoría
  Respaldo.tsx        # Credenciales institucionales — INTA, FAO, La Nación Campo
  Footer.tsx          # Punto de contacto principal (id="contacto") + meta
  WAButton.tsx        # Botón WhatsApp flotante — siempre visible
  CampoButton.tsx     # ★ Botón pill unificado — 3 variantes (ver abajo)
  LogoMark.tsx        # SVG del logomark "S" — usado como watermark
  MijoPlantSVG.tsx    # Ilustración botánica del Panicum coloratum
  TecnicoSVG.tsx      # Ilustración Hans Bredenham — hombre trabajando la tierra
  CampoWireframe.tsx  # Visualización 3D del ciclo del cultivo (Ciclo.tsx)

  Contacto.tsx        # ⚠️ ARCHIVO HUÉRFANO — no importado en page.tsx, no usar
```

### Orden de secciones en page.tsx

```
Nav → Hero → Problema → Marquee → Solucion → Stats → Ciclo → Sandro → Oferta → Respaldo → Footer
```

**`id="contacto"` está en `<footer>`** — todos los `href="#contacto"` del sitio (Hero, Nav, Solucion, Oferta) scrollean al Footer. No recrear una sección Contacto separada.

---

## Sistema de diseño

### Paleta

**Fondos de secciones claras:**
```css
--color-base:      #F5EDD8   /* crema cálido — fondo de página */
--color-surface:   #FFFFFF
--color-surface-2: #F8F3E4
--color-surface-3: #F0E8CC
--color-border:    rgba(0,0,0,0.08)
```

**Secciones oscuras** (Hero, Stats, Ciclo, Footer):
```css
--color-dark:        #005F02   /* verde pasto profundo */
--color-dark-2:      #096B04
--color-dark-3:      #127714
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

**Acento (único):**
```css
--color-dorado:       #B3A86A   /* tan/caqui cálido */
--color-dorado-claro: #C5BC82
--color-dorado-dim:   rgba(179,168,106,0.1)
--color-border-gold:  rgba(179,168,106,0.3)
```

### Regla crítica de color

Cada componente declara su propio fondo. Las secciones claras usan `var(--color-text-primary)`. Las secciones oscuras usan valores hardcodeados `#F0EBE1` / `#F0E8C4` o `var(--color-text-on-dark)`. **No mezclar variables de fondo claro con fondo oscuro.**

### Cards de Oferta — esquema invertido

La sección Oferta tiene dos cards con tratamientos distintos intencionales:

| Card | Fondo | Texto principal | Propósito |
|---|---|---|---|
| Semilla propia | `#1A3D20` (verde pampa) | `#D4C87A` (dorado) | Acción de compra |
| Asesoría | `#B3A86A` (dorado) | `#1A3D20` (verde oscuro) | Servicio de conocimiento |

Esta inversión es deliberada — las dos cards deben leerse como categorías distintas a primera vista.

### Tipografía

```
Títulos:  font-sans (predominante) o font-serif para momentos editoriales
          Siempre con clamp(min, vw, max)
Cuerpo:   font-sans (DM Sans 400/500/600)
Tags:     .tag-label — 0.58-0.65rem, uppercase, tracking amplio, color dorado
```

### Radios y espaciado

```css
--radius-card: 12px
--radius-sm:   6px
```

Padding de secciones: `py-24 md:py-36` claras · `py-24 md:py-32` oscuras.
Contenedor: `max-w-[1250px] mx-auto px-5 md:px-10`.

### Clases utilitarias (globals.css)

- `.tag-label` — etiqueta de sección en dorado uppercase
- `.divider` / `.divider-dark` — líneas divisorias por fondo
- `.animate-marquee` — **no usar** para el Marquee actual (usa Framer Motion + scroll parallax)
- `.animate-ping-gold` — ping animado del dot "disponible" en Hero
- `.scroll-line` — animación de la línea vertical del hero

---

## CampoButton — botón unificado

**Archivo:** `components/CampoButton.tsx`

Único componente de botón del sitio. Reemplaza todos los botones pill inline anteriores.

```tsx
<CampoButton
  href="#contacto"
  label="Consultar disponibilidad"
  variant="primary"         // "primary" | "dark" | "subtle"
  external={false}          // agrega target="_blank" rel="noopener"
/>
```

| Variante | Aspecto | Usar en |
|---|---|---|
| `primary` | Píldora crema `#F0EBE1` · texto oscuro · dot verde | Fondos muy oscuros (Hero, Footer oscuro) |
| `dark` | Píldora `#005F02` · texto crema · dot dorado | Fondos claros (Solucion, Sandro) |
| `subtle` | Glass `rgba(255,255,255,0.07)` · borde dorado · texto crema | Cards oscuras (Oferta card 1) / Card dorada usa `dark` |

**Hover en cards de Oferta:** las cards usan `whileHover` de Framer Motion con `variants` que propagan a los hijos (borde glow + watermark SVG). No requieren hover handlers manuales.

---

## Patrones de componente

### Animaciones (Framer Motion)

Patrón estándar para elementos en scroll:
```tsx
initial={{ opacity: 0, y: 20 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true, margin: "-60px" }}
transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
```

Delays escalonados en grids: `delay: i * 0.1`.
Duración máxima: 700ms. `prefers-reduced-motion` manejado en globals.css.

### Hover con variantes propagadas (Oferta)

```tsx
const cardVariants = {
  rest: { scale: 1 },
  hover: { scale: 1.014, boxShadow: "..." },
};
const childVariants = {
  rest: (val: number) => ({ opacity: val }),
  hover: (val: number) => ({ opacity: val + 0.18 }),
};

<motion.div variants={cardVariants} whileHover="hover">
  <motion.div custom={0.45} variants={childVariants}>...</motion.div>
</motion.div>
```

### Hover handlers inline (cuando no se usa Framer Motion)

```tsx
onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.85")}
onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
```

---

## Nav — comportamiento dark/light

```tsx
setScrolled(window.scrollY > window.innerHeight - 80);
```

- **`scrolled = false`** (sobre hero): fondo transparente, texto `#F0EBE1`
- **`scrolled = true`** (sobre contenido): fondo `rgba(255,255,255,0.92)`, texto `#182A1A`

El Nav incluye un `CampoButton` como CTA principal (variant implícita oscura).

---

## Overflow horizontal — solución aplicada

El scroll horizontal estaba causado por tres fuentes. Ya corregido:

1. **`globals.css`** — `overflow-x: clip` en `body` y `main`. Se usa `clip` (no `hidden`) porque no crea un scroll container → `position: sticky` y `position: fixed` siguen funcionando.
2. **`Stats.tsx`** — `overflow: "hidden"` en el `<section>`. El `LogoMark` con `right: "-8%"` desbordaba sin contenedor que lo cortara.
3. **`Marquee.tsx`** — rango de parallax corregido de `["2%", "-18%"]` a `["0%", "-20%"]`. El valor `"2%"` inicial empujaba contenido fuera del viewport antes del primer scroll.

**Regla:** cualquier sección que tenga elementos absolutamente posicionados con valores negativos (`right: "-X%"`, `bottom: "-X%"`) debe tener `overflow: hidden` o `overflow: clip` en su `<section>` contenedor.

---

## API de contacto

`app/api/contact/route.ts` — actualmente **sin uso activo** (el formulario Contacto.tsx fue eliminado de la página). La ruta sigue existiendo. Para reactivar:

1. Crear `.env.local` con `RESEND_API_KEY=...`
2. Descomentar bloque `resend.emails.send()` en la route
3. Reemplazar `from` y `to` con emails reales de Sandro

El punto de contacto actual es **WhatsApp directo** desde el Footer.

---

## Datos del negocio (usar en copy)

```
Productor:    Sandro Grand
Cultivo:      Mijo perenne — Panicum coloratum
Ubicación:    Jacinto Arauz, La Pampa (límite con Buenos Aires)
Coordenadas:  −38.12° S · −63.56° O
Fundación:    Est. 2007
Superficie:   200 hectáreas en producción permanente
Rendimiento:  3.500 kg/ha MS promedio
Proteína:     12-15%
Siembra:      5-8 kg/ha · profundidad 1-2 cm
Implantación: octubre-noviembre
Cosecha:      diciembre
Rebrote:      septiembre (sin costo, sin laboreo)
Tolerancia:   -18°C · raíces hasta 3m · resistente a sequías
Respaldo:     INTA Guatraché · FAO 2023 · La Nación Campo
WA:           https://wa.me/5492954000000
```

---

## Reglas de diseño (no negociables)

1. **Nunca verde lima, nunca azul agro genérico.** El único acento es `--color-dorado` (`#B3A86A`).
2. **Touch targets mínimo 48px** — `minHeight: "52px"` en todos los botones. Usar `CampoButton`.
3. **Hero siempre `100dvh`** — nunca `100vh` (bug iOS con barra del browser).
4. **Imágenes/paneles visuales siempre full-bleed o con bleeding intencional.**
5. **`suppressHydrationWarning` en `<body>`** — extensiones del browser inyectan atributos.
6. **Todos los componentes con interactividad deben tener `"use client"`.**
7. **Nunca Lorem ipsum** — el placeholder copy tiene personalidad de campo real.
8. **Botones siempre con `CampoButton`** — no crear nuevos botones pill inline desde cero.
9. **Secciones con overflow absoluto → `overflow: hidden` en el `<section>`** — previene scroll horizontal.
10. **No recrear sección Contacto** — el Footer (`id="contacto"`) es el único punto de contacto.

---

## Entorno de desarrollo — issues conocidos

### Build (`npm run build`) falla con EPERM

El directorio `.next` está en un volumen FUSE montado. **El build falla por filesystem, no por código.**

```bash
npx tsc --noEmit   # type check — 0 errores = código correcto
npm run dev        # servidor en http://localhost:3000
```

### lightningcss native binary (ARM64)

```bash
cp node_modules/lightningcss-linux-arm64-gnu/lightningcss.linux-arm64-gnu.node \
   node_modules/lightningcss/lightningcss.linux-arm64-gnu.node
```

### Hydration warning en dev

`cz-shortcut-listen="true"` inyectado por extensión del browser. Resuelto con `suppressHydrationWarning` en `layout.tsx`. No es error de código.

---

## Checklist antes de hacer cambios

- [ ] ¿El componente necesita `"use client"`? (hook, evento, animación → sí)
- [ ] ¿Los textos sobre fondo oscuro usan `--color-text-on-dark*` o `#F0EBE1`/`#F0E8C4`?
- [ ] ¿Los textos sobre fondo claro usan `--color-text-primary*`?
- [ ] ¿Los botones usan `CampoButton` con la variante correcta?
- [ ] ¿Las secciones con elementos absolutos tienen `overflow: hidden`?
- [ ] ¿Se usa `clamp()` en todos los tamaños de fuente de títulos?
- [ ] ¿Funciona en 375px (mobile) sin scroll horizontal?
- [ ] `npx tsc --noEmit` pasa sin errores
