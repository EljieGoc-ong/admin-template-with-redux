import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { Routes, Route } from 'react-router-dom'
import { renderWithProviders } from '@/tests/utils'
import ProtectedRoute from '@/components/ProtectedRoute'

function DashboardPage() {
  return <div>Dashboard</div>
}

describe('ProtectedRoutes', () => {
  it('should redirect to login when not authenticated', () => {
    renderWithProviders(
      <Routes>
        <Route path="/login" element={<div>Login Page</div>} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<DashboardPage />} />
        </Route>
      </Routes>,
      {
        preloadedState: {
          auth: {
            user: null,
            token: null,
            isAuthenticated: false,
            permissions: [],
          },
        },
        initialEntries: ['/'],
      }
    )
    expect(screen.getByText('Login Page')).toBeInTheDocument()
  })

  it('should allow access when authenticated', () => {
    renderWithProviders(
      <Routes>
        <Route path="/login" element={<div>Login Page</div>} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<DashboardPage />} />
        </Route>
      </Routes>,
      {
        preloadedState: {
          auth: {
            user: {
              id: '1',
              name: 'Test',
              email: 'test@test.com',
              role: 'admin',
              createdAt: '',
            },
            token: 'token',
            isAuthenticated: true,
            permissions: [],
          },
        },
        initialEntries: ['/'],
      }
    )
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
  })
})
