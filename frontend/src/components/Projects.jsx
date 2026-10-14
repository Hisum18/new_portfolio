import { useState, useEffect, useRef } from 'react'
import { Bot, Globe, Coffee, Target, Code2, Github, ExternalLink } from 'lucide-react'
import SectionHeading from './SectionHeading'

const FALLBACK = [
  {
    id: 1,
    title: 'Snipe — Real-Time Job Alerts',
    description: 'A full-stack SaaS that alerts you within minutes when a company posts a new job, polling applicant-tracking-system endpoints directly — faster than any aggregator. Magic-link auth, Stripe billing, Redis rate limiting, and SSRF-safe fetching.',
    tech: ['Next.js', 'TypeScript', 'Postgres', 'Drizzle', 'Stripe'],
    github: 'https://github.com/Hisum18/snipe',
    live: null,
  },
  {
    id: 2,
    title: 'Nova — Personal AI Assistant',
    description: 'Personal AI assistant built with React and FastAPI using Groq\'s LLaMA 3.3 70B. Features real-time token streaming via SSE, persistent memory extraction with SQLite, and full session management.',
    tech: ['React', 'FastAPI', 'Groq API', 'SQLite', 'SSE'],
    github: 'https://github.com/Hisum18/nova',
    live: null,
  },
  {
    id: 3,
    title: 'Qahwah Drip — Café Website',
    description: 'A responsive marketing site for Qahwah Drip, a Yemeni specialty coffee café in Falls Church, VA. Hand-built static site with a custom heritage design system, real café photography, and full SEO — structured data, Open Graph, and sitemaps.',
    tech: ['HTML', 'CSS', 'JavaScript', 'SEO'],
    github: 'https://github.com/Hisum18/Qahwah-Drip',
    live: 'https://qahwahdrip.com',
  },
  {
    id: 4,
    title: 'Personal Portfolio',
    description: 'Full-stack portfolio with a React frontend and FastAPI backend. Deployed on Vercel and Railway with an environment-based API URL and a REST API serving dynamic content.',
    tech: ['React', 'FastAPI', 'Tailwind CSS', 'Vercel', 'Railway'],
    github: 'https://github.com/Hisum18/new_portfolio',
    live: 'https://new-portfolio-ochre-zeta.vercel.app',
  },
]

const ICONS = {
  1: Target,
  2: Bot,
  3: Coffee,
  4: Globe,
}

export default function Projects() {
  const [projects, setProjects] = useState([])
  const [visible, setVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/projects`)
      .then((r) => r.json())
      .then(setProjects)
      .catch(() => setProjects(FALLBACK))
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.05 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="projects" className="py-28 px-6" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <SectionHeading
          number="01"
          label="Work"
          title="What I've Built"
          style={{ opacity: visible ? undefined : 0, animation: visible ? 'revealUp 0.6s ease 0.05s both' : 'none' }}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {projects.map((p, i) => {
            const Icon = ICONS[p.id] || Code2
            const wide = i % 4 === 0 || i % 4 === 2

            return (
              <div
                key={p.id}
                className={wide ? 'md:col-span-2' : 'md:col-span-1'}
                style={{
                  opacity: visible ? undefined : 0,
                  animation: visible ? `revealUp 0.6s ease ${0.1 + i * 0.1}s both` : 'none',
                }}
              >
                <article className="group relative flex flex-col h-full p-5 rounded-2xl overflow-hidden border border-white/10 bg-white/[0.015] hover:bg-white/[0.04] hover:border-white/20 hover:shadow-[0_2px_12px_rgba(255,255,255,0.04)] hover:-translate-y-0.5 will-change-transform transition-all duration-300">
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[length:4px_4px]" />
                  </div>

                  <div className="relative flex flex-col h-full">
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/[0.06] border border-white/10 text-white/70 group-hover:text-white group-hover:bg-white/10 transition-all duration-300 shrink-0">
                        <Icon className="w-4 h-4" />
                      </div>

                      <div className="flex gap-3 text-gray-600 shrink-0 mt-1">
                        {p.github && (
                          <a
                            href={p.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-white transition-colors duration-200"
                            aria-label="GitHub"
                          >
                            <Github className="w-[17px] h-[17px]" />
                          </a>
                        )}
                        {p.live && (
                          <a
                            href={p.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-white transition-colors duration-200"
                            aria-label="Live site"
                          >
                            <ExternalLink className="w-[17px] h-[17px]" />
                          </a>
                        )}
                      </div>
                    </div>

                    <h3 className="text-base font-semibold text-white/80 group-hover:text-white transition-colors duration-200 leading-tight mb-2">
                      {p.title}
                    </h3>

                    <p className="text-gray-500 text-sm leading-relaxed mb-5 flex-1">
                      {p.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5">
                      {p.tech.map((t) => (
                        <span
                          key={t}
                          className="px-2.5 py-0.5 text-[11px] font-mono bg-white/[0.06] text-gray-400 rounded-lg border border-white/10"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
