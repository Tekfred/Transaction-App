import { Card } from '../../../components/ui/index.js'
import { formatCurrency } from '../../../utils/formatters.js'

export default function BalanceSummary({ summary }) {
  return (
    <Card className="grid gap-5 overflow-hidden border-slate-200 bg-white text-slate-950">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-bold text-slate-600">Total balance</p>
          <strong className="mt-1 block break-words text-4xl font-extrabold tracking-normal text-slate-950 sm:text-5xl">
            {formatCurrency(summary.totalBalance, summary.currency)}
          </strong>
        </div>
        <div className="min-w-0 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-left text-slate-950 sm:max-w-[320px] sm:text-right">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
            Primary account
          </p>
          <p className="mt-1 font-bold text-slate-950">
            {String(summary.accountName).trim() !== ''
              ? String(summary.accountName).trim()
              : 'No account'}
          </p>
          <p className="break-all text-sm font-semibold leading-relaxed text-slate-600">
            ending{' '}
            {String(summary.accountNumber).trim() !== ''
              ? String(summary.accountNumber).trim()
              : '----'}
          </p>
        </div>
      </div>

      <div className="grid gap-3 border-t border-slate-200 pt-5 sm:grid-cols-2">
        <div>
          <p className="text-sm font-bold text-slate-600">Available now</p>
          <strong className="text-xl font-extrabold text-slate-950">
            {formatCurrency(summary.availableBalance, summary.currency)}
          </strong>
        </div>
        <div>
          <p className="text-sm font-bold text-slate-600">Linked accounts</p>
          <strong className="text-xl font-extrabold text-slate-950">2 active</strong>
        </div>
      </div>
    </Card>
  )
}
