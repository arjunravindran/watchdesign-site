import re
import json

# Read modules.js
with open('data/modules.js', 'r', encoding='utf-8') as f:
    js_content = f.read()

# Let's find all slide blocks
# A slide block looks like:
# {
#   id: '...',
#   type: '...',
#   ...
# }
# Since we want to parse it correctly, we can extract the slide arrays per module.
# Let's do a simple regex scan for modules and slides.
modules_raw = re.findall(r"\{\s*slug:\s*'([^']+)',\s*number:\s*'([^']+)',\s*title:\s*'([^']+)',[\s\S]*?slides:\s*\[([\s\S]*?)\]\s*\},", js_content)

output_md = """# Horology Image Prompts Directory

This document contains a master list of all slides in the Watch Design Self-Study curriculum. For each slide, we provide:
1. **Slide ID & Target Filename:** The suggested filename to save the generated image as.
2. **Technical/Historical Context:** What the slide teaches.
3. **Targeted Web Search Query:** To find reference images.
4. **Midjourney Prompt:** Tailored for ultra-realistic, premium watch editorial v6 styling.
5. **DALL-E 3 Prompt:** Tailored for semantic accuracy, clear detail, and diagrams where appropriate.

> [!NOTE]
> Local schematic images are preserved and noted. Do not replace these in your actual asset folder.

---
"""

