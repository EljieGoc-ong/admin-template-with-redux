import { useState, useEffect } from 'react'
import { useAppSelector } from '@/hooks/useAppSelector'
import { useGetDashboardQuery } from '@/store/api/dashboardApi'
import { QuickStats } from '@/components/dashboard/QuickStats'
import { TotalRevenueCard } from '@/components/dashboard/TotalRevenueCard'
import { StatisticsChart } from '@/components/dashboard/StatisticsChart'
import { EarningsCard } from '@/components/dashboard/EarningsCard'
import { SocialMediaCard } from '@/components/dashboard/SocialMediaCard'
import { TasksCard } from '@/components/dashboard/TasksCard'

function DashboardSkeleton() {
  return (
    <div className="animate-pulse space-y-6">
      <div className="h-24 bg-gray-200 rounded" />
      <div className="h-64 bg-gray-200 rounded" />
      <div className="h-48 bg-gray-200 rounded" />
    </div>
  )
}

export default function Dashboard() {
  useGetDashboardQuery()
  const dashboardData = useAppSelector((state) => state.dashboard)
  const hasData = Boolean(dashboardData.stats)
  const [readyToShow, setReadyToShow] = useState(false)

  // Ensure skeleton paints before content: wait 2 frames + 100ms min
  useEffect(() => {
    let cancelled = false
    let timerId: ReturnType<typeof setTimeout>
    const rafId = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        timerId = setTimeout(() => {
          if (!cancelled) setReadyToShow(true)
        }, 100)
      })
    })
    return () => {
      cancelled = true
      cancelAnimationFrame(rafId)
      clearTimeout(timerId)
    }
  }, [])

  if (!readyToShow || !hasData) {
    return <DashboardSkeleton />
  }

  const stats = dashboardData.stats!

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>

      <QuickStats
        totalClients={stats.totalClients}
        paidInvoices={stats.paidInvoices}
        totalProjects={stats.totalProjects}
        openProjects={stats.openProjects}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TotalRevenueCard
          totalRevenue={stats.totalRevenue}
          clientsCount={stats.clientsCount}
          countriesCount={stats.countriesCount}
          revenueData={dashboardData.revenueData}
        />
        <div className="space-y-6">
          <StatisticsChart data={dashboardData.revenueData} />
          {dashboardData.earnings && (
            <EarningsCard earnings={dashboardData.earnings} />
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SocialMediaCard metrics={dashboardData.socialMetrics} />
        <TasksCard />
      </div>
    </div>
  )
}
