import type { ReactNode } from "react";

export function PageIntro({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow: string;
  title: string;
  description: string;
  actions?: ReactNode;
}) {
  return (
    <section className="route-section space-y-4 pt-1 lg:space-y-5">
      <p className="eyebrow">{eyebrow}</p>
      <div className="space-y-3">
        <h1 className="serif-heading max-w-[14ch] text-balance text-[clamp(2.8rem,7vw,4.8rem)] leading-[0.92] text-[var(--charcoal)]">
          {title}
        </h1>
        <p className="muted-copy max-w-[42rem] text-[0.98rem]">{description}</p>
      </div>
      {actions ? <div className="flex flex-wrap gap-3 pt-1">{actions}</div> : null}
    </section>
  );
}
