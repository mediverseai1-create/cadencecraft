"use client";
import { useState, type ReactNode } from "react";

export function Accordion({ items, dark = false }: { items: { title: string; body: ReactNode }[]; dark?: boolean }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className={`divide-y border-y ${dark ? "divide-white/15 border-white/15" : "divide-line border-line"}`}>
      {items.map((it, i) => (
        <div key={it.title}>
          <button
            aria-expanded={open === i}
            onClick={() => setOpen(open === i ? null : i)}
            className="flex w-full items-center justify-between gap-4 py-5 text-left text-lg font-semibold"
          >
            {it.title}
            <span className={`text-2xl text-brand transition-transform ${open === i ? "rotate-45" : ""}`}>+</span>
          </button>
          {open === i && <div className={`pb-6 leading-relaxed ${dark ? "text-white/80" : "text-muted"}`}>{it.body}</div>}
        </div>
      ))}
    </div>
  );
}
