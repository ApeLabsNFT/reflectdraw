import Link from "next/link";
import { Sprout } from "lucide-react";
import { cn } from "@/lib/utils";

export function BrandMark({
  compact = false,
}: {
  compact?: boolean;
}) {
  return (
    <Link
      href="/archive"
      className="inline-flex items-center gap-2.5 text-[var(--sage)]"
    >
      <span
        className={cn(
          "flex items-center justify-center rounded-full bg-[rgba(217,230,211,0.72)] shadow-[0_18px_36px_-28px_rgba(47,52,48,0.4)]",
          compact ? "size-7" : "size-9",
        )}
      >
        <Sprout className={compact ? "size-3.5" : "size-4"} strokeWidth={2.2} />
      </span>
      <span
        className={cn(
          "font-serif leading-none tracking-[-0.04em] text-[var(--charcoal)]",
          compact ? "text-[1.3rem]" : "text-[1.7rem]",
        )}
      >
        ReflectDraw
      </span>
    </Link>
  );
}
