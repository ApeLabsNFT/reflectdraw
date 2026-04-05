import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ArtworkTile } from "@/components/artwork-tile";
import { PageIntro } from "@/components/page-intro";
import { seedArtifacts, seedComparison } from "@/lib/demo-data";

export default function ComparePage() {
  return (
    <div className="route-section space-y-6 pt-1 pb-6">
      <PageIntro
        eyebrow="Compare over time"
        title="Notice what is changing."
        description="A gentle comparison layer that highlights movement, not scores or diagnoses."
      />

      <section className="grid grid-cols-2 gap-3">
        <div className="surface-panel-soft rounded-[2rem] p-3">
          <ArtworkTile
            variant={seedArtifacts[2].imageVariant}
            className="aspect-[0.98]"
          />
          <div className="px-1 pt-3">
            <p className="eyebrow">Earlier</p>
            <p className="mt-2 font-serif text-[1.7rem] leading-[1.02] text-[var(--charcoal)]">
              {seedArtifacts[2].title}
            </p>
          </div>
        </div>
        <div className="surface-panel-soft rounded-[2rem] p-3">
          <ArtworkTile
            variant={seedArtifacts[0].imageVariant}
            className="aspect-[0.98]"
          />
          <div className="px-1 pt-3">
            <p className="eyebrow">Now</p>
            <p className="mt-2 font-serif text-[1.7rem] leading-[1.02] text-[var(--charcoal)]">
              {seedArtifacts[0].title}
            </p>
          </div>
        </div>
      </section>

      <section className="surface-panel rounded-[2.3rem] p-5">
        <p className="eyebrow">Comparison insight</p>
        <h2 className="serif-heading mt-3 text-[2.7rem] leading-[0.95] text-[var(--charcoal)]">
          {seedComparison.headline}
        </h2>
        <p className="mt-4 text-sm leading-7 text-[rgba(117,123,116,0.95)]">
          {seedComparison.comparisonText}
        </p>
        <div className="surface-panel-soft mt-4 rounded-[1.8rem] p-4">
          <p className="font-semibold text-[var(--charcoal)]">Gentle prompt for today</p>
          <p className="mt-2 text-sm text-[rgba(117,123,116,0.9)]">
            {seedComparison.prompt}
          </p>
        </div>
      </section>

      <section className="space-y-3">
        {[
          "Repeated themes now point toward more room in the center of the image.",
          "The newer reflection carries less density and less edge pressure.",
          "Color and rhythm suggest a calmer pacing than earlier work.",
        ].map((item) => (
          <div key={item} className="surface-panel-soft rounded-[1.8rem] p-4">
            <p className="text-sm text-[rgba(47,52,48,0.9)]">{item}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-3">
        <Link
          href="/capture"
          className="primary-cta h-14 w-full px-6 text-sm font-semibold"
        >
          Create a new comparison point
          <ArrowRight className="size-5" />
        </Link>
        <Link
          href="/archive"
          className="secondary-cta h-14 w-full px-6 text-sm font-semibold"
        >
          Return to archive
        </Link>
      </section>
    </div>
  );
}
