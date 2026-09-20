"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Icon } from "./Icon";
import { Media } from "./Media";
import { ratings, site } from "@/data/site";

gsap.registerPlugin(ScrollTrigger);

type HeroProps = { heroSrc: string | null; heroSecondSrc: string | null };

export function Hero({ heroSrc, heroSecondSrc }: HeroProps) {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const q = <T extends Element>(s: string) => Array.from(el.querySelectorAll<T>(s));
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // Abertura: cortina branca sobe, foto se abre, título entra letra a letra
      const curtain = document.querySelector<HTMLElement>("[data-curtain]");
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      if (curtain) {
        tl.fromTo("[data-curtain-mark]", { opacity: 0, scale: 0.85, rotate: -20 }, { opacity: 1, scale: 1, rotate: 0, duration: 0.9 })
          .fromTo("[data-curtain-name]", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.8 }, "<0.2")
          .to(curtain, { clipPath: "inset(0 0 100% 0)", duration: 1.05, ease: "expo.inOut" }, "+=0.2")
          .set(curtain, { display: "none" });
      }
      const at = curtain ? "<0.15" : 0;
      tl.fromTo("[data-hero-img]", { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: 1.6, ease: "expo.inOut" }, at)
        .fromTo("[data-hero-img-inner]", { scale: 1.3 }, { scale: 1, duration: 2.2 }, "<")
        .fromTo(q("[data-hero-char]"), { yPercent: 110 }, { yPercent: 0, duration: 1.3, stagger: 0.04 }, "<0.25")
        .fromTo(q("[data-hero-fade]"), { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 1.1, stagger: 0.12 }, "<0.45");

      // Parallax suave da foto ao rolar
      q<HTMLElement>("[data-hero-parallax]").forEach((node) => {
        gsap.to(node, {
          yPercent: Number(node.dataset.heroParallax),
          ease: "none",
          scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: 0.6 },
        });
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={root} id="inicio" aria-label="Willa Hala" className="relative bg-white pt-24 lg:pt-0">
      <div className="mx-auto grid max-w-[96rem] lg:min-h-[100svh] lg:grid-cols-12">
        {/* Texto */}
        <div className="flex flex-col justify-center px-5 pb-12 pt-6 sm:px-10 lg:col-span-6 lg:pb-24 lg:pr-12 lg:pt-32">
          <p data-hero-fade className="label mb-8">
            Vinhedo · São Paulo
          </p>
          <h1 className="display text-[clamp(4.6rem,15vw,10.5rem)] leading-[0.9]" aria-label="Willa Hala">
            {[
              { word: "Willa", italic: false },
              { word: "Hala", italic: true },
            ].map(({ word, italic }) => (
              <span key={word} aria-hidden="true" className={`block overflow-hidden pb-[0.08em] ${italic ? "italic lg:pl-[0.9em]" : ""}`}>
                {word.split("").map((c, i) => (
                  <span key={i} data-hero-char className="inline-block will-change-transform">
                    {c}
                  </span>
                ))}
              </span>
            ))}
          </h1>
          <p data-hero-fade className="mt-8 max-w-md text-[1.05rem] leading-relaxed text-ink sm:text-lg">
            Natureza e arquitetura em homenagem à Polônia, em uma casa de família que recebe hóspedes com carinho.
          </p>
          <div data-hero-fade className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href="#hospedagem" className="btn btn-line" data-magnetic>
              Conheça a hospedagem
            </a>
            <a href="#reservas" className="btn btn-solid" data-magnetic>
              Reservar sua estadia <Icon name="arrow" className="arrow h-4 w-4" />
            </a>
          </div>
          <a
            data-hero-fade
            href={site.booking}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-12 flex max-w-md items-baseline gap-4 border-t border-line pt-5 text-sm text-mute transition-colors hover:text-navy-900"
          >
            <span className="display text-4xl">{ratings.overall}</span>
            <span>
              {ratings.label} · {ratings.count} avaliações no Booking.com
            </span>
          </a>
        </div>

        {/* Fotografias: a principal sangra até a borda direita da tela */}
        <div className="relative px-5 pb-10 sm:px-10 lg:col-span-6 lg:p-0">
          <div className="relative aspect-[4/5] w-full lg:absolute lg:inset-y-0 lg:right-0 lg:aspect-auto lg:h-full lg:w-[calc(100%+max(0px,(100vw-96rem)/2))]">
            <figure data-hero-img className="absolute inset-0 overflow-hidden bg-sky-100 lg:bottom-0 lg:top-24">
              <div data-hero-parallax="8" className="absolute inset-[-8%]">
                <div data-hero-img-inner className="absolute inset-0">
                  <Media src={heroSrc} scene="house" alt="Fachada da Willa Hala" priority />
                </div>
              </div>
            </figure>
            <figure
              data-hero-fade
              className="absolute -bottom-6 left-3 hidden h-[34%] w-[30%] overflow-hidden border-[10px] border-white bg-sky-100 shadow-[0_24px_50px_-24px_rgba(13,33,71,0.45)] lg:block"
            >
              <Media src={heroSecondSrc} scene="detail" alt="Detalhe da decoração" showLabel={false} />
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
