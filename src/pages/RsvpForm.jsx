import { useState } from 'react'
import { submitRsvp } from '../api.js'
import { Calendar, Clock, Pin, Heart } from '../components/Icons.jsx'

const POSTER = import.meta.env.BASE_URL + 'poster.png'

// Event details — edit these if anything changes.
const EVENT = {
  date: '29 August 2026',
  time: '3:00 PM – 6:00 PM',
  venue: 'Ssavoury Restaurant & Event Space',
  dress: 'Baby Blue, Baby Pink or White',
  dressZh: '宝宝蓝、宝宝粉或白色',
  google: 'https://maps.app.goo.gl/qNY65p386RxHSGWc8',
  waze: 'https://waze.com/ul/hw2838fenn',
}

function Stepper({ label, value, onChange }) {
  const set = (n) => onChange(Math.max(0, Math.min(99, n)))
  return (
    <div className="stepper">
      <div className="cap">{label}</div>
      <div className="row">
        <button type="button" aria-label={`Fewer ${label}`} onClick={() => set(value - 1)}>
          −
        </button>
        <span className="num">{value}</span>
        <button type="button" aria-label={`More ${label}`} onClick={() => set(value + 1)}>
          +
        </button>
      </div>
    </div>
  )
}

export default function RsvpForm() {
  const [form, setForm] = useState({
    name: '',
    contact: '',
    attending: '',
    adults: 1,
    children: 0,
    babies: 0,
    baby_chair: 'no',
    dietary: '',
  })
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const [done, setDone] = useState(false)

  const set = (patch) => setForm((f) => ({ ...f, ...patch }))
  const going = form.attending === 'yes'

  async function handleSubmit() {
    setError('')
    if (!form.name.trim() || !form.contact.trim()) {
      setError('Please share your name and contact number. 请填写姓名与联络号码。')
      return
    }
    if (!form.attending) {
      setError('Please let us know if you can attend. 请告知您是否出席。')
      return
    }
    setBusy(true)
    try {
      await submitRsvp({
        name: form.name.trim(),
        contact: form.contact.trim(),
        attending: form.attending,
        adults: going ? form.adults : 0,
        children: going ? form.children : 0,
        babies: going ? form.babies : 0,
        baby_chair: going ? form.baby_chair : 'no',
        dietary: going ? form.dietary.trim() : '',
      })
      setDone(true)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (e) {
      setError(e.message)
    } finally {
      setBusy(false)
    }
  }

  if (done) {
    return (
      <div className="page">
        <div className="card">
          <div className="cover">
            <img src={POSTER} alt="Yann Xü is turning one" />
          </div>
          <div className="thanks">
            <div className="crown">👑</div>
            <h2>Thank you!</h2>
            <div className="thanks-zh">谢谢您！</div>
            <p>
              Your RSVP for Yann Xü's 1st birthday has been received. We can't wait to celebrate
              this magical day with you on {EVENT.date}.
            </p>
            <p className="p-zh">我们已收到您的回复，期待与您共度 Yann Xü 的一周岁生日！</p>
            <button className="ghost" onClick={() => window.location.reload()}>
              Submit another response 再填写一份
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="page">
      <div className="card">
        <div className="cover">
          <img src={POSTER} alt="Yann Xü is turning one — 1st birthday celebration" />
        </div>

        <div className="intro">
          <div className="eyebrow">You're warmly invited to</div>
          <div className="eyebrow-zh">诚挚邀请您出席</div>
        </div>

        <div className="details">
          <div className="chip">
            <span className="ic"><Calendar /></span>
            <div>
              <div className="t">Date <span className="tzh">日期</span></div>
              <div className="v">{EVENT.date}</div>
            </div>
          </div>
          <div className="chip">
            <span className="ic"><Clock /></span>
            <div>
              <div className="t">Time <span className="tzh">时间</span></div>
              <div className="v">{EVENT.time}</div>
            </div>
          </div>
          <div className="chip">
            <span className="ic"><Pin /></span>
            <div>
              <div className="t">Venue <span className="tzh">地点</span></div>
              <div className="v">{EVENT.venue}</div>
            </div>
          </div>
          <div className="chip">
            <span className="ic"><Heart /></span>
            <div>
              <div className="t">Dress code <span className="tzh">着装</span></div>
              <div className="v">{EVENT.dress}</div>
              <div className="vzh">{EVENT.dressZh}</div>
            </div>
          </div>
        </div>

        <div className="maps">
          <a className="mapbtn g" href={EVENT.google} target="_blank" rel="noopener noreferrer">
            <span className="mapic">📍</span> Google Maps <span className="mzh">地图导航</span>
          </a>
          <a className="mapbtn w" href={EVENT.waze} target="_blank" rel="noopener noreferrer">
            <span className="mapic">🧭</span> Waze <span className="mzh">导航</span>
          </a>
        </div>

        <div className="divider">
          <span>RSVP</span>
        </div>

        <form className="rsvp" onSubmit={(e) => e.preventDefault()}>
          <div className="field">
            <label htmlFor="name">
              Name <span className="zh">姓名</span> <span className="req">*</span>
            </label>
            <input
              id="name"
              type="text"
              placeholder="Your full name 您的姓名"
              value={form.name}
              onChange={(e) => set({ name: e.target.value })}
            />
          </div>

          <div className="field">
            <label htmlFor="contact">
              Contact number <span className="zh">联络号码</span> <span className="req">*</span>
            </label>
            <input
              id="contact"
              type="tel"
              inputMode="tel"
              placeholder="e.g. 012-345 6789"
              value={form.contact}
              onChange={(e) => set({ contact: e.target.value })}
            />
          </div>

          <div className="field">
            <label>
              Will you be attending? <span className="zh">您会出席吗？</span> <span className="req">*</span>
            </label>
            <div className="choice">
              <button
                type="button"
                className={'pill' + (form.attending === 'yes' ? ' on' : '')}
                onClick={() => set({ attending: 'yes' })}
              >
                💗 Joyfully yes 乐意出席
              </button>
              <button
                type="button"
                className={'pill no' + (form.attending === 'no' ? ' on' : '')}
                onClick={() => set({ attending: 'no' })}
              >
                Sadly no 无法出席
              </button>
            </div>
          </div>

          {going && (
            <div className="conditional">
              <div className="field">
                <label>
                  How many are coming? <span className="zh">出席人数</span>{' '}
                  <span className="hint">— tap + or −</span>
                </label>
                <div className="counts">
                  <Stepper label="Adults 大人" value={form.adults} onChange={(n) => set({ adults: n })} />
                  <Stepper
                    label="Children 小孩"
                    value={form.children}
                    onChange={(n) => set({ children: n })}
                  />
                  <Stepper label="Babies 婴儿" value={form.babies} onChange={(n) => set({ babies: n })} />
                </div>
              </div>

              <div className="field">
                <label>Do you need a baby chair? <span className="zh">需要婴儿高脚椅吗？</span></label>
                <div className="choice">
                  <button
                    type="button"
                    className={'pill' + (form.baby_chair === 'yes' ? ' on' : '')}
                    onClick={() => set({ baby_chair: 'yes' })}
                  >
                    Yes, please 需要
                  </button>
                  <button
                    type="button"
                    className={'pill no' + (form.baby_chair === 'no' ? ' on' : '')}
                    onClick={() => set({ baby_chair: 'no' })}
                  >
                    No, thank you 不需要
                  </button>
                </div>
              </div>

              <div className="field">
                <label htmlFor="dietary">
                  Any dietary restrictions or food allergies? <span className="zh">饮食禁忌或食物过敏？</span>{' '}
                  <span className="hint">— optional 选填</span>
                </label>
                <textarea
                  id="dietary"
                  placeholder="e.g. vegetarian, no nuts, no seafood 例如：素食、不吃坚果、不吃海鲜…"
                  value={form.dietary}
                  onChange={(e) => set({ dietary: e.target.value })}
                />
              </div>
            </div>
          )}

          {error && <div className="formError">{error}</div>}

          <button className="btn" disabled={busy} onClick={handleSubmit}>
            {busy ? 'Sending… 提交中' : 'Send my RSVP 提交回复'}
          </button>
        </form>

        <div className="footnote">With love, from Gavin &amp; June 🎠</div>
      </div>
    </div>
  )
}
