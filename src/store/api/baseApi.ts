import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { RootState } from '@/store'

interface GraphQLRequest {
  query: string
  variables?: Record<string, unknown>
}

// In Vitest (jsdom), fetch needs absolute URL - relative fails in Node's undici
const baseUrl = import.meta.env.VITEST ? 'http://localhost' : '/'
const graphqlBaseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token
    if (token) {
      headers.set('authorization', `Bearer ${token}`)
    }
    headers.set('Content-Type', 'application/json')
    return headers
  },
})

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: async (args: GraphQLRequest, api, extraOptions) => {
    const result = await graphqlBaseQuery(
      {
        url: '/graphql',
        method: 'POST',
        body: { query: args.query, variables: args.variables ?? {} },
      } as Parameters<typeof graphqlBaseQuery>[0],
      api,
      extraOptions
    )
    if (result.data && typeof result.data === 'object' && 'data' in result.data) {
      return { data: (result.data as { data: unknown }).data }
    }
    return result
  },
  tagTypes: ['User', 'Dashboard', 'Auth'],
  endpoints: () => ({}),
})
