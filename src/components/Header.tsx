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
    const onScroll = () => setSolid(window.scrollY > 40);
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
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches && menuRef.current) {
      gsap.fromTo(menuRef.current.querySelectorAll("a"), { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.06, ease: "expo.out" });
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
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background,box-shadow,padding] duration-500 ${
          solid || open ? "bg-white/95 py-3 shadow-[0_1px_0_var(--color-line)] backdrop-blur-md" : "py-5"
        }`}
      >
        <div className="mx-auto flex max-w-[96rem] items-center justify-between px-5 sm:px-10">
          <a href="#inicio" className="flex items-baseline gap-3 text-navy-900" onClick={() => setOpen(false)}>
            <span className="display whitespace-nowrap text-[1.75rem] italic leading-none">Willa Hala</span>
            <span className="small-caps hidden whitespace-nowrap text-[0.6rem] text-mute xl:inline">Vinhedo · SP</span>
          </a>

          <nav aria-label="Principal" className="hidden items-center gap-7 lg:flex xl:gap-9">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="group relative whitespace-nowrap py-1 text-[0.74rem] font-medium uppercase tracking-[0.16em] text-navy-900 transition-colors hover:text-navy-700"
              >
                {item.label}
                <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-navy-900 transition-transform duration-500 ease-[var(--ease-cine)] group-hover:scale-x-100" />
              </a>
            ))}
            <a href="#reservas" className="btn btn-solid !min-h-10 !px-5">
              Reservar
            </a>
          </nav>

          <button
            ref={toggleRef}
            type="button"
            className="grid h-11 w-11 place-items-center border border-navy-900/25 text-navy-900 lg:hidden"
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
        <div id="menu-mobile" ref={menuRef} className="fixed inset-0 z-40 flex flex-col justify-center bg-white px-6 pt-20 lg:hidden">
          {[...nav, { href: "#reservas", label: "Reservas" }].map((item, i) => (
            <a key={item.href} href={item.href} onClick={() => setOpen(false)} className="flex items-baseline gap-4 border-b border-line py-4">
              <span className="small-caps w-6 text-mute">{String(i + 1).padStart(2, "0")}</span>
              <span className="display text-4xl italic">{item.label}</span>
            </a>
          ))}
        </div>
      )}
    </>
  );
}
