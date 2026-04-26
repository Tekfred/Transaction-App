import { Badge, Card, PageSection, SectionTitle } from '../components/ui/index.js'
import { payments } from '../features/payments/data/payments.js'
import { formatCompactDate, formatCurrency } from '../utils/formatters.js'

export default function Payments() {
  const paymentSummary = `${payments.length} upcoming bills`

  return (
    <PageSection>
      <SectionTitle>Payments</SectionTitle>
      <Card className="grid gap-1.5" padded="md">
        <p className="text-slate-500">Scheduled Payments</p>
        <strong className="text-xl font-semibold text-slate-900">{paymentSummary}</strong>
        <span className="text-slate-500">
          {payments
            .map(
              (payment) =>
                `${payment.payee} ${formatCurrency(payment.amount, payment.currency)} due ${formatCompactDate(payment.dueDate)}`,
            )
            .join(', ')}
          .
        </span>
        <div className="mt-2 flex flex-wrap gap-2">
          {payments.map((payment) => (
            <Badge key={payment.id} variant={payment.status}>
              {payment.status}
            </Badge>
          ))}
        </div>
      </Card>
    </PageSection>
  )
}
