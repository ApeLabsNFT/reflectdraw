"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Flower2, GalleryVerticalEnd, Layers3, Wind } from "lucide-react";
import clsx from "clsx";

const items = [
  { href: "/archive", label: "Archive", icon: GalleryVerticalEnd },
  { href: "/capture", label: "Ritual", icon: Flower2 },
  { href: "/sanctuary", label: "Breathe", icon: Wind },
  { href: "/integrations", label: "Status", icon: Layers3 },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-4 z-20 mx-auto w-[min(100%-1rem,420px)] px-1">
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
                "flex min-w-0 flex-1 flex-col items-center gap-1 rounded-[1.4rem] px-2 py-2.5 text-[0.62rem] font-semibold tracking-[0.14em] uppercase",
                active
                  ? "bg-[linear-gradient(180deg,rgba(217,230,211,0.72),rgba(255,255,255,0.88))] text-[var(--sage)] shadow-[0_16px_32px_-28px_rgba(86,98,83,0.45)]"
                  : "text-[rgba(117,123,116,0.86)]",
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
