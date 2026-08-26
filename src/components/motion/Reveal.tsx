"use client";

import { useEffect, useRef, type CSSProperties, type ElementType, type ReactNode } from "react";

/**
 * One IntersectionObserver shared by every <Reveal> on the page, rather than
 * one per element. Cheaper to keep alive while scrolling, and there is
 * nothing per-instance about the config — every element wants the same
 * threshold and margin.
 *
 * Elements reveal once, then get unobserved — this is an entrance, not a
 * toggle that re-hides content the user has already read.
 */
let sharedObserver: IntersectionObserver | null = null;

function getSharedObserver(): IntersectionObserver | null {
  if (typeof window === "undefined") return null;
  if (sharedObserver) return sharedObserver;

  sharedObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("is-visible");
        sharedObserver?.unobserve(entry.target);
      }
    },
    { threshold: 0.15, rootMargin: "0px 0px -10% 0px" },
  );

  return sharedObserver;
}

function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function Reveal({
  children,
  as: Tag = "div",
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  /** Element type to render — defaults to a plain div. */
  as?: keyof HTMLElementTagNameMap;
  /** Stagger step; maps to the same --rise-step timing used for the Hero. */
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || prefersReducedMotion()) return;

    const observer = getSharedObserver();
    if (!observer) return;

    observer.observe(node);
    return () => observer.unobserve(node);
  }, []);

  // `as` picks the tag at runtime, so the JSX prop types can't be narrowed —
  // cast once here rather than fighting the resulting union type.
  const Element = Tag as ElementType;

  return (
    <Element
      ref={ref}
      className={`reveal ${className}`}
      style={{ "--rise-step": delay } as CSSProperties}
    >
      {children}
    </Element>
  );
}
