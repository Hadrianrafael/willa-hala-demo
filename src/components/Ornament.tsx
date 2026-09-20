/**
 * Flor recortada em papel — ornamento original inspirado na tradição
 * dos recortes poloneses (wycinanki), em referência à arquitetura da casa.
 */
export function Ornament({ className = "", ...rest }: React.SVGProps<SVGSVGElement>) {
  const outer = Array.from({ length: 8 }, (_, i) => i * 45);
  const inner = Array.from({ length: 8 }, (_, i) => i * 45 + 22.5);
  const dots = Array.from({ length: 16 }, (_, i) => i * 22.5);

  return (
    <svg viewBox="-100 -100 200 200" className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.2" {...rest}>
      {outer.map((a) => (
        <path key={a} d="M0 -14C-19 -34-15 -66 0 -90 15 -66 19 -34 0 -14Z" transform={`rotate(${a})`} />
      ))}
      {inner.map((a) => (
        <path key={a} d="M0 -12C-8 -26-7 -42 0 -54 7 -42 8 -26 0 -12Z" transform={`rotate(${a})`} fill="currentColor" fillOpacity="0.18" />
      ))}
      {outer.map((a) => (
        <path key={`v${a}`} d="M0 -30C-6 -40-5 -52 0 -62 5 -52 6 -40 0 -30Z" transform={`rotate(${a})`} strokeOpacity="0.7" />
      ))}
      {dots.map((a) => (
        <circle key={`d${a}`} cx="0" cy="-96" r="1.6" fill="currentColor" stroke="none" transform={`rotate(${a})`} />
      ))}
      <circle r="12" />
      <circle r="6" fill="currentColor" stroke="none" />
    </svg>
  );
}
