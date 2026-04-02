import { getStatusColor, getStatusDot, getStatusLabel } from "@/lib/utils";
import type { CredentialStatus } from "@/lib/types/database";

export function StatusBadge({ status }: { status: CredentialStatus }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusColor(status)}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${getStatusDot(status)}`} />
      {getStatusLabel(status)}
    </span>
  );
}
