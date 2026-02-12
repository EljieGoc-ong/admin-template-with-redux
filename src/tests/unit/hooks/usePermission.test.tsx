import { describe, it, expect } from 'vitest'
import { renderHook } from '@testing-library/react'
import { Provider } from 'react-redux'
import { usePermission } from '@/hooks/usePermission'
import { createTestStore } from '@/tests/utils'
import { mockAdmin, mockUser } from '@/tests/fixtures/users'

describe('usePermission', () => {
  it('should check admin permissions', () => {
    const store = createTestStore({
      auth: {
        user: mockAdmin,
        token: 'token',
        isAuthenticated: true,
        permissions: ['users.create', 'users.update', 'users.delete'],
      },
    })

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <Provider store={store}>{children}</Provider>
    )

    const { result } = renderHook(() => usePermission('users.delete'), { wrapper })
    expect(result.current).toBe(true)
  })

  it('should deny permissions for regular users', () => {
    const store = createTestStore({
      auth: {
        user: mockUser,
        token: 'token',
        isAuthenticated: true,
        permissions: ['users.read'],
      },
    })

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <Provider store={store}>{children}</Provider>
    )

    const { result } = renderHook(() => usePermission('users.delete'), { wrapper })
    expect(result.current).toBe(false)
  })
})
