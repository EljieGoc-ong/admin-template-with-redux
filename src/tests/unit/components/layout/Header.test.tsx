import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithProviders } from '@/tests/utils'
import { Header } from '@/components/layout/Header'

describe('Header', () => {
  it('should render search, user info and logout', () => {
    renderWithProviders(<Header />, {
      preloadedState: {
        auth: {
          user: {
            id: '1',
            name: 'John Doe',
            email: 'john@example.com',
            role: 'admin',
            createdAt: '',
          },
          token: 't',
          isAuthenticated: true,
          permissions: [],
        },
      },
    })
    expect(screen.getByPlaceholderText('Q Search...')).toBeInTheDocument()
    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('Logout')).toBeInTheDocument()
  })
})
