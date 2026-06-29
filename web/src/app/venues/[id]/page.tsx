'use client'
import { useState, useEffect, use } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { getVenue, getTimeSlots, createBooking } from '@/lib/mock-api'
import { Venue, TimeSlot } from '@/lib/types'
import { useUserStore } from '@/lib/store'
import DatePicker from '@/components/booking/DatePicker'
import TimeSlotGrid from '@/components/booking/TimeSlotGrid'
import BookingStepper from '@/components/booking/BookingStepper'
import StarBorder from '@/components/StarBorder'

export default function VenueDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const user = useUserStore((s) => s.user)
  const today = new Date().toISOString().split('T')[0]

  const [venue, setVenue] = useState<Venue | null>(null)
  const [slots, setSlots] = useState<TimeSlot[]>([])
  const [date, setDate] = useState(today)
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null)
  const [loading, setLoading] = useState(true)
  const [booking, setBooking] = useState(false)

  useEffect(() => { getVenue(id).then(setVenue) }, [id])

  useEffect(() => {
    setLoading(true)
    setSelectedSlot(null)
    getTimeSlots(id, date).then((s) => { setSlots(s); setLoading(false) })
  }, [id, date])

  const price = user.active_cert_type === 'student' || user.active_cert_type === 'faculty'
    ? venue?.price_student_twd ?? 0
    : user.active_cert_type === 'senior'
    ? venue?.price_senior_twd ?? 0
    : venue?.price_normal_twd ?? 0

  const handleBook = async () => {
    if (!selectedSlot) return
    setBooking(true)
    const b = await createBooking(selectedSlot.id, user.id)
    router.push(`/bookings/${b.id}/pay`)
  }

  if (!venue) return <div className="p-4 text-gray-400 text-center py-20">載入中...</div>

  return (
    <div className="px-4 py-4 space-y-5 pb-36">
      <div className="flex items-center gap-3">
        <Link href="/venues" className="text-gray-400 hover:text-gray-200 p-1">
          <ChevronLeft size={24} />
        </Link>
        <div>
          <h1 className="font-bold text-base leading-tight">{venue.name}</h1>
          <p className="text-xs text-gray-400">🚇 {venue.mrt_station}站 · {venue.mrt_walking_minutes}分鐘</p>
        </div>
      </div>

      <BookingStepper currentStep={1} />

      <section>
        <h2 className="text-xs text-gray-400 mb-2 uppercase tracking-wider">選擇日期</h2>
        <DatePicker value={date} onChange={setDate} />
      </section>

      <section>
        <h2 className="text-xs text-gray-400 mb-2 uppercase tracking-wider">選擇時段</h2>
        {loading ? (
          <div className="grid grid-cols-3 gap-2">
            {Array.from({ length: 6 }, (_, i) => (
              <div key={i} className="h-14 bg-gray-800/40 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : (
          <TimeSlotGrid slots={slots} selected={selectedSlot?.id} onSelect={setSelectedSlot} />
        )}
      </section>

      <div className="fixed bottom-16 left-0 right-0 px-4 pb-2">
        <div className="max-w-md mx-auto bg-gray-900/95 backdrop-blur border border-gray-700/50 rounded-2xl p-4 flex items-center gap-3">
          <div className="flex-shrink-0">
            <p className="text-xs text-gray-400">費用</p>
            <p className="font-bold text-lg">{price === 0 ? <span className="text-green-400">免費</span> : `NT$${price}`}</p>
          </div>
          <div className="flex-1">
            <StarBorder color="green" className="w-full">
              <button
                onClick={handleBook}
                disabled={!selectedSlot || booking}
                className="w-full py-3 rounded-xl font-semibold text-sm text-white bg-green-500 hover:bg-green-400 disabled:bg-gray-700 disabled:text-gray-500 transition-colors"
              >
                {booking ? '處理中...' : selectedSlot ? '立即預約' : '請選擇時段'}
              </button>
            </StarBorder>
          </div>
        </div>
      </div>
    </div>
  )
}
