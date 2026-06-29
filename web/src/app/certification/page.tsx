'use client'
import { useState } from 'react'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { useUserStore } from '@/lib/store'
import { submitCertification, approveCertification } from '@/lib/mock-api'
import { Certification } from '@/lib/types'

type Step = 'select' | 'student' | 'faculty' | 'senior' | 'done'

export default function CertificationPage() {
  const { updateCertification } = useUserStore()
  const [step, setStep] = useState<Step>('select')
  const [email, setEmail] = useState('')
  const [birthYear, setBirthYear] = useState('')
  const [emailError, setEmailError] = useState('')
  const [yearError, setYearError] = useState('')
  const [loading, setLoading] = useState(false)
  const [doneCertType, setDoneCertType] = useState('')

  const handleStudentSubmit = async () => {
    if (!email.endsWith('.edu.tw')) { setEmailError('請輸入學校信箱（結尾需為 .edu.tw）'); return }
    setEmailError('')
    setLoading(true)
    await submitCertification('student', { email })
    await approveCertification('student')
    const cert: Certification = { id: Date.now().toString(), cert_type: 'student', status: 'approved', created_at: new Date().toISOString() }
    updateCertification(cert)
    setDoneCertType('student')
    setLoading(false)
    setStep('done')
  }

  const handleSeniorSubmit = async () => {
    const year = parseInt(birthYear)
    if (isNaN(year) || year > 1961) { setYearError('敬老優惠適用 65 歲以上長者（1961 年以前出生）'); return }
    setYearError('')
    setLoading(true)
    await submitCertification('senior', { birthYear })
    await approveCertification('senior')
    const cert: Certification = { id: Date.now().toString(), cert_type: 'senior', status: 'approved', created_at: new Date().toISOString() }
    updateCertification(cert)
    setDoneCertType('senior')
    setLoading(false)
    setStep('done')
  }

  if (step === 'done') return (
    <div className="px-4 py-4 text-center space-y-6 pt-20">
      <div className="text-6xl">✅</div>
      <div>
        <p className="text-xl font-bold text-green-400">認證通過！</p>
        <p className="text-gray-400 text-sm mt-2">
          {doneCertType === 'student' || doneCertType === 'faculty' ? '您現在可免費使用場館' : '您現在享有半價優惠'}
        </p>
      </div>
      <Link href="/profile" className="inline-block bg-green-500 text-white px-8 py-3 rounded-2xl font-semibold">
        返回我的頁面
      </Link>
    </div>
  )

  if (step === 'student' || step === 'faculty') return (
    <div className="px-4 py-4 space-y-6">
      <div className="flex items-center gap-3">
        <button onClick={() => setStep('select')} className="text-gray-400 p-1"><ChevronLeft size={24} /></button>
        <h1 className="font-bold">{step === 'student' ? '學生認證' : '教職員認證'}</h1>
      </div>
      <div className="bg-gray-800/60 border border-gray-700/50 rounded-2xl p-4 space-y-1.5 text-sm">
        <p className="text-xs text-gray-400 mb-2">所需資訊</p>
        <p>· 學校 / 機構 .edu.tw 信箱</p>
        <p>· 審核即時自動完成（示範用）</p>
        <p className="text-green-400">· 通過後免費使用所有場館</p>
      </div>
      <div className="space-y-2">
        <label className="text-sm text-gray-400">學校 / 機構信箱</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="b10234567@mail.ntust.edu.tw"
          className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-green-500"
        />
        {emailError && <p className="text-xs text-red-400">{emailError}</p>}
      </div>
      <button onClick={handleStudentSubmit} disabled={loading || !email}
        className="w-full py-4 bg-green-500 hover:bg-green-400 disabled:bg-gray-700 disabled:text-gray-500 text-white rounded-2xl font-bold transition-colors"
        style={{ minHeight: 'var(--touch-min)' }}>
        {loading ? '驗證中...' : '送出申請'}
      </button>
    </div>
  )

  if (step === 'senior') return (
    <div className="px-4 py-4 space-y-6">
      <div className="flex items-center gap-3">
        <button onClick={() => setStep('select')} className="text-gray-400 p-1"><ChevronLeft size={24} /></button>
        <h1 className="font-bold">敬老認證（65 歲以上）</h1>
      </div>
      <div className="bg-gray-800/60 border border-gray-700/50 rounded-2xl p-4 space-y-1.5 text-sm">
        <p className="text-xs text-gray-400 mb-2">適用對象</p>
        <p>· 民國 50 年（西元 1961 年）以前出生</p>
        <p className="text-yellow-400">· 享半價優惠</p>
      </div>
      <div className="space-y-2">
        <label className="text-sm text-gray-400">出生年份（西元）</label>
        <input
          type="number"
          value={birthYear}
          onChange={(e) => setBirthYear(e.target.value)}
          placeholder="例：1955"
          className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500"
        />
        {yearError && <p className="text-xs text-red-400">{yearError}</p>}
      </div>
      <button onClick={handleSeniorSubmit} disabled={loading || !birthYear}
        className="w-full py-4 bg-yellow-500 hover:bg-yellow-400 disabled:bg-gray-700 disabled:text-gray-500 text-black rounded-2xl font-bold transition-colors"
        style={{ minHeight: 'var(--touch-min)' }}>
        {loading ? '驗證中...' : '確認申請'}
      </button>
    </div>
  )

  return (
    <div className="px-4 py-4 space-y-4">
      <div className="flex items-center gap-3">
        <Link href="/profile" className="text-gray-400 p-1"><ChevronLeft size={24} /></Link>
        <h1 className="font-bold text-base">身份認證</h1>
      </div>
      <p className="text-sm text-gray-400">通過認證，立即享有優惠！</p>
      <div className="space-y-3">
        {([
          { step: 'student' as Step, emoji: '🎓', title: '學生認證', desc: '台灣各大學在學學生（.edu.tw）', benefit: '免費', color: 'text-green-400' },
          { step: 'faculty' as Step, emoji: '👔', title: '教職員認證', desc: '學校 / 機構教職人員', benefit: '免費', color: 'text-green-400' },
          { step: 'senior' as Step, emoji: '🌸', title: '敬老認證', desc: '65 歲以上長者', benefit: '半價', color: 'text-yellow-400' },
        ] as const).map((item) => (
          <button key={item.step} onClick={() => setStep(item.step)}
            className="w-full flex items-center gap-4 bg-gray-800/60 border border-gray-700/50 rounded-2xl p-4 hover:border-gray-500 active:scale-[0.98] transition-all text-left"
            style={{ minHeight: 'var(--touch-min)' }}>
            <span className="text-4xl">{item.emoji}</span>
            <div className="flex-1">
              <p className="font-semibold text-sm">{item.title}</p>
              <p className="text-xs text-gray-400 mt-0.5">{item.desc}</p>
            </div>
            <span className={`text-xs font-bold ${item.color} flex-shrink-0`}>{item.benefit}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
