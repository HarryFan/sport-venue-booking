import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { UserProfile, Certification, CertType } from './types'
import { MOCK_USER } from './mock-data'

interface UserStore {
  user: UserProfile
  isElderMode: boolean
  toggleElderMode: () => void
  updateCertification: (cert: Certification) => void
  setActiveCertType: (certType: CertType | undefined) => void
  addBalance: (amount: number) => void
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: MOCK_USER,
      isElderMode: false,
      toggleElderMode: () => set((state) => ({ isElderMode: !state.isElderMode })),
      updateCertification: (cert) => set((state) => ({
        user: {
          ...state.user,
          certifications: state.user.certifications
            .filter(c => c.cert_type !== cert.cert_type)
            .concat(cert),
          active_cert_type: cert.status === 'approved' ? cert.cert_type : state.user.active_cert_type,
        }
      })),
      setActiveCertType: (certType) => set((state) => ({
        user: { ...state.user, active_cert_type: certType }
      })),
      addBalance: (amount) => set((state) => ({
        user: { ...state.user, stored_value_twd: state.user.stored_value_twd + amount }
      })),
    }),
    {
      name: 'venue-booking-store',
      partialize: (state) => ({ isElderMode: state.isElderMode }),
    }
  )
)
