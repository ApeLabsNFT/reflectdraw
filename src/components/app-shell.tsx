"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, MoonStar, ShieldCheck } from "lucide-react";
import clsx from "clsx";
import { BottomNav } from "@/components/bottom-nav";
import { BrandMark } from "@/components/brand-mark";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const immersive = pathname === "/processing";

  return (
    <div className={clsx(immersive ? "immersive-canvas" : "app-canvas")}>
      <div className="mx-auto flex min-h-screen max-w-[420px] flex-col">
        {!immersive ? (
          <header className="sticky top-0 z-10 px-4 pt-4">
            <div className="route-section surface-panel flex items-center justify-between rounded-[1.7rem] px-3 py-2.5 backdrop-blur-xl">
              <button
                type="button"
                className="secondary-cta size-10 shrink-0"
                aria-label="Open menu"
              >
                <Menu className="size-4" />
              </button>

              <BrandMark compact />

              <Link
                href="/settings"
                className="secondary-cta size-10 shrink-0"
                aria-label="Privacy settings"
              >
                <ShieldCheck className="size-4" />
              </Link>
            </div>
          </header>
        ) : null}

        <main
          className={clsx(
            "flex-1",
            immersive ? "" : "px-4 pb-28 pt-4",
          )}
        >
          {children}
        </main>

        {!immersive ? <BottomNav /> : null}

        {!immersive ? (
          <div className="pointer-events-none fixed inset-x-0 bottom-0 mx-auto h-28 w-[min(100%,420px)] bg-gradient-to-t from-[rgba(250,249,246,0.98)] via-[rgba(250,249,246,0.82)] to-transparent" />
        ) : null}

        {!immersive ? (
          <div className="pointer-events-none fixed right-5 top-24 hidden rounded-full bg-[rgba(255,255,255,0.72)] p-3 shadow-[0_28px_60px_-42px_rgba(47,52,48,0.45)] md:block">
            <MoonStar className="size-4 text-[var(--sage)]" />
          </div>
        ) : null}
      </div>
    </div>
  );
}
