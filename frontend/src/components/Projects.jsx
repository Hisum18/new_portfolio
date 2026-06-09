import { useState, useEffect } from 'react'

const FALLBACK = [
  {
    id: 1,
    title: 'My Portfolio',
    description:
      'A full-stack portfolio website built with React and FastAPI, featuring a clean minimalistic dark design.',
    tech: ['React', 'FastAPI', 'Python', 'Tailwind CSS'],
    github: 'https://github.com/',
    live: 'https://my-portfolio-beta-blue-55.vercel.app/',
  },
  {
    id: 2,
    title: 'Project Two',
    description:
      'Update this in backend/data.py — describe what problem it solves and what makes it interesting.',
    tech: ['JavaScript', 'Node.js', 'MongoDB'],
    github: 'https://github.com/',
    live: null,
  },
  {
    id: 3,
    title: 'Project Three',
    description:
      'Update this in backend/data.py — describe what technologies you used and the biggest challenge you overcame.',
    tech: ['React Native', 'Expo', 'Firebase'],
    github: 'https://github.com/',
    live: null,
  },
  {
    id: 4,
    title: 'Project Four',
    description:
      'Update this in backend/data.py — describe what you learned and what you would do differently.',
    tech: ['Python', 'Flask', 'PostgreSQL'],
    github: 'https://github.com/',
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

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/projects`)
      .then((r) => r.json())
      .then(setProjects)
      .catch(() => setProjects(FALLBACK))
  }, [])

  return (
    <section id="projects" className="py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <p className="font-mono text-white/40 text-[11px] tracking-[0.3em] uppercase mb-3">
          03 — Projects
        </p>
        <h2 className="text-4xl md:text-5xl font-bold mb-14 tracking-tight bg-gradient-to-r from-white to-white/50 bg-clip-text text-transparent">
          What I've Built
        </h2>

        <div className="grid sm:grid-cols-2 gap-4">
          {projects.map((p) => (
            <article
              key={p.id}
              className="group flex flex-col p-6 border border-white/10 rounded-2xl bg-white/[0.015] hover:border-white/30 hover:bg-white/[0.04] transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-base font-semibold text-white/80 group-hover:text-white transition-colors leading-tight pr-4">
                  {p.title}
                </h3>
                <div className="flex gap-3 text-gray-700 shrink-0 mt-0.5">
                  {p.github && (
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition-colors"
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
                      className="hover:text-white transition-colors"
                      aria-label="Live site"
                    >
                      <LinkIcon />
                    </a>
                  )}
                </div>
              </div>

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
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
