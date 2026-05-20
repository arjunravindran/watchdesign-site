'use client'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { getSearchFuse } from '../../lib/search'
import SearchBar from '../../components/ui/SearchBar'
import Link from 'next/link'
import { Suspense } from 'react'

function SearchResults() {
  const params = useSearchParams()
  const initialQ = params.get('q') || ''
  const [query, setQuery] = useState(initialQ)
  const [results, setResults] = useState([])

  useEffect(() => {
    if (initialQ) {
      setResults(getSearchFuse().search(initialQ, { limit: 30 }))
    }
  }, [initialQ])

  // Group by module
  const grouped = {}
  for (const { item, score } of results) {
    const key = `M${item.module} — ${item.slug}`
    if (!grouped[key]) grouped[key] = { slug: item.slug, module: item.module, items: [] }
    grouped[key].items.push({ ...item, score })
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="font-serif text-mist text-2xl mb-6">Search</h1>

      <div className="mb-8">
        <SearchBar autoFocus={!initialQ} initialQuery={initialQ} />
      </div>

      {initialQ && (
        <div className="text-grey text-sm mb-6">
          {results.length === 0
            ? `No results for "${initialQ}"`
            : `${results.length} result${results.length !== 1 ? 's' : ''} for "${initialQ}"`}
        </div>
      )}

      {!initialQ && (
        <div className="text-grey text-sm mb-6 italic">
          Type to search across all modules, slides, and topics.
        </div>
      )}

      {/* Results grouped by module */}
      <div className="space-y-8">
        {Object.entries(grouped).map(([key, group]) => (
          <div key={key}>
            <div className="flex items-center gap-3 mb-3">
              <span className="eyebrow">Module {group.module}</span>
              <div className="flex-1 h-px bg-rule" />
              <Link href={`/modules/${group.slug}/`}
                className="text-[10px] text-gold-dim hover:text-gold transition-colors">
                View module →
              </Link>
            </div>
            <div className="space-y-2">
              {group.items.map((item) => (
                <Link key={item.id} href={item.url}
                  className="block slide-card p-4 hover:border-gold-dim transition-colors group">
                  <div className="flex items-start gap-3">
                    <span className="text-[10px] text-gold-dim mt-0.5 shrink-0 w-12">
                      {item.type === 'module' ? 'Module' : 'Slide'}
                    </span>
                    <div className="min-w-0">
                      <div className="text-mist text-sm font-medium group-hover:text-gold transition-colors truncate">
                        {item.title || item.tag || '(untitled)'}
                      </div>
                      {item.tag && item.title && (
                        <div className="text-[10px] text-grey mt-0.5">{item.tag}</div>
                      )}
                      {item.body && (
                        <div className="text-grey text-xs mt-1 line-clamp-2 leading-relaxed">
                          {item.body.slice(0, 180)}…
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="p-10 text-grey">Loading…</div>}>
      <SearchResults />
    </Suspense>
  )
}
