'use client'

function getDates(count = 7) {
  return Array.from({ length: count }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() + i)
    return d
  })
}

const WEEKDAYS = ['日', '一', '二', '三', '四', '五', '六']

interface Props {
  value: string
  onChange: (date: string) => void
}

export default function DatePicker({ value, onChange }: Props) {
  const dates = getDates(7)
  return (
    <div className="flex gap-2 overflow-x-auto pb-1">
      {dates.map((d) => {
        const iso = d.toISOString().split('T')[0]
        const isSelected = iso === value
        return (
          <button
            key={iso}
            onClick={() => onChange(iso)}
            className={`flex-shrink-0 flex flex-col items-center justify-center rounded-xl px-3 transition-all border ${
              isSelected
                ? 'bg-green-500 border-green-400 text-white shadow-lg shadow-green-500/30'
                : 'bg-gray-800 border-gray-700 text-gray-300 hover:border-gray-500'
            }`}
            style={{ minHeight: 'var(--touch-min)', minWidth: '3.5rem' }}
          >
            <span className="text-xs opacity-70">週{WEEKDAYS[d.getDay()]}</span>
            <span className="text-sm font-semibold">{d.getMonth() + 1}/{d.getDate()}</span>
          </button>
        )
      })}
    </div>
  )
}
