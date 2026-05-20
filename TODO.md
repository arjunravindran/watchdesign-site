# TODO

## Content fixes

- [ ] **m09-s04** Career Pathways in Watch Design — flat bullet/para masking a table; convert to `compare-table` with cols `['Pathway', 'Entry Requirements', 'Reality']`, 4 rows (In-House, Freelance, Microbrand Founder, Watchmaking School)
- [ ] **m09-s10** Watch Photography — same pattern; convert to `compare-table` with cols `['Setup', 'Gear', 'Technique', 'Use']`, 4 rows (Studio White, Wrist Context, Detail/Macro, Process Documentation)
- [ ] Update "115+ Slides" stat on homepage — count has grown with the 5 interactive slides added

## Architecture (Tier 3)

- [ ] **Body text migration** — ~48 `content` slides still use `\n`-separated string `body` instead of structured block arrays. Low visual impact now (renderer handles both) but makes data editing fragile. Migration script lives in `scratch/migrate_body.js`. Needs manual audit of output before committing.
- [ ] **Concept cross-linking** — add `related: [{ id, label }]` to individual slides; render as "See also" chips at the bottom of editorial sections. UI: ~1 hr. Data (deciding which slides relate to which): 3–4 hrs.

## Nice to have

- [ ] Module 10 hero image — currently showing a numbered placeholder; a fitting illustration would complete the card grid
- [ ] `m03-s13` Co-Axial Escapement — endcard with a movement comparison table in flat body text. Currently hidden from students (endcards are filtered from the slide deck) so low priority; worth converting if endcards are ever surfaced
