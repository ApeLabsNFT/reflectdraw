import Link from "next/link";
import { ArrowRight, CalendarDays, MessageSquareHeart } from "lucide-react";
import { PageIntro } from "@/components/page-intro";
import { seedGuides } from "@/lib/demo-data";

export default function GuidesPage() {
  return (
    <div className="route-section space-y-6 pt-1 pb-6">
      <PageIntro
        eyebrow="Guides"
        title="Human support, softly offered."
        description="When a reflection wants relational support, guides help users stay with grounding, breath pacing, sleep rituals, and integration."
      />

      <section className="space-y-4">
        {seedGuides.map((guide, index) => (
          <div key={guide.id} className="surface-panel overflow-hidden rounded-[2.3rem] p-3">
            <div
              className={`h-52 rounded-[2rem] ${
                index % 2 === 0 ? "artwork-lotus" : "artwork-water"
              }`}
            />
            <div className="space-y-3 px-2 pb-2 pt-4">
              <div className="flex items-start gap-3">
                <div className="secondary-cta size-11 shrink-0">
                  <CalendarDays className="size-5" />
                </div>
                <div>
                  <p className="font-semibold text-[var(--charcoal)]">{guide.name}</p>
                  <p className="mt-1 text-sm text-[rgba(117,123,116,0.9)]">
                    {guide.bio}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {guide.specialties.map((specialty) => (
                  <span
                    key={specialty}
                    className="ghost-chip px-3 py-1.5 text-xs font-medium"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
              <Link
                href={guide.bookingLink}
                className="primary-cta h-12 w-full px-5 text-sm font-semibold"
              >
                Request support
              </Link>
            </div>
          </div>
        ))}
      </section>

      <section
        id="request-guide"
        className="surface-panel-soft rounded-[2.2rem] p-5"
      >
        <div className="flex items-start gap-3">
          <div className="secondary-cta size-11">
            <MessageSquareHeart className="size-5" />
          </div>
          <div>
            <p className="eyebrow">Guide requests</p>
            <h2 className="serif-heading mt-3 text-[2.4rem] leading-[0.97]">
              Ask for grounding, not fixing.
            </h2>
            <p className="mt-3 text-sm leading-7 text-[rgba(117,123,116,0.92)]">
              Requests stay scoped to somatic reflection, breath support, and
              sleep rituals. No diagnosis, no severity scoring, and no hidden
              profiling.
            </p>
          </div>
        </div>
        <Link
          href="/settings"
          className="primary-cta mt-5 h-14 w-full px-6 text-sm font-semibold"
        >
          Review privacy before requesting
          <ArrowRight className="size-5" />
        </Link>
      </section>
    </div>
  );
}
