'use client'
import Link from 'next/link'
import { ChevronRight, Map, BookOpen, FileText } from 'lucide-react'
import { useUserStore } from '@/lib/store'
import ProfileCard from '@/components/ProfileCard'
import ShinyText from '@/components/ShinyText'

const CERT_LABELS: Record<string, string> = {
  student: '學生認證',
  faculty: '教職員認證',
  senior: '敬老認證',
}
const CERT_BENEFITS: Record<string, string> = {
  student: '免費使用場館',
  faculty: '免費使用場館',
  senior: '半價優惠',
}

export default function ProfilePage() {
  const { user, isElderMode, toggleElderMode } = useUserStore()
  const approvedCerts = user.certifications.filter((c) => c.status === 'approved')

  return (
    <div className="px-4 py-4 space-y-5 pb-6">
      <ProfileCard
        name={user.nickname}
        title={user.active_cert_type ? CERT_LABELS[user.active_cert_type] : '一般會員'}
        status={`NT$${user.stored_value_twd} 點數 · ${user.coupon_count} 張優惠券`}
        avatarUrl={user.avatar_url}
      />

      <div className="space-y-2">
        {approvedCerts.map((cert) => (
          <div key={cert.cert_type} className="flex items-center gap-2 px-1">
            <ShinyText
              text={`✓ ${CERT_LABELS[cert.cert_type]} · ${CERT_BENEFITS[cert.cert_type]}`}
              className="text-sm text-green-400"
            />
          </div>
        ))}
        {approvedCerts.length === 0 && (
          <Link href="/certification"
            className="flex items-center justify-between bg-orange-500/10 border border-orange-500/30 rounded-xl p-3 hover:bg-orange-500/20 transition-colors">
            <span className="text-sm text-orange-300">去認證，享優惠 →</span>
          </Link>
        )}
        {approvedCerts.length > 0 && (
          <Link href="/certification" className="text-xs text-gray-500 hover:text-gray-300 transition-colors px-1">
            管理認證 →
          </Link>
        )}
      </div>

      <div className="space-y-2">
        <h2 className="text-xs text-gray-400 uppercase tracking-wider font-medium">快捷功能</h2>
        {[
          { href: '/map', Icon: Map, label: '場館地圖' },
          { href: '/guide', Icon: BookOpen, label: '預約流程' },
          { href: '/rules', Icon: FileText, label: '預約須知' },
        ].map(({ href, Icon, label }) => (
          <Link key={href} href={href}
            className="flex items-center justify-between bg-gray-800/60 border border-gray-700/50 rounded-xl p-4 hover:border-gray-600 transition-colors"
            style={{ minHeight: 'var(--touch-min)' }}>
            <div className="flex items-center gap-3">
              <Icon size={18} className="text-gray-400" />
              <span className="text-sm">{label}</span>
            </div>
            <ChevronRight size={16} className="text-gray-500" />
          </Link>
        ))}
      </div>

      <div className="flex items-center justify-between bg-gray-800/60 border border-gray-700/50 rounded-xl p-4">
        <div>
          <p className="text-sm font-medium">長輩模式</p>
          <p className="text-xs text-gray-400 mt-0.5">放大字體和按鈕尺寸</p>
        </div>
        <button onClick={toggleElderMode}
          className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors flex-shrink-0 ${
            isElderMode ? 'bg-green-500' : 'bg-gray-600'
          }`}
          style={{ minHeight: 'unset' }}>
          <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform ${
            isElderMode ? 'translate-x-6' : 'translate-x-1'
          }`} />
        </button>
      </div>
    </div>
  )
}
