import { BookOpenText, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { ArchiveFeed } from "@/components/archive-feed";

export default function ArchivePage() {
  return (
    <div className="space-y-6">
      <ArchiveFeed />

      <section className="grid gap-3 pb-6">
        <Link
          href="/guides"
          className="surface-panel flex items-center justify-between rounded-[2rem] px-5 py-4"
        >
          <div>
            <p className="eyebrow">Guides</p>
            <p className="mt-2 text-sm text-[rgba(117,123,116,0.9)]">
              Human support for grounding, sleep rituals, and integration.
            </p>
          </div>
          <BookOpenText className="size-5 text-[var(--sage)]" />
        </Link>
        <Link
          href="/shop"
          className="surface-panel flex items-center justify-between rounded-[2rem] px-5 py-4"
        >
          <div>
            <p className="eyebrow">Quiet shop</p>
            <p className="mt-2 text-sm text-[rgba(117,123,116,0.9)]">
              Journals, atmosphere packs, and other gentle companions.
            </p>
          </div>
          <ShoppingBag className="size-5 text-[var(--sage)]" />
        </Link>
      </section>
    </div>
  );
}
