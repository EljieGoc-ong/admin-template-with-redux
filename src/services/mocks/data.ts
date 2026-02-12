import type { User, DashboardData } from '@/types/models'

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
    role: 'manager',
    avatar: 'https://i.pravatar.cc/150?img=2',
    createdAt: '2024-01-02T00:00:00Z',
  },
  {
    id: '3',
    name: 'Bob Wilson',
    email: 'bob@example.com',
    role: 'user',
    avatar: 'https://i.pravatar.cc/150?img=3',
    createdAt: '2024-01-03T00:00:00Z',
  },
]

export const mockDashboardData: DashboardData = {
  stats: {
    totalClients: 43,
    totalProjects: 73,
    paidInvoices: 10600,
    openProjects: 33,
    totalRevenue: 216759,
    ytdRevenue: 216759,
    clientsCount: 49,
    countriesCount: 9,
  },
  revenueData: [
    { month: 'Jan', amount: 15000 },
    { month: 'Feb', amount: 18000 },
    { month: 'Mar', amount: 22000 },
    { month: 'Apr', amount: 19000 },
    { month: 'May', amount: 25000 },
    { month: 'Jun', amount: 28000 },
    { month: 'Jul', amount: 32000 },
    { month: 'Aug', amount: 29000 },
    { month: 'Sep', amount: 35000 },
    { month: 'Oct', amount: 38000 },
    { month: 'Nov', amount: 42000 },
    { month: 'Dec', amount: 45000 },
  ],
  earnings: {
    earning: 18756,
    pending: 5599,
    refund: 4987,
  },
  socialMetrics: [
    { platform: 'Facebook', change: 30, percentage: 30 },
    { platform: 'Twitter', change: -20, percentage: -20 },
    { platform: 'Instagram', change: 30, percentage: 30 },
  ],
  tasks: [
    {
      id: '1',
      title: 'Send the Billing Agreement',
      completed: false,
      scheduledDate: '2019-03-24',
    },
    {
      id: '2',
      title: 'Send over all the documentation',
      completed: false,
      scheduledDate: '2019-03-24',
    },
  ],
}

export const mockAdmin = mockUsers[0]
