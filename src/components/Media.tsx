import { useId } from "react";
import type { Scene } from "@/data/site";

type Tone = { a: string; b: string; ink: string; glow: string };

const navy = "#0d2147";
const tones: Record<Scene, Tone> = {
  house: { a: "#eef4fb", b: "#d3e2f4", ink: navy, glow: "#f6dfae" },
  garden: { a: "#eaf2f0", b: "#cfe1dc", ink: "#2f5f57", glow: "#f6dfae" },
  queen: { a: "#eef4fb", b: "#d6e4f4", ink: navy, glow: "#f6dfae" },
  suite: { a: "#f1f0f8", b: "#d9dcf0", ink: navy, glow: "#f6dfae" },
  twin: { a: "#edf4f8", b: "#d2e4ee", ink: navy, glow: "#f6dfae" },
  triple: { a: "#eef3fa", b: "#d4e0f2", ink: navy, glow: "#f6dfae" },
  breakfast: { a: "#f8f2e7", b: "#eadcc3", ink: navy, glow: "#f6dfae" },
  fireplace: { a: "#e4ebf6", b: "#c7d6ec", ink: navy, glow: "#f2a25c" },
  lounge: { a: "#eef3f9", b: "#d8e4f1", ink: navy, glow: "#f6dfae" },
  kids: { a: "#f7efe3", b: "#ecd9bd", ink: navy, glow: "#f6dfae" },
  cafe: { a: "#f6efe4", b: "#e6d3b8", ink: navy, glow: "#f6dfae" },
  detail: { a: "#f4f8fc", b: "#e2ecf8", ink: navy, glow: "#f6dfae" },
};

function Bed({ x, y, w = 150, tone }: { x: number; y: number; w?: number; tone: Tone }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x="0" y="-44" width={w} height="44" rx="4" fill={tone.ink} opacity="0.16" />
      <rect x="-6" y="0" width={w + 12} height="54" rx="6" fill={tone.ink} opacity="0.88" />
      <rect x="8" y="-16" width={w * 0.38} height="22" rx="6" fill="#fff" />
      <rect x={w - 8 - w * 0.38} y="-16" width={w * 0.38} height="22" rx="6" fill="#fff" />
      <rect x="-4" y="54" width="7" height="18" fill={tone.ink} opacity="0.6" />
      <rect x={w - 3} y="54" width="7" height="18" fill={tone.ink} opacity="0.6" />
    </g>
  );
}

function Window({ x, y, w, h, tone }: { x: number; y: number; w: number; h: number; tone: Tone }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={w / 2} fill={tone.glow} />
      <rect x={x} y={y} width={w} height={h} rx={w / 2} fill="none" stroke={tone.ink} strokeWidth="4" />
      <path d={`M${x + w / 2} ${y}v${h}M${x} ${y + h / 2}h${w}`} stroke={tone.ink} strokeWidth="3" />
    </g>
  );
}

