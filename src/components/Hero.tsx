"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Icon } from "./Icon";
import { Ornament } from "./Ornament";
import { Media } from "./Media";
import { ratings, site } from "@/data/site";

gsap.registerPlugin(ScrollTrigger);

/** Pseudo-aleatório determinístico só com inteiros (idêntico no servidor e no navegador: sem erro de hidratação). */
const seeded = (i: number, salt: number) => {
  let t = (Math.imul(i + 1, 374761393) + Math.imul(salt, 668265263)) | 0;
  t = Math.imul(t ^ (t >>> 15), 2246822519);
  t = Math.imul(t ^ (t >>> 13), 3266489917);
  return Math.round((((t ^ (t >>> 16)) >>> 0) / 4294967296) * 1000) / 1000;
};

const stars = Array.from({ length: 46 }, (_, i) => ({
  x: seeded(i, 1) * 1600,
  y: seeded(i, 2) * 430,
  r: 0.7 + seeded(i, 3) * 1.5,
  o: 0.35 + seeded(i, 4) * 0.6,
}));

const fireflies = Array.from({ length: 22 }, (_, i) => ({
  left: 6 + seeded(i, 5) * 88,
  top: 42 + seeded(i, 6) * 46,
  fx: (seeded(i, 7) - 0.5) * 90,
  fy: -20 - seeded(i, 8) * 70,
  d: 5 + seeded(i, 9) * 6,
  delay: seeded(i, 10) * 8,
}));

/** Beiral rendilhado (referência aos ornamentos de madeira da arquitetura polonesa). */
function fretwork(x1: number, y1: number, x2: number, y2: number, n: number, size: number) {
  let d = "";
  for (let i = 0; i < n; i++) {
    const t = (i + 0.5) / n;
    const x = x1 + (x2 - x1) * t;
    const y = y1 + (y2 - y1) * t;
    d += `M${x - size} ${y}L${x} ${y + size * 1.7}L${x + size} ${y}Z`;
  }
  return d;
}

function Leaf({ transform, fill }: { transform: string; fill: string }) {
  return <path d="M0 0C70-90 230-100 300-20 230 46 70 56 0 0Z" transform={transform} fill={fill} />;
}

function Tree({ x, y, s, fill }: { x: number; y: number; s: number; fill: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} fill={fill}>
      <circle cx="0" cy="-120" r="80" />
      <circle cx="-64" cy="-70" r="62" />
      <circle cx="66" cy="-72" r="66" />
      <circle cx="-8" cy="-190" r="58" />
      <rect x="-9" y="-40" width="18" height="60" />
    </g>
  );
}

function Cypress({ x, y, s, fill }: { x: number; y: number; s: number; fill: string }) {
  return <path transform={`translate(${x} ${y}) scale(${s})`} d="M0 0C-46-40-52-150-30-250-16-300-6-330 0-360 6-330 16-300 30-250 52-150 46-40 0 0Z" fill={fill} />;
}

type HeroProps = { heroSrc: string | null };

