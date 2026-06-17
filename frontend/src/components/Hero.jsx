import { useState, useEffect } from 'react'

const ROLE = 'Software Engineer  ·  Web & Mobile Developer'

export default function Hero() {
  const [typed, setTyped] = useState('')

  useEffect(() => {
    const start = setTimeout(() => {
      let i = 0
      const tick = setInterval(() => {
        i++
        setTyped(ROLE.slice(0, i))
        if (i >= ROLE.length) clearInterval(tick)
      }, 38)
      return () => clearInterval(tick)
    }, 1500)
    return () => clearTimeout(start)
  }, [])

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundColor: '#000',
        backgroundImage: `
          linear-gradient(to bottom, rgba(60,60,60,0.55) 0%, rgba(20,20,20,0.3) 45%, rgba(0,0,0,0) 75%),
          radial-gradient(ellipse at 50% 38%, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.06) 35%, transparent 65%)
        `,
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black pointer-events-none" />

      <div
        className="relative text-center px-6 max-w-4xl mx-auto"
        style={{ animation: 'heroIn 0.8s ease 1.2s both' }}
      >
        <h1
          className="font-heading text-6xl sm:text-7xl md:text-8xl font-black tracking-tight mb-5 leading-none bg-clip-text text-transparent"
          style={{
            backgroundImage: 'linear-gradient(to bottom, #ffffff 0%, #ffffff 40%, #888888 100%)',
          }}
        >
          Hisum Shash
        </h1>

        <p className="text-lg md:text-xl text-white/40 mb-10 font-light max-w-xl mx-auto leading-relaxed min-h-[2rem]">
          {typed}
          {typed.length > 0 && (
            <span
              aria-hidden="true"
              className="inline-block w-[2px] h-[1.1em] bg-amber-200/50 ml-[2px] align-middle"
              style={{ animation: 'blink 1s step-end infinite' }}
            />
          )}
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-7 py-3 bg-white hover:bg-gray-100 text-black font-semibold rounded-full text-sm transition-all duration-200 hover:scale-105 active:scale-95"
          >
            View Projects
          </button>
          <button
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-7 py-3 border border-white/20 hover:border-white/50 text-white/60 hover:text-white rounded-full text-sm transition-all duration-200 hover:bg-white/5"
          >
            Get in Touch
          </button>
        </div>
      </div>

      <button
        onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
        aria-label="Scroll to next section"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 w-11 h-11 rounded-full border border-white/20 flex items-center justify-center text-white/40 hover:text-white hover:border-white/50 hover:bg-white/5 transition-all duration-300"
        style={{ animation: 'heroIn 0.6s ease 1.6s both' }}
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
    </section>
  )
}
