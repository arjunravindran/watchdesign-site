const fs = require('fs');

const text = fs.readFileSync('scratch/horology_image_prompts.md', 'utf8');
const blocks = text.split('### ');
const nbSlides = [];

blocks.forEach(block => {
    if (block.includes('📸 NANO BANANA (Recommended)')) {
        const lines = block.split('\n');
        const idTitle = lines[0].trim();
        const id = idTitle.split(':')[0].trim();
        const title = idTitle.split(':').slice(1).join(':').trim();
        
        let filename = '';
        let prompt = '';
        let readingPrompt = false;

        lines.forEach(line => {
            if (line.startsWith('- **Target Filename:**')) {
                filename = line.replace('- **Target Filename:**', '').replace(/`/g, '').trim();
            }
            if (line.startsWith('- **Nano Banana Prompt:**')) {
                readingPrompt = true;
            } else if (readingPrompt && line.startsWith('  ```text')) {
                // skip
            } else if (readingPrompt && line.startsWith('  ```')) {
                readingPrompt = false;
            } else if (readingPrompt) {
                prompt += line.trim() + ' ';
            }
        });

        nbSlides.push({ id, title, filename, prompt: prompt.trim() });
    }
});

console.log(JSON.stringify(nbSlides, null, 2));
fs.writeFileSync('scratch/nb_slides.json', JSON.stringify(nbSlides, null, 2), 'utf8');