def generate_queries_and_prompts(slide_id, slide_type, heading, body, current_image):
    # Determine if it's a local image that we MUST keep
    if current_image and current_image.startswith('/images/'):
        return {
            'keep': True,
            'search': 'N/A (Local Schematic Asset)',
            'midjourney': 'N/A (Using existing local schematic)',
            'dalle': 'N/A (Using existing local schematic)'
        }
    
    clean_heading = heading.replace('\n', ' ').strip()
    clean_body = body.replace('\n', ' ').replace("'", "").strip()
    
    # Context-aware logic
    search_q = "luxury watchmaking macro photography"
    mj_prompt = ""
    de_prompt = ""
    
    # Lowercase text for matching
    text = (clean_heading + " " + clean_body).lower()
    
    # 1. Historical & Vintage
    if any(k in text for k in ['history', 'timeline', 'pocket', 'origins', 'ancient', '1500', '1700', 'breguet', 'harrison', 'marine chronometer']):
        search_q = "Breguet antique pocket watch 18th century guilloche dial macro"
        mj_prompt = "Macro close-up photography of an authentic 18th-century antique pocket watch, exquisite Breguet hand-guilloche silver dial, blued steel hands, open case revealing intricate golden mechanical gears and balance wheel, historic Swiss watchmaking craftsmanship, dramatic dark studio lighting, shallow depth of field --ar 16:9 --style raw"
        de_prompt = "A high-detail macro studio photograph of an authentic 18th-century Breguet pocket watch. The silver dial features hand-engraved guilloche patterns and elegant roman numerals with classic blued steel open-tipped hands. The watch casing is slightly open, showing golden hand-finished gears and escapement. Dark dramatic background, highlighting the historical craftsmanship."
    
    # 2. Escapement & Mechanical movements
    elif any(k in text for k in ['escapement', 'mechanical', 'movement', 'caliber', 'calibre', 'co-axial', 'lever escapement', 'balance wheel', 'spring', 'mainspring', 'complication', 'chronograph', 'rotor', 'automatic']):
        search_q = "disassembled luxury watch movement calibre parts layout macro"
        mj_prompt = "Premium horology photography of a disassembled mechanical watch movement caliber, bridges, mainspring, escape wheel, ruby jewels, and balance wheel arranged in a clean technical layout, high-end finishing, watchmakers bench background, pristine studio lighting --ar 16:9 --style raw"
        de_prompt = "A professional horological studio shot of a disassembled mechanical watch movement. The parts, including polished steel gears, brass wheels, synthetic ruby jewels, and a golden balance wheel, are neatly laid out on a dark leather watchmaker\'s workbench. Clean spotlighting emphasizes the fine beveling (anglage) and micro-mechanics."

    # 3. Sketching & Concept
    elif any(k in text for k in ['sketch', 'sketching', 'pencil', 'ideation', 'drawing', 'concept', 'notebook', 'ergonomics', 'proportion']):
        search_q = "industrial watch design sketches on desk with pencil"
        mj_prompt = "High-end industrial design sketch of a luxury watch concept, draft lines, annotations, technical drawings on premium textured paper on a designer\'s oak wood desk, drafting tools, mechanical pencils, vintage watch parts nearby, cinematic soft natural light --ar 16:9 --style raw"
        de_prompt = "A beautiful aesthetic photograph of a watch designer\'s workspace. On a wooden drafting table sits a textured design notebook showing black ink and pencil technical sketches of a modern watch case, complete with proportional grid lines and annotations. A mechanical pencil and steel calipers lie adjacent to the notebook."

    # 4. 2D Rendering & Vector
    elif any(k in text for k in ['2d', 'rendering', 'vector', 'illustrator', 'orthographic', 'technical drawing', 'line weight']):
        search_q = "2D vector watch design orthographic blueprint"
        mj_prompt = "Clean orthographic 2D technical vector illustration of a modern luxury sport watch, front and profile view, sharp lines, subtle gradients, elegant slate grey background, minimal industrial aesthetic --ar 16:9 --style raw"
        de_prompt = "An orthographic technical drawing of a luxury wristwatch. The design is displayed as a clean vector graphic, showing front and profile views with precise line work, dimension indicators, and subtle flat shading. The background is a professional dark slate color, evoking high-end CAD blueprints."

    # 5. 3D CAD & Geometry
    elif any(k in text for k in ['3d', 'cad', 'fusion 360', 'modeling', 'geometry', 'step file', 'tolerances', 'solid modeling']):
        search_q = "3D CAD model of watch case in Fusion 360 screenshot"
        mj_prompt = "Clean modern 3D CAD solid model of a watch case geometry, sleek steel material, wireframe overlay, rotating on a professional workstation screen, professional dark UI interface, minimal background --ar 16:9 --style raw"
        de_prompt = "A clean screenshot of a high-end watch case 3D solid model in a CAD application. The model is rendered in polished titanium with precise surface chamfers and bevels. A subtle blue wireframe grid overlays the model to show the geometric mesh. The workstation UI is modern and dark-themed."

    # 6. Materials & Finishes (Gold, Ceramic, Titanium, Polishing)
    elif any(k in text for k in ['materials', 'finishes', 'zaratsu', 'polishing', 'titanium', 'ceramic', 'luminous', 'swissness', 'crystal', 'sapphire']):
        search_q = "macro of zaratsu polished watch case metal finish chamfer"
        mj_prompt = "Macro photography of a watch case lug demonstrating immaculate zaratsu mirror polishing, razor-sharp chamfered edge separating brushed and mirror surfaces, reflection of studio light, luxury horology detail --ar 16:9 --style raw"
        de_prompt = "A high-detail macro photograph of the titanium case lug of a luxury watch. It showcases the contrast between a perfectly brushed top surface and an mirror-polished, sharp beveled edge (Zaratsu finish), reflecting a soft studio softbox light. The texture of the metal is highly defined."

    # 7. Brand Strategy & Briefs (Module 2)
    elif any(k in text for k in ['brand', 'strategy', 'brief', 'market', 'audience', 'value proposition', 'identity', 'competitors', 'pricing']):
        search_q = "minimalist luxury watch brand campaign moodboard"
        mj_prompt = "Minimalist luxury watch brand moodboard, swatch samples of premium leather, brushed rose gold, deep navy blue dials, abstract lifestyle photographs, architectural details, high-end editorial layouts, clean aesthetic --ar 16:9 --style raw"
        de_prompt = "A curated luxury watch brand strategy moodboard. It features physical elements: a swatch of dark brown alligator leather, a sample of brushed gold metal, a deep blue ceramic card, and minimalist editorial typography cards showing branding keywords. Laid out flat on a clean textured stone background."

    # 8. Career & Portfolio
    elif any(k in text for k in ['portfolio', 'career', 'pitch deck', 'unit economics', 'pricing', 'intellectual property', 'photography']):
        search_q = "watch design portfolio presentation pitch deck mockup"
        mj_prompt = "Professional watch design portfolio presentation booklet open on a concrete table, high-resolution rendering pages, technical specs, minimalist editorial design, high-end studio light --ar 16:9 --style raw"
        de_prompt = "A premium mockup of a watch designer\'s printed portfolio book. The book is open to a page showing a photorealistic render of a modern dive watch alongside an orthographic spec sheet. It lies on a clean minimalist concrete table with long shadows from a large window."

    # 9. Advanced / Microbrand Launch (Module 10)
    elif any(k in text for k in ['microbrand', 'launch', 'manufacturing', 'prototype', 'kickstarter', 'community', 'batch']):
        search_q = "watch prototyping watchmakers workbench prototype parts"
        mj_prompt = "Horological assembly line, CNC milled watch case prototype, watchmakers tweezers holding a stainless steel crown, close up, engineering precision, premium studio lighting --ar 16:9 --style raw"
        de_prompt = "A high-detail close-up of a watchmaker\'s workbench during a prototype review. A stainless steel CNC-machined watch case prototype lies in a padded leather tray next to brass calipers, watchmaker\'s screwdrivers, and a magnifying loupe."

    # Default watch photography
    else:
        search_q = f"luxury watch close up photography {clean_heading}"
        mj_prompt = f"Macro close-up photography of a luxury wrist watch, elegant {clean_heading} design, sophisticated details, soft dramatic studio lighting, shallow depth of field, premium editorial --ar 16:9 --style raw"
        de_prompt = f"A professional studio macro shot of a luxury watch face highlighting the detail of the dial and markers related to \"{clean_heading}\". The lighting is soft and directional, emphasizing the rich textures and premium craftsmanship against a dark textured backdrop."
        
    return {
        'keep': False,
        'search': search_q,
        'midjourney': mj_prompt,
        'dalle': de_prompt
    }

