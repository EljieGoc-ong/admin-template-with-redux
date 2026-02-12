import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type {
  DashboardStats,
  MonthlyRevenue,
  Earnings,
  SocialMetric,
  Task,
  DashboardData,
} from '@/types/models'

interface DashboardState {
  stats: DashboardStats | null
  revenueData: MonthlyRevenue[]
  earnings: Earnings | null
  socialMetrics: SocialMetric[]
  tasks: Task[]
  lastFetched: number | null
}

const initialState: DashboardState = {
  stats: null,
  revenueData: [],
  earnings: null,
  socialMetrics: [],
  tasks: [],
  lastFetched: null,
}

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    dashboardDataReceived: (state, action: PayloadAction<DashboardData>) => {
      state.stats = action.payload.stats
      state.revenueData = action.payload.revenueData
      state.earnings = action.payload.earnings
      state.socialMetrics = action.payload.socialMetrics
      state.tasks = action.payload.tasks
      state.lastFetched = Date.now()
    },
    taskToggled: (state, action: PayloadAction<string>) => {
      const task = state.tasks.find((t) => t.id === action.payload)
      if (task) {
        task.completed = !task.completed
      }
    },
  },
})

export const { dashboardDataReceived, taskToggled } = dashboardSlice.actions
export default dashboardSlice.reducer
