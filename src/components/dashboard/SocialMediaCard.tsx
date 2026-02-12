import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Cell,
  LabelList,
} from 'recharts'
import type { SocialMetric } from '@/types/models'

interface SocialMediaCardProps {
  metrics: SocialMetric[]
}

const COLORS = ['#4E9FF5', '#90CAF9', '#EF5350']

export function SocialMediaCard({ metrics }: SocialMediaCardProps) {
  const data = (metrics ?? []).map((m) => ({
    name: m.platform,
    value: m.percentage,
    change: m.change > 0 ? `+${m.change}%` : `${m.change}%`,
  }))

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Social Media Advertising
      </h2>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ left: 0, right: 20 }}>
            <XAxis type="number" domain={[-30, 40]} hide />
            <YAxis type="category" dataKey="name" width={80} tick={{ fontSize: 12 }} />
            <Bar dataKey="value" radius={[0, 4, 4, 0]}>
              <LabelList dataKey="change" position="right" />
              {data.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
