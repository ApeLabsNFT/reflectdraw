import Link from "next/link";
import { Sprout } from "lucide-react";
import { cn } from "@/lib/utils";

export function BrandMark({
  compact = false,
  href = "/",
  tone = "default",
}: {
  compact?: boolean;
  href?: string;
  tone?: "default" | "light";
}) {
  const light = tone === "light";

  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2.5"
    >
      <span
        className={cn(
          "flex items-center justify-center rounded-full shadow-[0_18px_36px_-28px_rgba(47,52,48,0.4)]",
          light
            ? "bg-[rgba(255,255,255,0.12)] text-white"
            : "bg-[rgba(217,230,211,0.72)] text-[var(--sage)]",
          compact ? "size-7" : "size-9",
        )}
      >
        <Sprout className={compact ? "size-3.5" : "size-4"} strokeWidth={2.2} />
      </span>
      <span
        className={cn(
          "font-serif leading-none tracking-[-0.04em]",
          light ? "text-white" : "text-[var(--charcoal)]",
          compact ? "text-[1.3rem]" : "text-[1.7rem]",
        )}
      >
        ReflectDraw
      </span>
    </Link>
  );
}
