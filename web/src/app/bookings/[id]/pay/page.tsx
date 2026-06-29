'use client'
import { useState, useEffect, use } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { getBooking, mockPay } from '@/lib/mock-api'
import { Booking } from '@/lib/types'
import SpotlightCard from '@/components/SpotlightCard'
import StarBorder from '@/components/StarBorder'
import BookingStepper from '@/components/booking/BookingStepper'

const PAYMENT_METHODS = [
  { id: 'line_pay', label: 'LINE Pay', icon: '💚' },
  { id: 'jkopay', label: '街口支付', icon: '🧡' },
  { id: 'stored_value', label: '儲值點數', icon: '💰' },
]

function useCountdown(targetMs: number) {
  const [remaining, setRemaining] = useState(Math.max(0, targetMs - Date.now()))
  useEffect(() => {
    const t = setInterval(() => setRemaining(Math.max(0, targetMs - Date.now())), 1000)
    return () => clearInterval(t)
  }, [targetMs])
  return {
    mins: Math.floor(remaining / 60000),
    secs: Math.floor((remaining % 60000) / 1000),
    expired: remaining === 0,
  }
}

export default function PayPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const [booking, setBooking] = useState<Booking | null>(null)
  const [channel, setChannel] = useState('line_pay')
  const [paying, setPaying] = useState(false)

  useEffect(() => { getBooking(id).then(setBooking) }, [id])

  const expireMs = booking?.payment_expires_at
    ? new Date(booking.payment_expires_at).getTime()
    : Date.now() + 15 * 60 * 1000
  const { mins, secs, expired } = useCountdown(expireMs)

  const handlePay = async () => {
    if (!booking) return
    setPaying(true)
    await mockPay(booking.id, channel)
    router.push('/orders')
  }

  if (!booking) return <div className="p-4 text-center text-gray-400 py-20">載入中...</div>

  if (expired) return (
    <div className="p-4 text-center py-20 space-y-4">
      <p className="text-5xl">⏰</p>
      <p className="text-lg font-semibold">訂單已超時取消</p>
      <p className="text-gray-400 text-sm">請重新選擇場次</p>
      <Link href="/venues" className="inline-block bg-green-500 text-white px-6 py-3 rounded-2xl font-semibold">重新預約</Link>
    </div>
  )

  const isFree = booking.final_amount_twd === 0

  return (
    <div className="px-4 py-4 space-y-5 pb-8">
      <div className="flex items-center gap-3">
        <Link href="/orders" className="text-gray-400 hover:text-gray-200 p-1"><ChevronLeft size={24} /></Link>
        <h1 className="font-bold text-base">確認支付</h1>
      </div>

      <BookingStepper currentStep={3} />

      <div className={`flex items-center justify-center gap-2 py-2.5 rounded-xl border ${
        mins < 5 ? 'border-red-500/50 bg-red-500/10' : 'border-gray-700 bg-gray-800/40'
      }`}>
        <span className="text-xs text-gray-400">支付截止：</span>
        <span className={`font-mono font-bold text-lg ${mins < 5 ? 'text-red-400' : 'text-yellow-400'}`}>
          {String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')}
        </span>
      </div>

      <SpotlightCard className="bg-gray-800/60 border border-gray-700/50 rounded-2xl p-4 space-y-3">
        <h2 className="font-semibold text-sm text-gray-300">訂單詳情</h2>
        <div className="space-y-2 text-sm">
          {[
            ['場館', booking.venue.name],
            ['地區', `${booking.venue.city} ${booking.venue.district}`],
            ['捷運', `🚇 ${booking.venue.mrt_station}站 ${booking.venue.mrt_walking_minutes}分鐘`],
            ['日期', booking.time_slot.date],
            ['時段', `${booking.time_slot.start_time}–${booking.time_slot.end_time}`],
          ].map(([label, value]) => (
            <div key={label} className="flex justify-between">
              <span className="text-gray-400">{label}</span>
              <span className="text-right max-w-[60%]">{value}</span>
            </div>
          ))}
          <div className="border-t border-gray-700 pt-2 flex justify-between font-bold">
            <span>合計</span>
            <span className={isFree ? 'text-green-400' : 'text-white'}>
              {isFree ? '免費' : `NT$${booking.final_amount_twd.toLocaleString()}`}
            </span>
          </div>
        </div>
      </SpotlightCard>

      {!isFree && (
        <div className="space-y-2">
          <h2 className="text-xs text-gray-400 uppercase tracking-wider">支付方式</h2>
          <div className="grid grid-cols-3 gap-2">
            {PAYMENT_METHODS.map((m) => (
              <button key={m.id} onClick={() => setChannel(m.id)}
                className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border transition-all ${
                  channel === m.id
                    ? 'border-green-500 bg-green-500/10 text-green-300'
                    : 'border-gray-700 bg-gray-800/60 text-gray-400 hover:border-gray-500'
                }`}>
                <span className="text-2xl">{m.icon}</span>
                <span className="text-[10px] font-medium">{m.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      <StarBorder color="green" className="w-full">
        <button
          onClick={handlePay}
          disabled={paying}
          className="w-full py-4 rounded-2xl font-bold text-white bg-green-500 hover:bg-green-400 disabled:bg-gray-700 disabled:text-gray-500 transition-colors"
        >
          {paying ? '支付中...' : isFree ? '確認預約（免費）' : `確認支付 NT$${booking.final_amount_twd}`}
        </button>
      </StarBorder>
    </div>
  )
}
