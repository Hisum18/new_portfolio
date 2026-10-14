import { useState, useEffect } from 'react'
import { Github } from 'lucide-react'

const LINKS = [
  { name: 'projects', href: '#projects' },
  { name: 'about', href: '#about' },
  { name: 'skills', href: '#skills' },
  { name: 'contact', href: '#contact' },
]

const Brand = ({ className = '' }) => (
  <span className={`font-mono font-bold tracking-tight ${className}`}>
    <span className="text-green-400/60">&lt;</span>
    <span className="text-white">HS</span>
    <span className="text-green-400/60">/&gt;</span>
  </span>
)

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = LINKS.map(l => document.querySelector(l.href)).filter(Boolean)
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActive('#' + entry.target.id)
        })
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )
    sections.forEach(s => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  const scrollTo = (href) => {
    setMenuOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#0a0a0a]/70 backdrop-blur-xl border-b border-white/5' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 h-16 grid grid-cols-[1fr_auto_1fr] items-center">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="col-start-1 justify-self-start text-lg cursor-pointer transition-opacity hover:opacity-80"
          aria-label="Back to top"
        >
          <Brand />
        </button>

        <div className="col-start-2 justify-self-center hidden md:flex items-center gap-1 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 p-1 font-mono text-[13px]">
          {LINKS.map((l) => (
            <button
              key={l.name}
              onClick={() => scrollTo(l.href)}
              className={`relative rounded-full px-4 py-2 transition-all duration-200 cursor-pointer ${
                active === l.href
                  ? 'bg-white/10 text-white'
                  : 'text-white/55 hover:text-green-400/90 hover:bg-white/5'
              }`}
            >
              <span className={active === l.href ? 'text-green-400/70' : 'text-green-400/35'}>~/</span>
              {l.name}
              <span
                className="absolute bottom-1 left-4 right-4 h-px rounded-full transition-opacity duration-300"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(74,222,128,0.85), transparent)',
                  opacity: active === l.href ? 1 : 0,
                }}
              />
            </button>
          ))}
        </div>

        <div className="col-start-3 justify-self-end flex items-center gap-2">
          <a
            href="https://github.com/Hisum18"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center rounded-full border border-white/10 bg-white/5 backdrop-blur-xl px-4 py-2 font-mono text-[13px] text-white/70 hover:text-white hover:bg-white/10 hover:border-green-400/40 transition-all duration-200"
          >
            <Github className="mr-2 h-4 w-4" />
            github
          </a>

          <button
            className="md:hidden p-2 flex flex-col gap-[5px] cursor-pointer"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            <span className={`block w-5 h-px bg-gray-400 transition-all duration-300 origin-center ${menuOpen ? 'rotate-45 translate-y-[6px]' : ''}`} />
            <span className={`block w-5 h-px bg-gray-400 transition-all duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-px bg-gray-400 transition-all duration-300 origin-center ${menuOpen ? '-rotate-45 -translate-y-[6px]' : ''}`} />
          </button>
        </div>
      </div>

      <div className={`md:hidden overflow-hidden transition-all duration-300 ${menuOpen ? 'max-h-72' : 'max-h-0'}`}>
        <div className="px-6 pb-5 border-t border-white/5 flex flex-col gap-4 pt-4 bg-[#0a0a0a]/90 backdrop-blur-xl font-mono text-sm">
          {LINKS.map((l) => (
            <button
              key={l.name}
              onClick={() => scrollTo(l.href)}
              className={`text-left transition-colors py-1 cursor-pointer ${
                active === l.href ? 'text-white' : 'text-gray-400 hover:text-green-400/90'
              }`}
            >
              <span className="text-green-400/40">~/</span>{l.name}
            </button>
          ))}
          <a
            href="https://github.com/Hisum18"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-green-400/90 transition-colors py-1"
          >
            <Github className="h-4 w-4" />
            github
          </a>
        </div>
      </div>
    </nav>
  )
}
