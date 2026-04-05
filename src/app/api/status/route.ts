import { NextResponse } from "next/server";
import { getFeatureStatuses, getIntegrationStatuses } from "@/lib/product-status";

export async function GET() {
  return NextResponse.json({
    features: getFeatureStatuses(),
    integrations: getIntegrationStatuses(),
  });
}
