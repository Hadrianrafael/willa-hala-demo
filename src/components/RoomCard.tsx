"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Icon } from "./Icon";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  index: number;
  name: string;
  beds: string;
  text: string;
  href: string;
  children: ReactNode;
};

/** Card com profundidade 3D: inclinação por ponteiro (desktop) ou por rolagem (toque). */
export function RoomCard({ index, name, beds, text, href, children }: Props) {
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
      gsap.set(c, { transformPerspective: 1100 });
      const rx = gsap.quickTo(c, "rotationX", { duration: 0.7, ease: "power3.out" });
      const ry = gsap.quickTo(c, "rotationY", { duration: 0.7, ease: "power3.out" });
      const move = (e: PointerEvent) => {
        const r = c.getBoundingClientRect();
        const nx = (e.clientX - r.left) / r.width - 0.5;
        const ny = (e.clientY - r.top) / r.height - 0.5;
        ry(nx * 16);
        rx(-ny * 12);
        gsap.to(g, { opacity: 1, duration: 0.3, overwrite: "auto" });
        g.style.background = `radial-gradient(circle at ${(nx + 0.5) * 100}% ${(ny + 0.5) * 100}%, rgb(255 244 220 / 0.32), transparent 55%)`;
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
        { rotationX: 14, y: 40, transformPerspective: 900 },
        { rotationX: 0, y: 0, ease: "none", scrollTrigger: { trigger: w, start: "top 95%", end: "top 55%", scrub: true } },
      );
    });

    return () => mm.revert();
  }, []);

  return (
    <div ref={wrap}>
      <article
        ref={card}
        className="group relative aspect-[4/5] w-full rounded-[1.75rem] will-change-transform [transform-style:preserve-3d]"
      >
        <div className="absolute inset-0 overflow-hidden rounded-[1.75rem] bg-navy-900 shadow-2xl shadow-navy-900/30">
          <div className="absolute inset-0 transition-transform duration-[1400ms] ease-[var(--ease-cine)] group-hover:scale-[1.06]">{children}</div>
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950/95 via-navy-950/60 via-45% to-transparent" aria-hidden="true" />
          <div ref={glare} className="pointer-events-none absolute inset-0 opacity-0 mix-blend-soft-light" aria-hidden="true" />
        </div>

        <span className="display absolute left-6 top-4 text-6xl italic text-cream-50/90 [transform:translateZ(80px)]" aria-hidden="true">
          {String(index + 1).padStart(2, "0")}
        </span>

        <div className="absolute inset-x-0 bottom-0 p-6 text-cream-50 sm:p-8 [transform:translateZ(55px)]">
          <p className="eyebrow mb-3 text-gold-400">{beds}</p>
          <h3 className="display text-[2.1rem] leading-[1.02] sm:text-4xl">{name}</h3>
          <p className="mt-3 max-w-sm text-[0.95rem] leading-relaxed text-cream-100/85">{text}</p>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex min-h-11 items-center gap-3 text-[0.72rem] font-medium uppercase tracking-[0.22em] text-gold-400 transition-[gap,color] duration-500 hover:gap-5 hover:text-cream-50"
          >
            Ver disponibilidade <Icon name="arrow" className="h-4 w-4" />
            <span className="sr-only"> — {name}, abre o Booking.com em nova aba</span>
          </a>
        </div>
      </article>
    </div>
  );
}