for mod_slug, mod_num, mod_title, slides_content in modules_raw:
    output_md += f"\\n\\n## Module {mod_num}: {mod_title}\\n\\n"
    
    # Parse slides in this module
    # A slide is defined in modules.js as an object
    slide_blocks = re.findall(r"\{\s*id:\s*'([^']+)',\s*type:\s*'([^']+)',([\s\S]*?)\},", slides_content)
    
    for slide_id, slide_type, fields in slide_blocks:
        heading_match = re.search(r"heading:\s*'(.*?)'", fields)
        title_match = re.search(r"title:\s*'(.*?)'", fields)
        heading = heading_match.group(1) if heading_match else (title_match.group(1) if title_match else "")
        
        body_match = re.search(r"body:\s*'(.*?)'", fields)
        body = body_match.group(1) if body_match else ""
        
        image_match = re.search(r"image:\s*'(.*?)'", fields)
        current_image = image_match.group(1) if image_match else ""
        
        # Clean slide title for filename
        clean_name = re.sub(r'[^a-zA-Z0-9]+', '_', heading.lower()).strip('_')
        if not clean_name:
            clean_name = "slide"
        filename = f"{slide_id.replace('-', '_')}_{clean_name}.png"
        
        prompts = generate_queries_and_prompts(slide_id, slide_type, heading, body, current_image)
        
        output_md += f"### {slide_id}: {heading.replace('\\n', ' ')}\\n"
        output_md += f"- **Target Filename:** {filename}\\n"
        
        if prompts['keep']:
            output_md += f"- **Status:** ?? **KEEP EXISTING LOCAL IMAGE** ({current_image})\\n"
            output_md += f"- *Reason:* This slide is a pre-designed technical schematic or timeline illustration that is already perfect for the content.\\n\\n"
        else:
            output_md += f"- **Status:** ?? **NEEDS GENERATION**\\n"
            output_md += f"- **Web Search Query:** {prompts['search']}\\n"
            output_md += f"- **Midjourney v6 Prompt:**\\n  `	ext\\n  {prompts['midjourney']}\\n  `\\n"
            output_md += f"- **DALL-E 3 Prompt:**\\n  `	ext\\n  {prompts['dalle']}\\n  `\\n\\n"

with open('scratch/horology_image_prompts.md', 'w', encoding='utf-8') as f:
    f.write(output_md)

print("Master prompts workbook generated successfully in scratch/horology_image_prompts.md!")
