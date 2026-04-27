export class ApiError extends Error {
  constructor(message, { data = null, status = 0, statusText = '' } = {}) {
    super(message)
    this.name = 'ApiError'
    this.data = data
    this.status = status
    this.statusText = statusText
  }
}

export function getErrorMessage(data, fallback) {
  if (!data) {
    return fallback
  }

  if (typeof data === 'string') {
    return data
  }

  if (data.detail) {
    return data.detail
  }

  if (data.message) {
    return data.message
  }

  return fallback
}
