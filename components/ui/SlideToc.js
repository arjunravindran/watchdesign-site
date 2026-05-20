'use client'

import { useProgress } from '../../hooks/useProgress'
import { useTocActive } from '../../hooks/useTocActive'

export default function SlideToc({ slides }) {
  const activeId = useTocActive(slides)
  const { isSeen, markUnseen } = useProgress()

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
