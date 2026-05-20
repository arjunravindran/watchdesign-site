import React, { useState } from 'react'

const EDITORIAL_TYPES = new Set(['content', 'overview', 'summary', 'resources'])

export default function SlideViewer({ slide }) {
  if (EDITORIAL_TYPES.has(slide.type)) {
    const strippedSlide = { ...slide, heading: null }
    return (
      <section id={slide.id} className="py-10 border-b border-rule/20 last:border-0">
        {slide.tag && <p className="eyebrow mb-3">{slide.tag}</p>}
        {slide.heading && (
          <h2 className="font-serif text-mist text-2xl sm:text-3xl leading-snug font-light tracking-wide pb-4 mb-6 border-b border-rule/30">
            {slide.heading}
          </h2>
        )}
        {slide.type === 'content'   && <SlideContent   s={strippedSlide} />}
        {slide.type === 'overview'  && <SlideOverview  s={strippedSlide} />}
        {slide.type === 'summary'   && <SlideSummary   s={strippedSlide} editorial />}
        {slide.type === 'resources' && <SlideResources s={strippedSlide} editorial />}
      </section>
    )
  }

  return (
    <div id={slide.id} className="slide-card overflow-hidden mb-6 bg-card border border-rule/80 rounded-sm shadow-xl shadow-black/40 hover:border-rule transition-all duration-300">
      {slide.tag && (
        <div className="px-6 pt-5 pb-0">
          <span className="eyebrow text-[9px] tracking-widest2 font-semibold text-gold">{slide.tag}</span>
        </div>
      )}
      <div className="p-6 pt-4">
        {slide.type === 'hero'               && <SlideHero s={slide} />}
        {slide.type === 'grid'               && (
          slide.id === 'm01-s08'
            ? <SlideHandsGrid s={slide} />
            : <SlideGrid s={slide} />
        )}
        {slide.type === 'list'               && <SlideList s={slide} />}
        {slide.type === 'callout'            && <SlideCallout s={slide} />}
        {slide.type === 'compare'            && <SlideCompare s={slide} />}
        {slide.type === 'sequence'           && <SlideSequence s={slide} />}
        {slide.type === 'assignment'         && <SlideAssignment s={slide} />}
        {slide.type === 'endcard'            && <SlideEndcard s={slide} />}
        {slide.type === 'flow'               && <SlideMechanicsFlow s={slide} />}
        {slide.type === 'table'              && <SlideMovementTable s={slide} />}
        {slide.type === 'pricing-table'      && <SlidePricingTable s={slide} />}
        {slide.type === 'movement-selection' && <SlideMovementSelection s={slide} />}
        {slide.type === 'movements-grid'     && <SlideMovementsGrid s={slide} />}
        {slide.type === 'dimensional-stack'  && <SlideDimensionalStack s={slide} />}
        {slide.type === 'crown-positions'    && <SlideCrownPositions s={slide} />}
        {slide.type === 'case-shapes'        && <SlideCaseShapes s={slide} />}
        {slide.type === 'dial-zones'         && <SlideDialZones s={slide} />}
        {slide.type === 'illustrator-tools'  && <SlideIllustratorTools s={slide} />}
        {slide.type === 'cad-timeline'       && <SlideCadTimeline s={slide} />}
        {slide.type === 'cad-errors'         && <SlideCadErrors s={slide} />}
        {slide.type === 'case-materials'     && <SlideCaseMaterials s={slide} />}
        {slide.type === 'lume-harmony'       && <SlideLumeHarmony s={slide} />}
        {slide.type === 'light-physics'      && <SlideLightPhysics s={slide} />}
        {slide.type === 'trend-compass'      && <SlideTrendCompass s={slide} />}
        {slide.type === 'pricing-calc'       && <SlidePricingCalc s={slide} />}
        {slide.type === 'startup-roadmap'    && <SlideStartupRoadmap s={slide} />}
      </div>
    </div>
  )
}

// ── Shared Layout Wrapper ──────────────────────────────────────

function SlideLayout({ s, children }) {
  if (s.image) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
        <div className="lg:col-span-7 space-y-4">
          {children}
        </div>
        <div className="lg:col-span-5 w-full h-full flex items-center justify-center">
          <div className="w-full max-w-md lg:max-w-none">
            <SlideImage s={s} />
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className="max-w-3xl">
      {children}
    </div>
  )
}

// ── Slide type components ─────────────────────────────────────

function SlideHero({ s }) {
  const bodyLines = (s.body || '').split('\n').filter(Boolean)
  return (
    <SlideLayout s={s}>
      <div className="py-4 border-l-2 border-gold pl-5 sm:pl-6 my-2">
        <div className="eyebrow mb-3 text-gold/80">{s.module || s.tag}</div>
        <h1 className="font-serif text-3xl sm:text-4xl text-mist leading-tight tracking-tight font-light">
          {s.title || s.heading} {s.subtitle && <span className="text-gold italic font-extralight block sm:inline mt-1 sm:mt-0">{s.subtitle}</span>}
        </h1>
        {s.tagline && (
          <p className="text-gold-dim text-sm mt-4 italic font-sans leading-relaxed">{s.tagline}</p>
        )}
        {!s.tagline && bodyLines.length > 0 && (
          <div className="mt-4 space-y-2.5">
            {bodyLines.map((line, i) => (
              <p key={i} className={i === 0 ? "text-grey text-base italic leading-relaxed font-sans" : "text-xs text-grey/80 tracking-wider uppercase font-sans font-medium"}>
                {line}
              </p>
            ))}
          </div>
        )}
        {s.meta && (
          <p className="text-[10px] text-grey/60 mt-6 tracking-widest uppercase font-sans font-semibold">{s.meta}</p>
        )}
      </div>
    </SlideLayout>
  )
}

function SlideGrid({ s }) {
  const cols = s.columns === 3
    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
    : s.columns === 2
      ? 'grid-cols-1 sm:grid-cols-2'
      : 'grid-cols-1'

  return (
    <SlideLayout s={s}>
      <Heading text={s.heading} />
      <div className={`grid ${cols} gap-4 mt-5`}>
        {s.items?.map((item, i) => (
          <div key={i} className="bg-rule/20 hover:bg-rule/40 border border-rule/50 rounded-sm p-5 border-l-2 border-gold-dim hover:border-gold transition-all duration-300 shadow-sm">
            {item.badge && (
              <div className="eyebrow text-[9px] mb-2 text-gold-dim font-bold">{item.badge}</div>
            )}
            <h3 className="font-serif text-mist text-base mb-2 tracking-wide font-medium">{item.title}</h3>
            <p className="text-grey text-xs leading-relaxed whitespace-pre-line">{item.body}</p>
          </div>
        ))}
      </div>
    </SlideLayout>
  )
}

function SlideList({ s }) {
  return (
    <SlideLayout s={s}>
      <Heading text={s.heading} />
      <div className="mt-5 space-y-3">
        {s.rows?.map((row, i) => (
          <div key={i} className="flex gap-4 p-4 bg-rule/20 hover:bg-rule/30 border border-rule/30 rounded-sm border-l-2 border-gold-dim hover:border-gold transition-all duration-300">
            <div className="shrink-0 text-gold text-xs font-mono w-16 pt-0.5 tracking-widest font-semibold">{row.year}</div>
            <div className="min-w-0">
              <div className="text-mist text-sm font-semibold mb-1 tracking-wide">{row.title}</div>
              <div className="text-grey text-xs leading-relaxed">{row.detail}</div>
            </div>
          </div>
        ))}
      </div>
    </SlideLayout>
  )
}

