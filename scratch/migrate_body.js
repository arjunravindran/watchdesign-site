// Parses flat body strings from modules.js into structured block arrays.
// Run: node scratch/migrate_body.js > scratch/migrated_bodies.json
// Then manually audit the output before applying to modules.js.

const { modules } = require('../data/modules')

const EDITORIAL_TYPES = new Set(['content', 'overview', 'summary', 'resources'])

function parseLine(line) {
  const t = line.trim()
  if (!t) return null

  // Standalone bullet markers — skip
  if (/^[◆→•\-–]\s*$/.test(t)) return null

  // ALL-CAPS label (section header) — short, no lowercase
  const isLabel = /^[A-Z][A-Z0-9\s·&\-\/]{2,50}$/.test(t) && t.length <= 50 && !/[a-z]/.test(t)
  if (isLabel) return { type: 'label', text: t }

  // Standalone number (e.g. "01", "1") — section counter
  if (/^0?\d{1,2}$/.test(t)) return { type: 'number', text: t }

  // Year or short date  (e.g. "1920s", "c.1820", "17th C")
  if (/^(c\.)?\d{4}s?$/.test(t) || /^\d{1,2}th C$/.test(t)) return { type: 'label', text: t }

  // Italic/quote marker — lines starting with " or — (em dash attribution)
  if (t.startsWith('"') || t.startsWith('“') || t.startsWith('—') || t.startsWith('–')) {
    return { type: 'note', text: t }
  }

  // Short heading-like text (< 60 chars, title-cased or sentence-cased, no period at end)
  const isShortHeading = t.length < 60 && !t.endsWith('.') && !t.endsWith(',') &&
    /^[A-Z]/.test(t) && !/^[A-Z][A-Z\s]{5,}$/.test(t)

  // Long paragraph (>= 60 chars or ends with punctuation)
  if (t.length >= 60 || t.endsWith('.') || t.endsWith(',') || t.endsWith('?')) {
    return { type: 'para', text: t }
  }

  if (isShortHeading) return { type: 'bullet', text: t }

  return { type: 'para', text: t }
}

const output = []

for (const mod of modules) {
  for (const slide of mod.slides) {
    if (!EDITORIAL_TYPES.has(slide.type)) continue
    if (!slide.body || typeof slide.body !== 'string') continue

    const lines = slide.body.split('\n')
    const blocks = lines.map(parseLine).filter(Boolean)

    output.push({
      id: slide.id,
      type: slide.type,
      heading: slide.heading,
      original: slide.body,
      blocks,
    })
  }
}

console.log(JSON.stringify(output, null, 2))
process.stderr.write(`Processed ${output.length} editorial slides\n`)
