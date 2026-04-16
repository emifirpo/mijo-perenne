"use client";

/**
 * TextReveal — Demo 10 animation from TextBlockTransitions (Codrops).
 *
 * Each character starts at a random scattered position (xPercent/yPercent random)
 * and converges to its final position — like a flock landing.
 * Stagger is random-order, word timing is random offset.
 * Triggered by IntersectionObserver when element enters the viewport.
 *
 * SSR-safe: renders plain text server-side; DOM splitting happens post-hydration
 * in useEffect so React's reconciliation never sees the modified DOM.
 */

import { useEffect, useRef, type ReactNode, type CSSProperties } from "react";
import gsap from "gsap";

interface TextRevealProps {
  /** Underlying HTML tag — keeps semantic structure */
  as?: keyof HTMLElementTagNameMap;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  /** Extra delay (seconds) before chars begin animating */
  delay?: number;
  /** IntersectionObserver rootMargin — negative = trigger earlier */
  rootMargin?: string;
}

/**
 * Walk every text node inside `root`, wrap each word in a .tr-word span
 * and each character in a .tr-char span. Non-text nodes (em, span, br…)
 * are left structurally intact — only their text content is split.
 */
function splitTextNodes(node: Node): void {
  if (node.nodeType === Node.TEXT_NODE) {
    const text = node.textContent ?? "";
    if (!text.trim()) return; // skip pure-whitespace nodes

    const parent = node.parentNode;
    if (!parent) return;

    const frag = document.createDocumentFragment();

    // Split on word boundaries, preserving whitespace segments
    const segments = text.split(/(\s+)/);
    segments.forEach((seg) => {
      if (/^\s+$/.test(seg)) {
        // Whitespace between words — keep as plain text so line-wrapping works
        frag.appendChild(document.createTextNode(" "));
      } else if (seg.length > 0) {
        const wordSpan = document.createElement("span");
        wordSpan.className = "tr-word";
        wordSpan.style.cssText = "display:inline-block;white-space:nowrap;";

        for (const char of seg) {
          const charSpan = document.createElement("span");
          charSpan.className = "tr-char";
          charSpan.style.cssText = "display:inline-block;";
          charSpan.textContent = char;
          wordSpan.appendChild(charSpan);
        }

        frag.appendChild(wordSpan);
      }
    });

    parent.replaceChild(frag, node);
    return;
  }

  // Skip <br> and <script> / <style> — recurse into everything else
  const tag = (node as Element).tagName?.toUpperCase();
  if (tag === "BR" || tag === "SCRIPT" || tag === "STYLE") return;

  // Clone childNodes list because DOM mutations invalidate a live NodeList
  for (const child of Array.from(node.childNodes)) {
    splitTextNodes(child);
  }
}

export default function TextReveal({
  as = "div",
  children,
  className,
  style,
  delay = 0,
  rootMargin = "-50px 0px",
}: TextRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const Tag = as as React.ElementType;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // ── 1. Split all text into .tr-word / .tr-char spans ─────────────────
    splitTextNodes(el);

    const wordEls = Array.from(el.querySelectorAll<HTMLElement>(".tr-word"));
    const charGroups = wordEls.map((w) =>
      Array.from(w.querySelectorAll<HTMLElement>(".tr-char"))
    );
    const allChars = el.querySelectorAll<HTMLElement>(".tr-char");

    if (!allChars.length) return;

    // ── 2. Hide all chars initially (opacity 0, scattered) ───────────────
    gsap.set(allChars, { opacity: 0 });

    // ── 3. IntersectionObserver fires the animation once ─────────────────
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        const tl = gsap.timeline({ delay });

        charGroups.forEach((chars) => {
          if (!chars.length) return;

          // Random per-word offset — same mechanic as Demo 10
          const wordOffset = Math.random() * 0.3;

          tl.add(
            gsap.fromTo(
              chars,
              {
                opacity: 0,
                // Each char gets a unique random scatter position
                xPercent: () => gsap.utils.random(-60, 60),
                yPercent: () => gsap.utils.random(-60, 60),
                transformOrigin: "50% 100%",
              },
              {
                duration: 0.55,
                ease: "power4.out",
                opacity: 1,
                xPercent: 0,
                yPercent: 0,
                stagger: { each: 0.02, from: "random" },
              }
            ),
            wordOffset
          );
        });
      },
      { threshold: 0.1, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Tag ref={ref as any} className={className} style={style}>
      {children}
    </Tag>
  );
}
