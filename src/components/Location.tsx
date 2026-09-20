import { Icon } from "./Icon";
import { MapEmbed } from "./MapEmbed";
import { distances, farAirports, site } from "@/data/site";

const max = 20;

export function Location() {
  return (
    <section id="localizacao" className="relative bg-moss-900 px-5 pb-28 pt-28 text-cream-50 sm:px-10 lg:pb-40 lg:pt-40">
      <span className="scallop-top" style={{ ["--scallop" as string]: "var(--color-moss-900)" }} aria-hidden="true" />
      <div className="mx-auto max-w-[92rem]">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p data-reveal className="eyebrow mb-6 text-gold-400">
              Localização
            </p>
            <h2 data-split className="display text-[clamp(2.8rem,6vw,5.2rem)]">
              Tranquilidade a poucos minutos de tudo.
            </h2>
            <p data-reveal className="mt-8 max-w-md text-cream-100/85">
              Em um bairro de chácaras bem localizado, às margens da Rodovia Anhanguera, com restaurantes, padaria, farmácia, posto de gasolina e supermercado por perto.
              Excelente também para quem viaja a trabalho a Vinhedo ou Valinhos.
            </p>

            <address data-reveal className="mt-8 flex items-start gap-4 not-italic">
              <span className="mt-1 grid h-10 w-10 shrink-0 place-items-center rounded-full border border-gold-400/50 text-gold-400">
                <Icon name="pin" />
              </span>
              <span className="leading-relaxed text-cream-100">
                {site.address}
                <br />
                <span className="text-cream-100/70">{site.cityLine}</span>
              </span>
            </address>

            <div data-reveal className="mt-8 flex flex-wrap gap-3">
              <a href={site.maps} target="_blank" rel="noopener noreferrer" className="btn btn-gold" data-magnetic>
                Abrir no Google Maps <Icon name="arrow" className="arrow h-4 w-4" />
              </a>
            </div>
          </div>

          <div data-reveal className="lg:col-span-7">
            <MapEmbed src={site.mapsEmbed} fallbackHref={site.maps} />
          </div>
        </div>

        <div className="mt-20 grid gap-12 border-t border-cream-50/15 pt-14 lg:mt-28 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h3 data-reveal className="display text-4xl italic">
              O que há por perto
            </h3>
            <p data-reveal className="mt-4 max-w-xs text-sm text-cream-100/70">
              Distâncias aproximadas informadas pelo Booking.com a partir da propriedade.
            </p>
          </div>
          <ul className="grid gap-x-14 gap-y-7 sm:grid-cols-2 lg:col-span-8">
            {distances.map((d) => (
              <li key={d.label} data-reveal>
                <div className="mb-2 flex items-baseline justify-between gap-4">
                  <span className="text-cream-100/90">{d.label}</span>
                  <span className="display text-3xl text-gold-400">
                    {d.km}
                    <span className="ml-1 text-base text-cream-100/70">km</span>
                  </span>
                </div>
                <div className="h-[3px] w-full bg-cream-50/15">
                  <div data-bar className="h-full bg-gold-400" style={{ width: `${(d.km / max) * 100}%` }} />
                </div>
              </li>
            ))}
            <li data-reveal className="text-sm text-cream-100/65 sm:col-span-2">
              Aeroportos mais distantes: {farAirports.map((a) => `${a.label} (${a.km} km)`).join(" · ")}.
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
