function SettingsSkeleton() {
  return (
    <div className="space-y-6">
      <div className="h-8 w-40 bg-gray-200 rounded animate-pulse" />
      <div className="space-y-4">
        <div className="h-12 bg-gray-200 rounded-lg animate-pulse" />
        <div className="h-12 bg-gray-200 rounded-lg animate-pulse" />
        <div className="h-12 bg-gray-200 rounded-lg animate-pulse" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="h-48 bg-gray-200 rounded-lg animate-pulse" />
        <div className="h-48 bg-gray-200 rounded-lg animate-pulse" />
      </div>
    </div>
  )
}

export default function Settings() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
      <SettingsSkeleton />
    </div>
  )
}
