'use client'

import { useState, useEffect } from 'react'
import { useProgress } from '../../hooks/useProgress'

export default function SlideTocMobile({ slides }) {
  const [activeId, setActiveId] = useState(slides[0]?.id || null)
  const [expanded, setExpanded] = useState(false)
  const { isSeen } = useProgress()

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

  // Close when user taps a link
  function handleLinkClick() {
    setExpanded(false)
  }

  const activeSlide = slides.find(s => s.id === activeId)
  const activeLabel = activeSlide?.heading || activeSlide?.tag || '—'
  const seenCount = slides.filter(s => isSeen(s.id)).length

  return (
    <div className="lg:hidden sticky top-14 z-30 mb-6">
      {/* Collapsed bar */}
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

      {/* Expanded list */}
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
                  onClick={handleLinkClick}
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
