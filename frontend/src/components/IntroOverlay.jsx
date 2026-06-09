import { useState, useEffect } from 'react'

export default function IntroOverlay() {
  const [phase, setPhase] = useState('in') // in | out | done

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('out'), 1900)
    const t2 = setTimeout(() => setPhase('done'), 2700)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [])

  if (phase === 'done') return null

  return (
    <div
      className={`fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center pointer-events-none transition-opacity duration-700 ${
        phase === 'out' ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <p
        className="font-mono text-white/30 text-[10px] tracking-[0.6em] uppercase mb-5"
        style={{ animation: 'introFadeUp 0.5s ease both' }}
      >
        Portfolio
      </p>

      <h1
        className="text-8xl md:text-9xl font-black text-white"
        style={{ animation: 'introFadeUp 0.5s ease 0.15s both' }}
      >
        HS
      </h1>

      <div
        className="mt-8 w-24 h-px bg-white/10 overflow-hidden rounded-full"
        style={{ animation: 'introFadeUp 0.5s ease 0.3s both' }}
      >
        <div
          className="h-full bg-white/50 rounded-full w-0"
          style={{ animation: 'introBar 1.1s ease 0.55s forwards' }}
        />
      </div>
    </div>
  )
}
