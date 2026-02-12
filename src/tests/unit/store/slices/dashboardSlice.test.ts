import { describe, it, expect } from 'vitest'
import dashboardReducer, {
  dashboardDataReceived,
  taskToggled,
} from '@/store/slices/dashboardSlice'
import { mockDashboardData } from '@/tests/fixtures/dashboard'

describe('dashboardSlice', () => {
  it('should have correct initial state', () => {
    const state = dashboardReducer(undefined, { type: 'unknown' })
    expect(state.stats).toBeNull()
    expect(state.revenueData).toEqual([])
    expect(state.earnings).toBeNull()
    expect(state.socialMetrics).toEqual([])
    expect(state.tasks).toEqual([])
    expect(state.lastFetched).toBeNull()
  })

  it('should handle dashboardDataReceived', () => {
    const state = dashboardReducer(
      undefined,
      dashboardDataReceived(mockDashboardData)
    )
    expect(state.stats).toEqual(mockDashboardData.stats)
    expect(state.revenueData).toEqual(mockDashboardData.revenueData)
    expect(state.earnings).toEqual(mockDashboardData.earnings)
    expect(state.socialMetrics).toEqual(mockDashboardData.socialMetrics)
    expect(state.tasks).toEqual(mockDashboardData.tasks)
    expect(state.lastFetched).toBeTruthy()
  })

  it('should handle taskToggled', () => {
    const withData = dashboardReducer(
      undefined,
      dashboardDataReceived(mockDashboardData)
    )
    const taskId = mockDashboardData.tasks[0]?.id
    if (!taskId) return

    const state = dashboardReducer(withData, taskToggled(taskId))
    const toggledTask = state.tasks.find((t) => t.id === taskId)
    expect(toggledTask?.completed).toBe(!mockDashboardData.tasks[0]?.completed)
  })
})
