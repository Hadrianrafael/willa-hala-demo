"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Icon } from "./Icon";
import { nav } from "@/data/site";

export function Header() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduce && menuRef.current) {
      gsap.fromTo(menuRef.current.querySelectorAll("a"), { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, stagger: 0.07, ease: "expo.out" });
    }
    menuRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    const btn = toggleRef.current;
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      btn?.focus();
    };
  }, [open]);

  return (
    <>
    <header className={`fixed inset-x-0 top-0 z-50 transition-[background,backdrop-filter,padding] duration-500 ${solid || open ? "bg-navy-950/85 py-3 backdrop-blur-md" : "py-5"}`}>
      <div className="mx-auto flex max-w-[92rem] items-center justify-between px-5 sm:px-10">
        <a href="#inicio" className="group flex items-baseline gap-3 text-cream-50" onClick={() => setOpen(false)}>
          <span className="display whitespace-nowrap text-3xl italic leading-none">Willa Hala</span>
          <span className="eyebrow hidden whitespace-nowrap text-[0.6rem] text-gold-400 xl:inline">Vinhedo · SP</span>
        </a>

        <nav aria-label="Principal" className="hidden items-center gap-6 xl:gap-8 lg:flex">
          {nav.map((item) => (
            <a key={item.href} href={item.href} className="group relative whitespace-nowrap text-[0.72rem] uppercase tracking-[0.18em] text-cream-100/85 xl:text-[0.78rem] xl:tracking-[0.2em] transition-colors hover:text-gold-400">
              {item.label}
              <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-gold-400 transition-transform duration-500 ease-[var(--ease-cine)] group-hover:scale-x-100" />
            </a>
          ))}
          <a href="#reservas" className="btn btn-gold !min-h-11 !px-6">
            Reservar
          </a>
        </nav>

        <button
          ref={toggleRef}
          type="button"
          className="grid h-11 w-11 place-items-center rounded-full border border-cream-50/30 text-cream-50 lg:hidden"
          aria-expanded={open}
          aria-controls="menu-mobile"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <Icon name={open ? "close" : "menu"} />
        </button>
      </div>

    </header>

      {open && (
        <div id="menu-mobile" ref={menuRef} className="fixed inset-0 z-40 flex flex-col justify-center gap-2 bg-navy-950 px-8 pt-20 lg:hidden">
          {[...nav, { href: "#reservas", label: "Reservas" }].map((item) => (
            <a key={item.href} href={item.href} onClick={() => setOpen(false)} className="display border-b border-cream-50/10 py-4 text-4xl italic text-cream-50">
              {item.label}
            </a>
          ))}
        </div>
      )}
    </>
  );
}
