import { ratings, site } from "@/data/site";

/** Faixa em azul suave com as notas públicas do Booking.com. */
export function Reviews() {
  return (
    <section aria-labelledby="avaliacoes" className="bg-sky-100 px-5 py-24 sm:px-10 lg:py-32">
      <div className="mx-auto grid max-w-[88rem] gap-14 lg:grid-cols-12 lg:gap-x-10">
        <div data-reveal className="lg:col-span-5">
          <p className="label">Quem já se hospedou</p>
          <h2 id="avaliacoes" className="display mt-8 text-[clamp(5rem,11vw,9rem)] leading-[0.85]">
            {ratings.overall}
          </h2>
          <p className="display mt-2 text-3xl italic">{ratings.label}</p>
          <p className="mt-6 max-w-sm text-ink">
            Média de {ratings.count} avaliações de hóspedes no{" "}
            <a className="text-navy-900 underline underline-offset-4" href={site.booking} target="_blank" rel="noopener noreferrer">
              Booking.com
            </a>
            . Os hóspedes destacam {ratings.highlights.slice(0, -1).join(", ").toLowerCase()} e {ratings.highlights.at(-1)?.toLowerCase()}.
          </p>
        </div>

        <ul className="grid content-center gap-x-14 gap-y-7 sm:grid-cols-2 lg:col-span-7">
          {ratings.categories.map((c) => (
            <li key={c.label} data-reveal>
              <div className="mb-3 flex items-baseline justify-between gap-4">
                <span className="text-navy-900">{c.label}</span>
                <span className="display text-3xl">{c.value.toFixed(1).replace(".", ",")}</span>
              </div>
              <div className="h-[2px] w-full bg-white">
                <div data-bar className="h-full bg-navy-900" style={{ width: `${c.value * 10}%` }} />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
