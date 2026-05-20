'use client'

import { useEffect, useRef } from 'react'
import SlideViewer from './SlideViewer'
import { useProgress } from '../../hooks/useProgress'

const SKIP_TYPES = new Set(['hero', 'endcard'])

export default function SlideDeck({ slides }) {
  const visible = slides.filter(s => !SKIP_TYPES.has(s.type))
  const { markSeen } = useProgress()
  const timerRef = useRef({})

  useEffect(() => {
    if (visible.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id
          if (entry.isIntersecting) {
            // Mark seen after 1.5s of being ≥60% visible
            timerRef.current[id] = setTimeout(() => markSeen(id), 1500)
          } else {
            clearTimeout(timerRef.current[id])
            delete timerRef.current[id]
          }
        }
      },
      { threshold: 0.6 }
    )

    const els = visible.map(s => document.getElementById(s.id)).filter(Boolean)
    els.forEach(el => observer.observe(el))

    return () => {
      observer.disconnect()
      Object.values(timerRef.current).forEach(clearTimeout)
      timerRef.current = {}
    }
  }, [visible, markSeen])

  if (visible.length === 0) return null

  return (
    <div>
      {visible.map(slide => (
        <SlideViewer key={slide.id} slide={slide} />
      ))}
    </div>
  )
}
