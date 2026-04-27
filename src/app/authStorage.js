const AUTH_STORAGE_KEY = 'transaction_app_auth'

export function loadStoredAuth() {
  try {
    const storedAuth = window.localStorage.getItem(AUTH_STORAGE_KEY)
    return storedAuth ? JSON.parse(storedAuth) : null
  } catch {
    return null
  }
}

export function storeAuth(auth) {
  window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(auth))
}

export function clearStoredAuth() {
  window.localStorage.removeItem(AUTH_STORAGE_KEY)
}
