import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function PortalPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const params = await searchParams;
  const token = params.token;

  if (!token) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
        <div className="w-full max-w-md rounded-xl bg-white p-8 text-center shadow-sm">
          <h1 className="text-xl font-bold text-gray-900">Invalid Link</h1>
          <p className="mt-2 text-sm text-gray-600">
            This upload link is invalid or has expired. Please contact your
            general contractor for a new link.
          </p>
        </div>
      </div>
    );
  }

  const supabase = await createClient();

  // Look up the sub by magic link token
  const { data: sub } = await supabase
    .from("subcontractors")
    .select(
      `
      *,
      credentials (*),
      organizations!inner (name)
    `
    )
    .eq("magic_link_token", token)
    .gte("token_expires_at", new Date().toISOString())
    .single();

  if (!sub) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
        <div className="w-full max-w-md rounded-xl bg-white p-8 text-center shadow-sm">
          <h1 className="text-xl font-bold text-gray-900">Link Expired</h1>
          <p className="mt-2 text-sm text-gray-600">
            This upload link has expired. Please contact your general contractor
            for a new link.
          </p>
        </div>
      </div>
    );
  }

  const org = sub.organizations as unknown as { name: string };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="mx-auto max-w-lg">
        {/* Header */}
        <div className="mb-6 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600">
            <svg
              className="h-7 w-7 text-white"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
              />
            </svg>
          </div>
          <h1 className="mt-3 text-xl font-bold text-gray-900">
            Upload Your Credentials
          </h1>
          <p className="mt-1 text-sm text-gray-600">
            <span className="font-medium">{org.name}</span> has requested your
            current licenses and insurance documents.
          </p>
        </div>

        {/* Sub info */}
        <div className="rounded-xl bg-white p-4 shadow-sm">
          <p className="text-sm font-medium text-gray-900">
            {sub.company_name}
          </p>
          <p className="text-sm text-gray-500">{sub.contact_name}</p>
        </div>

        {/* Existing credentials */}
        {sub.credentials && sub.credentials.length > 0 && (
          <div className="mt-4 rounded-xl bg-white p-4 shadow-sm">
            <h2 className="text-sm font-medium text-gray-900">
              Documents on file
            </h2>
            <ul className="mt-2 space-y-2">
              {sub.credentials.map(
                (cred: {
                  id: string;
                  label: string;
                  status: string;
                  expires_at: string | null;
                }) => (
                  <li
                    key={cred.id}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="text-gray-700">{cred.label}</span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                        cred.status === "valid"
                          ? "bg-green-100 text-green-800"
                          : cred.status === "expiring_soon"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
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

        {/* Upload link */}
        <div className="mt-4">
          <Link
            href={`/portal/upload?token=${token}`}
            className="block w-full rounded-xl bg-blue-600 py-3 text-center text-sm font-medium text-white shadow-sm hover:bg-blue-700"
          >
            Upload New Document
          </Link>
        </div>

        <p className="mt-6 text-center text-xs text-gray-400">
          Powered by CertSync
        </p>
      </div>
    </div>
  );
}
