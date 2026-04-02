import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
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
  if (!isSupabaseConfigured()) {
    redirect("/login");
  }

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
      s.credentials.length > 0 && getOverallStatus(s.credentials) === "valid"
  ).length;
  const expiringSubs = subList.filter(
    (s) => getOverallStatus(s.credentials) === "expiring_soon"
  ).length;
  const expiredSubs = subList.filter(
    (s) => getOverallStatus(s.credentials) === "expired"
  ).length;

  return (
    <div>
      {/* Page header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            {org.name}
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            {totalSubs} subcontractor{totalSubs !== 1 ? "s" : ""} tracked
          </p>
        </div>
        <AddSubForm organizationId={org.id} />
      </div>

      {/* Stats grid */}
      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100">
              <svg className="h-5 w-5 text-slate-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500">Total Subs</p>
              <p className="text-xl font-bold text-slate-900">{totalSubs}</p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-emerald-200/60 bg-gradient-to-br from-emerald-50 to-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100">
              <svg className="h-5 w-5 text-emerald-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-medium text-emerald-600">Compliant</p>
              <p className="text-xl font-bold text-emerald-900">
                {compliantSubs}
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-amber-200/60 bg-gradient-to-br from-amber-50 to-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100">
              <svg className="h-5 w-5 text-amber-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-medium text-amber-600">
                Expiring Soon
              </p>
              <p className="text-xl font-bold text-amber-900">
                {expiringSubs}
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-red-200/60 bg-gradient-to-br from-red-50 to-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-100">
              <svg className="h-5 w-5 text-red-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-medium text-red-600">Expired</p>
              <p className="text-xl font-bold text-red-900">{expiredSubs}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Sub Table */}
      <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/60">
                <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Subcontractor
                </th>
                <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Trade
                </th>
                <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Status
                </th>
                <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Next Expiration
                </th>
                <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Credentials
                </th>
                <th className="px-6 py-3.5 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {subList.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-16 text-center"
                  >
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100">
                      <svg className="h-6 w-6 text-slate-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                      </svg>
                    </div>
                    <p className="mt-3 text-sm font-medium text-slate-900">
                      No subcontractors yet
                    </p>
                    <p className="mt-1 text-sm text-slate-500">
                      Add your first sub to start tracking credentials.
                    </p>
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
                      (
                        a: { expires_at: string | null },
                        b: { expires_at: string | null }
                      ) =>
                        new Date(a.expires_at!).getTime() -
                        new Date(b.expires_at!).getTime()
                    )[0];
                  const days = nextExpiry
                    ? daysUntilExpiry(nextExpiry.expires_at)
                    : null;

                  return (
                    <tr
                      key={sub.id}
                      className="transition-colors hover:bg-slate-50/60"
                    >
                      <td className="px-6 py-4">
                        <div className="text-sm font-semibold text-slate-900">
                          {sub.company_name}
                        </div>
                        <div className="mt-0.5 text-xs text-slate-500">
                          {sub.contact_name} &middot; {sub.email}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
                          {getTradeLabel(sub.trade)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge status={overallStatus} />
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {nextExpiry ? (
                          <span>
                            {formatDate(nextExpiry.expires_at)}
                            {days !== null && days <= 30 && (
                              <span className="ml-1.5 inline-flex rounded-md bg-red-50 px-1.5 py-0.5 text-xs font-semibold text-red-600 ring-1 ring-red-600/10">
                                {days}d left
                              </span>
                            )}
                          </span>
                        ) : (
                          <span className="text-slate-400">--</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        <span className="font-medium">
                          {sub.credentials.length}
                        </span>{" "}
                        on file
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
    </div>
  );
}
