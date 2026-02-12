import { createSlice, createEntityAdapter, PayloadAction } from '@reduxjs/toolkit'
import type { User } from '@/types/models'
import type { RootState } from '@/store'

const usersAdapter = createEntityAdapter<User>({
  sortComparer: (a, b) => a.name.localeCompare(b.name),
})

const usersSlice = createSlice({
  name: 'users',
  initialState: usersAdapter.getInitialState({
    loading: false,
    lastFetched: null as number | null,
  }),
  reducers: {
    userAdded: usersAdapter.addOne,
    userUpdated: usersAdapter.updateOne,
    userDeleted: usersAdapter.removeOne,
    usersReceived: (state, action: PayloadAction<User[]>) => {
      usersAdapter.setAll(state, action.payload)
      state.lastFetched = Date.now()
    },
  },
})

export const { userAdded, userUpdated, userDeleted, usersReceived } = usersSlice.actions
export default usersSlice.reducer

export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
  selectIds: selectUserIds,
} = usersAdapter.getSelectors((state: RootState) => state.users)
