export const transfers = [
  {
    id: 'transfer-001',
    fromAccountId: 'checking-main',
    receiverAccountNumber: '9174',
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
  receiverAccountNumber: '',
  amount: 250,
  currency: 'USD',
  memo: 'Savings goal',
  frequency: 'One-time',
}
