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
    .select(`*, credentials (*)`)
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
      s.credentials.length > 0 && getOverallStatus(s.credentials) === "valid"
  ).length;
  const complianceRate =
    totalSubs > 0 ? Math.round((compliantCount / totalSubs) * 100) : 0;

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Compliance Report
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Generated {now} for {org.name}
          </p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition-colors hover:bg-slate-50 print:hidden">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18.75 7.131s0 0 0 0" />
          </svg>
          Print Report
        </button>
      </div>

      {/* Summary */}
      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          Summary
        </h2>
        <div className="mt-5 grid grid-cols-3 gap-6">
          <div>
            <p className="text-sm text-slate-500">Total Subcontractors</p>
            <p className="mt-1 text-3xl font-extrabold text-slate-900">
              {totalSubs}
            </p>
          </div>
          <div>
            <p className="text-sm text-slate-500">Fully Compliant</p>
            <p className="mt-1 text-3xl font-extrabold text-emerald-600">
              {compliantCount}
            </p>
          </div>
          <div>
            <p className="text-sm text-slate-500">Compliance Rate</p>
            <div className="mt-1 flex items-baseline gap-1">
              <span className="text-3xl font-extrabold text-slate-900">
                {complianceRate}
              </span>
              <span className="text-lg font-bold text-slate-400">%</span>
            </div>
            <div className="mt-2 h-2 w-full rounded-full bg-slate-100">
              <div
                className={`h-2 rounded-full transition-all ${
                  complianceRate >= 80
                    ? "bg-emerald-500"
                    : complianceRate >= 50
                      ? "bg-amber-500"
                      : "bg-red-500"
                }`}
                style={{ width: `${complianceRate}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Per-sub breakdown */}
      <div className="mt-8 space-y-4">
        {subList.map((sub) => {
          const overallStatus = getOverallStatus(
            sub.credentials as { status: CredentialStatus }[]
          );
          return (
            <div
              key={sub.id}
              className="rounded-2xl border border-slate-200 bg-white shadow-sm"
            >
              <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-sm font-bold text-slate-600">
                    {sub.company_name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">
                      {sub.company_name}
                    </h3>
                    <p className="text-xs text-slate-500">
                      {sub.contact_name} &middot; {getTradeLabel(sub.trade)}
                      {sub.jurisdiction && ` &middot; ${sub.jurisdiction}`}
                    </p>
                  </div>
                </div>
                <StatusBadge status={overallStatus} />
              </div>

              <div className="px-6 py-4">
                {sub.credentials.length === 0 ? (
                  <p className="text-sm italic text-slate-400">
                    No credentials on file
                  </p>
                ) : (
                  <table className="w-full text-sm">
                    <thead>
                      <tr>
                        <th className="pb-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                          Credential
                        </th>
                        <th className="pb-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                          Number
                        </th>
                        <th className="pb-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                          Expires
                        </th>
                        <th className="pb-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-400">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
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
                            <td className="py-3 font-medium text-slate-900">
                              {cred.label}
                              <span className="ml-1.5 text-xs font-normal text-slate-400">
                                ({getCredentialTypeLabel(cred.type)})
                              </span>
                            </td>
                            <td className="py-3 text-slate-600">
                              {cred.credential_number || (
                                <span className="text-slate-300">--</span>
                              )}
                            </td>
                            <td className="py-3 text-slate-600">
                              {formatDate(cred.expires_at)}
                            </td>
                            <td className="py-3 text-right">
                              <StatusBadge status={cred.status} />
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="mt-10 border-t border-slate-200 pt-6 text-center text-xs text-slate-400">
        CertSync Compliance Report &middot; {org.name} &middot; Generated{" "}
        {now}
      </div>
    </div>
  );
}
