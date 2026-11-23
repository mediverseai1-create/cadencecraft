/** CadenceCraft mark: a "C" built from three swooshes, in the site's navy and brand purple. */
export function LogoMark({ className = "h-8 w-8", onLight = false }: { className?: string; onLight?: boolean }) {
  const shell = onLight ? "#140a45" : "#ffffff";
  const accent = onLight ? "#5951ff" : "#8f89ff";
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden>
      <path d="M6 46C6 22 26 6 54 6h40c-3 15-17 24-36 27L22 51C12 54 6 52 6 46Z" fill={shell} />
      <path d="M10 60c8-14 26-24 56-27-9 8-19 20-30 45C20 74 10 68 10 60Z" fill={accent} />
      <path d="M38 83c5-9 22-13 42-13h14c3 0 4 3 1 10-4 9-17 14-31 14H50c-12 0-16-4-12-11Z" fill={shell} />
    </svg>
  );
}

export function Logo({ dark = true }: { dark?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2">
      <LogoMark onLight={!dark} />
      <span className={`text-[1.7rem] font-semibold tracking-tight ${dark ? "text-white" : "text-ink"}`}>CadenceCraft</span>
    </span>
  );
}
