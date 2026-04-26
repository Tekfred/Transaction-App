export const transfers = [
  {
    id: 'transfer-001',
    fromAccountId: 'checking-main',
    toAccountId: 'savings-emergency',
    title: 'Internal Transfer',
    amount: 500,
    currency: 'USD',
    status: 'pending',
    description: 'Move money between your checking and savings accounts.',
    scheduledDate: '2026-04-28',
    frequency: 'One-time',
  },
]

export const transferDraft = {
  fromAccountId: 'checking-main',
  toAccountId: 'savings-emergency',
  amount: 250,
  currency: 'USD',
  memo: 'Savings goal',
  frequency: 'One-time',
}
