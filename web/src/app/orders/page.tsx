'use client'
import { useState, useEffect } from 'react'
import { getBookings } from '@/lib/mock-api'
import { Booking } from '@/lib/types'
import OrderCard from '@/components/orders/OrderCard'
import QRModal from '@/components/orders/QRModal'

const TABS = [
  { label: '待支付', value: 'pending_payment' },
  { label: '待使用', value: 'paid' },
  { label: '已完成', value: 'completed' },
  { label: '全部', value: 'all' },
]

export default function OrdersPage() {
  const [tab, setTab] = useState('all')
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [qrBooking, setQrBooking] = useState<Booking | null>(null)

  useEffect(() => {
    setLoading(true)
    getBookings(tab).then((b) => { setBookings(b); setLoading(false) })
  }, [tab])

  return (
    <div className="px-4 py-4 space-y-4">
      <h1 className="text-lg font-bold">我的訂單</h1>

      <div className="flex bg-gray-800/60 rounded-xl p-1 gap-1">
        {TABS.map((t) => (
          <button key={t.value} onClick={() => setTab(t.value)}
            className={`flex-1 text-xs py-2 rounded-lg font-medium transition-colors ${
              tab === t.value ? 'bg-green-500 text-white shadow-lg' : 'text-gray-400 hover:text-gray-200'
            }`}>
            {t.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 3 }, (_, i) => <div key={i} className="h-32 bg-gray-800/40 rounded-2xl animate-pulse" />)}
        </div>
      ) : bookings.length === 0 ? (
        <div className="text-center py-20 space-y-3">
          <p className="text-5xl">📋</p>
          <p className="text-gray-400">暫無訂單</p>
        </div>
      ) : (
        <div className="space-y-3 pb-4">
          {bookings.map((b) => (
            <OrderCard key={b.id} booking={b} onShowQR={setQrBooking} />
          ))}
        </div>
      )}

      <QRModal booking={qrBooking} onClose={() => setQrBooking(null)} />
    </div>
  )
}
