import { Icon } from "./Icon";
import { rules, site } from "@/data/site";

export function Reservations() {
  return (
    <section id="reservas" className="bg-sky-100 px-5 py-28 sm:px-10 lg:py-40">
      <div className="mx-auto grid max-w-[88rem] gap-16 lg:grid-cols-12 lg:gap-x-10">
        <div className="lg:col-span-6">
          <p data-reveal className="label">
            06 · Reservas
          </p>
          <h2 data-split className="display mt-8 text-[clamp(3.2rem,7.4vw,6.6rem)] leading-[0.95]">
            Reserve sua <span className="italic">estadia.</span>
          </h2>
          <p data-reveal className="mt-8 max-w-md text-ink">
            Escolha a plataforma de sua preferência para consultar datas, valores e condições de cada acomodação.
          </p>

          <div data-reveal className="mt-10 flex flex-col items-stretch gap-4 sm:max-w-sm">
            <a href={site.booking} target="_blank" rel="noopener noreferrer" className="btn btn-solid" data-magnetic>
              Reservar pelo Booking.com <Icon name="arrow" className="arrow h-4 w-4" />
            </a>

            {site.airbnb ? (
              <a href={site.airbnb} target="_blank" rel="noopener noreferrer" className="btn btn-line !bg-white" data-magnetic>
                Reservar pelo Airbnb <Icon name="arrow" className="arrow h-4 w-4" />
              </a>
            ) : (
              <div className="flex flex-col gap-2">
                <button type="button" disabled aria-disabled="true" aria-describedby="airbnb-nota" className="btn">
                  Reservar pelo Airbnb
                </button>
                <span id="airbnb-nota" className="text-xs text-mute">
                  Link oficial em breve
                </span>
              </div>
            )}
          </div>
        </div>

        <div data-reveal className="lg:col-span-5 lg:col-start-8 lg:self-end">
          <p className="small-caps mb-4 text-navy-800">Informações da hospedagem</p>
          <dl className="border-t border-navy-900/25">
            {rules.map((r) => (
              <div key={r.label} className="flex items-baseline justify-between gap-6 border-b border-navy-900/15 py-4">
                <dt className="text-mute">{r.label}</dt>
                <dd className="display text-2xl">{r.value}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 text-xs text-mute">Regras conforme a página da hospedagem no Booking.com. Confirme sempre no ato da reserva.</p>
        </div>
      </div>
    </section>
  );
}
