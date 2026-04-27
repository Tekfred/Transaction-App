import { Badge, Button, Card } from '../../../components/ui/index.js'
import { formatCompactDate, formatCurrency } from '../../../utils/formatters.js'

export default function RecentActivity({
  canUseReceipts = true,
  onDownloadReceipt,
  onViewReceipt,
  transactions,
}) {
  return (
    <Card className="grid gap-4">
      <div>
        <h3 className="text-xl font-semibold text-slate-900">Recent activity</h3>
        <p className="text-slate-500">Latest movement across your accounts.</p>
      </div>

      <div className="divide-y divide-slate-900/8">
        {transactions.length === 0 ? (
          <p className="rounded-2xl bg-slate-50 p-4 text-sm font-semibold text-slate-500">
            No recent activity yet.
          </p>
        ) : null}

        {transactions.map((transaction) => {
          const isCredit = transaction.amount > 0

          return (
            <div className="grid gap-3 py-4 first:pt-0 last:pb-0" key={transaction.id}>
              <div className="grid gap-2 sm:grid-cols-[1fr_auto] sm:gap-3">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-semibold text-slate-900">{transaction.merchant}</p>
                    <Badge variant={transaction.status}>{transaction.status}</Badge>
                  </div>
                  <p className="text-sm text-slate-500">
                    {transaction.category} · {formatCompactDate(transaction.date)}
                  </p>
                </div>
                <strong
                  className={
                    isCredit
                      ? 'font-semibold text-emerald-700 sm:text-right'
                      : 'font-semibold text-slate-900 sm:text-right'
                  }
                >
                  {isCredit ? '+' : ''}
                  {formatCurrency(transaction.amount, transaction.currency)}
                </strong>
              </div>

              {canUseReceipts ? (
                <div className="flex flex-wrap gap-2">
                  <Button
                    className="min-h-9 px-3 py-2 text-xs"
                    onClick={() => onViewReceipt?.(transaction.id)}
                    variant="secondary"
                  >
                    View Receipt
                  </Button>
                  <Button
                    className="min-h-9 px-3 py-2 text-xs"
                    onClick={() => onDownloadReceipt?.(transaction.id, transaction.reference)}
                    variant="secondary"
                  >
                    PDF
                  </Button>
                </div>
              ) : null}
            </div>
          )
        })}
      </div>
    </Card>
  )
}
