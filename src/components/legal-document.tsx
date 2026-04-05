import Link from "next/link";
import { BrandMark } from "@/components/brand-mark";

export function LegalDocument({
  eyebrow,
  title,
  updatedOn,
  sections,
}: {
  eyebrow: string;
  title: string;
  updatedOn: string;
  sections: Array<{ title: string; body: string }>;
}) {
  return (
    <main className="app-canvas min-h-screen px-6 py-8">
      <div className="mx-auto max-w-[760px] space-y-8">
        <div className="route-section flex items-center justify-between gap-4">
          <BrandMark compact />
          <div className="flex flex-wrap items-center gap-4 text-xs font-semibold tracking-[0.16em] text-[rgba(117,123,116,0.86)] uppercase">
            <Link href="/">Home</Link>
            <Link href="/sign-up">Sign up</Link>
            <Link href="/sign-in">Log in</Link>
          </div>
        </div>

        <section className="surface-panel rounded-[2.6rem] p-6 md:p-8">
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="display-heading mt-4 text-[var(--charcoal)]">{title}</h1>
          <p className="mt-4 text-sm leading-7 text-[rgba(117,123,116,0.92)]">
            Last updated {updatedOn}. These terms are written for ReflectDraw’s
            current scope: reflective AI support, breathwork, journaling-through-drawing,
            and privacy-sensitive archive features.
          </p>
        </section>

        <section className="space-y-4 pb-8">
          {sections.map((section) => (
            <article key={section.title} className="surface-panel-soft rounded-[2rem] p-5">
              <h2 className="text-xl font-semibold text-[var(--charcoal)]">
                {section.title}
              </h2>
              <p className="mt-3 text-sm leading-8 text-[rgba(117,123,116,0.95)]">
                {section.body}
              </p>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
