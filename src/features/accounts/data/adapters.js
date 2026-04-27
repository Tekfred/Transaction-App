const tones = ['blue', 'emerald', 'violet', 'amber']

export function toAccountViewModel(account, index = 0) {
  return {
    accountNumber: account.accountNumber,
    availableBalance: account.availableBalance ?? account.balance,
    balance: account.balance,
    currency: account.currency ?? 'USD',
    description:
      account.description ?? `${account.accountTypeLabel ?? account.type ?? 'Account'} account`,
    id: account.id,
    name: account.name ?? `${account.accountTypeLabel ?? account.type ?? 'Bank'} Account`,
    routingNumber: account.routingNumber,
    status: account.status ?? (account.isActive ? 'active' : 'inactive'),
    tone: account.tone ?? tones[index % tones.length],
    trend: account.trend ?? 'Updated',
    type: account.type ?? account.accountTypeLabel ?? account.accountType,
  }
}

export function toAccountViewModels(accounts) {
  return accounts.map(toAccountViewModel)
}
