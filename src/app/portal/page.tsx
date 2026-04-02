import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import Link from "next/link";

function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={2.2} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>
  );
}

function ErrorCard({ title, message }: { title: string; message: string }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-slate-50 to-white p-4">
      <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-red-50">
          <svg className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
        </div>
        <h1 className="mt-4 text-lg font-bold text-slate-900">{title}</h1>
        <p className="mt-2 text-sm leading-relaxed text-slate-500">{message}</p>
      </div>
    </div>
  );
}

export default async function PortalPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const params = await searchParams;
  const token = params.token;

  if (!token) {
    return (
      <ErrorCard
        title="Invalid Link"
        message="This upload link is invalid or has expired. Please contact your general contractor for a new link."
      />
    );
  }

  if (!isSupabaseConfigured()) {
    return (
      <ErrorCard
        title="Not Configured"
        message="Supabase is not configured yet. Please set up your environment variables."
      />
    );
  }

  const supabase = await createClient();

  const { data: sub } = await supabase
    .from("subcontractors")
    .select(`*, credentials (*), organizations!inner (name)`)
    .eq("magic_link_token", token)
    .gte("token_expires_at", new Date().toISOString())
    .single();

  if (!sub) {
    return (
      <ErrorCard
        title="Link Expired"
        message="This upload link has expired. Please contact your general contractor for a new link."
      />
    );
  }

  const org = sub.organizations as unknown as { name: string };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white p-4 pb-12">
      <div className="mx-auto max-w-lg pt-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-600 to-accent-600 shadow-lg shadow-brand-600/25">
            <ShieldIcon className="h-8 w-8 text-white" />
          </div>
          <h1 className="mt-5 text-2xl font-bold tracking-tight text-slate-900">
            Upload Your Credentials
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-slate-500">
            <span className="font-semibold text-slate-700">{org.name}</span>{" "}
            has requested your current licenses and insurance documents.
          </p>
        </div>

        {/* Sub info card */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-sm font-bold text-slate-600">
              {sub.company_name.charAt(0)}
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">
                {sub.company_name}
              </p>
              <p className="text-xs text-slate-500">{sub.contact_name}</p>
            </div>
          </div>
        </div>

        {/* Existing credentials */}
        {sub.credentials && sub.credentials.length > 0 && (
          <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Documents on file
            </h2>
            <ul className="mt-3 space-y-2.5">
              {sub.credentials.map(
                (cred: {
                  id: string;
                  label: string;
                  status: string;
                  expires_at: string | null;
                }) => (
                  <li
                    key={cred.id}
                    className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-2.5"
                  >
                    <span className="text-sm font-medium text-slate-700">
                      {cred.label}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
                        cred.status === "valid"
                          ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/20"
                          : cred.status === "expiring_soon"
                            ? "bg-amber-50 text-amber-700 ring-1 ring-amber-600/20"
                            : "bg-red-50 text-red-700 ring-1 ring-red-600/20"
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          cred.status === "valid"
                            ? "bg-emerald-500"
                            : cred.status === "expiring_soon"
                              ? "bg-amber-500"
                              : "bg-red-500"
                        }`}
                      />
                      {cred.status === "valid"
                        ? "Valid"
                        : cred.status === "expiring_soon"
                          ? "Expiring Soon"
                          : "Expired"}
                    </span>
                  </li>
                )
              )}
            </ul>
          </div>
        )}

        {/* Upload button */}
        <div className="mt-6">
          <Link
            href={`/portal/upload?token=${token}`}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-brand-600 to-brand-700 py-4 text-sm font-semibold text-white shadow-lg shadow-brand-600/25 transition-all hover:shadow-xl hover:shadow-brand-600/30"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
            </svg>
            Upload New Document
          </Link>
        </div>

        <p className="mt-8 text-center text-xs text-slate-400">
          Secured by CertSync
        </p>
      </div>
    </div>
  );
}
