import { Card, PageSection, SectionTitle } from '../components/ui/index.js'

export default function Payments() {
  return (
    <PageSection>
      <SectionTitle>Payments</SectionTitle>
      <Card className="grid gap-1.5" padded="md">
        <p className="text-slate-500">Scheduled Payments</p>
        <strong className="text-xl font-semibold text-slate-900">3 upcoming bills</strong>
        <span className="text-slate-500">
          Electricity, internet, and credit card due this week.
        </span>
      </Card>
    </PageSection>
  )
}
