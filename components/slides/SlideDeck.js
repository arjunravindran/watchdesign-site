'use client'

import { useState, useEffect, useRef } from 'react'
import SlideViewer from './SlideViewer'

export default function SlideDeck({ slides }) {
  const [mode, setMode] = useState('scroll') // 'scroll' or 'presentation'
  const [currentIndex, setCurrentIndex] = useState(0)
  const presentationRef = useRef(null)

  const total = slides.length
  const goNext = () => setCurrentIndex(i => Math.min(i + 1, total - 1))
  const goPrev = () => setCurrentIndex(i => Math.max(i - 1, 0))
  const goTo = (i) => setCurrentIndex(Math.max(0, Math.min(i, total - 1)))

  // Keyboard navigation in presentation mode
  useEffect(() => {
    if (mode !== 'presentation') return

    const handleKey = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault()
        goNext()
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault()
        goPrev()
      } else if (e.key === 'Home') {
        e.preventDefault()
        setCurrentIndex(0)
      } else if (e.key === 'End') {
        e.preventDefault()
        setCurrentIndex(total - 1)
      } else if (e.key === 'Escape') {
        setMode('scroll')
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [mode, total])

  // Scroll to top of slide when index changes in presentation mode
  useEffect(() => {
    if (mode === 'presentation' && presentationRef.current) {
      presentationRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [currentIndex, mode])

  if (slides.length === 0) return null

  return (
    <div>
      {/* ── Header bar: mode toggle + progress ───────────────── */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-rule">
        <div className="flex items-center gap-3">
          <h2 className="font-serif text-mist text-lg">Module Content</h2>
          <span className="text-grey text-xs">
            {mode === 'presentation' ? `${currentIndex + 1} / ${total}` : `${total} slides`}
          </span>
        </div>

        <div className="flex items-center gap-1 bg-card border border-rule rounded-sm p-0.5">
          <button
            onClick={() => setMode('scroll')}
            className={`px-3 py-1 text-[10px] tracking-wider transition-colors rounded-sm ${
              mode === 'scroll'
                ? 'bg-gold/20 text-gold'
                : 'text-grey hover:text-mist'
            }`}
          >
            SCROLL
          </button>
          <button
            onClick={() => setMode('presentation')}
            className={`px-3 py-1 text-[10px] tracking-wider transition-colors rounded-sm ${
              mode === 'presentation'
                ? 'bg-gold/20 text-gold'
                : 'text-grey hover:text-mist'
            }`}
          >
            PRESENTATION
          </button>
        </div>
      </div>

      {/* ── Scroll mode ──────────────────────────────────────── */}
      {mode === 'scroll' && (
        <div>
          {slides.map((slide, i) => (
            <SlideViewer key={slide.id} slide={slide} index={i} total={total} />
          ))}
        </div>
      )}

      {/* ── Presentation mode ────────────────────────────────── */}
      {mode === 'presentation' && (
        <div ref={presentationRef}>
          {/* Progress bar */}
          <div className="h-0.5 bg-rule mb-4 overflow-hidden rounded-full">
            <div
              className="h-full bg-gold transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / total) * 100}%` }}
            />
          </div>

          {/* Current slide */}
          <div className="min-h-[500px]">
            <SlideViewer
              key={slides[currentIndex].id}
              slide={slides[currentIndex]}
              index={currentIndex}
              total={total}
            />
          </div>

          {/* Navigation controls */}
          <div className="flex items-center justify-between gap-3 mt-6 pt-4 border-t border-rule">
            <button
              onClick={goPrev}
              disabled={currentIndex === 0}
              className="flex items-center gap-2 px-4 py-2 text-xs text-mist border border-rule hover:border-gold-dim hover:bg-rule/40 rounded-sm transition-colors disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-rule disabled:hover:bg-transparent"
            >
              <span className="text-gold-dim">←</span>
              <span>Previous</span>
            </button>

            <div className="flex items-center gap-1.5 flex-1 justify-center flex-wrap max-w-md">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all ${
                    i === currentIndex
                      ? 'w-6 bg-gold'
                      : 'w-1.5 bg-rule hover:bg-gold-dim'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={goNext}
              disabled={currentIndex === total - 1}
              className="flex items-center gap-2 px-4 py-2 text-xs text-mist border border-rule hover:border-gold-dim hover:bg-rule/40 rounded-sm transition-colors disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-rule disabled:hover:bg-transparent"
            >
              <span>Next</span>
              <span className="text-gold-dim">→</span>
            </button>
          </div>

          {/* Keyboard hint */}
          <div className="text-center text-[10px] text-grey-dim mt-3 tracking-wide">
            Use ← → arrow keys to navigate · Esc to exit
          </div>
        </div>
      )}
    </div>
  )
}
