import { apiRequest } from './client.js'
import { mapTransaction } from './mappers.js'

export async function getTransactions(accessToken, filters = {}) {
  const response = await apiRequest('/api/transactions/', {
    accessToken,
    query: {
      account_id: filters.accountId,
      status: filters.status,
      transaction_type: filters.transactionType,
    },
  })

  return response.map(mapTransaction)
}

export async function getTransactionReceipt(accessToken, transactionId) {
  const response = await apiRequest(`/api/transactions/${transactionId}/receipt/`, {
    accessToken,
  })

  return mapTransaction(response)
}

export function getTransactionReceiptPdf(accessToken, transactionId) {
  return apiRequest(`/api/transactions/${transactionId}/receipt/pdf/`, {
    accessToken,
    responseType: 'blob',
  })
}
