import type { Metadata } from 'next'
import { Noto_Sans_TC } from 'next/font/google'
import './globals.css'
import ElderModeSync from '@/components/ElderModeSync'
import BottomNav from '@/components/layout/BottomNav'

const notoSansTC = Noto_Sans_TC({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: '場館預約 | 台北・新北',
  description: '台北市、新北市社區運動中心線上預約平台',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-TW">
      <body className={notoSansTC.className + ' bg-gray-950 text-gray-100 min-h-screen pb-20'}>
        <ElderModeSync />
        <main className="max-w-md mx-auto min-h-screen">{children}</main>
        <BottomNav />
      </body>
    </html>
  )
}
