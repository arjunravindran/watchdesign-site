'use client'

import SlideViewer from './SlideViewer'

const SKIP_TYPES = new Set(['hero', 'endcard'])

export default function SlideDeck({ slides }) {
  const visible = slides.filter(s => !SKIP_TYPES.has(s.type))
  if (visible.length === 0) return null
  return (
    <div>
      {visible.map(slide => (
        <SlideViewer key={slide.id} slide={slide} />
      ))}
    </div>
  )
}
