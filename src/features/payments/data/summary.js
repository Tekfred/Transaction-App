import { payments } from './payments.js'

const totalScheduled = payments.reduce((total, payment) => total + payment.amount, 0)
const pendingCount = payments.filter((payment) => payment.status === 'pending').length
const autopayCount = payments.filter((payment) => payment.autopay).length

export const paymentsSummary = {
  totalScheduled,
  pendingCount,
  autopayCount,
  upcomingCount: payments.length,
  currency: payments[0]?.currency ?? 'USD',
}
