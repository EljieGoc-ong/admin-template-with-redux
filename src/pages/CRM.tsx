function CRMSkeleton() {
  return (
    <div className="space-y-6">
      <div className="h-8 w-40 bg-gray-200 rounded animate-pulse" />
      <div className="h-12 w-64 bg-gray-200 rounded animate-pulse" />
      <div className="h-96 bg-gray-200 rounded-lg animate-pulse" />
    </div>
  )
}

export default function CRM() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">CRM</h1>
      <CRMSkeleton />
    </div>
  )
}
