import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { Header } from './Header'
import { useAppSelector, useAppDispatch } from '@/hooks/useAppSelector'
import { toggleSidebar } from '@/store/slices/uiSlice'

function PageSkeleton() {
  return (
    <div className="animate-pulse space-y-6">
      <div className="h-8 w-48 bg-gray-200 rounded" />
      <div className="h-64 bg-gray-200 rounded" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="h-48 bg-gray-200 rounded" />
        <div className="h-48 bg-gray-200 rounded" />
      </div>
    </div>
  )
}

export default function MainLayout() {
  const sidebarOpen = useAppSelector((state) => state.ui.sidebarOpen)
  const dispatch = useAppDispatch()

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => dispatch(toggleSidebar())}
        />
      )}

      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        <main className="flex-1 p-4 sm:p-6 lg:ml-64">
          <Suspense fallback={<PageSkeleton />}>
            <Outlet />
          </Suspense>
        </main>
      </div>
    </div>
  )
}
