import type { Venue, TimeSlot, Booking, UserProfile, Certification } from './types'

export const VENUES: Venue[] = [
  {
    id: 'venue-001',
    name: '台北市大安運動中心',
    category: 'basketball',
    city: '台北市',
    district: '大安區',
    address: '台北市大安區建國南路二段333號',
    mrt_station: '大安森林公園站',
    mrt_walking_minutes: 3,
    building: '地下一樓至地上七樓',
    description: '大安運動中心為大安區旗艦型運動設施，籃球場設備完善，提供標準NBA規格木質地板球場，設有電子計分板及觀眾席，適合個人練習與正式比賽。',
    max_capacity: 20,
    price_normal_twd: 200,
    price_student_twd: 0,
    price_senior_twd: 100,
    status: 'open',
    today_available_slots: 5,
    earliest_available_time: '08:00',
  },
  {
    id: 'venue-002',
    name: '台北市中山運動中心',
    category: 'badminton',
    city: '台北市',
    district: '中山區',
    address: '台北市中山區中山北路二段44巷2號',
    mrt_station: '中山站',
    mrt_walking_minutes: 5,
    building: '地上五樓',
    description: '中山運動中心羽球場共12面，採用標準國際羽聯認可木地板，場館全面空調，燈光照明達到國際比賽標準，鄰近中山商圈，交通便利。',
    max_capacity: 12,
    price_normal_twd: 150,
    price_student_twd: 0,
    price_senior_twd: 75,
    status: 'open',
    today_available_slots: 4,
    earliest_available_time: '10:00',
  },
  {
    id: 'venue-003',
    name: '台北市信義運動中心',
    category: 'swimming',
    city: '台北市',
    district: '信義區',
    address: '台北市信義區莊敬路348號',
    mrt_station: '象山站',
    mrt_walking_minutes: 8,
    building: '地上六樓',
    description: '信義運動中心游泳池為標準50公尺競賽池，水溫恆溫28度，提供8條泳道，另設有兒童池與水療池，場館設施現代化，淋浴間寬敞舒適。',
    max_capacity: 16,
    price_normal_twd: 250,
    price_student_twd: 0,
    price_senior_twd: 125,
    status: 'open',
    today_available_slots: 6,
    earliest_available_time: '06:00',
  },
  {
    id: 'venue-004',
    name: '台北市南港運動中心',
    category: 'table_tennis',
    city: '台北市',
    district: '南港區',
    address: '台北市南港區忠孝東路七段520號',
    mrt_station: '南港展覽館站',
    mrt_walking_minutes: 5,
    building: '地上四樓',
    description: '南港運動中心桌球室設有20張標準比賽用桌，採用ITTF認可球桌，地板為防滑運動地板，提供球拍租借服務，適合各程度選手使用。',
    max_capacity: 20,
    price_normal_twd: 180,
    price_student_twd: 0,
    price_senior_twd: 90,
    status: 'open',
    today_available_slots: 8,
    earliest_available_time: '08:00',
  },
  {
    id: 'venue-005',
    name: '台北市木柵運動中心',
    category: 'tennis',
    city: '台北市',
    district: '文山區',
    address: '台北市文山區木柵路三段130號',
    mrt_station: '動物園站',
    mrt_walking_minutes: 10,
    building: '地上三樓',
    description: '木柵運動中心網球場共6面，室內硬地球場，全面LED照明，不受天候影響，提供球拍租借與教練課程，毗鄰木柵公園，環境清幽。',
    max_capacity: 12,
    price_normal_twd: 300,
    price_student_twd: 0,
    price_senior_twd: 150,
    status: 'open',
    today_available_slots: 3,
    earliest_available_time: '14:00',
  },
  {
    id: 'venue-006',
    name: '台北市天母運動中心',
    category: 'morning_exercise',
    city: '台北市',
    district: '士林區',
    address: '台北市士林區中山北路六段336號',
    mrt_station: '芝山站',
    mrt_walking_minutes: 15,
    building: '地上五樓',
    description: '天母運動中心晨間運動區設有有氧舞蹈教室、伸展區與輕器械區，早晨班別深受社區長輩與上班族喜愛，場館採大面窗設計，採光充足。',
    max_capacity: 20,
    price_normal_twd: 150,
    price_student_twd: 0,
    price_senior_twd: 75,
    status: 'open',
    today_available_slots: 7,
    earliest_available_time: '06:00',
  },
  {
    id: 'venue-007',
    name: '新北市板橋運動中心',
    category: 'basketball',
    city: '新北市',
    district: '板橋區',
    address: '新北市板橋區縣民大道二段3號',
    mrt_station: '板橋站',
    mrt_walking_minutes: 5,
    building: '地下一樓至地上八樓',
    description: '板橋運動中心為新北市旗艦型體育設施，籃球場共4面，全木質彈性地板，具備完整的更衣室、淋浴設備，鄰近板橋車站，四鐵交匯，交通極為便利。',
    max_capacity: 20,
    price_normal_twd: 200,
    price_student_twd: 0,
    price_senior_twd: 100,
    status: 'open',
    today_available_slots: 6,
    earliest_available_time: '08:00',
  },
  {
    id: 'venue-008',
    name: '新北市永和運動中心',
    category: 'badminton',
    city: '新北市',
    district: '永和區',
    address: '新北市永和區永和路二段265號',
    mrt_station: '永安市場站',
    mrt_walking_minutes: 8,
    building: '地上六樓',
    description: '永和運動中心羽球場共8面，採用優質木質地板，場館設備齊全，提供球拍租借及羽球販賣服務，定期舉辦社區羽球聯賽，氣氛友善。',
    max_capacity: 16,
    price_normal_twd: 150,
    price_student_twd: 0,
    price_senior_twd: 75,
    status: 'open',
    today_available_slots: 4,
    earliest_available_time: '10:00',
  },
  {
    id: 'venue-009',
    name: '新北市新莊運動中心',
    category: 'swimming',
    city: '新北市',
    district: '新莊區',
    address: '新北市新莊區中正路516號',
    mrt_station: '輔大站',
    mrt_walking_minutes: 10,
    building: '地上五樓',
    description: '新莊運動中心游泳池為25公尺標準池，共6條泳道，水質定時檢驗，全年恆溫，設有完善的淋浴更衣設備，鄰近輔仁大學，常有學生族群使用。',
    max_capacity: 16,
    price_normal_twd: 250,
    price_student_twd: 0,
    price_senior_twd: 125,
    status: 'open',
    today_available_slots: 5,
    earliest_available_time: '08:00',
  },
  {
    id: 'venue-010',
    name: '新北市三重運動中心',
    category: 'table_tennis',
    city: '新北市',
    district: '三重區',
    address: '新北市三重區重新路五段609巷20號',
    mrt_station: '三重站',
    mrt_walking_minutes: 3,
    building: '地上四樓',
    description: '三重運動中心桌球室設備完善，提供16張專業比賽用桌，場地寬敞明亮，定期舉辦桌球訓練營與社區聯賽，捷運三重站步行即達，交通便利。',
    max_capacity: 16,
    price_normal_twd: 180,
    price_student_twd: 0,
    price_senior_twd: 90,
    status: 'open',
    today_available_slots: 2,
    earliest_available_time: '18:00',
  },
]

