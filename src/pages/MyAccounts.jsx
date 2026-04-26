import { Badge, Card, PageSection, SectionTitle } from '../components/ui/index.js'
import { accounts } from '../features/accounts/data/accounts.js'
import { formatCurrency } from '../utils/formatters.js'

export default function MyAccounts() {
  return (
    <PageSection>
      <SectionTitle>My Accounts</SectionTitle>
      <div className="grid gap-4">
        {accounts.map((account) => (
          <Card
            className="flex flex-col justify-between gap-4 sm:flex-row"
            key={account.id}
            padded="md"
          >
            <div>
              <div className="mb-1 flex flex-wrap items-center gap-2">
                <h3 className="text-xl font-semibold text-slate-900">{account.name}</h3>
                <Badge variant={account.status}>{account.status}</Badge>
              </div>
              <p className="text-slate-500">{account.description}</p>
            </div>
            <strong className="text-xl font-semibold text-slate-900">
              {formatCurrency(account.balance, account.currency)}
            </strong>
          </Card>
        ))}
      </div>
    </PageSection>
  )
}
