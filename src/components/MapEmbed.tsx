"use client";

import { useState } from "react";
import { Icon } from "./Icon";

/** O mapa do Google só é carregado quando o visitante pede (mais rápido e mais privado). */
export function MapEmbed({ src, fallbackHref }: { src: string; fallbackHref: string }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden bg-sky-100 lg:aspect-auto lg:h-full lg:min-h-[26rem]">
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
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 p-6 text-center">
          <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden="true">
            <rect width="400" height="300" fill="#e8f0f9" />
            <path d="M-10 220C60 180 120 210 190 168S320 128 410 158" stroke="#0d2147" strokeWidth="2" fill="none" strokeDasharray="2 7" strokeLinecap="round" />
            <path d="M-10 92C80 102 140 62 230 82S340 62 410 42" stroke="#b7cfeb" strokeWidth="6" fill="none" />
            <path d="M120 -10C132 82 92 152 132 310" stroke="#d4e3f4" strokeWidth="6" fill="none" />
            <path d="M300 -10C280 92 332 192 290 310" stroke="#d4e3f4" strokeWidth="6" fill="none" />
            <path d="M-10 250C90 236 150 262 260 244S360 232 410 240" stroke="#d4e3f4" strokeWidth="4" fill="none" />
          </svg>
          <span className="relative grid h-12 w-12 place-items-center bg-navy-900 text-white">
            <Icon name="pin" className="h-6 w-6" />
          </span>
          <div className="relative">
            <p className="display text-3xl italic">Willa Hala</p>
            <p className="mt-1 text-sm text-ink">Chácaras São Bento · Vinhedo, SP</p>
          </div>
          <div className="relative flex flex-wrap justify-center gap-3">
            <button type="button" onClick={() => setLoaded(true)} className="btn btn-solid !min-h-11 !px-6">
              Ver mapa aqui
            </button>
            <a href={fallbackHref} target="_blank" rel="noopener noreferrer" className="btn btn-line !min-h-11 !bg-white !px-6">
              Abrir no Google Maps
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
