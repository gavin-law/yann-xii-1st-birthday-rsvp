const PETALS = [
  { left: '6%', delay: '0s', dur: '15s', ch: '🌸', size: 18 },
  { left: '22%', delay: '4s', dur: '19s', ch: '✨', size: 14 },
  { left: '38%', delay: '9s', dur: '17s', ch: '🌷', size: 17 },
  { left: '55%', delay: '2s', dur: '21s', ch: '✨', size: 13 },
  { left: '70%', delay: '7s', dur: '16s', ch: '🌸', size: 19 },
  { left: '86%', delay: '11s', dur: '20s', ch: '💛', size: 15 },
]

export default function Sky() {
  return (
    <div className="sky" aria-hidden="true">
      {PETALS.map((p, i) => (
        <span
          key={i}
          className="petal"
          style={{
            left: p.left,
            fontSize: p.size,
            animationDelay: p.delay,
            animationDuration: p.dur,
          }}
        >
          {p.ch}
        </span>
      ))}
    </div>
  )
}
