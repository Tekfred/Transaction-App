import { API_BASE_URL } from './config.js'
import { ApiError, getErrorMessage } from './errors.js'

function buildUrl(path, query) {
  const url = new URL(path, API_BASE_URL)

  Object.entries(query ?? {}).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      url.searchParams.set(key, value)
    }
  })

  return url.toString()
}

async function parseResponse(response, responseType) {
  if (response.status === 204) {
    return null
  }

  if (responseType === 'blob') {
    return response.blob()
  }

  const contentType = response.headers.get('content-type') ?? ''

  if (contentType.includes('application/json')) {
    return response.json()
  }

  return response.text()
}

export async function apiRequest(path, options = {}) {
  const {
    accessToken,
    body,
    headers,
    method = 'GET',
    query,
    responseType = 'json',
    ...fetchOptions
  } = options

  const requestHeaders = new Headers(headers)

  if (accessToken) {
    requestHeaders.set('Authorization', `Bearer ${accessToken}`)
  }

  if (body !== undefined && !(body instanceof FormData)) {
    requestHeaders.set('Content-Type', 'application/json')
  }

  let response

  try {
    response = await fetch(buildUrl(path, query), {
      ...fetchOptions,
      body: body === undefined || body instanceof FormData ? body : JSON.stringify(body),
      headers: requestHeaders,
      method,
    })
  } catch (error) {
    throw new ApiError(
      `Unable to reach the API at ${API_BASE_URL}. Check that the backend is running and CORS allows this frontend.`,
      {
        data: error,
        status: 0,
        statusText: 'Network Error',
      },
    )
  }

  const data = await parseResponse(response, responseType)

  if (!response.ok) {
    throw new ApiError(getErrorMessage(data, response.statusText || 'Request failed'), {
      data,
      status: response.status,
      statusText: response.statusText,
    })
  }

  return data
}
