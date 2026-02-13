function MetricsSkeleton() {
  return (
    <div className="space-y-6">
      <div className="h-8 w-40 bg-gray-200 rounded animate-pulse" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-24 bg-gray-200 rounded-lg animate-pulse" />
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="h-64 bg-gray-200 rounded-lg animate-pulse" />
        <div className="h-64 bg-gray-200 rounded-lg animate-pulse" />
      </div>
    </div>
  )
}

export default function Metrics() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Metrics</h1>
      <MetricsSkeleton />
    </div>
  )
}
