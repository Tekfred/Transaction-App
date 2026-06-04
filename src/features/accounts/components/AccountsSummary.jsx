import { Card } from '../../../components/ui/index.js'
import { formatCurrency } from '../../../utils/formatters.js'
import AccountBalance from './AccountBalance.jsx'

export default function AccountsSummary({ summary }) {
  return (
    <Card className="grid gap-5 border-slate-200 bg-white text-slate-950">
      <div>
        <p className="text-sm font-bold text-slate-600">All accounts</p>
        <h3 className="mt-1 text-2xl font-extrabold text-slate-950">Account overview</h3>
      </div>

      <AccountBalance
        amount={summary.totalBalance}
        currency={summary.currency}
        label="Total balance"
        size="lg"
        tone="light"
      />

      <div className="grid gap-3 border-t border-slate-200 pt-5 sm:grid-cols-2">
        <div>
          <p className="text-sm font-bold text-slate-600">Available balance</p>
          <strong className="text-xl font-extrabold text-slate-950">
            {formatCurrency(summary.totalAvailable, summary.currency)}
          </strong>
        </div>
        <div>
          <p className="text-sm font-bold text-slate-600">Active accounts</p>
          <strong className="text-xl font-extrabold text-slate-950">
            {summary.activeAccounts}
          </strong>
        </div>
      </div>
    </Card>
  )
}
