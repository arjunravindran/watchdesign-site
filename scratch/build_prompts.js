const fs = require('fs');
const path = require('path');

// 1. Read data/modules.js and convert to CommonJS
const content = fs.readFileSync('data/modules.js', 'utf8');
const cjsContent = content.replace(/export\s+const\s+modules\s*=/, 'module.exports =').replace(/export\s+/g, '');
fs.writeFileSync('scratch/temp_modules.cjs', cjsContent, 'utf8');

// 2. Load it
const modules = require('./temp_modules.cjs');

// Clean up temp file
fs.unlinkSync('scratch/temp_modules.cjs');

// 3. Prompts Database and Logic
const imagesPool = {
    vintage: [
        '1509048191080-d2984bad6ae5', // Vintage pocket watch
        '1508685096489-7aacd43bd3b1'  // Vintage watch face
    ],
    movement: [
        '1508057198894-247b23fe5ade', // Skeleton gear watch
        '1600003014755-ba31aa59c4b6'  // Watch movement close up
    ],
    design: [
        '1511556532299-8f662fc26c06', // Minimal chrono flatlay
        '1639006570490-79c0c53f1080'  // Aesthetic desk watch
    ],
    luxury: [
        '1585123334904-845d60e97b29', // Luxury gold watch
        '1539874754764-5a96559165b0'  // Luxury close up
    ],
    minimalist: [
        '1523275335684-37898b6baf30', // Minimalist white watch
        '1526170375885-4d8ecf77b99f'  // Minimalist black watch
    ],
    leather: [
        '1524592094714-0f0654e20314', // Brown leather strap watch
        '1542496658-e33a6d0d50f6'  // Elegant brown leather strap watch
    ],
    sport: [
        '1619134778706-7015533a6150', // Black dial diver
        '1604242692760-2f7b0c26856d', // Stainless steel automatic
        '1614164185128-e4ec99c436d7'  // Omega Speedmaster style
    ]
};

const allFlatPool = [
    '1523275335684-37898b6baf30',
    '1585123334904-845d60e97b29',
    '1524592094714-0f0654e20314',
    '1539874754764-5a96559165b0',
    '1509048191080-d2984bad6ae5',
    '1619134778706-7015533a6150',
    '1614164185128-e4ec99c436d7',
    '1508685096489-7aacd43bd3b1',
    '1508057198894-247b23fe5ade',
    '1511556532299-8f662fc26c06',
    '1526170375885-4d8ecf77b99f',
    '1600003014755-ba31aa59c4b6',
    '1639006570490-79c0c53f1080',
    '1604242692760-2f7b0c26856d',
    '1542496658-e33a6d0d50f6'
];

function getSimpleHash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs(hash);
}