export function Hero({ heroSrc }: HeroProps) {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const q = <T extends Element>(s: string) => Array.from(el.querySelectorAll<T>(s));
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // 1) Abertura cinematográfica
      const curtain = document.querySelector<HTMLElement>("[data-curtain]");
      const intro = gsap.timeline({ defaults: { ease: "expo.out" } });
      if (curtain) {
        intro
          .fromTo("[data-curtain-mark]", { opacity: 0, scale: 0.8, rotate: -25 }, { opacity: 1, scale: 1, rotate: 0, duration: 0.9 })
          .fromTo("[data-curtain-name]", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.9 }, "<0.25")
          .to(curtain, { clipPath: "inset(0 0 100% 0)", duration: 1.05, ease: "expo.inOut" }, "+=0.15")
          .set(curtain, { display: "none" });
      }
      intro
        .fromTo("[data-hero-scene]", { scale: 1.22 }, { scale: 1, duration: 2.6, ease: "power3.out" }, curtain ? "<0.1" : 0)
        .fromTo(q("[data-hero-char]"), { yPercent: 115, rotate: 5 }, { yPercent: 0, rotate: 0, duration: 1.4, stagger: 0.045 }, "<0.25")
        .fromTo(q("[data-hero-fade]"), { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: 1.2, stagger: 0.14 }, "<0.5");

      // 2) Parallax por camadas ao rolar (profundidade)
      const scrub = { trigger: el, start: "top top", end: "bottom top", scrub: 0.6 };
      q<HTMLElement>("[data-depth]").forEach((layer) => {
        const depth = Number(layer.dataset.depth);
        gsap.to(layer, { yPercent: depth * 22, ease: "none", scrollTrigger: scrub });
      });
      gsap.to("[data-hero-content]", { yPercent: 28, opacity: 0, ease: "none", scrollTrigger: { ...scrub, end: "70% top" } });
      gsap.to("[data-hero-scroll]", { scale: 1.12, ease: "none", scrollTrigger: scrub });
      gsap.to("[data-hero-veil]", { opacity: 0.85, ease: "none", scrollTrigger: scrub });

      // 3) Parallax por ponteiro (só em telas com mouse)
      const cleanups: Array<() => void> = [];
      if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
        const layers = q<HTMLElement>("[data-depth]").map((node) => ({
          x: gsap.quickTo(node, "x", { duration: 1.2, ease: "power3.out" }),
          y: gsap.quickTo(node, "y", { duration: 1.2, ease: "power3.out" }),
          d: Number(node.dataset.depth),
        }));
        const onMove = (e: PointerEvent) => {
          const nx = e.clientX / window.innerWidth - 0.5;
          const ny = e.clientY / window.innerHeight - 0.5;
          layers.forEach((l) => {
            l.x(-nx * l.d * 46);
            l.y(-ny * l.d * 22);
          });
        };
        el.addEventListener("pointermove", onMove);
        cleanups.push(() => el.removeEventListener("pointermove", onMove));
      }

      // 4) Pássaros atravessando o céu
      q<SVGElement>("[data-bird]").forEach((bird, i) => {
        gsap.fromTo(
          bird,
          { x: -120, y: 0 },
          { x: 1750, y: -60 - i * 18, duration: 34 + i * 9, repeat: -1, delay: i * 7, ease: "none" },
        );
      });

      return () => cleanups.forEach((fn) => fn());
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={root} id="inicio" aria-label="Willa Hala" className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-navy-950 text-cream-50">
      {/* CENA: foto real quando existir; senão ilustração em camadas */}
      <div data-hero-scroll className="absolute inset-0 will-change-transform">
      <div data-hero-scene className="absolute inset-0 will-change-transform">
        {heroSrc ? (
          <div data-depth="0.35" className="absolute inset-[-6%]">
            <Media src={heroSrc} scene="house" alt="Willa Hala, hospedagem em Vinhedo" priority showLabel={false} />
          </div>
        ) : (
          <>
            <svg data-depth="0" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden="true">
              <defs>
                <linearGradient id="hSky" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#050d20" />
                  <stop offset="0.42" stopColor="#12244a" />
                  <stop offset="0.72" stopColor="#5b4560" />
                  <stop offset="0.9" stopColor="#c98a66" />
                  <stop offset="1" stopColor="#e6b273" />
                </linearGradient>
                <radialGradient id="hGlow" cx="0.5" cy="0.5" r="0.5">
                  <stop offset="0" stopColor="#f6c98a" stopOpacity="0.85" />
                  <stop offset="1" stopColor="#f6c98a" stopOpacity="0" />
                </radialGradient>
                <filter id="hBloom" x="-40%" y="-40%" width="180%" height="180%">
                  <feGaussianBlur stdDeviation="9" result="b" />
                  <feMerge>
                    <feMergeNode in="b" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <rect width="1600" height="900" fill="url(#hSky)" />
              {stars.map((s, i) => (
                <circle key={i} cx={s.x} cy={s.y} r={s.r} fill="#fbf7ef" opacity={s.o} />
              ))}
              <circle cx="1130" cy="560" r="330" fill="url(#hGlow)" />
            </svg>

            <svg data-depth="0.12" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMax slice" className="absolute bottom-0 -left-[3%] h-[48%] w-[106%] lg:inset-y-0 lg:h-full" aria-hidden="true">
              <path d="M0 640C180 560 340 590 520 620S860 560 1080 600 1440 560 1600 610V900H0Z" fill="#1a2c4d" opacity="0.9" />
              <path d="M0 700C220 640 420 690 660 670S1060 620 1280 670 1520 650 1600 680V900H0Z" fill="#12233f" />
              {[0, 1, 2].map((i) => (
                <g key={i} data-bird transform="translate(0 0)" opacity="0.75">
                  <path d={`M${120 + i * 60} ${170 + i * 50}q7-8 14 0 7-8 14 0`} stroke="#fbf7ef" strokeWidth="2" fill="none" strokeLinecap="round" />
                </g>
              ))}
            </svg>

            <div className="absolute inset-0 lg:translate-x-[17%]">
            <svg data-depth="0.3" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMax slice" className="absolute bottom-0 -left-[3%] h-[48%] w-[106%] lg:inset-y-0 lg:h-full" aria-hidden="true">
              {/* Casa de estilo inspirado na arquitetura polonesa: telhado íngreme e beirais rendilhados */}
              <g transform="translate(-40 40)">
                <rect x="560" y="560" width="500" height="190" fill="#f1e6d2" />
                <rect x="560" y="560" width="500" height="190" fill="#08132a" opacity="0.28" />
                <path d="M520 585L810 380l290 205Z" fill="#20122a" />
                <path d="M520 585L810 380l290 205" fill="none" stroke="#3a2438" strokeWidth="9" strokeLinejoin="round" />
                <path d={fretwork(535, 583, 802, 392, 16, 8)} fill="#f1e6d2" opacity="0.9" />
                <path d={fretwork(818, 392, 1085, 583, 16, 8)} fill="#f1e6d2" opacity="0.9" />
                <rect x="940" y="430" width="34" height="80" fill="#8e4630" />
                <rect x="934" y="424" width="46" height="10" fill="#6d3423" />
                <path d="M700 585l70-95h80l70 95Z" fill="#20122a" />
                <rect x="770" y="510" width="80" height="76" rx="40" fill="#f6c86e" filter="url(#hBloom)" />
                <path d="M810 510v76M770 548h80" stroke="#20122a" strokeWidth="4" />
                {[610, 690, 890, 970].map((x) => (
                  <g key={x}>
                    <rect x={x} y="612" width="52" height="84" rx="4" fill="#f6c86e" filter="url(#hBloom)" />
                    <path d={`M${x + 26} 612v84M${x} 654h52`} stroke="#20122a" strokeWidth="3" />
                    <rect x={x - 6} y="696" width="64" height="8" fill="#e8dcc4" />
                  </g>
                ))}
                <rect x="770" y="640" width="80" height="110" rx="40" fill="#20122a" />
                <rect x="774" y="648" width="72" height="100" rx="36" fill="#f6c86e" opacity="0.55" filter="url(#hBloom)" />
                <rect x="540" y="748" width="540" height="14" fill="#c9bea6" />
              </g>
            </svg>
            </div>

            <svg data-depth="0.55" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMax slice" className="absolute bottom-0 -left-[3%] h-[48%] w-[106%] lg:inset-y-0 lg:h-full" aria-hidden="true">
              <path d="M0 760C260 730 540 760 800 750S1300 730 1600 760V900H0Z" fill="#0b1a1a" />
              <Cypress x={250} y={800} s={1.5} fill="#0d2320" />
              <Cypress x={340} y={810} s={1.1} fill="#12302a" />
              <Cypress x={1390} y={805} s={1.6} fill="#0d2320" />
              <Tree x={130} y={800} s={1.15} fill="#0f2a25" />
              <Tree x={1250} y={800} s={1.05} fill="#12302a" />
              <Tree x={1500} y={812} s={0.9} fill="#0b1f1c" />
            </svg>

            <svg data-depth="0.9" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMax slice" className="absolute bottom-0 -left-[3%] h-[48%] w-[106%] lg:inset-y-0 lg:h-full" aria-hidden="true">
              <Leaf transform="translate(-30 900) rotate(-52) scale(1.5)" fill="#07130f" />
              <Leaf transform="translate(-10 930) rotate(-26) scale(1.25)" fill="#0a1d17" />
              <Leaf transform="translate(1630 900) rotate(232) scale(1.55)" fill="#07130f" />
              <Leaf transform="translate(1610 940) rotate(206) scale(1.2)" fill="#0a1d17" />
              <path d="M0 860C300 830 700 880 1000 858S1450 840 1600 866V900H0Z" fill="#050d0b" />
            </svg>

            <div className="drift pointer-events-none absolute inset-x-[-5%] bottom-0 h-[38%] bg-gradient-to-t from-[#f0c58f]/25 via-[#f0c58f]/8 to-transparent" aria-hidden="true" />
            <div className="pointer-events-none absolute inset-0" aria-hidden="true">
              {fireflies.map((f, i) => (
                <span
                  key={i}
                  className="firefly"
                  style={{ left: `${f.left}%`, top: `${f.top}%`, ["--fx" as string]: `${f.fx}px`, ["--fy" as string]: `${f.fy}px`, ["--fd" as string]: `${f.d}s`, ["--fdelay" as string]: `${f.delay}s` }}
                />
              ))}
            </div>
          </>
        )}
      </div>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-navy-950/55 via-transparent to-navy-950/80" aria-hidden="true" />
      <div data-hero-veil className="pointer-events-none absolute inset-0 bg-navy-950 opacity-0" aria-hidden="true" />

      {/* CONTEÚDO */}
      <div data-hero-content className="relative z-10 flex h-full flex-col items-center justify-start px-5 pt-[17svh] text-center lg:items-start lg:justify-center lg:pl-[7vw] lg:pt-0 lg:text-left">
        <Ornament className="spin-slow absolute -z-10 h-[min(150vw,900px)] w-[min(150vw,900px)] text-cream-50/[0.05]" />
        <p data-hero-fade className="eyebrow mb-5 text-gold-400">
          Vinhedo · São Paulo
        </p>
        <h1 className="display text-[clamp(4.4rem,17vw,11.5rem)] italic" aria-label="Willa Hala">
          {["Willa", "Hala"].map((word, w) => (
            <span key={word} aria-hidden="true" className={`inline-block overflow-hidden pb-[0.12em] align-bottom ${w === 0 ? "mr-[0.22em]" : ""}`}>
              {word.split("").map((c, i) => (
                <span key={i} data-hero-char className="inline-block will-change-transform">
                  {c}
                </span>
              ))}
            </span>
          ))}
        </h1>
        <p data-hero-fade className="mt-5 max-w-[34rem] text-balance text-[1.05rem] font-light leading-relaxed text-cream-100/90 sm:text-lg">
          Natureza e arquitetura em homenagem à Polônia, em uma casa de família que recebe hóspedes com carinho.
        </p>
        <div data-hero-fade className="mt-9 flex w-full max-w-md flex-col items-stretch gap-3 sm:w-auto sm:max-w-none sm:flex-row sm:items-center lg:justify-start">
          <a href="#hospedagem" className="btn btn-ghost" data-magnetic>
            Conheça a hospedagem
          </a>
          <a href="#reservas" className="btn btn-gold" data-magnetic>
            Reservar sua estadia <Icon name="arrow" className="arrow h-4 w-4" />
          </a>
        </div>
      </div>

      <div data-hero-fade className="absolute inset-x-0 bottom-6 z-10 flex items-end justify-between px-5 sm:px-10">
        <a href={site.booking} target="_blank" rel="noopener noreferrer" className="hidden text-left text-xs leading-tight text-cream-100/80 transition hover:text-gold-400 sm:block">
          <span className="display text-3xl not-italic text-cream-50">{ratings.overall}</span>
          <span className="ml-2 tracking-[0.12em] uppercase">{ratings.label} · Booking.com</span>
        </a>
        <a href="#hospedagem" aria-label="Rolar para a próxima seção" className="mx-auto hidden flex-col items-center gap-3 text-[0.65rem] uppercase tracking-[0.3em] text-cream-100/70 sm:mx-0 sm:flex">
          Role
          <span className="scroll-cue block h-12 w-px bg-cream-100/70" />
        </a>
        <span className="hidden w-32 sm:block" aria-hidden="true" />
      </div>
    </section>
  );
}
