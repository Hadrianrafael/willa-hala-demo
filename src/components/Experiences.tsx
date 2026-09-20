import { ExperienceGlyph } from "./Icon";
import { Photo } from "./Photo";
import { Ornament } from "./Ornament";
import { experiences, perks } from "@/data/site";

export function Experiences() {
  return (
    <section id="experiencias" data-hscroll className="relative overflow-x-clip bg-cream-100 px-5 py-24 sm:px-10 lg:py-0">
      <span className="scallop-top" style={{ ["--scallop" as string]: "var(--color-cream-100)" }} aria-hidden="true" />
      <div className="mx-auto w-full max-w-[92rem]">
        <div className="mb-10 flex flex-col justify-between gap-6 lg:mb-12 lg:flex-row lg:items-end">
          <div>
            <p data-reveal className="eyebrow mb-5 text-brick-600">
              Experiências
            </p>
            <h2 data-split className="display text-[clamp(2.8rem,5.6vw,5rem)] text-navy-900">
              Pequenos rituais, grandes lembranças.
            </h2>
          </div>
          <p data-reveal className="max-w-sm text-navy-800/85">
            As comodidades da casa, confirmadas nos canais oficiais da hospedagem. Deslize para conhecer cada uma.
          </p>
        </div>

        <div data-hscroll-track className="hscroll-track" tabIndex={0} aria-label="Experiências da hospedagem (role para o lado)">
          {experiences.map((e, i) => (
            <article key={e.slot} className="hscroll-panel group overflow-hidden rounded-[1.5rem] bg-navy-900 text-cream-50 shadow-xl shadow-navy-900/20">
              <div className="absolute inset-0 transition-transform duration-[1400ms] ease-[var(--ease-cine)] group-hover:scale-[1.06]">
                <Photo slot={e.slot} scene={e.scene} alt={e.title} showLabel={false} raised />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/20 to-navy-950/25" aria-hidden="true" />
              <span className="display absolute right-5 top-3 text-5xl italic text-cream-50/80" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <ExperienceGlyph scene={e.scene} className="absolute left-6 top-6 h-10 w-10 text-gold-400" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <h3 className="display text-3xl">{e.title}</h3>
                <p className="mt-2 text-[0.92rem] leading-relaxed text-cream-100/85">{e.text}</p>
              </div>
            </article>
          ))}

          <article className="hscroll-panel flex flex-col justify-between overflow-hidden rounded-[1.5rem] bg-navy-900 p-7 text-cream-50">
            <Ornament className="absolute -right-16 -top-16 h-64 w-64 text-cream-50/[0.07]" />
            <p className="eyebrow relative text-gold-400">Também incluso</p>
            <ul className="relative space-y-3">
              {perks.map((p) => (
                <li key={p} className="display flex items-center gap-3 text-2xl leading-tight">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold-400" aria-hidden="true" />
                  {p}
                </li>
              ))}
            </ul>
          </article>
        </div>

        <div className="mt-8 hidden h-px w-full bg-navy-900/15 lg:block" aria-hidden="true">
          <div data-hscroll-bar className="h-px origin-left scale-x-0 bg-brick-500" />
        </div>
      </div>
    </section>
  );
}
