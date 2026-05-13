import Link from 'next/link'
import { modules } from '../data/modules'
import ModuleCard from '../components/ui/ModuleCard'
import SearchBar from '../components/ui/SearchBar'

export default function Home() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="border-b border-rule">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <div className="max-w-2xl">
            <div className="w-8 h-px bg-gold mb-6" />
            <p className="eyebrow mb-4">Watch Design Self-Study Programme</p>
            <h1 className="font-serif text-4xl sm:text-5xl text-mist leading-tight mb-4">
              Design watches.<br />
              <span className="text-gold italic">Understand them first.</span>
            </h1>
            <p className="text-grey text-base leading-relaxed mb-8 max-w-prose">
              A graduate-level self-study curriculum taking you from vocabulary and history 
              through brand strategy, CAD, materials, rendering, and launch. 10 modules, 
              9 assignments, 1 final pitch deck.
            </p>

            {/* Search */}
            <div className="max-w-md">
              <SearchBar />
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats bar ────────────────────────────────────────── */}
      <section className="border-b border-rule bg-card/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-wrap gap-6 sm:gap-12 text-xs text-grey">
            {[
              ['11', 'Modules'],
              ['115+', 'Slides'],
              ['9', 'Assignments'],
              ['100+', 'Curated resources'],
              ['Free', 'to study'],
            ].map(([num, label]) => (
              <div key={label} className="flex items-baseline gap-1.5">
                <span className="font-serif text-gold text-base">{num}</span>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Module grid ──────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-serif text-mist text-xl">The Curriculum</h2>
          <span className="text-grey text-xs">{modules.length} modules</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {modules.map((mod) => (
            <ModuleCard key={mod.slug} mod={mod} />
          ))}
        </div>
      </section>

      {/* ── How to use ───────────────────────────────────────── */}
      <section className="border-t border-rule">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <h2 className="font-serif text-mist text-xl mb-6">How to Use This Programme</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm text-grey leading-relaxed">
            <div>
              <div className="w-6 h-px bg-gold mb-3" />
              <h3 className="text-mist font-medium mb-2">Work in sequence</h3>
              <p>Modules 1–9 build directly on each other. The brand brief from Module 2 feeds everything from Module 4 onwards. Do not skip ahead.</p>
            </div>
            <div>
              <div className="w-6 h-px bg-gold mb-3" />
              <h3 className="text-mist font-medium mb-2">Complete the assignments</h3>
              <p>The 9 assignments are the curriculum. Reading slides without doing the work is interesting but not transformative. The disassembly assignment especially is non-optional.</p>
            </div>
            <div>
              <div className="w-6 h-px bg-gold mb-3" />
              <h3 className="text-mist font-medium mb-2">Check the resources</h3>
              <p>Each module has curated resources at multiple difficulty levels. The Essential tier is the minimum. Distinction-level work requires going deeper into the Recommended tier.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
