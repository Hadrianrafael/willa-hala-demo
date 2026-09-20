import { Gallery, type GalleryItem } from "./Gallery";
import { gallery } from "@/data/site";
import { photoSrc } from "@/lib/photos";
import { Ornament } from "./Ornament";

export function GallerySection() {
  const items: GalleryItem[] = gallery.map((g) => ({ ...g, src: photoSrc(g.slot) }));

  return (
    <section id="galeria" className="relative overflow-x-clip bg-navy-900 px-5 pb-28 pt-28 text-cream-50 sm:px-10 lg:pb-40 lg:pt-40">
      <span className="scallop-top" style={{ ["--scallop" as string]: "var(--color-navy-900)" }} aria-hidden="true" />
      <Ornament className="spin-slow pointer-events-none absolute -left-48 top-10 h-[36rem] w-[36rem] text-cream-50/[0.05]" />
      <div className="relative mx-auto max-w-[92rem]">
        <div className="mb-14 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p data-reveal className="eyebrow mb-6 text-gold-400">
              Galeria
            </p>
            <h2 data-split className="display text-[clamp(2.8rem,6.4vw,5.6rem)]">
              Por dentro da Willa Hala.
            </h2>
          </div>
          <p data-reveal className="max-w-sm text-cream-100/80">
            Toque em qualquer imagem para ampliar. Use as setas do teclado ou deslize para navegar.
          </p>
        </div>
        <Gallery items={items} />
      </div>
    </section>
  );
}
