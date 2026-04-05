export function isInternalDiagnosticsEnabled() {
  return (
    process.env.NODE_ENV !== "production" ||
    process.env.ENABLE_INTERNAL_DIAGNOSTICS === "true"
  );
}
