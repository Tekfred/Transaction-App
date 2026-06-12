import { Badge, Button, Card } from '../../../components/ui/index.js'
import { formatCompactDate, formatCurrency } from '../../../utils/formatters.js'
import { FileText, Download, ArrowUpRight, ArrowDownLeft } from 'lucide-react'

/**
 * RecentActivity
 *
 * Props (unchanged from original):
 *   transactions        — array from state.transactions.slice(0,4)
 *   canUseReceipts      — boolean: false when using mock data
 *   onViewReceipt       — (transactionId: string) => void
 *   onDownloadReceipt   — (transactionId: string, reference: string) => void
 */
export default function RecentActivity({
  canUseReceipts = true,
  onDownloadReceipt,
  onViewReceipt,
  transactions,
}) {
  return (
    <div className="bg-white border border-slate-200/50 p-6 rounded-4xl shadow-xs space-y-5 text-left">
      {/* Header */}
      <div>
        <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#565e74] block mb-1">
          Activity
        </span>
        <h3 className="text-xl font-extrabold text-[#0b1c30] tracking-tight">
          Recent transactions
        </h3>
        <p className="text-xs text-slate-400 mt-0.5">Latest movement across your accounts.</p>
      </div>

      {/* Transaction list */}
      <div className="divide-y divide-slate-100">
        {transactions.length === 0 ? (
          <p className="rounded-2xl bg-slate-50 p-4 text-sm font-semibold text-slate-500">
            No recent activity yet.
          </p>
        ) : null}

        {transactions.map((transaction) => {
          const isCredit = transaction.amount > 0

          return (
            <div key={transaction.id} className="py-4 first:pt-0 last:pb-0 grid gap-3">
              {/* Top row: icon + merchant + amount */}
              <div className="flex items-center gap-3">
                {/* Direction indicator */}
                <div
                  className={`
                  w-9 h-9 rounded-xl flex items-center justify-center shrink-0
                  ${
                    isCredit
                      ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                      : 'bg-slate-50 text-[#4648d4] border border-slate-100'
                  }
                `}
                >
                  {isCredit ? (
                    <ArrowDownLeft size={15} className="stroke-[2.5]" />
                  ) : (
                    <ArrowUpRight size={15} className="stroke-[2.5]" />
                  )}
                </div>

                {/* Merchant info */}
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-bold text-sm text-[#0b1c30]">{transaction.merchant}</p>
                    <Badge variant={transaction.status}>{transaction.status}</Badge>
                  </div>
                  <p className="text-[11px] text-slate-400 font-medium mt-0.5">
                    {transaction.category} · {formatCompactDate(transaction.date)}
                  </p>
                </div>

                {/* Amount */}
                <strong
                  className={`text-sm font-extrabold shrink-0 ${isCredit ? 'text-emerald-600' : 'text-[#0b1c30]'}`}
                >
                  {isCredit ? '+' : ''}
                  {formatCurrency(transaction.amount, transaction.currency)}
                </strong>
              </div>

              {/* Receipt actions */}
              {canUseReceipts ? (
                <div className="flex flex-wrap gap-2 pl-12">
                  <button
                    type="button"
                    onClick={() => onViewReceipt?.(transaction.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#f8f9ff] hover:bg-[#eff4ff] text-[#4648d4] text-[11px] font-bold border border-slate-100 transition-all  focus-visible:outline-2 focus-visible:outline-[#4648d4]"
                  >
                    <FileText size={12} />
                    View Receipt
                  </button>
                  <button
                    type="button"
                    onClick={() => onDownloadReceipt?.(transaction.id, transaction.reference)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#f8f9ff] hover:bg-[#eff4ff] text-[#565e74] text-[11px] font-bold border border-slate-100 transition-all  focus-visible:outline-2 focus-visible:outline-[#4648d4]"
                  >
                    <Download size={12} />
                    PDF
                  </button>
                </div>
              ) : null}
            </div>
          )
        })}
      </div>
    </div>
  )
}
