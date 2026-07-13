import { useEffect, useState, type FormEvent } from 'react';
import {
  createRsvp,
  fetchRsvps,
  type NewRsvp,
  type Rsvp,
} from './api.ts';

const EMPTY_FORM: NewRsvp = {
  name: '',
  email: '',
  attending: true,
  guests: 0,
  message: '',
};

export default function App() {
  const [form, setForm] = useState<NewRsvp>(EMPTY_FORM);
  const [rsvps, setRsvps] = useState<Rsvp[]>([]);
  const [totalGuests, setTotalGuests] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function loadRsvps() {
    try {
      const data = await fetchRsvps();
      setRsvps(data.rsvps);
      setTotalGuests(data.totalAttendingGuests);
    } catch {
      setError('Could not load the guest list. Is the server running?');
    }
  }

  useEffect(() => {
    void loadRsvps();
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSuccess(null);
    setSubmitting(true);
    try {
      const created = await createRsvp(form);
      setSuccess(
        created.attending
          ? `Thanks, ${created.name}! We can't wait to celebrate with you. 🎉`
          : `Thanks for letting us know, ${created.name}. We'll miss you!`,
      );
      setForm(EMPTY_FORM);
      await loadRsvps();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="page">
      <header className="hero">
        <p className="eyebrow">You&apos;re invited!</p>
        <h1>
          Yann XII is turning <span className="one">1</span>
        </h1>
        <p className="subtitle">
          Join us for cake, balloons, and first-birthday joy. Please let us know
          if you can make it.
        </p>
      </header>

      <section className="card">
        <h2>RSVP</h2>
        <form onSubmit={handleSubmit} className="form">
          <label>
            Your name
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Ada Lovelace"
            />
          </label>

          <label>
            Email
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="ada@example.com"
            />
          </label>

          <fieldset className="attendance">
            <legend>Will you attend?</legend>
            <label className="radio">
              <input
                type="radio"
                name="attending"
                checked={form.attending}
                onChange={() => setForm({ ...form, attending: true })}
              />
              Yes, I&apos;ll be there
            </label>
            <label className="radio">
              <input
                type="radio"
                name="attending"
                checked={!form.attending}
                onChange={() => setForm({ ...form, attending: false })}
              />
              Sorry, can&apos;t make it
            </label>
          </fieldset>

          {form.attending && (
            <label>
              Additional guests
              <input
                type="number"
                min={0}
                max={10}
                value={form.guests}
                onChange={(e) =>
                  setForm({ ...form, guests: Number(e.target.value) })
                }
              />
            </label>
          )}

          <label>
            Message (optional)
            <textarea
              rows={3}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="Happy birthday, Yann!"
            />
          </label>

          <button type="submit" disabled={submitting}>
            {submitting ? 'Sending…' : 'Send RSVP'}
          </button>

          {error && <p className="alert error">{error}</p>}
          {success && <p className="alert success">{success}</p>}
        </form>
      </section>

      <section className="card">
        <h2>
          Guest list{' '}
          <span className="count">{totalGuests} attending</span>
        </h2>
        {rsvps.length === 0 ? (
          <p className="empty">No RSVPs yet — be the first!</p>
        ) : (
          <ul className="guests">
            {rsvps.map((rsvp) => (
              <li key={rsvp.id} className="guest">
                <div className="guest-main">
                  <span className="guest-name">{rsvp.name}</span>
                  <span
                    className={`badge ${rsvp.attending ? 'yes' : 'no'}`}
                  >
                    {rsvp.attending
                      ? `Attending${rsvp.guests ? ` +${rsvp.guests}` : ''}`
                      : 'Not attending'}
                  </span>
                </div>
                {rsvp.message && (
                  <p className="guest-message">“{rsvp.message}”</p>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
