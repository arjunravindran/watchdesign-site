// Applies migrated body blocks to data/modules.js
// Run: node scratch/apply_migration.js

const fs = require('fs')
const path = require('path')

const migrations = require('./migrated_bodies.json')
let src = fs.readFileSync(path.join(__dirname, '../data/modules.js'), 'utf8')

let replaced = 0
let skipped = 0

for (const m of migrations) {
  // Convert runtime string value back to JS source representation
  // (actual newlines → \n, actual single quotes → \')
  const srcBody = m.original
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '\\r')

  // Build block array JS string — use template literals for safety with quotes
  const blockLines = m.blocks.map(b => {
    const safeText = b.text
      .replace(/\\/g, '\\\\')
      .replace(/`/g, '\\`')
      .replace(/\$\{/g, '\\${')
    return `      { type: '${b.type}', text: \`${safeText}\` }`
  })
  const arrayStr = '[\n' + blockLines.join(',\n') + '\n    ]'

  // Try single-quoted body
  const needle = "body: '" + srcBody + "'"
  if (src.includes(needle)) {
    src = src.replace(needle, 'body: ' + arrayStr)
    replaced++
    continue
  }

  skipped++
  process.stderr.write(`SKIP: ${m.id} (${m.heading || '—'})\n`)
}

process.stderr.write(`Replaced: ${replaced}, Skipped: ${skipped}\n`)
fs.writeFileSync(path.join(__dirname, '../data/modules.js'), src, 'utf8')
process.stderr.write('Written data/modules.js\n')
