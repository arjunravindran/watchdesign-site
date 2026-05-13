import { modules } from '../../../data/modules'
import SlideViewer from '../../../components/slides/SlideViewer'
import Link from 'next/link'
import { notFound } from 'next/navigation'

// Tell Next.js which slugs to pre-render at build time
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

  const hasSlides = mod.slides.length > 0

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-grey mb-8">
        <Link href="/" className="hover:text-gold transition-colors">Curriculum</Link>
        <span>›</span>
        <span className="text-mist">Module {mod.number}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8">

        {/* ── Main content ─────────────────────────────────── */}
        <div>
          {/* Module header */}
          <div className="mb-8 border-l-2 border-gold pl-5">
            <div className="eyebrow mb-2">Module {mod.number}</div>
            <h1 className="font-serif text-3xl text-mist leading-tight mb-2">{mod.title}</h1>
            <p className="text-grey text-sm italic">{mod.subtitle}</p>
          </div>

          {/* Meta pills */}
          <div className="flex flex-wrap gap-2 mb-8">
            {[
              mod.level,
              mod.sessions ? `${mod.sessions} Session${mod.sessions > 1 ? 's' : ''}` : 'Self-paced',
              mod.assignment,
            ].map((tag, i) => tag && (
              <span key={i} className="text-[10px] text-grey bg-card border border-rule rounded-sm px-2 py-0.5 tracking-wide">
                {tag}
              </span>
            ))}
          </div>

          {/* Description */}
          <p className="text-grey text-sm leading-relaxed mb-10 max-w-prose border-l border-rule pl-4">
            {mod.description}
          </p>

          {/* Slides */}
          {hasSlides ? (
            <div>
              <div className="flex items-center gap-3 mb-4">
                <h2 className="font-serif text-mist text-lg">Module Content</h2>
                <span className="text-grey text-xs">{mod.slides.length} slides</span>
              </div>
              {mod.slides.map((slide, i) => (
                <SlideViewer key={slide.id} slide={slide} index={i} total={mod.slides.length} />
              ))}
            </div>
          ) : (
            <div className="slide-card p-8 text-center">
              <div className="text-gold-dim text-4xl mb-4">⌚</div>
              <h2 className="font-serif text-mist text-lg mb-2">Slides Coming Soon</h2>
              <p className="text-grey text-sm">
                The full slide content for Module {mod.number} will be added here shortly.
                In the meantime, download the PPTX file to access the complete module.
              </p>
              <a
                href={`/downloads/Module${mod.number.padStart(2, '0')}_${mod.title.replace(/[^a-zA-Z]/g, '')}.pptx`}
                className="inline-flex items-center gap-2 mt-4 text-xs text-gold border border-gold-dim rounded-sm px-4 py-2 hover:bg-gold-dim/20 transition-colors"
              >
                ↓ Download Module {mod.number} PPTX
              </a>
            </div>
          )}
        </div>

        {/* ── Sidebar ──────────────────────────────────────── */}
        <aside className="space-y-4">

          {/* Module navigation */}
          <div className="slide-card p-4 sticky top-20">
            <h3 className="eyebrow mb-3">All Modules</h3>
            <nav className="space-y-0.5">
              {modules.map((m) => (
                <Link
                  key={m.slug}
                  href={`/modules/${m.slug}/`}
                  className={`flex items-center gap-2 px-2 py-1.5 rounded-sm text-xs transition-colors ${
                    m.slug === mod.slug
                      ? 'bg-gold/10 text-gold border-l border-gold'
                      : 'text-grey hover:text-mist hover:bg-rule'
                  }`}
                >
                  <span className="text-[10px] text-gold-dim w-8 shrink-0">
                    {m.number}
                  </span>
                  <span className="leading-tight line-clamp-2">{m.title}</span>
                </Link>
              ))}
            </nav>
          </div>

        </aside>
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
