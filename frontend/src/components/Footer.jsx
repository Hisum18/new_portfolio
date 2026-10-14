import { useState, useEffect, useRef } from 'react'
import { Github, Linkedin, Mail } from 'lucide-react'

const LINKS = [
  { name: 'projects', href: '#projects' },
  { name: 'about', href: '#about' },
  { name: 'skills', href: '#skills' },
]

const SOCIALS = [
  { name: 'github', href: 'https://github.com/Hisum18', Icon: Github, external: true },
  { name: 'linkedin', href: 'https://www.linkedin.com/in/hisum-shash-037882346/', Icon: Linkedin, external: true },
  { name: 'email', href: 'mailto:hisumshash6@gmail.com', Icon: Mail, external: false },
]

const Brand = () => (
  <span className="font-mono font-bold text-lg tracking-tight">
    <span className="text-green-400/60">&lt;</span>
    <span className="text-white">HS</span>
    <span className="text-green-400/60">/&gt;</span>
  </span>
)

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
        <p className="font-mono text-xs tracking-[0.25em] text-green-400/70 mb-4" style={reveal(0.02)}>
          <span className="text-green-400">&#10095;</span> ~/contact
        </p>

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
              className="group inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] px-6 py-3 font-mono text-sm text-white/70 hover:text-white hover:border-green-400/40 hover:bg-white/[0.06] hover:-translate-y-0.5 transition-all duration-300"
            >
              <s.Icon className="w-[18px] h-[18px] text-white/45 group-hover:text-green-400 transition-colors duration-300" />
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
          className="cursor-pointer transition-opacity hover:opacity-80"
          aria-label="Back to top"
        >
          <Brand />
        </button>

        <nav className="flex items-center gap-1 font-mono text-[13px]">
          {LINKS.map((l) => (
            <button
              key={l.name}
              onClick={() => scrollTo(l.href)}
              className="relative px-3 py-1.5 group cursor-pointer active:scale-95 transition-transform duration-150"
            >
              <span className="relative z-10 text-white/50 group-hover:text-green-400/90 transition-colors duration-300">
                <span className="text-green-400/35 group-hover:text-green-400/60">~/</span>{l.name}
              </span>
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
