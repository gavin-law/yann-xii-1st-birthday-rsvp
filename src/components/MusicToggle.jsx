import { useState, useEffect, useRef } from 'react'

const AUDIO_URL = import.meta.env.BASE_URL + 'melody.mp3'

export default function MusicToggle() {
  const audioRef = useRef(null)
  const startingRef = useRef(false)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const audio = new Audio(AUDIO_URL)
    audio.loop = true
    audio.volume = 0.55
    audio.preload = 'auto'
    audioRef.current = audio

    const onPlay = () => setPlaying(true)
    const onPause = () => setPlaying(false)
    audio.addEventListener('play', onPlay)
    audio.addEventListener('playing', onPlay)
    audio.addEventListener('pause', onPause)

    // Idempotent play — avoids overlapping play() calls (AbortError).
    const safePlay = async () => {
      const a = audioRef.current
      if (!a || !a.paused || startingRef.current) return
      startingRef.current = true
      try {
        await a.play()
      } catch (e) {
        /* autoplay blocked — will start on next interaction */
      } finally {
        startingRef.current = false
      }
    }
    audioRef.current._safePlay = safePlay

    const events = ['pointerdown', 'keydown', 'scroll', 'touchstart']
    const unlock = () => safePlay()

    // Try to play on entry; if blocked, start on the visitor's first
    // tap / click / scroll / key press anywhere on the page.
    safePlay()
    events.forEach((ev) => window.addEventListener(ev, unlock, { passive: true }))

    return () => {
      events.forEach((ev) => window.removeEventListener(ev, unlock))
      audio.removeEventListener('play', onPlay)
      audio.removeEventListener('playing', onPlay)
      audio.removeEventListener('pause', onPause)
      audio.pause()
    }
  }, [])

  const toggle = () => {
    const a = audioRef.current
    if (!a) return
    if (a.paused) a._safePlay && a._safePlay()
    else a.pause()
  }

  return (
    <button
      className={'music' + (playing ? ' playing' : '')}
      onClick={toggle}
      onPointerDown={(e) => e.stopPropagation()}
      onTouchStart={(e) => e.stopPropagation()}
      aria-label={playing ? 'Pause music' : 'Play music'}
      title={playing ? 'Pause music' : 'Play music'}
    >
      <span className="disc">
        {playing ? (
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
            <path d="M9 18V5l12-2v13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="6" cy="18" r="3" />
            <circle cx="18" cy="16" r="3" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18V5l12-2v13" />
            <circle cx="6" cy="18" r="3" />
            <circle cx="18" cy="16" r="3" />
            <line x1="3" y1="21" x2="21" y2="3" />
          </svg>
        )}
      </span>
    </button>
  )
}