function Art({ scene, tone }: { scene: Scene; tone: Tone }) {
  switch (scene) {
    case "house":
      return (
        <g>
          <rect x="70" y="250" width="260" height="120" fill="#fff" />
          <rect x="70" y="250" width="260" height="120" fill="none" stroke={tone.ink} strokeWidth="3" />
          <path d="M44 262L200 140l156 122" stroke={tone.ink} strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <path d="M60 254L200 150l140 104Z" fill={tone.ink} opacity="0.92" />
          <rect x="292" y="152" width="20" height="48" fill="#b9684d" />
          <circle cx="200" cy="216" r="22" fill={tone.glow} stroke="#fff" strokeWidth="3" />
          {[108, 162, 238, 292].map((x) => (
            <rect key={x} x={x - 14} y="276" width="28" height="42" rx="2" fill={tone.glow} stroke={tone.ink} strokeWidth="3" />
          ))}
          <path d="M20 370h360" stroke={tone.ink} strokeWidth="3" />
        </g>
      );
    case "garden":
      return (
        <g fill={tone.ink}>
          {[-50, -25, 0, 25, 50].map((r, i) => (
            <path key={r} d="M200 470C150 380 160 290 200 210 240 290 250 380 200 470Z" transform={`rotate(${r} 200 470)`} opacity={0.3 + i * 0.1} />
          ))}
          <path d="M60 470c20-80 70-110 130-120-20 60-60 100-130 120Z" opacity="0.45" />
          <path d="M340 470c-20-80-70-110-130-120 20 60 60 100 130 120Z" opacity="0.45" />
          <path d="M296 178q8-9 16 0 8-9 16 0" stroke={tone.ink} strokeWidth="3" fill="none" strokeLinecap="round" />
        </g>
      );
    case "queen":
    case "suite":
      return (
        <g>
          <Window x={130} y={80} w={140} h={150} tone={tone} />
          {scene === "suite" && (
            <>
              <path d="M100 60c30 40 30 130 0 190M300 60c-30 40-30 130 0 190" stroke={tone.ink} strokeWidth="12" fill="none" opacity="0.25" />
              <circle cx="336" cy="332" r="15" fill={tone.glow} stroke={tone.ink} strokeWidth="3" />
              <rect x="332" y="347" width="8" height="40" fill={tone.ink} opacity="0.7" />
            </>
          )}
          <Bed x={95} y={330} w={210} tone={tone} />
        </g>
      );
    case "twin":
      return (
        <g>
          <Window x={150} y={90} w={100} h={120} tone={tone} />
          <Bed x={30} y={340} w={140} tone={tone} />
          <Bed x={230} y={340} w={140} tone={tone} />
        </g>
      );
    case "triple":
      return (
        <g>
          <Window x={160} y={80} w={80} h={100} tone={tone} />
          <Bed x={14} y={300} w={110} tone={tone} />
          <Bed x={144} y={300} w={110} tone={tone} />
          <Bed x={274} y={300} w={110} tone={tone} />
        </g>
      );
    case "breakfast":
      return (
        <g>
          <ellipse cx="200" cy="350" rx="150" ry="24" fill={tone.ink} opacity="0.1" />
          <ellipse cx="200" cy="320" rx="120" ry="30" fill="#fff" stroke={tone.ink} strokeWidth="3" />
          <ellipse cx="200" cy="316" rx="80" ry="17" fill={tone.b} />
          <path d="M280 250h60v50a30 30 0 0 1-30 30 30 30 0 0 1-30-30v-50Z" fill="#fff" stroke={tone.ink} strokeWidth="3" />
          <path d="M340 264h14a14 14 0 0 1 0 28h-14" stroke={tone.ink} strokeWidth="5" fill="none" />
          <path d="M300 230c-8 14 8 16 0 30M320 230c-8 14 8 16 0 30" stroke={tone.ink} strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.5" />
          <ellipse cx="120" cy="272" rx="46" ry="26" fill="#e9bf7f" />
          <path d="M92 268q28-22 56 0" stroke="#b47a3c" strokeWidth="4" fill="none" />
        </g>
      );
    case "fireplace":
      return (
        <g>
          <path d="M200 150c14 50 70 66 70 130a70 70 0 0 1-140 0c0-30 14-48 30-64 0 22 14 32 24 32-4-46-8-70 16-98Z" fill={tone.glow} />
          <path d="M200 230c8 26 36 34 36 66a36 36 0 0 1-72 0c0-16 8-26 16-34 0 12 8 18 12 18-2-24-4-36 8-50Z" fill="#ffe7b8" />
          <path d="M110 372l180-24M110 350l180 24" stroke={tone.ink} strokeWidth="13" strokeLinecap="round" opacity="0.85" />
          {[70, 330, 300, 100, 340].map((x, i) => (
            <circle key={x} cx={x} cy={60 + i * 34} r="2.4" fill={tone.ink} opacity="0.5" />
          ))}
        </g>
      );
    case "lounge":
      return (
        <g>
          <path d="M60 300v-50a34 34 0 0 1 34-34h212a34 34 0 0 1 34 34v50Z" fill={tone.ink} opacity="0.7" />
          <rect x="44" y="290" width="312" height="60" rx="14" fill={tone.ink} opacity="0.92" />
          <rect x="80" y="350" width="9" height="26" fill={tone.ink} opacity="0.6" />
          <rect x="311" y="350" width="9" height="26" fill={tone.ink} opacity="0.6" />
          <path d="M340 110v150" stroke={tone.ink} strokeWidth="4" opacity="0.7" />
          <path d="M310 110h60l-12 40h-36Z" fill={tone.glow} stroke={tone.ink} strokeWidth="3" />
        </g>
      );
    case "kids":
      return (
        <g>
          <rect x="70" y="300" width="86" height="86" rx="6" fill={tone.ink} opacity="0.9" />
          <rect x="170" y="300" width="86" height="86" rx="6" fill="#fff" stroke={tone.ink} strokeWidth="3" />
          <rect x="120" y="212" width="86" height="86" rx="6" fill={tone.b} stroke={tone.ink} strokeWidth="3" transform="rotate(-8 163 255)" />
          <circle cx="300" cy="330" r="42" fill="#b9684d" opacity="0.9" />
          <path d="M300 130l10 24 26 3-19 18 6 26-23-13-23 13 6-26-19-18 26-3Z" fill={tone.ink} />
        </g>
      );
    case "cafe":
      return (
        <g>
          <path d="M110 240h150v70a75 75 0 0 1-75 75 75 75 0 0 1-75-75v-70Z" fill="#fff" stroke={tone.ink} strokeWidth="3" />
          <path d="M260 262h22a26 26 0 0 1 0 52h-22" stroke={tone.ink} strokeWidth="9" fill="none" />
          <path d="M140 200c-10 20 10 24 0 46M185 200c-10 20 10 24 0 46M230 200c-10 20 10 24 0 46" stroke={tone.ink} strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.45" />
          <rect x="90" y="396" width="220" height="7" rx="3" fill={tone.ink} opacity="0.4" />
        </g>
      );
    case "detail":
    default:
      return <Flower tone={tone} />;
  }
}

