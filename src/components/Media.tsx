import { useId } from "react";
import type { Scene } from "@/data/site";
import { Ornament } from "./Ornament";

type Tone = { a: string; b: string; ink: string; glow: string };

const tones: Record<Scene, Tone> = {
  house: { a: "#0c1d3a", b: "#2a3f63", ink: "#f6efe3", glow: "#f3c77a" },
  garden: { a: "#14251d", b: "#3d5f49", ink: "#a9bba3", glow: "#d8b06c" },
  queen: { a: "#132b52", b: "#3a4d72", ink: "#ebe0cc", glow: "#f3c77a" },
  suite: { a: "#241a2f", b: "#5b3d4d", ink: "#ebe0cc", glow: "#f3c77a" },
  twin: { a: "#132b52", b: "#2e5a63", ink: "#ebe0cc", glow: "#f3c77a" },
  triple: { a: "#1d3d6d", b: "#3f6a72", ink: "#ebe0cc", glow: "#f3c77a" },
  breakfast: { a: "#7a3a26", b: "#d19a62", ink: "#fbf7ef", glow: "#fbe3b0" },
  fireplace: { a: "#08132a", b: "#3b2a3a", ink: "#f6efe3", glow: "#ff9a4d" },
  lounge: { a: "#1c3428", b: "#4b6a55", ink: "#f6efe3", glow: "#f3c77a" },
  kids: { a: "#b4573a", b: "#d8b06c", ink: "#fbf7ef", glow: "#fbf7ef" },
  cafe: { a: "#3a2a22", b: "#a5715a", ink: "#fbf7ef", glow: "#fbe3b0" },
  detail: { a: "#ebe0cc", b: "#d9caae", ink: "#0c1d3a", glow: "#b4573a" },
};

function Bed({ x, y, w = 150, tone }: { x: number; y: number; w?: number; tone: Tone }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x="0" y="-44" width={w} height="44" rx="6" fill={tone.ink} opacity="0.28" />
      <rect x="-6" y="0" width={w + 12} height="54" rx="10" fill={tone.ink} opacity="0.85" />
      <rect x="8" y="-16" width={w * 0.38} height="22" rx="8" fill="#fff" opacity="0.9" />
      <rect x={w - 8 - w * 0.38} y="-16" width={w * 0.38} height="22" rx="8" fill="#fff" opacity="0.9" />
      <rect x="-4" y="54" width="8" height="20" fill={tone.ink} opacity="0.5" />
      <rect x={w - 4} y="54" width="8" height="20" fill={tone.ink} opacity="0.5" />
    </g>
  );
}

