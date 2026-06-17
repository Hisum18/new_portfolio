import { useState, useEffect, useRef } from 'react'

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
    description: 'Full-stack portfolio with a React frontend and FastAPI backend. Deployed on Vercel and Railway with environment-based CORS configuration and a REST API serving dynamic content.',
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

const GithubIcon = () => (
  <svg className="w-[17px] h-[17px]" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
)

const LinkIcon = () => (
  <svg className="w-[17px] h-[17px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
  </svg>
)

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

        <div className="grid sm:grid-cols-2 gap-4">
          {projects.map((p, i) => (
            <div
              key={p.id}
              style={{
                opacity: visible ? undefined : 0,
                animation: visible ? `revealUp 0.6s ease ${0.1 + i * 0.1}s both` : 'none',
              }}
            >
            <article
              className="lift-card group relative flex flex-col h-full p-6 border border-white/10 rounded-2xl bg-white/[0.015] hover:bg-white/[0.04] hover:border-white/20 overflow-hidden"
            >

              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-3 flex-1 pr-4">
                  <span className="font-mono text-[11px] text-gray-700 mt-0.5 shrink-0 select-none">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="text-base font-semibold text-white/80 group-hover:text-white transition-colors duration-200 leading-tight">
                    {p.title}
                  </h3>
                </div>
                <div className="flex gap-3 text-gray-700 shrink-0 mt-0.5">
                  {p.github && (
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition-colors duration-200 cursor-pointer"
                      aria-label="GitHub"
                    >
                      <GithubIcon />
                    </a>
                  )}
                  {p.live && (
                    <a
                      href={p.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition-colors duration-200 cursor-pointer"
                      aria-label="Live site"
                    >
                      <LinkIcon />
                    </a>
                  )}
                </div>
              </div>

              <p className="text-gray-500 text-sm leading-relaxed mb-5 flex-1 pl-7">
                {p.description}
              </p>

              <div className="flex flex-wrap gap-1.5 pl-7">
                {p.tech.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-0.5 text-[11px] font-mono bg-white/[0.06] text-gray-400 rounded-lg border border-white/10"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
