import axios from 'axios'
import useSWR from 'swr'

export function useFetch<T>(url: string, params?: {}) {
  return useSWR<T>(
    url,
    async (url) => {
      const { data } = await axios.get(url, {
        params,
      })
      return data
    },
    { refreshInterval: 1000 * 60 * 60 },
  )
}
