import { formatCurrency } from '../../../utils/formatters.js'

export default function AccountBalance({
  amount,
  currency,
  label = 'Balance',
  size = 'md',
  tone = 'light',
}) {
  const valueClass = size === 'lg' ? 'text-4xl font-bold' : 'text-2xl font-bold'
  const labelClass = tone === 'dark' ? 'text-slate-300' : 'text-slate-500'
  const valueColorClass = tone === 'dark' ? 'text-white' : 'text-slate-950'

  return (
    <div>
      <p className={`text-sm font-semibold ${labelClass}`}>{label}</p>
      <strong className={`${valueClass} block break-words ${valueColorClass}`}>
        {formatCurrency(amount, currency)}
      </strong>
    </div>
  )
}
