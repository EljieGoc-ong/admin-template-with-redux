import React from 'react'
import { Users, FileText, DollarSign } from 'lucide-react'
import { formatCurrency } from '@/utils/helpers'
import { cn } from '@/utils/cn'

interface QuickStatsProps {
  totalClients: number
  paidInvoices: number
  totalProjects: number
  openProjects: number
}

const stats = [
  {
    key: 'totalClients',
    value: (props: QuickStatsProps) => props.totalClients,
    label: 'Total Clients',
    icon: Users,
    bgClass: 'bg-coral',
    textColor: 'text-white',
  },
  {
    key: 'paidInvoices',
    value: (props: QuickStatsProps) => formatCurrency(props.paidInvoices),
    label: 'Paid Invoices',
    icon: DollarSign,
    bgClass: 'bg-blue',
    textColor: 'text-white',
  },
  {
    key: 'totalProjects',
    value: (props: QuickStatsProps) => props.totalProjects,
    label: 'Total Projects',
    icon: FileText,
    bgClass: 'bg-purple',
    textColor: 'text-white',
  },
  {
    key: 'openProjects',
    value: (props: QuickStatsProps) => props.openProjects,
    label: 'Open Projects',
    icon: FileText,
    bgClass: 'bg-teal',
    textColor: 'text-white',
  },
]

export const QuickStats = React.memo(function QuickStats(props: QuickStatsProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-800">Quick Statistics</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(({ key, value, label, icon: Icon, bgClass, textColor }) => (
          <div
            key={key}
            className={cn(
              'rounded-lg p-4 shadow-md flex items-center gap-4',
              bgClass,
              textColor
            )}
          >
            <div className="p-2 rounded-lg bg-white/20">
              <Icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl font-bold">{value(props)}</p>
              <p className="text-sm opacity-90">{label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
})
