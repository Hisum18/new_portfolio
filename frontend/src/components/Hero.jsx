import { useState, useEffect } from 'react'
import { ArrowRight } from 'lucide-react'
import Beams from './Beams'

const ROLE = 'Software Engineer  ·  Web & Mobile Developer'

const Button = ({ variant = 'default', className = '', children, ...props }) => {
  const variants = {
    default: 'bg-white text-black hover:bg-gray-100',
    outline: 'border border-white/20 bg-white/5 backdrop-blur-xl text-white/80 hover:bg-white/10 hover:border-white/40 hover:text-white',
  }

  return (
    <button
      className={`group relative overflow-hidden rounded-full inline-flex items-center justify-center px-7 py-3 text-sm font-semibold transition-all duration-200 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 ${variants[variant]} ${className}`}
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
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
    >
      <div className="absolute inset-0 z-0">
        <Beams
          beamWidth={2.5}
          beamHeight={18}
          beamNumber={15}
          lightColor="#ffffff"
          speed={2.5}
          noiseIntensity={2}
          scale={0.15}
          rotation={43}
        />
      </div>

      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/40 via-transparent to-black pointer-events-none" />

      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(ellipse 70% 45% at 50% 45%, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 50%, transparent 80%)',
        }}
      />

      <div
        className="relative z-10 text-center px-6 max-w-4xl mx-auto"
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

        <p className="text-lg md:text-xl text-white/50 mb-10 font-light max-w-xl mx-auto leading-relaxed min-h-[2rem]">
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
          <Button
            onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
          >
            View Projects
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

      <button
        onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
        aria-label="Scroll to next section"
        className="absolute z-10 bottom-8 left-1/2 -translate-x-1/2 w-11 h-11 rounded-full border border-white/20 bg-white/5 backdrop-blur-xl flex items-center justify-center text-white/50 hover:text-white hover:border-white/50 hover:bg-white/10 transition-all duration-300"
        style={{ animation: 'heroIn 0.6s ease 1.6s both' }}
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
    </section>
  )
}
