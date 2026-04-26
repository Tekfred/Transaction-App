import { Card } from '../../../components/ui/index.js'
import { formatCurrency } from '../../../utils/formatters.js'
import AccountBalance from './AccountBalance.jsx'

export default function AccountsSummary({ summary }) {
  return (
    <Card className="grid gap-5 bg-slate-950 text-white">
      <div>
        <p className="text-sm font-semibold text-slate-300">All accounts</p>
        <h3 className="mt-1 text-2xl font-bold">Account overview</h3>
      </div>

      <AccountBalance
        amount={summary.totalBalance}
        currency={summary.currency}
        label="Total balance"
        size="lg"
        tone="dark"
      />

      <div className="grid gap-3 border-t border-white/10 pt-5 sm:grid-cols-2">
        <div>
          <p className="text-sm text-slate-300">Available balance</p>
          <strong className="text-xl font-semibold">
            {formatCurrency(summary.totalAvailable, summary.currency)}
          </strong>
        </div>
        <div>
          <p className="text-sm text-slate-300">Active accounts</p>
          <strong className="text-xl font-semibold">{summary.activeAccounts}</strong>
        </div>
      </div>
    </Card>
  )
}
