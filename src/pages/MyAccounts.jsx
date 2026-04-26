import { PageHeader, PageSection } from '../components/ui/index.js'
import { AccountList, AccountsSummary } from '../features/accounts/components/index.js'
import { accounts } from '../features/accounts/data/accounts.js'
import { accountsSummary } from '../features/accounts/data/summary.js'

export default function MyAccounts() {
  return (
    <PageSection className="gap-6">
      <PageHeader
        eyebrow="Accounts"
        subtitle="Review balances, account details, and account health from one place."
        title="My Accounts"
      />

      <div className="grid gap-4 lg:grid-cols-[340px_minmax(0,1fr)]">
        <AccountsSummary summary={accountsSummary} />
        <AccountList accounts={accounts} />
      </div>
    </PageSection>
  )
}
