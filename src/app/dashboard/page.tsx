import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { StatusBadge } from "@/components/status-badge";
import {
  getOverallStatus,
  getTradeLabel,
  formatDate,
  daysUntilExpiry,
} from "@/lib/utils";
import type { CredentialStatus } from "@/lib/types/database";
import { AddSubForm } from "./add-sub-form";
import { RequestDocsButton } from "./request-docs-button";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  // Get user's organization
  const { data: org } = await supabase
    .from("organizations")
    .select("*")
    .eq("owner_id", user.id)
    .single();

  if (!org) redirect("/signup?step=org");

  // Get all subs with their credentials
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

  // Calculate stats
  const totalSubs = subList.length;
  const compliantSubs = subList.filter(
    (s) =>
      s.credentials.length > 0 &&
      getOverallStatus(s.credentials) === "valid"
  ).length;
  const expiringSubs = subList.filter(
    (s) =>
      getOverallStatus(s.credentials) === "expiring_soon"
  ).length;
  const expiredSubs = subList.filter(
    (s) =>
      getOverallStatus(s.credentials) === "expired"
  ).length;

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{org.name}</h1>
          <p className="mt-1 text-sm text-gray-500">
            {totalSubs} subcontractor{totalSubs !== 1 ? "s" : ""} tracked
          </p>
        </div>
        <AddSubForm organizationId={org.id} />
      </div>

      {/* Stats */}
      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <p className="text-sm text-gray-500">Total Subs</p>
          <p className="mt-1 text-2xl font-bold text-gray-900">{totalSubs}</p>
        </div>
        <div className="rounded-lg border border-green-200 bg-green-50 p-4">
          <p className="text-sm text-green-700">Compliant</p>
          <p className="mt-1 text-2xl font-bold text-green-900">
            {compliantSubs}
          </p>
        </div>
        <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
          <p className="text-sm text-yellow-700">Expiring Soon</p>
          <p className="mt-1 text-2xl font-bold text-yellow-900">
            {expiringSubs}
          </p>
        </div>
        <div className="rounded-lg border border-red-200 bg-red-50 p-4">
          <p className="text-sm text-red-700">Expired</p>
          <p className="mt-1 text-2xl font-bold text-red-900">{expiredSubs}</p>
        </div>
      </div>

      {/* Sub Table */}
      <div className="mt-8 overflow-hidden rounded-lg border border-gray-200 bg-white">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Subcontractor
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Trade
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Next Expiration
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Credentials
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {subList.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-6 py-12 text-center text-sm text-gray-500"
                >
                  No subcontractors added yet. Add your first sub to get
                  started.
                </td>
              </tr>
            ) : (
              subList.map((sub) => {
                const overallStatus = getOverallStatus(
                  sub.credentials as { status: CredentialStatus }[]
                );
                const nextExpiry = sub.credentials
                  .filter((c: { expires_at: string | null }) => c.expires_at)
                  .sort(
                    (a: { expires_at: string | null }, b: { expires_at: string | null }) =>
                      new Date(a.expires_at!).getTime() -
                      new Date(b.expires_at!).getTime()
                  )[0];
                const days = nextExpiry
                  ? daysUntilExpiry(nextExpiry.expires_at)
                  : null;

                return (
                  <tr key={sub.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">
                        {sub.company_name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {sub.contact_name} &middot; {sub.email}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {getTradeLabel(sub.trade)}
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={overallStatus} />
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {nextExpiry ? (
                        <span>
                          {formatDate(nextExpiry.expires_at)}
                          {days !== null && days <= 30 && (
                            <span className="ml-1 text-xs text-red-600">
                              ({days}d)
                            </span>
                          )}
                        </span>
                      ) : (
                        <span className="text-gray-400">No credentials</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {sub.credentials.length} on file
                    </td>
                    <td className="px-6 py-4 text-right">
                      <RequestDocsButton
                        subId={sub.id}
                        subName={sub.contact_name}
                      />
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
