import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { StatusBadge } from "@/components/status-badge";
import {
  getOverallStatus,
  getTradeLabel,
  getCredentialTypeLabel,
  formatDate,
} from "@/lib/utils";
import type { CredentialStatus } from "@/lib/types/database";

export default async function ComplianceReportPage() {
  if (!isSupabaseConfigured()) {
    redirect("/login");
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: org } = await supabase
    .from("organizations")
    .select("*")
    .eq("owner_id", user.id)
    .single();

  if (!org) redirect("/signup?step=org");

  const { data: subs } = await supabase
    .from("subcontractors")
    .select(
      `
      *,
      credentials (*)
    `
    )
    .eq("organization_id", org.id)
    .order("company_name");

  const subList = subs || [];
  const now = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const totalSubs = subList.length;
  const compliantCount = subList.filter(
    (s) =>
      s.credentials.length > 0 &&
      getOverallStatus(s.credentials) === "valid"
  ).length;

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Compliance Report
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Generated {now} for {org.name}
          </p>
        </div>
        <button
          onClick={undefined}
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 print:hidden"
        >
          Print Report
        </button>
      </div>

      {/* Summary */}
      <div className="mt-6 rounded-lg border border-gray-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-gray-900">Summary</h2>
        <div className="mt-4 grid grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-gray-500">Total Subcontractors</p>
            <p className="text-2xl font-bold text-gray-900">{totalSubs}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Fully Compliant</p>
            <p className="text-2xl font-bold text-green-600">
              {compliantCount}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Compliance Rate</p>
            <p className="text-2xl font-bold text-gray-900">
              {totalSubs > 0
                ? Math.round((compliantCount / totalSubs) * 100)
                : 0}
              %
            </p>
          </div>
        </div>
      </div>

      {/* Per-sub breakdown */}
      <div className="mt-8 space-y-6">
        {subList.map((sub) => {
          const overallStatus = getOverallStatus(
            sub.credentials as { status: CredentialStatus }[]
          );
          return (
            <div
              key={sub.id}
              className="rounded-lg border border-gray-200 bg-white p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-semibold text-gray-900">
                    {sub.company_name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {sub.contact_name} &middot; {getTradeLabel(sub.trade)}
                    {sub.jurisdiction && ` &middot; ${sub.jurisdiction}`}
                  </p>
                </div>
                <StatusBadge status={overallStatus} />
              </div>

              {sub.credentials.length === 0 ? (
                <p className="mt-4 text-sm text-gray-400">
                  No credentials on file
                </p>
              ) : (
                <table className="mt-4 w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="pb-2 text-left font-medium text-gray-500">
                        Credential
                      </th>
                      <th className="pb-2 text-left font-medium text-gray-500">
                        Number
                      </th>
                      <th className="pb-2 text-left font-medium text-gray-500">
                        Expires
                      </th>
                      <th className="pb-2 text-left font-medium text-gray-500">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {sub.credentials.map(
                      (cred: {
                        id: string;
                        type: string;
                        label: string;
                        credential_number: string | null;
                        expires_at: string | null;
                        status: CredentialStatus;
                      }) => (
                        <tr key={cred.id}>
                          <td className="py-2 text-gray-900">
                            {cred.label}
                            <span className="ml-1 text-xs text-gray-400">
                              ({getCredentialTypeLabel(cred.type)})
                            </span>
                          </td>
                          <td className="py-2 text-gray-600">
                            {cred.credential_number || "-"}
                          </td>
                          <td className="py-2 text-gray-600">
                            {formatDate(cred.expires_at)}
                          </td>
                          <td className="py-2">
                            <StatusBadge status={cred.status} />
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="mt-8 border-t border-gray-200 pt-4 text-center text-xs text-gray-400 print:block">
        CertSync Compliance Report &middot; {org.name} &middot; Generated{" "}
        {now}
      </div>
    </div>
  );
}
