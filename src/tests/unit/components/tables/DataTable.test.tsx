import { describe, it, expect, vi } from 'vitest'
import { screen, fireEvent } from '@testing-library/react'
import { renderWithProviders } from '@/tests/utils'
import { DataTable } from '@/components/tables/DataTable'

describe('DataTable', () => {
  const mockData = [
    { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
  ]

  const columns = [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Role' },
  ]

  it('should render table with data', () => {
    renderWithProviders(<DataTable data={mockData} columns={columns} />)

    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('jane@example.com')).toBeInTheDocument()
  })

  it('should handle sorting', () => {
    const onSort = vi.fn()
    renderWithProviders(
      <DataTable data={mockData} columns={columns} onSort={onSort} />
    )

    const nameHeader = screen.getByText('Name')
    fireEvent.click(nameHeader)

    expect(onSort).toHaveBeenCalledWith('name', 'asc')
  })

  it('should render empty state when no data', () => {
    renderWithProviders(<DataTable data={[]} columns={columns} />)
    expect(screen.getByText(/no data available/i)).toBeInTheDocument()
  })
})
