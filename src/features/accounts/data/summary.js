import { accounts } from './accounts.js'

const totalBalance = accounts.reduce((total, account) => total + account.balance, 0)
const totalAvailable = accounts.reduce((total, account) => total + account.availableBalance, 0)

export const accountsSummary = {
  totalBalance,
  totalAvailable,
  activeAccounts: accounts.filter((account) => account.status === 'active').length,
  currency: accounts[0]?.currency ?? 'USD',
}
