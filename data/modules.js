// ─────────────────────────────────────────────────────────────
//  WATCH DESIGN SELF-STUDY PROGRAMME — Module Data
//  Each module contains: meta + an array of slides
//  Each slide has: id, type, and type-specific content fields
//
//  Slide types:
//    hero        — full-width title slide
//    overview    — two-column session breakdown
//    grid        — card grid (2 or 3 columns)
//    list        — numbered/bulleted rows
//    compare     — side-by-side comparison
//    sequence    — numbered steps
//    callout     — single large callout block
//    assignment  — assignment brief + criteria
//    endcard     — module complete card
// ─────────────────────────────────────────────────────────────

export const modules = [
  {
    slug: 'anatomy-history',
    number: '01',
    title: 'Anatomy & History of Horology',
    subtitle: 'The vocabulary and timeline every watch designer must own',
    sessions: 2,
    level: 'Foundational',
    assignment: 'Brand Deconstruction — 3 brands, ~1,500 words',
    description: 'Before designing a watch you must speak its language. This module establishes component vocabulary, traces 500 years of horological history, and introduces the market structure through three brand DNA case studies.',
    color: '#C8A96E',
    slides: [
      {
        id: 'm01-s01', type: 'hero',
        module: 'MODULE 01',
        title: 'Anatomy & History',
        subtitle: 'of Horology',
        tagline: 'The vocabulary and timeline every watch designer must own',
        meta: '2 Sessions  ·  Foundational  ·  Assignment 1: Brand Deconstruction',
      },
      {
        id: 'm01-s02', type: 'grid',
        tag: 'ANATOMY · EXTERNAL',
        heading: 'The External Components',
        columns: 3,
        items: [
          { title: 'Case', body: 'The metal housing that contains and protects the movement. Defines diameter, height, and lug geometry. The primary structural design decision.' },
          { title: 'Bezel', body: 'The ring surrounding the crystal. Can be fixed (dress watches) or rotating (dive/pilot). Width relative to case diameter is a major proportion decision.' },
          { title: 'Crystal', body: 'The transparent cover. Sapphire (Mohs 9, scratch-resistant), mineral glass (Mohs 5), or acrylic (softer, polishable). Most serious watches use sapphire with AR coating.' },
          { title: 'Crown', body: 'The winding and time-setting mechanism. Position is fixed by the movement stem. Size, shape, and crown guards are design choices within that constraint.' },
          { title: 'Lug', body: 'The extensions from the case body that hold the strap or bracelet. Lug-to-lug distance and lug curvature determine wrist fit. The most complex 3D geometry to model.' },
          { title: 'Dial', body: 'The face of the watch. Carries brand name, indices, hands, and any complication windows. Not a canvas — every element serves legibility or brand purpose.' },
        ],
      },
      {
        id: 'm01-s03', type: 'grid',
        tag: 'ANATOMY · MOVEMENT',
        heading: 'Movement Architecture',
        columns: 3,
        items: [
          { title: 'Mainspring', body: 'The energy source. A coiled metal spring that stores mechanical energy when wound. Releases energy through the gear train over the power reserve period.' },
          { title: 'Gear Train', body: 'Transfers energy from mainspring to escapement. Each wheel turns at a precise ratio. The wheel count determines the display period of each hand.' },
          { title: 'Escapement', body: 'The regulating heart of the watch. Releases energy in controlled increments. The Swiss lever escapement has been the industry standard for 175+ years.' },
          { title: 'Balance Wheel', body: 'The oscillator that regulates timekeeping. Beats at a fixed frequency (18,000–36,000 BPH). Its mass and spring determine the rate accuracy.' },
          { title: 'Hairspring', body: 'The coiled spring controlling the balance wheel\'s oscillation frequency. Invented by Huygens in 1675. Still in use today, now often made from silicon.' },
          { title: 'Jewels', body: 'Synthetic rubies at friction points. Reduce wear, improve accuracy. 17 jewels = basic. 25+ jewels = quality grade. Visible through exhibition casebacks.' },
        ],
      },
      {
        id: 'm01-s04', type: 'list',
        tag: 'HISTORY · ERA 1',
        heading: '1500–1700: Birth of the Portable Timepiece',
        rows: [
          { year: 'c.1510', title: 'Peter Henlein, Nuremberg', detail: 'First spring-driven portable clock. Drum-shaped, worn around the neck. Accuracy: ±30 minutes/day. The concept of wearable timekeeping is born.' },
          { year: '1657',   title: 'Huygens — Pendulum Clock', detail: 'Christiaan Huygens invents the pendulum clock, reducing daily error from ~15 minutes to ~15 seconds. Stationary timekeeping is transformed.' },
          { year: '1631',   title: 'Worshipful Company of Clockmakers', detail: 'London\'s clockmakers guild established. Thomas Tompion (1639–1713) and George Graham (1673–1751) later emerge from this tradition.' },
          { year: '1675',   title: 'Huygens — Balance Spring (Hairspring)', detail: 'The invention that made portable accuracy possible. Published January 20, 1675. The coiled spring allows the balance wheel to oscillate at a regulated frequency.' },
          { year: '1700',   title: 'Case design begins to evolve', detail: 'As accuracy improves, watchmakers shift attention to form. The watch transitions from container to object of desire. The design era begins.' },
        ],
      },
      {
        id: 'm01-s05', type: 'list',
        tag: 'HISTORY · ERA 2',
        heading: '1700–1900: Precision, Pocket Watches & the Marine Chronometer',
        rows: [
          { year: '1735',   title: 'John Harrison — Marine Chronometer H1', detail: 'Harrison submits H1 to the Board of Longitude. The H4 (1759) achieves the accuracy required to determine longitude at sea, revolutionising navigation.' },
          { year: 'c.1795–1801', title: 'Breguet Tourbillon', detail: 'Conceived c.1795, patented 1801. The rotating cage counteracts gravity\'s effect on pocket watch accuracy. The most celebrated complication in horology.' },
          { year: '1839',   title: 'Patek Philippe Founded', detail: 'Founded by Antoni Patek and François Czapek. Adrien Philippe joins in 1845. Becomes the standard-bearer for dress watchmaking excellence.' },
          { year: '1868',   title: 'First Wristwatch — Patek Philippe', detail: 'A bracelet watch created for Countess Koscowicz of Hungary. The concept of wearing a watch on the wrist exists before it becomes practical.' },
        ],
      },
      {
        id: 'm01-s06', type: 'list',
        tag: 'HISTORY · ERA 3',
        heading: '1900–1969: The Wristwatch Century',
        rows: [
          { year: '1904', title: 'Santos Dumont — Cartier', detail: 'Louis Cartier creates a wristwatch for aviator Alberto Santos-Dumont who needed to read time without using his hands. Function drives form.' },
          { year: '1916–18', title: 'WWI — Mass Adoption', detail: 'Trench warfare makes wristwatches essential for men. Synchronising attacks, timing artillery fire. The wristwatch transitions from feminine jewel to masculine tool.' },
          { year: '1926', title: 'Rolex Oyster — First Waterproof Case', detail: 'Hans Wilsdorf patents the Oyster case with its screwdown crown and caseback. Mercedes Gleitze wears it across the English Channel as proof.' },
          { year: '1953', title: 'Rolex Submariner & Blancpain Fifty Fathoms', detail: 'Both launched the same year. The professional dive watch is born. ISO 6425 design language established: rotating bezel, luminous indices, screwdown crown.' },
          { year: '1957–65', title: 'Omega Speedmaster', detail: 'Introduced 1957. Qualified by NASA in 1965 for all crewed space missions. Worn on the Moon in 1969. The functional watch as history-carrier.' },
        ],
      },
      {
        id: 'm01-s07', type: 'callout',
        tag: 'HISTORY · THE TURNING POINT',
        heading: '1969–1983: The Quartz Crisis',
        stats: [
          { number: '1969', label: 'Seiko Astron', sub: 'First quartz watch. Accurate to ±5 sec/year. Revolutionary.' },
          { number: '~50%', label: 'Swiss exports halved', sub: 'From 1974 peak to early 1980s. An industry near collapse.' },
          { number: '1,000+', label: 'Swiss watchmakers closed', sub: 'Employment: 90,000 (1970) → 33,000 (1984) → 28,000 (1988).' },
        ],
        body: 'Japanese manufacturers offered quartz watches at a fraction of the cost with vastly superior accuracy. The mid-tier Swiss industry was essentially destroyed. The salvation: Swatch (1983) — Nicolas Hayek\'s insight to reclaim low-price quartz as fashionable, Swiss, and disposable. The mechanical watch pivoted from utility to luxury.',
      },
      {
        id: 'm01-s08', type: 'list',
        tag: 'HISTORY · ERA 5',
        heading: '1983–Present: The Mechanical Renaissance',
        rows: [
          { year: '1983', title: 'Swatch saves the Swiss industry', detail: 'Nicolas Hayek and Ernst Thomke\'s low-cost, fashion-forward quartz watch. ETA\'s cheap movement in a thin, colourful plastic case. Repositions Swiss at every tier.' },
          { year: '1972', title: 'Gérald Genta — Royal Oak', detail: 'Genta designs the Royal Oak for Audemars Piguet in one night. The integrated bracelet, exposed screws, and "tapisserie" dial define sports luxury. A genre is created.' },
          { year: '2002', title: 'Pre-Owned Market Emerges', detail: 'Chrono24 launches. The secondary market for mechanical watches grows to exceed primary sales for some references. Collector culture drives new brand strategies.' },
          { year: '2018+', title: 'Microbrand Era', detail: 'Baltic, AnOrdain, Lorier, Camden Watch Company and hundreds of others launch via direct-to-consumer. Design quality and honest sourcing replace heritage as the credibility signal.' },
        ],
      },
      {
        id: 'm01-s09', type: 'grid',
        tag: 'BRAND DNA',
        heading: 'Three Brand Case Studies',
        columns: 3,
        items: [
          {
            title: 'Rolex',
            badge: 'VOLUME LUXURY',
            body: 'Founded 1905. Market positioning: aspirational luxury accessible to upper-middle class. Design philosophy: incremental refinement over decades. The Submariner, Datejust, and Daytona have been continuously refined, not redesigned. Rolex\'s power is in constancy — the watch you recognise across 50 years.',
          },
          {
            title: 'Patek Philippe',
            badge: 'APEX LUXURY',
            body: 'Founded 1839. Market positioning: the most desirable watches in the world. Design philosophy: craft and complication above all. The Calatrava is the most refined expression of the dress watch. "You never actually own a Patek Philippe. You merely look after it for the next generation."',
          },
          {
            title: 'Grand Seiko',
            badge: 'CRAFT EXCELLENCE',
            body: 'Founded 1960 as Seiko\'s prestige line. Design philosophy: Zaratsu mirror polishing, the "Shizukuishi" aesthetic — influenced by Japanese nature and seasons. A direct alternative to Swiss for buyers who prioritise finishing quality and visual poetry over prestige signalling.',
          },
        ],
      },
      {
        id: 'm01-s10', type: 'assignment',
        tag: 'ASSIGNMENT 1',
        heading: 'Brand Deconstruction',
        brief: 'Choose 3 watch brands from different market tiers (one luxury, one mid-tier, one microbrand or Japanese). Write 400–600 words on each covering:\n• Founding history and market tier\n• Design signatures — name specific components\n• Movement strategy\n• 3 key references with analysis\n• Brand narrative and positioning\n• Your critical evaluation',
        criteria: [
          { pct: '30%', label: 'Accuracy', desc: 'Every factual claim is correct. Movement specifications cited with grade.' },
          { pct: '40%', label: 'Depth of Analysis', desc: 'Analysis explains why, not just what. Visual decisions connected to brand strategy.' },
          { pct: '30%', label: 'Design Eye', desc: 'Names specific components precisely. Identifies finishing, typography, hand style.' },
        ],
        deliverable: '~1,500 words total · Written document or Notion page',
      },
    ],
  },

  {
    slug: 'brand-strategy',
    number: '02',
    title: 'Brand Strategy & Market Landscape',
    subtitle: 'From market data to brand brief — the strategic foundation of every design decision',
    sessions: 2,
    level: 'Intermediate',
    assignment: 'Full Brand Brief — the document you will carry through Modules 4–9',
    description: 'The brand brief is the most important document in this curriculum. Everything designed in Modules 4–8 flows from what you define here. This module gives you the strategic framework to write one that is genuinely constraining, genuinely useful, and genuinely yours.',
    color: '#C8A96E',
    slides: [
      {
        id: 'm02-s01', type: 'hero',
        module: 'MODULE 02',
        title: 'Brand Strategy &',
        subtitle: 'Market Landscape',
        tagline: 'From market data to brand brief — the strategic foundation of every design decision',
        meta: '2 Sessions  ·  Intermediate  ·  Assignment 2: Full Brand Brief',
      },
      {
        id: 'm02-s02', type: 'callout',
        tag: 'MARKET DATA · FHS 2024',
        heading: 'The Market You Are Designing For',
        stats: [
          { number: 'CHF 26bn', label: 'Total Swiss watch exports 2024', sub: 'Down 2.8% vs 2023. First decline since COVID.' },
          { number: '>80%', label: 'Of export value: mechanical watches', sub: 'Quartz dominates volume. Mechanical generates the vast majority of value.' },
          { number: '+5.0%', label: 'USA — leading market', sub: 'US overtook China as #1 market. Strong collector demand continues.' },
          { number: '−25.8%', label: 'China — significant decline', sub: 'Anti-corruption sentiment, consumer confidence, slowing luxury.' },
        ],
        body: 'The watch market is not monolithic. CHF 200–3,000 (the microbrand tier) is under structural pressure. The design advantage — genuine quality at accessible price — is how serious microbrands differentiate. FHS data: 15.3 million units exported in 2024.',
      },
      {
        id: 'm02-s03', type: 'grid',
        tag: 'BRAND STRATEGY · FRAMEWORK',
        heading: 'The Five Brand Disciplines',
        columns: 1,
        items: [
          { title: '1. Differentiate', body: 'A brand is not a logo or a name. It is the specific, felt difference your product makes in someone\'s life. "Accessible Swiss-style quality" is not differentiation — it describes 200 brands. What do you and only you offer?' },
          { title: '2. Collaborate', body: 'Brand consistency requires every touchpoint (packaging, website, social, customer service) to speak with one voice. The brand brief is the document that enables this. Without it, every decision is arbitrary.' },
          { title: '3. Innovate', body: 'Design leadership is not novelty — it is solving the right problem in the right way for the right audience. The brand brief forces you to name who that audience is before you pick up a pencil.' },
          { title: '4. Validate', body: 'Every design decision should be testable against the brief. "Does this case shape serve the brief?" is a better question than "Does this case shape look good?" Good in what context, for whom?' },
          { title: '5. Cultivate', body: 'Brands are built over time through consistent behaviour. The non-negotiables in your brief are the commitments you make to yourself about what you will never compromise. They are only valuable if they cost you something.' },
        ],
      },
      {
        id: 'm02-s04', type: 'grid',
        tag: 'LEGAL LABELLING',
        heading: 'Legal Labelling — Three Origin Systems',
        columns: 3,
        items: [
          {
            title: '🇨🇭 SWISS MADE',
            badge: 'THE 60% RULE',
            body: '≥60% of total manufacturing cost in Switzerland. Movement must be Swiss-made (≥60% Swiss value, assembled + inspected in CH). Technical development in Switzerland. Final inspection in Switzerland.\n\nBrands: Rolex, Omega, Patek, IWC, Breitling\nCOGS: Highest. Can claim "Swiss Made" on dial.',
          },
          {
            title: '🇩🇪 GLASHÜTTE',
            badge: '2008 RULES',
            body: '≥50% of movement value added in Glashütte, Saxony. Key movement parts must be made or decorated there. "Made in Germany" is NOT a legally protected watch term — only "Glashütte" is.\n\nBrands: NOMOS, A. Lange & Söhne, GUB\nCOGS: High. German labour premium.',
          },
          {
            title: '🇯🇵 JAPAN MOVEMENT',
            badge: 'NO PROTECTION',
            body: 'No legal equivalent of "Swiss Made" exists for Japanese movements. "Japan Movement" is a marketing description, not a protected term. Quality rests on brand reputation.\n\nBrands: Baltic, Lorier, Camden Watch Co.\nCOGS: Lowest. Miyota 9015 ~£15–40/unit.',
          },
        ],
      },
      {
        id: 'm02-s05', type: 'compare',
        tag: 'CASE STUDY',
        heading: 'Baltic vs AnOrdain — Two Approaches to the Same Tier',
        left: {
          label: 'BALTIC',
          subtitle: 'Scale through design system',
          points: [
            'Founded 2016 · Public launch April 2017',
            'Assembled in Besançon, France',
            'Miyota 9015 / Seagull ST1901 movements',
            'Design system: recognisable across all models',
            'Instagram-first community building',
            'Volume at accessible price point (£350–700)',
          ],
          lesson: 'Consistency and community compound over time. The brand is the design system, not any single watch.',
        },
        right: {
          label: 'ANORDAIN',
          subtitle: 'Craft as complete strategy',
          points: [
            'Glasgow, Scotland',
            'Grand feu enamel dials made in-house',
            'Miyota movement (movements not the story)',
            'Deliberately slow production — scarcity is real',
            'Editorial recognition: Hodinkee, Fratello, Worn & Wound',
            'Premium tier for a microbrand (£1,100–1,300)',
          ],
          lesson: 'One extraordinary craft element can carry an entire brand. Scarcity from genuine production limits is the most credible scarcity.',
        },
      },
      {
        id: 'm02-s06', type: 'list',
        tag: 'BRAND BRIEF · ANATOMY',
        heading: 'The Six Elements of a Constraining Brand Brief',
        rows: [
          { year: '01', title: 'Brand name + origin', detail: 'Name, its meaning, where it comes from. Has it been trademark-searched? (UKIPO Class 14 — watches)' },
          { year: '02', title: 'One-sentence mission', detail: 'What does this brand make, for whom, and what does it reject? Short enough to memorise. Specific enough to be exclusionary.' },
          { year: '03', title: 'Detailed consumer profile', detail: 'Age, profession, watch knowledge, primary motivation, current watches owned, discovery channel, what they explicitly reject.' },
          { year: '04', title: 'Positioning map', detail: 'Plot 5–8 competitors on Traditional↔Avant-garde / Accessible↔Premium axes. Identify the white space. Explain why it is yours.' },
          { year: '05', title: 'Design direction in words', detail: 'Movement specified. Case shape described. Dial philosophy stated. Finishing approach. Typography approach. All before any sketching.' },
          { year: '06', title: 'Three inviolable non-negotiables', detail: 'What will you never compromise even under commercial pressure? They are only valuable if they would genuinely cost you something to hold.' },
        ],
      },
      {
        id: 'm02-s07', type: 'assignment',
        tag: 'ASSIGNMENT 2',
        heading: 'The Full Brand Brief',
        brief: 'Create the brand brief for the watch you will carry through Modules 4–9. Must include:\n• Brand name + trademark search confirmation (UKIPO Class 14)\n• One-sentence mission statement (specific enough to be exclusionary)\n• Consumer profile: all 7 fields including "what they reject"\n• Positioning map with 5–8 competitors placed\n• Market tier + price band with FHS data justification\n• Movement specified (use the Module 2 calibre guide)\n• Legal Labelling Strategy: target label + COGS impact + what you can claim\n• Design direction in words (case, dial, finishing, typography)\n• Three inviolable non-negotiables',
        criteria: [
          { pct: '35%', label: 'Strategic Clarity', desc: 'A stranger could design this brand from the brief alone without further questions.' },
          { pct: '35%', label: 'Design Direction', desc: 'Movement specified. Case, dial, finishing, typography all articulated.' },
          { pct: '30%', label: 'Consumer Insight', desc: 'All 7 profile fields. "What they reject" as detailed as "what they want".' },
        ],
        deliverable: '2–3 pages · Notion page or PDF',
        warning: 'This is the most important single assignment in the curriculum. Every subsequent module builds from this document.',
      },
    ],
  },

  {
    slug: 'mechanical-movements',
    number: '03',
    title: 'Mechanical Movements & Engineering',
    subtitle: 'How calibers constrain and enable every dimension of watch design',
    sessions: 2,
    level: 'Advanced',
    assignment: 'Spec Sheet Analysis + Seagull ST36 Disassembly',
    description: 'The most technically demanding module. Every dimension of a watch case is determined by the movement. A designer who does not understand calibers is working blind.',
    color: '#C8A96E',
    slides: [],
  },

  {
    slug: 'concept-sketching',
    number: '04',
    title: 'Concept Sketching & Ideation',
    subtitle: 'From brand brief to rough concept to resolved design — on paper first, always',
    sessions: 2,
    level: 'Intermediate',
    assignment: 'Three Refined Concept Sketches',
    description: 'Sketching is thinking. The fastest path from brand brief to good design is through volume — 20 rough sketches that explore the space, followed by ruthless selection.',
    color: '#C8A96E',
    slides: [],
  },

  {
    slug: '2d-rendering',
    number: '05',
    title: '2D Rendering & Technical Drawing',
    subtitle: 'From refined sketch to precise vector artwork and orthographic specification',
    sessions: 2,
    level: 'Intermediate',
    assignment: 'Full 2D Orthographic Render Package',
    description: 'The 2D render is the most commercially useful artefact in this curriculum. It is what designers submit to manufacturers for quotes, investors for pitch decks, and retailers for evaluation.',
    color: '#C8A96E',
    slides: [],
  },

  {
    slug: '3d-cad',
    number: '06',
    title: '3D CAD Modelling',
    subtitle: 'Translating 2D precision into three-dimensional geometry',
    sessions: 2,
    level: 'Advanced',
    assignment: '3D Case Geometry (15–25 hours)',
    description: 'Where the watch becomes three-dimensional for the first time. Design decisions invisible in flat renders are revealed here. The 3D model is the moment of truth.',
    color: '#C8A96E',
    slides: [],
  },

  {
    slug: 'materials-finishes',
    number: '07',
    title: 'Materials, Finishes & Manufacturing',
    subtitle: 'Every material decision is a brand decision',
    sessions: 2,
    level: 'Intermediate',
    assignment: 'Materials & Finishing Callout Sheet',
    description: 'The relationship between materials, surface finishing, and brand identity. A brushed titanium surface communicates something entirely different from a mirror-polished steel — even when the shape is identical.',
    color: '#C8A96E',
    slides: [],
  },

  {
    slug: 'rendering-visualisation',
    number: '08',
    title: 'Rendering & Visualisation',
    subtitle: 'From 3D geometry to hero images — the product presentation that sells a design',
    sessions: 2,
    level: 'Intermediate',
    assignment: 'Hero Renders + Specification Page',
    description: 'Rendering is not photography — it is the craft of lighting an object to reveal its design intention. A poorly rendered watch makes a good design look ordinary.',
    color: '#C8A96E',
    slides: [],
  },

  {
    slug: 'portfolio-career',
    number: '09',
    title: 'Trends, Portfolio & Career',
    subtitle: 'From student project to industry-ready presentation',
    sessions: 2,
    level: 'Intermediate',
    assignment: 'Final Watch Design Pitch Deck (12–16 slides)',
    description: 'Everything produced in Modules 1–8 converges into a single, coherent pitch deck — the final deliverable of the curriculum.',
    color: '#C8A96E',
    slides: [],
  },

  {
    slug: 'physical-prototyping',
    number: '09.5',
    title: 'Physical Prototyping',
    subtitle: 'From digital model to physical object — the moment renders become reality',
    sessions: 1,
    level: 'Intermediate',
    assignment: 'Prototype Test Report',
    description: 'Renders lie. Not through deception, but because rendering is a controlled environment that cannot replicate physical weight, wrist presence, lug curvature, or crown feel.',
    color: '#8A6E3C',
    slides: [],
  },

  {
    slug: 'advanced-topics',
    number: '10',
    title: 'Advanced & Specialist Topics',
    subtitle: 'Going deeper: haute horlogerie, craft techniques, and the road to independent practice',
    sessions: null,
    level: 'Advanced',
    assignment: 'Self-directed — choose your specialist path',
    description: 'Module 10 is not a structured course but a curated map of specialist territories to explore after completing the foundational curriculum.',
    color: '#C8A96E',
    slides: [],
  },
]

// Flat array of all searchable content for Fuse.js
export function buildSearchIndex() {
  const items = []
  for (const mod of modules) {
    // Module-level entry
    items.push({
      id: mod.slug,
      type: 'module',
      title: mod.title,
      subtitle: mod.subtitle,
      body: mod.description,
      module: mod.number,
      slug: mod.slug,
      url: `/modules/${mod.slug}/`,
    })
    // Slide-level entries
    for (const slide of mod.slides) {
      const text = [
        slide.heading,
        slide.tagline,
        slide.body,
        slide.brief,
        ...(slide.items || []).map(i => `${i.title} ${i.body}`),
        ...(slide.rows  || []).map(r => `${r.title} ${r.detail}`),
        ...(slide.stats || []).map(s => `${s.label} ${s.sub}`),
        ...(slide.criteria || []).map(c => `${c.label} ${c.desc}`),
      ].filter(Boolean).join(' ')

      items.push({
        id: slide.id,
        type: 'slide',
        title: slide.heading || slide.title || '',
        tag: slide.tag || '',
        body: text,
        module: mod.number,
        slug: mod.slug,
        url: `/modules/${mod.slug}/`,
      })
    }
  }
  return items
}
