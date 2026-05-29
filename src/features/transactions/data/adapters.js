export function toTransactionViewModel(transaction) {
  const isDeposit = transaction.transactionType === 'deposit'
  const isBillPayment = transaction.transactionType === 'bill_payment'
  const isTransfer = transaction.transactionType === 'transfer'

  return {
    accountId: transaction.receiverAccountId ?? transaction.senderAccountId,
    amount:
      (isTransfer || isBillPayment) && transaction.senderAccountId
        ? -transaction.amount
        : transaction.amount,
    category: transaction.transactionTypeLabel ?? transaction.transactionType ?? 'Transaction',
    currency: transaction.currency ?? 'USD',
    date: transaction.processedAt ?? transaction.createdAt,
    id: transaction.id,
    merchant:
      transaction.narration ||
      transaction.sourceLabel ||
      (isDeposit
        ? 'Deposit'
        : isBillPayment
          ? 'Bill Payment'
          : isTransfer
            ? 'Transfer'
            : 'Transaction'),
    reference: transaction.reference,
    status: transaction.status,
  }
}

export function toTransactionViewModels(transactions) {
  return transactions.map(toTransactionViewModel)
}
