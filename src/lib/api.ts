import { env } from '@/env/env'

export function api(path: string, init?: RequestInit) {
  const baseURL = env.NEXT_PUBLIC_API_BASE_URL
  const url = new URL(path, baseURL)

  return fetch(url, init)
}
