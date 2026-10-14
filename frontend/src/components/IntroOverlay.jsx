import { useState, useEffect, useRef } from 'react'

const BOOT_MS = 1100
const HOLD_MS = 300
const FADE_MS = 500

export default function IntroOverlay() {
  const [phase, setPhase] = useState('in')
  const [pct, setPct] = useState(0)
  const raf = useRef(0)

  useEffect(() => {
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      setPct(100)
      const tOut = setTimeout(() => setPhase('out'), 500)
      const tDone = setTimeout(() => setPhase('done'), 900)
      return () => { clearTimeout(tOut); clearTimeout(tDone) }
    }

    const started = performance.now()
    const run = (now) => {
      const p = Math.min(1, (now - started) / BOOT_MS)
      setPct(Math.round(p * 100))
      if (p < 1) raf.current = requestAnimationFrame(run)
    }
    raf.current = requestAnimationFrame(run)

    const tOut = setTimeout(() => setPhase('out'), BOOT_MS + HOLD_MS)
    const tDone = setTimeout(() => setPhase('done'), BOOT_MS + HOLD_MS + FADE_MS)
    return () => {
      cancelAnimationFrame(raf.current)
      clearTimeout(tOut)
      clearTimeout(tDone)
    }
  }, [])

  if (phase === 'done') return null

  const ready = pct >= 100

  return (
    <div
      className={`fixed inset-0 z-[100] bg-black flex items-center justify-center pointer-events-none transition-opacity duration-500 ${
        phase === 'out' ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="flex flex-col items-center w-[min(82vw,320px)]">
        {/* top status: prompt + live percentage */}
        <div className="w-full flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.25em] text-white/35 mb-7">
          <span className="text-green-400/70">&#10095; init</span>
          <span className="tabular-nums">{String(pct).padStart(3, '0')}%</span>
        </div>

        {/* HS framed as a component tag — brackets hold, letters compile in */}
        <div className="flex items-center font-heading font-black text-white leading-none select-none">
          <span className="font-mono font-normal text-3xl md:text-4xl text-green-400/45 mr-1.5">&lt;</span>
          <span
            className="text-7xl md:text-8xl"
            style={{ animation: 'slideFromLeft 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.1s both' }}
          >
            H
          </span>
          <span
            className="text-7xl md:text-8xl"
            style={{ animation: 'slideFromRight 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.1s both' }}
          >
            S
          </span>
          <span className="font-mono font-normal text-3xl md:text-4xl text-green-400/45 ml-1.5">/&gt;</span>
        </div>

        {/* compile bar */}
        <div className="mt-8 w-full h-px bg-white/10 overflow-hidden">
          <div
            className="h-full bg-green-400/80 shadow-[0_0_8px_rgba(74,222,128,0.6)]"
            style={{ width: `${pct}%` }}
          />
        </div>

        {/* bottom status line */}
        <div className="w-full mt-3 font-mono text-[10px] tracking-wider text-white/30">
          {ready ? (
            <span className="text-green-400/80">&#10003; build complete</span>
          ) : (
            <span>compiling portfolio<span className="animate-pulse">_</span></span>
          )}
        </div>
      </div>
    </div>
  )
}
