import { apiRequest } from './client.js'
import { mapTransaction } from './mappers.js'

export async function createTransfer(accessToken, transfer) {
  const response = await apiRequest('/api/transactions/transfers/', {
    accessToken,
    body: {
      amount: String(transfer.amount),
      narration: transfer.narration,
      receiver_account_number: transfer.receiverAccountNumber,
      sender_account_id: transfer.senderAccountId,
    },
    method: 'POST',
  })

  return mapTransaction(response)
}
