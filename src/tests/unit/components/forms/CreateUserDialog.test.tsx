import { describe, it, expect, vi } from 'vitest'
import { screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from '@/tests/utils'
import { CreateUserDialog } from '@/components/forms/CreateUserDialog'

describe('CreateUserDialog', () => {
  it('should validate required fields', async () => {
    const onSubmit = vi.fn()
    const onClose = vi.fn()
    renderWithProviders(
      <CreateUserDialog onSubmit={onSubmit} onClose={onClose} />
    )

    const createButton = screen.getByRole('button', { name: /create/i })
    fireEvent.click(createButton)

    await waitFor(() => {
      expect(screen.getByText(/name is required/i)).toBeInTheDocument()
    })
    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('should validate email format', async () => {
    const user = userEvent.setup()
    renderWithProviders(
      <CreateUserDialog onSubmit={vi.fn()} onClose={vi.fn()} />
    )

    await user.type(screen.getByPlaceholderText('John Doe'), 'John Doe')
    await user.type(screen.getByPlaceholderText('john@example.com'), 'invalid-email')
    await user.click(screen.getByRole('button', { name: /create/i }))

    await waitFor(() => {
      expect(screen.getByText(/invalid email format/i)).toBeInTheDocument()
    })
  })

  it('should submit valid form data', async () => {
    const onSubmit = vi.fn().mockResolvedValue(undefined)
    const user = userEvent.setup()
    renderWithProviders(
      <CreateUserDialog onSubmit={onSubmit} onClose={vi.fn()} />
    )

    await user.type(screen.getByPlaceholderText('John Doe'), 'John Doe')
    await user.type(screen.getByPlaceholderText('john@example.com'), 'john@example.com')
    await user.selectOptions(screen.getByRole('combobox'), 'admin')
    await user.click(screen.getByRole('button', { name: /create/i }))

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        name: 'John Doe',
        email: 'john@example.com',
        role: 'admin',
      })
    })
  })
})
