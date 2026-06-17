import { useEffect, useRef, useState } from 'react'

const STATS = [
  { label: 'University', value: 'George Mason' },
  { label: 'Graduation', value: 'Spring 2028' },
  { label: 'Status', value: 'Open to work' },
  { label: 'Location', value: 'Lorton, VA' },
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
        <h2 className="font-heading text-4xl md:text-5xl font-black mb-14 tracking-tight bg-gradient-to-r from-white to-white/50 bg-clip-text text-transparent">
          About Me
        </h2>

        <div className="grid md:grid-cols-5 gap-12 items-start">
          <div className="md:col-span-3 space-y-5">
            <p className="text-gray-300 leading-relaxed text-lg">
              Hi, I'm{' '}
              <span className="text-white font-semibold">Hisum Shash</span> — a
              software engineer passionate about building clean,
              efficient, and user-friendly applications.
            </p>
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

          <div className="md:col-span-2 grid grid-cols-2 gap-3">
            {STATS.map((s) => (
              <div
                key={s.label}
                className="lift-card p-5 border border-white/[0.08] rounded-2xl bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04] group"
              >
                <p className="text-[10px] font-mono text-gray-600 uppercase tracking-widest mb-2">
                  {s.label}
                </p>
                <p className="text-white font-medium text-sm">{s.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
