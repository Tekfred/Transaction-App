import { useAppState } from '../app/AppProvider.jsx'
import { PageHeader, PageSection } from '../components/ui/index.js'
import {
  BalanceSummary,
  QuickActions,
  RecentActivity,
  SpendingOverview,
} from '../features/dashboard/components/index.js'
import {
  createBalanceSummary,
  quickActions,
  recentActivity,
  spendingOverview,
} from '../features/dashboard/data/summary.js'

export default function Dashboard() {
  const { state } = useAppState()
  const balanceSummary = createBalanceSummary(state.accounts)

  return (
    <PageSection className="gap-6">
      <PageHeader
        eyebrow="Overview"
        subtitle={
          state.isUsingMockAccounts
            ? 'Track your balances with sample data while the API is unavailable.'
            : 'Track your balances, recent activity, and quick actions from one place.'
        }
        title="Dashboard"
      />

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
        <BalanceSummary summary={balanceSummary} />
        <QuickActions actions={quickActions} />
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_360px]">
        <RecentActivity transactions={recentActivity} />
        <SpendingOverview overview={spendingOverview} />
      </div>
    </PageSection>
  )
}
