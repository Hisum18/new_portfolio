import { useState, useEffect, useRef } from 'react'
import { Github, Linkedin, Mail } from 'lucide-react'

const LINKS = [
  { name: 'Projects', href: '#projects' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
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
    <footer id="contact" ref={ref} className="w-full pt-28 pb-10 overflow-hidden bg-[#0f0f0f]">
      <div className="max-w-5xl mx-auto px-6 flex flex-col items-center text-center">
        <h2
          className="font-heading text-4xl md:text-5xl font-black tracking-tight bg-gradient-to-r from-white to-white/50 bg-clip-text text-transparent"
          style={reveal(0.05)}
        >
          Get in Touch
        </h2>

        <p className="mt-5 max-w-md text-gray-400 leading-relaxed" style={reveal(0.15)}>
          Open to internships and collaboration — or just say hi.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center gap-3" style={reveal(0.25)}>
          {SOCIALS.map((s) => (
            <a
              key={s.name}
              href={s.href}
              target={s.external ? '_blank' : undefined}
              rel={s.external ? 'noopener noreferrer' : undefined}
              className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] px-6 py-3 text-sm font-medium text-white/70 hover:text-white hover:border-white/30 hover:bg-white/10 hover:-translate-y-0.5 transition-all duration-300"
            >
              <s.Icon className="w-[18px] h-[18px]" />
              {s.name}
            </a>
          ))}
        </div>
      </div>

      <div
        className="w-full h-12 mt-20 border-y border-white/10 text-white/10 bg-[repeating-linear-gradient(315deg,currentColor_0,currentColor_1px,transparent_0,transparent_50%)]"
        style={{
          backgroundSize: '10px 10px',
          animation: visible ? 'stripeSweep 20s linear both' : 'none',
        }}
      />

      <div className="max-w-5xl mx-auto px-6 mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="font-heading font-black text-lg text-white tracking-widest hover:text-amber-200/70 transition-colors cursor-pointer"
        >
          HS
        </button>

        <nav className="flex items-center gap-1">
          {LINKS.map((l) => (
            <button
              key={l.name}
              onClick={() => scrollTo(l.href)}
              className="relative px-3 py-1.5 text-sm group cursor-pointer active:scale-95 transition-transform duration-150"
            >
              <span className="relative z-10 text-white/50 group-hover:text-white transition-colors duration-300">
                {l.name}
              </span>
              <span className="absolute inset-0 rounded-full bg-white/10 scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]" />
            </button>
          ))}
        </nav>

        <p className="font-mono text-[11px] text-gray-700">
          © {new Date().getFullYear()} Hisum Shash
        </p>
      </div>
    </footer>
  )
}
