'use client'
import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import SpotlightCard from '@/components/SpotlightCard'
import CountUp from '@/components/CountUp'
import { getVenues } from '@/lib/mock-api'
import { Venue } from '@/lib/types'

const CITIES = ['全部', '台北市', '新北市']
const CATEGORIES = [
  { value: 'all', label: '全部' },
  { value: 'basketball', label: '🏀 籃球' },
  { value: 'badminton', label: '🏸 羽球' },
  { value: 'swimming', label: '🏊 游泳' },
  { value: 'table_tennis', label: '🏓 桌球' },
  { value: 'tennis', label: '🎾 網球' },
  { value: 'morning_exercise', label: '🌅 晨間' },
]

function VenueListContent() {
  const searchParams = useSearchParams()
  const initialCategory = searchParams.get('category') || 'all'
  const [venues, setVenues] = useState<Venue[]>([])
  const [loading, setLoading] = useState(true)
  const [city, setCity] = useState('全部')
  const [category, setCategory] = useState(initialCategory)

  useEffect(() => {
    setLoading(true)
    getVenues({
      category: category === 'all' ? undefined : category,
      city: city === '全部' ? undefined : city,
    }).then((v) => { setVenues(v); setLoading(false) })
  }, [city, category])

  return (
    <div className="px-4 py-4 space-y-4">
      <h1 className="text-lg font-bold">場館列表</h1>
      <div className="flex gap-2 flex-wrap">
        {CITIES.map((c) => (
          <button key={c} onClick={() => setCity(c)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              city === c ? 'bg-green-500 text-white' : 'bg-gray-800 text-gray-400 hover:text-gray-200'
            }`}>
            {c}
          </button>
        ))}
      </div>
      <div className="flex gap-2 overflow-x-auto pb-1">
        {CATEGORIES.map((cat) => (
          <button key={cat.value} onClick={() => setCategory(cat.value)}
            className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              category === cat.value ? 'bg-blue-500 text-white' : 'bg-gray-800 text-gray-400 hover:text-gray-200'
            }`}>
            {cat.label}
          </button>
        ))}
      </div>
      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 4 }, (_, i) => <div key={i} className="h-20 bg-gray-800/40 rounded-2xl animate-pulse" />)}
        </div>
      ) : venues.length === 0 ? (
        <div className="text-center text-gray-500 py-16 space-y-3">
          <p className="text-4xl">🔍</p>
          <p>沒有符合條件的場館</p>
        </div>
      ) : (
        <div className="space-y-3 pb-4">
          {venues.map((venue) => (
            <Link key={venue.id} href={`/venues/${venue.id}`}>
              <SpotlightCard className="bg-gray-800/60 border border-gray-700/50 rounded-2xl p-4 hover:border-gray-600 transition-colors block mb-3">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-white">{venue.name}</p>
                    <p className="text-xs text-gray-400">{venue.city} {venue.district}</p>
                    <p className="text-xs text-gray-500 mt-0.5">🚇 {venue.mrt_station}站 {venue.mrt_walking_minutes}分鐘</p>
                    <p className="text-xs text-green-400 mt-1">
                      {venue.price_student_twd === 0 ? '學生免費 · ' : ''}NT${venue.price_normal_twd}/場
                    </p>
                  </div>
                  <div className="text-right ml-3 flex-shrink-0">
                    <CountUp to={venue.today_available_slots} className="text-2xl font-bold text-green-400" />
                    <p className="text-xs text-gray-500">場可訂</p>
                  </div>
                </div>
              </SpotlightCard>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default function VenuesPage() {
  return (
    <Suspense fallback={<div className="p-4 text-gray-400 text-center py-20">載入中...</div>}>
      <VenueListContent />
    </Suspense>
  )
}
