import Link from 'next/link'

export default function ModuleCard({ mod }) {
  const isSpecial = mod.number === '09.5'

  return (
    <Link href={`/modules/${mod.slug}/`} className="module-card block p-5 group">
      {/* Top accent line */}
      <div className="w-8 h-px bg-gold-dim mb-4 group-hover:bg-gold group-hover:w-12 transition-all duration-300" />

      {/* Module number */}
      <div className="eyebrow mb-2">{isSpecial ? 'MODULE 09.5' : `MODULE ${mod.number}`}</div>

      {/* Title */}
      <h2 className="font-serif text-mist text-base leading-snug mb-2 group-hover:text-gold transition-colors">
        {mod.title}
      </h2>

      {/* Subtitle */}
      <p className="text-grey text-xs leading-relaxed mb-4 line-clamp-2">
        {mod.subtitle}
      </p>

      {/* Meta row */}
      <div className="flex items-center justify-between mt-auto pt-3 border-t border-rule">
        <span className="text-[10px] text-grey tracking-wider">
          {mod.level}
          {mod.sessions ? ` · ${mod.sessions} Session${mod.sessions > 1 ? 's' : ''}` : ''}
        </span>
        <span className="text-gold text-xs opacity-0 group-hover:opacity-100 transition-opacity">
          Start →
        </span>
      </div>
    </Link>
  )
}
