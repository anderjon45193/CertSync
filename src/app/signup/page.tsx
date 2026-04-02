"use client";

import Link from "next/link";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [step, setStep] = useState<"account" | "org">("account");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [orgName, setOrgName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleAccountSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const { error } = await supabase.auth.signUp({ email, password });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      setStep("org");
      setLoading(false);
    }
  }

  async function handleOrgSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setError("Please sign in first.");
      setLoading(false);
      return;
    }

    const { error } = await supabase.from("organizations").insert({
      name: orgName,
      owner_id: user.id,
      plan: "starter",
      max_subs: 15,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push("/dashboard");
    }
  }

  return (
    <div className="flex min-h-screen">
      {/* Left panel - branding */}
      <div className="hidden w-1/2 bg-gradient-to-br from-brand-900 via-brand-800 to-brand-700 lg:flex lg:flex-col lg:justify-between lg:p-12">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/15 backdrop-blur-sm">
            <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2.2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>
          </div>
          <span className="text-lg font-bold text-white">CertSync</span>
        </div>
        <div>
          <h2 className="text-3xl font-bold leading-tight text-white">
            Stop chasing
            <br />
            credentials manually.
          </h2>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-brand-100/70">
            Set up in minutes. Add your subs, and they&apos;ll receive a simple
            link to upload their docs. No app download required.
          </p>
        </div>
        <p className="text-xs text-brand-100/40">
          &copy; {new Date().getFullYear()} CertSync
        </p>
      </div>

      {/* Right panel - form */}
      <div className="flex flex-1 items-center justify-center bg-gradient-to-b from-slate-50 to-white p-4">
        <div className="w-full max-w-sm">
          <div className="text-center lg:text-left">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 lg:hidden"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-600 to-accent-600 shadow-sm">
                <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2.2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
              </div>
              <span className="text-lg font-bold text-slate-900">CertSync</span>
            </Link>
            <h1 className="mt-8 text-2xl font-bold tracking-tight text-slate-900 lg:mt-0">
              {step === "account"
                ? "Create your account"
                : "Set up your organization"}
            </h1>
            {step === "account" ? (
              <p className="mt-2 text-sm text-slate-500">
                14-day free trial. No credit card required.
              </p>
            ) : (
              <p className="mt-2 text-sm text-slate-500">
                Almost there! Tell us about your company.
              </p>
            )}
          </div>

          {/* Step indicator */}
          <div className="mt-6 flex items-center gap-3">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
                step === "account"
                  ? "bg-brand-600 text-white"
                  : "bg-emerald-100 text-emerald-700"
              }`}
            >
              {step === "account" ? "1" : "\u2713"}
            </div>
            <div className="h-0.5 flex-1 rounded bg-slate-200">
              <div
                className={`h-full rounded bg-brand-600 transition-all ${
                  step === "org" ? "w-full" : "w-0"
                }`}
              />
            </div>
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
                step === "org"
                  ? "bg-brand-600 text-white"
                  : "bg-slate-100 text-slate-400"
              }`}
            >
              2
            </div>
          </div>

          {step === "account" ? (
            <form onSubmit={handleAccountSubmit} className="mt-6 space-y-5">
              {error && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm shadow-sm transition-colors focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                  placeholder="you@company.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Password
                </label>
                <input
                  type="password"
                  required
                  minLength={8}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm shadow-sm transition-colors focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                />
                <p className="mt-1.5 text-xs text-slate-400">
                  Must be at least 8 characters
                </p>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-gradient-to-r from-brand-600 to-brand-700 py-3 text-sm font-semibold text-white shadow-sm shadow-brand-600/25 transition-all hover:shadow-md hover:shadow-brand-600/30 disabled:opacity-50"
              >
                {loading ? "Creating account..." : "Create Account"}
              </button>
            </form>
          ) : (
            <form onSubmit={handleOrgSubmit} className="mt-6 space-y-5">
              {error && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Company Name
                </label>
                <input
                  required
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                  placeholder="e.g., Smith General Contracting"
                  className="mt-1.5 w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm shadow-sm transition-colors focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-gradient-to-r from-brand-600 to-brand-700 py-3 text-sm font-semibold text-white shadow-sm shadow-brand-600/25 transition-all hover:shadow-md hover:shadow-brand-600/30 disabled:opacity-50"
              >
                {loading ? "Setting up..." : "Continue to Dashboard"}
              </button>
            </form>
          )}

          <p className="mt-8 text-center text-sm text-slate-500 lg:text-left">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-brand-600 hover:text-brand-700"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
