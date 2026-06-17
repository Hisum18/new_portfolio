import { useState, useEffect } from 'react'

export default function IntroOverlay() {
  const [phase, setPhase] = useState('in')

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('out'), 1000)
    const t2 = setTimeout(() => setPhase('done'), 1500)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [])

  if (phase === 'done') return null

  return (
    <div
      className={`fixed inset-0 z-[100] bg-black flex items-center justify-center pointer-events-none transition-opacity duration-500 ${
        phase === 'out' ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="flex items-center">
        <span
          className="font-heading text-8xl md:text-9xl font-black text-white"
          style={{ animation: 'slideFromLeft 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.2s both' }}
        >
          H
        </span>
        <span
          className="font-heading text-8xl md:text-9xl font-black text-white"
          style={{ animation: 'slideFromRight 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.2s both' }}
        >
          S
        </span>
      </div>
    </div>
  )
}
