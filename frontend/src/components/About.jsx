import { useEffect, useRef, useState } from 'react'
import { GraduationCap, Calendar, Briefcase, MapPin } from 'lucide-react'
import SectionHeading from './SectionHeading'

const STATS = [
  { label: 'University', value: 'George Mason', Icon: GraduationCap },
  { label: 'Graduation', value: 'Spring 2028', Icon: Calendar },
  { label: 'Status', value: 'Open to work', Icon: Briefcase },
  { label: 'Location', value: 'Lorton, VA', Icon: MapPin },
]

export default function About() {
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
    <section id="about" className="py-28 px-6 bg-[#0f0f0f]" ref={ref}>
      <div
        className="max-w-5xl mx-auto"
        style={{
          opacity: visible ? undefined : 0,
          animation: visible ? 'revealUp 0.7s ease both' : 'none',
        }}
      >
        <SectionHeading number="02" label="Profile" title="About Me" />

        <div className="grid md:grid-cols-5 gap-12 items-start">
          <div className="md:col-span-3 border-l-2 border-green-400/40 pl-6">
            <p className="text-2xl md:text-3xl font-light text-gray-100 leading-snug tracking-tight mb-8">
              Hi, I'm{' '}
              <span className="font-medium text-white">Hisum Shash</span> — a
              software engineer building clean, efficient, and user-friendly
              applications.
            </p>
            <div className="space-y-5">
              <p className="text-gray-400 leading-relaxed">
                I specialize in web and mobile development, crafting seamless
                experiences across all platforms. I love diving into new
                technologies and turning ideas into real, working products.
              </p>
              <p className="text-gray-400 leading-relaxed">
                Whether it's a sleek frontend, a robust API, or a full-stack
                product — I enjoy the entire journey from concept to deployment.
              </p>
            </div>
          </div>

          <div className="md:col-span-2 grid grid-cols-2 gap-3">
            {STATS.map((s) => (
              <div
                key={s.label}
                className="lift-card p-5 border border-white/[0.08] rounded-2xl bg-white/[0.02] hover:border-green-400/30 hover:bg-white/[0.04] group"
              >
                <div className="flex items-center justify-between mb-3">
                  <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">
                    {s.label}
                  </p>
                  <s.Icon className="w-4 h-4 text-white/25 group-hover:text-green-400/80 transition-colors duration-300" />
                </div>
                <p className="text-white font-medium">{s.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
