const defaultProductionApiUrl = 'https://gis-backend-seven.vercel.app'

const resolveApiBaseUrl = () => {
  const envApiUrl = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, '')

  if (envApiUrl) {
    return envApiUrl
  }

  if (import.meta.env.DEV) {
    return ''
  }

  return defaultProductionApiUrl
}

export const apiBaseUrl = resolveApiBaseUrl()

export const request = async (path, options = {}) => {
  const response = await fetch(`${apiBaseUrl}${path}`, options)
  const payload = await response.json()

  if (!response.ok) {
    throw new Error(payload.message || 'Request failed')
  }

  return payload
}
