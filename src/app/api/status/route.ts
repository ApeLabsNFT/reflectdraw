import { NextResponse } from "next/server";
import { isInternalDiagnosticsEnabled } from "@/lib/internal-diagnostics";
import { getFeatureStatuses, getIntegrationStatuses } from "@/lib/product-status";

export async function GET() {
  if (!isInternalDiagnosticsEnabled()) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({
    features: getFeatureStatuses(),
    integrations: getIntegrationStatuses(),
  });
}
