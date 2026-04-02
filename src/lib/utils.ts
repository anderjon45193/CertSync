import type { CredentialStatus } from "@/lib/types/database";

export function getStatusColor(status: CredentialStatus): string {
  switch (status) {
    case "valid":
      return "bg-green-100 text-green-800";
    case "expiring_soon":
      return "bg-yellow-100 text-yellow-800";
    case "expired":
      return "bg-red-100 text-red-800";
    case "missing":
      return "bg-gray-100 text-gray-800";
  }
}

export function getStatusDot(status: CredentialStatus): string {
  switch (status) {
    case "valid":
      return "bg-green-500";
    case "expiring_soon":
      return "bg-yellow-500";
    case "expired":
      return "bg-red-500";
    case "missing":
      return "bg-gray-400";
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
