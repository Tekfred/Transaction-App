import { Card, PageSection, SectionTitle } from '../components/ui/index.js'

export default function Transfers() {
  return (
    <PageSection>
      <SectionTitle>Transfers</SectionTitle>
      <Card className="grid gap-1.5" padded="md">
        <p className="text-slate-500">Internal Transfer</p>
        <strong className="text-xl font-semibold text-slate-900">$500.00</strong>
        <span className="text-slate-500">
          Move money between your checking and savings accounts.
        </span>
      </Card>
    </PageSection>
  )
}
