import Link from "next/link";

function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2.2}
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-600"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2.5}
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.5 12.75l6 6 9-13.5"
      />
    </svg>
  );
}

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur-lg">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-600 to-accent-600 shadow-sm">
              <ShieldIcon className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-bold tracking-tight text-slate-900">
              CertSync
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="rounded-lg bg-gradient-to-r from-brand-600 to-brand-700 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-brand-600/25 transition-all hover:shadow-md hover:shadow-brand-600/30"
            >
              Start Free Trial
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute left-1/2 top-0 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-brand-100/60 via-accent-500/10 to-transparent blur-3xl" />
            <div className="absolute bottom-0 right-0 h-[400px] w-[600px] translate-x-1/4 translate-y-1/4 rounded-full bg-gradient-to-tl from-brand-50 to-transparent blur-3xl" />
          </div>

          <div className="mx-auto max-w-7xl px-4 pb-24 pt-20 sm:px-6 sm:pb-32 sm:pt-28 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-4 py-1.5 text-sm font-medium text-brand-700">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
                Built for general contractors
              </div>
              <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                Never put an unlicensed sub{" "}
                <span className="bg-gradient-to-r from-brand-600 to-accent-600 bg-clip-text text-transparent">
                  on a job site
                </span>
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
                CertSync automates credential tracking for general contractors.
                Licenses, insurance, bonds, and certifications — collected,
                verified, and monitored so you never get caught with a lapsed
                credential again.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  href="/signup"
                  className="w-full rounded-xl bg-gradient-to-r from-brand-600 to-brand-700 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-brand-600/25 transition-all hover:shadow-xl hover:shadow-brand-600/30 sm:w-auto"
                >
                  Start Free Trial
                </Link>
                <Link
                  href="#how-it-works"
                  className="w-full rounded-xl border border-slate-300 bg-white px-8 py-3.5 text-base font-semibold text-slate-700 shadow-sm transition-all hover:border-slate-400 hover:shadow-md sm:w-auto"
                >
                  See How It Works
                </Link>
              </div>
              <p className="mt-4 text-sm text-slate-500">
                14-day free trial &middot; No credit card required
              </p>
            </div>
          </div>
        </section>

        {/* Social proof bar */}
        <section className="border-y border-slate-200 bg-slate-50/50 py-8">
          <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-x-12 gap-y-4 px-4 text-center text-sm font-medium text-slate-500">
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5 text-emerald-500" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Saves 10+ hours/month
            </div>
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5 text-emerald-500" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Prevents costly stop-work orders
            </div>
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5 text-emerald-500" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              No app download for subs
            </div>
          </div>
        </section>

        {/* Pain Points */}
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-brand-600">
                The problem
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Sound familiar?
              </h2>
            </div>
            <div className="mt-16 grid gap-8 md:grid-cols-3">
              <div className="group rounded-2xl border border-red-100 bg-gradient-to-b from-red-50/80 to-white p-8 transition-shadow hover:shadow-lg hover:shadow-red-100/50">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-100 text-red-600">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                  </svg>
                </div>
                <h3 className="mt-5 text-lg font-bold text-slate-900">
                  Stop-work orders
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  An inspector flags an expired license. The project stops. Your
                  client is furious. You lose thousands per day in delays.
                </p>
              </div>
              <div className="group rounded-2xl border border-amber-100 bg-gradient-to-b from-amber-50/80 to-white p-8 transition-shadow hover:shadow-lg hover:shadow-amber-100/50">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="mt-5 text-lg font-bold text-slate-900">
                  The Monday morning chase
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  Texting and emailing 20+ subs for updated COIs. Chasing
                  renewals. Wondering whose insurance lapsed this month.
                </p>
              </div>
              <div className="group rounded-2xl border border-orange-100 bg-gradient-to-b from-orange-50/80 to-white p-8 transition-shadow hover:shadow-lg hover:shadow-orange-100/50">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
                  </svg>
                </div>
                <h3 className="mt-5 text-lg font-bold text-slate-900">
                  The filing cabinet of doom
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  Expired certificates mixed with current ones. A shared Drive
                  folder nobody organized. A spreadsheet with half the dates
                  wrong.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section
          id="how-it-works"
          className="border-y border-slate-200 bg-gradient-to-b from-slate-50 to-white py-24"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-brand-600">
                How it works
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Three steps to full compliance
              </h2>
            </div>
            <div className="relative mt-16 grid gap-12 md:grid-cols-3">
              {/* Connector line (desktop) */}
              <div className="absolute left-0 right-0 top-10 hidden h-0.5 bg-gradient-to-r from-transparent via-brand-200 to-transparent md:block" />

              <div className="relative text-center">
                <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-600 to-brand-700 text-2xl font-bold text-white shadow-lg shadow-brand-600/25">
                  1
                </div>
                <h3 className="mt-6 text-lg font-bold text-slate-900">
                  Add your subs
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  Enter your subcontractors or forward existing COI emails. We
                  parse and organize everything automatically.
                </p>
              </div>
              <div className="relative text-center">
                <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-600 to-brand-700 text-2xl font-bold text-white shadow-lg shadow-brand-600/25">
                  2
                </div>
                <h3 className="mt-6 text-lg font-bold text-slate-900">
                  Subs upload credentials
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  Each sub gets a simple text or email link. They snap a photo
                  of their license or COI. No app download, no account needed.
                </p>
              </div>
              <div className="relative text-center">
                <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-600 to-brand-700 text-2xl font-bold text-white shadow-lg shadow-brand-600/25">
                  3
                </div>
                <h3 className="mt-6 text-lg font-bold text-slate-900">
                  Stay compliant automatically
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  Get alerts before anything expires. Generate compliance reports
                  for inspectors and bid packages with one click.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-brand-600">
                Pricing
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Simple, transparent pricing
              </h2>
              <p className="mt-4 text-base text-slate-600">
                Pays for itself by preventing one incident per year.
              </p>
            </div>
            <div className="mt-16 grid gap-8 lg:grid-cols-3">
              {/* Starter */}
              <div className="flex flex-col rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-shadow hover:shadow-md">
                <h3 className="text-base font-semibold text-slate-900">
                  Starter
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  For small crews getting organized
                </p>
                <div className="mt-6">
                  <span className="text-4xl font-extrabold text-slate-900">
                    $99
                  </span>
                  <span className="text-base text-slate-500">/mo</span>
                </div>
                <ul className="mt-8 flex-1 space-y-4 text-sm text-slate-600">
                  <li className="flex items-start gap-3">
                    <CheckIcon /> Up to 15 active subs
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckIcon /> Credential tracking & storage
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckIcon /> Expiration alerts (email)
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckIcon /> Document storage
                  </li>
                </ul>
                <Link
                  href="/signup"
                  className="mt-8 block rounded-xl border border-slate-300 py-3 text-center text-sm font-semibold text-slate-700 transition-all hover:border-slate-400 hover:bg-slate-50 hover:shadow-sm"
                >
                  Get Started
                </Link>
              </div>
              {/* Pro */}
              <div className="relative flex flex-col rounded-2xl border-2 border-brand-600 bg-white p-8 shadow-lg shadow-brand-600/10">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-brand-600 to-accent-600 px-4 py-1 text-xs font-bold text-white shadow-sm">
                  Most Popular
                </div>
                <h3 className="text-base font-semibold text-slate-900">Pro</h3>
                <p className="mt-1 text-sm text-slate-500">
                  For growing GCs managing multiple jobs
                </p>
                <div className="mt-6">
                  <span className="text-4xl font-extrabold text-slate-900">
                    $249
                  </span>
                  <span className="text-base text-slate-500">/mo</span>
                </div>
                <ul className="mt-8 flex-1 space-y-4 text-sm text-slate-600">
                  <li className="flex items-start gap-3">
                    <CheckIcon /> Up to 50 active subs
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckIcon /> Sub self-service portal
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckIcon /> Insurance verification
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckIcon /> Compliance reports for bids
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckIcon /> SMS + email alerts
                  </li>
                </ul>
                <Link
                  href="/signup"
                  className="mt-8 block rounded-xl bg-gradient-to-r from-brand-600 to-brand-700 py-3 text-center text-sm font-semibold text-white shadow-sm shadow-brand-600/25 transition-all hover:shadow-md hover:shadow-brand-600/30"
                >
                  Get Started
                </Link>
              </div>
              {/* Business */}
              <div className="flex flex-col rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-shadow hover:shadow-md">
                <h3 className="text-base font-semibold text-slate-900">
                  Business
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  For commercial GCs with complex needs
                </p>
                <div className="mt-6">
                  <span className="text-4xl font-extrabold text-slate-900">
                    $449
                  </span>
                  <span className="text-base text-slate-500">/mo</span>
                </div>
                <ul className="mt-8 flex-1 space-y-4 text-sm text-slate-600">
                  <li className="flex items-start gap-3">
                    <CheckIcon /> Unlimited subcontractors
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckIcon /> Multi-jurisdiction rules engine
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckIcon /> API access
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckIcon /> Bid-ready compliance packages
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckIcon /> Dedicated onboarding
                  </li>
                </ul>
                <Link
                  href="/signup"
                  className="mt-8 block rounded-xl border border-slate-300 py-3 text-center text-sm font-semibold text-slate-700 transition-all hover:border-slate-400 hover:bg-slate-50 hover:shadow-sm"
                >
                  Contact Sales
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-slate-200 bg-gradient-to-br from-brand-900 to-brand-800 py-20">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Stop chasing credentials.
              <br />
              Start tracking them automatically.
            </h2>
            <p className="mt-4 text-base text-brand-100/80">
              Join general contractors who trust CertSync to keep every sub
              compliant on every job site.
            </p>
            <Link
              href="/signup"
              className="mt-8 inline-block rounded-xl bg-white px-8 py-3.5 text-base font-semibold text-brand-700 shadow-lg transition-all hover:bg-brand-50 hover:shadow-xl"
            >
              Start Your Free Trial
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-brand-600 to-accent-600">
                <ShieldIcon className="h-4 w-4 text-white" />
              </div>
              <span className="text-sm font-bold text-slate-900">CertSync</span>
            </div>
            <p className="text-sm text-slate-500">
              &copy; {new Date().getFullYear()} CertSync. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
