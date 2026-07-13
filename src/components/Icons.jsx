const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

export function Calendar() {
  return (
    <svg viewBox="0 0 24 24" style={{ color: '#d16fa0' }} {...base}>
      <rect x="3" y="5" width="18" height="16" rx="2.5" />
      <path d="M3 9h18M8 3v4M16 3v4" />
    </svg>
  )
}
export function Clock() {
  return (
    <svg viewBox="0 0 24 24" style={{ color: '#9174c6' }} {...base}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  )
}
export function Pin() {
  return (
    <svg viewBox="0 0 24 24" style={{ color: '#c45f93' }} {...base}>
      <path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.6" />
    </svg>
  )
}
export function Heart() {
  return (
    <svg viewBox="0 0 24 24" style={{ color: '#d8ab5c' }} {...base}>
      <path d="M12 20s-7-4.5-9.2-9C1.3 8.2 2.7 5 6 5c2 0 3.2 1.4 4 2.5C10.8 6.4 12 5 14 5c3.3 0 4.7 3.2 3.2 6-2.2 4.5-9.2 9-9.2 9z" />
    </svg>
  )
}
