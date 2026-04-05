import { notFound } from "next/navigation";
import { IntegrationAudit } from "@/components/integration-audit";
import { isInternalDiagnosticsEnabled } from "@/lib/internal-diagnostics";

export default function IntegrationsPage() {
  if (!isInternalDiagnosticsEnabled()) {
    notFound();
  }

  return <IntegrationAudit />;
}
