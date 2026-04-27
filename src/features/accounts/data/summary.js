import { accounts } from './accounts.js'

export function createAccountsSummary(accounts) {
  const totalBalance = accounts.reduce((total, account) => total + account.balance, 0)
  const totalAvailable = accounts.reduce(
    (total, account) => total + (account.availableBalance ?? account.balance),
    0,
  )

  return {
    activeAccounts: accounts.filter((account) => account.status === 'active').length,
    currency: accounts[0]?.currency ?? 'USD',
    totalAvailable,
    totalBalance,
  }
}

export const accountsSummary = createAccountsSummary(accounts)
