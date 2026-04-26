import { Card } from '../../../components/ui/index.js'
import { formatCurrency } from '../../../utils/formatters.js'

export default function SpendingOverview({ overview }) {
  const progress = Math.min((overview.amount / overview.limit) * 100, 100)

  return (
    <Card className="grid gap-4">
      <div>
        <h3 className="text-xl font-semibold text-slate-900">Spending overview</h3>
        <p className="text-slate-500">{overview.period}</p>
      </div>

      <div>
        <div className="mb-2 flex items-end justify-between gap-3">
          <strong className="text-3xl font-bold text-slate-900">
            {formatCurrency(overview.amount, overview.currency)}
          </strong>
          <span className="text-sm font-semibold text-slate-500">
            of {formatCurrency(overview.limit, overview.currency)}
          </span>
        </div>
        <div className="h-3 overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-[--color-primary]"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <p className="text-sm text-slate-500">
        Spending is currently {Math.round(progress)}% of the tracked monthly threshold.
      </p>
    </Card>
  )
}
