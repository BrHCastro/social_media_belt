import axios from 'axios'

import { env } from '~/env'

export const api = axios.create({
  baseURL: env.API_URL,
})

type FetchAPITypeRequest = {
  path: string
  query?: object
}

export async function fetchAPI<T = unknown>({
  path,
  query,
}: FetchAPITypeRequest) {
  const { data } = await api.get<T>(path, { params: query })

  if (!data) {
    throw new Error(`API call to ${path} failed`)
  }

  return data
}
