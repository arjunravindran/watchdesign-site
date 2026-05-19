// SlideViewer renders a single slide object as a styled React component.
// Each slide.type maps to a different layout.

export default function SlideViewer({ slide, index, total }) {
  return (
    <div className="slide-card overflow-hidden mb-6 bg-card border border-rule/80 rounded-sm shadow-xl shadow-black/40 hover:border-rule transition-all duration-300">
      {/* Slide number indicator */}
      <div className="flex items-center gap-2 px-6 pt-5 pb-0">
        <span className="text-[10px] text-gold-dim font-mono tracking-widest font-medium">
          {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </span>
        {slide.tag && (
          <>
            <span className="text-rule text-xs">·</span>
            <span className="eyebrow text-[9px] tracking-widest2 font-semibold text-gold">{slide.tag}</span>
          </>
        )}
      </div>

      <div className="p-6 pt-4">
        {slide.type === 'hero'      && <SlideHero s={slide} />}
        {slide.type === 'grid'      && <SlideGrid s={slide} />}
        {slide.type === 'list'      && <SlideList s={slide} />}
        {slide.type === 'callout'   && <SlideCallout s={slide} />}
        {slide.type === 'compare'   && <SlideCompare s={slide} />}
        {slide.type === 'sequence'  && <SlideSequence s={slide} />}
        {slide.type === 'assignment'&& <SlideAssignment s={slide} />}
        {slide.type === 'overview'  && <SlideOverview s={slide} />}
        {slide.type === 'endcard'   && <SlideEndcard s={slide} />}
        {slide.type === 'content'   && <SlideContent s={slide} />}
        {slide.type === 'summary'   && <SlideSummary s={slide} />}
        {slide.type === 'resources' && <SlideResources s={slide} />}
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
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
      <div className="mt-5 space-y-3">
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
      <div className="mt-5 space-y-3">
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

function SlideSummary({ s }) {
  const bodyLines = (s.body || '').split('\n').filter(line => line.trim())
  return (
    <SlideLayout s={s}>
      <div className="border-t-2 border-gold-dim pt-5">
        <div className="eyebrow mb-2 font-bold text-gold">Summary</div>
        <Heading text={s.heading} />
        <div className="mt-5 space-y-3">
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
      </div>
    </SlideLayout>
  )
}

function SlideResources({ s }) {
  const bodyLines = (s.body || '').split('\n').filter(line => line.trim())
  return (
    <SlideLayout s={s}>
      <div className="border-t-2 border-gold-dim pt-5">
        <div className="eyebrow mb-2 font-bold text-gold">Further Study</div>
        <Heading text={s.heading} />
        <div className="mt-5 space-y-2">
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
