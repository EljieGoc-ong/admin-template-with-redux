import type { User } from '@/types/models'

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'admin',
    avatar: 'https://i.pravatar.cc/150?img=1',
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'user',
    avatar: 'https://i.pravatar.cc/150?img=2',
    createdAt: '2024-01-02T00:00:00Z',
  },
]

export const mockAdmin = mockUsers[0]
export const mockUser = mockUsers[1]