const SLOT_STATUSES: Array<TimeSlot['status']> = [
  'available',
  'full',
  'available',
  'unavailable',
  'full',
  'available',
  'full',
  'unavailable',
]

export function generateTimeSlots(venueId: string, date: string): TimeSlot[] {
  return getTimeSlots(venueId, date)
}

export function getTimeSlots(venueId: string, date: string): TimeSlot[] {
  const venue = VENUES.find((v) => v.id === venueId)
  const pricePerSlot = venue?.price_normal_twd ?? 200

  const startHours = [6, 8, 10, 12, 14, 16, 18, 20]

  return startHours.map((hour, index) => {
    const startH = String(hour).padStart(2, '0')
    const endH = String(hour + 2).padStart(2, '0')
    const slotStatus = SLOT_STATUSES[index]
    const maxCap = venue?.max_capacity ?? 10
    const remaining =
      slotStatus === 'available'
        ? Math.floor(maxCap * 0.6)
        : slotStatus === 'full'
          ? 0
          : 0

    return {
      id: `${venueId}-${date}-${startH}`,
      venue_id: venueId,
      date,
      start_time: `${startH}:00`,
      end_time: `${endH}:00`,
      status: slotStatus,
      remaining_capacity: remaining,
      price_twd: pricePerSlot,
    }
  })
}

const CERT_STUDENT: Certification = {
  id: 'cert-001',
  cert_type: 'student',
  status: 'approved',
  expires_at: '2027-06-30T00:00:00.000Z',
  created_at: '2025-09-01T10:00:00.000Z',
}

export const MOCK_USER: UserProfile = {
  id: 'user-001',
  nickname: '陳小明',
  avatar_url: undefined,
  phone: '0912345678',
  stored_value_twd: 350,
  coupon_count: 2,
  active_cert_type: 'student',
  cert_expires_at: '2027-06-30T00:00:00.000Z',
  certifications: [CERT_STUDENT],
}

