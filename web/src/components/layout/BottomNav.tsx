'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, ShoppingBag, User } from 'lucide-react'

const links = [
  { href: '/', label: '首頁', Icon: Home },
  { href: '/orders', label: '訂單', Icon: ShoppingBag },
  { href: '/profile', label: '我的', Icon: User },
]

export default function BottomNav() {
  const pathname = usePathname()
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur border-t border-gray-800">
      <div className="max-w-md mx-auto flex">
        {links.map(({ href, label, Icon }) => {
          const active = pathname === href || (href !== '/' && pathname.startsWith(href))
          return (
            <Link
              key={href}
              href={href}
              className={`flex-1 flex flex-col items-center justify-center py-3 gap-1 transition-colors ${
                active ? 'text-green-400' : 'text-gray-400 hover:text-gray-200'
              }`}
              style={{ minHeight: 'var(--touch-min)' }}
            >
              <Icon size={22} strokeWidth={active ? 2.5 : 1.5} />
              <span className="text-xs font-medium">{label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
