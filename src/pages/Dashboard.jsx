import { useAppState } from '../app/AppProvider.jsx'
import { Card, PageHeader, PageSection } from '../components/ui/index.js'
import {
  BalanceSummary,
  QuickActions,
  RecentActivity,
  SpendingOverview,
} from '../features/dashboard/components/index.js'
import {
  createBalanceSummary,
  createSpendingOverview,
  quickActions,
} from '../features/dashboard/data/summary.js'
import { TransactionReceiptPanel } from '../features/transactions/components/index.js'

export default function Dashboard() {
  const { downloadTransactionReceipt, state, viewTransactionReceipt } = useAppState()
  const balanceSummary = createBalanceSummary(state.accounts)
  const recentActivity = state.transactions.slice(0, 4)
  const spendingOverview = createSpendingOverview(
    state.transactions,
    state.accounts[0]?.currency ?? 'USD',
  )

  return (
    <PageSection className="gap-6">
      <PageHeader
        eyebrow="Overview"
        subtitle={
          state.isUsingMockAccounts || state.isUsingMockTransactions
            ? 'Track your balances and activity with sample data while the API is unavailable.'
            : 'Track your balances, recent activity, and quick actions from one place.'
        }
        title="Dashboard"
      />

      {state.transactionsError ? (
        <Card className="bg-amber-50 text-amber-800" padded="md">
          <p className="font-semibold">Using sample transaction activity</p>
          <p className="text-sm">{state.transactionsError}</p>
        </Card>
      ) : null}

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
        <BalanceSummary summary={balanceSummary} />
        <QuickActions actions={quickActions} />
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="grid gap-4">
          <RecentActivity
            canUseReceipts={!state.isUsingMockTransactions}
            onDownloadReceipt={downloadTransactionReceipt}
            onViewReceipt={viewTransactionReceipt}
            transactions={recentActivity}
          />
          <TransactionReceiptPanel
            error={state.receiptError}
            isDownloading={state.isReceiptDownloading}
            isLoading={state.isReceiptLoading}
            onDownload={() =>
              state.selectedReceipt
                ? downloadTransactionReceipt(
                    state.selectedReceipt.id,
                    state.selectedReceipt.reference,
                  )
                : null
            }
            receipt={state.selectedReceipt}
          />
        </div>
        <SpendingOverview overview={spendingOverview} />
      </div>
    </PageSection>
  )
}
