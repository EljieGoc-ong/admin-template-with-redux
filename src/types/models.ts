export type Role = 'admin' | 'manager' | 'user'

export interface User {
  id: string
  name: string
  email: string
  role: Role
  avatar?: string
  createdAt: string
}

export interface DashboardStats {
  totalClients: number
  totalProjects: number
  paidInvoices: number
  openProjects: number
  totalRevenue: number
  ytdRevenue: number
  clientsCount: number
  countriesCount: number
}

export interface MonthlyRevenue {
  month: string
  amount: number
}

export interface Earnings {
  earning: number
  pending: number
  refund: number
}

export interface SocialMetric {
  platform: string
  change: number
  percentage: number
}

export interface Task {
  id: string
  title: string
  completed: boolean
  scheduledDate: string
}

export interface DashboardData {
  stats: DashboardStats
  revenueData: MonthlyRevenue[]
  earnings: Earnings
  socialMetrics: SocialMetric[]
  tasks: Task[]
}

export interface CreateUserInput {
  name: string
  email: string
  role: Role
  avatar?: string
}

export interface UpdateUserInput {
  name?: string
  email?: string
  role?: Role
  avatar?: string
}

export interface AuthPayload {
  user: User
  token: string
}
