import { useState } from 'react'
import { useAppSelector, useAppDispatch } from '@/hooks/useAppSelector'
import { taskToggled } from '@/store/slices/dashboardSlice'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { format, addMonths, subMonths } from 'date-fns'

export function TasksCard() {
  const dispatch = useAppDispatch()
  const tasks = useAppSelector((state) => state.dashboard.tasks)
  const [currentMonth, setCurrentMonth] = useState(new Date(2020, 6, 1))

  const daysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const first = new Date(year, month, 1)
    const last = new Date(year, month + 1, 0)
    const days: Date[] = []
    for (let d = new Date(first); d <= last; d.setDate(d.getDate() + 1)) {
      days.push(new Date(d))
    }
    return days
  }

  const startPadding = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay()

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Today's Tasks</h2>
        <div className="flex gap-2">
          <button className="text-sm text-primary hover:underline">Create Task</button>
          <button className="text-sm text-primary hover:underline">View All</button>
        </div>
      </div>
      <div className="flex gap-6">
        <div className="flex-1 space-y-3">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="flex items-start gap-3 p-2 rounded hover:bg-gray-50"
            >
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => dispatch(taskToggled(task.id))}
                className="mt-1 rounded"
              />
              <div>
                <p className={`text-sm ${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                  {task.title}
                </p>
                <p className="text-xs text-gray-500">
                  Scheduled on {task.scheduledDate}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="border-l pl-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">
              {format(currentMonth, 'MMMM yyyy')}
            </span>
            <div className="flex gap-1">
              <button
                onClick={() => setCurrentMonth((d) => subMonths(d, 1))}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setCurrentMonth((d) => addMonths(d, 1))}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center text-xs">
            {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((d) => (
              <div key={d} className="text-gray-500 font-medium">{d}</div>
            ))}
            {Array.from({ length: startPadding }).map((_, i) => (
              <div key={`pad-${i}`} />
            ))}
            {daysInMonth(currentMonth).map((d) => (
              <button
                key={d.toISOString()}
                className={`w-6 h-6 rounded ${
                  d.getDate() === 1 ? 'bg-primary text-white' : 'hover:bg-gray-100'
                }`}
              >
                {d.getDate()}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
