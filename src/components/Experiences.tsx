import { Photo } from "./Photo";
import { experiences, perks } from "@/data/site";

export function Experiences() {
  return (
    <section id="experiencias" data-hscroll className="overflow-x-clip bg-sky-100 px-5 py-24 sm:px-10 lg:py-0">
      <div className="mx-auto w-full max-w-[96rem]">
        <div className="mb-10 grid gap-6 lg:mb-12 lg:grid-cols-12 lg:items-end lg:gap-x-10">
          <div className="lg:col-span-8">
            <p data-reveal className="label">
              04 · Experiências
            </p>
            <h2 data-split className="display mt-6 text-[clamp(2.8rem,5.4vw,4.8rem)] leading-[1]">
              Pequenos rituais, grandes lembranças.
            </h2>
          </div>
          <p data-reveal className="text-ink lg:col-span-3 lg:col-start-10">
            As comodidades da casa, confirmadas nos canais oficiais. Deslize para conhecer cada uma.
          </p>
        </div>

        <div data-hscroll-track className="hscroll-track" tabIndex={0} aria-label="Experiências da hospedagem (role para o lado)">
          {experiences.map((e, i) => (
            <article key={e.slot} className="hscroll-panel">
              <figure className="group relative aspect-[4/5] w-full overflow-hidden bg-white">
                <div className="absolute inset-0 transition-transform duration-[1600ms] ease-[var(--ease-cine)] group-hover:scale-[1.05]">
                  <Photo slot={e.slot} scene={e.scene} alt={e.title} showLabel={false} />
                </div>
              </figure>
              <div className="mt-4 flex gap-4 border-t border-navy-900/25 pt-3">
                <span className="small-caps pt-1 text-mute">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="display text-[1.9rem] leading-none">{e.title}</h3>
                  <p className="mt-2 text-[0.9rem] leading-relaxed text-ink">{e.text}</p>
                </div>
              </div>
            </article>
          ))}

          <article className="hscroll-panel">
            <div className="flex aspect-[4/5] w-full flex-col justify-between bg-navy-900 p-6 text-white">
              <p className="small-caps text-sky-300">Também incluso</p>
              <ul className="space-y-3">
                {perks.map((p) => (
                  <li key={p} className="display flex items-center gap-3 text-[1.6rem] leading-tight !text-white">
                    <span className="h-px w-5 shrink-0 bg-sky-300" aria-hidden="true" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        </div>

        <div className="mt-8 hidden h-px w-full bg-navy-900/15 lg:block" aria-hidden="true">
          <div data-hscroll-bar className="h-px origin-left scale-x-0 bg-navy-900" />
        </div>
      </div>
    </section>
  );
}
