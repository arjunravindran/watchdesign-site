'use client'

import Link from 'next/link'
import { useProgress } from '../../hooks/useProgress'

export default function ModuleCard({ mod }) {
  const isSpecial = mod.number === '09.5'
  const heroImage = mod.slides?.find(s => s.type === 'hero')?.image || null
  const { moduleCompletion } = useProgress()

  const trackedSlides = mod.slides?.filter(s => s.type !== 'hero' && s.type !== 'endcard') || []
  const { pct } = moduleCompletion(trackedSlides)

  return (
    <Link href={`/modules/${mod.slug}/`} className="module-card block group overflow-hidden">
      {heroImage ? (
        <div className="relative h-36 overflow-hidden">
          <img
            src={heroImage}
            alt={mod.title}
            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/50 to-transparent" />
        </div>
      ) : (
        <div className="h-36 flex items-center justify-center bg-rule/10 border-b border-rule/30">
          <span className="font-serif text-gold/20 text-5xl font-light select-none">
            {mod.number}
          </span>
        </div>
      )}

      <div className="p-5 pt-4">
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
      </div>

      {/* Progress bar — only visible once started */}
      {pct > 0 && (
        <div className="h-0.5 bg-rule">
          <div className="h-full bg-gold transition-all duration-500" style={{ width: `${pct}%` }} />
        </div>
      )}
    </Link>
  )
}
