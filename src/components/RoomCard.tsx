"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Moldura de foto com profundidade 3D discreta: inclina com o ponteiro (desktop)
 * e "deita" suavemente ao entrar na tela em dispositivos de toque.
 */
export function TiltFrame({ children, className = "" }: { children: ReactNode; className?: string }) {
  const wrap = useRef<HTMLDivElement>(null);
  const card = useRef<HTMLDivElement>(null);
  const glare = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const w = wrap.current;
    const c = card.current;
    const g = glare.current;
    if (!w || !c || !g) return;
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference) and (hover: hover) and (pointer: fine)", () => {
      gsap.set(c, { transformPerspective: 1400 });
      const rx = gsap.quickTo(c, "rotationX", { duration: 0.8, ease: "power3.out" });
      const ry = gsap.quickTo(c, "rotationY", { duration: 0.8, ease: "power3.out" });
      const move = (e: PointerEvent) => {
        const r = c.getBoundingClientRect();
        const nx = (e.clientX - r.left) / r.width - 0.5;
        const ny = (e.clientY - r.top) / r.height - 0.5;
        ry(nx * 7);
        rx(-ny * 5);
        gsap.to(g, { opacity: 1, duration: 0.3, overwrite: "auto" });
        g.style.background = `radial-gradient(circle at ${(nx + 0.5) * 100}% ${(ny + 0.5) * 100}%, rgb(255 255 255 / 0.28), transparent 60%)`;
      };
      const leave = () => {
        rx(0);
        ry(0);
        gsap.to(g, { opacity: 0, duration: 0.6 });
      };
      w.addEventListener("pointermove", move);
      w.addEventListener("pointerleave", leave);
      return () => {
        w.removeEventListener("pointermove", move);
        w.removeEventListener("pointerleave", leave);
      };
    });

    mm.add("(prefers-reduced-motion: no-preference) and (hover: none)", () => {
      gsap.fromTo(
        c,
        { rotationX: 8, transformPerspective: 1000 },
        { rotationX: 0, ease: "none", scrollTrigger: { trigger: w, start: "top 95%", end: "top 55%", scrub: true } },
      );
    });

    return () => mm.revert();
  }, []);

  return (
    <div ref={wrap} className={className}>
      <div ref={card} className="group relative h-full w-full overflow-hidden bg-sky-100 shadow-[0_40px_70px_-40px_rgba(13,33,71,0.45)] will-change-transform">
        <div className="absolute inset-0 transition-transform duration-[1600ms] ease-[var(--ease-cine)] group-hover:scale-[1.04]">{children}</div>
        <div ref={glare} className="pointer-events-none absolute inset-0 opacity-0 mix-blend-soft-light" aria-hidden="true" />
      </div>
    </div>
  );
}
