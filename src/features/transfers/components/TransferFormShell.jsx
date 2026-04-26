import { Button, Card } from '../../../components/ui/index.js'
import { formatCurrency } from '../../../utils/formatters.js'

export default function TransferFormShell({ draft }) {
  return (
    <Card className="grid gap-5 bg-slate-950 text-white">
      <div>
        <p className="text-sm font-semibold text-slate-300">New transfer</p>
        <h3 className="mt-1 text-2xl font-bold">Move money</h3>
      </div>

      <div className="grid gap-3">
        <div className="rounded-2xl bg-white/10 p-4">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-300">From</p>
          <p className="font-semibold">Checking Account</p>
        </div>
        <div className="rounded-2xl bg-white/10 p-4">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-300">To</p>
          <p className="font-semibold">Savings Account</p>
        </div>
        <div className="rounded-2xl bg-white/10 p-4">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-300">Amount</p>
          <p className="text-3xl font-bold">{formatCurrency(draft.amount, draft.currency)}</p>
        </div>
      </div>

      <div className="grid gap-3 border-t border-white/10 pt-5 sm:grid-cols-2 lg:grid-cols-1">
        <div>
          <p className="text-sm text-slate-300">Frequency</p>
          <strong className="text-xl font-semibold">{draft.frequency}</strong>
        </div>
        <div>
          <p className="text-sm text-slate-300">Memo</p>
          <strong className="text-xl font-semibold">{draft.memo}</strong>
        </div>
      </div>

      <Button className="w-full" variant="secondary">
        Review Transfer
      </Button>
    </Card>
  )
}
