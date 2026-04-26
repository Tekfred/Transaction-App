import { Card } from '../../../components/ui/index.js'
import { formatCurrency } from '../../../utils/formatters.js'

export default function BalanceSummary({ summary }) {
  return (
    <Card className="grid gap-5 overflow-hidden bg-slate-950 text-white">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-300">Total balance</p>
          <strong className="mt-1 block text-4xl font-bold tracking-normal sm:text-5xl">
            {formatCurrency(summary.totalBalance, summary.currency)}
          </strong>
        </div>
        <div className="rounded-2xl bg-white/10 px-4 py-3 text-left sm:text-right">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-300">
            Primary account
          </p>
          <p className="mt-1 font-semibold text-white">{summary.accountName}</p>
          <p className="text-sm text-slate-300">ending {summary.accountNumber}</p>
        </div>
      </div>

      <div className="grid gap-3 border-t border-white/10 pt-5 sm:grid-cols-2">
        <div>
          <p className="text-sm text-slate-300">Available now</p>
          <strong className="text-xl font-semibold">
            {formatCurrency(summary.availableBalance, summary.currency)}
          </strong>
        </div>
        <div>
          <p className="text-sm text-slate-300">Linked accounts</p>
          <strong className="text-xl font-semibold">2 active</strong>
        </div>
      </div>
    </Card>
  )
}
