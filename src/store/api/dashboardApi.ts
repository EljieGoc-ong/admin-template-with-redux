import { baseApi } from './baseApi'
import { dashboardDataReceived } from '../slices/dashboardSlice'
import type { DashboardData } from '@/types/models'

interface GetDashboardResponse {
  dashboard: DashboardData
}

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboard: builder.query<GetDashboardResponse, void>({
      query: () => ({
        query: `
          query GetDashboard {
            dashboard {
              stats {
                totalClients totalProjects paidInvoices openProjects
                totalRevenue ytdRevenue clientsCount countriesCount
              }
              revenueData { month amount }
              earnings { earning pending refund }
              socialMetrics { platform change percentage }
              tasks { id title completed scheduledDate }
            }
          }
        `,
      }),
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(dashboardDataReceived(data.dashboard))
        } catch {
          // Error handled by query
        }
      },
      providesTags: ['Dashboard'],
      keepUnusedDataFor: 600,
    }),
  }),
})

export const { useGetDashboardQuery } = dashboardApi
