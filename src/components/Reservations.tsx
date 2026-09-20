import { Icon } from "./Icon";
import { Ornament } from "./Ornament";
import { rules, site } from "@/data/site";

export function Reservations() {
  return (
    <section id="reservas" className="relative overflow-x-clip bg-navy-950 px-5 pb-28 pt-28 text-cream-50 sm:px-10 lg:pb-36 lg:pt-40">
      <span className="scallop-top" style={{ ["--scallop" as string]: "var(--color-navy-950)" }} aria-hidden="true" />
      <Ornament className="spin-slow pointer-events-none absolute left-1/2 top-1/2 h-[64rem] w-[64rem] -translate-x-1/2 -translate-y-1/2 text-cream-50/[0.04]" />

      <div className="relative mx-auto max-w-4xl text-center">
        <p data-reveal className="eyebrow mb-6 text-gold-400">
          Reservas
        </p>
        <h2 data-split className="display text-[clamp(3rem,8vw,6.6rem)] italic">
          Reserve sua estadia.
        </h2>
        <p data-reveal className="mx-auto mt-8 max-w-lg text-cream-100/85">
          Escolha a plataforma de sua preferência para consultar datas, valores e condições de cada acomodação.
        </p>

        <div data-reveal className="mt-12 flex flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-start">
          <a href={site.booking} target="_blank" rel="noopener noreferrer" className="btn btn-gold sm:min-w-[19rem]" data-magnetic>
            Reservar pelo Booking.com <Icon name="arrow" className="arrow h-4 w-4" />
          </a>

          {site.airbnb ? (
            <a href={site.airbnb} target="_blank" rel="noopener noreferrer" className="btn btn-ghost sm:min-w-[19rem]" data-magnetic>
              Reservar pelo Airbnb <Icon name="arrow" className="arrow h-4 w-4" />
            </a>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <button type="button" disabled aria-disabled="true" aria-describedby="airbnb-nota" className="btn sm:min-w-[19rem]">
                Reservar pelo Airbnb
              </button>
              <span id="airbnb-nota" className="text-xs text-cream-100/60">
                Link oficial em breve
              </span>
            </div>
          )}
        </div>

        <dl data-reveal className="mx-auto mt-20 grid max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-cream-50/15 bg-cream-50/15 sm:grid-cols-3">
          {rules.map((r) => (
            <div key={r.label} className="bg-navy-950 px-5 py-6 text-left">
              <dt className="eyebrow text-[0.62rem] text-gold-400">{r.label}</dt>
              <dd className="display mt-1 text-2xl">{r.value}</dd>
            </div>
          ))}
        </dl>
        <p data-reveal className="mt-5 text-xs text-cream-100/55">
          Regras conforme a página da hospedagem no Booking.com. Confirme sempre no ato da reserva.
        </p>
      </div>
    </section>
  );
}
