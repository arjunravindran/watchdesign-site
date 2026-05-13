'use client'
import Link from 'next/link'
import { useState } from 'react'
import SearchBar from '../ui/SearchBar'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
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

        {/* Desktop search */}
        <div className="hidden md:block flex-1 max-w-sm">
          <SearchBar compact />
        </div>

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
  )
}
