import re

def main():
    file_path = r"c:\Users\arjun\watchdesign-site\data\modules.js"
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read().replace("\r\n", "\n")

    # 1. m02-s07 Replacement
    m02_s07_replacement = """      {
        id: 'm02-s07',
        type: 'pricing-table',
        tag: 'BRAND STRATEGY · PRICING',
        heading: 'Price Psychology in the Watch Market',
        tiers: [
          { name: 'Functional', price: '< £150', margins: '1.5x - 2x', finishing: 'Industrial / Matte', crystal: 'Mineral / Hardlex', movement: 'Quartz / Seiko NH35', target: 'Utility, legibility, simple maintenance' },
          { name: 'Enthusiast Entry', price: '£150–500', margins: '2.5x - 3x', finishing: 'Brushed / Simple polished bevels', crystal: 'Flat Sapphire / AR', movement: 'Miyota 9015 / Seiko NH35', target: 'Unique design language, community credibility' },
          { name: 'Considered Luxury', price: '£500–2,000', margins: '3x - 4x', finishing: 'Mixed finishing, sharp bevels', crystal: 'Box Sapphire / Double AR', movement: 'Sellita SW200 / Soprod', target: 'High-quality execution, design-led differentiator' }
        ]
      },"""

    # 2. m02-s19 Replacement
    m02_s19_replacement = """      {
        id: 'm02-s19',
        type: 'movement-selection',
        tag: 'BRAND BRIEF PREP · MOVEMENT CHOICE',
        heading: 'Choosing a Movement for Your Brand Brief',
        movements: [
          { name: 'Miyota 9015', origin: 'Japan', bph: '28,800', thickness: '3.90mm', reserve: '42 hours', jewels: '24', pros: 'Slim profile, high beat, extremely reliable, low cost.', cons: 'Uni-directional winding rotor can be noisy/audible.', impact: 'Enables sub-10mm total case height. Great for dress or slim sports watches.' },
          { name: 'Sellita SW200', origin: 'Switzerland', bph: '28,800', thickness: '4.60mm', reserve: '38 hours', jewels: '26', pros: 'Swiss-made credibility, bi-directional winding, easy to source.', cons: 'Thicker than Miyota, lower power reserve, slightly higher cost.', impact: 'Requires at least 11.5mm case height. Industry standard Swiss choice.' }
        ]
      },"""

    # 3. m02-s20 Replacement
    m02_s20_replacement = """      {
        id: 'm02-s20',
        type: 'movements-grid',
        tag: 'MOVEMENT AWARENESS · BRAND BRIEF',
        heading: 'Sourcing Calibration Specs',
        movements: [
          { caliber: 'Miyota 9015', origin: 'Japan', dims: 'Ø26.1mm · H3.9mm', bph: '28,800 BPH', reserve: '42 hrs', jewels: '24 jewels', position: '3, 4, or 6 o\'clock', features: 'Ultra-slim profile, high-beat seconds sweep. Best entry-level caliber.' },
          { caliber: 'Sellita SW200-1', origin: 'Switzerland', dims: 'Ø25.6mm · H4.6mm', bph: '28,800 BPH', reserve: '38 hrs', jewels: '26 jewels', position: '3, 4, or 6 o\'clock', features: 'Bi-directional winding rotor. Direct ETA 2824-2 drop-in replacement.' },
          { caliber: 'Seagull ST1901', origin: 'China', dims: 'Ø31.3mm · H6.25mm', bph: '21,600 BPH', reserve: '40 hrs', jewels: '22 jewels', position: '3 o\'clock (manual)', features: 'Column-wheel hand-wound chronograph. Beautiful layout for exhibition backs.' }
        ]
      },"""

    # 4. m03-s03 Replacement
    m03_s03_replacement = """      {
        id: 'm03-s03',
        type: 'movements-grid',
        tag: 'MECHANICS · CALIBER FAMILIES',
        heading: 'The Movements Behind Most Watches',
        movements: [
          { caliber: 'ETA 2824-2', origin: 'Switzerland', dims: 'Ø25.6mm · H4.6mm', bph: '28.8k BPH', reserve: '38h', jewels: '25j', features: 'Industry workhorse. Swatch Group restricts supply; highly limited for microbrands.' },
          { caliber: 'Miyota 9015', origin: 'Japan', dims: 'Ø26.1mm · H3.9mm', bph: '28.8k BPH', reserve: '42h', jewels: '24j', features: 'Thinner than ETA 2824. Best choice for slim microbrands. Hand-windable.' },
          { caliber: 'Sellita SW200', origin: 'Switzerland', dims: 'Ø25.6mm · H4.6mm', bph: '28.8k BPH', reserve: '38h', jewels: '26j', features: 'Swiss-made ETA alternative. Fully compatible dimensions. Widely available.' }
        ]
      },"""

    # 5. m03-s04 Replacement
    m03_s04_replacement = """      {
        id: 'm03-s04',
        type: 'movement-specs',
        tag: 'MECHANICS · SPEC SHEETS',
        heading: 'Reading a Movement Specification',
        specs: [
          { title: 'Movement Diameter', text: 'Sets minimum case diameter. Add ~4mm for case walls (Miyota 26.1mm → ~38mm case).' },
          { title: 'Movement Height', text: 'Directly determines case thickness. Movement + 5-7mm overhead = total height.' },
          { title: 'Crown Stem Position', text: 'Fixed radial & axial position. Sets the ONLY possible crown location; case cannot move it.' },
          { title: 'Hand Fitting Height', text: 'Determines pinion clearance. Crucial for dial thickness and handset spacing.' }
        ]
      },"""

    # 6. m03-s05 Replacement
    m03_s05_replacement = """      {
        id: 'm03-s05',
        type: 'dimensional-stack',
        tag: 'MECHANICS · CASE HEIGHT',
        heading: 'Case Height Dimensional Stack',
        stack: [
          { component: 'Caseback thickness', value: '1.20mm', desc: 'Required for structural integrity & sealing gasket.' },
          { component: 'Caseback clearance', value: '0.20mm', desc: 'Tolerance buffer to prevent contact with winding rotor.' },
          { component: 'Movement thickness', value: '3.90mm', desc: 'Miyota 9015 caliber height (varies by movement model).' },
          { component: 'Dial plate thickness', value: '0.40mm', desc: 'Standard brass dial thickness (excluding applied indices).' },
          { component: 'Hand pinions & handset clearance', value: '1.40mm', desc: 'Clearance for hour, minute, and sweep seconds hands.' },
          { component: 'Underside of crystal clearance', value: '0.30mm', desc: 'Prevent contact between hands and sapphire during shock.' },
          { component: 'Sapphire Crystal thickness', value: '1.50mm', desc: 'Double-domed sapphire with anti-reflective coating.' }
        ],
        formula: 'Total Stack Height = 1.20 + 0.20 + 3.90 + 0.40 + 1.40 + 0.30 + 1.50 = 8.90mm Case'
      },"""

    # 7. m03-s06 Replacement
    m03_s06_replacement = """      {
        id: 'm03-s06',
        type: 'crown-positions',
        tag: 'MECHANICS · CROWN',
        heading: 'Crown Position — The Fixed Point',
        positions: [
          { hours: "3 o'clock", name: "Standard radial position", angle: '90° axial', caseback: '1.2mm center', note: 'Standard for all conventional cases. Simple stem construction.' },
          { hours: "4 o'clock", name: "Off-axis ergonomic profile", angle: '120° axial', caseback: '1.2mm center', note: 'Prevents crown digging into wrist. Diver default (Seiko SKX).' },
          { hours: "9 o'clock", name: "Destro (Left-hand custom)", angle: '270° axial', caseback: '1.2mm center', note: 'Requires inverted movement or left-hand specific dial printing.' },
          { hours: "12 o'clock", name: "Bullhead vintage style", angle: '0° axial', caseback: '1.5mm pocket', note: 'Pocketwatch aesthetic. Lugs must be custom shaped around crown.' }
        ]
      },"""

    # 8. m04-s05 Replacement
    m04_s05_replacement = """      {
        id: 'm04-s05',
        type: 'case-shapes',
        tag: 'CASE DESIGN · FORM',
        heading: 'Case Form — The Geometric Archetypes',
        shapes: [
          { name: 'Classic Round', feature: 'Universal Default', desc: 'Standard circular profile. Easiest to manufacture, seal, and polish. Calatrava style.' },
          { name: 'Cushion', feature: 'Sport Ergonomics', desc: 'Square outline with rounded corners. Wears larger than diameter suggests (Panerai, Seiko Turtle).' },
          { name: 'Tonneau', feature: 'Art Deco / Avant-Garde', desc: 'Barrel-shaped curved profile. Highly elegant but requires custom gaskets and movement spacers.' }
        ]
      },"""

    # 9. m04-s06 Replacement
    m04_s06_replacement = """      {
        id: 'm04-s06',
        type: 'dial-zones',
        tag: 'DIAL DESIGN · ZONES',
        heading: 'Dial Architecture — The Four Zones',
        zones: [
          { zone: 'Outer Ring', purpose: 'Seconds track or bezel', rule: 'Often printed or sloped rehaut. Dictates outer readability.' },
          { zone: 'Index Zone', purpose: 'Hours markers', rule: 'Must align precisely with key movement pinions and hands.' },
          { zone: 'Center Medallion', purpose: 'Complications & Branding', rule: 'Usually has text, sub-dials, or logo.' },
          { zone: 'Subdials', purpose: 'Chronograph / Power indicators', rule: 'Their placement is strictly fixed by the movement caliber geometry.' }
        ]
      },"""

    # 10. m05-s03 Replacement
    m05_s03_replacement = """      {
        id: 'm05-s03',
        type: 'illustrator-tools',
        tag: 'ILLUSTRATOR · VECTOR TOOLS',
        heading: 'Illustrator Vector Tools Cheat Sheet',
        tools: [
          { name: 'Pen Tool', key: 'P', purpose: 'Precise path creation for lug outlines and dial tracks.', tip: 'Use few anchor points for ultra-smooth Bezier curves.' },
          { name: 'Direct Selection', key: 'A', purpose: 'Fine-tune specific anchor points and bezier handles.', tip: 'Hold Shift to constrain dragging to 45° and 90° axes.' },
          { name: 'Scale Tool', key: 'S', purpose: 'Uniform enlargement or shrinking of concentric dial scales.', tip: 'Double click to scale stroke weights and corner radius proportionately.' },
          { name: 'Rotate Tool', key: 'R', purpose: 'Distribute dial hour markers around center point.', tip: 'Alt-click center marker and enter 30° (360/12) for perfect placement.' }
        ]
      },"""

    # 11. m06-s02 Replacement
    m06_s02_replacement = """      {
        id: 'm06-s02',
        type: 'cad-timeline',
        tag: 'CAD · PRODUCTION SCHEDULE',
        heading: 'CAD Case Modeling Phases',
        timeline: [
          { hours: 'Day 1–3', phase: 'Caliber Layout', task: 'Import 3D step file of movement caliber.', details: 'Position main center pinion and stem axis. Establish fixed case interior dimensions.' },
          { hours: 'Day 4–6', phase: 'Profile & Lugs', task: 'Milling outer case profile and drawing lug geometry.', details: 'Develop profile line, bevel angles, and draw spring bar alignment pockets.' },
          { hours: 'Day 7–9', phase: 'Tolerances', task: 'Draft caseback threads, crystal gaskets, and crown tube seat.', details: 'Build in 0.15mm tolerances to guarantee parts assembly during physical CNC fabrication.' }
        ]
      },"""

    # 12. m06-s06 Replacement
    m06_s06_replacement = """      {
        id: 'm06-s06',
        type: 'cad-errors',
        tag: 'CAD · QUALITY CHECKS',
        heading: 'Five CAD Design Errors & Debugger',
        errors: [
          { num: '1', title: 'Zero-Tolerance Fits', symptom: 'Perfect mating surfaces in CAD lock up in physical assembly.', fix: 'Provide 0.15mm gap around bezel insert and crystal pockets.' },
          { num: '2', title: 'Thin Lug Walls', symptom: 'Lugs buckle under spring bar pressure.', fix: 'Ensure lug wall thickness at spring bar hole is at least 1.20mm.' },
          { num: '3', title: 'Short Stem Pocket', symptom: 'Crown won\'t seat flush or snaps movement pillar.', fix: 'Verify 0.20mm clearance at bottom of winding stem sleeve.' }
        ]
      },"""

    # 13. m07-s02 Replacement
    m07_s02_replacement = """      {
        id: 'm07-s02',
        type: 'case-materials',
        tag: 'MATERIALS · CASE',
        heading: 'Case Materials Sourcing Matrix',
        materials: [
          { name: '316L Stainless Steel', cost: '$', finishes: 'Brushed, mirror-polished, bead-blasted', pros: 'Low cost, highly corrosion resistant, easy to machine and finish.', cons: 'Heavy, prone to hairline scratches over time.' },
          { name: 'Grade 2 Titanium', cost: '$$', finishes: 'Bead-blasted, dark satin brushed', pros: 'Extremely lightweight, hypoallergenic, unique warm grey aesthetic.', cons: 'Difficult to mirror-polish; lower scratch resistance than steel.' },
          { name: 'Grade 5 Titanium', cost: '$$$', finishes: 'Mirror-polished, crisp brushed bevels', pros: 'Extremely strong, can be mirror-polished, lightweight.', cons: 'High raw material cost; rapidly wears out CNC milling tools.' }
        ]
      },"""

    # 14. m07-s05 Replacement
    m07_s05_replacement = """      {
        id: 'm07-s05',
        type: 'lume-harmony',
        tag: 'MATERIALS · LUMINOUS HARMONY',
        heading: 'Luminous Materials & Color Harmony',
        lumes: [
          { grade: 'Super-LumiNova C3', color: 'Green Glow', daylight: 'Off-White / Pale Yellow', performance: '100% (Industry brightness benchmark)' },
          { grade: 'Super-LumiNova BGW9', color: 'Blue Glow', daylight: 'Pure Crisp White', performance: '95% (Clean modern aesthetic)' },
          { grade: 'Old Radium (Faux-Tina)', color: 'Yellow/Green', daylight: 'Warm Aged Amber', performance: '75% (Vintage aesthetic)' }
        ],
        rules: [
          { title: 'Daylight Contrast', desc: 'Ensure white or pale yellow lume has a dark dial background for fast daylight reading.' },
          { title: 'Hand Matching', desc: 'Hour/minute lume must exactly match index lume grade. Seconds tip can use accent colors.' },
          { title: 'Bezel Cohesion', desc: 'Diver pip lume grade must match dial BGW9/C3 to prevent mixed colors in dark.' }
        ]
      },"""

    # 15. m08-s02 Replacement
    m08_s02_replacement = """      {
        id: 'm08-s02',
        type: 'light-physics',
        tag: 'RENDERING · PHYSICS OF LIGHT',
        heading: 'Physics of Light on Horological Surfaces',
        physics: [
          { type: 'Specular Reflection', materials: 'Polished steel hands, indices, bezel bevels', behavior: 'Perfect mirror reflection. Rays bounce at exact mirror angle.', keyshot: 'Use HDR environment with high-contrast light bands to draw sharp geometric highlights.' },
          { type: 'Anisotropic Reflection', materials: 'Sunburst dials, circular brushed casebacks', behavior: 'Light spreads into a radial cone perpendicular to micro-scratches.', keyshot: 'Use radial brushed roughness maps; align center precisely with dial pinion axis.' }
        ]
      },"""

    # 16. m09-s02 Replacement
    m09_s02_replacement = """      {
        id: 'm09-s02',
        type: 'trend-compass',
        tag: 'TREND COMPASS · MACRO DIRECTION',
        heading: 'Horological Design Trend Compass',
        trends: [
          { name: 'Neo-Vintage Dress', vector: 'Sustained Growth', impact: 'High', description: 'Under-38mm sizes, sector dials, textured finishes, manual wind profiles.' },
          { name: 'Integrated Bracelet Sport', vector: 'Maturing / Plateaud', impact: 'Medium', description: 'Saturated segment. Hard to differentiate without unique heritage story.' },
          { name: 'Ergonomic Titanium Divers', vector: 'Accelerating', impact: 'High', description: 'Bead-blasted grey metal, BGW9 lume, sub-12mm thick profile.' }
        ]
      },"""

    # 17. m09-s06 Replacement
    m09_s06_replacement = """      {
        id: 'm09-s06',
        type: 'pricing-calc',
        tag: 'UNIT ECONOMICS · PRICING SPREADSHEET',
        heading: 'Pricing Calculator — Sourced Components',
        rows: [
          { component: 'Movement (Miyota 9015)', low: '15', mid: '22', high: '28', note: 'Bulk purchasing tier discounts.' },
          { component: 'Case CNC Assembly', low: '18', mid: '35', high: '65', note: 'Standard steel vs. titanium grade 5 CNC.' },
          { component: 'Double-Domed Sapphire', low: '6', mid: '12', high: '18', note: 'Double-sided anti-reflective coating.' }
        ]
      },"""

    # 18. m09-s08 Replacement
    m09_s08_replacement = """      {
        id: 'm09-s08',
        type: 'pricing-calc',
        tag: 'ECONOMICS · SOURCING MATRIX',
        heading: 'Pricing Calculator — Manufacturing Origin',
        rows: [
          { component: 'Movement (Japan vs Swiss)', low: '18', mid: '30', high: '90', note: 'Seiko NH35 vs Miyota 9015 vs Swiss SW200.' },
          { component: 'Case Milling & Finishing', low: '20', mid: '40', high: '130', note: 'Guangdong tooling vs Switzerland bespoke CNC.' },
          { component: 'Dial Printing & Indices', low: '5', mid: '18', high: '40', note: 'Applied indices and multi-pass paint printing.' }
        ]
      },"""

    # 19. m10-s06 Replacement
    m10_s06_replacement = """      {
        id: 'm10-s06',
        type: 'startup-roadmap',
        tag: 'ADVANCED · TIMELINE',
        heading: 'Year One — From Design to Launch Batch',
        milestones: [
          { months: 'M1–M2', title: 'Manufacturer Sourcing', task: 'Get 3+ quotes for cases/dials. Source movements.', warning: 'Price variance can be 50-100% between partners.' },
          { months: 'M2–M3', title: 'Prototype Order', task: 'Fabricate 1-3 CNC prototype cases, dials, and test calibers.', warning: 'Expect to do at least 2 prototype rounds to resolve fitment.' },
          { months: 'M3–M4', title: 'Review & Tolerance Tweak', task: 'Assemble watch, check stem alignment, run WR testing.', warning: 'Never skip strict fit checking; minor errors ruin production.' },
          { months: 'M4–M5', title: 'Community & Waitlist Build', task: 'Setup site. Post design stories on Instagram. Email list.', warning: 'Your waitlist represents your initial batch backing.' },
          { months: 'M5–M6', title: 'Production Deposit', task: 'Confirm specs in writing and transfer 30% deposit.', warning: 'Agree on QC guidelines and delivery dates upfront.' },
          { months: 'M7–M11', title: 'Production & Cleanroom QC', task: '6-8 week case milling and dial printing. QC audit.', warning: 'Rigorous inspection ensures high initial brand equity.' },
          { months: 'M11–M12', title: 'Launch & Fulfillment', task: 'Ship to customers. Gather direct feedback and start next model.', warning: 'Personalize packing and gather feedback for Model 2.' }
        ]
      },"""

    pairs = [
        ("m02-s07", m02_s07_replacement),
        ("m02-s19", m02_s19_replacement),
        ("m02-s20", m02_s20_replacement),
        ("m03-s03", m03_s03_replacement),
        ("m03-s04", m03_s04_replacement),
        ("m03-s05", m03_s05_replacement),
        ("m03-s06", m03_s06_replacement),
        ("m04-s05", m04_s05_replacement),
        ("m04-s06", m04_s06_replacement),
        ("m05-s03", m05_s03_replacement),
        ("m06-s02", m06_s02_replacement),
        ("m06-s06", m06_s06_replacement),
        ("m07-s02", m07_s02_replacement),
        ("m07-s05", m07_s05_replacement),
        ("m08-s02", m08_s02_replacement),
        ("m09-s02", m09_s02_replacement),
        ("m09-s06", m09_s06_replacement),
        ("m09-s08", m09_s08_replacement),
        ("m10-s06", m10_s06_replacement),
    ]

    for slide_id, replacement in pairs:
        # Match from { all the way to }, ensuring it contains the slide_id and is non-greedy
        # Pattern matches: { followed by whitespace, optional properties, id: 'slide_id', optional properties, and then ends with },
        pattern = re.compile(
            r"\{\s*(?:[^{}]*?\n)?\s*id:\s*'" + slide_id + r"',.*?\n\s*\},", 
            re.DOTALL
        )
        norm_replacement = replacement.replace("\r\n", "\n").strip() + "\n"
        
        match = pattern.search(content)
        if match:
            content = pattern.sub(norm_replacement, content, count=1)
            print(f"Successfully replaced slide {slide_id} via regex")
        else:
            # Try a secondary relaxed pattern just in case id is not the first attribute
            alt_pattern = re.compile(
                r"\{\s*[^}]*?id:\s*'" + slide_id + r"'[^}]*?\n\s*\},",
                re.DOTALL
            )
            alt_match = alt_pattern.search(content)
            if alt_match:
                content = alt_pattern.sub(norm_replacement, content, count=1)
                print(f"Successfully replaced slide {slide_id} via alternative regex")
            else:
                print(f"Slide {slide_id} not found or failed regex match.")

    # Write out with platform newlines or LF
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(content)

    print("Restructuring script complete!")

if __name__ == "__main__":
    main()
