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
    <section className="route-section space-y-4 pt-1">
      <p className="eyebrow">{eyebrow}</p>
      <div className="space-y-3">
        <h1 className="serif-heading text-balance text-[clamp(2.6rem,10vw,4rem)] leading-[0.94] text-[var(--charcoal)]">
          {title}
        </h1>
        <p className="muted-copy max-w-md text-[0.98rem]">{description}</p>
      </div>
      {actions ? <div className="flex flex-wrap gap-3 pt-1">{actions}</div> : null}
    </section>
  );
}
