import { formatCurrency } from '../../../utils/formatters.js'
import { TrendingDown } from 'lucide-react'

/**
 * SpendingOverview
 *
 * Props (unchanged from original):
 *   overview: { amount, limit, currency, period }
 */
export default function SpendingOverview({ overview }) {
  const progress = Math.min((overview.amount / overview.limit) * 100, 100)
  const remaining = overview.limit - overview.amount
  const isNearLimit = progress >= 80

  return (
    <div className="bg-white border border-slate-200/50 p-6 rounded-[32px] shadow-xs space-y-5 text-left">
      {/* Header */}
      <div>
        <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#565e74] block mb-1">
          Spending
        </span>
        <h3 className="text-xl font-extrabold text-[#0b1c30] tracking-tight">Monthly overview</h3>
        <p className="text-xs text-slate-400 mt-0.5">{overview.period}</p>
      </div>

      {/* Big number */}
      <div>
        <div className="flex items-end justify-between gap-3 mb-3">
          <strong className="text-3xl font-extrabold text-[#0b1c30] tracking-tight">
            {formatCurrency(overview.amount, overview.currency)}
          </strong>
          <span className="text-xs font-semibold text-slate-400 pb-1">
            of {formatCurrency(overview.limit, overview.currency)}
          </span>
        </div>

        {/* Progress track */}
        <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
          <div
            className={`h-full rounded-full transition-all duration-700 ease-out ${
              isNearLimit ? 'bg-rose-500' : 'bg-[#4648d4]'
            }`}
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex items-center justify-between mt-2">
          <span
            className={`text-[11px] font-bold ${isNearLimit ? 'text-rose-500' : 'text-slate-400'}`}
          >
            {Math.round(progress)}% used
          </span>
          <span className="text-[11px] font-bold text-emerald-600">
            {formatCurrency(remaining > 0 ? remaining : 0, overview.currency)} left
          </span>
        </div>
      </div>

      {/* Segments — visual breakdown of budget thirds */}
      <div className="space-y-2.5 pt-1 border-t border-slate-100">
        {[
          { label: 'First third', pct: Math.min(progress, 33.3), of: 33.3 },
          { label: 'Second third', pct: Math.max(0, Math.min(progress - 33.3, 33.3)), of: 33.3 },
          { label: 'Final third', pct: Math.max(0, progress - 66.6), of: 33.4 },
        ].map((seg) => (
          <div key={seg.label} className="flex items-center gap-2">
            <span className="text-[10px] font-semibold text-slate-400 w-20 shrink-0">
              {seg.label}
            </span>
            <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#4648d4]/40 rounded-full transition-all duration-500"
                style={{ width: `${Math.min((seg.pct / seg.of) * 100, 100)}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Status note */}
      <p className="text-xs text-slate-500 flex items-start gap-1.5">
        <TrendingDown size={13} className="shrink-0 mt-0.5 text-slate-400" />
        Spending is at {Math.round(progress)}% of your monthly threshold.
        {isNearLimit ? " You're close to the limit." : ''}
      </p>
    </div>
  )
}
