'use client'

import { useState, useEffect } from 'react'

export function useTocActive(slides) {
  const [activeId, setActiveId] = useState(slides[0]?.id || null)

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

  return activeId
}
