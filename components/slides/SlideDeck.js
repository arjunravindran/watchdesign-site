'use client'

import { useEffect, useRef, useMemo } from 'react'
import SlideViewer from './SlideViewer'
import { useProgress } from '../../hooks/useProgress'

const SKIP_TYPES = new Set(['hero', 'endcard'])

export default function SlideDeck({ slides }) {
  const visible = useMemo(() => slides.filter(s => !SKIP_TYPES.has(s.type)), [slides])
  const { markSeen } = useProgress()
  const markSeenRef = useRef(markSeen)
  markSeenRef.current = markSeen

  useEffect(() => {
    if (visible.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id
          if (entry.isIntersecting) {
            timers.current[id] = setTimeout(() => markSeenRef.current(id), 1500)
          } else {
            clearTimeout(timers.current[id])
            delete timers.current[id]
          }
        }
      },
      { threshold: 0.6 }
    )

    const els = visible.map(s => document.getElementById(s.id)).filter(Boolean)
    els.forEach(el => observer.observe(el))

    return () => {
      observer.disconnect()
      Object.values(timers.current).forEach(clearTimeout)
      timers.current = {}
    }
  }, [visible])

  const timers = useRef({})

  if (visible.length === 0) return null

  return (
    <div>
      {visible.map(slide => (
        <SlideViewer key={slide.id} slide={slide} />
      ))}
    </div>
  )
}
