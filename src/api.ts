export interface Rsvp {
  id: number;
  name: string;
  email: string;
  attending: number;
  guests: number;
  message: string | null;
  created_at: string;
}

export interface RsvpListResponse {
  rsvps: Rsvp[];
  totalAttendingGuests: number;
}

export interface NewRsvp {
  name: string;
  email: string;
  attending: boolean;
  guests: number;
  message: string;
}

export async function fetchRsvps(): Promise<RsvpListResponse> {
  const res = await fetch('/api/rsvps');
  if (!res.ok) throw new Error('Failed to load RSVPs');
  return res.json();
}

export async function createRsvp(payload: NewRsvp): Promise<Rsvp> {
  const res = await fetch('/api/rsvps', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data?.error ?? 'Failed to submit RSVP');
  }
  return data.rsvp;
}
