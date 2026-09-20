"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Icon } from "./Icon";
import { Media } from "./Media";
import type { Scene } from "@/data/site";

export type GalleryItem = { slot: string; scene: Scene; alt: string; span: string; src: string | null };

const prefersReduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function Gallery({ items }: { items: GalleryItem[] }) {
  const [active, setActive] = useState<number | null>(null);
  const tiles = useRef<Array<HTMLButtonElement | null>>([]);
  const overlay = useRef<HTMLDivElement>(null);
  const figure = useRef<HTMLElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const opener = useRef<HTMLButtonElement | null>(null);
  const swipe = useRef<number | null>(null);
  const opening = useRef(true);
  const direction = useRef(0);

  const open = (i: number) => {
    opener.current = tiles.current[i];
    opening.current = true;
    direction.current = 0;
    setActive(i);
  };

  const close = useCallback(() => {
    const fig = figure.current;
    const tile = opener.current;
    const finish = () => setActive(null);
    if (!fig || !tile || prefersReduced()) return finish();
    // Volta para a miniatura de origem
    const from = fig.getBoundingClientRect();
    const to = tile.getBoundingClientRect();
    gsap.to(overlay.current, { opacity: 0, duration: 0.5, ease: "power2.inOut" });
    gsap.to(fig, {
      x: to.left - from.left,
      y: to.top - from.top,
      scaleX: to.width / from.width,
      scaleY: to.height / from.height,
      transformOrigin: "0 0",
      duration: 0.65,
      ease: "expo.inOut",
      onComplete: finish,
    });
  }, []);

  const go = useCallback(
    (dir: 1 | -1) => {
      direction.current = dir;
      opening.current = false;
      setActive((i) => (i === null ? i : (i + dir + items.length) % items.length));
    },
    [items.length],
  );

  // Animação de abertura (FLIP a partir da miniatura) e de troca de foto
  useEffect(() => {
    if (active === null) return;
    const fig = figure.current;
    if (!fig || prefersReduced()) return;
    if (opening.current && opener.current) {
      const to = fig.getBoundingClientRect();
      const from = opener.current.getBoundingClientRect();
      gsap.fromTo(overlay.current, { opacity: 0 }, { opacity: 1, duration: 0.5, ease: "power2.out" });
      gsap.fromTo(
        fig,
        { x: from.left - to.left, y: from.top - to.top, scaleX: from.width / to.width, scaleY: from.height / to.height, transformOrigin: "0 0" },
        { x: 0, y: 0, scaleX: 1, scaleY: 1, duration: 0.9, ease: "expo.out" },
      );
    } else {
      gsap.fromTo(fig, { opacity: 0, x: direction.current * 70, scale: 0.98, transformOrigin: "50% 50%" }, { opacity: 1, x: 0, scale: 1, duration: 0.7, ease: "expo.out" });
    }
  }, [active]);

  // Teclado, rolagem e foco
  const isOpen = active !== null;
  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeBtn.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
      else if (e.key === "Tab") {
        const focusable = overlay.current?.querySelectorAll<HTMLElement>("button");
        if (!focusable?.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    const restore = opener.current;
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
      restore?.focus();
    };
  }, [isOpen, close, go]);

  const current = active !== null ? items[active] : null;

  return (
    <>
      <div className="grid auto-rows-[10.5rem] grid-cols-2 gap-3 sm:auto-rows-[13rem] md:grid-cols-12 md:auto-rows-[14.5rem] md:gap-4">
        {items.map((item, i) => (
          <button
            key={item.slot}
            ref={(node) => {
              tiles.current[i] = node;
            }}
            type="button"
            data-reveal
            onClick={() => open(i)}
            aria-label={`Ampliar foto: ${item.alt}`}
            aria-haspopup="dialog"
            className={`group relative overflow-hidden rounded-2xl bg-navy-800 text-left ${item.span}`}
          >
            <div className="absolute inset-0 transition-transform duration-[1400ms] ease-[var(--ease-cine)] group-hover:scale-[1.07] group-focus-visible:scale-[1.07]">
              <Media src={item.src} scene={item.scene} alt={item.alt} showLabel={false} />
            </div>
            <span className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100" aria-hidden="true" />
            <span className="absolute bottom-4 left-4 right-4 translate-y-2 text-sm tracking-wide text-cream-50 opacity-0 transition-[opacity,transform] duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
              {item.alt}
            </span>
          </button>
        ))}
      </div>

      {current && active !== null && (
        <div ref={overlay} role="dialog" aria-modal="true" aria-label="Galeria de fotos" className="fixed inset-0 z-[80] flex flex-col bg-navy-950/95 backdrop-blur-sm">
          <div className="flex items-center justify-between px-5 py-4 text-cream-50 sm:px-10">
            <span className="eyebrow text-gold-400" aria-live="polite">
              {String(active + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
            </span>
            <button ref={closeBtn} type="button" onClick={close} aria-label="Fechar galeria" className="grid h-11 w-11 place-items-center rounded-full border border-cream-50/30 transition hover:bg-cream-50 hover:text-navy-950">
              <Icon name="close" />
            </button>
          </div>

          <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 sm:px-20">
            <button type="button" onClick={() => go(-1)} aria-label="Foto anterior" className="absolute left-2 z-10 grid h-11 w-11 place-items-center rounded-full border border-cream-50/30 bg-navy-950/50 text-cream-50 transition hover:bg-cream-50 hover:text-navy-950 sm:left-6">
              <Icon name="prev" />
            </button>
            <figure
              ref={figure}
              className="relative aspect-[4/3] max-h-full w-full max-w-[min(94vw,1100px)] touch-pan-y overflow-hidden rounded-2xl bg-navy-900"
              onPointerDown={(e) => (swipe.current = e.clientX)}
              onPointerUp={(e) => {
                if (swipe.current === null) return;
                const dx = e.clientX - swipe.current;
                swipe.current = null;
                if (Math.abs(dx) > 55) go(dx < 0 ? 1 : -1);
              }}
            >
              <Media src={current.src} scene={current.scene} alt={current.alt} showLabel className="!object-contain" />
            </figure>
            <button type="button" onClick={() => go(1)} aria-label="Próxima foto" className="absolute right-2 z-10 grid h-11 w-11 place-items-center rounded-full border border-cream-50/30 bg-navy-950/50 text-cream-50 transition hover:bg-cream-50 hover:text-navy-950 sm:right-6">
              <Icon name="next" />
            </button>
          </div>

          <p className="display px-5 py-5 text-center text-2xl italic text-cream-50 sm:text-3xl">{current.alt}</p>
        </div>
      )}
    </>
  );
}
