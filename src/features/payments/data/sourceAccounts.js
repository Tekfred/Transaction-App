export function isBillPaymentSourceAccount(account) {
  return ['checking', 'savings'].includes(String(account.type ?? '').toLowerCase())
}
