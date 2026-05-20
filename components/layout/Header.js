'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import SearchBar from '../ui/SearchBar'
import CommandPalette from '../ui/CommandPalette'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [paletteOpen, setPaletteOpen] = useState(false)

  // Global Cmd+K / Ctrl+K listener
  useEffect(() => {
    function handleKey(e) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setPaletteOpen(true)
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  return (
    <>
      <header className="sticky top-0 z-50 bg-bg/90 backdrop-blur border-b border-rule">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">

          {/* Wordmark */}
          <Link href="/" className="flex items-center gap-3 shrink-0 group">
            <div className="w-px h-6 bg-gold" />
            <span className="font-serif text-mist text-sm leading-tight">
              Watch Design<br />
              <span className="text-gold text-xs tracking-widest">SELF-STUDY</span>
            </span>
          </Link>

          {/* Desktop ⌘K trigger */}
          <button
            onClick={() => setPaletteOpen(true)}
            className="hidden md:flex items-center gap-2 flex-1 max-w-sm bg-card border border-rule rounded-sm px-3 h-8 text-xs text-grey hover:border-gold-dim hover:text-mist transition-colors"
          >
            <svg className="text-gold-dim shrink-0" width="12" height="12" viewBox="0 0 16 16" fill="none">
              <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M11 11l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <span className="flex-1 text-left">Search…</span>
            <kbd className="text-[9px] border border-rule rounded-sm px-1.5 py-0.5 font-mono text-grey/60">
              ⌘K
            </kbd>
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6 text-xs text-grey tracking-wider">
            <Link href="/" className="hover:text-gold transition-colors">CURRICULUM</Link>
            <Link href="/search/" className="hover:text-gold transition-colors">SEARCH</Link>
          </nav>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden text-grey hover:text-gold transition-colors p-1"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              {menuOpen ? (
                <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              ) : (
                <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-card border-b border-rule px-4 pb-4 space-y-4">
            <SearchBar compact />
            <nav className="flex gap-6 text-xs text-grey tracking-wider pt-1">
              <Link href="/" onClick={() => setMenuOpen(false)} className="hover:text-gold">CURRICULUM</Link>
              <Link href="/search/" onClick={() => setMenuOpen(false)} className="hover:text-gold">SEARCH</Link>
            </nav>
          </div>
        )}
      </header>

      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
    </>
  )
}
