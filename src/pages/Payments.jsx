import { PageHeader, PageSection } from '../components/ui/index.js'
import { PaymentList, PaymentsSummary } from '../features/payments/components/index.js'
import { payments } from '../features/payments/data/payments.js'
import { paymentsSummary } from '../features/payments/data/summary.js'

export default function Payments() {
  return (
    <PageSection className="gap-6">
      <PageHeader
        eyebrow="Payments"
        subtitle="Track upcoming bills, pending payments, and autopay coverage."
        title="Payments"
      />

      <div className="grid gap-4 lg:grid-cols-[340px_minmax(0,1fr)]">
        <PaymentsSummary summary={paymentsSummary} />
        <PaymentList payments={payments} />
      </div>
    </PageSection>
  )
}
