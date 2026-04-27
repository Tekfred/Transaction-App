import { apiRequest } from './client.js'
import { mapDepositCheckout } from './mappers.js'

export async function initiateDeposit(accessToken, deposit) {
  const response = await apiRequest('/api/transactions/deposits/initiate/', {
    accessToken,
    body: {
      account_id: deposit.accountId,
      amount: String(deposit.amount),
    },
    method: 'POST',
  })

  return mapDepositCheckout(response)
}
