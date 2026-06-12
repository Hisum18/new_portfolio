import { useState, useEffect } from 'react'

const ROLE = 'Aspiring Software Engineer  ·  Web & Mobile Developer'

const ICONS = [
  { symbol: '</>', top: '10%',  left:  '5%',  size: 13, opacity: 0.14, delay: '0s',    dur: '4.5s' },
  { symbol: '{ }', top: '20%',  right: '6%',  size: 12, opacity: 0.12, delay: '1.3s',  dur: '5.2s' },
  { symbol: '()',   top: '72%',  left:  '6%',  size: 14, opacity: 0.13, delay: '2.1s',  dur: '4s'   },
  { symbol: '=>',   top: '33%',  left:  '12%', size: 12, opacity: 0.13, delay: '0.6s',  dur: '4.8s' },
  { symbol: '//',   top: '80%',  right: '8%',  size: 12, opacity: 0.12, delay: '1.9s',  dur: '5.5s' },
  { symbol: '&&',   top: '16%',  left:  '26%', size: 11, opacity: 0.10, delay: '3.2s',  dur: '4.3s' },
  { symbol: 'fn()', top: '60%',  right: '5%',  size: 12, opacity: 0.13, delay: '0.9s',  dur: '5s'   },
  { symbol: '#',    top: '85%',  left:  '17%', size: 16, opacity: 0.11, delay: '2.6s',  dur: '3.7s' },
  { symbol: 'import',top:'44%',  left:  '2%',  size: 10, opacity: 0.11, delay: '1.6s',  dur: '6.1s' },
  { symbol: 'const', top: '7%',  right: '20%', size: 10, opacity: 0.10, delay: '4s',    dur: '5.7s' },
  { symbol: 'class', top: '75%', right: '20%', size: 10, opacity: 0.11, delay: '0.4s',  dur: '4.6s' },
  { symbol: '<div>', top: '4%',  left:  '40%', size: 10, opacity: 0.09, delay: '2.4s',  dur: '5.9s' },
  { symbol: 'npm',   top: '90%', right: '35%', size: 11, opacity: 0.11, delay: '1.1s',  dur: '4.9s' },
  { symbol: 'git',   top: '50%', right: '3%',  size: 12, opacity: 0.12, delay: '4.2s',  dur: '4s'   },
  { symbol: '++',    top: '38%', left:  '4%',  size: 14, opacity: 0.14, delay: '0.7s',  dur: '4.4s' },
  { symbol: '[ ]',   top: '57%', left:  '18%', size: 13, opacity: 0.10, delay: '2.9s',  dur: '5.4s' },
  { symbol: 'def',   top: '93%', left:  '52%', size: 10, opacity: 0.10, delay: '1.7s',  dur: '4.8s' },
  { symbol: '===',   top: '13%', right: '38%', size: 10, opacity: 0.09, delay: '3.5s',  dur: '5.2s' },
]

export default function Hero() {
  const [typed, setTyped] = useState('')

  useEffect(() => {
    // Start typing after the heroIn animation finishes
    const start = setTimeout(() => {
      let i = 0
      const tick = setInterval(() => {
        i++
        setTyped(ROLE.slice(0, i))
        if (i >= ROLE.length) clearInterval(tick)
      }, 38)
      return () => clearInterval(tick)
    }, 2700)
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
          radial-gradient(ellipse at 50% 38%, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.06) 35%, transparent 65%),
          radial-gradient(circle, rgba(255,255,255,0.09) 1px, transparent 1px)
        `,
        backgroundSize: 'auto, auto, 28px 28px',
      }}
    >
      {/* Bottom fade */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black pointer-events-none" />

      {/* Floating code icons */}
      {ICONS.map((icon, i) => (
        <span
          key={i}
          aria-hidden="true"
          style={{
            position:      'absolute',
            top:           icon.top,
            left:          icon.left,
            right:         icon.right,
            fontSize:      `${icon.size}px`,
            opacity:       icon.opacity,
            color:         '#ffffff',
            fontFamily:    'monospace',
            userSelect:    'none',
            pointerEvents: 'none',
            letterSpacing: '0.04em',
            whiteSpace:    'nowrap',
            animation:     `float ${icon.dur} ease-in-out ${icon.delay} infinite`,
          }}
        >
          {icon.symbol}
        </span>
      ))}

      {/* Main content */}
      <div
        className="relative text-center px-6 max-w-4xl mx-auto"
        style={{ animation: 'heroIn 0.8s ease 1.9s both' }}
      >
        <p className="font-mono text-white/40 text-xs tracking-[0.35em] uppercase mb-6">
          Welcome to my portfolio
        </p>

        <h1
          className="font-heading text-6xl sm:text-7xl md:text-8xl font-black tracking-tight mb-5 leading-none bg-clip-text text-transparent"
          style={{
            backgroundImage: 'linear-gradient(to bottom, #ffffff 0%, #ffffff 40%, #888888 100%)',
          }}
        >
          Hisum Shash
        </h1>

        {/* Typewriter subtitle */}
        <p className="text-lg md:text-xl text-white/40 mb-10 font-light max-w-xl mx-auto leading-relaxed min-h-[2rem]">
          {typed}
          {typed.length > 0 && (
            <span
              aria-hidden="true"
              className="inline-block w-[2px] h-[1.1em] bg-white/40 ml-[2px] align-middle"
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

      {/* Scroll arrow */}
      <button
        onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
        aria-label="Scroll to next section"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 w-11 h-11 rounded-full border border-white/20 flex items-center justify-center text-white/40 hover:text-white hover:border-white/50 hover:bg-white/5 transition-all duration-300"
        style={{ animation: 'heroIn 0.6s ease 2.3s both' }}
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
    </section>
  )
}
