import { useState, useEffect, useRef } from 'react'

const FALLBACK = [
  { category: 'Languages', items: ['Java', 'C', 'Python', 'JavaScript', 'HTML', 'CSS', 'SQL'] },
  { category: 'Frontend',  items: ['React', 'React Native', 'Tailwind CSS', 'Expo', 'Vite', 'TypeScript'] },
  { category: 'Backend',   items: ['FastAPI', 'Flask', 'Node.js', 'Express', 'SQLite'] },
  { category: 'Tools',     items: ['Git', 'GitHub', 'VS Code', 'Vim', 'REST APIs', 'SSE', 'Figma'] },
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
        <h2 className="font-heading text-4xl md:text-5xl font-black mb-14 tracking-tight bg-gradient-to-r from-white to-white/50 bg-clip-text text-transparent">
          Tech Stack
        </h2>

        <div className="grid md:grid-cols-2 gap-x-16 gap-y-10">
          {skills.map((cat) => (
            <div key={cat.category}>
              <h3 className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.25em] mb-4">
                {cat.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {cat.items.map((item) => (
                  <span
                    key={item}
                    className="px-3 py-1.5 text-sm text-gray-300 bg-white/[0.05] border border-white/[0.08] rounded-lg"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
