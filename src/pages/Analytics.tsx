function AnalyticsSkeleton() {
  return (
    <div className="space-y-6">
      <div className="h-8 w-40 bg-gray-200 rounded animate-pulse" />
      <div className="h-64 bg-gray-200 rounded-lg animate-pulse" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="h-48 bg-gray-200 rounded-lg animate-pulse" />
        <div className="h-48 bg-gray-200 rounded-lg animate-pulse" />
      </div>
    </div>
  )
}

export default function Analytics() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Analytics</h1>
      <AnalyticsSkeleton />
    </div>
  )
}
