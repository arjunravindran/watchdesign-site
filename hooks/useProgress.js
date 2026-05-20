'use client'

import { useState, useEffect, useCallback } from 'react'

const STORAGE_KEY = 'wdsp:seen'

function loadSeen() {
  if (typeof window === 'undefined') return new Set()
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? new Set(JSON.parse(raw)) : new Set()
  } catch {
    return new Set()
  }
}

function saveSeen(seen) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...seen]))
  } catch {}
}

export function useProgress() {
  const [seen, setSeen] = useState(() => new Set())

  // Hydrate from localStorage after mount (avoids SSR mismatch)
  useEffect(() => {
    setSeen(loadSeen())
  }, [])

  const markSeen = useCallback((id) => {
    setSeen(prev => {
      if (prev.has(id)) return prev
      const next = new Set(prev)
      next.add(id)
      saveSeen(next)
      return next
    })
  }, [])

  const markUnseen = useCallback((id) => {
    setSeen(prev => {
      if (!prev.has(id)) return prev
      const next = new Set(prev)
      next.delete(id)
      saveSeen(next)
      return next
    })
  }, [])

  const isSeen = useCallback((id) => seen.has(id), [seen])

  const moduleCompletion = useCallback((slides) => {
    if (!slides?.length) return { seen: 0, total: 0, pct: 0 }
    const seenCount = slides.filter(s => seen.has(s.id)).length
    return { seen: seenCount, total: slides.length, pct: Math.round((seenCount / slides.length) * 100) }
  }, [seen])

  return { markSeen, markUnseen, isSeen, moduleCompletion }
}
