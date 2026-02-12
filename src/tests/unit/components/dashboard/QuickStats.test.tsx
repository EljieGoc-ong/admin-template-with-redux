import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithProviders } from '@/tests/utils'
import { QuickStats } from '@/components/dashboard/QuickStats'

describe('QuickStats', () => {
  const stats = {
    totalClients: 43,
    paidInvoices: 10600,
    totalProjects: 73,
    openProjects: 33,
  }

  it('should render all stat cards', () => {
    renderWithProviders(<QuickStats {...stats} />)

    expect(screen.getByText('43')).toBeInTheDocument()
    expect(screen.getByText('Total Clients')).toBeInTheDocument()
    expect(screen.getByText('$10,600')).toBeInTheDocument()
    expect(screen.getByText('73')).toBeInTheDocument()
    expect(screen.getByText('33')).toBeInTheDocument()
  })

  it('should apply correct color classes', () => {
    renderWithProviders(<QuickStats {...stats} />)

    // Total Clients card has bg-coral; the label is nested so we find the card ancestor
    const clientsCard = screen
      .getByText('Total Clients')
      .closest('[class*="bg-coral"]')
    expect(clientsCard).toBeInTheDocument()
  })
})
