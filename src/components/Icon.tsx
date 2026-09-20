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