/** Flor de papel recortado (ornamento original inspirado nos recortes poloneses). */
function Flower({ tone }: { tone: Tone }) {
  const petals = Array.from({ length: 8 }, (_, i) => i * 45);
  return (
    <g transform="translate(200 250) scale(1.6)" fill="none" stroke={tone.ink} strokeWidth="1.6">
      {petals.map((a) => (
        <path key={a} d="M0 -14C-19 -34-15 -66 0 -90 15 -66 19 -34 0 -14Z" transform={`rotate(${a})`} />
      ))}
      {petals.map((a) => (
        <path key={`i${a}`} d="M0 -12C-8 -26-7 -42 0 -54 7 -42 8 -26 0 -12Z" transform={`rotate(${a + 22.5})`} fill={tone.ink} fillOpacity="0.14" />
      ))}
      <circle r="10" />
      <circle r="4" fill={tone.ink} />
    </g>
  );
}

/** Espaço reservado editorial: usado enquanto a foto real da hospedagem não foi enviada. */
export function PlaceholderArt({ scene, label, raised = false }: { scene: Scene; label?: string; raised?: boolean }) {
  const id = useId().replace(/:/g, "");
  const tone = tones[scene];
  return (
    <div className="absolute inset-0 overflow-hidden" data-placeholder>
      <svg
        viewBox="0 0 400 500"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
        {...(label ? { role: "img", "aria-label": label } : { "aria-hidden": true })}
      >
        <defs>
          <linearGradient id={`${id}bg`} x1="0" y1="0" x2="0.3" y2="1">
            <stop offset="0" stopColor={tone.a} />
            <stop offset="1" stopColor={tone.b} />
          </linearGradient>
        </defs>
        <rect width="400" height="500" fill={`url(#${id}bg)`} />
        <g transform={raised && scene !== "detail" ? "translate(50 -10) scale(0.75)" : undefined}>
          <Art scene={scene} tone={tone} />
        </g>
      </svg>
      {label && (
        <span className="absolute left-3 top-3 bg-white/90 px-2.5 py-1 text-[0.6rem] font-medium uppercase tracking-[0.18em] text-navy-900">
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
  /** Sobe a ilustração do espaço reservado para não colidir com texto sobreposto. */
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