const makeSlot = (venueId: string, date: string, hour: number): TimeSlot => {
  const venue = VENUES.find((v) => v.id === venueId)!
  const startH = String(hour).padStart(2, '0')
  const endH = String(hour + 2).padStart(2, '0')
  return {
    id: `${venueId}-${date}-${startH}`,
    venue_id: venueId,
    date,
    start_time: `${startH}:00`,
    end_time: `${endH}:00`,
    status: 'available',
    remaining_capacity: Math.floor(venue.max_capacity * 0.5),
    price_twd: venue.price_normal_twd,
  }
}

export const MOCK_BOOKINGS: Booking[] = [
  // 2 pending_payment
  {
    id: 'booking-001',
    order_no: 'ORD20260610001',
    user_id: 'user-001',
    venue: VENUES[0], // 大安運動中心
    time_slot: makeSlot('venue-001', '2026-07-05', 10),
    status: 'pending_payment',
    amount_twd: 200,
    final_amount_twd: 200,
    cert_type_snapshot: undefined,
    payment_expires_at: '2026-07-04T23:59:00.000Z',
    created_at: '2026-06-29T09:00:00.000Z',
    updated_at: '2026-06-29T09:00:00.000Z',
  },
  {
    id: 'booking-002',
    order_no: 'ORD20260610002',
    user_id: 'user-001',
    venue: VENUES[6], // 板橋運動中心
    time_slot: makeSlot('venue-007', '2026-07-06', 14),
    status: 'pending_payment',
    amount_twd: 200,
    final_amount_twd: 200,
    cert_type_snapshot: undefined,
    payment_expires_at: '2026-07-05T23:59:00.000Z',
    created_at: '2026-06-29T11:30:00.000Z',
    updated_at: '2026-06-29T11:30:00.000Z',
  },
  // 2 paid
  {
    id: 'booking-003',
    order_no: 'ORD20260605003',
    user_id: 'user-001',
    venue: VENUES[1], // 中山運動中心
    time_slot: makeSlot('venue-002', '2026-07-08', 16),
    status: 'paid',
    amount_twd: 150,
    final_amount_twd: 0,
    cert_type_snapshot: 'student',
    created_at: '2026-06-25T14:00:00.000Z',
    updated_at: '2026-06-25T14:05:00.000Z',
  },
  {
    id: 'booking-004',
    order_no: 'ORD20260605004',
    user_id: 'user-001',
    venue: VENUES[2], // 信義運動中心
    time_slot: makeSlot('venue-003', '2026-07-10', 8),
    status: 'paid',
    amount_twd: 250,
    final_amount_twd: 125,
    cert_type_snapshot: 'student',
    created_at: '2026-06-26T09:00:00.000Z',
    updated_at: '2026-06-26T09:10:00.000Z',
  },
  // 2 completed
  {
    id: 'booking-005',
    order_no: 'ORD20260520005',
    user_id: 'user-001',
    venue: VENUES[3], // 南港運動中心
    time_slot: makeSlot('venue-004', '2026-06-15', 10),
    status: 'completed',
    amount_twd: 180,
    final_amount_twd: 0,
    cert_type_snapshot: 'student',
    created_at: '2026-06-14T18:00:00.000Z',
    updated_at: '2026-06-15T12:00:00.000Z',
  },
  {
    id: 'booking-006',
    order_no: 'ORD20260520006',
    user_id: 'user-001',
    venue: VENUES[7], // 永和運動中心
    time_slot: makeSlot('venue-008', '2026-06-20', 18),
    status: 'completed',
    amount_twd: 150,
    final_amount_twd: 0,
    cert_type_snapshot: 'student',
    created_at: '2026-06-19T10:00:00.000Z',
    updated_at: '2026-06-20T20:00:00.000Z',
  },
  // 2 cancelled
  {
    id: 'booking-007',
    order_no: 'ORD20260510007',
    user_id: 'user-001',
    venue: VENUES[4], // 木柵運動中心
    time_slot: makeSlot('venue-005', '2026-06-10', 14),
    status: 'cancelled',
    amount_twd: 300,
    final_amount_twd: 300,
    cert_type_snapshot: undefined,
    created_at: '2026-06-08T16:00:00.000Z',
    updated_at: '2026-06-09T08:00:00.000Z',
  },
  {
    id: 'booking-008',
    order_no: 'ORD20260510008',
    user_id: 'user-001',
    venue: VENUES[9], // 三重運動中心
    time_slot: makeSlot('venue-010', '2026-06-12', 18),
    status: 'cancelled',
    amount_twd: 180,
    final_amount_twd: 180,
    cert_type_snapshot: undefined,
    created_at: '2026-06-10T20:00:00.000Z',
    updated_at: '2026-06-11T09:00:00.000Z',
  },
]
