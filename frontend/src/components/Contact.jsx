import { useEffect, useRef, useState } from 'react'

const LinkedInIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)

const GithubIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
)

const EmailIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
  </svg>
)

const CONTACTS = [
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/hisum-shash-037882346/', Icon: LinkedInIcon, external: true },
  { name: 'GitHub',   href: 'https://github.com/Hisum18',                          Icon: GithubIcon,   external: true },
  { name: 'Email',    href: 'mailto:hisumshash6@gmail.com',                        Icon: EmailIcon,    external: false },
]

export default function Contact() {
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

  return (
    <section id="contact" className="py-28 px-6 bg-[#0f0f0f]" ref={ref}>
      <div className="max-w-3xl mx-auto text-center">
        <h2
          className="font-heading text-4xl md:text-5xl font-black mb-4 tracking-tight bg-gradient-to-r from-white to-white/50 bg-clip-text text-transparent"
          style={{ opacity: visible ? undefined : 0, animation: visible ? 'revealUp 0.6s ease 0.06s both' : 'none' }}
        >
          Get in Touch
        </h2>
        <p
          className="text-white/40 mb-14 leading-relaxed max-w-md mx-auto"
          style={{ opacity: visible ? undefined : 0, animation: visible ? 'revealUp 0.6s ease 0.12s both' : 'none' }}
        >
          Have a project in mind or just want to connect? Reach out through any of the channels below.
        </p>

        <div className="grid sm:grid-cols-3 gap-4">
          {CONTACTS.map((c, i) => (
            <div
              key={c.name}
              style={{
                opacity: visible ? undefined : 0,
                animation: visible ? `revealUp 0.6s ease ${0.18 + i * 0.1}s both` : 'none',
              }}
            >
            <a
              href={c.href}
              target={c.external ? '_blank' : undefined}
              rel={c.external ? 'noopener noreferrer' : undefined}
              className="lift-card group flex flex-col items-center gap-5 p-8 border border-white/10 rounded-2xl bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.05]"
            >
              <div className="w-14 h-14 rounded-2xl border border-white/10 group-hover:border-white/30 flex items-center justify-center text-white/50 group-hover:text-white transition-colors duration-300">
                <c.Icon />
              </div>
              <p className="text-white font-semibold text-base">{c.name}</p>
            </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
