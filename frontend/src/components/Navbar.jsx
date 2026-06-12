import { useState, useEffect } from 'react'

const LINKS = [
  { name: 'Projects', href: '#projects' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Contact', href: '#contact' },
]

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
        scrolled ? 'bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/5' : ''
      }`}
    >
      <div className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="font-heading font-black text-lg text-white tracking-widest hover:text-white/70 transition-colors cursor-pointer"
        >
          HS
        </button>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {LINKS.map((l) => (
            <button
              key={l.name}
              onClick={() => scrollTo(l.href)}
              className={`relative text-sm transition-colors duration-200 cursor-pointer pb-1 ${
                active === l.href ? 'text-white' : 'text-gray-500 hover:text-white/80'
              }`}
            >
              {l.name}
              <span
                className="absolute bottom-0 left-0 right-0 h-px rounded-full transition-opacity duration-300"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)',
                  opacity: active === l.href ? 1 : 0,
                }}
              />
            </button>
          ))}
        </div>

        {/* Mobile hamburger */}
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

      {/* Mobile menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${menuOpen ? 'max-h-60' : 'max-h-0'}`}>
        <div className="px-6 pb-5 border-t border-white/5 flex flex-col gap-4 pt-4 bg-[#0a0a0a]/95 backdrop-blur-xl">
          {LINKS.map((l) => (
            <button
              key={l.name}
              onClick={() => scrollTo(l.href)}
              className={`text-left text-sm transition-colors py-1 cursor-pointer ${
                active === l.href ? 'text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              {l.name}
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}
