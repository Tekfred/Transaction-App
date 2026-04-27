import { Card } from '../../../components/ui/index.js'

export default function DepositInfo() {
  return (
    <Card className="grid gap-4">
      <div>
        <h3 className="text-xl font-semibold text-slate-900">How deposits work</h3>
        <p className="text-slate-500">Deposits are completed through Stripe checkout.</p>
      </div>

      <div className="grid gap-3">
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Step 1</p>
          <p className="font-semibold text-slate-900">Choose an account and amount.</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Step 2</p>
          <p className="font-semibold text-slate-900">Complete payment on Stripe checkout.</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Step 3</p>
          <p className="font-semibold text-slate-900">Return here and balances refresh.</p>
        </div>
      </div>
    </Card>
  )
}
