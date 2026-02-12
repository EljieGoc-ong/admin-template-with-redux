import { baseApi } from './baseApi'
import { setCredentials } from '../slices/authSlice'
import type { AuthPayload } from '@/types/models'

interface LoginCredentials {
  email: string
  password: string
}

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<{ login: AuthPayload }, LoginCredentials>({
      query: ({ email, password }) => ({
        query: `
          mutation Login($email: String!, $password: String!) {
            login(email: $email, password: $password) {
              user { id name email role avatar createdAt }
              token
            }
          }
        `,
        variables: { email, password },
      }),
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(setCredentials(data.login))
        } catch {
          // Error handled by mutation
        }
      },
      invalidatesTags: ['Auth'],
    }),
  }),
})

export const { useLoginMutation } = authApi
