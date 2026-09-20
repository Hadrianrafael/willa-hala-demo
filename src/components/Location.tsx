import { Icon } from "./Icon";
import { MapEmbed } from "./MapEmbed";
import { distances, farAirports, site } from "@/data/site";

const max = 20;

export function Location() {
  return (
    <section id="localizacao" className="bg-white px-5 py-28 sm:px-10 lg:py-40">
      <div className="mx-auto max-w-[88rem]">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-x-10">
          <div className="lg:col-span-5">
            <p data-reveal className="label">
              05 · Localização
            </p>
            <h2 data-split className="display mt-8 text-[clamp(3rem,6vw,5.4rem)] leading-[0.98]">
              Tranquilidade a poucos minutos de tudo.
            </h2>
            <p data-reveal className="mt-8 max-w-md text-ink">
              Em um bairro de chácaras bem localizado, às margens da Rodovia Anhanguera, com restaurantes, padaria, farmácia, posto de gasolina e supermercado por perto.
              Excelente também para quem viaja a trabalho a Vinhedo ou Valinhos.
            </p>

            <address data-reveal className="mt-8 flex items-start gap-4 border-t border-line pt-6 not-italic">
              <span className="mt-1 text-navy-900">
                <Icon name="pin" />
              </span>
              <span className="leading-relaxed text-navy-900">
                {site.address}
                <br />
                <span className="text-mute">{site.cityLine}</span>
              </span>
            </address>

            <div data-reveal className="mt-8">
              <a href={site.maps} target="_blank" rel="noopener noreferrer" className="btn btn-solid" data-magnetic>
                Abrir no Google Maps <Icon name="arrow" className="arrow h-4 w-4" />
              </a>
            </div>
          </div>

          <div data-reveal className="lg:col-span-7">
            <MapEmbed src={site.mapsEmbed} fallbackHref={site.maps} />
          </div>
        </div>

        <div className="mt-20 grid gap-10 border-t border-line pt-14 lg:mt-28 lg:grid-cols-12 lg:gap-x-10">
          <div className="lg:col-span-4">
            <h3 data-reveal className="display text-4xl italic">
              O que há por perto
            </h3>
            <p data-reveal className="mt-4 max-w-xs text-sm text-mute">
              Distâncias aproximadas informadas pelo Booking.com a partir da propriedade.
            </p>
          </div>
          <ul className="grid gap-x-14 gap-y-7 sm:grid-cols-2 lg:col-span-8">
            {distances.map((d) => (
              <li key={d.label} data-reveal>
                <div className="mb-2 flex items-baseline justify-between gap-4">
                  <span className="text-navy-900">{d.label}</span>
                  <span className="display text-3xl">
                    {d.km}
                    <span className="ml-1 text-base text-mute">km</span>
                  </span>
                </div>
                <div className="h-[2px] w-full bg-sky-100">
                  <div data-bar className="h-full bg-navy-900" style={{ width: `${(d.km / max) * 100}%` }} />
                </div>
              </li>
            ))}
            <li data-reveal className="text-sm text-mute sm:col-span-2">
              Aeroportos mais distantes: {farAirports.map((a) => `${a.label} (${a.km} km)`).join(" · ")}.
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
