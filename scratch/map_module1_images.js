const fs = require('fs');

const path = 'data/modules.js';
let content = fs.readFileSync(path, 'utf8');

// We need to parse content into slides and update their image fields.
// Since modules.js is an ES Module, we will perform a safe structural replacement by finding the slide blocks and inserting/replacing their image fields.
// Mappings:
const mappings = {
    'm01-s01': '/images/generated/m01_s01_module_01.png',
    'm01-s02': '/images/generated/m01_s02_what_this_module_covers.png',
    'm01-s03': '/images/generated/m01_s03_why_history_is_a_superpower.png',
    'm01-s04': '/images/generated/m01_s04_what_is_horology.png',
    'm01-s13': '/images/generated/m01_s05_a_brief_history.png', // Timeline matches 1500-1700 intro
    'm01-s15': '/images/generated/m01_s09_wristwatch_revolution.png', // Wristwatch revolution matches 1850-1969
    'm01-s16': '/images/generated/m01_s11_key_milestones.png', // Key milestones matches the Quartz Crisis era
    'm01-s17': '/images/generated/m01_s10_evolution_of_watch_design.png', // Design evolution matches Mechanical Renaissance
    'm01-s22': '/images/generated/m01_s12_lesson_summary.png' // Lesson summary matches What You Should Now Know
};

let updatedCount = 0;

for (const [slideId, imgPath] of Object.entries(mappings)) {
    // We want to find the slide block starting with id: 'slideId' and up to the next slide block or module block.
    // Slides look like:
    // {
    //   id: 'm01-s01',
    //   type: 'hero',
    //   ...
    // }
    
    // Find the starting position of this slide
    const slideStartMarker = `id: '${slideId}'`;
    const startIndex = content.indexOf(slideStartMarker);
    if (startIndex === -1) {
        console.log(`Could not find slide ${slideId}`);
        continue;
    }
    
    // Find the end of this slide block (the next closing brace before a comma/new slide)
    let endIndex = content.indexOf('}', startIndex);
    if (endIndex === -1) {
        console.log(`Could not find end of slide ${slideId}`);
        continue;
    }
    
    let slideBlock = content.substring(startIndex, endIndex);
    
    // Check if the slide block already has an image field
    if (slideBlock.includes('image:')) {
        // Replace existing image field
        slideBlock = slideBlock.replace(/image:\s*'[^']*'/, `image: '${imgPath}'`);
    } else {
        // Insert new image field after the type field
        const typeMatch = slideBlock.match(/type:\s*'[^']*',/);
        if (typeMatch) {
            slideBlock = slideBlock.replace(typeMatch[0], `${typeMatch[0]}\n        image: '${imgPath}',`);
        } else {
            // Or just after id field
            slideBlock = slideBlock.replace(`id: '${slideId}',`, `id: '${slideId}',\n        image: '${imgPath}',`);
        }
    }
    
    // Reconstruct the file content
    content = content.substring(0, startIndex) + slideBlock + content.substring(endIndex);
    console.log(`Successfully mapped slide ${slideId} to ${imgPath}`);
    updatedCount++;
}

fs.writeFileSync(path, content, 'utf8');
console.log(`\nAll done! Successfully updated ${updatedCount} slides in ${path}!`);
