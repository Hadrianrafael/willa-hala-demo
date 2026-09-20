import { Ornament } from "./Ornament";

/** Cortina de abertura. Só é exibida quando o JS de animação vai rodar (ver .curtain no CSS). */
export function Curtain() {
  return (
    <div data-curtain className="curtain fixed inset-0 z-[70] place-items-center bg-navy-950 text-gold-400" aria-hidden="true">
      <div className="flex flex-col items-center gap-6">
        <span data-curtain-mark className="block">
          <Ornament className="h-24 w-24" />
        </span>
        <span data-curtain-name className="display text-4xl italic text-cream-50">
          Willa Hala
        </span>
      </div>
    </div>
  );
}
