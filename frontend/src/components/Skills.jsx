import { useState, useEffect, useRef } from 'react'

const FALLBACK = [
  {
    category: 'Languages',
    items: [
      { name: 'JavaScript', level: 90 },
      { name: 'Python', level: 75 },
      { name: 'HTML / CSS', level: 95 },
      { name: 'TypeScript', level: 65 },
    ],
  },
  {
    category: 'Frontend',
    items: [
      { name: 'React', level: 85 },
      { name: 'Tailwind CSS', level: 80 },
      { name: 'React Native', level: 60 },
    ],
  },
  {
    category: 'Backend',
    items: [
      { name: 'Node.js', level: 70 },
      { name: 'FastAPI / Python', level: 65 },
      { name: 'Express', level: 65 },
    ],
  },
  {
    category: 'Tools & Other',
    items: [
      { name: 'Git / GitHub', level: 85 },
      { name: 'Figma', level: 55 },
      { name: 'Docker', level: 45 },
    ],
  },
]

function levelLabel(n) {
  if (n >= 90) return 'Expert'
  if (n >= 75) return 'Advanced'
  if (n >= 55) return 'Intermediate'
  return 'Beginner'
}

export default function Skills() {
  const [skills, setSkills] = useState([])
  const [animated, setAnimated] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    fetch('/api/skills')
      .then((r) => r.json())
      .then(setSkills)
      .catch(() => setSkills(FALLBACK))
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimated(true) },
      { threshold: 0.15 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="skills" className="py-28 px-6 bg-[#0f0f0f]" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <p className="font-mono text-white/40 text-[11px] tracking-[0.3em] uppercase mb-3">
          02 — Skills
        </p>
        <h2 className="text-4xl md:text-5xl font-bold mb-14 tracking-tight bg-gradient-to-r from-white to-white/50 bg-clip-text text-transparent">
          Tech Stack
        </h2>

        <div className="grid md:grid-cols-2 gap-x-16 gap-y-12">
          {skills.map((cat) => (
            <div key={cat.category}>
              <h3 className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.25em] mb-5">
                {cat.category}
              </h3>
              <div className="space-y-4">
                {cat.items.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between items-baseline mb-1.5">
                      <span className="text-sm text-gray-300">{skill.name}</span>
                      <span className="text-[10px] font-mono text-gray-500">
                        {levelLabel(skill.level)}
                      </span>
                    </div>
                    <div className="h-[3px] bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-white/80 to-white rounded-full transition-all duration-[1200ms] ease-out"
                        style={{ width: animated ? `${skill.level}%` : '0%' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
