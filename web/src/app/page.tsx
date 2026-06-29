'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import BlurText from '@/components/BlurText'
import SpotlightCard from '@/components/SpotlightCard'
import CountUp from '@/components/CountUp'
import { getVenues } from '@/lib/mock-api'
import { Venue, VenueCategory } from '@/lib/types'

const SPORT_ICONS: { category: VenueCategory; label: string; emoji: string }[] = [
  { category: 'basketball', label: '籃球', emoji: '🏀' },
  { category: 'badminton', label: '羽球', emoji: '🏸' },
  { category: 'swimming', label: '游泳', emoji: '🏊' },
  { category: 'table_tennis', label: '桌球', emoji: '🏓' },
  { category: 'tennis', label: '網球', emoji: '🎾' },
  { category: 'morning_exercise', label: '晨間運動', emoji: '🌅' },
]

export default function HomePage() {
  const router = useRouter()
  const [venues, setVenues] = useState<Venue[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getVenues().then((v) => { setVenues(v.slice(0, 4)); setLoading(false) })
  }, [])

  return (
    <div className="min-h-screen px-4 py-6 space-y-8">
      <div className="pt-4 pb-2 space-y-1">
        <BlurText text="輕鬆預約，隨時運動" className="text-2xl font-bold text-white" delay={80} />
        <p className="text-gray-400 text-sm">台北市・新北市社區運動中心</p>
      </div>

      <section>
        <h2 className="text-xs font-medium text-gray-400 mb-3 uppercase tracking-wider">我要預約</h2>
        <div className="grid grid-cols-3 gap-3">
          {SPORT_ICONS.map(({ category, label, emoji }) => (
            <button
              key={category}
              onClick={() => router.push(`/venues?category=${category}`)}
              className="flex flex-col items-center justify-center gap-2 bg-gray-800/60 border border-gray-700/50 rounded-2xl py-4 hover:border-green-500/50 hover:bg-gray-800 active:scale-95 transition-all"
            >
              <span className="text-3xl">{emoji}</span>
              <span className="text-xs text-gray-300">{label}</span>
            </button>
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs font-medium text-gray-400 uppercase tracking-wider">推薦場館</h2>
          <Link href="/venues" className="text-xs text-green-400 hover:text-green-300">查看全部 →</Link>
        </div>
        <div className="space-y-3">
          {loading ? (
            Array.from({ length: 3 }, (_, i) => (
              <div key={i} className="h-20 bg-gray-800/40 rounded-2xl animate-pulse" />
            ))
          ) : venues.map((venue) => (
            <Link key={venue.id} href={`/venues/${venue.id}`}>
              <SpotlightCard className="bg-gray-800/60 border border-gray-700/50 rounded-2xl p-4 hover:border-gray-600 transition-colors block mb-3">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-white truncate">{venue.name}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{venue.city} {venue.district}</p>
                    <p className="text-xs text-gray-500 mt-0.5">🚇 {venue.mrt_station}站 {venue.mrt_walking_minutes}分鐘</p>
                  </div>
                  <div className="text-right ml-3 flex-shrink-0">
                    <p className="text-xs text-gray-500">今日剩餘</p>
                    <div className="flex items-baseline gap-0.5 justify-end">
                      <CountUp to={venue.today_available_slots} className="text-xl font-bold text-green-400" />
                      <span className="text-xs text-gray-500">場</span>
                    </div>
                  </div>
                </div>
              </SpotlightCard>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
