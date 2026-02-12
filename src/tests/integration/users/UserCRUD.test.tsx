import { describe, it, expect } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from '@/tests/utils'
import Users from '@/pages/Users'

describe('User CRUD Integration', () => {
  it('should display users list after fetch', async () => {
    renderWithProviders(<Users />, {
      preloadedState: {
        auth: {
          user: { id: '1', name: 'Admin', email: 'admin@example.com', role: 'admin', createdAt: '' },
          token: 'token',
          isAuthenticated: true,
          permissions: ['users.read', 'users.create', 'users.update', 'users.delete'],
        },
      },
      initialEntries: ['/users'],
    })

    await waitFor(() => {
      expect(screen.getByText('Users')).toBeInTheDocument()
    })

    // MSW returns mock users - at least one should appear
    await waitFor(() => {
      const rows = screen.getAllByRole('row')
      expect(rows.length).toBeGreaterThan(1)
    })
  })

  it('should open create user dialog when Add User clicked', async () => {
    const user = userEvent.setup()
    renderWithProviders(<Users />, {
      preloadedState: {
        auth: {
          user: { id: '1', name: 'Admin', email: 'admin@example.com', role: 'admin', createdAt: '' },
          token: 'token',
          isAuthenticated: true,
          permissions: [],
        },
      },
      initialEntries: ['/users'],
    })

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /add user/i })).toBeInTheDocument()
    })

    await user.click(screen.getByRole('button', { name: /add user/i }))

    await waitFor(() => {
      expect(screen.getByText('Create User')).toBeInTheDocument()
    })
  })
})
