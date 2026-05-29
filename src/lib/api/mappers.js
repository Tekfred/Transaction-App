export function mapUser(apiUser) {
  return {
    accounts: apiUser.accounts?.map(mapAccount) ?? [],
    email: apiUser.email,
    firstName: apiUser.first_name,
    id: apiUser.id,
    isActive: apiUser.is_active,
    isStaff: apiUser.is_staff,
    lastName: apiUser.last_name,
  }
}

export function mapAccount(apiAccount) {
  return {
    accountNumber: apiAccount.account_number,
    accountType: apiAccount.account_type,
    accountTypeLabel: apiAccount.account_type_display,
    balance: Number(apiAccount.balance),
    createdAt: apiAccount.created_at,
    id: apiAccount.id ?? apiAccount.account_id,
    isActive: apiAccount.is_active,
    routingNumber: '', // Add routingNumber as empty string since we don't have it from API
  }
}

export function mapAccountsSummary(apiSummary) {
  return {
    accounts: apiSummary.accounts?.map(mapAccount) ?? [],
    totalBalance: Number(apiSummary.total_balance),
  }
}

export function mapTransaction(apiTransaction) {
  return {
    amount: Number(apiTransaction.amount),
    currency: apiTransaction.currency ?? 'USD',
    createdAt: apiTransaction.created_at,
    id: apiTransaction.id,
    narration: apiTransaction.narration,
    processedAt: apiTransaction.processed_at,
    receiverAccountId: apiTransaction.receiver_account_id,
    receiverAccountNumber: apiTransaction.receiver_account_number,
    receiverAccountType: apiTransaction.receiver_account_type,
    reference: apiTransaction.reference,
    senderAccountId: apiTransaction.sender_account_id,
    senderAccountNumber: apiTransaction.sender_account_number,
    senderAccountType: apiTransaction.sender_account_type,
    source: apiTransaction.source,
    sourceLabel: apiTransaction.source_display,
    status: apiTransaction.status,
    statusLabel: apiTransaction.status_display,
    transactionType: apiTransaction.transaction_type,
    transactionTypeLabel: apiTransaction.transaction_type_display,
  }
}

export function mapDepositCheckout(apiCheckout) {
  return {
    checkoutSessionId: apiCheckout.checkout_session_id,
    checkoutUrl: apiCheckout.checkout_url,
    reference: apiCheckout.reference,
    status: apiCheckout.status,
  }
}
