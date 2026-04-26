import { Badge, Card, PageSection, SectionTitle } from '../components/ui/index.js'
import { transfers } from '../features/transfers/data/transfers.js'
import { formatCurrency } from '../utils/formatters.js'

export default function Transfers() {
  return (
    <PageSection>
      <SectionTitle>Transfers</SectionTitle>
      {transfers.map((transfer) => (
        <Card className="grid gap-1.5" key={transfer.id} padded="md">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-slate-500">{transfer.title}</p>
            <Badge variant={transfer.status}>{transfer.status}</Badge>
          </div>
          <strong className="text-xl font-semibold text-slate-900">
            {formatCurrency(transfer.amount, transfer.currency)}
          </strong>
          <span className="text-slate-500">{transfer.description}</span>
        </Card>
      ))}
    </PageSection>
  )
}
