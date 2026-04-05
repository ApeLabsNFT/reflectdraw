"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Flower2, GalleryVerticalEnd, HeartHandshake, Wind } from "lucide-react";
import clsx from "clsx";

const items = [
  { href: "/archive", label: "Archive", icon: GalleryVerticalEnd },
  { href: "/capture", label: "Ritual", icon: Flower2 },
  { href: "/sanctuary", label: "Breathe", icon: Wind },
  { href: "/guides", label: "Guides", icon: HeartHandshake },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-4 z-20 mx-auto w-[min(calc(100%-1rem),560px)] px-1 lg:hidden">
      <div className="surface-panel floating-pill flex items-center justify-between gap-1 px-2 py-2">
        {items.map((item) => {
          const active =
            pathname === item.href ||
            (item.href !== "/archive" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "flex min-w-0 flex-1 flex-col items-center gap-1 rounded-[1.2rem] px-2 py-2.5 text-[0.62rem] font-semibold tracking-[0.14em] uppercase",
                active
                  ? "bg-[linear-gradient(180deg,rgba(255,252,247,0.96),rgba(240,234,226,0.88))] text-[var(--sage)] shadow-[0_18px_32px_-28px_rgba(23,29,27,0.22)]"
                  : "text-[rgba(105,113,107,0.86)]",
              )}
            >
              <item.icon className="size-4.5" strokeWidth={2.1} />
              <span className="truncate">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
