'use client'
import { TimeSlot } from '@/lib/types'
import ClickSpark from '@/components/ClickSpark'

interface Props {
  slots: TimeSlot[]
  selected?: string
  onSelect: (slot: TimeSlot) => void
}

export default function TimeSlotGrid({ slots, selected, onSelect }: Props) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {slots.map((slot) => {
        const isSelected = slot.id === selected
        const isFull = slot.status === 'full'
        const isUnavailable = slot.status === 'unavailable'
        const isLow = slot.status === 'available' && slot.remaining_capacity <= 3

        if (isUnavailable) {
          return (
            <div
              key={slot.id}
              className="relative flex flex-col items-center justify-center rounded-xl bg-gray-800/30 text-gray-600 overflow-hidden border border-gray-700/30"
              style={{ minHeight: 'var(--slot-min, 3rem)' }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full h-px bg-gray-700 rotate-12" />
              </div>
              <span className="text-xs z-10">{slot.start_time}</span>
            </div>
          )
        }

        if (isFull) {
          return (
            <div
              key={slot.id}
              className="flex flex-col items-center justify-center rounded-xl bg-gray-800/40 text-gray-500 border border-gray-700/40"
              style={{ minHeight: 'var(--slot-min, 3rem)' }}
            >
              <span className="text-xs">{slot.start_time}</span>
              <span className="text-[10px] mt-0.5 text-red-400/70">已滿</span>
            </div>
          )
        }

        return (
          <ClickSpark key={slot.id} sparkColor="#22c55e" sparkCount={6} sparkSize={6}>
            <button
              onClick={() => onSelect(slot)}
              className={`w-full flex flex-col items-center justify-center rounded-xl border transition-all active:scale-95 ${
                isSelected
                  ? 'bg-green-500/20 border-green-400 text-green-300 shadow-lg shadow-green-500/20'
                  : 'bg-gray-800 border-gray-600 text-gray-200 hover:border-green-500/50'
              }`}
              style={{ minHeight: 'var(--slot-min, 3rem)' }}
            >
              <span className="text-xs font-medium">{slot.start_time}</span>
              <span className={`text-[10px] mt-0.5 ${isLow ? 'text-orange-400' : 'text-gray-400'}`}>
                {slot.price_twd === 0 ? '免費' : `剩 ${slot.remaining_capacity} 位`}
              </span>
            </button>
          </ClickSpark>
        )
      })}
    </div>
  )
}
