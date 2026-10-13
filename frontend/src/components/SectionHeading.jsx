export default function SectionHeading({ number, label, title, style }) {
  return (
    <div className="mb-14" style={style}>
      <div className="flex items-center gap-4 mb-5">
        <span className="font-mono text-xs text-green-400/60 tabular-nums">{number}</span>
        <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-white/45">
          {label}
        </span>
        <span className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
      </div>
      <h2 className="font-heading text-4xl md:text-5xl font-black tracking-tight bg-gradient-to-r from-white to-white/50 bg-clip-text text-transparent">
        {title}
      </h2>
    </div>
  )
}
