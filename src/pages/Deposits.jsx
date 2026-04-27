import { useAppState } from '../app/AppProvider.jsx'
import { Card, PageHeader, PageSection } from '../components/ui/index.js'
import { DepositFormShell, DepositInfo } from '../features/deposits/components/index.js'

export default function Deposits() {
  const { resetDepositDraft, state, submitDeposit, updateDepositDraft } = useAppState()

  return (
    <PageSection className="gap-6">
      <PageHeader
        eyebrow="Deposits"
        subtitle="Add funds to an account through Stripe checkout."
        title="Deposits"
      />

      {state.isAccountsLoading ? (
        <Card className="bg-blue-50 text-blue-800" padded="md">
          <p className="font-semibold">Refreshing deposit accounts</p>
          <p className="text-sm">Account options are being updated from the API.</p>
        </Card>
      ) : null}

      {state.isUsingMockAccounts ? (
        <Card className="bg-amber-50 text-amber-800" padded="md">
          <p className="font-semibold">Sample account data is active</p>
          <p className="text-sm">Deposit checkout requires real account data from the backend.</p>
        </Card>
      ) : null}

      <div className="grid gap-4 lg:grid-cols-[340px_minmax(0,1fr)]">
        <DepositFormShell
          accounts={state.accounts}
          draft={state.depositDraft}
          error={state.depositError}
          isDisabled={state.isUsingMockAccounts}
          isSubmitting={state.isDepositSubmitting}
          onReset={resetDepositDraft}
          onSubmit={submitDeposit}
          onUpdateDraft={updateDepositDraft}
        />
        <DepositInfo />
      </div>
    </PageSection>
  )
}