function Art({ scene, tone, id }: { scene: Scene; tone: Tone; id: string }) {
  switch (scene) {
    case "house":
      return (
        <g>
          <path d="M60 330V250L200 150l140 100v80Z" fill={tone.ink} opacity="0.92" />
          <path d="M40 262L200 138l160 124" stroke={tone.ink} strokeWidth="10" strokeLinecap="round" fill="none" />
          <rect x="298" y="150" width="22" height="50" fill="#b4573a" />
          {[110, 160, 230, 280].map((x) => (
            <rect key={x} x={x - 14} y="270" width="28" height="42" rx="3" fill={tone.glow} filter={`url(#${id}g)`} />
          ))}
          <rect x="176" y="188" width="48" height="44" rx="24" fill={tone.glow} filter={`url(#${id}g)`} />
          <rect x="0" y="330" width="400" height="170" fill="#08132a" opacity="0.55" />
        </g>
      );
    case "garden":
      return (
        <g fill={tone.ink}>
          {[-50, -25, 0, 25, 50].map((r, i) => (
            <path key={r} d="M200 470C150 380 160 290 200 210 240 290 250 380 200 470Z" transform={`rotate(${r} 200 470)`} opacity={0.35 + i * 0.1} />
          ))}
          <path d="M60 470c20-80 70-110 130-120-20 60-60 100-130 120Z" opacity="0.5" />
          <path d="M340 470c-20-80-70-110-130-120 20 60 60 100 130 120Z" opacity="0.5" />
          <path d="M296 178q8-9 16 0 8-9 16 0" stroke={tone.glow} strokeWidth="3" fill="none" strokeLinecap="round" />
        </g>
      );
    case "queen":
    case "suite":
      return (
        <g>
          <rect x="130" y="80" width="140" height="150" rx="70" fill={tone.glow} opacity="0.85" filter={`url(#${id}g)`} />
          <path d="M200 80v150M130 155h140" stroke={tone.a} strokeWidth="5" />
          {scene === "suite" && (
            <>
              <path d="M100 60c30 40 30 130 0 190M300 60c-30 40-30 130 0 190" stroke={tone.ink} strokeWidth="14" fill="none" opacity="0.3" />
              <circle cx="330" cy="330" r="16" fill={tone.glow} filter={`url(#${id}g)`} />
              <rect x="326" y="346" width="8" height="40" fill={tone.ink} opacity="0.6" />
            </>
          )}
          <Bed x={95} y={330} w={210} tone={tone} />
        </g>
      );
    case "twin":
      return (
        <g>
          <rect x="150" y="90" width="100" height="120" rx="50" fill={tone.glow} opacity="0.8" filter={`url(#${id}g)`} />
          <Bed x={30} y={340} w={140} tone={tone} />
          <Bed x={230} y={340} w={140} tone={tone} />
        </g>
      );
    case "triple":
      return (
        <g>
          <rect x="160" y="80" width="80" height="100" rx="40" fill={tone.glow} opacity="0.8" filter={`url(#${id}g)`} />
          <Bed x={14} y={300} w={110} tone={tone} />
          <Bed x={144} y={300} w={110} tone={tone} />
          <Bed x={274} y={300} w={110} tone={tone} />
          <rect x="14" y="410" width="372" height="6" rx="3" fill={tone.ink} opacity="0.2" />
        </g>
      );
    case "breakfast":
      return (
        <g>
          <ellipse cx="200" cy="350" rx="150" ry="26" fill="#000" opacity="0.18" />
          <ellipse cx="200" cy="320" rx="120" ry="30" fill={tone.ink} opacity="0.95" />
          <ellipse cx="200" cy="316" rx="82" ry="18" fill={tone.b} opacity="0.55" />
          <path d="M280 250h60v50a30 30 0 0 1-30 30 30 30 0 0 1-30-30v-50Z" fill={tone.ink} opacity="0.92" />
          <path d="M340 264h14a14 14 0 0 1 0 28h-14" stroke={tone.ink} strokeWidth="6" fill="none" />
          <path d="M300 230c-8 14 8 16 0 30M320 230c-8 14 8 16 0 30" stroke={tone.ink} strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.6" />
          <ellipse cx="120" cy="270" rx="46" ry="26" fill="#f0c98a" />
          <path d="M92 266q28-22 56 0" stroke="#b47a3c" strokeWidth="4" fill="none" />
        </g>
      );
    case "fireplace":
      return (
        <g>
          <path d="M200 150c14 50 70 66 70 130a70 70 0 0 1-140 0c0-30 14-48 30-64 0 22 14 32 24 32-4-46-8-70 16-98Z" fill={tone.glow} filter={`url(#${id}g)`} />
          <path d="M200 230c8 26 36 34 36 66a36 36 0 0 1-72 0c0-16 8-26 16-34 0 12 8 18 12 18-2-24-4-36 8-50Z" fill="#ffd9a0" />
          <path d="M110 372l180-24M110 350l180 24" stroke="#5a3a26" strokeWidth="14" strokeLinecap="round" />
          {[70, 330, 300, 100, 340].map((x, i) => (
            <circle key={x} cx={x} cy={60 + i * 34} r="2.2" fill={tone.ink} opacity="0.8" />
          ))}
        </g>
      );
    case "lounge":
      return (
        <g>
          <path d="M60 300v-50a34 34 0 0 1 34-34h212a34 34 0 0 1 34 34v50Z" fill={tone.ink} opacity="0.85" />
          <rect x="44" y="290" width="312" height="60" rx="18" fill={tone.ink} opacity="0.95" />
          <rect x="80" y="350" width="10" height="26" fill={tone.ink} opacity="0.5" />
          <rect x="310" y="350" width="10" height="26" fill={tone.ink} opacity="0.5" />
          <path d="M340 110v150" stroke={tone.ink} strokeWidth="5" opacity="0.6" />
          <path d="M310 110h60l-12 40h-36Z" fill={tone.glow} filter={`url(#${id}g)`} />
        </g>
      );
    case "kids":
      return (
        <g>
          <rect x="70" y="300" width="86" height="86" rx="10" fill={tone.ink} opacity="0.95" />
          <rect x="170" y="300" width="86" height="86" rx="10" fill="#0c1d3a" opacity="0.8" />
          <rect x="120" y="212" width="86" height="86" rx="10" fill={tone.ink} opacity="0.7" transform="rotate(-8 163 255)" />
          <circle cx="300" cy="330" r="42" fill="#98442c" opacity="0.85" />
          <path d="M300 130l10 24 26 3-19 18 6 26-23-13-23 13 6-26-19-18 26-3Z" fill={tone.ink} />
        </g>
      );
    case "cafe":
      return (
        <g>
          <path d="M110 240h150v70a75 75 0 0 1-75 75 75 75 0 0 1-75-75v-70Z" fill={tone.ink} opacity="0.95" />
          <path d="M260 262h22a26 26 0 0 1 0 52h-22" stroke={tone.ink} strokeWidth="10" fill="none" />
          <path d="M140 200c-10 20 10 24 0 46M185 200c-10 20 10 24 0 46M230 200c-10 20 10 24 0 46" stroke={tone.ink} strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.6" />
          <rect x="90" y="396" width="220" height="8" rx="4" fill={tone.ink} opacity="0.5" />
        </g>
      );
    case "detail":
    default:
      return null;
  }
}

