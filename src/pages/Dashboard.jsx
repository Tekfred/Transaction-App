import { Button, PageHeader, PageSection, StatCard } from '../components/ui/index.js'

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
        <StatCard
          description="Across your linked checking and savings accounts."
          label="Total Balance"
          value="$24,580.40"
        />
        <StatCard
          description="Down 8% compared with last month."
          label="Monthly Spending"
          value="$3,240.18"
        />
        <StatCard
          description="Two card payments and two scheduled transfers."
          label="Pending Payments"
          value="4"
        />
      </div>
    </PageSection>
  )
}
