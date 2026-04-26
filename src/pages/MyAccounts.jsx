import { Card, PageSection, SectionTitle } from '../components/ui/index.js'

export default function MyAccounts() {
  return (
    <PageSection>
      <SectionTitle>My Accounts</SectionTitle>
      <div className="grid gap-4">
        <Card className="flex flex-col justify-between gap-4 sm:flex-row" padded="md">
          <div>
            <h3 className="text-xl font-semibold text-slate-900">Checking Account</h3>
            <p className="text-slate-500">Main daily spending account</p>
          </div>
          <strong className="text-xl font-semibold text-slate-900">$8,245.00</strong>
        </Card>
        <Card className="flex flex-col justify-between gap-4 sm:flex-row" padded="md">
          <div>
            <h3 className="text-xl font-semibold text-slate-900">Savings Account</h3>
            <p className="text-slate-500">Emergency fund and short-term goals</p>
          </div>
          <strong className="text-xl font-semibold text-slate-900">$16,335.40</strong>
        </Card>
      </div>
    </PageSection>
  )
}
