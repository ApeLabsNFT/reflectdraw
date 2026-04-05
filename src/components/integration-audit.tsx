import Link from "next/link";
import { ArrowRight, Bot, CheckCircle2, CircleDashed, CloudCog, Cpu, ShieldCheck } from "lucide-react";
import { PageIntro } from "@/components/page-intro";
import { getFeatureStatuses, getIntegrationStatuses } from "@/lib/product-status";
import { cn } from "@/lib/utils";

const statusTone = {
  working: "text-[var(--sage)] bg-[rgba(217,230,211,0.8)]",
  partial: "text-[#7d6b3c] bg-[rgba(241,232,201,0.82)]",
  connected: "text-[var(--sage)] bg-[rgba(217,230,211,0.8)]",
  missing: "text-[rgba(117,123,116,0.9)] bg-[rgba(244,244,240,0.96)]",
  demo: "text-[#6a7287] bg-[rgba(224,228,237,0.88)]",
} as const;

function StatusPill({
  label,
  tone,
}: {
  label: string;
  tone: keyof typeof statusTone;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-[0.66rem] font-semibold tracking-[0.14em] uppercase",
        statusTone[tone],
      )}
    >
      {tone === "working" || tone === "connected" ? (
        <CheckCircle2 className="size-3.5" />
      ) : (
        <CircleDashed className="size-3.5" />
      )}
      {label}
    </span>
  );
}

export function IntegrationAudit() {
  const features = getFeatureStatuses();
  const integrations = getIntegrationStatuses();
  const connectedCount = integrations.filter(
    (integration) =>
      integration.status === "connected" || integration.status === "demo",
  ).length;

  return (
    <div className="route-section space-y-6 pt-1 pb-6">
      <PageIntro
        eyebrow="Feature and integration audit"
        title="What works right now."
        description="A live product audit of which ReflectDraw features are working locally, which integrations are connected, and which providers are ready but still waiting for credentials."
      />

      <section className="grid grid-cols-2 gap-3">
        <div className="surface-panel-soft rounded-[2rem] p-4">
          <p className="eyebrow">Working features</p>
          <p className="mt-3 font-serif text-[2rem] leading-none text-[var(--charcoal)]">
            {features.filter((feature) => feature.status === "working").length}
          </p>
          <p className="mt-2 text-sm text-[rgba(117,123,116,0.88)]">
            User-facing surfaces are implemented and navigable.
          </p>
        </div>
        <div className="surface-panel-soft rounded-[2rem] p-4">
          <p className="eyebrow">Ready integrations</p>
          <p className="mt-3 font-serif text-[2rem] leading-none text-[var(--charcoal)]">
            {connectedCount}/{integrations.length}
          </p>
          <p className="mt-2 text-sm text-[rgba(117,123,116,0.88)]">
            Includes active demo-mode services and credential-backed integrations.
          </p>
        </div>
      </section>

      <section className="surface-panel rounded-[2.2rem] p-5">
        <div className="flex items-start gap-3">
          <div className="secondary-cta size-11 shrink-0">
            <CloudCog className="size-5" />
          </div>
          <div>
            <p className="eyebrow">Current execution mode</p>
            <p className="mt-3 font-serif text-[2.3rem] leading-[0.96] text-[var(--charcoal)]">
              UI complete, backend ready, live credentials still needed.
            </p>
            <p className="mt-3 text-sm leading-7 text-[rgba(117,123,116,0.92)]">
              The app shell, routing, local reflection flow, and status surfaces
              are working. Real Supabase auth, storage uploads, Stripe webhooks,
              Resend, and provider-backed LLM calls require environment keys to
              move from demo mode into production mode.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-[var(--charcoal)]">
            Product features
          </h2>
          <span className="eyebrow">Audit</span>
        </div>
        {features.map((feature) => (
          <Link
            key={feature.id}
            href={feature.route}
            className="surface-panel-soft flex items-start justify-between gap-4 rounded-[1.9rem] p-4"
          >
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <p className="font-semibold text-[var(--charcoal)]">{feature.name}</p>
                <StatusPill
                  label={feature.status === "working" ? "Working" : "Partial"}
                  tone={feature.status}
                />
              </div>
              <p className="text-sm text-[rgba(117,123,116,0.9)]">
                {feature.summary}
              </p>
            </div>
            <ArrowRight className="mt-1 size-4 shrink-0 text-[var(--sage)]" />
          </Link>
        ))}
      </section>

      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-[var(--charcoal)]">
            Integrations
          </h2>
          <span className="eyebrow">Runtime status</span>
        </div>
        {integrations.map((integration) => (
          <div key={integration.id} className="surface-panel rounded-[1.95rem] p-4">
            <div className="flex flex-wrap items-center gap-2">
              <p className="font-semibold text-[var(--charcoal)]">{integration.name}</p>
              <StatusPill
                label={
                  integration.status === "connected"
                    ? "Connected"
                    : integration.status === "partial"
                      ? "Partial"
                      : integration.status === "demo"
                        ? "Demo"
                        : "Missing"
                }
                tone={integration.status}
              />
            </div>
            <p className="mt-2 text-sm text-[rgba(117,123,116,0.9)]">
              {integration.summary}
            </p>
            {integration.presentKeys.length ? (
              <p className="mt-3 text-xs font-medium tracking-[0.1em] text-[rgba(117,123,116,0.72)] uppercase">
                Configured: {integration.presentKeys.join(", ")}
              </p>
            ) : null}
            {integration.missingKeys.length ? (
              <p className="mt-2 text-xs font-medium tracking-[0.1em] text-[#8a6e45] uppercase">
                Still needed: {integration.missingKeys.join(", ")}
              </p>
            ) : null}
          </div>
        ))}
      </section>

      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-[var(--charcoal)]">
            AI companies
          </h2>
          <span className="eyebrow">Provider orchestration</span>
        </div>

        <div className="grid gap-3">
          {[
            {
              name: "OpenAI",
              role: "Primary reflection writer",
              note: "Best positioned for the main typed JSON reflection contract.",
              icon: Bot,
            },
            {
              name: "Anthropic",
              role: "Safety and tone pass",
              note: "Strong fit for a second-pass rewrite that removes diagnostic or shaming language.",
              icon: ShieldCheck,
            },
            {
              name: "Google AI / Gemma 3",
              role: "Scoped reflection engine",
              note: "Configured as the Gemma-ready provider for multimodal understanding, structured JSON output, and in-scope reflective feedback.",
              icon: Cpu,
            },
            {
              name: "xAI",
              role: "Experimental alternate",
              note: "Optional extra provider for comparison and resilience testing.",
              icon: CloudCog,
            },
          ].map((company) => (
            <div key={company.name} className="surface-panel-soft rounded-[2rem] p-5">
              <div className="flex items-start gap-3">
                <div className="secondary-cta size-11 shrink-0">
                  <company.icon className="size-5" />
                </div>
                <div>
                  <p className="font-semibold text-[var(--charcoal)]">
                    {company.name}
                  </p>
                  <p className="mt-1 text-sm font-medium text-[var(--sage)]">
                    {company.role}
                  </p>
                  <p className="mt-2 text-sm leading-7 text-[rgba(117,123,116,0.92)]">
                    {company.note}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
