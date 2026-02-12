import { describe, it, expect } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import { renderWithProviders } from '@/tests/utils'
import Dashboard from '@/pages/Dashboard'

describe('Dashboard Loading', () => {
  it('should eventually display dashboard content', async () => {
    renderWithProviders(<Dashboard />, {
      preloadedState: {
        auth: {
          user: { id: '1', name: 'Admin', email: 'admin@example.com', role: 'admin', createdAt: '' },
          token: 'token',
          isAuthenticated: true,
          permissions: [],
        },
      },
      initialEntries: ['/'],
    })

    await waitFor(
      () => {
        expect(screen.getByText('Dashboard')).toBeInTheDocument()
        expect(screen.getByText('Total Clients')).toBeInTheDocument()
        expect(screen.getByText('Quick Statistics')).toBeInTheDocument()
      },
      { timeout: 3000 }
    )
  })
})
