const STATS = [
  { label: 'Focus', value: 'Web & Mobile' },
  { label: 'Status', value: 'Open to work' },
  { label: 'Location', value: 'Remote' },
  { label: 'Role', value: 'Student Dev' },
]

export default function About() {
  return (
    <section id="about" className="py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <p className="font-mono text-white/40 text-[11px] tracking-[0.3em] uppercase mb-3">
          01 — About
        </p>
        <h2 className="text-4xl md:text-5xl font-bold mb-14 tracking-tight bg-gradient-to-r from-white to-white/50 bg-clip-text text-transparent">
          About Me
        </h2>

        <div className="grid md:grid-cols-5 gap-12 items-start">
          {/* Text */}
          <div className="md:col-span-3 space-y-5">
            <p className="text-gray-300 leading-relaxed text-lg">
              Hi, I'm{' '}
              <span className="text-white font-medium">Hisum Shash</span> — an
              aspiring software engineer passionate about building clean,
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

          {/* Stats */}
          <div className="md:col-span-2 grid grid-cols-2 gap-3">
            {STATS.map((s) => (
              <div
                key={s.label}
                className="p-4 border border-white/10 rounded-2xl bg-white/[0.02] hover:border-white/25 hover:bg-white/[0.05] transition-all duration-300"
              >
                <p className="text-[10px] font-mono text-gray-600 uppercase tracking-widest mb-1.5">
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
