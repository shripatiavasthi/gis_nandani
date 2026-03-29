export const apiBaseUrl = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, '') || ''

export const request = async (path, options = {}) => {
  const response = await fetch(`${apiBaseUrl}${path}`, options)
  const payload = await response.json()

  if (!response.ok) {
    throw new Error(payload.message || 'Request failed')
  }

  return payload
}
