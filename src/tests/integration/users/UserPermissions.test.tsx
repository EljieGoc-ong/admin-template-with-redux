import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithProviders } from '@/tests/utils'
import { PermissionGate } from '@/components/PermissionGate'

describe('User Permissions Integration', () => {
  it('should show content when user has permission', () => {
    renderWithProviders(
      <PermissionGate permission="users.delete">
        <button>Delete</button>
      </PermissionGate>,
      {
        preloadedState: {
          auth: {
            user: { id: '1', name: 'Admin', email: 'a@a.com', role: 'admin', createdAt: '' },
            token: 't',
            isAuthenticated: true,
            permissions: ['users.delete', 'users.read'],
          },
        },
      }
    )
    expect(screen.getByRole('button', { name: 'Delete' })).toBeInTheDocument()
  })

  it('should hide content when user lacks permission', () => {
    renderWithProviders(
      <PermissionGate permission="users.delete">
        <button>Delete</button>
      </PermissionGate>,
      {
        preloadedState: {
          auth: {
            user: { id: '2', name: 'User', email: 'u@u.com', role: 'user', createdAt: '' },
            token: 't',
            isAuthenticated: true,
            permissions: ['users.read'],
          },
        },
      }
    )
    expect(screen.queryByRole('button', { name: 'Delete' })).not.toBeInTheDocument()
  })

  it('should render fallback when user lacks permission', () => {
    renderWithProviders(
      <PermissionGate permission="users.delete" fallback={<span>No access</span>}>
        <button>Delete</button>
      </PermissionGate>,
      {
        preloadedState: {
          auth: {
            user: { id: '2', name: 'User', email: 'u@u.com', role: 'user', createdAt: '' },
            token: 't',
            isAuthenticated: true,
            permissions: ['users.read'],
          },
        },
      }
    )
    expect(screen.getByText('No access')).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Delete' })).not.toBeInTheDocument()
  })
})