function generatePrompts(slide) {
    if (slide.image && slide.image.startsWith('/images/')) {
        return {
            keep: true,
            search: 'N/A (Local Schematic Asset)',
            midjourney: 'N/A (Using existing local schematic)',
            dalle: 'N/A (Using existing local schematic)'
        };
    }

    const heading = slide.heading || slide.title || '';
    const body = slide.body || '';
    const text = (heading + ' ' + body).toLowerCase();

    let search_q = 'luxury watchmaking macro photography';
    let mj_prompt = '';
    let de_prompt = '';

    // Context match
    if (/history|timeline|pocket|origins|ancient|1500|1700|breguet|harrison|marine chronometer/.test(text)) {
        search_q = 'Breguet antique pocket watch 18th century guilloche dial macro';
        mj_prompt = `Macro close-up photography of an authentic 18th-century antique pocket watch, exquisite Breguet hand-guilloche silver dial, blued steel hands, open case revealing intricate golden mechanical gears and balance wheel, historic Swiss watchmaking craftsmanship, dramatic dark studio lighting, shallow depth of field --ar 16:9 --style raw`;
        de_prompt = `A high-detail macro studio photograph of an authentic 18th-century Breguet pocket watch. The silver dial features hand-engraved guilloche patterns and elegant roman numerals with classic blued steel open-tipped hands. The watch casing is slightly open, showing golden hand-finished gears and escapement. Dark dramatic background, highlighting the historical craftsmanship.`;
    }
    else if (/escapement|mechanical|movement|caliber|calibre|co-axial|lever escapement|balance wheel|spring|mainspring|complication|chronograph|rotor|automatic/.test(text)) {
        search_q = 'disassembled luxury watch movement calibre parts layout macro';
        mj_prompt = `Premium horology photography of a disassembled mechanical watch movement caliber, bridges, mainspring, escape wheel, ruby jewels, and balance wheel arranged in a clean technical layout, high-end finishing, watchmakers bench background, pristine studio lighting --ar 16:9 --style raw`;
        de_prompt = `A professional horological studio shot of a disassembled mechanical watch movement. The parts, including polished steel gears, brass wheels, synthetic ruby jewels, and a golden balance wheel, are neatly laid out on a dark leather watchmaker's workbench. Clean spotlighting emphasizes the fine beveling (anglage) and micro-mechanics.`;
    }
    else if (/sketch|sketching|pencil|ideation|drawing|concept|notebook|ergonomics|proportion/.test(text)) {
        search_q = 'industrial watch design sketches on desk with pencil';
        mj_prompt = `High-end industrial design sketch of a luxury watch concept, draft lines, annotations, technical drawings on premium textured paper on a designer's oak wood desk, drafting tools, mechanical pencils, vintage watch parts nearby, cinematic soft natural light --ar 16:9 --style raw`;
        de_prompt = `A beautiful aesthetic photograph of a watch designer's workspace. On a wooden drafting table sits a textured design notebook showing black ink and pencil technical sketches of a modern watch case, complete with proportional grid lines and annotations. A mechanical pencil and steel calipers lie adjacent to the notebook.`;
    }
    else if (/2d|rendering|vector|illustrator|orthographic|technical drawing|line weight/.test(text)) {
        search_q = '2D vector watch design orthographic blueprint';
        mj_prompt = `Clean orthographic 2D technical vector illustration of a modern luxury sport watch, front and profile view, sharp lines, subtle gradients, elegant slate grey background, minimal industrial aesthetic --ar 16:9 --style raw`;
        de_prompt = `An orthographic technical drawing of a luxury wristwatch. The design is displayed as a clean vector graphic, showing front and profile views with precise line work, dimension indicators, and subtle flat shading. The background is a professional dark slate color, evoking high-end CAD blueprints.`;
    }
    else if (/3d|cad|fusion 360|modeling|geometry|step file|tolerances|solid modeling/.test(text)) {
        search_q = '3D CAD model of watch case in Fusion 360 screenshot';
        mj_prompt = `Clean modern 3D CAD solid model of a watch case geometry, sleek steel material, wireframe overlay, rotating on a professional workstation screen, professional dark UI interface, minimal background --ar 16:9 --style raw`;
        de_prompt = `A clean screenshot of a high-end watch case 3D solid model in a CAD application. The model is rendered in polished titanium with precise surface chamfers and bevels. A subtle blue wireframe grid overlays the model to show the geometric mesh. The workstation UI is modern and dark-themed.`;
    }
    else if (/materials|finishes|zaratsu|polishing|titanium|ceramic|luminous|swissness|crystal|sapphire/.test(text)) {
        search_q = 'macro of zaratsu polished watch case metal finish chamfer';
        mj_prompt = `Macro photography of a watch case lug demonstrating immaculate zaratsu mirror polishing, razor-sharp chamfered edge separating brushed and mirror surfaces, reflection of studio light, luxury horology detail --ar 16:9 --style raw`;
        de_prompt = `A high-detail macro photograph of the titanium case lug of a luxury watch. It showcases the contrast between a perfectly brushed top surface and an mirror-polished, sharp beveled edge (Zaratsu finish), reflecting a soft studio softbox light. The texture of the metal is highly defined.`;
    }
    else if (/brand|strategy|brief|market|audience|value proposition|identity|competitors|pricing/.test(text)) {
        search_q = 'minimalist luxury watch brand campaign moodboard';
        mj_prompt = `Minimalist luxury watch brand moodboard, swatch samples of premium leather, brushed rose gold, deep navy blue dials, abstract lifestyle photographs, architectural details, high-end editorial layouts, clean aesthetic --ar 16:9 --style raw`;
        de_prompt = `A curated luxury watch brand strategy moodboard. It features physical elements: a swatch of dark brown alligator leather, a sample of brushed gold metal, a deep blue ceramic card, and minimalist editorial typography cards showing branding keywords. Laid out flat on a clean textured stone background.`;
    }
    else if (/portfolio|career|pitch deck|unit economics|pricing|intellectual property|photography/.test(text)) {
        search_q = 'watch design portfolio presentation pitch deck mockup';
        mj_prompt = `Professional watch design portfolio presentation booklet open on a concrete table, high-resolution rendering pages, technical specs, minimalist editorial design, high-end studio light --ar 16:9 --style raw`;
        de_prompt = `A premium mockup of a watch designer's printed portfolio book. The book is open to a page showing a photorealistic render of a modern dive watch alongside an orthographic spec sheet. It lies on a clean minimalist concrete table with long shadows from a large window.`;
    }
    else if (/microbrand|launch|manufacturing|prototype|kickstarter|community|batch/.test(text)) {
        search_q = 'watch prototyping watchmakers workbench prototype parts';
        mj_prompt = `Horological assembly line, CNC milled watch case prototype, watchmakers tweezers holding a stainless steel crown, close up, engineering precision, premium studio lighting --ar 16:9 --style raw`;
        de_prompt = `A high-detail close-up of a watchmaker's workbench during a prototype review. A stainless steel CNC-machined watch case prototype lies in a padded leather tray next to brass calipers, watchmaker's screwdrivers, and a magnifying loupe.`;
    }
    else {
        // Fallback: pick a consistent photo from flat pool
        const hash = getSimpleHash(heading);
        const photoId = allFlatPool[hash % allFlatPool.length];
        search_q = `luxury watch photography ${heading}`;
        mj_prompt = `Premium close-up photography of a luxury wrist watch, highlighting ${heading} elements, sophisticated horological aesthetic, elegant studio lighting, shallow depth of field --ar 16:9 --style raw`;
        de_prompt = `A professional horological studio shot of a luxury watch, focused on showing the "${heading}" concept in detail. The background is a clean textured slate surface under soft, moody directional studio lighting.`;
    }

    return { keep: false, search: search_q, midjourney: mj_prompt, dalle: de_prompt };
}

