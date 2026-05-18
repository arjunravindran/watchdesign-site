// SlideViewer renders a single slide object as a styled React component.
// Each slide.type maps to a different layout.

export default function SlideViewer({ slide, index, total }) {
  return (
    <div className="slide-card overflow-hidden mb-4">
      {/* Slide number indicator */}
      <div className="flex items-center gap-2 px-5 pt-4 pb-0">
        <span className="text-[10px] text-gold-dim font-sans">
          {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </span>
        {slide.tag && (
          <>
            <span className="text-rule text-xs">·</span>
            <span className="eyebrow text-[9px]">{slide.tag}</span>
          </>
        )}
      </div>

      <div className="p-5 pt-3">
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

// ── Slide type components ─────────────────────────────────────

function SlideHero({ s }) {
  // Support both legacy (module/title/subtitle) and new (tag/heading/body) format
  const bodyLines = (s.body || '').split('\n').filter(Boolean)
  return (
    <div className="py-6 border-l-2 border-gold pl-5">
      <div className="eyebrow mb-3">{s.module || s.tag}</div>
      <h1 className="font-serif text-2xl sm:text-3xl text-mist leading-tight">
        {s.title || s.heading} {s.subtitle && <span className="text-gold italic">{s.subtitle}</span>}
      </h1>
      <SlideImage s={s} className="mt-5 mb-5" />
      {s.tagline && (
        <p className="text-grey text-sm mt-3 italic">{s.tagline}</p>
      )}
      {!s.tagline && bodyLines.length > 0 && (
        <div className="mt-3 space-y-1">
          {bodyLines.map((line, i) => (
            <p key={i} className={i === 0 ? "text-grey text-sm italic" : "text-[11px] text-grey tracking-wide"}>
              {line}
            </p>
          ))}
        </div>
      )}
      {s.meta && (
        <p className="text-[10px] text-grey mt-4 tracking-wide">{s.meta}</p>
      )}
    </div>
  )
}

function SlideGrid({ s }) {
  const cols = s.columns === 3
    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
    : s.columns === 2
      ? 'grid-cols-1 sm:grid-cols-2'
      : 'grid-cols-1'

  return (
    <div>
      <Heading text={s.heading} />
      <SlideImage s={s} />
      <div className={`grid ${cols} gap-3 mt-4`}>
        {s.items?.map((item, i) => (
          <div key={i} className="bg-rule/40 rounded-sm p-4 border-l-2 border-gold-dim">
            {item.badge && (
              <div className="eyebrow text-[9px] mb-1 text-gold-dim">{item.badge}</div>
            )}
            <h3 className="font-serif text-mist text-sm mb-2">{item.title}</h3>
            <p className="text-grey text-xs leading-relaxed whitespace-pre-line">{item.body}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function SlideList({ s }) {
  return (
    <div>
      <Heading text={s.heading} />
      <SlideImage s={s} />
      <div className="mt-4 space-y-2">
        {s.rows?.map((row, i) => (
          <div key={i} className="flex gap-4 p-3 bg-rule/40 rounded-sm border-l border-gold-dim">
            <div className="shrink-0 text-gold text-xs font-sans w-16 pt-0.5">{row.year}</div>
            <div className="min-w-0">
              <div className="text-mist text-sm font-medium mb-0.5">{row.title}</div>
              <div className="text-grey text-xs leading-relaxed">{row.detail}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function SlideCallout({ s }) {
  return (
    <div>
      <Heading text={s.heading} />
      <SlideImage s={s} />
      {s.stats && (
        <div className={`grid grid-cols-1 sm:grid-cols-${Math.min(s.stats.length, 3)} gap-3 mt-4`}>
          {s.stats.map((stat, i) => (
            <div key={i} className="bg-rule/40 rounded-sm p-4 text-center border-t-2 border-gold-dim">
              <div className="font-serif text-gold text-2xl mb-1">{stat.number}</div>
              <div className="text-mist text-xs font-medium mb-1">{stat.label}</div>
              <div className="text-grey text-[10px] italic">{stat.sub}</div>
            </div>
          ))}
        </div>
      )}
      {s.body && (
        <p className="text-grey text-sm leading-relaxed mt-4 border-l-2 border-rule pl-4">{s.body}</p>
      )}
    </div>
  )
}

function SlideCompare({ s }) {
  return (
    <div>
      <Heading text={s.heading} />
      <SlideImage s={s} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
        {[s.left, s.right].map((side, i) => side && (
          <div key={i} className="bg-rule/40 rounded-sm p-4 border-t-2 border-gold">
            <div className="eyebrow mb-1">{side.label}</div>
            <div className="text-grey text-xs mb-3 italic">{side.subtitle}</div>
            <ul className="space-y-1 mb-3">
              {side.points?.map((pt, j) => (
                <li key={j} className="flex gap-2 text-xs text-grey">
                  <span className="text-gold-dim shrink-0">◆</span>
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
            {side.lesson && (
              <p className="text-[11px] text-ivory italic border-t border-rule pt-2 mt-2">{side.lesson}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

function SlideSequence({ s }) {
  return (
    <div>
      <Heading text={s.heading} />
      <SlideImage s={s} />
      <div className="mt-4 space-y-2">
        {s.steps?.map((step, i) => (
          <div key={i} className="flex gap-3">
            <div className="w-7 h-7 rounded-sm bg-gold text-bg text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
              {String(i + 1).padStart(2, '0')}
            </div>
            <div className="flex-1 bg-rule/40 rounded-sm p-3">
              <div className="text-mist text-sm font-medium mb-0.5">{step.title}</div>
              <div className="text-grey text-xs leading-relaxed">{step.body}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function SlideAssignment({ s }) {
  const bodyLines = (s.body || s.brief || '').split('\n').filter(line => line.trim())
  return (
    <div className="border-t-2 border-gold pt-4">
      <div className="eyebrow mb-2">Assignment</div>
      <Heading text={s.heading} />
      <SlideImage s={s} />
      {s.warning && (
        <div className="mt-3 bg-rust/20 border border-rust/40 rounded-sm px-4 py-2 text-xs text-ivory">
          ⚠  {s.warning}
        </div>
      )}
      <div className="mt-4 bg-rule/40 rounded-sm p-4">
        {s.brief ? (
          <p className="text-grey text-xs leading-relaxed whitespace-pre-line">{s.brief}</p>
        ) : (
          <div className="space-y-2">
            {bodyLines.map((line, i) => {
              const trimmed = line.trim()
              const isLabel = /^[A-Z][A-Z\s%]{2,30}$/.test(trimmed) && trimmed.length < 30
              if (isLabel) {
                return (
                  <h4 key={i} className="text-gold text-xs font-medium tracking-wider mt-3 mb-1">
                    {trimmed}
                  </h4>
                )
              }
              return (
                <p key={i} className="text-grey text-xs leading-relaxed">{trimmed}</p>
              )
            })}
          </div>
        )}
      </div>
      {s.criteria && (
        <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-2">
          {s.criteria.map((c, i) => (
            <div key={i} className="bg-rule/40 rounded-sm p-3 flex gap-2">
              <div className="font-serif text-gold text-lg shrink-0 leading-none">{c.pct}</div>
              <div>
                <div className="text-mist text-xs font-medium">{c.label}</div>
                <div className="text-grey text-[10px] mt-0.5">{c.desc}</div>
              </div>
            </div>
          ))}
        </div>
      )}
      {s.deliverable && (
        <div className="mt-3 text-xs text-gold-dim border-t border-rule pt-2">
          Deliverable: {s.deliverable}
        </div>
      )}
    </div>
  )
}

function SlideOverview({ s }) {
  // Support legacy sessions structure
  if (s.sessions) {
    return (
      <div>
        <Heading text={s.heading} />
      <SlideImage s={s} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
          {s.sessions.map((sess, i) => (
            <div key={i} className="bg-rule/40 rounded-sm p-4 border-t-2 border-gold-dim">
              <div className="eyebrow text-[9px] mb-1">{sess.label}</div>
              <div className="text-mist text-sm font-serif mb-2">{sess.title}</div>
              <ul className="space-y-1">
                {sess.points?.map((p, j) => (
                  <li key={j} className="flex gap-2 text-xs text-grey">
                    <span className="text-gold shrink-0">◆</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Parse body into sessions automatically
  const bodyLines = (s.body || '').split('\n').filter(line => line.trim())
  return (
    <div>
      <Heading text={s.heading} />
      <SlideImage s={s} />
      <div className="mt-4 space-y-2">
        {bodyLines.map((line, i) => {
          const trimmed = line.trim()
          if (trimmed === '◆' || trimmed === '→') return null
          const isSession = /^SESSION\s+\d/i.test(trimmed)
          const isLabel = /^[A-Z][A-Z\s&·]{2,40}$/.test(trimmed) && trimmed.length < 50
          if (isSession || isLabel) {
            return (
              <h3 key={i} className="text-gold text-xs font-medium tracking-wider mt-4 mb-1 first:mt-0">
                {trimmed}
              </h3>
            )
          }
          if (trimmed.length > 80) {
            return (
              <p key={i} className="text-grey text-sm leading-relaxed border-l border-rule pl-3 italic">
                {trimmed}
              </p>
            )
          }
          return (
            <div key={i} className="flex gap-2 text-xs text-grey">
              <span className="text-gold-dim shrink-0">◆</span>
              <span>{trimmed}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function SlideEndcard({ s }) {
  const bodyLines = (s.body || '').split('\n').filter(Boolean)
  return (
    <div className="text-center py-8 border border-gold-dim rounded-sm">
      <div className="eyebrow mb-2">{s.tag || `Module ${s.module} Complete`}</div>
      <div className="font-serif text-2xl text-mist italic">{s.heading || s.title}</div>
      <SlideImage s={s} className="mt-5 mb-5" />
      {bodyLines.map((line, i) => (
        <div key={i} className="text-grey text-xs mt-2">{line}</div>
      ))}
      {s.next && (
        <div className="text-grey text-xs mt-4">Next: {s.next}</div>
      )}
    </div>
  )
}

// Generic content slide — handles most slides from PPTX import
function SlideContent({ s }) {
  const bodyLines = (s.body || '').split('\n').filter(line => line.trim())
  return (
    <div>
      <Heading text={s.heading} />
      <SlideImage s={s} />

      <div className="mt-4 space-y-2">
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

          if (isBullet) return null // skip standalone bullet markers

          if (isLabel) {
            return (
              <h3 key={i} className="text-gold text-xs font-medium tracking-wider mt-4 mb-1 first:mt-0">
                {trimmed}
              </h3>
            )
          }
          if (isNumber || isYear) {
            return (
              <div key={i} className="text-gold-dim text-xs font-mono mt-3 mb-1">
                {trimmed}
              </div>
            )
          }
          // Long descriptive paragraph
          if (trimmed.length > 80) {
            return (
              <p key={i} className="text-grey text-sm leading-relaxed">
                {trimmed}
              </p>
            )
          }
          // Short heading/title-like text
          return (
            <div key={i} className="text-mist text-sm font-medium">
              {trimmed}
            </div>
          )
        })}
      </div>
    </div>
  )
}

function SlideSummary({ s }) {
  const bodyLines = (s.body || '').split('\n').filter(line => line.trim())
  return (
    <div className="border-t-2 border-gold-dim pt-4">
      <div className="eyebrow mb-2">Summary</div>
      <Heading text={s.heading} />
      <SlideImage s={s} />
      <div className="mt-4 space-y-2">
        {bodyLines.map((line, i) => {
          const trimmed = line.trim()
          const isNumber = /^\d{1,2}$/.test(trimmed) || /^0\d$/.test(trimmed)
          if (isNumber) {
            return (
              <div key={i} className="text-gold text-xs font-mono mt-3">{trimmed}</div>
            )
          }
          if (trimmed.length < 30 && trimmed === trimmed.replace(/[a-z]/g, '').trim() + trimmed.match(/[a-z]+/)?.[0] || trimmed.length < 40) {
            return (
              <div key={i} className="text-mist text-sm font-medium mt-1">{trimmed}</div>
            )
          }
          return (
            <p key={i} className="text-grey text-sm leading-relaxed">{trimmed}</p>
          )
        })}
      </div>
    </div>
  )
}

function SlideResources({ s }) {
  const bodyLines = (s.body || '').split('\n').filter(line => line.trim())
  return (
    <div className="border-t-2 border-gold-dim pt-4">
      <div className="eyebrow mb-2">Further Study</div>
      <Heading text={s.heading} />
      <SlideImage s={s} />
      <div className="mt-4 space-y-1.5">
        {bodyLines.map((line, i) => {
          const trimmed = line.trim()
          const isLabel = /^[A-Z][A-Z\s&·]{2,40}$/.test(trimmed)
          if (trimmed === '◆' || trimmed === '→') return null
          if (isLabel) {
            return (
              <h4 key={i} className="text-gold text-xs font-medium tracking-wider mt-4 mb-1">
                {trimmed}
              </h4>
            )
          }
          return (
            <div key={i} className="flex gap-2 text-xs text-grey">
              <span className="text-gold-dim shrink-0">◆</span>
              <span className="leading-relaxed">{trimmed}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ── Shared ────────────────────────────────────────────────────


function SlideImage({ s, className = "mt-4 mb-4" }) {
  if (!s.image) return null
  return (
    <div className={`${className} rounded-sm overflow-hidden border border-rule`}>
      <img src={s.image} alt={s.heading || s.title || 'Slide image'} className="w-full h-auto max-h-64 object-cover" />
    </div>
  )
}

function Heading({ text }) {
  if (!text) return null
  return (
    <h2 className="font-serif text-mist text-lg sm:text-xl leading-snug">
      {text}
    </h2>
  )
}
