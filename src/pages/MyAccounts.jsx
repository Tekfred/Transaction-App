import { useAppState } from '../app/AppProvider.jsx'
import { Card, PageHeader, PageSection } from '../components/ui/index.js'
import { AccountList, AccountsSummary } from '../features/accounts/components/index.js'

export default function MyAccounts() {
  const { selectAccount, state } = useAppState()

  return (
    <PageSection className="gap-6">
      <PageHeader
        eyebrow="Accounts"
        subtitle={
          state.isUsingMockAccounts
            ? 'Showing sample account data until the API is available.'
            : 'Review balances, account details, and account health from one place.'
        }
        title="My Accounts"
      />

      {state.accountsError ? (
        <Card className="bg-amber-50 text-amber-800" padded="md">
          <p className="font-semibold">Using sample accounts</p>
          <p className="text-sm">{state.accountsError}</p>
        </Card>
      ) : null}

      <div className="grid gap-4 lg:grid-cols-[340px_minmax(0,1fr)]">
        <AccountsSummary summary={state.accountsSummary} />
        <AccountList
          accounts={state.accounts}
          onSelectAccount={selectAccount}
          selectedAccountId={state.selectedAccountId}
        />
      </div>
    </PageSection>
  )
}
