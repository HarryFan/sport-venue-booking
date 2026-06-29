export type VenueCategory = 'basketball' | 'badminton' | 'swimming' | 'table_tennis' | 'tennis' | 'morning_exercise'

export type BookingStatus = 'pending_payment' | 'paid' | 'in_use' | 'completed' | 'cancelled' | 'refunding' | 'refunded'

export type CertType = 'student' | 'faculty' | 'senior'

export type CertStatus = 'pending' | 'approved' | 'rejected' | 'expired'

export type PaymentChannel = 'stored_value' | 'line_pay' | 'jkopay' | 'apple_pay'

export interface Venue {
  id: string
  name: string
  category: VenueCategory
  city: '台北市' | '新北市'
  district: string
  address: string
  mrt_station: string
  mrt_walking_minutes: number
  building: string
  description: string
  max_capacity: number
  price_normal_twd: number
  price_student_twd: number
  price_senior_twd: number
  status: 'open' | 'maintenance' | 'closed'
  floor_plan_url?: string
  today_available_slots: number
  earliest_available_time?: string
}

export interface TimeSlot {
  id: string
  venue_id: string
  date: string
  start_time: string
  end_time: string
  status: 'available' | 'full' | 'unavailable'
  remaining_capacity: number
  price_twd: number
}

export interface Booking {
  id: string
  order_no: string
  user_id: string
  venue: Venue
  time_slot: TimeSlot
  status: BookingStatus
  amount_twd: number
  final_amount_twd: number
  cert_type_snapshot?: CertType
  payment_expires_at?: string
  created_at: string
  updated_at: string
}

export interface Payment {
  channel: PaymentChannel
  status: 'completed' | 'redirect_required'
  payment_url?: string
}

export interface Certification {
  id: string
  cert_type: CertType
  status: CertStatus
  review_note?: string
  expires_at?: string
  created_at: string
}

export interface UserProfile {
  id: string
  nickname: string
  avatar_url?: string
  phone?: string
  stored_value_twd: number
  coupon_count: number
  active_cert_type?: CertType
  cert_expires_at?: string
  certifications: Certification[]
}
