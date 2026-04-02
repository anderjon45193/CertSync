import type { CredentialStatus } from "@/lib/types/database";

export function getStatusColor(status: CredentialStatus): string {
  switch (status) {
    case "valid":
      return "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/20";
    case "expiring_soon":
      return "bg-amber-50 text-amber-700 ring-1 ring-amber-600/20";
    case "expired":
      return "bg-red-50 text-red-700 ring-1 ring-red-600/20";
    case "missing":
      return "bg-slate-50 text-slate-600 ring-1 ring-slate-500/20";
  }
}

export function getStatusDot(status: CredentialStatus): string {
  switch (status) {
    case "valid":
      return "bg-emerald-500";
    case "expiring_soon":
      return "bg-amber-500";
    case "expired":
      return "bg-red-500";
    case "missing":
      return "bg-slate-400";
  }
}

export function getStatusLabel(status: CredentialStatus): string {
  switch (status) {
    case "valid":
      return "Valid";
    case "expiring_soon":
      return "Expiring Soon";
    case "expired":
      return "Expired";
    case "missing":
      return "Missing";
  }
}

export function formatDate(dateString: string | null): string {
  if (!dateString) return "N/A";
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function daysUntilExpiry(dateString: string | null): number | null {
  if (!dateString) return null;
  const expiry = new Date(dateString);
  const now = new Date();
  const diff = expiry.getTime() - now.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export function getOverallStatus(
  credentials: { status: CredentialStatus }[]
): CredentialStatus {
  if (credentials.length === 0) return "missing";
  if (credentials.some((c) => c.status === "expired")) return "expired";
  if (credentials.some((c) => c.status === "missing")) return "missing";
  if (credentials.some((c) => c.status === "expiring_soon"))
    return "expiring_soon";
  return "valid";
}

export function getTradeLabel(trade: string): string {
  const labels: Record<string, string> = {
    plumbing: "Plumbing",
    electrical: "Electrical",
    hvac: "HVAC",
    roofing: "Roofing",
    general: "General",
    fire_protection: "Fire Protection",
    mechanical: "Mechanical",
    other: "Other",
  };
  return labels[trade] || trade;
}

export function getCredentialTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    license: "Trade License",
    insurance_coi: "Certificate of Insurance",
    bond: "Bond",
    epa_608: "EPA 608 Certification",
    backflow: "Backflow Certification",
    osha: "OSHA Certification",
    other: "Other",
  };
  return labels[type] || type;
}
