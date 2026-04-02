"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function UploadForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const form = new FormData(e.currentTarget);
    form.append("token", token || "");

    const res = await fetch("/api/credentials", {
      method: "POST",
      body: form,
    });

    if (res.ok) {
      setSuccess(true);
    }
    setLoading(false);
  }

  if (!token) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <p className="text-sm text-slate-600">Invalid link.</p>
      </div>
    );
  }

  if (success) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-slate-50 to-white p-4">
        <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50">
            <svg
              className="h-7 w-7 text-emerald-600"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
          </div>
          <h1 className="mt-5 text-xl font-bold text-slate-900">
            Document Uploaded
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-slate-500">
            Your credential has been submitted successfully. Your general
            contractor will be notified.
          </p>
          <button
            onClick={() => {
              setSuccess(false);
              setFileName(null);
            }}
            className="mt-6 rounded-xl bg-gradient-to-r from-brand-600 to-brand-700 px-6 py-2.5 text-sm font-semibold text-white shadow-sm shadow-brand-600/25 transition-all hover:shadow-md"
          >
            Upload Another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white p-4 pb-12">
      <div className="mx-auto max-w-md pt-8">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Upload Document
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Take a photo or select a file of your license, COI, or
            certification.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Document Type
            </label>
            <select
              name="type"
              required
              className="mt-1.5 w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm shadow-sm transition-colors focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
            >
              <option value="license">Trade License</option>
              <option value="insurance_coi">
                Certificate of Insurance (COI)
              </option>
              <option value="bond">Bond</option>
              <option value="epa_608">EPA 608 Certification</option>
              <option value="backflow">Backflow Certification</option>
              <option value="osha">OSHA Certification</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">
              Label / Description
            </label>
            <input
              name="label"
              required
              placeholder="e.g., NC Plumbing License"
              className="mt-1.5 w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm shadow-sm transition-colors focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">
              Credential Number
            </label>
            <input
              name="credential_number"
              placeholder="e.g., PL-12345"
              className="mt-1.5 w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm shadow-sm transition-colors focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">
              Expiration Date
            </label>
            <input
              name="expires_at"
              type="date"
              required
              className="mt-1.5 w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm shadow-sm transition-colors focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">
              Document Photo / PDF
            </label>
            <div className="mt-1.5">
              <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50/50 p-8 transition-colors hover:border-brand-400 hover:bg-brand-50/30">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-sm">
                  <svg
                    className="h-6 w-6 text-slate-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z"
                    />
                  </svg>
                </div>
                <span className="mt-3 text-sm font-medium text-slate-600">
                  {fileName || "Tap to take photo or select file"}
                </span>
                {!fileName && (
                  <span className="mt-1 text-xs text-slate-400">
                    Supports JPG, PNG, and PDF
                  </span>
                )}
                <input
                  name="document"
                  type="file"
                  accept="image/*,.pdf"
                  capture="environment"
                  className="hidden"
                  onChange={(e) =>
                    setFileName(e.target.files?.[0]?.name || null)
                  }
                />
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-gradient-to-r from-brand-600 to-brand-700 py-3.5 text-sm font-semibold text-white shadow-sm shadow-brand-600/25 transition-all hover:shadow-md hover:shadow-brand-600/30 disabled:opacity-50"
          >
            {loading ? "Uploading..." : "Submit Document"}
          </button>
        </form>

        <p className="mt-8 text-center text-xs text-slate-400">
          Secured by CertSync
        </p>
      </div>
    </div>
  );
}

export default function UploadPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <p className="text-sm text-slate-500">Loading...</p>
        </div>
      }
    >
      <UploadForm />
    </Suspense>
  );
}
