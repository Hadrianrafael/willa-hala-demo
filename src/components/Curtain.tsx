import { Ornament } from "./Ornament";

/** Cortina de abertura. Só é exibida quando o JS de animação vai rodar (ver .curtain no CSS). */
export function Curtain() {
  return (
    <div data-curtain className="curtain fixed inset-0 z-[70] place-items-center bg-white text-navy-900" aria-hidden="true">
      <div className="flex flex-col items-center gap-5">
        <span data-curtain-mark className="block">
          <Ornament className="h-20 w-20" />
        </span>
        <span data-curtain-name className="display text-4xl italic">
          Willa Hala
        </span>
      </div>
    </div>
  );
}
