import { Badge, Card } from '../../../components/ui/index.js'
import { cn } from '../../../utils/cn.js'
import AccountBalance from './AccountBalance.jsx'

const toneClasses = {
  blue: 'from-blue-500 to-cyan-400',
  emerald: 'from-emerald-500 to-teal-400',
}

export default function AccountCard({ account }) {
  return (
    <Card className="grid gap-5" padded="md">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <span
              className={cn(
                'h-3 w-3 rounded-full bg-gradient-to-br',
                toneClasses[account.tone] ?? toneClasses.blue,
              )}
            />
            <h3 className="text-xl font-semibold text-slate-900">{account.name}</h3>
            <Badge variant={account.status}>{account.status}</Badge>
          </div>
          <p className="text-slate-500">{account.description}</p>
        </div>
        <AccountBalance amount={account.balance} currency={account.currency} />
      </div>

      <div className="grid gap-3 rounded-2xl bg-slate-50 p-4 sm:grid-cols-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Type</p>
          <p className="font-semibold text-slate-900">{account.type}</p>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Account</p>
          <p className="font-semibold text-slate-900">•••• {account.accountNumber}</p>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Trend</p>
          <p className="font-semibold text-emerald-700">{account.trend}</p>
        </div>
      </div>
    </Card>
  )
}
