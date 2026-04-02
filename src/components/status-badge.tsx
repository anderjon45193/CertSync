import { getStatusColor, getStatusLabel } from "@/lib/utils";
import type { CredentialStatus } from "@/lib/types/database";

export function StatusBadge({ status }: { status: CredentialStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(status)}`}
    >
      {getStatusLabel(status)}
    </span>
  );
}