/** Espaço reservado ilustrado: usado enquanto a foto real da hospedagem não foi enviada. */
export function PlaceholderArt({ scene, label, raised = false }: { scene: Scene; label?: string; raised?: boolean }) {
  const id = useId().replace(/:/g, "");
  const tone = tones[scene];
  return (
    <div className="absolute inset-0 overflow-hidden" data-placeholder>
      <svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" {...(label ? { role: "img", "aria-label": label } : { "aria-hidden": true })}>
        <defs>
          <linearGradient id={`${id}bg`} x1="0" y1="0" x2="0.4" y2="1">
            <stop offset="0" stopColor={tone.a} />
            <stop offset="1" stopColor={tone.b} />
          </linearGradient>
          <filter id={`${id}g`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="8" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <rect width="400" height="500" fill={`url(#${id}bg)`} />
        {scene === "detail" ? (
          <Ornament x={30} y={70} width={340} height={340} color={tone.ink} opacity={0.85} />
        ) : (
          <Ornament x={190} y={-30} width={280} height={280} color={tone.ink} opacity={0.12} />
        )}
        <g transform={raised && scene !== "detail" ? "translate(50 -10) scale(0.75)" : undefined}>
          <Art scene={scene} tone={tone} id={id} />
        </g>
      </svg>
      {label && (
        <span className="absolute right-3 top-3 rounded-full bg-black/35 px-3 py-1 text-[0.62rem] font-medium uppercase tracking-[0.18em] text-white/85 backdrop-blur">
          Foto oficial em breve
        </span>
      )}
    </div>
  );
}

type MediaProps = {
  src: string | null;
  scene: Scene;
  alt: string;
  className?: string;
  priority?: boolean;
  showLabel?: boolean;
  /** Sobe a ilustração do espaço reservado para não colidir com texto sobreposto (cards). */
  raised?: boolean;
};

/** Foto real quando o arquivo existe em public/photos; caso contrário, espaço ilustrado. */
export function Media({ src, scene, alt, className = "", priority = false, showLabel = true, raised = false }: MediaProps) {
  if (!src) {
    return (
      <div className={`absolute inset-0 ${className}`}>
        <PlaceholderArt scene={scene} label={showLabel ? alt : undefined} raised={raised} />
      </div>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element -- exportação estática sem otimizador de imagem
    <img
      src={src}
      alt={alt}
      className={`absolute inset-0 h-full w-full object-cover ${className}`}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      decoding="async"
    />
  );
}
