import { formatCurrency } from '@/utils/helpers'
import type { Earnings } from '@/types/models'

interface EarningsCardProps {
  earnings: Earnings
}

export function EarningsCard({ earnings }: EarningsCardProps) {
  const total = earnings.earning + earnings.pending + earnings.refund
  const percentage = total > 0 ? Math.round((earnings.earning / total) * 100) : 0

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Earning in Month</h2>
      <div className="flex items-center gap-6">
        <div className="relative w-40 h-40">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="42"
              fill="none"
              stroke="#E5E7EB"
              strokeWidth="12"
            />
            <circle
              cx="50"
              cy="50"
              r="42"
              fill="none"
              stroke="#EF5350"
              strokeWidth="12"
              strokeDasharray={`${percentage * 2.64} 264`}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold text-gray-800">{percentage}%</span>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <span className="text-sm">Earning: {formatCurrency(earnings.earning)}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="text-sm">Pending: {formatCurrency(earnings.pending)}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500" />
            <span className="text-sm">Refund: {formatCurrency(earnings.refund)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
