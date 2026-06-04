import { Link, useSearchParams } from 'react-router-dom'

import { Card, PageHeader, PageSection } from '../components/ui/index.js'

export default function DepositSuccess() {
  const [searchParams] = useSearchParams()
  const reference = searchParams.get('reference')

  return (
    <PageSection className="gap-6">
      <PageHeader
        eyebrow="Deposit"
        subtitle="Stripe checkout has returned control to your account workspace."
        title="Deposit submitted"
      />

      <Card className="grid gap-5 border-emerald-600/20 bg-emerald-50 text-emerald-950">
        <div>
          <p className="text-sm font-bold uppercase tracking-widest text-emerald-700">
            Checkout complete
          </p>
          <h3 className="mt-1 text-2xl font-extrabold">Your deposit is being processed</h3>
          <p className="mt-2 max-w-2xl text-sm font-semibold text-emerald-800">
            Your balance and recent activity will update after the backend confirms the Stripe
            webhook.
          </p>
        </div>

        {reference ? (
          <div className="rounded-2xl border border-emerald-600/20 bg-white p-4">
            <p className="text-xs font-bold uppercase tracking-widest text-emerald-700">
              Deposit reference
            </p>
            <p className="mt-1 break-all text-lg font-extrabold text-slate-950">{reference}</p>
          </div>
        ) : null}

        <div className="flex flex-col gap-2 sm:flex-row">
          <Link
            className="inline-flex min-h-11 items-center justify-center rounded-full bg-[var(--color-primary)] px-5 py-3 text-sm font-bold text-white shadow-[0_16px_34px_rgba(78,54,226,0.28)] transition hover:bg-[var(--color-primary-strong)]"
            to="/"
          >
            View Dashboard
          </Link>
          <Link
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-slate-900/8 bg-white px-5 py-3 text-sm font-bold text-slate-800 shadow-[0_10px_24px_rgba(32,54,86,0.06)] transition hover:bg-slate-50"
            to="/deposits"
          >
            Make Another Deposit
          </Link>
        </div>
      </Card>
    </PageSection>
  )
}
