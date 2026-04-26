import { Button, Card } from '../../../components/ui/index.js'
import { formatCurrency } from '../../../utils/formatters.js'

export default function PaymentsSummary({ summary }) {
  return (
    <Card className="grid gap-5 bg-slate-950 text-white">
      <div>
        <p className="text-sm font-semibold text-slate-300">Upcoming payments</p>
        <h3 className="mt-1 text-2xl font-bold">Bills snapshot</h3>
      </div>

      <div>
        <p className="text-sm font-semibold text-slate-300">Total scheduled</p>
        <strong className="block text-4xl font-bold">
          {formatCurrency(summary.totalScheduled, summary.currency)}
        </strong>
      </div>

      <div className="grid gap-3 border-t border-white/10 pt-5 sm:grid-cols-3 lg:grid-cols-1">
        <div>
          <p className="text-sm text-slate-300">Upcoming</p>
          <strong className="text-xl font-semibold">{summary.upcomingCount}</strong>
        </div>
        <div>
          <p className="text-sm text-slate-300">Pending</p>
          <strong className="text-xl font-semibold">{summary.pendingCount}</strong>
        </div>
        <div>
          <p className="text-sm text-slate-300">Autopay</p>
          <strong className="text-xl font-semibold">{summary.autopayCount}</strong>
        </div>
      </div>

      <Button className="w-full" variant="secondary">
        Schedule Payment
      </Button>
    </Card>
  )
}