function SlideCallout({ s }) {
  return (
    <SlideLayout s={s}>
      <Heading text={s.heading} />
      {s.stats && (
        <div className={`grid grid-cols-1 sm:grid-cols-${Math.min(s.stats.length, 3)} gap-4 mt-5`}>
          {s.stats.map((stat, i) => (
            <div key={i} className="bg-rule/20 hover:bg-rule/30 border border-rule/40 rounded-sm p-5 text-center border-t-2 border-gold-dim hover:border-gold transition-all duration-300">
              <div className="font-serif text-gold text-3xl mb-1.5 font-bold tracking-tight">{stat.number}</div>
              <div className="text-mist text-xs font-semibold mb-1.5 tracking-wider uppercase">{stat.label}</div>
              <div className="text-grey text-[10px] italic">{stat.sub}</div>
            </div>
          ))}
        </div>
      )}
      {s.body && (
        <p className="text-grey text-sm leading-relaxed mt-5 border-l-2 border-rule pl-5 italic font-sans">{s.body}</p>
      )}
    </SlideLayout>
  )
}

function SlideCompare({ s }) {
  return (
    <SlideLayout s={s}>
      <Heading text={s.heading} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
        {[s.left, s.right].map((side, i) => side && (
          <div key={i} className="bg-rule/20 hover:bg-rule/30 border border-rule/40 rounded-sm p-5 border-t-2 border-gold hover:border-gold-dim transition-all duration-300 shadow-sm">
            <div className="eyebrow mb-1.5 font-bold text-gold">{side.label}</div>
            <div className="text-grey text-xs mb-4 italic">{side.subtitle}</div>
            <ul className="space-y-2 mb-4">
              {side.points?.map((pt, j) => (
                <li key={j} className="flex gap-2 text-xs text-grey leading-relaxed">
                  <span className="text-gold-dim shrink-0">◆</span>
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
            {side.lesson && (
              <p className="text-[11px] text-ivory/90 italic border-t border-rule/60 pt-3 mt-3 leading-relaxed">{side.lesson}</p>
            )}
          </div>
        ))}
      </div>
    </SlideLayout>
  )
}

function SlideSequence({ s }) {
  return (
    <SlideLayout s={s}>
      <Heading text={s.heading} />
      <div className="mt-5 space-y-3">
        {s.steps?.map((step, i) => (
          <div key={i} className="flex gap-4 items-start">
            <div className="w-8 h-8 rounded-sm bg-gold text-bg text-sm font-bold flex items-center justify-center shrink-0 shadow-md">
              {String(i + 1).padStart(2, '0')}
            </div>
            <div className="flex-1 bg-rule/20 hover:bg-rule/30 border border-rule/30 rounded-sm p-4 transition-all duration-300 shadow-sm">
              <div className="text-mist text-sm font-semibold mb-1 tracking-wide">{step.title}</div>
              <div className="text-grey text-xs leading-relaxed">{step.body}</div>
            </div>
          </div>
        ))}
      </div>
    </SlideLayout>
  )
}

function SlideAssignment({ s }) {
  const bodyLines = (s.body || s.brief || '').split('\n').filter(line => line.trim())
  return (
    <SlideLayout s={s}>
      <div className="border-t-2 border-gold pt-5">
        <div className="eyebrow mb-2 font-bold text-gold">Assignment</div>
        <Heading text={s.heading} />
        {s.warning && (
          <div className="mt-4 bg-rust/10 border border-rust/30 rounded-sm px-5 py-3 text-xs text-ivory/90 leading-relaxed font-sans">
            ⚠  {s.warning}
          </div>
        )}
        <div className="mt-5 bg-rule/20 rounded-sm p-5 border border-rule/50 shadow-inner">
          {s.brief ? (
            <p className="text-grey text-xs leading-relaxed whitespace-pre-line font-sans">{s.brief}</p>
          ) : (
            <div className="space-y-3">
              {bodyLines.map((line, i) => {
                const trimmed = line.trim()
                const isLabel = /^[A-Z][A-Z\s%]{2,30}$/.test(trimmed) && trimmed.length < 30
                if (isLabel) {
                  return (
                    <h4 key={i} className="text-gold text-xs font-bold tracking-widest mt-4 mb-2 first:mt-0 uppercase">
                      {trimmed}
                    </h4>
                  )
                }
                return (
                  <p key={i} className="text-grey text-xs leading-relaxed font-sans">{trimmed}</p>
                )
              })}
            </div>
          )}
        </div>
        {s.criteria && (
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
            {s.criteria.map((c, i) => (
              <div key={i} className="bg-rule/20 hover:bg-rule/30 border border-rule/40 rounded-sm p-4 flex gap-3 hover:border-gold-dim transition-all duration-300 shadow-sm">
                <div className="font-serif text-gold text-xl shrink-0 leading-none font-bold">{c.pct}</div>
                <div>
                  <div className="text-mist text-xs font-semibold tracking-wide uppercase">{c.label}</div>
                  <div className="text-grey text-[10px] mt-1 leading-normal">{c.desc}</div>
                </div>
              </div>
            ))}
          </div>
        )}
        {s.deliverable && (
          <div className="mt-4 text-xs text-gold border-t border-rule/50 pt-3 italic font-sans font-medium">
            Deliverable: {s.deliverable}
          </div>
        )}
      </div>
    </SlideLayout>
  )
}

function SlideOverview({ s }) {
  // Support legacy sessions structure
  if (s.sessions) {
    return (
      <SlideLayout s={s}>
        <Heading text={s.heading} />
        <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 ${s.heading ? 'mt-5' : ''}`}>
          {s.sessions.map((sess, i) => (
            <div key={i} className="bg-rule/20 hover:bg-rule/30 border border-rule/40 rounded-sm p-5 border-t-2 border-gold-dim hover:border-gold transition-all duration-300 shadow-sm">
              <div className="eyebrow text-[9px] mb-2 font-bold text-gold-dim">{sess.label}</div>
              <div className="text-mist text-base font-serif mb-3 tracking-wide font-medium">{sess.title}</div>
              <ul className="space-y-2">
                {sess.points?.map((p, j) => (
                  <li key={j} className="flex gap-2 text-xs text-grey leading-relaxed">
                    <span className="text-gold shrink-0">◆</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </SlideLayout>
    )
  }

  // Parse body into sessions automatically
  const bodyLines = (s.body || '').split('\n').filter(line => line.trim())
  return (
    <SlideLayout s={s}>
      <Heading text={s.heading} />
      <div className={`${s.heading ? 'mt-5' : ''} space-y-3`}>
        {bodyLines.map((line, i) => {
          const trimmed = line.trim()
          if (trimmed === '◆' || trimmed === '→') return null
          const isSession = /^SESSION\s+\d/i.test(trimmed)
          const isLabel = /^[A-Z][A-Z\s&·]{2,40}$/.test(trimmed) && trimmed.length < 50
          if (isSession || isLabel) {
            return (
              <h3 key={i} className="text-gold text-xs font-bold tracking-widest mt-5 mb-2 first:mt-0 uppercase border-b border-rule/20 pb-1">
                {trimmed}
              </h3>
            )
          }
          if (trimmed.length > 80) {
            return (
              <p key={i} className="text-grey text-sm leading-relaxed border-l-2 border-gold-dim pl-4 italic my-3 bg-rule/10 py-2.5 pr-4 rounded-sm font-sans">
                {trimmed}
              </p>
            )
          }
          return (
            <div key={i} className="flex gap-2 text-xs text-grey leading-relaxed font-sans">
              <span className="text-gold-dim shrink-0">◆</span>
              <span>{trimmed}</span>
            </div>
          )
        })}
      </div>
    </SlideLayout>
  )
}

function SlideEndcard({ s }) {
  const bodyLines = (s.body || '').split('\n').filter(Boolean)
  return (
    <SlideLayout s={s}>
      <div className="text-center py-10 border border-gold-dim/40 rounded-sm bg-rule/10 shadow-lg relative overflow-hidden my-2">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-card/40 pointer-events-none" />
        <div className="relative z-10 px-6">
          <div className="eyebrow mb-3 font-bold text-gold">{s.tag || `Module ${s.module} Complete`}</div>
          <div className="font-serif text-3xl text-mist italic mb-4 font-light tracking-wide">{s.heading || s.title}</div>
          {bodyLines.map((line, i) => (
            <div key={i} className="text-grey text-sm mt-2 font-sans tracking-wide leading-relaxed">{line}</div>
          ))}
          {s.next && (
            <div className="text-gold text-xs mt-6 tracking-widest uppercase font-bold border-t border-rule/40 pt-4 max-w-xs mx-auto">
              Next: {s.next}
            </div>
          )}
        </div>
      </div>
    </SlideLayout>
  )
}

// Generic content slide — handles most slides from PPTX import
function SlideContent({ s }) {
  const bodyLines = (s.body || '').split('\n').filter(line => line.trim())
  return (
    <SlideLayout s={s}>
      <Heading text={s.heading} />
      <div className={`${s.heading ? 'mt-5' : ''} space-y-3`}>
        {bodyLines.map((line, i) => {
          const trimmed = line.trim()
          // Detect section labels (all caps, short)
          const isLabel = /^[A-Z][A-Z\s·&\-\/]{2,40}$/.test(trimmed) && trimmed.length < 50
          // Detect bullet markers
          const isBullet = /^[◆→•\-+–]\s*$/.test(trimmed) || trimmed === '◆' || trimmed === '→'
          // Detect numbered items
          const isNumber = /^\d{1,2}$/.test(trimmed) || /^0\d$/.test(trimmed)
          // Detect years/dates
          const isYear = /^(c\.)?\d{4}/.test(trimmed) && trimmed.length < 30

          if (isBullet) return null

          if (isLabel) {
            return (
              <h3 key={i} className="text-gold text-xs font-bold tracking-widest mt-6 mb-2 first:mt-0 uppercase border-b border-rule/20 pb-1">
                {trimmed}
              </h3>
            )
          }
          if (isNumber || isYear) {
            return (
              <div key={i} className="text-gold-dim text-xs font-mono mt-4 mb-1 border-b border-rule/40 pb-1 w-fit tracking-widest uppercase">
                {trimmed}
              </div>
            )
          }
          // Long descriptive paragraph
          if (trimmed.length > 80) {
            return (
              <p key={i} className="text-grey text-sm leading-relaxed mb-1 font-sans">
                {trimmed}
              </p>
            )
          }
          // Short heading/title-like text
          return (
            <div key={i} className="text-mist text-sm font-semibold tracking-wide mb-1 font-serif">
              {trimmed}
            </div>
          )
        })}
      </div>
    </SlideLayout>
  )
}

function SlideSummary({ s, editorial = false }) {
  const bodyLines = (s.body || '').split('\n').filter(line => line.trim())
  const bodyContent = (
    <div className="space-y-3">
      {bodyLines.map((line, i) => {
        const trimmed = line.trim()
        const isNumber = /^\d{1,2}$/.test(trimmed) || /^0\d$/.test(trimmed)
        if (isNumber) {
          return (
            <div key={i} className="text-gold text-xs font-mono mt-4 tracking-widest">{trimmed}</div>
          )
        }
        if (trimmed.length < 30 && trimmed === trimmed.replace(/[a-z]/g, '').trim() + trimmed.match(/[a-z]+/)?.[0] || trimmed.length < 40) {
          return (
            <div key={i} className="text-mist text-sm font-semibold tracking-wide mt-1">{trimmed}</div>
          )
        }
        return (
          <p key={i} className="text-grey text-sm leading-relaxed font-sans">{trimmed}</p>
        )
      })}
    </div>
  )

  if (editorial) {
    return <SlideLayout s={s}>{bodyContent}</SlideLayout>
  }

  return (
    <SlideLayout s={s}>
      <div className="border-t-2 border-gold-dim pt-5">
        <div className="eyebrow mb-2 font-bold text-gold">Summary</div>
        <Heading text={s.heading} />
        <div className="mt-5">{bodyContent}</div>
      </div>
    </SlideLayout>
  )
}

function SlideResources({ s, editorial = false }) {
  const bodyLines = (s.body || '').split('\n').filter(line => line.trim())
  const bodyContent = (
    <div className="space-y-2">
      {bodyLines.map((line, i) => {
        const trimmed = line.trim()
        const isLabel = /^[A-Z][A-Z\s&·]{2,40}$/.test(trimmed)
        if (trimmed === '◆' || trimmed === '→') return null
        if (isLabel) {
          return (
            <h4 key={i} className="text-gold text-xs font-bold tracking-widest mt-5 mb-2 uppercase">
              {trimmed}
            </h4>
          )
        }
        return (
          <div key={i} className="flex gap-2 text-xs text-grey leading-relaxed font-sans">
            <span className="text-gold-dim shrink-0">◆</span>
            <span className="leading-relaxed">{trimmed}</span>
          </div>
        )
      })}
    </div>
  )

  if (editorial) {
    return <SlideLayout s={s}>{bodyContent}</SlideLayout>
  }

  return (
    <SlideLayout s={s}>
      <div className="border-t-2 border-gold-dim pt-5">
        <div className="eyebrow mb-2 font-bold text-gold">Further Study</div>
        <Heading text={s.heading} />
        <div className="mt-5">{bodyContent}</div>
      </div>
    </SlideLayout>
  )
}

// ── Shared ────────────────────────────────────────────────────

function SlideImage({ s, className = "w-full h-auto object-cover rounded-sm border border-rule/50 shadow-lg group-hover:scale-[1.01] transition-transform duration-500" }) {
  if (!s.image) return null
  return (
    <div className="rounded-sm overflow-hidden border border-rule/60 bg-card p-1 shadow-2xl shadow-gold/5 group transition-all duration-500 hover:border-gold-dim w-full">
      <div className="overflow-hidden rounded-sm relative">
        <img src={s.image} alt={s.heading || s.title || 'Slide image'} className={className} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      </div>
    </div>
  )
}

function Heading({ text }) {
  if (!text) return null
  return (
    <h2 className="font-serif text-mist text-xl sm:text-2xl leading-snug tracking-wide border-b border-rule/30 pb-3 mb-4 font-light">
      {text}
    </h2>
  )
}

function SlideHandsGrid({ s }) {
  const [activeIndex, setActiveIndex] = useState(0)
  
  const getHandSvg = (index) => {
    switch (index) {
      case 0:
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full max-h-56 mx-auto">
            <defs>
              <linearGradient id="dauphine-left" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#d1d5db" />
              </linearGradient>
              <linearGradient id="dauphine-right" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#9ca3af" />
                <stop offset="100%" stopColor="#4b5563" />
              </linearGradient>
            </defs>
            <circle cx="100" cy="150" r="10" fill="#1f2937" stroke="#9ca3af" strokeWidth="2" />
            <polygon points="100,150 93,148 97,42 100,40" fill="url(#dauphine-left)" />
            <polygon points="100,150 107,148 103,42 100,40" fill="url(#dauphine-right)" />
            <polygon points="100,150 82,143 51,97 53,94" fill="url(#dauphine-left)" transform="rotate(-60 100 150)" />
            <polygon points="100,150 89,135 55,90 53,94" fill="url(#dauphine-right)" transform="rotate(-60 100 150)" />
            <circle cx="100" cy="150" r="4" fill="#ffffff" />
          </svg>
        )
      case 1:
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full max-h-56 mx-auto">
            <defs>
              <linearGradient id="steel-sword" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#6b7280" />
              </linearGradient>
            </defs>
            <circle cx="100" cy="150" r="10" fill="#1f2937" stroke="#9ca3af" strokeWidth="2" />
            <g transform="rotate(10 100 150)">
              <polygon points="95,150 97,35 103,35 105,150" fill="url(#steel-sword)" />
              <polygon points="97,140 98.5,45 101.5,45 103,140" fill="#f0fdf4" />
            </g>
            <g transform="rotate(-50 100 150)">
              <polygon points="94,150 96.5,75 103.5,75 106,150" fill="url(#steel-sword)" />
              <polygon points="96,140 98,80 102,80 104,140" fill="#f0fdf4" />
            </g>
            <circle cx="100" cy="150" r="4" fill="#ffffff" />
          </svg>
        )
      case 2:
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full max-h-56 mx-auto">
            <defs>
              <linearGradient id="steel-merc" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#6b7280" />
              </linearGradient>
            </defs>
            <circle cx="100" cy="150" r="10" fill="#1f2937" stroke="#9ca3af" strokeWidth="2" />
            <g transform="rotate(15 100 150)">
              <polygon points="96,150 96,40 104,40 104,150" fill="url(#steel-merc)" />
              <rect x="97" y="45" width="6" height="95" fill="#f0fdf4" rx="1" />
            </g>
            <g transform="rotate(-45 100 150)">
              <polygon points="96,150 96,90 104,90 104,150" fill="url(#steel-merc)" />
              <circle cx="100" cy="90" r="16" fill="url(#steel-merc)" />
              <circle cx="100" cy="90" r="12" fill="#f0fdf4" />
              <line x1="100" y1="90" x2="100" y2="78" stroke="#6b7280" strokeWidth="2" />
              <line x1="100" y1="90" x2="110.4" y2="96" stroke="#6b7280" strokeWidth="2" />
              <line x1="100" y1="90" x2="89.6" y2="96" stroke="#6b7280" strokeWidth="2" />
            </g>
            <circle cx="100" cy="150" r="4" fill="#ffffff" />
          </svg>
        )
      case 3:
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full max-h-56 mx-auto">
            <defs>
              <linearGradient id="gold-lancet" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fef08a" />
                <stop offset="100%" stopColor="#ca8a04" />
              </linearGradient>
            </defs>
            <circle cx="100" cy="150" r="10" fill="#1f2937" stroke="#ca8a04" strokeWidth="2" />
            <path d="M100,150 Q94,100 97,45 Q100,25 100,25 Q100,25 103,45 Q106,100 100,150 Z" fill="url(#gold-lancet)" />
            <path d="M100,150 Q93,120 96,80 Q100,65 100,65 Q100,65 104,80 Q107,120 100,150 Z" fill="url(#gold-lancet)" transform="rotate(-40 100 150)" />
            <circle cx="100" cy="150" r="4" fill="#fef08a" />
          </svg>
        )
      case 4:
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full max-h-56 mx-auto">
            <defs>
              <linearGradient id="steel-snowflake" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#4b5563" />
              </linearGradient>
            </defs>
            <circle cx="100" cy="150" r="10" fill="#1f2937" stroke="#9ca3af" strokeWidth="2" />
            <g transform="rotate(30 100 150)">
              <polygon points="96,150 96,40 104,40 104,150" fill="url(#steel-snowflake)" />
              <rect x="97" y="45" width="6" height="95" fill="#f0fdf4" rx="1" />
            </g>
            <g transform="rotate(-60 100 150)">
              <polygon points="96,150 96,90 104,90 104,150" fill="url(#steel-snowflake)" />
              <rect x="88" y="73" width="24" height="24" fill="url(#steel-snowflake)" transform="rotate(45 100 85)" />
              <rect x="91" y="76" width="18" height="18" fill="#f0fdf4" transform="rotate(45 100 85)" />
            </g>
            <circle cx="100" cy="150" r="4" fill="#ffffff" />
          </svg>
        )
      case 5:
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full max-h-56 mx-auto">
            <defs>
              <linearGradient id="gold-cath" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fef08a" />
                <stop offset="100%" stopColor="#ca8a04" />
              </linearGradient>
            </defs>
            <circle cx="100" cy="150" r="10" fill="#1f2937" stroke="#ca8a04" strokeWidth="2" />
            <g transform="rotate(-30 100 150)">
              <path d="M100,150 Q93,120 95,95 Q90,80 97,72 Q100,60 100,60 Q100,60 103,72 Q110,80 105,95 Q107,120 100,150 Z" fill="url(#gold-cath)" />
              <circle cx="100" cy="85" r="4.5" fill="#f0fdf4" />
              <path d="M97,94 L98.5,89 A4.5,4.5 0 0,1 101.5,89 L103,94 Z" fill="#f0fdf4" />
              <path d="M99,71 L100,62 L101,71 Z" fill="#f0fdf4" />
            </g>
            <g transform="rotate(40 100 150)">
              <path d="M100,150 Q95,110 97,70 Q94,55 98.5,42 Q100,30 100,30 Q100,30 101.5,42 Q106,55 103,70 Q105,110 100,150 Z" fill="url(#gold-cath)" />
              <rect x="98.5" y="48" width="3" height="90" fill="#f0fdf4" rx="1" />
            </g>
            <circle cx="100" cy="150" r="4" fill="#ffffff" />
          </svg>
        )
      default:
        return null
    }
  }

  const getHandSpecs = (index) => {
    switch (index) {
      case 0:
        return { pairing: 'Classic Dress Watches', finish: 'Mirror-polished with faceted ridge', geometry: 'Extremely sharp 3D visual contrast' }
      case 1:
        return { pairing: 'Sports & Tool Watches', finish: 'Brushed steel with lime/white fill', geometry: 'Bold, clean-cut flat sword taper' }
      case 2:
        return { pairing: 'Rolex Sports Models', finish: 'Polished steel frame with Mercedes logo', geometry: 'Structural divisions supporting lume' }
      case 3:
        return { pairing: 'Vintage Dress / Pocketwatches', finish: 'Solid gold or flame-blued leaf style', geometry: 'Elegant tapered double-curved silhouette' }
      case 4:
        return { pairing: 'Tudor Divers / Snowflake', finish: 'Industrial brushed frame with heavy fill', geometry: 'Signature bold angular diamond tip' }
      case 5:
        return { pairing: 'Retro Military / Cathedral', finish: 'Intricate segmented framing with warm lume', geometry: 'Stained-glass arched gothic outline' }
      default:
        return {}
    }
  }

  const activeSpecs = getHandSpecs(activeIndex)

  return (
    <SlideLayout s={s}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Left Side: Cards */}
        <div className="lg:col-span-7 space-y-4">
          <Heading text={s.heading} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
            {s.items?.map((item, i) => (
              <div 
                key={i} 
                className={`bg-rule/10 border p-4 rounded-sm transition-all duration-300 shadow-sm cursor-pointer ${
                  activeIndex === i 
                    ? "border-gold bg-rule/25 scale-[1.01]" 
                    : "border-rule/45 hover:border-gold-dim hover:bg-rule/15"
                }`}
                onMouseEnter={() => setActiveIndex(i)}
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-serif text-mist text-sm font-semibold tracking-wide">{item.title}</h3>
                  <span className="text-[9px] text-gold-dim font-mono uppercase tracking-widest font-bold bg-gold/10 px-2 py-0.5 rounded-sm">{item.badge}</span>
                </div>
                <p className="text-grey text-xs leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Hands Interactive Exploder */}
        <div className="lg:col-span-5 w-full flex flex-col items-center justify-center mt-5 lg:mt-0">
          <div className="w-full bg-card border border-rule/70 p-5 rounded-sm shadow-2xl relative flex flex-col justify-between min-h-[380px] hover:border-gold/50 transition-colors duration-500">
            <div className="text-[10px] text-gold font-mono tracking-widest font-bold uppercase border-b border-rule/30 pb-2 mb-3 flex justify-between">
              <span>Hands Visualizer</span>
              <span className="text-mist">{s.items?.[activeIndex]?.title || ''}</span>
            </div>
            
            <div className="bg-rule/5 rounded-sm p-4 border border-rule/20 flex items-center justify-center flex-1 my-3 relative overflow-hidden group">
              <div className="absolute inset-0 bg-radial-gradient from-gold/5 via-transparent to-transparent opacity-60 pointer-events-none" />
              {getHandSvg(activeIndex)}
            </div>

            <div className="text-xs text-grey border-t border-rule/30 pt-3 mt-2 space-y-1.5 font-sans">
              <div><strong className="text-gold-dim">Best Pairing:</strong> {activeSpecs.pairing}</div>
              <div><strong className="text-gold-dim">Finishing:</strong> {activeSpecs.finish}</div>
              <div><strong className="text-gold-dim">Geometry:</strong> {activeSpecs.geometry}</div>
            </div>
          </div>
        </div>
      </div>
    </SlideLayout>
  )
}

function SlideMechanicsFlow({ s }) {
  const [activeIndex, setActiveIndex] = useState(0)

  const getComponentSvg = (index) => {
    switch (index) {
      case 0:
        return (
          <svg viewBox="0 0 200 200" className="w-48 h-48 mx-auto" style={{ animation: 'hairspring-oscillate 3s ease-in-out infinite' }}>
            <circle cx="100" cy="100" r="80" fill="none" stroke="#ca8a04" strokeWidth="4" strokeDasharray="3 3" />
            <circle cx="100" cy="100" r="72" fill="#1e1e1e" stroke="#ca8a04" strokeWidth="2.5" />
            {Array.from({ length: 24 }).map((_, idx) => {
              const angle = (idx * 360) / 24;
              return (
                <line 
                  key={idx}
                  x1="100" y1="25" x2="100" y2="30"
                  stroke="#ca8a04" strokeWidth="2"
                  transform={`rotate(${angle} 100 100)`}
                />
              );
            })}
            <path 
              d="M 100 100 
                 A 10 10 0 0 1 110 100 
                 A 20 20 0 0 1 90 100 
                 A 30 30 0 0 1 130 100 
                 A 40 40 0 0 1 70 100 
                 A 50 50 0 0 1 150 100 
                 A 60 60 0 0 1 50 100 
                 A 65 65 0 0 1 162 100" 
              fill="none" 
              stroke="#9ca3af" 
              strokeWidth="3" 
              strokeLinecap="round" 
            />
            <circle cx="100" cy="100" r="8" fill="#ca8a04" />
          </svg>
        )
      case 1:
        return (
          <svg viewBox="0 0 200 200" className="w-48 h-48 mx-auto">
            {/* Gear 1: Large Gold (rotates slowly) */}
            <g style={{ transformOrigin: '70px 80px', animation: 'spin-cw 12s linear infinite' }}>
              <circle cx="70" cy="80" r="45" fill="#1e1e1e" stroke="#ca8a04" strokeWidth="2.5" />
              {Array.from({ length: 18 }).map((_, idx) => (
                <line 
                  key={idx}
                  x1="70" y1="32" x2="70" y2="38"
                  stroke="#ca8a04" strokeWidth="2.5"
                  transform={`rotate(${(idx * 360) / 18} 70 80)`}
                />
              ))}
              <line x1="70" y1="35" x2="70" y2="125" stroke="#ca8a04" strokeWidth="1.5" />
              <line x1="25" y1="80" x2="115" y2="80" stroke="#ca8a04" strokeWidth="1.5" />
            </g>

            {/* Gear 2: Medium Silver (rotates faster in opposite direction) */}
            <g style={{ transformOrigin: '130px 120px', animation: 'spin-ccw 8s linear infinite' }}>
              <circle cx="130" cy="120" r="30" fill="#1e1e1e" stroke="#9ca3af" strokeWidth="2" />
              {Array.from({ length: 12 }).map((_, idx) => (
                <line 
                  key={idx}
                  x1="130" y1="88" x2="130" y2="92"
                  stroke="#9ca3af" strokeWidth="2"
                  transform={`rotate(${(idx * 360) / 12} 130 120)`}
                />
              ))}
              <line x1="130" y1="90" x2="130" y2="150" stroke="#9ca3af" strokeWidth="1.5" />
              <line x1="100" y1="120" x2="160" y2="120" stroke="#9ca3af" strokeWidth="1.5" />
            </g>
          </svg>
        )
      case 2:
        return (
          <svg viewBox="0 0 200 200" className="w-48 h-48 mx-auto">
            {/* Escape Wheel */}
            <g style={{ transformOrigin: '100px 70px', animation: 'spin-cw 10s steps(15) infinite' }}>
              <circle cx="100" cy="70" r="35" fill="none" stroke="#ca8a04" strokeWidth="1.5" />
              {Array.from({ length: 15 }).map((_, idx) => {
                const angle = (idx * 360) / 15;
                return (
                  <path 
                    key={idx}
                    d="M100,35 L106,42 L98,40 Z"
                    fill="#ca8a04"
                    transform={`rotate(${angle} 100 70)`}
                  />
                );
              })}
            </g>
            
            {/* Anchor Lever */}
            <g style={{ transformOrigin: '100px 125px', animation: 'tick-action 0.8s ease-in-out infinite' }}>
              <path d="M100,125 L92,85 M100,125 L108,85" stroke="#9ca3af" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="100" y1="125" x2="100" y2="155" stroke="#9ca3af" strokeWidth="3" />
              <rect x="88" y="80" width="5" height="8" rx="0.5" fill="#ef4444" transform="rotate(-15 90 84)" />
              <rect x="107" y="80" width="5" height="8" rx="0.5" fill="#ef4444" transform="rotate(15 110 84)" />
            </g>
            <circle cx="100" cy="125" r="4.5" fill="#4b5563" stroke="#e5e7eb" strokeWidth="1" />
          </svg>
        )
      case 3:
        return (
          <svg viewBox="0 0 200 200" className="w-48 h-48 mx-auto">
            <g style={{ transformOrigin: '100px 100px', animation: 'hairspring-oscillate 1.4s ease-in-out infinite' }}>
              <path 
                d="M 100 100 
                   A 6 6 0 0 1 106 100 
                   A 12 12 0 0 1 94 100 
                   A 18 18 0 0 1 118 100 
                   A 24 24 0 0 1 82 100 
                   A 30 30 0 0 1 130 100 
                   A 36 36 0 0 1 70 100 
                   A 42 42 0 0 1 142 100" 
                fill="none" 
                stroke="#3b82f6" 
                strokeWidth="2" 
                strokeLinecap="round" 
              />
              <circle cx="100" cy="100" r="65" fill="none" stroke="#ca8a04" strokeWidth="4.5" />
              <line x1="100" y1="35" x2="100" y2="165" stroke="#ca8a04" strokeWidth="3" />
              <line x1="35" y1="100" x2="165" y2="100" stroke="#ca8a04" strokeWidth="3" />
              <circle cx="100" cy="32" r="3" fill="#ca8a04" />
              <circle cx="100" cy="168" r="3" fill="#ca8a04" />
              <circle cx="32" cy="100" r="3" fill="#ca8a04" />
              <circle cx="168" cy="100" r="3" fill="#ca8a04" />
            </g>
            <circle cx="100" cy="100" r="7" fill="#9ca3af" stroke="#ffffff" strokeWidth="1" />
          </svg>
        )
      default:
        return null
    }
  }

  return (
    <SlideLayout s={s}>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes spin-cw {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-ccw {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        @keyframes tick-action {
          0%, 100% { transform: rotate(-5deg); }
          50% { transform: rotate(5deg); }
        }
        @keyframes hairspring-oscillate {
          0%, 100% { transform: scale(0.96) rotate(-20deg); }
          50% { transform: scale(1.04) rotate(20deg); }
        }
      `}} />
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Left Interactive Content */}
        <div className="lg:col-span-7 flex flex-col justify-between">
          <Heading text={s.heading} />
          
          {/* Synchronized Flow Buttons */}
          <div className="grid grid-cols-2 md:flex md:items-center md:justify-between gap-3 bg-rule/10 p-4 border border-rule/50 rounded-sm mb-6 mt-4">
            {s.flow?.map((item, i) => (
              <div 
                key={i} 
                className="flex flex-col md:flex-row items-center w-full md:w-auto gap-2"
                onMouseEnter={() => setActiveIndex(i)}
              >
                <div 
                  className={`text-center bg-card border px-3 py-2.5 rounded-sm shadow-sm w-full md:w-36 transition-all duration-300 cursor-pointer ${
                    activeIndex === i 
                      ? "border-gold shadow-md shadow-gold/5 scale-[1.02]" 
                      : "border-rule/80 hover:border-gold-dim"
                  }`}
                >
                  <div className={`text-[10px] font-mono tracking-widest font-bold uppercase ${activeIndex === i ? "text-gold" : "text-gold-dim"}`}>{item.label}</div>
                  <div className="text-[9px] text-grey font-sans uppercase font-medium mt-0.5">{item.sub}</div>
                </div>
                {i < s.flow.length - 1 && (
                  <div className="hidden md:block text-gold-dim text-lg font-bold px-1 select-none">
                    →
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Synchronized Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {s.components?.map((comp, i) => (
              <div 
                key={i} 
                className={`bg-rule/10 border p-4 rounded-sm transition-all duration-300 cursor-pointer ${
                  activeIndex === i 
                    ? "border-gold bg-rule/20 shadow-md scale-[1.01]" 
                    : "border-rule/45 hover:border-gold-dim hover:bg-rule/15"
                }`}
                onMouseEnter={() => setActiveIndex(i)}
              >
                <h4 className="font-serif text-mist text-sm font-semibold tracking-wide mb-1.5">{comp.name}</h4>
                <p className="text-grey text-xs leading-relaxed">{comp.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Visual Simulator Panel */}
        <div className="lg:col-span-5 w-full flex flex-col items-center justify-center mt-5 lg:mt-0">
          <div className="w-full bg-card border border-rule/70 p-5 rounded-sm shadow-2xl relative flex flex-col justify-between min-h-[380px] hover:border-gold/50 transition-colors duration-500">
            <div className="text-[10px] text-gold font-mono tracking-widest font-bold uppercase border-b border-rule/30 pb-2 mb-3 flex justify-between">
              <span>Mechanical Simulator</span>
              <span className="text-mist">{s.components?.[activeIndex]?.name || ''}</span>
            </div>
            
            <div className="bg-rule/5 rounded-sm p-4 border border-rule/20 flex items-center justify-center flex-1 my-3 relative overflow-hidden group">
              <div className="absolute inset-0 bg-radial-gradient from-gold/5 via-transparent to-transparent opacity-60 pointer-events-none" />
              {getComponentSvg(activeIndex)}
            </div>

            <div className="text-xs text-grey border-t border-rule/30 pt-3 mt-2 font-sans italic leading-relaxed text-center">
              Hover over steps or description cards to inspect movement layers.
            </div>
          </div>
        </div>
      </div>
    </SlideLayout>
  )
}

function SlideMovementTable({ s }) {
  return (
    <SlideLayout s={s}>
      <Heading text={s.heading} />
      
      <div className="overflow-x-auto mt-5 border border-rule/65 rounded-sm shadow-md bg-card">
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead>
            <tr className="border-b border-rule bg-rule/20">
              <th className="p-3 text-[10px] text-gold font-mono tracking-widest uppercase font-bold w-1/4">Movement Type</th>
              <th className="p-3 text-[10px] text-gold font-mono tracking-widest uppercase font-bold w-1/3">Advantages</th>
              <th className="p-3 text-[10px] text-gold font-mono tracking-widest uppercase font-bold w-1/4">Limitations</th>
              <th className="p-3 text-[10px] text-gold font-mono tracking-widest uppercase font-bold w-1/4">Key Examples</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-rule/40">
            {s.rows?.map((row, i) => (
              <tr key={i} className="hover:bg-rule/10 transition-colors duration-300">
                <td className="p-3 align-top border-r border-rule/30">
                  <div className="font-serif text-mist text-sm font-semibold tracking-wide mb-1">{row.type}</div>
                  <div className="text-[9px] text-gold-dim font-mono tracking-widest uppercase font-bold">{row.tech || ''}</div>
                </td>
                <td className="p-3 align-top border-r border-rule/30 text-grey text-xs leading-relaxed whitespace-pre-line">
                  {row.advantages}
                </td>
                <td className="p-3 align-top border-r border-rule/30 text-grey text-xs leading-relaxed whitespace-pre-line">
                  {row.limitations}
                </td>
                <td className="p-3 align-top text-gold-dim text-[11px] font-sans font-medium leading-relaxed whitespace-pre-line italic">
                  {row.examples}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SlideLayout>
  )
}

// ── NEW CUSTOM LUXURY HOROLOGICAL PRESENTATION LAYER COMPONENTS ──

function SlidePricingTable({ s }) {
  return (
    <SlideLayout s={s}>
      <Heading text={s.heading} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-5">
        {s.tiers?.map((tier, i) => (
          <div key={i} className="bg-rule/10 hover:bg-rule/20 border border-rule/50 rounded-sm p-5 border-t-2 border-gold-dim hover:border-gold transition-all duration-300 flex flex-col justify-between shadow-lg">
            <div>
              <div className="text-[10px] text-gold font-mono tracking-widest font-bold uppercase mb-1">{tier.name} Tier</div>
              <div className="font-serif text-mist text-xl font-bold tracking-tight mb-3">{tier.price}</div>
              <div className="space-y-2 text-xs text-grey mb-4 border-t border-rule/30 pt-3">
                <div><strong className="text-gold-dim">Margins:</strong> {tier.margins}</div>
                <div><strong className="text-gold-dim">Finishing:</strong> {tier.finishing}</div>
                <div><strong className="text-gold-dim">Crystal:</strong> {tier.crystal}</div>
                <div><strong className="text-gold-dim">Movement:</strong> {tier.movement}</div>
              </div>
            </div>
            <div className="text-[10px] text-gold/80 italic font-medium border-t border-rule/20 pt-2.5 mt-2">
              {tier.target}
            </div>
          </div>
        ))}
      </div>
    </SlideLayout>
  )
}

function SlideMovementSelection({ s }) {
  return (
    <SlideLayout s={s}>
      <Heading text={s.heading} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
        {s.movements?.map((m, i) => (
          <div key={i} className="bg-rule/10 hover:bg-rule/20 border border-rule/45 rounded-sm p-5 border-l-2 border-gold hover:border-gold-dim transition-all duration-300 shadow-md">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-serif text-mist text-base font-semibold tracking-wide">{m.name}</h3>
              <span className="bg-gold/10 text-gold text-[9px] font-mono tracking-widest font-bold uppercase rounded-sm px-2 py-0.5">{m.origin}</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-[10px] text-grey mb-3 bg-card/40 p-2 rounded-sm border border-rule/20">
              <div>BPH: <strong className="text-mist">{m.bph}</strong></div>
              <div>Thickness: <strong className="text-mist">{m.thickness}</strong></div>
              <div>Reserve: <strong className="text-mist">{m.reserve}</strong></div>
              <div>Jewels: <strong className="text-mist">{m.jewels}</strong></div>
            </div>
            <div className="space-y-1.5 text-xs">
              <p className="text-grey"><strong className="text-gold-dim">Pros:</strong> {m.pros}</p>
              <p className="text-grey"><strong className="text-gold-dim">Cons:</strong> {m.cons}</p>
              <p className="text-grey italic border-t border-rule/30 pt-2 mt-2"><strong className="text-gold-dim not-italic">Design Impact:</strong> {m.impact}</p>
            </div>
          </div>
        ))}
      </div>
    </SlideLayout>
  )
}

function SlideMovementsGrid({ s }) {
  return (
    <SlideLayout s={s}>
      <Heading text={s.heading} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
        {s.movements?.map((m, i) => (
          <div key={i} className="bg-rule/10 hover:bg-rule/20 border border-rule/40 rounded-sm p-4 hover:border-gold-dim transition-all duration-300 shadow-md">
            <div className="border-b border-rule/30 pb-2 mb-3">
              <h4 className="font-serif text-mist text-sm font-semibold tracking-wide">{m.caliber}</h4>
              <span className="text-[9px] text-gold-dim font-mono tracking-widest font-bold uppercase">{m.origin}</span>
            </div>
            <div className="space-y-1 text-[11px] text-grey">
              <div>Dimensions: <strong className="text-mist font-mono font-medium">{m.dims}</strong></div>
              <div>BPH: <strong className="text-mist font-mono font-medium">{m.bph}</strong></div>
              <div>Reserve: <strong className="text-mist font-mono font-medium">{m.reserve}</strong></div>
              <div>Jewels: <strong className="text-mist font-mono font-medium">{m.jewels}</strong></div>
              {m.position && <div>Crown Pos: <strong className="text-mist">{m.position}</strong></div>}
              {m.features && <div className="border-t border-rule/20 pt-1.5 mt-1.5 text-[10px] italic">{m.features}</div>}
            </div>
          </div>
        ))}
      </div>
    </SlideLayout>
  )
}

function SlideDimensionalStack({ s }) {
  return (
    <SlideLayout s={s}>
      <Heading text={s.heading} />
      
      {/* Visual representation of stack */}
      <div className="mt-5 space-y-2 bg-rule/10 p-5 border border-rule/50 rounded-sm shadow-md">
        {s.stack?.map((layer, i) => (
          <div key={i} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 bg-card hover:bg-rule/10 border border-rule/80 rounded-sm hover:border-gold-dim transition-all duration-300">
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full bg-gold/10 text-gold text-[10px] font-mono flex items-center justify-center font-bold">{i + 1}</div>
              <span className="text-mist text-sm font-semibold tracking-wide font-serif">{layer.component}</span>
            </div>
            <div className="flex sm:items-center gap-4 mt-2 sm:mt-0 pl-8 sm:pl-0">
              <span className="text-gold font-mono text-xs font-bold bg-gold/5 px-2 py-0.5 rounded-sm">{layer.value}</span>
              <span className="text-grey text-[11px] max-w-xs">{layer.desc}</span>
            </div>
          </div>
        ))}
        
        {/* Sum Formula Panel */}
        {s.formula && (
          <div className="border-t-2 border-dashed border-gold-dim/40 pt-4 mt-4 text-center">
            <div className="text-[10px] text-gold font-mono tracking-widest font-bold uppercase mb-1">Resulting Case Stack Height</div>
            <div className="text-mist text-xs sm:text-sm font-sans font-medium px-4 py-2.5 bg-card border border-rule rounded-sm shadow-inner italic">
              {s.formula}
            </div>
          </div>
        )}
      </div>
    </SlideLayout>
  )
}

function SlideCrownPositions({ s }) {
  return (
    <SlideLayout s={s}>
      <Heading text={s.heading} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
        {s.positions?.map((pos, i) => (
          <div key={i} className="bg-rule/10 hover:bg-rule/20 border border-rule/45 rounded-sm p-4 hover:border-gold transition-all duration-300 shadow-md">
            <div className="flex justify-between items-center mb-2 border-b border-rule/30 pb-1.5">
              <span className="font-serif text-mist text-sm font-semibold tracking-wide">{pos.hours} Position</span>
              <span className="bg-gold/10 text-gold text-[9px] font-mono tracking-widest font-bold uppercase rounded-sm px-2 py-0.5">{pos.angle}</span>
            </div>
            <div className="space-y-1.5 text-xs text-grey">
              <div><strong className="text-gold-dim">Height Alignment:</strong> {pos.caseback}</div>
              <div><strong className="text-gold-dim">Technical Spec:</strong> {pos.name}</div>
              <p className="border-t border-rule/20 pt-2 mt-2 text-[11px] leading-relaxed italic">{pos.note}</p>
            </div>
          </div>
        ))}
      </div>
    </SlideLayout>
  )
}

function SlideCaseShapes({ s }) {
  return (
    <SlideLayout s={s}>
      <Heading text={s.heading} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
        {s.shapes?.map((shape, i) => (
          <div key={i} className="bg-rule/10 hover:bg-rule/20 border border-rule/40 rounded-sm p-4 hover:border-gold-dim transition-all duration-300 shadow-md flex flex-col justify-between">
            <div className="border-b border-rule/30 pb-2 mb-2">
              <h3 className="font-serif text-mist text-sm font-semibold tracking-wide">{shape.name}</h3>
              <span className="text-[9px] text-gold-dim font-mono tracking-widest font-bold uppercase">{shape.feature}</span>
            </div>
            <p className="text-grey text-xs leading-relaxed">{shape.desc}</p>
          </div>
        ))}
      </div>
    </SlideLayout>
  )
}

function SlideDialZones({ s }) {
  return (
    <SlideLayout s={s}>
      <Heading text={s.heading} />
      <div className="mt-5 space-y-4">
        {s.zones?.map((zone, i) => (
          <div key={i} className="flex gap-4 p-4 bg-rule/10 hover:bg-rule/20 border border-rule/35 rounded-sm hover:border-gold transition-all duration-300 shadow-md">
            <div className="shrink-0 text-gold text-xs font-mono w-28 pt-0.5 tracking-widest font-bold uppercase">{zone.zone}</div>
            <div className="min-w-0 flex-1">
              <div className="text-mist text-sm font-semibold mb-1 tracking-wide font-serif">{zone.purpose}</div>
              <div className="text-grey text-xs leading-relaxed italic border-t border-rule/20 pt-1 mt-1">{zone.rule}</div>
            </div>
          </div>
        ))}
      </div>
    </SlideLayout>
  )
}

function SlideIllustratorTools({ s }) {
  return (
    <SlideLayout s={s}>
      <Heading text={s.heading} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
        {s.tools?.map((tool, i) => (
          <div key={i} className="bg-rule/10 hover:bg-rule/20 border border-rule/45 rounded-sm p-4 hover:border-gold transition-all duration-300 shadow-md">
            <div className="flex justify-between items-center border-b border-rule/30 pb-1.5 mb-2">
              <h4 className="font-serif text-mist text-sm font-semibold tracking-wide">{tool.name}</h4>
              <kbd className="bg-gold/10 text-gold text-[10px] font-mono font-bold px-2 py-0.5 rounded-sm shadow-sm">{tool.key}</kbd>
            </div>
            <div className="space-y-1 text-xs text-grey">
              <div><strong className="text-gold-dim">Horology Purpose:</strong> {tool.purpose}</div>
              <p className="border-t border-rule/20 pt-2 mt-2 text-[11px] leading-relaxed italic text-ivory/80">Tip: {tool.tip}</p>
            </div>
          </div>
        ))}
      </div>
    </SlideLayout>
  )
}

function SlideCadTimeline({ s }) {
  return (
    <SlideLayout s={s}>
      <Heading text={s.heading} />
      <div className="mt-5 space-y-3">
        {s.timeline?.map((step, i) => (
          <div key={i} className="flex gap-4 items-start">
            <div className="w-14 text-center shrink-0">
              <div className="text-gold font-mono text-[10px] font-bold tracking-widest uppercase bg-gold/5 border border-gold-dim/20 rounded-sm py-1 shadow-sm">{step.hours}</div>
            </div>
            <div className="flex-1 bg-rule/10 hover:bg-rule/20 border border-rule/35 rounded-sm p-4 transition-all duration-300 hover:border-gold shadow-md">
              <div className="flex justify-between items-center mb-1 border-b border-rule/20 pb-1">
                <span className="text-mist text-sm font-semibold tracking-wide font-serif">{step.phase}: {step.task}</span>
              </div>
              <div className="text-grey text-xs leading-relaxed">{step.details}</div>
            </div>
          </div>
        ))}
      </div>
    </SlideLayout>
  )
}

function SlideCadErrors({ s }) {
  return (
    <SlideLayout s={s}>
      <Heading text={s.heading} />
      <div className="grid grid-cols-1 gap-4 mt-5">
        {s.errors?.map((err, i) => (
          <div key={i} className="bg-rule/10 hover:bg-rule/20 border border-rule/40 rounded-sm p-4 border-l-2 border-rust hover:border-gold transition-all duration-300 shadow-md">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] text-rust font-mono tracking-widest font-bold bg-rust/10 px-2 py-0.5 rounded-sm uppercase">Bug {err.num}</span>
              <h4 className="font-serif text-mist text-sm font-semibold tracking-wide">{err.title}</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-grey border-t border-rule/20 pt-2.5">
              <div><strong className="text-gold-dim">Symptom:</strong> {err.symptom}</div>
              <div className="border-t md:border-t-0 md:border-l border-rule/20 pt-2.5 md:pt-0 md:pl-3"><strong className="text-rust">Resolution:</strong> {err.fix}</div>
            </div>
          </div>
        ))}
      </div>
    </SlideLayout>
  )
}

function SlideCaseMaterials({ s }) {
  return (
    <SlideLayout s={s}>
      <Heading text={s.heading} />
      <div className="grid grid-cols-1 gap-4 mt-5">
        {s.materials?.map((mat, i) => (
          <div key={i} className="bg-rule/10 hover:bg-rule/20 border border-rule/45 rounded-sm p-4 hover:border-gold transition-all duration-300 shadow-md">
            <div className="flex justify-between items-center border-b border-rule/30 pb-2 mb-3">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-gold/10 text-gold text-[10px] font-mono flex items-center justify-center font-bold">{mat.cost}</span>
                <h3 className="font-serif text-mist text-base font-semibold tracking-wide">{mat.name}</h3>
              </div>
              <span className="text-[10px] text-gold-dim font-mono tracking-widest font-bold uppercase">{mat.finishes}</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div><strong className="text-gold font-medium">Advantages:</strong> <span className="text-grey leading-relaxed">{mat.pros}</span></div>
              <div className="border-t md:border-t-0 md:border-l border-rule/25 pt-3 md:pt-0 md:pl-4"><strong className="text-rust">Limitations:</strong> <span className="text-grey leading-relaxed">{mat.cons}</span></div>
            </div>
          </div>
        ))}
      </div>
    </SlideLayout>
  )
}

function SlideLumeHarmony({ s }) {
  return (
    <SlideLayout s={s}>
      <Heading text={s.heading} />
      
      {/* Lumes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
        {s.lumes?.map((l, i) => (
          <div key={i} className="bg-rule/10 hover:bg-rule/20 border border-rule/40 rounded-sm p-4 hover:border-gold transition-all duration-300 shadow-md">
            <div className="flex justify-between items-center mb-2 border-b border-rule/30 pb-1.5">
              <span className="font-serif text-mist text-sm font-semibold tracking-wide">{l.grade}</span>
              <span className="bg-gold/10 text-gold text-[9px] font-mono tracking-widest font-bold uppercase rounded-sm px-2 py-0.5">{l.color}</span>
            </div>
            <div className="space-y-1 text-xs text-grey">
              <div>Daylight Tone: <strong className="text-mist">{l.daylight}</strong></div>
              <div>Performance: <strong className="text-mist">{l.performance}</strong></div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Design Rules Callout */}
      {s.rules && (
        <div className="bg-card border border-rule/70 p-5 rounded-sm mt-5 shadow-inner">
          <div className="text-[10px] text-gold font-mono tracking-widest font-bold uppercase border-b border-rule/30 pb-2 mb-3">Watch Design Color Rules</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {s.rules.map((rule, i) => (
              <div key={i} className="space-y-1 text-xs">
                <div className="text-mist font-semibold font-serif">{rule.title}</div>
                <p className="text-grey leading-relaxed">{rule.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </SlideLayout>
  )
}

function SlideLightPhysics({ s }) {
  return (
    <SlideLayout s={s}>
      <Heading text={s.heading} />
      <div className="grid grid-cols-1 gap-5 mt-5">
        {s.physics?.map((phy, i) => (
          <div key={i} className="bg-rule/10 hover:bg-rule/20 border border-rule/45 rounded-sm p-5 hover:border-gold transition-all duration-300 shadow-md">
            <div className="flex justify-between items-center border-b border-rule/30 pb-2 mb-3">
              <h3 className="font-serif text-mist text-base font-semibold tracking-wide">{phy.type}</h3>
              <span className="text-[10px] text-gold-dim font-mono tracking-widest font-bold uppercase">Physics Layer</span>
            </div>
            <div className="space-y-2 text-xs">
              <p className="text-grey"><strong className="text-gold-dim">Typical Materials:</strong> {phy.materials}</p>
              <p className="text-grey"><strong className="text-gold-dim">Ray Behavior:</strong> {phy.behavior}</p>
              <p className="text-grey italic border-t border-rule/30 pt-2.5 mt-2.5"><strong className="text-gold-dim not-italic">KeyShot Setup:</strong> {phy.keyshot}</p>
            </div>
          </div>
        ))}
      </div>
    </SlideLayout>
  )
}

function SlideTrendCompass({ s }) {
  return (
    <SlideLayout s={s}>
      <Heading text={s.heading} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
        {s.trends?.map((t, i) => (
          <div key={i} className="bg-rule/10 hover:bg-rule/20 border border-rule/40 rounded-sm p-4 hover:border-gold-dim transition-all duration-300 shadow-md flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-2 border-b border-rule/30 pb-1.5">
                <span className="bg-gold/10 text-gold text-[9px] font-mono tracking-widest font-bold uppercase rounded-sm px-2 py-0.5">{t.vector}</span>
                <span className="text-[9px] text-grey font-mono uppercase">Impact: {t.impact}</span>
              </div>
              <h3 className="font-serif text-mist text-sm font-semibold tracking-wide mb-2">{t.name}</h3>
              <p className="text-grey text-xs leading-relaxed">{t.description}</p>
            </div>
          </div>
        ))}
      </div>
    </SlideLayout>
  )
}

function SlidePricingCalc({ s }) {
  return (
    <SlideLayout s={s}>
      <Heading text={s.heading} />
      <div className="overflow-x-auto mt-5 border border-rule/65 rounded-sm shadow-md bg-card">
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead>
            <tr className="border-b border-rule bg-rule/20">
              <th className="p-3 text-[10px] text-gold font-mono tracking-widest uppercase font-bold w-1/3">Component</th>
              <th className="p-3 text-[10px] text-gold font-mono tracking-widest uppercase font-bold w-1/8 text-center">Low (CN)</th>
              <th className="p-3 text-[10px] text-gold font-mono tracking-widest uppercase font-bold w-1/8 text-center">Mid Tier</th>
              <th className="p-3 text-[10px] text-gold font-mono tracking-widest uppercase font-bold w-1/8 text-center">High (Swiss)</th>
              <th className="p-3 text-[10px] text-gold font-mono tracking-widest uppercase font-bold w-1/3">Technical Sourcing Notes</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-rule/40 text-xs">
            {s.rows?.map((row, i) => (
              <tr key={i} className="hover:bg-rule/10 transition-colors duration-300">
                <td className="p-3 align-middle font-serif text-mist font-semibold border-r border-rule/30">
                  {row.component}
                </td>
                <td className="p-3 align-middle text-center font-mono text-grey border-r border-rule/30">
                  £{row.low}
                </td>
                <td className="p-3 align-middle text-center font-mono text-gold-dim border-r border-rule/30">
                  £{row.mid}
                </td>
                <td className="p-3 align-middle text-center font-mono text-mist border-r border-rule/30">
                  £{row.high}
                </td>
                <td className="p-3 align-middle text-grey text-xs leading-relaxed italic">
                  {row.note}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SlideLayout>
  )
}

function SlideStartupRoadmap({ s }) {
  return (
    <SlideLayout s={s}>
      <Heading text={s.heading} />
      <div className="mt-5 space-y-4">
        {s.milestones?.map((milestone, i) => (
          <div key={i} className="flex gap-4 items-start p-4 bg-rule/10 hover:bg-rule/20 border border-rule/35 rounded-sm hover:border-gold transition-all duration-300 shadow-md">
            <div className="w-14 text-center shrink-0">
              <span className="bg-gold/10 text-gold text-[10px] font-mono tracking-widest font-bold uppercase rounded-sm px-2 py-1 shadow-sm block">{milestone.months}</span>
            </div>
            <div className="flex-1 min-w-0 space-y-2">
              <div className="text-mist text-sm font-semibold tracking-wide font-serif border-b border-rule/20 pb-1">{milestone.title}</div>
              <p className="text-grey text-xs leading-relaxed">{milestone.task}</p>
              <div className="bg-rust/5 border border-rust/20 rounded-sm px-3 py-1.5 text-[11px] text-ivory/80 italic">
                ⚠ {milestone.warning}
              </div>
            </div>
          </div>
        ))}
      </div>
    </SlideLayout>
  )
}
