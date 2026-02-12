import { describe, it, expect } from 'vitest'
import usersReducer, {
  userAdded,
  userUpdated,
  userDeleted,
  usersReceived,
} from '@/store/slices/usersSlice'
import type { User } from '@/types/models'

describe('usersSlice', () => {
  const getInitialState = () =>
    usersReducer(undefined, { type: 'unknown' })

  it('should handle usersReceived', () => {
    const users: User[] = [
      { id: '1', name: 'John', email: 'john@test.com', role: 'admin', createdAt: '2024-01-01' },
      { id: '2', name: 'Jane', email: 'jane@test.com', role: 'user', createdAt: '2024-01-02' },
    ]

    const state = usersReducer(getInitialState(), usersReceived(users))

    expect(state.ids).toHaveLength(2)
    expect(state.entities['1']).toEqual(users[0])
    expect(state.lastFetched).toBeTruthy()
  })

  it('should handle optimistic userAdded', () => {
    const newUser: User = {
      id: '3',
      name: 'Bob',
      email: 'bob@test.com',
      role: 'user',
      createdAt: new Date().toISOString(),
    }
    const state = usersReducer(getInitialState(), userAdded(newUser))

    expect(state.ids).toContain('3')
    expect(state.entities['3']).toEqual(newUser)
  })

  it('should handle optimistic userUpdated', () => {
    const initialState = getInitialState()
    const user: User = {
      id: '1',
      name: 'John',
      email: 'john@test.com',
      role: 'user',
      createdAt: '2024-01-01',
    }
    const stateWithUser = usersReducer(initialState, userAdded(user))

    const state = usersReducer(
      stateWithUser,
      userUpdated({ id: '1', changes: { role: 'admin' } })
    )

    expect(state.entities['1']?.role).toBe('admin')
  })

  it('should handle optimistic userDeleted', () => {
    const users: User[] = [
      { id: '1', name: 'John', email: 'j@test.com', role: 'user', createdAt: '2024-01-01' },
      { id: '2', name: 'Jane', email: 'j@test.com', role: 'user', createdAt: '2024-01-02' },
    ]
    const stateWithUsers = usersReducer(getInitialState(), usersReceived(users))

    const state = usersReducer(stateWithUsers, userDeleted('1'))

    expect(state.ids).not.toContain('1')
    expect(state.entities['1']).toBeUndefined()
  })
})
