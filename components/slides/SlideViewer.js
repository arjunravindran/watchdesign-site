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
      </div>
    </div>
  )
}

// ── Slide type components ─────────────────────────────────────

function SlideHero({ s }) {
  return (
    <div className="py-6 border-l-2 border-gold pl-5">
      <div className="eyebrow mb-3">{s.module}</div>
      <h1 className="font-serif text-2xl sm:text-3xl text-mist leading-tight">
        {s.title} <span className="text-gold italic">{s.subtitle}</span>
      </h1>
      {s.tagline && (
        <p className="text-grey text-sm mt-3 italic">{s.tagline}</p>
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
  return (
    <div className="border-t-2 border-gold pt-4">
      <div className="eyebrow mb-2">Assignment</div>
      <Heading text={s.heading} />
      {s.warning && (
        <div className="mt-3 bg-rust/20 border border-rust/40 rounded-sm px-4 py-2 text-xs text-ivory">
          ⚠  {s.warning}
        </div>
      )}
      <div className="mt-4 bg-rule/40 rounded-sm p-4">
        <p className="text-grey text-xs leading-relaxed whitespace-pre-line">{s.brief}</p>
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
  return (
    <div>
      <Heading text={s.heading} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
        {s.sessions?.map((sess, i) => (
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

function SlideEndcard({ s }) {
  return (
    <div className="text-center py-8 border border-gold-dim rounded-sm">
      <div className="eyebrow mb-2">Module {s.module} Complete</div>
      <div className="font-serif text-2xl text-mist italic">{s.title}</div>
      {s.next && (
        <div className="text-grey text-xs mt-4">Next: {s.next}</div>
      )}
    </div>
  )
}

// ── Shared ────────────────────────────────────────────────────

function Heading({ text }) {
  if (!text) return null
  return (
    <h2 className="font-serif text-mist text-lg sm:text-xl leading-snug">
      {text}
    </h2>
  )
}
