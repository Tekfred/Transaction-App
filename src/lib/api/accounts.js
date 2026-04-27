import { apiRequest } from './client.js'
import { mapAccount, mapAccountsSummary } from './mappers.js'

export async function getAccounts(accessToken) {
  const response = await apiRequest('/api/accounts/', {
    accessToken,
  })

  return response.map(mapAccount)
}

export async function getAccountsSummary(accessToken) {
  const response = await apiRequest('/api/accounts/summary/', {
    accessToken,
  })

  return mapAccountsSummary(response)
}
