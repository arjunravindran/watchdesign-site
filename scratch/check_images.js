const fs = require('fs');

const content = fs.readFileSync('data/modules.js', 'utf8');
const cjsContent = content.replace(/export\s+const\s+modules\s*=/, 'module.exports =').replace(/export\s+/g, '');
fs.writeFileSync('scratch/temp_check.cjs', cjsContent, 'utf8');

const modules = require('./temp_check.cjs');
fs.unlinkSync('scratch/temp_check.cjs');

const imagedSlides = [];
modules.forEach(mod => {
    mod.slides.forEach(slide => {
        if (slide.image) {
            imagedSlides.push({ id: slide.id, heading: slide.heading || slide.title, image: slide.image });
        }
    });
});

console.log(JSON.stringify(imagedSlides, null, 2));
