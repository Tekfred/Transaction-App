import { Button, PageHeader, PageSection, StatCard } from '../components/ui/index.js'
import { dashboardStats } from '../features/dashboard/data/summary.js'
import { formatCurrency } from '../utils/formatters.js'

function formatStatValue(stat) {
  if (stat.format === 'currency') {
    return formatCurrency(stat.value)
  }

  return stat.value
}

export default function Dashboard() {
  return (
    <PageSection className="gap-6">
      <PageHeader
        action={<Button size="lg">New Transfer</Button>}
        eyebrow="Overview"
        subtitle="Track your balances, recent activity, and quick actions from one place."
        title="Dashboard"
      />

      <div className="grid gap-4 md:grid-cols-3">
        {dashboardStats.map((stat) => (
          <StatCard
            description={stat.description}
            key={stat.id}
            label={stat.label}
            value={formatStatValue(stat)}
          />
        ))}
      </div>
    </PageSection>
  )
}
