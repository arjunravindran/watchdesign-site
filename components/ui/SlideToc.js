'use client'

import { useState, useEffect } from 'react'
import { useProgress } from '../../hooks/useProgress'

export default function SlideToc({ slides }) {
  const [activeId, setActiveId] = useState(slides[0]?.id || null)
  const { isSeen, markUnseen } = useProgress()

  useEffect(() => {
    const els = slides.map(s => document.getElementById(s.id)).filter(Boolean)
    if (els.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter(e => e.isIntersecting)
        if (visible.length > 0) setActiveId(visible[0].target.id)
      },
      { rootMargin: '-10% 0% -80% 0%', threshold: 0 }
    )

    els.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [slides])

  if (slides.length === 0) return null

  return (
    <nav className="space-y-0.5">
      {slides.map((slide) => {
        const label = slide.heading || slide.tag || '—'
        const isActive = activeId === slide.id
        const seen = isSeen(slide.id)
        return (
          <div key={slide.id} className="flex items-start gap-1">
            <a
              href={`#${slide.id}`}
              className={`flex items-start gap-2 flex-1 min-w-0 px-2 py-1.5 rounded-sm text-xs transition-colors group ${
                isActive
                  ? 'text-gold bg-gold/5 border-l border-gold'
                  : 'text-grey hover:text-mist hover:bg-rule border-l border-transparent'
              }`}
            >
              {slide.tag && (
                <span className={`text-[9px] shrink-0 mt-0.5 w-14 truncate font-mono tracking-wider uppercase ${isActive ? 'text-gold-dim' : 'text-grey/50'}`}>
                  {slide.tag}
                </span>
              )}
              <span className="line-clamp-2 leading-snug min-w-0">{label}</span>
            </a>

            {/* Seen checkmark — click to unmark */}
            {seen && (
              <button
                onClick={() => markUnseen(slide.id)}
                title="Mark as unread"
                className="shrink-0 mt-1.5 text-gold/60 hover:text-gold-dim transition-colors text-[10px] leading-none px-0.5"
              >
                ✓
              </button>
            )}
          </div>
        )
      })}
    </nav>
  )
}
