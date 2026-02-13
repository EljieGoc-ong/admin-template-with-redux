function WidgetsSkeleton() {
  return (
    <div className="space-y-6">
      <div className="h-8 w-40 bg-gray-200 rounded animate-pulse" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="h-40 bg-gray-200 rounded-lg animate-pulse" />
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="h-48 bg-gray-200 rounded-lg animate-pulse" />
        <div className="h-48 bg-gray-200 rounded-lg animate-pulse" />
      </div>
    </div>
  )
}

export default function Widgets() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Widgets</h1>
      <WidgetsSkeleton />
    </div>
  )
}
