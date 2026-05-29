import { Badge, Card } from '../../../components/ui/index.js'
import { formatCompactDate, formatCurrency } from '../../../utils/formatters.js'

export default function BillPaymentHistoryList({ billPayments, isLoading }) {
  return (
    <Card className="grid gap-4">
      <div>
        <h3 className="text-xl font-semibold text-slate-900">Bill payment history</h3>
        <p className="text-slate-500">Recent merchant and biller payments.</p>
      </div>

      <div className="divide-y divide-slate-900/8">
        {isLoading ? (
          <p className="rounded-2xl bg-slate-50 p-4 text-sm font-semibold text-slate-500">
            Loading payment history...
          </p>
        ) : null}

        {!isLoading && billPayments.length === 0 ? (
          <p className="rounded-2xl bg-slate-50 p-4 text-sm font-semibold text-slate-500">
            No bill payments yet.
          </p>
        ) : null}

        {billPayments.map((payment) => (
          <div className="grid gap-2 py-4 first:pt-0 last:pb-0" key={payment.id}>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-semibold text-slate-900">{payment.billerName}</p>
                  <Badge variant={payment.status}>{payment.status}</Badge>
                </div>
                <p className="text-sm text-slate-500">
                  {payment.customerReference} · {formatCompactDate(payment.createdAt)}
                </p>
              </div>
              <strong className="text-right font-semibold text-slate-950">
                {formatCurrency(payment.amount)}
              </strong>
            </div>
            {payment.failureReason ? (
              <p className="text-sm font-semibold text-rose-700">{payment.failureReason}</p>
            ) : null}
          </div>
        ))}
      </div>
    </Card>
  )
}
