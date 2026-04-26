import { accounts } from '../../accounts/data/accounts.js'
import { payments } from '../../payments/data/payments.js'
import { transactions } from '../../transactions/data/transactions.js'

const monthlySpending = transactions
  .filter((transaction) => transaction.amount < 0)
  .reduce((total, transaction) => total + Math.abs(transaction.amount), 0)

const totalBalance = accounts.reduce((total, account) => total + account.balance, 0)

const pendingPayments = payments.filter((payment) =>
  ['pending', 'scheduled'].includes(payment.status),
).length

export const dashboardStats = [
  {
    id: 'total-balance',
    label: 'Total Balance',
    value: totalBalance,
    description: 'Across your linked checking and savings accounts.',
    format: 'currency',
  },
  {
    id: 'monthly-spending',
    label: 'Monthly Spending',
    value: monthlySpending,
    description: 'Current tracked spending from recent transactions.',
    format: 'currency',
  },
  {
    id: 'pending-payments',
    label: 'Pending Payments',
    value: pendingPayments,
    description: 'Scheduled and pending bills waiting to clear.',
    format: 'number',
  },
]
