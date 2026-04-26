import { Badge, Card } from '../../../components/ui/index.js'
import { formatCompactDate, formatCurrency } from '../../../utils/formatters.js'

export default function PaymentCard({ payment }) {
  return (
    <Card className="grid gap-4" padded="md">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <h3 className="text-xl font-semibold text-slate-900">{payment.payee}</h3>
            <Badge variant={payment.status}>{payment.status}</Badge>
          </div>
          <p className="text-slate-500">{payment.category}</p>
        </div>
        <strong className="break-words text-2xl font-bold text-slate-950">
          {formatCurrency(payment.amount, payment.currency)}
        </strong>
      </div>

      <div className="grid gap-3 rounded-2xl bg-slate-50 p-4 sm:grid-cols-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Due</p>
          <p className="font-semibold text-slate-900">{formatCompactDate(payment.dueDate)}</p>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Autopay</p>
          <p className="font-semibold text-slate-900">{payment.autopay ? 'On' : 'Off'}</p>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Source</p>
          <p className="font-semibold text-slate-900">Checking</p>
        </div>
      </div>
    </Card>
  )
}
