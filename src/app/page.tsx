import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
              <svg
                className="h-5 w-5 text-white"
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
            <span className="text-xl font-bold text-gray-900">CertSync</span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              Start Free Trial
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <main className="flex-1">
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              Never put an unlicensed sub{" "}
              <span className="text-blue-600">on a job site</span>
            </h1>
            <p className="mt-6 text-lg text-gray-600">
              CertSync automates credential tracking for general contractors.
              Licenses, insurance, bonds, and certifications — collected,
              verified, and monitored so you never get caught with a lapsed
              credential again.
            </p>
            <div className="mt-10 flex items-center justify-center gap-4">
              <Link
                href="/signup"
                className="rounded-lg bg-blue-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-blue-700"
              >
                Start Free Trial
              </Link>
              <Link
                href="#how-it-works"
                className="rounded-lg border border-gray-300 px-6 py-3 text-base font-medium text-gray-700 hover:bg-gray-50"
              >
                See How It Works
              </Link>
            </div>
          </div>
        </section>

        {/* Pain Points */}
        <section className="border-t border-gray-200 bg-white py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-center text-3xl font-bold text-gray-900">
              Sound familiar?
            </h2>
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              <div className="rounded-xl border border-red-100 bg-red-50 p-6">
                <div className="text-2xl">&#9888;</div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">
                  Stop-work orders
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  An inspector flags an expired license. The project stops. Your
                  client is furious. You lose thousands per day.
                </p>
              </div>
              <div className="rounded-xl border border-yellow-100 bg-yellow-50 p-6">
                <div className="text-2xl">&#128197;</div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">
                  The Monday morning chase
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  Texting and emailing 20+ subs for updated COIs. Chasing
                  renewals. Wondering whose insurance lapsed this month.
                </p>
              </div>
              <div className="rounded-xl border border-orange-100 bg-orange-50 p-6">
                <div className="text-2xl">&#128214;</div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">
                  The filing cabinet of doom
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  Expired certificates mixed with current ones. A shared Drive
                  folder nobody organized. A spreadsheet with half the dates
                  wrong.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-center text-3xl font-bold text-gray-900">
              How CertSync works
            </h2>
            <div className="mt-12 grid gap-12 md:grid-cols-3">
              <div className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-xl font-bold text-blue-600">
                  1
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">
                  Add your subs
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  Enter your subcontractors or forward existing COI emails. We
                  parse and organize everything automatically.
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-xl font-bold text-blue-600">
                  2
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">
                  Subs upload credentials
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  Each sub gets a simple text/email link. They snap a photo of
                  their license or COI. No app download, no account needed.
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-xl font-bold text-blue-600">
                  3
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">
                  Stay compliant automatically
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  Get alerts before anything expires. Generate compliance reports
                  for inspectors and bid packages with one click.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="border-t border-gray-200 bg-white py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-center text-3xl font-bold text-gray-900">
              Simple pricing
            </h2>
            <p className="mt-4 text-center text-gray-600">
              Pays for itself by preventing one incident per year.
            </p>
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              {/* Starter */}
              <div className="rounded-xl border border-gray-200 p-8">
                <h3 className="text-lg font-semibold text-gray-900">Starter</h3>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-gray-900">$99</span>
                  <span className="text-gray-600">/mo</span>
                </div>
                <ul className="mt-6 space-y-3 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">&#10003;</span> Up to 15 active subs
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">&#10003;</span> Credential tracking
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">&#10003;</span> Expiration alerts
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">&#10003;</span> Document storage
                  </li>
                </ul>
                <Link
                  href="/signup"
                  className="mt-8 block rounded-lg border border-gray-300 py-2 text-center text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Get Started
                </Link>
              </div>
              {/* Pro */}
              <div className="rounded-xl border-2 border-blue-600 p-8 shadow-lg">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Pro</h3>
                  <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                    Most Popular
                  </span>
                </div>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-gray-900">$249</span>
                  <span className="text-gray-600">/mo</span>
                </div>
                <ul className="mt-6 space-y-3 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">&#10003;</span> Up to 50 subs
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">&#10003;</span> Sub self-service portal
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">&#10003;</span> Insurance verification
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">&#10003;</span> Compliance reports
                  </li>
                </ul>
                <Link
                  href="/signup"
                  className="mt-8 block rounded-lg bg-blue-600 py-2 text-center text-sm font-medium text-white hover:bg-blue-700"
                >
                  Get Started
                </Link>
              </div>
              {/* Business */}
              <div className="rounded-xl border border-gray-200 p-8">
                <h3 className="text-lg font-semibold text-gray-900">
                  Business
                </h3>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-gray-900">$449</span>
                  <span className="text-gray-600">/mo</span>
                </div>
                <ul className="mt-6 space-y-3 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">&#10003;</span> Unlimited subs
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">&#10003;</span> Multi-jurisdiction rules
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">&#10003;</span> API access
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">&#10003;</span> Dedicated onboarding
                  </li>
                </ul>
                <Link
                  href="/signup"
                  className="mt-8 block rounded-lg border border-gray-300 py-2 text-center text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Contact Sales
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white py-8">
        <div className="mx-auto max-w-7xl px-4 text-center text-sm text-gray-500 sm:px-6 lg:px-8">
          &copy; {new Date().getFullYear()} CertSync. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
