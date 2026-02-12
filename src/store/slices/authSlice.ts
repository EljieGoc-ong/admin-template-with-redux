import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { User } from '@/types/models'
import { getRolePermissions } from '@/utils/permissions'

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  permissions: string[]
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  permissions: [],
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.user = action.payload.user
      state.token = action.payload.token
      state.isAuthenticated = true
      state.permissions = getRolePermissions(action.payload.user.role)
    },
    logout: (state) => {
      state.user = null
      state.token = null
      state.isAuthenticated = false
      state.permissions = []
    },
  },
})

export const { setCredentials, logout } = authSlice.actions
export default authSlice.reducer
