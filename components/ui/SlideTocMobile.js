'use client'

import { useState } from 'react'
import { useProgress } from '../../hooks/useProgress'
import { useTocActive } from '../../hooks/useTocActive'

export default function SlideTocMobile({ slides }) {
  const activeId = useTocActive(slides)
  const [expanded, setExpanded] = useState(false)
  const { isSeen } = useProgress()

  const activeSlide = slides.find(s => s.id === activeId)
  const activeLabel = activeSlide?.heading || activeSlide?.tag || '—'
  const seenCount = slides.filter(s => isSeen(s.id)).length

  return (
    <div className="lg:hidden sticky top-14 z-30 mb-6">
      <button
        onClick={() => setExpanded(e => !e)}
        className="w-full flex items-center gap-3 bg-card border border-rule px-4 py-2.5 text-left transition-colors hover:border-gold-dim"
      >
        <svg
          className={`shrink-0 text-gold-dim transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
          width="12" height="12" viewBox="0 0 12 12" fill="none"
        >
          <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span className="flex-1 min-w-0 text-xs text-mist truncate">{activeLabel}</span>
        {seenCount > 0 && (
          <span className="text-[10px] text-gold-dim font-mono shrink-0">
            {seenCount}/{slides.length}
          </span>
        )}
      </button>

      {expanded && (
        <div className="bg-card border border-t-0 border-rule max-h-[60vh] overflow-y-auto shadow-xl shadow-black/40">
          <nav className="p-2 space-y-0.5">
            {slides.map((slide) => {
              const label = slide.heading || slide.tag || '—'
              const isActive = activeId === slide.id
              const seen = isSeen(slide.id)
              return (
                <a
                  key={slide.id}
                  href={`#${slide.id}`}
                  onClick={() => setExpanded(false)}
                  className={`flex items-start gap-2 px-3 py-2 rounded-sm text-xs transition-colors ${
                    isActive
                      ? 'text-gold bg-gold/5 border-l border-gold'
                      : 'text-grey hover:text-mist hover:bg-rule border-l border-transparent'
                  }`}
                >
                  {slide.tag && (
                    <span className="text-[9px] shrink-0 mt-0.5 w-14 truncate font-mono tracking-wider uppercase text-grey/50">
                      {slide.tag}
                    </span>
                  )}
                  <span className="flex-1 line-clamp-2 leading-snug">{label}</span>
                  {seen && <span className="shrink-0 text-gold/60 text-[10px] ml-1">✓</span>}
                </a>
              )
            })}
          </nav>
        </div>
      )}
    </div>
  )
}
