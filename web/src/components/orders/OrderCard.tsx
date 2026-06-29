'use client'
import { Booking } from '@/lib/types'
import Link from 'next/link'

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  pending_payment: { label: '待支付', color: 'text-yellow-400' },
  paid: { label: '待使用', color: 'text-green-400' },
  in_use: { label: '使用中', color: 'text-blue-400' },
  completed: { label: '已完成', color: 'text-gray-400' },
  cancelled: { label: '已取消', color: 'text-red-400' },
  refunding: { label: '退款中', color: 'text-orange-400' },
  refunded: { label: '已退款', color: 'text-gray-500' },
}

const CATEGORY_EMOJI: Record<string, string> = {
  basketball: '🏀',
  badminton: '🏸',
  swimming: '🏊',
  table_tennis: '🏓',
  tennis: '🎾',
  morning_exercise: '🌅',
}

interface Props {
  booking: Booking
  onShowQR?: (booking: Booking) => void
}

export default function OrderCard({ booking, onShowQR }: Props) {
  const statusInfo = STATUS_LABELS[booking.status] || { label: booking.status, color: 'text-gray-400' }
  const emoji = CATEGORY_EMOJI[booking.venue.category] || '🏟'

  return (
    <div className="bg-gray-800/60 border border-gray-700/50 rounded-2xl p-4 space-y-3">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{emoji}</span>
          <div>
            <p className="font-semibold text-sm">{booking.venue.name}</p>
            <p className="text-xs text-gray-400">{booking.venue.district} · 🚇{booking.venue.mrt_station}站 {booking.venue.mrt_walking_minutes}分</p>
          </div>
        </div>
        <span className={`text-xs font-medium flex-shrink-0 ${statusInfo.color}`}>{statusInfo.label}</span>
      </div>

      <div className="text-xs text-gray-400 space-y-0.5">
        <p>📅 {booking.time_slot.date} {booking.time_slot.start_time}–{booking.time_slot.end_time}</p>
        <p>💰 {booking.final_amount_twd === 0 ? 'NT$0（免費）' : `NT$${booking.final_amount_twd.toLocaleString()}`}</p>
        <p className="text-gray-600 text-[10px]">#{booking.order_no}</p>
      </div>

      <div className="flex gap-2">
        {booking.status === 'pending_payment' && (
          <Link
            href={`/bookings/${booking.id}/pay`}
            className="flex-1 text-center text-sm bg-green-500 hover:bg-green-400 text-white rounded-xl py-2.5 font-medium transition-colors"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 'var(--touch-min)' }}
          >
            去支付
          </Link>
        )}
        {booking.status === 'paid' && (
          <button
            onClick={() => onShowQR?.(booking)}
            className="flex-1 text-sm bg-blue-500/20 border border-blue-500/40 text-blue-300 rounded-xl py-2.5 font-medium hover:bg-blue-500/30 transition-colors"
            style={{ minHeight: 'var(--touch-min)' }}
          >
            出示驗票碼
          </button>
        )}
        {booking.status === 'completed' && (
          <Link
            href={`/venues/${booking.venue.id}`}
            className="flex-1 text-center text-sm bg-gray-700 hover:bg-gray-600 text-gray-200 rounded-xl py-2.5 font-medium transition-colors"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 'var(--touch-min)' }}
          >
            再次預約
          </Link>
        )}
      </div>
    </div>
  )
}
