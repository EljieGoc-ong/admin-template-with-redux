import { baseApi } from './baseApi'
import { userAdded, userUpdated, userDeleted, usersReceived } from '../slices/usersSlice'
import { selectUserById } from '../slices/usersSlice'
import type { User, CreateUserInput, UpdateUserInput } from '@/types/models'

interface GetUsersResponse {
  users: User[]
}

interface CreateUserResponse {
  createUser: User
}

interface UpdateUserResponse {
  updateUser: User
}

export const usersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<GetUsersResponse, void>({
      query: () => ({
        query: `
          query GetUsers {
            users {
              id name email role avatar createdAt
            }
          }
        `,
      }),
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(usersReceived(data.users))
        } catch {
          // Error handled by query
        }
      },
      providesTags: ['User'],
    }),

    createUser: builder.mutation<CreateUserResponse, CreateUserInput>({
      query: (input) => ({
        query: `
          mutation CreateUser($input: CreateUserInput!) {
            createUser(input: $input) {
              id name email role avatar createdAt
            }
          }
        `,
        variables: { input },
      }),
      async onQueryStarted(input, { dispatch, queryFulfilled }) {
        const tempId = `temp-${Date.now()}`
        const optimisticUser: User = {
          id: tempId,
          ...input,
          createdAt: new Date().toISOString(),
        }
        dispatch(userAdded(optimisticUser))

        try {
          const { data } = await queryFulfilled
          dispatch(userDeleted(tempId))
          dispatch(userAdded(data.createUser))
        } catch {
          dispatch(userDeleted(tempId))
        }
      },
      invalidatesTags: ['User'],
    }),

    updateUser: builder.mutation<UpdateUserResponse, { id: string; input: UpdateUserInput }>({
      query: ({ id, input }) => ({
        query: `
          mutation UpdateUser($id: ID!, $input: UpdateUserInput!) {
            updateUser(id: $id, input: $input) {
              id name email role avatar createdAt
            }
          }
        `,
        variables: { id, input },
      }),
      async onQueryStarted({ id, input }, { dispatch, queryFulfilled, getState }) {
        const previousUser = selectUserById(getState() as import('@/store').RootState, id)
        dispatch(userUpdated({ id, changes: input }))

        try {
          const { data } = await queryFulfilled
          dispatch(userUpdated({ id, changes: data.updateUser }))
        } catch {
          if (previousUser) {
            dispatch(userUpdated({ id, changes: previousUser }))
          }
        }
      },
      invalidatesTags: ['User'],
    }),

    deleteUser: builder.mutation<{ deleteUser: boolean }, string>({
      query: (id) => ({
        query: `
          mutation DeleteUser($id: ID!) {
            deleteUser(id: $id)
          }
        `,
        variables: { id },
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled, getState }) {
        const previousUser = selectUserById(getState() as import('@/store').RootState, id)
        dispatch(userDeleted(id))

        try {
          await queryFulfilled
        } catch {
          if (previousUser) {
            dispatch(userAdded(previousUser))
          }
        }
      },
      invalidatesTags: ['User'],
    }),
  }),
})

export const {
  useGetUsersQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = usersApi
