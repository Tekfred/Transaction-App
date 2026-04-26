import { Badge, Card } from '../../../components/ui/index.js'
import { formatCompactDate, formatCurrency } from '../../../utils/formatters.js'

export default function TransferCard({ transfer }) {
  return (
    <Card className="grid gap-4" padded="md">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <h3 className="text-xl font-semibold text-slate-900">{transfer.title}</h3>
            <Badge variant={transfer.status}>{transfer.status}</Badge>
          </div>
          <p className="text-slate-500">{transfer.description}</p>
        </div>
        <strong className="break-words text-2xl font-bold text-slate-950">
          {formatCurrency(transfer.amount, transfer.currency)}
        </strong>
      </div>

      <div className="grid gap-3 rounded-2xl bg-slate-50 p-4 sm:grid-cols-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-slate-500">From</p>
          <p className="font-semibold text-slate-900">Checking</p>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-slate-500">To</p>
          <p className="font-semibold text-slate-900">Savings</p>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Date</p>
          <p className="font-semibold text-slate-900">
            {formatCompactDate(transfer.scheduledDate)}
          </p>
        </div>
      </div>
    </Card>
  )
}
