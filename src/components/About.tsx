import { Photo } from "./Photo";
import { ratings } from "@/data/site";

const stats = [
  { to: ratings.overall, decimals: 1, suffix: "", label: `Nota no Booking.com, com ${ratings.count} avaliações` },
  { to: "9,8", decimals: 1, suffix: "", label: "Nota para o atendimento da equipe" },
  { to: "15", decimals: 0, suffix: " min", label: "Até o Aeroporto de Viracopos" },
];

export function About() {
  return (
    <section id="hospedagem" className="bg-white px-5 py-28 sm:px-10 lg:py-40">
      <div className="mx-auto max-w-[88rem]">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-x-10">
          <div className="lg:col-span-6">
            <p data-reveal className="label">
              01 · A hospedagem
            </p>
            <h2 data-split className="display mt-8 text-[clamp(3rem,6.6vw,6rem)] leading-[0.98]">
              Uma casa de família, cuidada como um refúgio.
            </h2>
          </div>

          <div className="lg:col-span-5 lg:col-start-8 lg:pt-24">
            <p data-reveal className="text-[1.15rem] leading-[1.75] text-navy-900 sm:text-[1.25rem]">
              A Willa Hala nasceu de uma casa cheia de histórias em Vinhedo. Neta de quem idealizou a construção, a anfitriã cresceu ali e hoje mantém viva a alegria e o conforto
              que viveu desde a infância — cuidando das plantas, dos pássaros e da natureza ao redor.
            </p>
            <p data-reveal className="mt-6 text-ink">
              Com muita natureza e uma arquitetura em homenagem à Polônia, a hospedagem recebe estadias individuais ou em grupo, a poucos minutos da Rodovia Anhanguera e do
              Aeroporto de Viracopos.
            </p>

            <dl className="mt-12 grid grid-cols-3 border-t border-line">
              {stats.map((s, i) => (
                <div key={s.label} data-reveal className={`pt-6 ${i > 0 ? "border-l border-line pl-4 sm:pl-6" : "pr-4"}`}>
                  <dt className="sr-only">{s.label}</dt>
                  <dd>
                    <span className="display text-[clamp(2.4rem,4.6vw,3.6rem)]">
                      <span data-count={s.to.replace(",", ".")} data-decimals={s.decimals}>
                        {s.to}
                      </span>
                      {s.suffix && <span className="text-[0.45em]">{s.suffix}</span>}
                    </span>
                    <span className="mt-2 block text-[0.72rem] leading-snug text-mute">{s.label}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* Fotografias em composição assimétrica */}
        <div className="mt-20 grid grid-cols-12 gap-3 sm:gap-5 lg:mt-28 lg:h-[46rem] lg:grid-rows-2">
          <figure data-img-reveal className="relative col-span-12 aspect-[4/5] overflow-hidden bg-sky-100 sm:col-span-7 sm:row-span-2 sm:aspect-auto sm:h-[36rem] lg:h-auto">
            <div data-parallax="0.05" className="parallax-media" data-img-inner>
              <Photo slot="sobre-1" scene="house" alt="Fachada da Willa Hala" />
            </div>
          </figure>
          <figure data-img-reveal className="relative col-span-6 aspect-[4/3] overflow-hidden bg-sky-100 sm:col-span-5 sm:aspect-auto sm:h-[17rem] lg:h-auto">
            <div data-parallax="0.07" className="parallax-media" data-img-inner>
              <Photo slot="sobre-2" scene="garden" alt="Jardim da Willa Hala" />
            </div>
          </figure>
          <figure data-img-reveal className="relative col-span-6 aspect-[4/3] overflow-hidden bg-sky-100 sm:col-span-5 sm:aspect-auto sm:h-[17rem] lg:h-auto">
            <div data-parallax="0.05" className="parallax-media" data-img-inner>
              <Photo slot="sobre-3" scene="lounge" alt="Sala de estar" />
            </div>
          </figure>
        </div>
      </div>
    </section>
  );
}
