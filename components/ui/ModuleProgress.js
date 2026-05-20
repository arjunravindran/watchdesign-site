'use client'

import { useProgress } from '../../hooks/useProgress'

export default function ModuleProgress({ slides }) {
  const { moduleCompletion } = useProgress()
  const { seen, total, pct } = moduleCompletion(slides)

  if (pct === 0) return null

  return (
    <div className="flex items-center gap-3 mt-4">
      <div className="flex-1 h-px bg-rule max-w-48 overflow-hidden rounded-full">
        <div className="h-full bg-gold transition-all duration-500" style={{ width: `${pct}%` }} />
      </div>
      <span className="text-[10px] text-grey tracking-wider">
        {seen} of {total} slides read
      </span>
    </div>
  )
}
