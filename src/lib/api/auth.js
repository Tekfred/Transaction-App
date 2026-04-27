import { apiRequest } from './client.js'
import { mapUser } from './mappers.js'

export async function login(credentials) {
  const response = await apiRequest('/api/auth/login/', {
    body: credentials,
    method: 'POST',
  })

  return {
    accessToken: response.access,
    refreshToken: response.refresh,
    user: mapUser(response.user),
  }
}

export async function refreshAccessToken(refreshToken) {
  const response = await apiRequest('/api/auth/refresh/', {
    body: {
      refresh: refreshToken,
    },
    method: 'POST',
  })

  return response.access
}

export function logout({ accessToken, refreshToken }) {
  return apiRequest('/api/auth/logout/', {
    accessToken,
    body: {
      refresh: refreshToken,
    },
    method: 'POST',
  })
}

export async function getCurrentUser(accessToken) {
  const response = await apiRequest('/api/auth/me/', {
    accessToken,
  })

  return mapUser(response)
}
