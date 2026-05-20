'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { getSearchFuse } from '../../lib/search'

export default function SearchBar({ compact = false, autoFocus = false, initialQuery = '' }) {
  const [query, setQuery] = useState(initialQuery)
  const [results, setResults] = useState([])
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const inputRef = useRef(null)
  const dropdownRef = useRef(null)

  useEffect(() => {
    if (autoFocus && inputRef.current) inputRef.current.focus()
  }, [autoFocus])

  useEffect(() => {
    function handleClick(e) {
      if (!dropdownRef.current?.contains(e.target) && !inputRef.current?.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  function handleInput(e) {
    const q = e.target.value
    setQuery(q)
    if (q.trim().length < 2) { setResults([]); setOpen(false); return }
    const r = getSearchFuse().search(q, { limit: 6 })
    setResults(r)
    setOpen(r.length > 0)
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && query.trim()) {
      router.push(`/search/?q=${encodeURIComponent(query.trim())}`)
      setOpen(false)
    }
    if (e.key === 'Escape') setOpen(false)
  }

  function handleResultClick(url) {
    router.push(url)
    setOpen(false)
    setQuery('')
  }

  return (
    <div className="relative w-full">
      <div className={`flex items-center gap-2 bg-card border border-rule rounded-sm px-3 ${compact ? 'h-8' : 'h-11'}`}>
        <svg className="text-gold-dim shrink-0" width="14" height="14" viewBox="0 0 16 16" fill="none">
          <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M11 11l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
        <input
          ref={inputRef}
          value={query}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          onFocus={() => results.length > 0 && setOpen(true)}
          placeholder="Search modules, slides, topics…"
          className={`flex-1 bg-transparent text-mist placeholder-grey outline-none font-sans ${compact ? 'text-xs' : 'text-sm'}`}
        />
        {query && (
          <button onClick={() => { setQuery(''); setResults([]); setOpen(false) }}
            className="text-grey hover:text-gold transition-colors text-xs">✕</button>
        )}
      </div>

      {open && (
        <div ref={dropdownRef} className="absolute top-full left-0 right-0 mt-1 bg-card border border-rule rounded-sm shadow-2xl z-50 overflow-hidden">
          {results.map(({ item }) => (
            <button
              key={item.id}
              onClick={() => handleResultClick(item.url)}
              className="w-full text-left px-3 py-2.5 border-b border-rule last:border-0 hover:bg-rule transition-colors group"
            >
              <div className="flex items-start gap-2">
                <span className="text-gold-dim text-[10px] tracking-wider font-sans mt-0.5 shrink-0">
                  M{item.module}
                </span>
                <div className="min-w-0">
                  <div className="text-xs text-mist truncate group-hover:text-gold transition-colors">
                    {item.title || item.tag}
                  </div>
                  <div className="text-[10px] text-grey truncate mt-0.5">
                    {item.body?.slice(0, 80)}…
                  </div>
                </div>
              </div>
            </button>
          ))}
          <button
            onClick={() => { router.push(`/search/?q=${encodeURIComponent(query)}`); setOpen(false) }}
            className="w-full text-left px-3 py-2 text-xs text-gold-dim hover:text-gold transition-colors border-t border-rule"
          >
            See all results for "{query}" →
          </button>
        </div>
      )}
    </div>
  )
}
