/** Identificação discreta de que este é um protótipo não oficial. */
export function DemoBadge() {
  return (
    <div
      role="note"
      className="pointer-events-none fixed bottom-3 left-3 z-40 rounded-full bg-navy-950/70 px-3.5 py-1.5 text-[0.6rem] font-medium uppercase tracking-[0.2em] text-cream-100/80 backdrop-blur-md sm:bottom-4 sm:left-4"
    >
      Demonstração não oficial · HR Tech
    </div>
  );
}
