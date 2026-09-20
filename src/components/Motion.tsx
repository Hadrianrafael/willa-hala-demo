"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

declare global {
  interface Window {
    __motionReady?: boolean;
  }
}

/**
 * Motor de animação global. As seções continuam sendo HTML estático (bom para
 * carregamento e acessibilidade); aqui só "ativamos" atributos data-*:
 *   [data-reveal]      entrada suave (fade + subida), em lote
 *   [data-split]       títulos revelados linha a linha
 *   [data-img-reveal]  imagens que se abrem com máscara + zoom out
 *   [data-parallax]    parallax de mídia (valor = amplitude)
 *   [data-count]       contadores numéricos
 *   [data-bar]         barras de nota
 *   [data-hscroll]     trilho horizontal fixado (desktop)
 *   [data-magnetic]    botões magnéticos (mouse)
 */
export function Motion() {
  useEffect(() => {
    let cancelled = false;
    let mm: gsap.MatchMedia | undefined;

    const start = () => {
      if (cancelled) return;
      mm = gsap.matchMedia();

      mm.add(
        {
          motion: "(prefers-reduced-motion: no-preference)",
          desktop: "(min-width: 1024px)",
          fine: "(hover: hover) and (pointer: fine)",
        },
        (ctx) => {
          const { motion, desktop, fine } = ctx.conditions as { motion: boolean; desktop: boolean; fine: boolean };
          const all = <T extends Element>(s: string) => gsap.utils.toArray<T>(s);

          // Contadores: sempre mostram o valor final se o usuário reduz movimento.
          all<HTMLElement>("[data-count]").forEach((node) => {
            const to = Number(node.dataset.count);
            const decimals = Number(node.dataset.decimals ?? 0);
            const format = (v: number) => v.toFixed(decimals).replace(".", ",");
            if (!motion) {
              node.textContent = format(to);
              return;
            }
            const state = { v: 0 };
            node.textContent = format(0);
            ScrollTrigger.create({
              trigger: node,
              start: "top 92%",
              once: true,
              onEnter: () =>
                gsap.to(state, { v: to, duration: 2.2, ease: "power3.out", onUpdate: () => (node.textContent = format(state.v)) }),
            });
          });

          if (!motion) return;

          // Revelações em lote
          gsap.set("[data-reveal]", { y: 46 });
          ScrollTrigger.batch("[data-reveal]", {
            start: "top 90%",
            once: true,
            onEnter: (els) =>
              gsap.to(els, { opacity: 1, y: 0, duration: 1.2, ease: "power3.out", stagger: 0.12, overwrite: true }),
          });

          // Títulos linha a linha
          all<HTMLElement>("[data-split]").forEach((node) => {
            const split = SplitText.create(node, { type: "lines", mask: "lines", autoSplit: true, aria: "auto" });
            node.style.visibility = "visible";
            gsap.set(split.lines, { yPercent: 110 });
            ScrollTrigger.create({
              trigger: node,
              start: "top 88%",
              once: true,
              onEnter: () => gsap.to(split.lines, { yPercent: 0, duration: 1.3, ease: "expo.out", stagger: 0.1 }),
            });
          });

          // Imagens com máscara e zoom-out
          all<HTMLElement>("[data-img-reveal]").forEach((node) => {
            const inner = node.querySelector<HTMLElement>("[data-img-inner]");
            const tl = gsap.timeline({
              scrollTrigger: { trigger: node, start: "top 88%", once: true },
              defaults: { ease: "expo.out", duration: 1.6 },
            });
            tl.fromTo(node, { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)" });
            if (inner) tl.fromTo(inner, { scale: 1.35 }, { scale: 1, duration: 2 }, 0);
          });

          // Parallax de mídia
          all<HTMLElement>("[data-parallax]").forEach((node) => {
            const amp = Number(node.dataset.parallax || 0.08) * 100;
            gsap.fromTo(
              node,
              { yPercent: -amp },
              {
                yPercent: amp,
                ease: "none",
                scrollTrigger: { trigger: node.parentElement, start: "top bottom", end: "bottom top", scrub: true },
              },
            );
          });

          // Barras de nota
          all<HTMLElement>("[data-bar]").forEach((node) => {
            gsap.fromTo(
              node,
              { scaleX: 0 },
              {
                scaleX: 1,
                duration: 1.6,
                ease: "expo.out",
                transformOrigin: "left center",
                scrollTrigger: { trigger: node, start: "top 95%", once: true },
              },
            );
          });

          // Trilho horizontal fixado (só desktop; no celular/tablet vira carrossel nativo com snap)
          if (desktop) {
            all<HTMLElement>("[data-hscroll]").forEach((section) => {
              const track = section.querySelector<HTMLElement>("[data-hscroll-track]");
              const bar = section.querySelector<HTMLElement>("[data-hscroll-bar]");
              if (!track) return;
              section.classList.add("hscroll-pinned");
              const distance = () => Math.max(0, track.scrollWidth - section.clientWidth + 96);
              gsap.to(track, {
                x: () => -distance(),
                ease: "none",
                scrollTrigger: {
                  trigger: section,
                  start: "top top",
                  end: () => `+=${distance()}`,
                  pin: true,
                  scrub: 0.8,
                  invalidateOnRefresh: true,
                  anticipatePin: 1,
                  onUpdate: (self) => bar && gsap.set(bar, { scaleX: self.progress }),
                },
              });
              return () => section.classList.remove("hscroll-pinned");
            });
          }

          // Botões magnéticos
          if (fine) {
            const off: Array<() => void> = [];
            all<HTMLElement>("[data-magnetic]").forEach((btn) => {
              const x = gsap.quickTo(btn, "x", { duration: 0.6, ease: "power3.out" });
              const y = gsap.quickTo(btn, "y", { duration: 0.6, ease: "power3.out" });
              const move = (e: PointerEvent) => {
                const r = btn.getBoundingClientRect();
                x((e.clientX - (r.left + r.width / 2)) * 0.22);
                y((e.clientY - (r.top + r.height / 2)) * 0.32);
              };
              const leave = () => {
                x(0);
                y(0);
              };
              btn.addEventListener("pointermove", move);
              btn.addEventListener("pointerleave", leave);
              off.push(() => {
                btn.removeEventListener("pointermove", move);
                btn.removeEventListener("pointerleave", leave);
              });
            });
            return () => off.forEach((fn) => fn());
          }
        },
      );

      window.__motionReady = true;
      // Garante posições corretas depois de imagens/fontes.
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
        // Link direto (#reservas): o pin do trilho horizontal muda a altura da página depois do salto do navegador.
        const id = decodeURIComponent(window.location.hash.slice(1));
        if (id) document.getElementById(id)?.scrollIntoView({ behavior: "instant" });
      });
    };

    // Espera as fontes para que a quebra de linhas do SplitText seja definitiva.
    if (document.fonts?.ready) document.fonts.ready.then(start);
    else start();

    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);

    return () => {
      cancelled = true;
      window.removeEventListener("load", onLoad);
      mm?.revert();
    };
  }, []);

  return null;
}
