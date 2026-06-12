  import { accounts } from '../../accounts/data/accounts.js'
  import { payments } from '../../payments/data/payments.js'
  import { transactions } from '../../transactions/data/transactions.js'

  export const primaryAccount = accounts[0]

  export function createSpendingOverview(transactions, currency = 'USD') {
    const monthlySpending = transactions
      .filter((transaction) => transaction.amount < 0)
      .reduce((total, transaction) => total + Math.abs(transaction.amount), 0)

    return {
      amount: monthlySpending,
      currency,
      limit: 4000,
      period: 'Recent activity',
    }
  }

  const pendingPayments = payments.filter((payment) =>
    ['pending', 'scheduled'].includes(payment.status),
  ).length

  export function createBalanceSummary(accounts) {
    const primaryAccount = accounts[0]
    const totalBalance = accounts.reduce((total, account) => total + account.balance, 0)

    return {
      accountName: primaryAccount?.name ?? 'No account',
      accountNumber: primaryAccount?.accountNumber ?? '----',
      availableBalance: primaryAccount?.availableBalance ?? primaryAccount?.balance ?? 0,
      currency: primaryAccount?.currency ?? 'USD',
      totalBalance,
    }
  }

  export const balanceSummary = createBalanceSummary(accounts)

  export const quickActions = [
    {
      id: 'transfer',
      label: 'Transfer',
      description: 'Move money',
    },
    {
      id: 'pay-bill',
      label: 'Pay Bill',
      description: 'Schedule payment',
    },
    {
      id: 'deposit',
      label: 'Deposit',
      description: 'Add funds',
    },
  ]

  export const spendingOverview = createSpendingOverview(transactions, primaryAccount.currency)

  export const recentActivity = transactions.slice(0, 4)
