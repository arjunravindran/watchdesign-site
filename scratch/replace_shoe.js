const fs = require('fs');

const path = 'data/modules.js';
let content = fs.readFileSync(path, 'utf8');

// Replace the red shoe placeholder (1511556532299-8f662fc26c06) with a beautiful minimalist watch (1523275335684-37898b6baf30)
const before = '1511556532299-8f662fc26c06';
const after = '1523275335684-37898b6baf30';

const occurrences = (content.match(new RegExp(before, 'g')) || []).length;

if (occurrences > 0) {
    content = content.split(before).join(after);
    fs.writeFileSync(path, content, 'utf8');
    console.log(`Successfully replaced ${occurrences} shoe placeholders with watch placeholders in data/modules.js!`);
} else {
    console.log('No shoe placeholders found.');
}
