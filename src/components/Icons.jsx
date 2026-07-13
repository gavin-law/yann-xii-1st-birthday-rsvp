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

/** Google Maps product pin (Font Awesome has no Maps brand icon) */
export function GoogleMaps() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path fill="#34A853" d="M12 2C8.13 2 5 5.13 5 9c0 .87.13 1.71.36 2.5L12 22l6.64-10.5c.23-.79.36-1.63.36-2.5 0-3.87-3.13-7-7-7z" />
      <path fill="#FBBC04" d="M12 2v11.5L18.64 11.5C18.87 10.71 19 9.87 19 9c0-3.87-3.13-7-7-7z" />
      <path fill="#EA4335" d="M12 2C8.13 2 5 5.13 5 9c0 .87.13 1.71.36 2.5L12 13.5V2z" />
      <path fill="#4285F4" d="M12 13.5L5.36 11.5 12 22l6.64-10.5L12 13.5z" />
      <circle fill="#1A73E8" cx="12" cy="9" r="3.2" />
      <circle fill="#fff" cx="12" cy="9" r="1.6" />
    </svg>
  )
}

/** Font Awesome Free brands: waze — https://fontawesome.com/icons/brands/solid/waze */
export function Waze() {
  return (
    <svg
      viewBox="0 0 512 512"
      width="18"
      height="18"
      aria-hidden="true"
      role="img"
    >
      <path
        fill="#33CCFF"
        d="M502.17 201.67C516.69 287.53 471.23 369.59 389 409.8c13 34.1-12.4 70.2-48.32 70.2a51.68 51.68 0 0 1-51.57-49c-6.44.19-64.2 0-76.33-.64A51.69 51.69 0 0 1 159 479.92c-33.86-1.36-57.95-34.84-47-67.92-37.21-13.11-72.54-34.87-99.62-70.8-13-17.28-.48-41.8 20.84-41.8 46.31 0 32.22-54.17 43.15-110.26C94.8 95.2 193.12 32 288.09 32c102.48 0 197.15 70.67 214.08 169.67zM373.51 388.28c42-19.18 81.33-56.71 96.29-102.14 40.48-123.09-64.15-228-181.71-228-83.45 0-170.32 55.42-186.07 136-9.53 48.91 5 131.35-68.75 131.35C58.21 358.6 91.6 378.11 127 389.54c24.66-21.8 63.87-15.47 79.83 14.34 14.22 1 79.19 1.18 87.9.82a51.69 51.69 0 0 1 78.78-16.42zM205.12 187.13c0-34.74 50.84-34.75 50.84 0s-50.84 34.74-50.84 0zm116.57 0c0-34.74 50.86-34.75 50.86 0s-50.86 34.75-50.86 0zm-122.61 70.69c-3.44-16.94 22.18-22.18 25.62-5.21l.06.28c4.14 21.42 29.85 44 64.12 43.07 35.68-.94 59.25-22.21 64.11-42.77 4.46-16.05 28.6-10.36 25.47 6-5.23 22.18-31.21 62-91.46 62.9-42.55 0-80.88-27.84-87.9-64.25z"
      />
    </svg>
  )
}
