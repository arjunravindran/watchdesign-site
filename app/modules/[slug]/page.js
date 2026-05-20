import { modules } from '../../../data/modules'
import SlideDeck from '../../../components/slides/SlideDeck'
import SlideToc from '../../../components/ui/SlideToc'
import ResourcesPanel from '../../../components/ui/ResourcesPanel'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export function generateStaticParams() {
  return modules.map((m) => ({ slug: m.slug }))
}

export function generateMetadata({ params }) {
  const mod = modules.find(m => m.slug === params.slug)
  if (!mod) return {}
  return {
    title: `Module ${mod.number}: ${mod.title} — Watch Design Programme`,
    description: mod.description,
  }
}

export default function ModulePage({ params }) {
  const mod = modules.find(m => m.slug === params.slug)
  if (!mod) notFound()

  const idx = modules.findIndex(m => m.slug === params.slug)
  const prev = modules[idx - 1] || null
  const next = modules[idx + 1] || null

  const heroSlide = mod.slides.find(s => s.type === 'hero')
  const tocSlides = mod.slides.filter(s => s.type !== 'hero' && s.type !== 'endcard')
  const hasSlides = tocSlides.length > 0

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-grey mb-10">
        <Link href="/" className="hover:text-gold transition-colors">Curriculum</Link>
        <span>›</span>
        <span className="text-mist">Module {mod.number}</span>
      </nav>

      {/* ── Masthead ──────────────────────────────────────────── */}
      <div className="mb-12 pb-10 border-b border-rule">
        <div className="w-10 h-px bg-gold mb-6" />
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-start">
          <div>
            <p className="eyebrow mb-3">Module {mod.number}</p>
            <h1 className="font-serif text-4xl sm:text-5xl text-mist leading-tight mb-3 font-light tracking-tight">
              {mod.title}
            </h1>
            {mod.subtitle && (
              <p className="font-serif text-gold-dim italic text-lg sm:text-xl mb-5 font-light leading-snug">
                {mod.subtitle}
              </p>
            )}
            <p className="text-grey text-sm leading-relaxed max-w-prose mb-6">
              {mod.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                mod.level,
                mod.sessions ? `${mod.sessions} Session${mod.sessions > 1 ? 's' : ''}` : 'Self-paced',
                mod.assignment,
              ].filter(Boolean).map((tag, i) => (
                <span key={i} className="text-[10px] text-grey bg-card border border-rule rounded-sm px-2.5 py-1 tracking-wide">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {heroSlide?.image && (
            <div className="w-56 shrink-0 hidden lg:block">
              <div className="rounded-sm overflow-hidden border border-rule/60 bg-card p-1 shadow-2xl shadow-gold/5">
                <img
                  src={heroSlide.image}
                  alt={mod.title}
                  className="w-full h-48 object-cover rounded-sm"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-10">

        {/* ── Main content ─────────────────────────────────── */}
        <div>
          {hasSlides ? (
            <SlideDeck slides={mod.slides} />
          ) : (
            <div className="slide-card p-8 text-center">
              <div className="text-gold-dim text-4xl mb-4">⌚</div>
              <h2 className="font-serif text-mist text-lg mb-2">Slides Coming Soon</h2>
              <p className="text-grey text-sm">
                The full slide content for Module {mod.number} will be added here shortly.
              </p>
            </div>
          )}
        </div>

        {/* ── Sidebar ──────────────────────────────────────── */}
        <div className="space-y-4">

          {/* Table of contents */}
          {tocSlides.length > 0 && (
            <div className="slide-card p-4 sticky top-20">
              <h3 className="eyebrow mb-4">In This Module</h3>
              <SlideToc slides={tocSlides} />
            </div>
          )}

          {/* Resources Panel */}
          <ResourcesPanel moduleNumber={mod.number} />

        </div>
      </div>

      {/* ── Prev / Next navigation ───────────────────────── */}
      <div className="flex justify-between gap-4 mt-12 pt-8 border-t border-rule">
        {prev ? (
          <Link href={`/modules/${prev.slug}/`} className="group flex items-center gap-3 flex-1 slide-card p-4 hover:border-gold-dim transition-colors">
            <span className="text-gold-dim text-lg">←</span>
            <div>
              <div className="text-[10px] text-grey mb-0.5">Previous</div>
              <div className="text-mist text-sm font-serif group-hover:text-gold transition-colors leading-snug">{prev.title}</div>
            </div>
          </Link>
        ) : <div />}

        {next ? (
          <Link href={`/modules/${next.slug}/`} className="group flex items-center justify-end gap-3 flex-1 slide-card p-4 hover:border-gold-dim transition-colors text-right">
            <div>
              <div className="text-[10px] text-grey mb-0.5">Next</div>
              <div className="text-mist text-sm font-serif group-hover:text-gold transition-colors leading-snug">{next.title}</div>
            </div>
            <span className="text-gold-dim text-lg">→</span>
          </Link>
        ) : <div />}
      </div>
    </div>
  )
}
