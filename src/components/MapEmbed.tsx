"use client";

import { useState } from "react";
import { Icon } from "./Icon";
import { Ornament } from "./Ornament";

/** O mapa do Google só é carregado quando o visitante pede (mais rápido e mais privado). */
export function MapEmbed({ src, fallbackHref }: { src: string; fallbackHref: string }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[1.75rem] bg-moss-800 shadow-2xl shadow-black/30 lg:aspect-auto lg:h-full lg:min-h-[26rem]">
      {loaded ? (
        <iframe
          title="Mapa: localização da Willa Hala em Vinhedo"
          src={src}
          className="absolute inset-0 h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 p-6 text-center text-cream-50">
          <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full opacity-60" aria-hidden="true">
            <rect width="400" height="300" fill="#1c3428" />
            <path d="M-10 210C60 170 120 200 190 160S320 120 410 150" stroke="#d8b06c" strokeWidth="3" fill="none" opacity="0.7" strokeDasharray="2 8" strokeLinecap="round" />
            <path d="M-10 90C80 100 140 60 230 80S340 60 410 40" stroke="#a9bba3" strokeWidth="2" fill="none" opacity="0.5" />
            <path d="M120 -10C130 80 90 150 130 310" stroke="#a9bba3" strokeWidth="2" fill="none" opacity="0.35" />
            <path d="M300 -10C280 90 330 190 290 310" stroke="#a9bba3" strokeWidth="2" fill="none" opacity="0.35" />
          </svg>
          <Ornament className="absolute h-72 w-72 text-cream-50/[0.06]" />
          <span className="relative grid h-14 w-14 place-items-center rounded-full bg-gold-400 text-navy-950 shadow-lg shadow-black/30">
            <Icon name="pin" className="h-6 w-6" />
          </span>
          <div className="relative">
            <p className="display text-3xl italic">Willa Hala</p>
            <p className="mt-1 text-sm text-cream-100/80">Chácaras São Bento · Vinhedo, SP</p>
          </div>
          <div className="relative flex flex-wrap justify-center gap-3">
            <button type="button" onClick={() => setLoaded(true)} className="btn btn-gold !min-h-11 !px-6">
              Ver mapa aqui
            </button>
            <a href={fallbackHref} target="_blank" rel="noopener noreferrer" className="btn btn-ghost !min-h-11 !px-6">
              Abrir no Google Maps
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
