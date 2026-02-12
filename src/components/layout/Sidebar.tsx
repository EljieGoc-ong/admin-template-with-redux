import { NavLink } from 'react-router-dom'
import { useAppSelector } from '@/hooks/useAppSelector'
import { toggleSidebar } from '@/store/slices/uiSlice'
import { useAppDispatch } from '@/hooks/useAppSelector'
import {
  LayoutDashboard,
  Users,
  ChevronDown,
  Settings,
  BarChart3,
  Wallet,
} from 'lucide-react'
import { cn } from '@/utils/cn'

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboards' },
  { to: '/analytics', icon: BarChart3, label: 'Analytics' },
  { to: '/crm', icon: Users, label: 'CRM' },
  { to: '/crypto', icon: Wallet, label: 'Crypto' },
  { to: '/users', icon: Users, label: 'Users' },
  { to: '/metrics', icon: BarChart3, label: 'Metrics' },
  { to: '/widgets', icon: Wallet, label: 'Widgets' },
]

export function Sidebar() {
  const dispatch = useAppDispatch()
  const sidebarOpen = useAppSelector((state) => state.ui.sidebarOpen)
  return (
    <aside
      className={cn(
        'fixed left-0 top-0 h-full bg-sidebar text-white transition-all duration-300 z-40 flex flex-col',
        sidebarOpen ? 'w-64' : 'w-20'
      )}
    >
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center font-bold shrink-0">
            C
          </div>
          {sidebarOpen && (
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="font-semibold truncate">Crema Demo</span>
                <ChevronDown className="w-4 h-4 shrink-0" />
              </div>
              <p className="text-sm text-gray-400 truncate">System Manager</p>
            </div>
          )}
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto py-4">
        <p className={cn('px-4 text-xs text-gray-400 uppercase mb-2', !sidebarOpen && 'hidden')}>
          Application
        </p>
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 px-4 py-2.5 mx-2 rounded-md transition-colors',
                isActive
                  ? 'bg-primary/80 text-white'
                  : 'text-gray-300 hover:bg-white/10 hover:text-white',
                !sidebarOpen && 'justify-center px-2'
              )
            }
          >
            <Icon className="w-5 h-5 shrink-0" />
            {sidebarOpen && <span>{label}</span>}
          </NavLink>
        ))}

        <p className={cn('px-4 text-xs text-gray-400 uppercase mb-2 mt-6', !sidebarOpen && 'hidden')}>
          Settings
        </p>
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            cn(
              'flex items-center gap-3 px-4 py-2.5 mx-2 rounded-md transition-colors',
              isActive ? 'bg-primary/80 text-white' : 'text-gray-300 hover:bg-white/10 hover:text-white',
              !sidebarOpen && 'justify-center px-2'
            )
          }
        >
          <Settings className="w-5 h-5 shrink-0" />
          {sidebarOpen && <span>Settings</span>}
        </NavLink>
      </nav>

      <button
        onClick={() => dispatch(toggleSidebar())}
        className="p-4 border-t border-white/10 text-gray-400 hover:text-white transition-colors"
        aria-label="Toggle sidebar"
      >
        <ChevronDown
          className={cn('w-5 h-5 mx-auto transition-transform', !sidebarOpen && 'rotate-90')}
        />
      </button>
    </aside>
  )
}