// 4. Output Markdown Builder
let outputMd = `# Horology Image Prompts Directory

This document contains a master list of all slides in the Watch Design Self-Study curriculum. For each slide, we provide:
1. **Slide ID & Target Filename:** The suggested filename to save the generated image as.
2. **Technical/Historical Context:** What the slide teaches.
3. **Targeted Web Search Query:** To find reference images.
4. **Midjourney Prompt:** Tailored for ultra-realistic, premium watch editorial v6 styling.
5. **DALL-E 3 Prompt:** Tailored for semantic accuracy, clear detail, and diagrams where appropriate.

> [!NOTE]
> Local schematic images are preserved and noted. Do not replace these in your actual asset folder.

---
`;

modules.forEach(mod => {
    outputMd += `\n\n## Module ${mod.number}: ${mod.title}\n\n`;
    
    mod.slides.forEach(slide => {
        const heading = slide.heading || slide.title || 'Slide';
        const cleanName = heading.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '');
        const filename = `${slide.id.replace(/-/g, '_')}_${cleanName || 'slide'}.png`;
        const p = generatePrompts(slide);

        outputMd += `### ${slide.id}: ${heading.replace(/\n/g, ' ')}\n`;
        outputMd += `- **Target Filename:** \`${filename}\`\n`;
        
        if (p.keep) {
            outputMd += `- **Status:** 🟢 **KEEP EXISTING LOCAL IMAGE** (\`${slide.image}\`)\n`;
            outputMd += `- *Reason:* This slide is a pre-designed technical schematic or timeline illustration that is already perfect for the content.\n\n`;
        } else {
            outputMd += `- **Status:** 📸 **NEEDS GENERATION**\n`;
            outputMd += `- **Web Search Query:** \`${p.search}\`\n`;
            outputMd += `- **Midjourney v6 Prompt:**\n  \`\`\`text\n  ${p.midjourney}\n  \`\`\`\n`;
            outputMd += `- **DALL-E 3 Prompt:**\n  \`\`\`text\n  ${p.dalle}\n  \`\`\`\n\n`;
        }
    });
});

fs.writeFileSync('scratch/horology_image_prompts.md', outputMd, 'utf8');
console.log('Successfully completed building horology_image_prompts.md!');
