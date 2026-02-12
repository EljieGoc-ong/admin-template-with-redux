import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'
import { formatCurrency } from '@/utils/helpers'
import type { MonthlyRevenue } from '@/types/models'

interface TotalRevenueCardProps {
  totalRevenue: number
  clientsCount: number
  countriesCount: number
  revenueData: MonthlyRevenue[]
}

export function TotalRevenueCard({
  totalRevenue,
  clientsCount,
  countriesCount,
  revenueData,
}: TotalRevenueCardProps) {
  const chartData = revenueData.map((d) => ({ ...d, amount: d.amount }))

  return (
    <div className="rounded-lg p-6 bg-gradient-to-br from-primary to-purple-800 text-white shadow-lg">
      <h2 className="text-lg font-semibold mb-4 opacity-90">Total Revenue</h2>
      <p className="text-4xl font-bold mb-1">{formatCurrency(totalRevenue)}</p>
      <p className="text-sm opacity-80 mb-4">YTD Revenue</p>
      <div className="flex gap-6 mb-4">
        <span className="text-sm">{clientsCount} Clients</span>
        <span className="text-sm">{String(countriesCount).padStart(2, '0')} Countries</span>
      </div>
      <div className="h-32 -mx-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FFD54F" stopOpacity={1} />
                <stop offset="100%" stopColor="#FFD54F" stopOpacity={0.2} />
              </linearGradient>
            </defs>
            <XAxis dataKey="month" stroke="#fff" fontSize={10} />
            <YAxis hide />
            <Tooltip
              contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: 'none' }}
              formatter={(value: number) => [formatCurrency(value), 'Revenue']}
            />
            <Area
              type="monotone"
              dataKey="amount"
              stroke="#FFD54F"
              strokeWidth={2}
              fill="url(#revenueGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
