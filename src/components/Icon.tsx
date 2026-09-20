type Name = "arrow" | "pin" | "instagram" | "whatsapp" | "close" | "prev" | "next" | "clock" | "menu";

const paths: Record<Name, React.ReactNode> = {
  arrow: <path d="M4 12h16M14 6l6 6-6 6" />,
  pin: (
    <>
      <path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21Z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </>
  ),
  instagram: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" />
    </>
  ),
  whatsapp: (
    <>
      <path d="M4 20l1.3-4.2A8 8 0 1 1 8.3 18.8L4 20Z" />
      <path d="M9 9.5c.4 2.4 2.6 4.6 5 5l1.2-1.3-1.9-.9-.8.6a4 4 0 0 1-1.9-1.9l.6-.8-.9-1.9L9 9.5Z" />
    </>
  ),
  close: <path d="M5 5l14 14M19 5L5 19" />,
  prev: <path d="M15 5l-7 7 7 7" />,
  next: <path d="M9 5l7 7-7 7" />,
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  menu: <path d="M4 8h16M4 16h16" />,
};

export function Icon({ name, className = "h-5 w-5" }: { name: Name; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}

/** Ícones das experiências */
export function ExperienceGlyph({ scene, className = "h-10 w-10" }: { scene: string; className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {scene === "breakfast" && (
        <>
          <path d="M8 22h28v6a10 10 0 0 1-10 10h-8A10 10 0 0 1 8 28v-6Z" />
          <path d="M36 24h3a4 4 0 0 1 0 8h-4" />
          <path d="M16 8c-2 3 2 4 0 7M23 8c-2 3 2 4 0 7M30 8c-2 3 2 4 0 7" />
        </>
      )}
      {scene === "garden" && (
        <>
          <path d="M24 42V20" />
          <path d="M24 30C14 30 10 22 10 14c9 0 14 6 14 16Z" />
          <path d="M24 26c8 0 13-5 14-13-8 0-14 4-14 13Z" />
        </>
      )}
      {scene === "fireplace" && (
        <>
          <path d="M24 6c2 7 9 9 9 18a9 9 0 0 1-18 0c0-4 2-6 4-8 0 3 2 4 3 4 0-6-1-9 2-14Z" />
          <path d="M8 42l32-4M8 38l32 4" />
        </>
      )}
      {scene === "lounge" && (
        <>
          <path d="M8 26v-6a6 6 0 0 1 6-6h20a6 6 0 0 1 6 6v6" />
          <path d="M6 26a3 3 0 0 1 6 0v4h24v-4a3 3 0 0 1 6 0v10H6V26Z" />
          <path d="M10 36v4M38 36v4" />
        </>
      )}
      {scene === "kids" && (
        <>
          <rect x="8" y="26" width="14" height="14" rx="2" />
          <rect x="24" y="26" width="14" height="14" rx="2" />
          <rect x="16" y="12" width="14" height="14" rx="2" />
          <path d="M23 15v8M19 19h8" />
        </>
      )}
      {scene === "cafe" && (
        <>
          <path d="M10 18h22v10a9 9 0 0 1-9 9h-4a9 9 0 0 1-9-9V18Z" />
          <path d="M32 21h3a3.5 3.5 0 0 1 0 7h-3" />
          <path d="M8 42h28" />
          <path d="M16 8v5M22 8v5M28 8v5" />
        </>
      )}
    </svg>
  );
}
