import { Venue, TimeSlot, Booking } from './types';
import { VENUES, MOCK_BOOKINGS, generateTimeSlots } from './mock-data';

const delay = (ms: number) => new Promise(r => setTimeout(r, ms));

export async function getVenues(filters?: {
  category?: string;
  city?: string;
  district?: string;
}): Promise<Venue[]> {
  await delay(300);
  let results = [...VENUES];
  if (filters?.category) {
    results = results.filter(v => v.category === filters.category);
  }
  if (filters?.city) {
    results = results.filter(v => v.city === filters.city);
  }
  if (filters?.district) {
    results = results.filter(v => v.district === filters.district);
  }
  return results;
}

export async function getVenue(id: string): Promise<Venue | null> {
  await delay(300);
  return VENUES.find(v => v.id === id) ?? null;
}

export async function getTimeSlots(venueId: string, date: string): Promise<TimeSlot[]> {
  await delay(300);
  return generateTimeSlots(venueId, date);
}

export async function getBookings(status?: string): Promise<Booking[]> {
  await delay(300);
  if (!status || status === 'all') {
    return [...MOCK_BOOKINGS];
  }
  return MOCK_BOOKINGS.filter(b => b.status === status);
}

export async function getBooking(id: string): Promise<Booking | null> {
  await delay(300);
  return MOCK_BOOKINGS.find(b => b.id === id) ?? null;
}

export async function submitCertification(
  certType: string,
  data: Record<string, string>
): Promise<{ status: 'pending' }> {
  await delay(300);
  void certType;
  void data;
  return { status: 'pending' };
}

export async function approveCertification(
  certType: string
): Promise<{ status: 'approved' }> {
  await delay(2000);
  void certType;
  return { status: 'approved' };
}

export async function createBooking(timeSlotId: string, userId: string): Promise<Booking> {
  await delay(300);
  void userId;
  // Find the slot and create a mock booking
  const allVenues = VENUES;
  let foundVenue = allVenues[0];
  let foundSlot: TimeSlot | null = null;
  for (const venue of allVenues) {
    const slots = generateTimeSlots(venue.id, new Date().toISOString().split('T')[0]);
    const slot = slots.find((s) => s.id === timeSlotId);
    if (slot) { foundVenue = venue; foundSlot = slot; break; }
  }
  const now = new Date();
  const expiry = new Date(now.getTime() + 15 * 60 * 1000);
  const booking: Booking = {
    id: `bk-${Date.now()}`,
    order_no: `BK${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}${String(Date.now()).slice(-6)}`,
    user_id: userId,
    venue: foundVenue,
    time_slot: (foundSlot as TimeSlot) ?? generateTimeSlots(foundVenue.id, now.toISOString().split('T')[0])[0],
    status: 'pending_payment',
    amount_twd: foundVenue.price_normal_twd,
    final_amount_twd: foundVenue.price_normal_twd,
    payment_expires_at: expiry.toISOString(),
    created_at: now.toISOString(),
    updated_at: now.toISOString(),
  };
  MOCK_BOOKINGS.unshift(booking);
  return booking;
}

export async function mockPay(bookingId: string, channel: string): Promise<{ success: boolean }> {
  await delay(1500);
  void channel;
  const booking = MOCK_BOOKINGS.find((b) => b.id === bookingId);
  if (booking) { booking.status = 'paid'; booking.updated_at = new Date().toISOString(); }
  return { success: true };
}
