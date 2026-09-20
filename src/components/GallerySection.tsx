import { Gallery, type GalleryItem } from "./Gallery";
import { gallery } from "@/data/site";
import { photoSrc } from "@/lib/photos";

export function GallerySection() {
  const items: GalleryItem[] = gallery.map((g) => ({ ...g, src: photoSrc(g.slot) }));

  return (
    <section id="galeria" className="bg-white px-5 pb-28 pt-8 sm:px-10 lg:pb-40 lg:pt-16">
      <div className="mx-auto max-w-[96rem]">
        <div className="mb-12 grid gap-8 border-t border-line pt-16 lg:mb-16 lg:grid-cols-12 lg:gap-x-10 lg:pt-24">
          <div className="lg:col-span-7">
            <p data-reveal className="label">
              03 · Galeria
            </p>
            <h2 data-split className="display mt-8 text-[clamp(3rem,6.6vw,6rem)] leading-[0.98]">
              Por dentro da Willa Hala.
            </h2>
          </div>
          <p data-reveal className="text-ink lg:col-span-3 lg:col-start-10 lg:self-end">
            Toque em qualquer imagem para ampliar. No teclado, use as setas; no celular, deslize.
          </p>
        </div>
        <Gallery items={items} />
      </div>
    </section>
  );
}
