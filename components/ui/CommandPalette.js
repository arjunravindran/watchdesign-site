'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Fuse from 'fuse.js'
import { buildSearchIndex } from '../../data/modules'

let fuse = null
function getFuse() {
  if (!fuse) {
    fuse = new Fuse(buildSearchIndex(), {
      keys: [
        { name: 'title', weight: 0.4 },
        { name: 'tag',   weight: 0.2 },
        { name: 'body',  weight: 0.4 },
      ],
      threshold: 0.35,
      includeScore: true,
      minMatchCharLength: 2,
    })
  }
  return fuse
}

export default function CommandPalette({ open, onClose }) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const inputRef = useRef(null)
  const router = useRouter()

  useEffect(() => {
    if (open) {
      setQuery('')
      setResults([])
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const handleKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [open, onClose])

  function handleInput(e) {
    const q = e.target.value
    setQuery(q)
    if (q.trim().length < 2) { setResults([]); return }
    setResults(getFuse().search(q, { limit: 12 }))
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && query.trim()) {
      router.push(`/search/?q=${encodeURIComponent(query.trim())}`)
      onClose()
    }
  }

  function handleSelect(url) {
    router.push(url)
    onClose()
  }

  if (!open) return null

  // Group by module
  const grouped = {}
  for (const { item } of results) {
    if (!grouped[item.module]) grouped[item.module] = { module: item.module, items: [] }
    grouped[item.module].items.push(item)
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4"
      onMouseDown={onClose}
    >
      <div className="absolute inset-0 bg-bg/80 backdrop-blur-sm" />

      <div
        className="relative w-full max-w-xl bg-card border border-rule rounded-sm shadow-2xl shadow-black/60 overflow-hidden"
        onMouseDown={e => e.stopPropagation()}
      >
        {/* Input row */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-rule">
          <svg className="text-gold-dim shrink-0" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M11 11l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <input
            ref={inputRef}
            value={query}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            placeholder="Search modules, slides, topics…"
            className="flex-1 bg-transparent text-mist placeholder-grey outline-none text-sm font-sans"
          />
          <kbd className="text-[10px] text-grey border border-rule rounded-sm px-1.5 py-0.5 font-mono shrink-0">
            ESC
          </kbd>
        </div>

        {/* Results */}
        {results.length > 0 && (
          <div className="max-h-[55vh] overflow-y-auto">
            {Object.entries(grouped).map(([modNum, group]) => (
              <div key={modNum}>
                <div className="px-4 py-1.5 flex items-center gap-3 bg-rule/10">
                  <span className="eyebrow text-[9px] text-gold-dim">Module {group.module}</span>
                  <div className="flex-1 h-px bg-rule/60" />
                </div>
                {group.items.map(item => (
                  <button
                    key={item.id}
                    onClick={() => handleSelect(item.url)}
                    className="w-full text-left px-4 py-2.5 border-b border-rule/30 last:border-0 hover:bg-rule/40 transition-colors group"
                  >
                    <div className="flex items-start gap-3">
                      {item.tag && (
                        <span className="text-[9px] text-gold-dim font-mono tracking-wider mt-0.5 shrink-0 w-20 truncate uppercase">
                          {item.tag}
                        </span>
                      )}
                      <div className="min-w-0">
                        <div className="text-sm text-mist group-hover:text-gold transition-colors leading-snug truncate">
                          {item.title || item.tag}
                        </div>
                        {item.body && (
                          <div className="text-[11px] text-grey mt-0.5 line-clamp-1 leading-relaxed">
                            {item.body.slice(0, 120)}
                          </div>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            ))}
            <button
              onClick={() => { router.push(`/search/?q=${encodeURIComponent(query)}`); onClose() }}
              className="w-full text-left px-4 py-2.5 text-xs text-gold-dim hover:text-gold transition-colors border-t border-rule"
            >
              See all results for "{query}" →
            </button>
          </div>
        )}

        {query.length >= 2 && results.length === 0 && (
          <div className="px-4 py-8 text-center text-grey text-sm">
            No results for "{query}"
          </div>
        )}

        {query.length < 2 && (
          <div className="px-4 py-6 text-center text-grey text-xs italic">
            Type to search across all modules, slides, and topics
          </div>
        )}
      </div>
    </div>
  )
}
