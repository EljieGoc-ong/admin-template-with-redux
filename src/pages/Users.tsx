import { useState, useMemo } from 'react'
import { useAppSelector } from '@/hooks/useAppSelector'
import {
  useGetUsersQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} from '@/store/api/usersApi'
import { selectAllUsers } from '@/store/slices/usersSlice'
import { DataTable, type ColumnDef } from '@/components/tables/DataTable'
import { UserFormDialog } from '@/components/forms/UserFormDialog'
import { CreateUserDialog } from '@/components/forms/CreateUserDialog'
import type { User, UpdateUserInput, CreateUserInput } from '@/types/models'

export default function Users() {
  const { isLoading } = useGetUsersQuery()
  const users = useAppSelector(selectAllUsers)
  const [createUser] = useCreateUserMutation()
  const [updateUser] = useUpdateUserMutation()
  const [deleteUser] = useDeleteUserMutation()
  const [sortKey, setSortKey] = useState<string>('name')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  const [editUser, setEditUser] = useState<User | null>(null)
  const [showCreate, setShowCreate] = useState(false)

  const sortedUsers = useMemo(() => {
    const sorted = [...users]
    sorted.sort((a, b) => {
      const aVal = a[sortKey as keyof User] ?? ''
      const bVal = b[sortKey as keyof User] ?? ''
      if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1
      if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1
      return 0
    })
    return sorted
  }, [users, sortKey, sortDirection])

  const columns: ColumnDef<User>[] = [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'role', label: 'Role', sortable: true },
    {
      key: 'createdAt',
      label: 'Created',
      sortable: true,
      render: (val) => new Date(val as string).toLocaleDateString(),
    },
  ]

  const handleSort = (key: string, direction: 'asc' | 'desc') => {
    setSortKey(key)
    setSortDirection(direction)
  }

  const handleUpdate = async (id: string, input: UpdateUserInput) => {
    await updateUser({ id, input })
    setEditUser(null)
  }

  const handleDelete = async (user: User) => {
    if (window.confirm(`Delete ${user.name}?`)) {
      await deleteUser(user.id)
    }
  }

  const handleCreate = async (data: CreateUserInput) => {
    await createUser(data)
    setShowCreate(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Users</h1>
        <button
          onClick={() => setShowCreate(true)}
          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
        >
          Add User
        </button>
      </div>
      <DataTable
        data={sortedUsers}
        columns={columns}
        onSort={handleSort}
        sortKey={sortKey}
        sortDirection={sortDirection}
        onEdit={(user) => setEditUser(user)}
        onDelete={handleDelete}
        loading={isLoading}
      />
      {editUser && (
        <UserFormDialog
          user={editUser}
          onClose={() => setEditUser(null)}
          onSubmit={(data) => handleUpdate(editUser.id, data)}
        />
      )}
      {showCreate && (
        <CreateUserDialog
          onClose={() => setShowCreate(false)}
          onSubmit={handleCreate}
        />
      )}
    </div>
  )
}
