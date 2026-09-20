import { Ornament } from "./Ornament";
import { Photo } from "./Photo";
import { ratings, site } from "@/data/site";

const stats = [
  { to: 9.2, decimals: 1, suffix: "", label: `Nota no Booking.com · ${ratings.count} avaliações` },
  { to: 9.8, decimals: 1, suffix: "", label: "Nota em atendimento da equipe" },
  { to: 15, decimals: 0, suffix: " min", label: "Do Aeroporto de Viracopos" },
];

export function About() {
  return (
    <section id="hospedagem" className="relative overflow-x-clip bg-cream-100 px-5 pb-28 pt-32 sm:px-10 lg:pb-40 lg:pt-44">
      <span className="scallop-top" style={{ ["--scallop" as string]: "var(--color-cream-100)" }} aria-hidden="true" />
      <Ornament className="spin-slow pointer-events-none absolute -right-40 top-20 h-[34rem] w-[34rem] text-navy-900/[0.06]" />

      <div className="mx-auto grid max-w-[88rem] items-center gap-16 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-6 lg:pr-10">
          <p data-reveal className="eyebrow mb-6 text-brick-600">
            A hospedagem
          </p>
          <h2 data-split className="display text-[clamp(2.8rem,6.4vw,5.6rem)] text-navy-900">
            Uma casa de família, cuidada como um refúgio.
          </h2>
          <div className="mt-10 max-w-xl space-y-5 text-navy-800/90">
            <p data-reveal>
              A Willa Hala nasceu de uma casa cheia de histórias em Vinhedo. Neta de quem idealizou a construção, a anfitriã cresceu ali e hoje mantém viva a alegria e o
              conforto que viveu desde a infância — cuidando das plantas, dos pássaros e da natureza ao redor.
            </p>
            <p data-reveal>
              Com muita natureza e uma arquitetura em homenagem à Polônia, a hospedagem recebe estadias individuais ou em grupo, a poucos minutos da Rodovia Anhanguera e do
              Aeroporto de Viracopos.
            </p>
          </div>

          <dl className="mt-14 grid max-w-xl grid-cols-3 gap-4 border-t border-navy-900/15 pt-8">
            {stats.map((s) => (
              <div key={s.label} data-reveal>
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <span className="display text-[clamp(2.4rem,5vw,3.8rem)] text-navy-900">
                    <span data-count={s.to} data-decimals={s.decimals}>
                      {String(s.to).replace(".", ",")}
                    </span>
                    {s.suffix && <span className="text-[0.5em]">{s.suffix}</span>}
                  </span>
                  <span className="mt-1 block text-[0.72rem] leading-snug tracking-wide text-navy-800/70">{s.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Colagem editorial em camadas */}
        <div className="relative mx-auto h-[34rem] w-full max-w-xl sm:h-[42rem] lg:col-span-6 lg:h-[46rem] lg:max-w-none">
          <figure data-img-reveal className="absolute left-0 top-0 h-[68%] w-[64%] overflow-hidden rounded-t-[999px] shadow-2xl shadow-navy-900/25">
            <div data-parallax="0.07" className="parallax-media" data-img-inner>
              <Photo slot="sobre-1" scene="house" alt="Fachada da Willa Hala" />
            </div>
          </figure>
          <figure data-img-reveal className="absolute bottom-[4%] right-0 h-[46%] w-[52%] overflow-hidden rounded-2xl shadow-2xl shadow-navy-900/25">
            <div data-parallax="0.1" className="parallax-media" data-img-inner>
              <Photo slot="sobre-2" scene="garden" alt="Jardim da Willa Hala" />
            </div>
          </figure>
          <figure data-img-reveal className="absolute bottom-0 left-[6%] h-[26%] w-[34%] overflow-hidden rounded-2xl border-4 border-cream-100 shadow-xl shadow-navy-900/20">
            <div data-parallax="0.05" className="parallax-media" data-img-inner>
              <Photo slot="sobre-3" scene="detail" alt="Detalhes da casa" showLabel={false} />
            </div>
          </figure>
        </div>
      </div>

      {/* Avaliações verificadas */}
      <div className="mx-auto mt-28 max-w-[88rem] rounded-[2rem] bg-navy-900 px-6 py-12 text-cream-50 sm:px-12 lg:mt-40 lg:py-16">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <div data-reveal className="lg:col-span-4">
            <p className="eyebrow text-gold-400">Quem já se hospedou</p>
            <p className="display mt-4 text-[clamp(3.4rem,8vw,6rem)] italic">
              {ratings.overall}
              <span className="ml-3 text-2xl not-italic tracking-[0.1em] text-cream-100/80">{ratings.label}</span>
            </p>
            <p className="mt-2 text-sm text-cream-100/70">
              Média de {ratings.count} avaliações de hóspedes no{" "}
              <a className="underline decoration-gold-400 underline-offset-4 hover:text-gold-400" href={site.booking} target="_blank" rel="noopener noreferrer">
                Booking.com
              </a>
              .
            </p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {ratings.highlights.map((h) => (
                <li key={h} className="rounded-full border border-cream-50/25 px-4 py-1.5 text-xs uppercase tracking-[0.14em] text-cream-100/90">
                  {h}
                </li>
              ))}
            </ul>
          </div>
          <ul className="grid gap-x-12 gap-y-6 sm:grid-cols-2 lg:col-span-8">
            {ratings.categories.map((c) => (
              <li key={c.label} data-reveal>
                <div className="mb-2 flex items-baseline justify-between text-sm">
                  <span className="tracking-wide text-cream-100/90">{c.label}</span>
                  <span className="display text-2xl text-gold-400">{c.value.toFixed(1).replace(".", ",")}</span>
                </div>
                <div className="h-[3px] w-full bg-cream-50/15">
                  <div data-bar className="h-full bg-gold-400" style={{ width: `${c.value * 10}%` }} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
