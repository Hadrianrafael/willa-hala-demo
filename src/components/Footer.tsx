import { Icon } from "./Icon";
import { nav, site } from "@/data/site";

export function Footer() {
  return (
    <footer className="relative bg-[#050d1e] px-5 pb-10 pt-20 text-cream-100/80 sm:px-10">
      <div className="mx-auto grid max-w-[92rem] gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="display text-5xl italic text-cream-50">Willa Hala</p>
          <p className="mt-3 max-w-sm text-sm">Hospedagem em Vinhedo, São Paulo. Natureza, aconchego e uma arquitetura em homenagem à Polônia.</p>
          <a
            href={site.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex min-h-11 items-center gap-3 rounded-full border border-cream-50/25 px-5 text-sm text-cream-50 transition hover:border-gold-400 hover:text-gold-400"
          >
            <Icon name="instagram" /> {site.instagramHandle}
          </a>
        </div>

        <nav aria-label="Rodapé" className="lg:col-span-3">
          <p className="eyebrow mb-4 text-gold-400">Navegar</p>
          <ul className="space-y-2 text-sm">
            {[...nav, { href: "#reservas", label: "Reservas" }].map((n) => (
              <li key={n.href}>
                <a href={n.href} className="inline-block py-1 transition hover:text-gold-400">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-4">
          <p className="eyebrow mb-4 text-gold-400">Contato</p>
          <ul className="space-y-2 text-sm">
            <li>
              {site.address}
              <br />
              {site.cityLine}
            </li>
            <li>
              <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-9 items-center gap-2 transition hover:text-gold-400">
                <Icon name="whatsapp" className="h-4 w-4" /> WhatsApp {site.whatsappLabel}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-16 flex max-w-[92rem] flex-col gap-3 border-t border-cream-50/10 pt-6 text-xs text-cream-100/55 sm:flex-row sm:items-center sm:justify-between">
        <p>
          Demonstração não oficial, sem vínculo com os canais oficiais da Willa Hala. Textos e dados públicos; fotos ilustrativas até o envio do acervo oficial.
        </p>
        <p className="shrink-0">Protótipo desenvolvido pela HR Tech</p>
      </div>
    </footer>
  );
}
