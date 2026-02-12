import { describe, it, expect } from 'vitest'
import authReducer, { setCredentials, logout } from '@/store/slices/authSlice'
import type { User } from '@/types/models'

const mockUser: User = {
  id: '1',
  name: 'Test User',
  email: 'test@example.com',
  role: 'admin',
  createdAt: '2024-01-01T00:00:00Z',
}

describe('authSlice', () => {
  it('should have correct initial state', () => {
    const state = authReducer(undefined, { type: 'unknown' })
    expect(state.user).toBeNull()
    expect(state.token).toBeNull()
    expect(state.isAuthenticated).toBe(false)
    expect(state.permissions).toEqual([])
  })

  it('should handle setCredentials', () => {
    const state = authReducer(
      undefined,
      setCredentials({ user: mockUser, token: 'jwt-token' })
    )
    expect(state.user).toEqual(mockUser)
    expect(state.token).toBe('jwt-token')
    expect(state.isAuthenticated).toBe(true)
    expect(state.permissions.length).toBeGreaterThan(0)
  })

  it('should handle logout', () => {
    const authenticatedState = authReducer(
      undefined,
      setCredentials({ user: mockUser, token: 'jwt-token' })
    )
    const state = authReducer(authenticatedState, logout())
    expect(state.user).toBeNull()
    expect(state.token).toBeNull()
    expect(state.isAuthenticated).toBe(false)
    expect(state.permissions).toEqual([])
  })
})
