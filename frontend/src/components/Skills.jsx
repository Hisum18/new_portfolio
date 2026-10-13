import { useState, useEffect, useRef } from 'react'
import SectionHeading from './SectionHeading'

const FALLBACK = [
  { category: 'Languages', items: ['Java', 'C', 'Python', 'JavaScript', 'HTML', 'CSS', 'SQL'] },
  { category: 'Frontend',  items: ['React', 'React Native', 'Next.js', 'Tailwind CSS', 'Expo', 'Vite', 'TypeScript'] },
  { category: 'Backend',   items: ['FastAPI', 'Flask', 'Node.js', 'Express', 'Postgres', 'Drizzle', 'SQLite'] },
  { category: 'Tools',     items: ['Git', 'GitHub', 'VS Code', 'Vim', 'REST APIs', 'SSE', 'Figma', 'Stripe', 'Redis', 'Vercel'] },
]

export default function Skills() {
  const [skills, setSkills] = useState([])
  const [visible, setVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/skills`)
      .then((r) => r.json())
      .then(setSkills)
      .catch(() => setSkills(FALLBACK))
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="skills" className="py-28 px-6" ref={ref}>
      <div
        className="max-w-5xl mx-auto"
        style={{
          opacity: visible ? undefined : 0,
          animation: visible ? 'revealUp 0.7s ease both' : 'none',
        }}
      >
        <SectionHeading number="03" label="Skills" title="Tech Stack" />

        <div className="rounded-2xl border border-white/10 bg-[#0b0b0b] overflow-hidden shadow-[0_0_50px_-16px_rgba(74,222,128,0.18)]">
          <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3 bg-white/[0.02]">
            <span className="w-3 h-3 rounded-full bg-white/15" />
            <span className="w-3 h-3 rounded-full bg-white/15" />
            <span className="w-3 h-3 rounded-full bg-green-400/60" />
            <span className="ml-3 font-mono text-xs text-white/40">hisum@portfolio: ~/skills</span>
          </div>

          <div className="p-5 md:p-7 font-mono text-sm leading-relaxed">
            <p className="text-white/40 mb-5">
              <span className="text-green-400">❯</span> cat techstack
            </p>

            <div className="space-y-4">
              {skills.map((cat) => (
                <div key={cat.category} className="grid grid-cols-1 sm:grid-cols-[6rem_1fr] gap-x-5 gap-y-1">
                  <span className="text-green-400/70 text-xs uppercase tracking-wider pt-0.5">
                    {cat.category}
                  </span>
                  <span className="text-gray-300">
                    {cat.items.map((item, i) => (
                      <span key={item}>
                        <span className="transition-colors duration-200 hover:text-green-400 cursor-default">
                          {item}
                        </span>
                        {i < cat.items.length - 1 && <span className="text-white/20"> · </span>}
                      </span>
                    ))}
                  </span>
                </div>
              ))}
            </div>

            <p className="text-white/40 mt-6">
              <span className="text-green-400">❯</span>
              <span
                className="inline-block w-2 h-[0.9em] bg-green-400/70 ml-2 align-middle"
                style={{ animation: 'blink 1s step-end infinite' }}
              />
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
