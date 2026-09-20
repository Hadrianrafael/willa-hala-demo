import { Icon } from "./Icon";
import { Ornament } from "./Ornament";
import { nav, site } from "@/data/site";

export function Footer() {
  return (
    <footer className="bg-navy-900 px-5 pb-10 pt-20 text-sky-200 sm:px-10">
      <div className="mx-auto grid max-w-[96rem] gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="flex items-center gap-4 text-white">
            <Ornament className="h-10 w-10 text-sky-300" />
            <p className="display !text-white text-5xl italic">Willa Hala</p>
          </div>
          <p className="mt-4 max-w-sm text-sm">Hospedagem em Vinhedo, São Paulo. Natureza, aconchego e uma arquitetura em homenagem à Polônia.</p>
          <a
            href={site.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex min-h-11 items-center gap-3 border border-sky-300/40 px-5 text-sm text-white transition hover:bg-white hover:text-navy-900"
          >
            <Icon name="instagram" /> {site.instagramHandle}
          </a>
        </div>

        <nav aria-label="Rodapé" className="lg:col-span-3 lg:col-start-7">
          <p className="small-caps mb-4 text-sky-300">Navegar</p>
          <ul className="space-y-1 text-sm">
            {[...nav, { href: "#reservas", label: "Reservas" }].map((n) => (
              <li key={n.href}>
                <a href={n.href} className="inline-block py-1 transition hover:text-white">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-3">
          <p className="small-caps mb-4 text-sky-300">Contato</p>
          <ul className="space-y-2 text-sm">
            <li>
              {site.address}
              <br />
              {site.cityLine}
            </li>
            <li>
              <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-9 items-center gap-2 transition hover:text-white">
                <Icon name="whatsapp" className="h-4 w-4" /> WhatsApp {site.whatsappLabel}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-16 flex max-w-[96rem] flex-col gap-3 border-t border-sky-300/20 pt-6 text-xs text-sky-300/80 sm:flex-row sm:items-center sm:justify-between">
        <p>Demonstração não oficial, sem vínculo com os canais oficiais da Willa Hala. Textos e dados públicos; fotos ilustrativas até o envio do acervo oficial.</p>
        <p className="shrink-0">Protótipo desenvolvido pela HR Tech</p>
      </div>
    </footer>
  );
}
