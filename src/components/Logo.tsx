export function LogoMark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden>
      <path d="M20 2c10 0 18 6 18 15 0 11-8 21-18 21S2 28 2 17C2 8 10 2 20 2Z" fill="#5951ff" />
      <path d="M12 16c2-4 6-6 10-5 4 1 6 4 6 8 0 5-4 9-9 9-3 0-6-2-7-5" fill="none" stroke="#fff" strokeWidth="3.4" strokeLinecap="round" />
    </svg>
  );
}
export function Logo({ dark = true }: { dark?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2">
      <LogoMark />
      <span className={`text-[1.7rem] font-semibold tracking-tight ${dark ? "text-white" : "text-ink"}`}>CadenceCraft</span>
    </span>
  );
}
