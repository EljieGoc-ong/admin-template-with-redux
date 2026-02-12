import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithProviders } from '@/tests/utils'
import { Sidebar } from '@/components/layout/Sidebar'

describe('Sidebar', () => {
  it('should render navigation links', () => {
    renderWithProviders(<Sidebar />, {
      preloadedState: {
        auth: {
          user: { id: '1', name: 'Test', email: 't@t.com', role: 'admin', createdAt: '' },
          token: 't',
          isAuthenticated: true,
          permissions: [],
        },
      },
    })
    expect(screen.getByText('Dashboards')).toBeInTheDocument()
    expect(screen.getByText('Users')).toBeInTheDocument()
    expect(screen.getByText('Analytics')).toBeInTheDocument()
    expect(screen.getByText('Crema Demo')).toBeInTheDocument()
  })
})
