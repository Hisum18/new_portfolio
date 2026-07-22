import { useState, useEffect, useRef } from 'react'
import { Github, Linkedin, Mail } from 'lucide-react'

const LINKS = [
  { name: 'Projects', href: '#projects' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Contact', href: '#contact' },
]

const SOCIALS = [
  { name: 'GitHub', href: 'https://github.com/Hisum18', Icon: Github, external: true },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/hisum-shash-037882346/', Icon: Linkedin, external: true },
  { name: 'Email', href: 'mailto:hisumshash6@gmail.com', Icon: Mail, external: false },
]

export default function Footer() {
  const [visible, setVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const reveal = (delay) => ({
    opacity: visible ? undefined : 0,
    animation: visible ? `revealUp 0.5s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s both` : 'none',
  })

  const scrollTo = (href) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="w-full py-12 overflow-hidden" ref={ref}>
      <div className="max-w-5xl mx-auto px-6 flex flex-col items-center gap-10 mb-12">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="font-heading font-black text-2xl text-white tracking-widest hover:text-amber-200/70 transition-colors cursor-pointer"
          style={reveal(0.1)}
        >
          HS
        </button>

        <nav className="flex flex-wrap justify-center gap-x-2 gap-y-2 text-sm" style={reveal(0.2)}>
          {LINKS.map((l) => (
            <button
              key={l.name}
              onClick={() => scrollTo(l.href)}
              className="relative px-3 py-1.5 group cursor-pointer active:scale-95 transition-transform duration-150"
            >
              <span className="relative z-10 text-white/60 group-hover:text-white transition-colors duration-300">
                {l.name}
              </span>
              <span className="absolute inset-0 rounded-full bg-white/10 scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]" />
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3" style={reveal(0.3)}>
          {SOCIALS.map((s) => (
            <a
              key={s.name}
              href={s.href}
              target={s.external ? '_blank' : undefined}
              rel={s.external ? 'noopener noreferrer' : undefined}
              aria-label={s.name}
              className="w-11 h-11 rounded-full border border-white/10 bg-white/[0.03] flex items-center justify-center text-white/50 hover:text-white hover:border-white/30 hover:bg-white/10 hover:-translate-y-0.5 transition-all duration-300"
            >
              <s.Icon className="w-[18px] h-[18px]" />
            </a>
          ))}
        </div>
      </div>

      <div
        className="w-full h-12 border-y border-white/10 text-white/10 bg-[repeating-linear-gradient(315deg,currentColor_0,currentColor_1px,transparent_0,transparent_50%)]"
        style={{
          backgroundSize: '10px 10px',
          animation: visible ? 'stripeSweep 20s linear both' : 'none',
        }}
      />

      <div className="max-w-5xl mx-auto px-6 mt-8 text-center" style={reveal(0.4)}>
        <p className="font-mono text-[11px] text-gray-700">
          © {new Date().getFullYear()} Hisum Shash. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
