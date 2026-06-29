'use client'
import { useEffect } from 'react'
import { useUserStore } from '@/lib/store'

export default function ElderModeSync() {
  const isElderMode = useUserStore((s) => s.isElderMode)
  useEffect(() => {
    document.documentElement.setAttribute('data-elder', String(isElderMode))
  }, [isElderMode])
  return null
}
