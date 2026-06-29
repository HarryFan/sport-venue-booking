'use client'
import { Booking } from '@/lib/types'
import { QRCodeSVG } from 'qrcode.react'
import { X } from 'lucide-react'

interface Props {
  booking: Booking | null
  onClose: () => void
}

export default function QRModal({ booking, onClose }: Props) {
  if (!booking) return null

  const qrValue = `ORDER:${booking.order_no}|VENUE:${booking.venue.name}|TIME:${booking.time_slot.date} ${booking.time_slot.start_time}`

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl p-6 max-w-xs w-full flex flex-col items-center gap-4 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full flex justify-between items-center">
          <p className="text-gray-800 font-bold">驗票 QR 碼</p>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1">
            <X size={20} />
          </button>
        </div>
        <div className="bg-gray-50 p-3 rounded-2xl">
          <QRCodeSVG value={qrValue} size={200} />
        </div>
        <div className="text-center space-y-1 w-full">
          <p className="text-gray-800 font-semibold text-sm">{booking.venue.name}</p>
          <p className="text-gray-500 text-xs">{booking.time_slot.date} {booking.time_slot.start_time}–{booking.time_slot.end_time}</p>
          <p className="text-gray-400 text-[10px]">{booking.order_no}</p>
        </div>
        <p className="text-gray-400 text-xs text-center">出示此 QR 碼給工作人員掃描入場</p>
      </div>
    </div>
  )
}
