import { useState, useEffect } from 'react'
import { ArrowRight } from 'lucide-react'
import portrait from '../assets/portrait.jpg'
import ScrambleName from './ScrambleName'

const ROLE = 'Software Engineer · Web & Mobile Developer'

const Button = ({ variant = 'default', className = '', children, ...props }) => {
  const variants = {
    default: 'bg-white text-black hover:bg-gray-100',
    outline: 'border border-white/20 bg-white/5 backdrop-blur-xl text-white/80 hover:bg-white/10 hover:border-green-400/40 hover:text-white',
  }
  return (
    <button
      className={`group relative overflow-hidden rounded-full inline-flex items-center justify-center px-7 py-3 text-sm font-semibold transition-all duration-200 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400/40 ${variants[variant]} ${className}`}
      {...props}
    >
      <span className="relative z-10 flex items-center">{children}</span>
      <div className="absolute inset-0 -top-2 -bottom-2 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
    </button>
  )
}

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
    <section id="home" className="relative min-h-screen overflow-hidden bg-black flex items-center">
      {/* Portrait */}
      <div className="absolute inset-y-0 right-0 w-full md:w-[62%] lg:w-[56%]">
        <img
          src={portrait}
          alt="Hisum Shash"
          className="w-full h-full object-cover object-[60%_20%]"
        />
        {/* fade the photo's left edge into black so there's no seam with the text column */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent md:via-black/25 md:to-transparent" />
        {/* bottom fade for the section transition + mobile legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/40 md:to-transparent" />
        {/* mobile-only: darken the left where the text sits, so the headline stays legible over the face */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-transparent md:hidden" />
      </div>

      {/* top scrim so the fixed navbar stays legible over the photo */}
      <div className="absolute inset-x-0 top-0 h-28 z-[1] bg-gradient-to-b from-black/70 to-transparent pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6">
        <div className="max-w-xl">
          <h1 className="font-heading text-6xl sm:text-7xl lg:text-8xl font-black leading-[0.92] tracking-tight text-white">
            <ScrambleName lines={['Hisum', 'Shash']} lineClassName="block min-h-[0.92em]" startDelay={1500} />
          </h1>

          <p
            className="mt-6 font-mono text-sm md:text-base text-white/55 min-h-[1.5rem]"
            style={{ animation: 'heroIn 0.6s ease 1.5s both' }}
          >
            <span className="text-green-400">&gt;</span> {typed}
            {typed.length > 0 && (
              <span
                aria-hidden="true"
                className="inline-block w-[0.55em] h-[1.05em] bg-green-400/80 ml-[3px] align-text-bottom"
                style={{ animation: 'blink 1s step-end infinite' }}
              />
            )}
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-3" style={{ animation: 'heroIn 0.6s ease 1.6s both' }}>
            <Button onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}>
              View Work
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Get in Touch
            </Button>
          </div>
        </div>
      </div>

      {/* role tag, bottom-right, terminal-style */}
      <div className="absolute bottom-8 right-6 z-10 hidden md:block text-right font-mono text-[11px] uppercase tracking-[0.25em] text-white/40 leading-relaxed">
        <p className="text-green-400/70">George Mason</p>
        <p>Open to work</p>
      </div>

      <button
        onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
        aria-label="Scroll to next section"
        className="absolute z-10 bottom-8 left-1/2 -translate-x-1/2 w-11 h-11 rounded-full border border-white/20 bg-white/5 backdrop-blur-xl flex items-center justify-center text-white/50 hover:text-green-400 hover:border-green-400/50 hover:bg-white/10 transition-all duration-300"
        style={{ animation: 'heroIn 0.6s ease 1.6s both' }}
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
    </section>
  )
}
