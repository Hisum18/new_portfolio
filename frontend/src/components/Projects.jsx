import { useState, useEffect, useRef } from 'react'
import { Bot, Globe, GraduationCap, ShoppingCart, Code2, Github, ExternalLink } from 'lucide-react'

const FALLBACK = [
  {
    id: 1,
    title: 'J.A.R.V.I.S — Personal AI Assistant',
    description: 'Personal AI assistant built with React and FastAPI using Groq\'s LLaMA 3.3 70B. Features real-time token streaming via SSE, persistent memory extraction with SQLite, and full session management.',
    tech: ['React', 'FastAPI', 'Groq API', 'SQLite', 'SSE'],
    github: 'https://github.com/Hisum18',
    live: null,
  },
  {
    id: 2,
    title: 'Personal Portfolio',
    description: 'Full-stack portfolio with a React frontend and FastAPI backend. Deployed on Vercel and Railway with an environment-based API URL and a REST API serving dynamic content.',
    tech: ['React', 'FastAPI', 'Tailwind CSS', 'Vercel', 'Railway'],
    github: 'https://github.com/Hisum18',
    live: 'https://new-portfolio-ochre-zeta.vercel.app',
  },
  {
    id: 3,
    title: 'College Planner / Advisor AI',
    description: 'AI-powered academic planning tool that generates personalized 4-year degree roadmaps and helps students explore majors and course sequences based on their goals.',
    tech: ['Python', 'Flask'],
    github: 'https://github.com/Hisum18',
    live: null,
  },
  {
    id: 4,
    title: 'Grocery Store Simulation',
    description: 'Simulates grocery store customer flow in Java using priority queues, stacks, and standard queues to model and analyze wait-time behavior under varying store conditions.',
    tech: ['Java', 'Data Structures'],
    github: 'https://github.com/Hisum18',
    live: null,
  },
]

const ICONS = {
  1: Bot,
  2: Globe,
  3: GraduationCap,
  4: ShoppingCart,
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
        <h2
          className="font-heading text-4xl md:text-5xl font-black mb-14 tracking-tight bg-gradient-to-r from-white to-white/50 bg-clip-text text-transparent"
          style={{ opacity: visible ? undefined : 0, animation: visible ? 'revealUp 0.6s ease 0.05s both' : 'none' }}
        >
          What I've Built
        </h2>

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
